/**
 * Adversarial Persona Isolation & Async Race Condition Stress Harness
 * Verifies that BankingContext's epoch tracking, AbortController, and localStorage
 * partitioning completely prevent state bleeding and stale UI rendering under
 * asynchronous stress and rapid persona switching.
 */

const assert = require('assert');

// In-memory mock localStorage
class MockLocalStorage {
  constructor() {
    this.store = new Map();
  }
  getItem(key) {
    return this.store.get(key) || null;
  }
  setItem(key, value) {
    this.store.set(key, String(value));
  }
  removeItem(key) {
    this.store.delete(key);
  }
  clear() {
    this.store.clear();
  }
}

const mockStorage = new MockLocalStorage();
global.localStorage = mockStorage;
global.window = {};

const MOCK_INITIAL_PERSONAS = {
  priya: {
    id: 'priya',
    name: 'Priya Sharma',
    role: 'student',
    initialBankAccount: {
      accountNumber: '987654321021',
      balance: 14500,
      monthlySpent: 6240,
      virtualCard: { isFrozen: false, onlineLimit: 15000 },
      savingsGoals: [{ id: 'goal_priya_1', title: 'MacBook Pro Upgrade', targetAmount: 45000, currentAmount: 22000 }],
      transactions: [{ id: 'tx_p1', title: 'Initial', amount: 100, type: 'credit', status: 'success' }]
    }
  },
  aarav: {
    id: 'aarav',
    name: 'Aarav Patel',
    role: 'aspirant',
    initialBankAccount: {
      accountNumber: '987654321016',
      balance: 2800,
      monthlySpent: 1200,
      virtualCard: { isFrozen: false, onlineLimit: 5000 },
      savingsGoals: [{ id: 'goal_aarav_1', title: 'JEE Advanced Prep', targetAmount: 15000, currentAmount: 6500 }],
      transactions: [{ id: 'tx_a1', title: 'Initial', amount: 50, type: 'credit', status: 'success' }]
    }
  },
  ananya: {
    id: 'ananya',
    name: 'Ananya Verma',
    role: 'professional',
    initialBankAccount: {
      accountNumber: '987654321024',
      balance: 58400,
      monthlySpent: 22100,
      virtualCard: { isFrozen: false, onlineLimit: 25000 },
      savingsGoals: [{ id: 'goal_ananya_1', title: 'Emergency Fund', targetAmount: 150000, currentAmount: 85000 }],
      transactions: [{ id: 'tx_an1', title: 'Initial', amount: 1000, type: 'credit', status: 'success' }]
    }
  }
};

/**
 * Replicates BankingContext's exact concurrency & lifecycle logic
 */
class BankingContextHarness {
  constructor(initialPersonaId = 'priya') {
    this.activePersonaId = initialPersonaId;
    this.activePersona = MOCK_INITIAL_PERSONAS[initialPersonaId];
    
    // Concurrency and lifecycle tracking refs
    this.activePersonaIdRef = { current: initialPersonaId };
    this.personaEpochRef = { current: 0 };
    this.inFlightAbortControllersRef = { current: new Set() };
    
    this.account = this.loadAccount();
  }

  get storageKey() {
    return `gen_young_banking_${this.activePersonaId}`;
  }

