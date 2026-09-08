# E2E Test Infra: Gen-Young Prototype

## Test Philosophy
- Opaque-box, requirement-driven. Derived strictly from `ORIGINAL_REQUEST.md` and user-facing specifications without dependence on internal component structure.
- Methodology: Category-Partition + Boundary Value Analysis (BVA) + Pairwise Combinatorial Testing + Real-World Workload Testing.

## Feature Inventory & Test Matrix
| # | Feature | Source (Requirement) | Tier 1 (Coverage) | Tier 2 (Boundaries) | Tier 3 (Interactions) |
|---|---------|---------------------|:-----------------:|:-------------------:|:---------------------:|
| 1 | App Shell & Bottom Navigation | R1 (Dashboard, 6 tabs) | 5 | 5 | ✓ |
| 2 | Persona Switcher | R1 (3 youth cohorts) | 5 | 5 | ✓ |
| 3 | Zero-Balance Account Summary | R1 (Balance, IFSC, Spend) | 5 | 5 | ✓ |
| 4 | Virtual Debit Card Controls | R1 (Flip, mask/reveal, CVV) | 5 | 5 | ✓ |
| 5 | Card Freeze & Limit Controls | R1 (Freeze toggle, slider) | 5 | 5 | ✓ |
| 6 | Simulated UPI Payments | R1 (Transfer, QR, Chime) | 5 | 5 | ✓ |
| 7 | Target Savings Goals | R1 (Pots, top-up, confetti) | 5 | 5 | ✓ |
| 8 | Categorized Benefits Discovery | R2 (6 categories, search) | 5 | 5 | ✓ |
| 9 | 5-Question Benefit Cards | R2 (Cost tags, dates, CTAs) | 5 | 5 | ✓ |
| 10 | "Why am I seeing this?" Modal | R2 (Transparent attribution) | 5 | 5 | ✓ |
| 11 | Future Renewal Price Warning | R2 (Subscription renewal) | 5 | 5 | ✓ |
| 12 | 4-State Benefits Wallet | R2 (Available, Claimed, Active, Expiring) | 5 | 5 | ✓ |
| 13 | Benefit Claim / Apply Flow | R2 (Voucher codes, links) | 5 | 5 | ✓ |
| 14 | Friday 10 AM Drop Engine | R3 (Scheduled drop countdown) | 5 | 5 | ✓ |
| 15 | Live Inventory Meter | R3 (Real-time stock bar) | 5 | 5 | ✓ |
| 16 | Instant Drop Claim Flow | R3 (Instant capacity decrement) | 5 | 5 | ✓ |
| 17 | Exhausted Drop Waitlist | R3 (Waitlist queue #) | 5 | 5 | ✓ |
| 18 | Sneak-Peek & Reminders | R3 (Remind me toggle) | 5 | 5 | ✓ |
| 19 | 3-Second SOS Press & Hold | R4 (Hold fill, countdown beeps) | 5 | 5 | ✓ |
| 20 | False-Alarm Cancel Window | R4 (10s cancellation window) | 5 | 5 | ✓ |
| 21 | Simulated 112 ERSS Dispatch | R4 (ERSS ticket dispatch) | 5 | 5 | ✓ |
| 22 | Live Geolocation & Manual Pin | R4 (Lat/Long, manual picker) | 5 | 5 | ✓ |
| 23 | Trusted Contacts Dispatch | R4 (SMS to 5 contacts) | 5 | 5 | ✓ |
| 24 | Weather & Hazard Warnings | R4 (IMD weather warnings) | 5 | 5 | ✓ |
| 25 | Financial Bite-Sized Modules | R5 (4 educational modules) | 5 | 5 | ✓ |
| 26 | 5-Minute Interactive Quizzes | R5 (Quiz score, explanations) | 5 | 5 | ✓ |
| 27 | Daily Learning Streak Engine | R5 (Streak increments) | 5 | 5 | ✓ |
| 28 | Level Progression Engine | R5 (XP, Level 1 to 3) | 5 | 5 | ✓ |
| 29 | 3-Step Action Quests | R5 (Missions unlocking perks) | 5 | 5 | ✓ |
| 30 | Green Future Hub | R6 (UN SDG course catalogue) | 5 | 5 | ✓ |
| 31 | Green Passport System | R6 (Verified eco-action log) | 5 | 5 | ✓ |
| 32 | Verifiable Sustainability Badges | R6 (4 earned eco badges) | 5 | 5 | ✓ |
| 33 | Paperless Operational Metrics | R6 (Paper & carbon metrics) | 5 | 5 | ✓ |
| 34 | Web Speech API Read-Aloud (TTS) | R7 (Listen button, audio) | 5 | 5 | ✓ |
| 35 | High-Contrast Mode Toggle | R7 (WCAG AAA styling) | 5 | 5 | ✓ |
| 36 | Dynamic Text Resizer | R7 (Normal, Large, XL) | 5 | 5 | ✓ |
| 37 | Indian Sign Language (ISL) Visuals | R7 (Animated sign guides) | 5 | 5 | ✓ |
| 38 | DPDP Privacy & Offers Center | R7 (Location/Ad toggles) | 5 | 5 | ✓ |
| 39 | Data Access Audit Trail | R7 (Audit log modal) | 5 | 5 | ✓ |
| 40 | E2E Build & Dev Execution | Acceptance Criteria (npm run build/dev) | 5 | 5 | ✓ |

## Test Architecture
- **Test Runner**: Automated Node/TypeScript test harness (`gen_young_app/tests/run_all_e2e.ts`) runnable via `npm test` or `npx tsx tests/run_all_e2e.ts`.
- **Pass/Fail Semantics**: Process exits with code 0 on 100% pass; non-zero on any failure.
- **Directory Layout**:
  - `gen_young_app/tests/`
    - `tier1_feature_tests.ts` (Feature isolation tests, >=5 per feature)
    - `tier2_boundary_tests.ts` (Boundary & error condition tests, >=5 per feature)
    - `tier3_combinatorial_tests.ts` (Cross-feature interaction tests)
    - `tier4_scenario_tests.ts` (End-to-end user journeys)
    - `run_all_e2e.ts` (Master runner executing Tiers 1-4 and printing formatted TAP/JUnit summary)

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Mumbai Student Semester Setup | Persona Priya -> Check Savings Balance -> Top-Up Goal -> Claim Google AI Plus Student Perk -> Check 4-State Wallet | High |
| 2 | High School Aspirant Exam Prep | Persona Aarav -> View SATHEE Scheme -> Attempt Budgeting Quiz -> Earn Streak -> Verify Minor Account Protection | Medium |
| 3 | Friday 10 AM Drop Rush & Waitlist | Wait for countdown -> Claim Cinema Drop -> Stock decrements -> Drop exhausts -> Register for Waitlist (#412) | High |
| 4 | Late-Night Campus Emergency & False Alarm | Trigger 3s SOS Hold -> Beeps sound -> Initiate Cancel within 10s -> Verify 112 dispatch aborted -> Switch to Manual GPS | High |
| 5 | Green Citizen & Accessibility Journey | Turn on High Contrast & Large Text -> Listen to SDG Course via TTS -> Pass Climate Quiz -> Unlock "Climate Learner" Badge | High |

## Coverage Thresholds
- Tier 1: >=5 per feature (>=200 test cases)
- Tier 2: >=5 per feature (>=200 test cases)
- Tier 3: >=40 pairwise interaction test cases
- Tier 4: >=5 realistic multi-feature application journeys
- **Total Minimum Target: >=445 automated test assertions**
