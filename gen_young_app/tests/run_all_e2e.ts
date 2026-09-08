/**
 * Gen-Young Master E2E Test Runner
 * Author: teamwork_preview_test_writer
 * Specifications: ORIGINAL_REQUEST.md, PROJECT.md, TEST_INFRA.md
 *
 * Runs all 4 test tiers:
 * - Tier 1: Feature Isolation Tests (>=200 tests across 40 features)
 * - Tier 2: Boundary & Corner Tests (>=200 tests across 40 features)
 * - Tier 3: Pairwise Combinatorial Tests (>=40 interaction tests)
 * - Tier 4: Real-World Application Scenarios (>=5 multi-feature user journeys)
 *
 * Exits with code 0 on 100% pass; non-zero on any failure.
 */

import { harness, TestHarness } from './harness';
import { registerTier1Tests } from './tier1_feature_tests';
import { registerTier2Tests } from './tier2_boundary_tests';
import { registerTier3Tests } from './tier3_combinatorial_tests';
import { registerTier4Tests } from './tier4_scenario_tests';

export async function runAllE2E(customHarness?: TestHarness): Promise<{
  passed: boolean;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  totalAssertions: number;
  durationMs: number;
  tierCounts: { tier1: number; tier2: number; tier3: number; tier4: number };
}> {
  const runner = customHarness || harness;
  runner.clear();

  console.log('================================================================');
  console.log('       GEN-YOUNG E2E OPAQUE-BOX AUTOMATED TEST SUITE             ');
  console.log('   Derived from: ORIGINAL_REQUEST.md, PROJECT.md, TEST_INFRA.md ');
  console.log('================================================================\n');

  const startTime = Date.now();

  // 1. Register and execute Tier 1
  console.log('>>> [1/4] Executing Tier 1: Feature Isolation Tests (40 Features)...');
  const t1StartResults = runner.getResults().length;
  registerTier1Tests(runner);
  const tier1Count = runner.getResults().length - t1StartResults;
  console.log(`    ✓ Tier 1 Completed: ${tier1Count} tests registered & executed.\n`);

  // 2. Register and execute Tier 2
  console.log('>>> [2/4] Executing Tier 2: Boundary & Corner Condition Tests...');
  const t2StartResults = runner.getResults().length;
  registerTier2Tests(runner);
  const tier2Count = runner.getResults().length - t2StartResults;
  console.log(`    ✓ Tier 2 Completed: ${tier2Count} tests registered & executed.\n`);

  // 3. Register and execute Tier 3
  console.log('>>> [3/4] Executing Tier 3: Pairwise Combinatorial Interaction Tests...');
  const t3StartResults = runner.getResults().length;
  registerTier3Tests(runner);
  const tier3Count = runner.getResults().length - t3StartResults;
  console.log(`    ✓ Tier 3 Completed: ${tier3Count} tests registered & executed.\n`);

  // 4. Register and execute Tier 4
  console.log('>>> [4/4] Executing Tier 4: Real-World Multi-Feature Scenarios...');
  const t4StartResults = runner.getResults().length;
  registerTier4Tests(runner);
  const tier4Count = runner.getResults().length - t4StartResults;
  console.log(`    ✓ Tier 4 Completed: ${tier4Count} scenarios registered & executed.\n`);

  const totalDuration = Date.now() - startTime;
  const allResults = runner.getResults();

  let passedCount = 0;
  let failedCount = 0;
  let totalAssertions = 0;
  const failureDetails: { suite: string; name: string; error: Error }[] = [];

  for (const r of allResults) {
    totalAssertions += r.assertionCount;
    if (r.passed) {
      passedCount++;
    } else {
      failedCount++;
      if (r.error) {
        failureDetails.push({ suite: r.suite, name: r.name, error: r.error });
      }
    }
  }

  // Verification against thresholds defined in TEST_INFRA.md
  const tier1ThresholdMet = tier1Count >= 200;
  const tier2ThresholdMet = tier2Count >= 200;
  const tier3ThresholdMet = tier3Count >= 40;
  const tier4ThresholdMet = tier4Count >= 5;
  const totalThresholdMet = (tier1Count + tier2Count + tier3Count + tier4Count) >= 445;

  console.log('================================================================');
  console.log('                       E2E TEST SUMMARY                         ');
  console.log('================================================================');
  console.log(` Tier 1 (Feature Tests):      ${tier1Count.toString().padStart(4)} tests   [Req: >=200] ${tier1ThresholdMet ? '✓ PASS' : '✗ FAIL'}`);
  console.log(` Tier 2 (Boundary Tests):     ${tier2Count.toString().padStart(4)} tests   [Req: >=200] ${tier2ThresholdMet ? '✓ PASS' : '✗ FAIL'}`);
  console.log(` Tier 3 (Combinatorial Tests): ${tier3Count.toString().padStart(4)} tests   [Req: >= 40] ${tier3ThresholdMet ? '✓ PASS' : '✗ FAIL'}`);
  console.log(` Tier 4 (Scenario Tests):     ${tier4Count.toString().padStart(4)} tests   [Req: >=  5] ${tier4ThresholdMet ? '✓ PASS' : '✗ FAIL'}`);
  console.log('----------------------------------------------------------------');
  console.log(` Total Test Cases:            ${allResults.length.toString().padStart(4)} tests   [Req: >=445] ${totalThresholdMet ? '✓ PASS' : '✗ FAIL'}`);
  console.log(` Total Assertions Evaluated:  ${totalAssertions.toString().padStart(4)} assertions`);
  console.log(` Tests Passed:                ${passedCount.toString().padStart(4)} / ${allResults.length}`);
  console.log(` Tests Failed:                ${failedCount.toString().padStart(4)} / ${allResults.length}`);
  console.log(` Total Duration:              ${totalDuration}ms`);
  console.log('================================================================\n');

  if (failureDetails.length > 0) {
    console.error(`FAILED TESTS (${failureDetails.length}):`);
    for (const f of failureDetails) {
      console.error(`  ✗ [${f.suite}] -> ${f.name}`);
      console.error(`    ${f.error.message}`);
      if (f.error.stack) {
        console.error(`    ${f.error.stack.split('\n').slice(1, 4).join('\n')}`);
      }
      console.error('');
    }
  }

  const allPassed = failedCount === 0 && tier1ThresholdMet && tier2ThresholdMet && tier3ThresholdMet && tier4ThresholdMet && totalThresholdMet;

  if (allPassed) {
    console.log('🎉 100% E2E TEST SUITE PASS: ALL TIERS & THRESHOLDS SATISFIED!');
  } else {
    console.error('❌ E2E TEST RUN FAILED: One or more tests failed or coverage thresholds unmet.');
  }

  return {
    passed: allPassed,
    totalTests: allResults.length,
    passedTests: passedCount,
    failedTests: failedCount,
    totalAssertions,
    durationMs: totalDuration,
    tierCounts: {
      tier1: tier1Count,
      tier2: tier2Count,
      tier3: tier3Count,
      tier4: tier4Count,
    },
  };
}

// Auto-run when executed directly via CLI (tsx, node, etc.)
runAllE2E()
  .then((res) => {
    if (!res.passed) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  })
  .catch((err) => {
    console.error('Fatal Runner Exception:', err);
    process.exit(1);
  });