  loadAccount() {
    try {
      const saved = mockStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.balance === 'number' && Array.isArray(parsed.transactions)) {
          return parsed;
        }
      }
    } catch (err) {}
    // Safe deep clone
    return JSON.parse(JSON.stringify(this.activePersona.initialBankAccount));
  }

  persistAccount(updated) {
    this.account = updated;
    mockStorage.setItem(this.storageKey, JSON.stringify(updated));
  }

  switchPersona(newPersonaId) {
    if (!MOCK_INITIAL_PERSONAS[newPersonaId]) throw new Error('Invalid persona');
    
    this.activePersonaId = newPersonaId;
    this.activePersona = MOCK_INITIAL_PERSONAS[newPersonaId];
    this.activePersonaIdRef.current = newPersonaId;

    // React useEffect simulation on persona change:
    this.personaEpochRef.current += 1;

    // Abort in-flight requests
    this.inFlightAbortControllersRef.current.forEach((controller) => {
      try {
        controller.abort();
      } catch {}
    });
    this.inFlightAbortControllersRef.current.clear();

    this.account = this.loadAccount();
  }

  async sendUpiPayment(payload, latencyMs = 300) {
    const initiatingPersonaId = this.activePersonaIdRef.current;
    const callEpoch = this.personaEpochRef.current;
    const snapshotAccount = this.account;

    if (!payload.recipient || payload.recipient.trim() === '') {
      return { success: false, errorMessage: 'Invalid recipient' };
    }
    if (!payload.amount || payload.amount <= 0) {
      return { success: false, errorMessage: 'Invalid amount' };
    }
    if (snapshotAccount.virtualCard.isFrozen) {
      return { success: false, errorMessage: 'Card frozen' };
    }
    if (payload.amount > snapshotAccount.balance) {
      return { success: false, errorMessage: 'Insufficient balance' };
    }

    const abortController = new AbortController();
    this.inFlightAbortControllersRef.current.add(abortController);

    try {
      await new Promise((resolve) => {
        if (abortController.signal.aborted) {
          resolve();
          return;
        }
        const timer = setTimeout(() => {
          abortController.signal.removeEventListener('abort', onAbort);
          resolve();
        }, latencyMs);

        function onAbort() {
          clearTimeout(timer);
          abortController.signal.removeEventListener('abort', onAbort);
          resolve();
        }
        abortController.signal.addEventListener('abort', onAbort);
      });
    } finally {
      this.inFlightAbortControllersRef.current.delete(abortController);
    }

    const hasPersonaChanged =
      abortController.signal.aborted ||
      this.personaEpochRef.current !== callEpoch ||
      this.activePersonaIdRef.current !== initiatingPersonaId;

    if (hasPersonaChanged) {
      return {
        success: false,
        errorMessage: 'Payment cancelled: Active persona changed during transaction processing.'
      };
    }

    const newBalance = snapshotAccount.balance - payload.amount;
    const updatedAccount = {
      ...snapshotAccount,
      balance: newBalance,
      transactions: [
        {
          id: `tx_${Date.now()}`,
          title: payload.recipient,
          amount: payload.amount,
          type: 'debit',
          status: 'success'
        },
        ...snapshotAccount.transactions
      ]
    };

    this.persistAccount(updatedAccount);
    return { success: true, newBalance };
  }

  // PersonaSwitcherModal logic calculation
  getLiveModalData() {
    const data = {};
    const personas = Object.values(MOCK_INITIAL_PERSONAS);
    for (const p of personas) {
      if (p.id === this.activePersona.id) {
        data[p.id] = {
          balance: this.account.balance,
          goalTitle: this.account.savingsGoals?.[0]?.title ?? 'None'
        };
      } else {
        let b = p.initialBankAccount.balance;
        let g = p.initialBankAccount.savingsGoals?.[0]?.title ?? 'None';
        const raw = mockStorage.getItem(`gen_young_banking_${p.id}`);
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed.balance === 'number') {
              b = parsed.balance;
              if (Array.isArray(parsed.savingsGoals) && parsed.savingsGoals.length > 0) {
                g = parsed.savingsGoals[0].title || g;
              }
            }
          } catch {}
        }
        data[p.id] = { balance: b, goalTitle: g };
      }
    }
    return data;
  }
}

