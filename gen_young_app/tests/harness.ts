/**
 * Gen-Young E2E Opaque-Box Test Harness
 * Author: teamwork_preview_test_writer
 * Derived from: ORIGINAL_REQUEST.md, PROJECT.md, TEST_INFRA.md
 */

export interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  error?: Error;
  durationMs: number;
  assertionCount: number;
}

export interface SuiteSummary {
  suiteName: string;
  total: number;
  passed: number;
  failed: number;
  assertions: number;
  durationMs: number;
  results: TestResult[];
}

export class TestHarness {
  private currentSuite = 'Default Suite';
  private results: TestResult[] = [];
  public currentAssertionCount = 0;

  describe = (name: string, fn: () => void): void => {
    const prevSuite = this.currentSuite;
    this.currentSuite = name;
    try {
      fn();
    } finally {
      this.currentSuite = prevSuite;
    }
  };

  it = (name: string, fn: () => void | Promise<void>): void | Promise<void> => {
    const start = Date.now();
    this.currentAssertionCount = 0;
    try {
      const res = fn();
      if (res && typeof (res as Promise<void>).then === 'function') {
        return (res as Promise<void>).then(
          () => {
            this.recordSuccess(name, start);
          },
          (err) => {
            this.recordFailure(name, start, err);
          }
        );
      }
      this.recordSuccess(name, start);
    } catch (err: any) {
      this.recordFailure(name, start, err);
    }
  };

  test = this.it;

  private recordSuccess(name: string, start: number): void {
    const durationMs = Date.now() - start;
    this.results.push({
      suite: this.currentSuite,
      name,
      passed: true,
      durationMs,
      assertionCount: Math.max(1, this.currentAssertionCount),
    });
  }

  private recordFailure(name: string, start: number, err: any): void {
    const durationMs = Date.now() - start;
    this.results.push({
      suite: this.currentSuite,
      name,
      passed: false,
      error: err instanceof Error ? err : new Error(String(err)),
      durationMs,
      assertionCount: this.currentAssertionCount,
    });
  }

