/**
 * Gen-Young Banking Types & Interfaces
 * Authoritative specification for Milestone 1 (R1 Banking Foundation)
 * Path: src/types/banking.ts
 */

export type AccountType = 'youth_savings' | 'minor_savings' | 'salary_savings';

export type TransactionType = 'credit' | 'debit';

export type TransactionCategory =
  | 'upi'
  | 'card'
  | 'transfer'
  | 'goal'
  | 'allowance'
  | 'salary'
  | 'perk'
  | 'refund';

export type TransactionStatus = 'success' | 'pending' | 'failed';

export interface TransactionRecord {
  id: string;
  timestamp: string; // ISO 8601 string
  title: string;
  description?: string;
  amount: number; // Positive magnitude; type determines credit/debit
  type: TransactionType;
  category: TransactionCategory;
  senderOrRecipient: string;
  upiId?: string;
  referenceNumber: string; // e.g. "UPI/2026/81920193"
  status: TransactionStatus;
  note?: string;
}

export type GoalCategory =
  | 'tech'
  | 'education'
  | 'emergency'
  | 'lifestyle'
  | 'travel'
  | 'green';

export interface SavingsGoal {
  id: string;
  title: string;
  category: GoalCategory;
  targetAmount: number;
  currentAmount: number;
  targetDate: string; // YYYY-MM-DD
  color: string; // e.g. 'violet', 'teal', 'amber', 'emerald'
  icon: string; // Lucide icon identifier
  isCompleted: boolean;
  createdAt: string;
  lastTopUpDate?: string;
}

export interface VirtualDebitCardData {
  cardNumber: string; // "5081 2840 9210 4092"
  maskedCardNumber: string; // "5081 •••• •••• 4092"
  cardHolder: string;
  expiryMonth: number;
  expiryYear: number;
  expiryFormatted: string; // "08/29"
  cvv: string; // 3-digit CVV
  isFrozen: boolean;
  onlineLimit: number; // Slider range ₹500 to ₹25,000
  nfcEnabled: boolean;
  network: 'RuPay Platinum Youth' | 'RuPay Youth Junior' | 'RuPay Platinum Youth Corporate';
}

export interface BankAccount {
  accountNumber: string; // 12-digit account number
  ifsc: string; // e.g. "GYBK0001001"
  branch: string;
  accountType: string; // "Zero-Balance Youth Savings"
  balance: number; // Primary available balance in INR
  currency: 'INR';
  monthlySpent: number; // Spent in current calendar month
  monthlyBudget: number; // Monthly spending budget/target
  virtualCard: VirtualDebitCardData;
  transactions: TransactionRecord[];
  savingsGoals: SavingsGoal[];
}

export interface UpiPaymentPayload {
  recipient?: string;
  recipientUpiId?: string;
  recipientName?: string;
  amount: number;
  note?: string;
  pin?: string;
  txId?: string;
}

export interface UpiPaymentResult {
  success: boolean;
  transaction?: TransactionRecord;
  newBalance?: number;
  errorMessage?: string;
}

export interface GoalOperationResult {
  success: boolean;
  goal?: SavingsGoal;
  newBalance?: number;
  errorMessage?: string;
}

export interface CreateGoalInput {
  title: string;
  category: GoalCategory;
  targetAmount: number;
  targetDate?: string;
  color?: string;
  icon?: string;
}

export interface BankingContextType {
  account: BankAccount;
  balance: number;
  card: VirtualDebitCardData;
  transactions: TransactionRecord[];
  savingsGoals: SavingsGoal[];
  monthlySpent: number;
  isCardFrozen: boolean;
  isCvvRevealed: boolean;
  cvvSecondsLeft: number;
  isCardNumberMasked: boolean;
  revealCvv: () => void;
  hideCvv: () => void;
  toggleCardNumberMask: () => void;
  toggleCardFreeze: (frozen?: boolean) => void;
  setCardOnlineLimit: (limit: number) => { success: boolean; message?: string };
  updateCardLimit: (limit: number) => { success: boolean; message?: string };
  toggleNfc: () => void;
  depositMoney: (amount: number) => void;
  sendUpiPayment: (payload: UpiPaymentPayload) => Promise<UpiPaymentResult>;
  executeUpiPayment: (payload: UpiPaymentPayload) => Promise<UpiPaymentResult>;
  addSavingsGoal: (goal: CreateGoalInput) => GoalOperationResult;
  createSavingsGoal: (goal: CreateGoalInput) => GoalOperationResult;
  topUpSavingsGoal: (goalId: string, amount: number) => GoalOperationResult;
  topUpGoal: (goalId: string, amount: number) => GoalOperationResult;
  withdrawFromSavingsGoal: (goalId: string, amount: number) => GoalOperationResult;
  deleteSavingsGoal: (goalId: string) => { success: boolean; error?: string };
  resetBankingState: () => void;
}