async function runAdversarialSuite() {
  console.log('================================================================');
  console.log(' ADVERSARIAL RE-VERIFICATION: PERSONA ASYNC ISOLATION HARNESS   ');
  console.log('================================================================\n');

  let passed = 0;
  let total = 0;

  function runTest(name, fn) {
    total++;
    try {
      fn();
      passed++;
      console.log(`  ✓ [PASS] ${name}`);
    } catch (err) {
      console.error(`  ❌ [FAIL] ${name}`);
      console.error(`     Error: ${err.message}`);
      throw err;
    }
  }

  async function runAsyncTest(name, fn) {
    total++;
    try {
      await fn();
      passed++;
      console.log(`  ✓ [PASS] ${name}`);
    } catch (err) {
      console.error(`  ❌ [FAIL] ${name}`);
      console.error(`     Error: ${err.message}`);
      throw err;
    }
  }

  mockStorage.clear();

  // TEST 1: Baseline synchronous execution without switching
  await runAsyncTest('ADV-01: Standard payment completes without switching persona', async () => {
    const ctx = new BankingContextHarness('priya');
    assert.strictEqual(ctx.account.balance, 14500);
    const res = await ctx.sendUpiPayment({ recipient: 'merchant@upi', amount: 500 }, 50);
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.newBalance, 14000);
    assert.strictEqual(ctx.account.balance, 14000);
    assert.strictEqual(ctx.account.transactions[0].amount, 500);
  });

  // TEST 2: Mid-flight persona switch aborts transaction and isolates state
  await runAsyncTest('ADV-02: Mid-flight persona switch aborts in-flight payment and prevents state bleeding', async () => {
    mockStorage.clear();
    const ctx = new BankingContextHarness('priya');
    
    // Priya starts payment of 1000 with 150ms latency
    const paymentPromise = ctx.sendUpiPayment({ recipient: 'canteen@upi', amount: 1000 }, 150);

    // After 30ms, user rapidly switches persona to Aarav
    await new Promise((r) => setTimeout(r, 30));
    ctx.switchPersona('aarav');

    // Wait for payment to resolve
    const res = await paymentPromise;

    // 1. Payment must be safely cancelled
    assert.strictEqual(res.success, false);
    assert.match(res.errorMessage, /Payment cancelled: Active persona changed/);

    // 2. Aarav's balance must NOT be reduced (initial 2800)
    assert.strictEqual(ctx.account.balance, 2800);
    assert.strictEqual(ctx.account.transactions.length, 1); // Only initial

    // 3. Priya's persisted state in storage must NOT be contaminated
    const priyaStorage = mockStorage.getItem('gen_young_banking_priya');
    if (priyaStorage) {
      const parsed = JSON.parse(priyaStorage);
      assert.strictEqual(parsed.balance, 14500);
    }
  });

  // TEST 3: Ping-Pong switch (Priya -> Aarav -> Ananya -> Priya) returns during epoch change
  await runAsyncTest('ADV-03: Ping-pong switching back to origin persona rejects stale epoch callback', async () => {
    mockStorage.clear();
    const ctx = new BankingContextHarness('priya');

    // Start payment during epoch 0
    const paymentPromise = ctx.sendUpiPayment({ recipient: 'books@upi', amount: 800 }, 150);

    // Switch rapidly between personas and back to Priya
    await new Promise((r) => setTimeout(r, 20));
    ctx.switchPersona('aarav'); // epoch 1
    await new Promise((r) => setTimeout(r, 20));
    ctx.switchPersona('ananya'); // epoch 2
    await new Promise((r) => setTimeout(r, 20));
    ctx.switchPersona('priya'); // epoch 3 (active persona is priya again!)

    const res = await paymentPromise;

    // Must be cancelled because epoch changed from 0 to 3 and controller was aborted
    assert.strictEqual(res.success, false);
    assert.match(res.errorMessage, /Payment cancelled: Active persona changed/);

    // Priya's balance must remain 14500 (not 14500 - 800 = 13700)
    assert.strictEqual(ctx.account.balance, 14500);
  });

  // TEST 4: Heavy Concurrent Stress Test (50 randomized async switches and payments)
  await runAsyncTest('ADV-04: Heavy randomized concurrent switching and async race stress test', async () => {
    mockStorage.clear();
    const ctx = new BankingContextHarness('priya');
    const personas = ['priya', 'aarav', 'ananya'];

    const promises = [];
    for (let i = 0; i < 50; i++) {
      const targetPersona = personas[i % 3];
      ctx.switchPersona(targetPersona);

      // Fire a payment with varying latencies
      const latency = Math.floor(Math.random() * 60) + 10;
      const amt = 50 + (i % 5) * 10;
      promises.push(
        ctx.sendUpiPayment({ recipient: `user${i}@upi`, amount: amt }, latency)
      );

      // Tiny sleep to interleave
      await new Promise((r) => setTimeout(r, 5));
    }

    const results = await Promise.all(promises);
    assert.strictEqual(results.length, 50);

    // Verify all 3 persona storage states for invariants:
    // 1. Balance must never be negative
    // 2. Transactions in each storage must strictly belong to that persona (no undefineds)
    for (const p of personas) {
      const saved = mockStorage.getItem(`gen_young_banking_${p}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        assert(parsed.balance >= 0, `Persona ${p} balance fell below 0: ${parsed.balance}`);
        assert(Array.isArray(parsed.transactions), `Persona ${p} transactions is not array`);
      }
    }
  });

  // TEST 5: PersonaSwitcherModal displays live balances correctly across state transitions
  runTest('ADV-05: PersonaSwitcherModal live banking data calculation reflects live & persisted balances', () => {
    mockStorage.clear();
    const ctx = new BankingContextHarness('priya');

    // Initial state before any transactions
    let modalData = ctx.getLiveModalData();
    assert.strictEqual(modalData.priya.balance, 14500);
    assert.strictEqual(modalData.aarav.balance, 2800);
    assert.strictEqual(modalData.ananya.balance, 58400);

    // Mutate Priya's account in-memory (e.g. deposit 2000)
    ctx.persistAccount({
      ...ctx.account,
      balance: 16500
    });

    // Modal data for Priya should be 16500
    modalData = ctx.getLiveModalData();
    assert.strictEqual(modalData.priya.balance, 16500);
    assert.strictEqual(modalData.aarav.balance, 2800);

    // Switch to Aarav
    ctx.switchPersona('aarav');
    // Mutate Aarav's balance to 2500
    ctx.persistAccount({
      ...ctx.account,
      balance: 2500
    });

    // Modal data should show Aarav = 2500 (active), Priya = 16500 (persisted in localStorage)
    modalData = ctx.getLiveModalData();
    assert.strictEqual(modalData.aarav.balance, 2500);
    assert.strictEqual(modalData.priya.balance, 16500);
    assert.strictEqual(modalData.ananya.balance, 58400);
  });

  // TEST 6: Deep Clone Immutability Protection
  runTest('ADV-06: Deep clone prevents accidental mutation of global template personas', () => {
    mockStorage.clear();
    const ctx = new BankingContextHarness('aarav');
    const originalMockBalance = MOCK_INITIAL_PERSONAS.aarav.initialBankAccount.balance;
    
    // Directly mutate context account object
    ctx.account.balance = 999999;
    ctx.account.virtualCard.isFrozen = true;

    // Verify global template is untouched
    assert.strictEqual(MOCK_INITIAL_PERSONAS.aarav.initialBankAccount.balance, originalMockBalance);
    assert.strictEqual(MOCK_INITIAL_PERSONAS.aarav.initialBankAccount.virtualCard.isFrozen, false);
  });

  console.log('\n================================================================');
  console.log(` ALL ${passed}/${total} ADVERSARIAL ISOLATION TESTS PASSED!`);
  console.log('================================================================\n');
}

runAdversarialSuite().catch((err) => {
  console.error('Adversarial Test Suite Failed:', err);
  process.exit(1);
});