  expect = <T>(actual: T) => {
    const harness = this;
    harness.currentAssertionCount++;

    const createMatchers = (isNot: boolean) => ({
      toBe(expected: any) {
        const matches = Object.is(actual, expected);
        if (isNot ? matches : !matches) {
          throw new Error(
            isNot
              ? `Assertion Failed: expected ${JSON.stringify(actual)} NOT to be ${JSON.stringify(expected)}`
              : `Assertion Failed: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`
          );
        }
      },
      toEqual(expected: any) {
        const actualJson = JSON.stringify(actual);
        const expectedJson = JSON.stringify(expected);
        const matches = actualJson === expectedJson;
        if (isNot ? matches : !matches) {
          throw new Error(
            isNot
              ? `Assertion Failed: expected values NOT to be deep equal`
              : `Assertion Failed: expected deep equality\nExpected: ${expectedJson}\nReceived: ${actualJson}`
          );
        }
      },
      toBeTruthy() {
        const matches = Boolean(actual);
        if (isNot ? matches : !matches) {
          throw new Error(`Assertion Failed: expected ${JSON.stringify(actual)} ${isNot ? 'NOT to be' : 'to be'} truthy`);
        }
      },
      toBeFalsy() {
        const matches = !actual;
        if (isNot ? matches : !matches) {
          throw new Error(`Assertion Failed: expected ${JSON.stringify(actual)} ${isNot ? 'NOT to be' : 'to be'} falsy`);
        }
      },
      toBeDefined() {
        const matches = actual !== undefined;
        if (isNot ? matches : !matches) {
          throw new Error(`Assertion Failed: expected value ${isNot ? 'to be undefined' : 'to be defined'}`);
        }
      },
      toBeUndefined() {
        const matches = actual === undefined;
        if (isNot ? matches : !matches) {
          throw new Error(`Assertion Failed: expected value ${isNot ? 'to be defined' : 'to be undefined'}`);
        }
      },
      toBeNull() {
        const matches = actual === null;
        if (isNot ? matches : !matches) {
          throw new Error(`Assertion Failed: expected value ${isNot ? 'NOT to be null' : 'to be null'}`);
        }
      },
      toBeGreaterThan(expected: number) {
        const matches = typeof actual === 'number' && actual > expected;
        if (isNot ? matches : !matches) {
          throw new Error(`Assertion Failed: expected ${actual} ${isNot ? '<=' : '>'} ${expected}`);
        }
      },
      toBeGreaterThanOrEqual(expected: number) {
        const matches = typeof actual === 'number' && actual >= expected;
        if (isNot ? matches : !matches) {
          throw new Error(`Assertion Failed: expected ${actual} ${isNot ? '<' : '>='} ${expected}`);
        }
      },
      toBeLessThan(expected: number) {
        const matches = typeof actual === 'number' && actual < expected;
        if (isNot ? matches : !matches) {
          throw new Error(`Assertion Failed: expected ${actual} ${isNot ? '>=' : '<'} ${expected}`);
        }
      },
      toBeLessThanOrEqual(expected: number) {
        const matches = typeof actual === 'number' && actual <= expected;
        if (isNot ? matches : !matches) {
          throw new Error(`Assertion Failed: expected ${actual} ${isNot ? '>' : '<='} ${expected}`);
        }
      },
      toContain(itemOrSubstr: any) {
        let matches = false;
        if (typeof actual === 'string') {
          matches = actual.includes(String(itemOrSubstr));
        } else if (Array.isArray(actual)) {
          matches = actual.some((el) => Object.is(el, itemOrSubstr) || JSON.stringify(el) === JSON.stringify(itemOrSubstr));
        }
        if (isNot ? matches : !matches) {
          throw new Error(
            `Assertion Failed: expected ${JSON.stringify(actual)} ${isNot ? 'NOT to contain' : 'to contain'} ${JSON.stringify(itemOrSubstr)}`
          );
        }
      },
      toHaveLength(length: number) {
        const len = (actual as any)?.length;
        const matches = len === length;
        if (isNot ? matches : !matches) {
          throw new Error(`Assertion Failed: expected length ${isNot ? 'NOT to be' : 'to be'} ${length}, received ${len}`);
        }
      },
      toMatch(pattern: RegExp) {
        const matches = typeof actual === 'string' && pattern.test(actual);
        if (isNot ? matches : !matches) {
          throw new Error(`Assertion Failed: expected "${actual}" ${isNot ? 'NOT to match' : 'to match'} ${pattern}`);
        }
      },
      toBeCloseTo(expected: number, precision = 2) {
        const diff = Math.abs((actual as any) - expected);
        const tolerance = Math.pow(10, -precision) / 2;
        const matches = diff <= tolerance;
        if (isNot ? matches : !matches) {
          throw new Error(`Assertion Failed: expected ${actual} ${isNot ? 'NOT to be close to' : 'to be close to'} ${expected}`);
        }
      },
      toThrow(expectedMsgOrRegex?: string | RegExp) {
        if (typeof actual !== 'function') {
          throw new Error(`Assertion Failed: toThrow expects a function, received ${typeof actual}`);
        }
        let didThrow = false;
        let thrownError: any = null;
        try {
          (actual as any)();
        } catch (e) {
          didThrow = true;
          thrownError = e;
        }
        if (isNot) {
          if (didThrow) {
            throw new Error(`Assertion Failed: expected function NOT to throw, but it threw: ${thrownError?.message || thrownError}`);
          }
          return;
        }
        if (!didThrow) {
          throw new Error(`Assertion Failed: expected function to throw an error, but it returned cleanly`);
        }
        if (expectedMsgOrRegex) {
          const msg = thrownError?.message || String(thrownError);
          if (typeof expectedMsgOrRegex === 'string') {
            if (!msg.includes(expectedMsgOrRegex)) {
              throw new Error(`Assertion Failed: error message "${msg}" did not contain "${expectedMsgOrRegex}"`);
            }
          } else if (expectedMsgOrRegex instanceof RegExp) {
            if (!expectedMsgOrRegex.test(msg)) {
              throw new Error(`Assertion Failed: error message "${msg}" did not match regex ${expectedMsgOrRegex}`);
            }
          }
        }
      },
    });

    const matchers = createMatchers(false);
    (matchers as any).not = createMatchers(true);
    return matchers as typeof matchers & { not: typeof matchers };
  };

  getResults(): TestResult[] {
    return this.results;
  }

  getSummaries(): SuiteSummary[] {
    const suitesMap = new Map<string, SuiteSummary>();
    for (const r of this.results) {
      if (!suitesMap.has(r.suite)) {
        suitesMap.set(r.suite, {
          suiteName: r.suite,
          total: 0,
          passed: 0,
          failed: 0,
          assertions: 0,
          durationMs: 0,
          results: [],
        });
      }
      const s = suitesMap.get(r.suite)!;
      s.total++;
      if (r.passed) s.passed++;
      else s.failed++;
      s.assertions += r.assertionCount;
      s.durationMs += r.durationMs;
      s.results.push(r);
    }
    return Array.from(suitesMap.values());
  }

  clear(): void {
    this.results = [];
    this.currentAssertionCount = 0;
  }
}

export const harness = new TestHarness();
export const describe = harness.describe;
export const it = harness.it;
export const test = harness.test;
export const expect = harness.expect;
