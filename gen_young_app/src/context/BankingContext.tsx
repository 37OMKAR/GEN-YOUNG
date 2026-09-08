/**
 * Gen-Young Banking Context & Provider
 * Manages zero-balance youth savings accounts, virtual card controls,
 * simulated UPI payments, and target-based savings goals.
 * Path: src/context/BankingContext.tsx
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from 'react';
import {
  BankAccount,
  VirtualDebitCardData,
  TransactionRecord,
  SavingsGoal,
  UpiPaymentPayload,
  UpiPaymentResult,
  GoalOperationResult,
  CreateGoalInput,
  BankingContextType,
} from '../types/banking';
import { usePersona } from './PersonaContext';
import {
  playUpiSuccessChime,
  playGoalCelebration,
  playClickSound,
  playErrorSound,
} from '../utils/soundEffects';

const BankingContext = createContext<BankingContextType | undefined>(undefined);

const CVV_AUTO_HIDE_SECONDS = 30;
const MIN_ONLINE_LIMIT = 500;
const MAX_ONLINE_LIMIT = 25000;

export interface BankingProviderProps {
  children: ReactNode;
}

export const BankingProvider: React.FC<BankingProviderProps> = ({ children }) => {
  const { activePersonaId, activePersona } = usePersona();

  const storageKey = `gen_young_banking_${activePersonaId}`;

  // Concurrency and lifecycle tracking refs
  const activePersonaIdRef = useRef<string>(activePersonaId);
  const personaEpochRef = useRef<number>(0);
  const inFlightAbortControllersRef = useRef<Set<AbortController>>(new Set());

  // Synchronously update active persona ref on each render
  activePersonaIdRef.current = activePersonaId;

  // Helper to load or initialize banking state for the active persona
  const loadAccount = useCallback((): BankAccount => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved) as BankAccount;
          if (parsed && typeof parsed.balance === 'number' && Array.isArray(parsed.transactions)) {
            return parsed;
          }
        }
      } catch (err) {
        console.warn(`Error loading banking state for ${activePersonaId}:`, err);
      }
    }
    // Return deep clone to prevent accidental mutation of global mock references
    return JSON.parse(JSON.stringify(activePersona.initialBankAccount));
  }, [activePersonaId, activePersona.initialBankAccount, storageKey]);

  const [account, setAccount] = useState<BankAccount>(loadAccount);
  const [isCardNumberMasked, setIsCardNumberMasked] = useState<boolean>(true);
  const [isCvvRevealed, setIsCvvRevealed] = useState<boolean>(false);
  const [cvvSecondsLeft, setCvvSecondsLeft] = useState<number>(0);

  const cvvTimerRef = useRef<NodeJS.Timeout | null>(null);

  // When active persona changes, rehydrate banking state and abort in-flight requests
  useEffect(() => {
    personaEpochRef.current += 1;

    // Instantly abort any in-flight payments from previous persona
    inFlightAbortControllersRef.current.forEach((controller) => {
      try {
        controller.abort();
      } catch {
        // ignore
      }
    });
    inFlightAbortControllersRef.current.clear();

    setAccount(loadAccount());
    // Clear CVV timer on persona switch
    if (cvvTimerRef.current) {
      clearInterval(cvvTimerRef.current);
      cvvTimerRef.current = null;
    }
    setIsCvvRevealed(false);
    setCvvSecondsLeft(0);
    setIsCardNumberMasked(true);
  }, [activePersonaId, loadAccount]);

  // Persist account mutations to localStorage
  const persistAccount = useCallback(
    (updated: BankAccount) => {
      setAccount(updated);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch (err) {
          console.warn(`Error saving banking state for ${activePersonaId}:`, err);
        }
      }
    },
    [storageKey, activePersonaId]
  );

  // CVV Reveal with 30-second countdown
  const revealCvv = useCallback(() => {
    playClickSound();
    if (cvvTimerRef.current) {
      clearInterval(cvvTimerRef.current);
      cvvTimerRef.current = null;
    }
    setIsCvvRevealed(true);
    setCvvSecondsLeft(CVV_AUTO_HIDE_SECONDS);

    cvvTimerRef.current = setInterval(() => {
      setCvvSecondsLeft((prev) => {
        if (prev <= 1) {
          if (cvvTimerRef.current) {
            clearInterval(cvvTimerRef.current);
            cvvTimerRef.current = null;
          }
          setIsCvvRevealed(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const hideCvv = useCallback(() => {
    playClickSound();
    if (cvvTimerRef.current) {
      clearInterval(cvvTimerRef.current);
      cvvTimerRef.current = null;
    }
    setIsCvvRevealed(false);
    setCvvSecondsLeft(0);
  }, []);

  // Cleanup CVV timer on unmount
  useEffect(() => {
    return () => {
      if (cvvTimerRef.current) {
        clearInterval(cvvTimerRef.current);
      }
    };
  }, []);

  // Toggle Masked Card Number
  const toggleCardNumberMask = useCallback(() => {
    playClickSound();
    setIsCardNumberMasked((prev) => !prev);
  }, []);

  // Toggle Card Freeze (optionally accepting target state)
  const toggleCardFreeze = useCallback((forcedState?: boolean) => {
    playClickSound();
    setAccount((prev) => {
      const targetState = forcedState !== undefined ? forcedState : !prev.virtualCard.isFrozen;
      const updatedCard: VirtualDebitCardData = {
        ...prev.virtualCard,
        isFrozen: targetState,
      };
      const updatedAccount: BankAccount = {
        ...prev,
        virtualCard: updatedCard,
      };
      persistAccount(updatedAccount);
      return updatedAccount;
    });
  }, [persistAccount]);

  // Set Online Transaction Limit
  const setCardOnlineLimit = useCallback(
    (limit: number): { success: boolean; message?: string } => {
      if (isNaN(limit)) {
        playErrorSound();
        return { success: false, message: 'Invalid limit value' };
      }
      const clamped = Math.min(Math.max(limit, MIN_ONLINE_LIMIT), MAX_ONLINE_LIMIT);
      playClickSound();

      setAccount((prev) => {
        const updatedCard: VirtualDebitCardData = {
          ...prev.virtualCard,
          onlineLimit: clamped,
        };
        const updatedAccount: BankAccount = {
          ...prev,
          virtualCard: updatedCard,
        };
        persistAccount(updatedAccount);
        return updatedAccount;
      });

      return {
        success: true,
        message: `Card online limit updated to ₹${clamped.toLocaleString('en-IN')}`,
      };
    },
    [persistAccount]
  );

  // Toggle Tap & Pay NFC
  const toggleNfc = useCallback(() => {
    playClickSound();
    setAccount((prev) => {
      const updatedCard: VirtualDebitCardData = {
        ...prev.virtualCard,
        nfcEnabled: !prev.virtualCard.nfcEnabled,
      };
      const updatedAccount: BankAccount = {
        ...prev,
        virtualCard: updatedCard,
      };
      persistAccount(updatedAccount);
      return updatedAccount;
    });
  }, [persistAccount]);

  // Deposit Simulated Money into Account
  const depositMoney = useCallback((amount: number) => {
    if (amount <= 0) return;
    playClickSound();
    setAccount((prev) => {
      const newTransaction: TransactionRecord = {
        id: `tx_dep_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString(),
        title: 'Instant Deposit',
        description: 'Simulated cash deposit to zero-balance savings',
        amount,
        type: 'credit',
        category: 'allowance',
        senderOrRecipient: 'Gen-Young Deposit Portal',
        referenceNumber: `DEP/${new Date().getFullYear()}/${Math.floor(10000000 + Math.random() * 90000000)}`,
        status: 'success',
      };
      const updatedAccount: BankAccount = {
        ...prev,
        balance: prev.balance + amount,
        transactions: [newTransaction, ...prev.transactions],
      };
      persistAccount(updatedAccount);
      return updatedAccount;
    });
  }, [persistAccount]);

  // Send Simulated UPI Payment with Atomic Persona Binding and Race Condition Guard
  const sendUpiPayment = useCallback(
    async (payload: UpiPaymentPayload): Promise<UpiPaymentResult> => {
      const upiId = payload.recipientUpiId || payload.recipient || '';
      const name = payload.recipientName || payload.recipient || 'Merchant';

      // 1. Snapshot identity, epoch, and account at call time
      const initiatingPersonaId = activePersonaIdRef.current;
      const callEpoch = personaEpochRef.current;
      const snapshotAccount = account;

      // 2. Input Validation against snapshot
      if (!upiId || (!upiId.includes('@') && upiId.length < 10)) {
        playErrorSound();
        return {
          success: false,
          errorMessage: 'Invalid UPI ID or phone format.',
        };
      }

      if (!payload.amount || isNaN(payload.amount) || payload.amount <= 0) {
        playErrorSound();
        return {
          success: false,
          errorMessage: 'Please enter a valid transfer amount greater than ₹0',
        };
      }

      // Check card freeze / account lock
      if (snapshotAccount.virtualCard.isFrozen) {
        playErrorSound();
        return {
          success: false,
          errorMessage: 'Your card/account is currently frozen. Unfreeze to authorize payments.',
        };
      }

      // Check available balance
      if (payload.amount > snapshotAccount.balance) {
        playErrorSound();
        return {
          success: false,
          errorMessage: `Insufficient account balance. Available: ₹${snapshotAccount.balance.toLocaleString('en-IN')}`,
        };
      }

      // Check daily limit
      if (payload.amount > snapshotAccount.virtualCard.onlineLimit) {
        playErrorSound();
        return {
          success: false,
          errorMessage: `Amount exceeds daily online card limit of ₹${snapshotAccount.virtualCard.onlineLimit.toLocaleString('en-IN')}`,
        };
      }

      // 3. Register AbortController for cancellable latency
      const abortController = new AbortController();
      inFlightAbortControllersRef.current.add(abortController);

      try {
        await new Promise<void>((resolve) => {
          if (abortController.signal.aborted) {
            resolve();
            return;
          }
          const timer = setTimeout(() => {
            abortController.signal.removeEventListener('abort', onAbort);
            resolve();
          }, 300);

          function onAbort() {
            clearTimeout(timer);
            abortController.signal.removeEventListener('abort', onAbort);
            resolve();
          }
          abortController.signal.addEventListener('abort', onAbort);
        });
      } finally {
        inFlightAbortControllersRef.current.delete(abortController);
      }

      // 4. Concurrency Guard: Detect if persona changed during the 300ms latency
      const hasPersonaChanged =
        abortController.signal.aborted ||
        personaEpochRef.current !== callEpoch ||
        activePersonaIdRef.current !== initiatingPersonaId;

      const newBalance = snapshotAccount.balance - payload.amount;
      const newMonthlySpent = snapshotAccount.monthlySpent + payload.amount;

      const newTransaction: TransactionRecord = {
        id: payload.txId || `tx_upi_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString(),
        title: name,
        description: payload.note || 'Simulated UPI Transfer',
        amount: payload.amount,
        type: 'debit',
        category: 'upi',
        senderOrRecipient: name,
        upiId: upiId,
        referenceNumber: `UPI/${new Date().getFullYear()}/${Math.floor(10000000 + Math.random() * 90000000)}`,
        status: 'success',
        note: payload.note,
      };

      // STRATEGY A: Safe Abort (Recommended)
      // If persona changed, immediately abort to prevent state bleeding into newly active persona
      if (hasPersonaChanged) {
        console.warn(
          `[BankingContext] Payment safely aborted: persona switched during processing from ${initiatingPersonaId} to ${activePersonaIdRef.current}.`
        );
        return {
          success: false,
          errorMessage: 'Payment cancelled: Active persona changed during transaction processing.',
        };
      }

      // 5. Standard Commit: Persona remained unchanged throughout latency
      const updatedAccount: BankAccount = {
        ...snapshotAccount,
        balance: newBalance,
        monthlySpent: newMonthlySpent,
        transactions: [newTransaction, ...snapshotAccount.transactions],
      };

      persistAccount(updatedAccount);
      playUpiSuccessChime();

      return {
        success: true,
        transaction: newTransaction,
        newBalance,
      };
    },
    [account, persistAccount]
  );

  // Add Target Savings Goal
  const addSavingsGoal = useCallback(
    (goalInput: CreateGoalInput): GoalOperationResult => {
      if (!goalInput.title || goalInput.title.trim() === '') {
        playErrorSound();
        return { success: false, errorMessage: 'Please specify a title for your savings goal.' };
      }
      if (!goalInput.targetAmount || goalInput.targetAmount <= 0) {
        playErrorSound();
        return { success: false, errorMessage: 'Target amount must be greater than ₹0.' };
      }

      playClickSound();

      const newGoal: SavingsGoal = {
        id: `goal_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        title: goalInput.title.trim(),
        category: goalInput.category,
        targetAmount: goalInput.targetAmount,
        currentAmount: 0,
        targetDate: goalInput.targetDate || new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
        color: goalInput.color || 'emerald',
        icon: goalInput.icon || 'Target',
        isCompleted: false,
        createdAt: new Date().toISOString(),
      };

      const updatedAccount: BankAccount = {
        ...account,
        savingsGoals: [...account.savingsGoals, newGoal],
      };

      persistAccount(updatedAccount);

      return {
        success: true,
        goal: newGoal,
      };
    },
    [account, persistAccount]
  );

  // Top-Up Savings Goal from Primary Balance
  const topUpSavingsGoal = useCallback(
    (goalId: string, amount: number): GoalOperationResult => {
      if (!amount || isNaN(amount) || amount <= 0) {
        playErrorSound();
        return { success: false, errorMessage: 'Please enter a valid top-up amount greater than ₹0.' };
      }

      if (amount > account.balance) {
        playErrorSound();
        return {
          success: false,
          errorMessage: `Cannot top-up more than available balance (₹${account.balance.toLocaleString('en-IN')}).`,
        };
      }

      const goalIndex = account.savingsGoals.findIndex((g) => g.id === goalId);
      if (goalIndex === -1) {
        playErrorSound();
        return { success: false, errorMessage: 'Savings goal not found.' };
      }

      const currentGoal = account.savingsGoals[goalIndex];
      const updatedCurrentAmount = currentGoal.currentAmount + amount;
      const isCompleted = updatedCurrentAmount >= currentGoal.targetAmount;

      const updatedGoal: SavingsGoal = {
        ...currentGoal,
        currentAmount: updatedCurrentAmount,
        isCompleted,
        lastTopUpDate: new Date().toISOString(),
      };

      const newBalance = account.balance - amount;

      const newTransaction: TransactionRecord = {
        id: `tx_goal_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString(),
        title: `Top-up: ${currentGoal.title}`,
        description: `Transferred to savings goal pot`,
        amount,
        type: 'debit',
        category: 'goal',
        senderOrRecipient: currentGoal.title,
        referenceNumber: `POT/${Date.now()}`,
        status: 'success',
      };

      const updatedGoals = [...account.savingsGoals];
      updatedGoals[goalIndex] = updatedGoal;

      const updatedAccount: BankAccount = {
        ...account,
        balance: newBalance,
        savingsGoals: updatedGoals,
        transactions: [newTransaction, ...account.transactions],
      };

      persistAccount(updatedAccount);

      if (isCompleted) {
        playGoalCelebration();
      } else {
        playClickSound();
      }

      return {
        success: true,
        goal: updatedGoal,
        newBalance,
      };
    },
    [account, persistAccount]
  );

  // Withdraw from Savings Goal back to Primary Balance
  const withdrawFromSavingsGoal = useCallback(
    (goalId: string, amount: number): GoalOperationResult => {
      if (!amount || isNaN(amount) || amount <= 0) {
        playErrorSound();
        return { success: false, errorMessage: 'Please enter a valid withdrawal amount greater than ₹0.' };
      }

      const goalIndex = account.savingsGoals.findIndex((g) => g.id === goalId);
      if (goalIndex === -1) {
        playErrorSound();
        return { success: false, errorMessage: 'Savings goal not found.' };
      }

      const currentGoal = account.savingsGoals[goalIndex];
      if (amount > currentGoal.currentAmount) {
        playErrorSound();
        return {
          success: false,
          errorMessage: `Cannot withdraw more than goal balance (₹${currentGoal.currentAmount.toLocaleString('en-IN')}).`,
        };
      }

      playClickSound();

      const updatedCurrentAmount = currentGoal.currentAmount - amount;
      const updatedGoal: SavingsGoal = {
        ...currentGoal,
        currentAmount: updatedCurrentAmount,
        isCompleted: updatedCurrentAmount >= currentGoal.targetAmount,
      };

      const newBalance = account.balance + amount;

      const newTransaction: TransactionRecord = {
        id: `tx_goal_w_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString(),
        title: `Withdrawal: ${currentGoal.title}`,
        description: `Moved from savings pot back to primary balance`,
        amount,
        type: 'credit',
        category: 'goal',
        senderOrRecipient: currentGoal.title,
        referenceNumber: `POT/W/${Date.now()}`,
        status: 'success',
      };

      const updatedGoals = [...account.savingsGoals];
      updatedGoals[goalIndex] = updatedGoal;

      const updatedAccount: BankAccount = {
        ...account,
        balance: newBalance,
        savingsGoals: updatedGoals,
        transactions: [newTransaction, ...account.transactions],
      };

      persistAccount(updatedAccount);

      return {
        success: true,
        goal: updatedGoal,
        newBalance,
      };
    },
    [account, persistAccount]
  );

  // Delete Savings Goal (refunds remaining saved funds)
  const deleteSavingsGoal = useCallback(
    (goalId: string): { success: boolean; error?: string } => {
      const goal = account.savingsGoals.find((g) => g.id === goalId);
      if (!goal) {
        return { success: false, error: 'Goal not found' };
      }

      playClickSound();

      let newBalance = account.balance;
      let newTransactions = account.transactions;

      // If goal had money in it, refund to primary balance
      if (goal.currentAmount > 0) {
        newBalance += goal.currentAmount;
        const refundTx: TransactionRecord = {
          id: `tx_goal_del_${Date.now()}`,
          timestamp: new Date().toISOString(),
          title: `Goal Closed: ${goal.title}`,
          description: `Refunded savings balance to main account`,
          amount: goal.currentAmount,
          type: 'credit',
          category: 'goal',
          senderOrRecipient: goal.title,
          referenceNumber: `REF/POT/${Date.now()}`,
          status: 'success',
        };
        newTransactions = [refundTx, ...newTransactions];
      }

      const updatedAccount: BankAccount = {
        ...account,
        balance: newBalance,
        savingsGoals: account.savingsGoals.filter((g) => g.id !== goalId),
        transactions: newTransactions,
      };

      persistAccount(updatedAccount);
      return { success: true };
    },
    [account, persistAccount]
  );

  // Reset Banking State to Persona Defaults
  const resetBankingState = useCallback(() => {
    playClickSound();
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(storageKey);
      } catch (err) {
        console.warn('Error clearing banking storage:', err);
      }
    }
    setAccount(activePersona.initialBankAccount);
  }, [storageKey, activePersona.initialBankAccount]);

  const value: BankingContextType = {
    account,
    balance: account.balance,
    card: account.virtualCard,
    transactions: account.transactions,
    savingsGoals: account.savingsGoals,
    monthlySpent: account.monthlySpent,
    isCardFrozen: account.virtualCard.isFrozen,
    isCvvRevealed,
    cvvSecondsLeft,
    isCardNumberMasked,
    revealCvv,
    hideCvv,
    toggleCardNumberMask,
    toggleCardFreeze,
    setCardOnlineLimit,
    updateCardLimit: setCardOnlineLimit,
    toggleNfc,
    depositMoney,
    sendUpiPayment,
    executeUpiPayment: sendUpiPayment,
    addSavingsGoal,
    createSavingsGoal: addSavingsGoal,
    topUpSavingsGoal,
    topUpGoal: topUpSavingsGoal,
    withdrawFromSavingsGoal,
    deleteSavingsGoal,
    resetBankingState,
  };

  return (
    <BankingContext.Provider value={value}>
      {children}
    </BankingContext.Provider>
  );
};

export const useBanking = (): BankingContextType => {
  const context = useContext(BankingContext);
  if (!context) {
    throw new Error('useBanking must be used within a BankingProvider');
  }
  return context;
};
