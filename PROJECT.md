# Project: Gen-Young Platform Prototype

## Architecture
- **Framework**: React 18 with TypeScript and Vite
- **Styling**: Tailwind CSS (with Dark / High-Contrast mode support)
- **Icons & UI Utilities**: Lucide React (`lucide-react`), Canvas Confetti (`canvas-confetti`)
- **Audio Synthesis**: Native Browser Web Audio API (`AudioContext` oscillators for procedural countdown beeps, sirens, and UPI payment chimes — zero external media dependencies)
- **Speech Synthesis**: Native Browser Web Speech API (`window.speechSynthesis` for universal accessibility read-aloud TTS)
- **State Management**: React Context providers (`PersonaContext`, `BankingContext`, `BenefitsContext`, `AccessibilityContext`, `ToastContext`) backed by `localStorage` persistence for continuous simulation across reloads
- **Design Convention**: Mobile-first responsive app shell with 6 primary views accessible via persistent bottom navigation (Home, Benefits, Learn, Drops, Safety, Profile)

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | App Shell & Bottom Nav | Mobile-first viewport container, top bar, and persistent bottom navigation (Home, Benefits, Learn, Drops, Safety, Profile) | M1 | ORIGINAL_REQUEST R1, Ch 33 |
| 2 | Persona Switcher | Dynamic profile switcher (Aarav 16 Aspirant, Priya 21 Student Mumbai, Ananya 24 Young Pro) driving contextual recommendations | M1 | ORIGINAL_REQUEST R1, Ch 3, 5 |
| 3 | Zero-Balance Account Summary | Account balance display, simulated account number, IFSC code, and monthly spend tracker | M1 | ORIGINAL_REQUEST R1, Ch 4 |
| 4 | Virtual RuPay Debit Card | Realistic virtual debit card with 3D flip animation, card number mask/unmask, CVV reveal with 30s auto-hide | M1 | ORIGINAL_REQUEST R1, Ch 4 |
| 5 | Card Freeze & Limit Controls | Instant card freeze toggle and online transaction limit slider (₹500 to ₹25,000) | M1 | ORIGINAL_REQUEST R1, Ch 4 |
| 6 | Simulated UPI Payments | Send money via UPI ID/phone, scan QR code simulator, balance deduction, transaction ledger, and Web Audio chime | M1 | ORIGINAL_REQUEST R1, Ch 4 |
| 7 | Target Savings Goals | Create savings goals (pot name, target amount, category), top-up simulation from balance, progress ring, confetti on completion | M1 | ORIGINAL_REQUEST R1, Ch 4 |
| 8 | Categorized Benefits Discovery | Multi-category marketplace: Government Schemes, AI & Productivity, Education, Career, Health, Lifestyle | M2 | ORIGINAL_REQUEST R2, Ch 5, 33 |
| 9 | 5-Question Benefit Cards | Structured cards showing What, Why, Who, Cost tags (Free/Subsidized/Paid), Verification date, and Action buttons | M2 | ORIGINAL_REQUEST R2, Ch 5 |
| 10 | "Why am I seeing this?" Modal | Transparent attribution modal explaining matching criteria (age, student status, city) with DPDP audit linkage | M2 | ORIGINAL_REQUEST R2, Ch 6, 16 |
| 11 | Future Renewal Price Warning | Transparent disclosure of post-trial subscription costs (e.g., Google AI Plus ₹0 for 12 months then renewal terms) | M2 | ORIGINAL_REQUEST R2, Ch 9, 11 |
| 12 | 4-State Benefits Wallet | Personal wallet with 4 tabbed views: Available, Claimed, Active, Expiring Soon with voucher codes and expiry badges | M2 | ORIGINAL_REQUEST R2, Ch 32 |
| 13 | Benefit Claim / Apply Flow | Instant claim trigger, voucher code generator, and external scheme redirection simulation | M2 | ORIGINAL_REQUEST R2, Ch 5, 8 |
| 14 | Friday 10 AM Drop Engine | Flagship weekly Drop engine with synchronized real-time countdown timer (Days:Hours:Mins:Secs) | M3 | ORIGINAL_REQUEST R3, Ch 10, 11 |
| 15 | Live Inventory Meter | Real-time capacity bar displaying remaining stock (e.g. out of 100,000 cinema tickets or food vouchers) | M3 | ORIGINAL_REQUEST R3, Ch 10, 11 |
| 16 | Instant Drop Claim Flow | Atomic claim action with instantaneous capacity decrement, double-claim lock, and confetti celebration | M3 | ORIGINAL_REQUEST R3, Ch 10, 13 |
| 17 | Exhausted Drop Waitlist | Waitlist registration flow when inventory hits 0, assigning transparent queue position (e.g. #412 in queue) | M3 | ORIGINAL_REQUEST R3, Ch 11, 13 |
| 18 | Sneak-Peek & Reminders | Preview upcoming Wednesday/Friday drops with "Remind Me" alert notification toggle | M3 | ORIGINAL_REQUEST R3, Ch 13 |
| 19 | 3-Second SOS Press & Hold | High-stress emergency trigger with circular SVG progress animation and procedural Web Audio countdown beeps | M3 | ORIGINAL_REQUEST R4, Ch 20 |
| 20 | False-Alarm Cancel Window | 10-second countdown grace window allowing user to abort emergency dispatch with audible feedback | M3 | ORIGINAL_REQUEST R4, Ch 20 |
| 21 | Simulated 112 ERSS Dispatch | Dispatches emergency event to simulated 112 India platform, generating an ERSS ticket ID and dispatch confirmation | M3 | ORIGINAL_REQUEST R4, Ch 20, 50 |
| 22 | Live Geolocation & Manual Pin | Displays simulated GPS latitude, longitude, and accuracy radius (±5m), with high-accuracy manual locality picker | M3 | ORIGINAL_REQUEST R4, Ch 19, 20 |
| 23 | Trusted Contacts Dispatch | Sends simulated emergency SMS and live location map link to up to 5 designated contacts (Mom, Guardian, Best Friend) | M3 | ORIGINAL_REQUEST R4, Ch 20 |
| 24 | Weather & Hazard Warnings | Real-time local hazard warnings (IMD heatwave, heavy rainfall/waterlogging, cyclone alerts) with safety tips | M3 | ORIGINAL_REQUEST R4, Ch 19 |
| 25 | Financial Bite-Sized Modules | Educational lessons on Budgeting Basics, Savings Goals, Smart Digital Banking, and Sustainable Finance | M4 | ORIGINAL_REQUEST R5, Ch 8, 12 |
| 26 | 5-Minute Interactive Quizzes | Multiple-choice quizzes with immediate explanations for right/wrong answers, score tallies, and XP awards | M4 | ORIGINAL_REQUEST R5, Ch 8, 10 |
| 27 | Daily Learning Streak Engine | Gamified streak counter (🔥 N-Day Streak) incremented by quiz completion or educational activity | M4 | ORIGINAL_REQUEST R5, Ch 12, 14 |
| 28 | Level Progression Engine | Tiered XP progression (Level 1 Financial Novice, Level 2 Money Explorer, Level 3 Youth Master) unlocking perks | M4 | ORIGINAL_REQUEST R5, Ch 12, 14 |
| 29 | 3-Step Action Quests | Multi-step actionable quests ("Build Your Career", "Go Green") requiring 3 discrete actions to unlock partner perks | M4 | ORIGINAL_REQUEST R5, Ch 12, 14 |
| 30 | Green Future Hub | Curated hub for UN SDG Academy and UN CC:e-Learn sustainability courses with direct launch simulations | M4 | ORIGINAL_REQUEST R6, Ch 25, 26 |
| 31 | Green Passport System | Personal digital log tracking verified eco-actions (paperless statements, climate quizzes, UN SDG learning) | M4 | ORIGINAL_REQUEST R6, Ch 28 |
| 32 | Verifiable Sustainability Badges | Badges (Climate Learner, Circular Economy Explorer, Sustainable Finance Learner, Digital First) with earned dates | M4 | ORIGINAL_REQUEST R6, Ch 28 |
| 33 | Paperless Operational Metrics | Metrics dashboard tracking paper statements avoided, digital receipts used, and carbon offset equivalent | M4 | ORIGINAL_REQUEST R6, Ch 30, 46 |
| 34 | Web Speech API Read-Aloud (TTS) | "Listen" button with play, pause, stop, and speed controls (0.75x, 1x, 1.25x) on benefit cards and learning content | M4 | ORIGINAL_REQUEST R7, Ch 22 |
| 35 | High-Contrast Mode Toggle | WCAG AAA compliant high-contrast theme switch (black/yellow/cyan palette) with persistent styling | M4 | ORIGINAL_REQUEST R7, Ch 21 |
| 36 | Dynamic Text Resizer | Multi-size typography scaling (Normal, Large, Extra Large) preserving layout integrity | M4 | ORIGINAL_REQUEST R7, Ch 21 |
| 37 | Indian Sign Language (ISL) Visuals | Modal with animated ISL visual guides demonstrating banking basics, SOS activation, and benefit claiming | M4 | ORIGINAL_REQUEST R7, Ch 23 |
| 38 | DPDP Privacy & Offers Center | Control center allowing users to toggle location matching, partner personalization, and view data guarantees | M4 | ORIGINAL_REQUEST R7, Ch 16, 39 |
| 39 | Data Access Audit Trail | Chronological audit log showing data access timestamps, criteria matched, and verification of zero third-party leaks | M4 | ORIGINAL_REQUEST R7, Ch 35, 39 |
| 40 | E2E Integration & Verification | 100% test pass across all acceptance criteria and adversarial coverage hardening | M5 | ORIGINAL_REQUEST Acceptance Criteria |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Core Scaffolding, App Shell & Banking Foundation | Setup React 18 + Vite + TS + Tailwind in `gen_young_app`. Build App Shell with 6 persistent bottom tabs, TopHeader, PersonaContext with 3 profiles, and Core Banking Dashboard (Features #1-#7). | none | DONE |
| M2 | Benefits Engine & 4-State Wallet | Implement Categorized Benefits Marketplace, 5-Question Benefit Cards, "Why am I seeing this?" modal, future renewal disclosures, and 4-State Benefits Wallet (Features #8-#13). | M1 | PLANNED |
| M3 | Friday Drop Engagement Engine & Emergency SOS Hub | Implement Friday 10 AM Drop with real-time countdown, inventory meter, instant claim decrement, and waitlist (Features #14-#18). Implement Emergency SOS Hub with 3s hold, audio countdown beeps, false-alarm cancel, 112 ERSS dispatch, GPS picker, contacts alert, and weather warnings (Features #19-#24). | M1 | PLANNED |
| M4 | Financial Literacy, Green Passport, Accessibility & Privacy | Implement Literacy modules, 5-min quizzes, streaks, level progression, 3-step quests (Features #25-#29). Implement Green Future Hub, Green Passport, and sustainability badges (Features #30-#33). Implement Web Speech TTS, high contrast, text resize, ISL visuals, and DPDP privacy center (Features #34-#39). | M1 | PLANNED |
| M5 | Final Milestone: 100% E2E Test Suite Pass & Adversarial Hardening | Verify all acceptance criteria, pass 100% of the E2E test suite (Tiers 1-4), and perform adversarial coverage hardening (Tier 5) with clean build/dev verification (Feature #40). | M2, M3, M4 | PLANNED |

---

## Interface Contracts

### M1 ↔ M2 (Banking & Persona ↔ Benefits Engine)
- **Persona Context**:
  ```typescript
  export interface PersonaContextType {
    activePersona: UserPersona;
    switchPersona: (personaId: string) => void;
    availablePersonas: UserPersona[];
  }
  ```
- **Benefit Item & Wallet**:
  ```typescript
  export type BenefitCategory = 'govt' | 'ai' | 'education' | 'career' | 'health' | 'lifestyle';
  export type BenefitCost = 'Free' | 'Subsidized' | 'Paid';
  export type WalletTab = 'available' | 'claimed' | 'active' | 'expiring';
  
  export interface BenefitItem {
    id: string;
    title: string;
    category: BenefitCategory;
    provider: string;
    cost: BenefitCost;
    costDetails?: string;
    futureCostWarning?: string;
    shortDescription: string;
    fullDescription: string;
    whySeeingThis: string;
    verifiedDate: string;
    actionLabel: string;
    eligibilityAge: { min: number; max: number };
    eligibleRoles: ('student' | 'aspirant' | 'professional')[];
    claimedStatus: 'unclaimed' | 'claimed' | 'active';
    voucherCode?: string;
    expiryDate?: string;
  }
  ```

### M1 ↔ M3 (Banking & App Shell ↔ Drops & SOS)
- **Friday Drop Contract**:
  ```typescript
  export interface FridayDrop {
    id: string;
    title: string;
    brand: string;
    category: 'cinema' | 'dining' | 'tech' | 'course';
    totalStock: number;
    remainingStock: number;
    dropTime: string; // ISO 8601 Friday 10:00 AM
    isLive: boolean;
    isClaimed: boolean;
    isWaitlisted: boolean;
    waitlistPosition?: number;
    claimedVoucher?: string;
  }
  ```
- **Emergency SOS Contract**:
  ```typescript
  export interface EmergencyState {
    isTriggered: boolean;
    isCancelling: boolean;
    cancelSecondsLeft: number;
    erssTicketId?: string;
    coordinates: { lat: number; lng: number; accuracy: number; locality: string };
    dispatchedContacts: { name: string; relation: string; phone: string; status: 'sent' | 'pending' }[];
  }
  ```

### M1 ↔ M4 (Banking & App Shell ↔ Literacy, Green & Accessibility)
- **Accessibility & Privacy Contract**:
  ```typescript
  export interface AccessibilitySettings {
    highContrast: boolean;
    fontSize: 'normal' | 'large' | 'xl';
    speechRate: number; // 0.75, 1.0, 1.25
    locationSharing: boolean;
    partnerPersonalization: boolean;
  }
  ```
- **Green Passport Contract**:
  ```typescript
  export interface GreenPassport {
    paperlessStatementsMonths: number;
    quizzesCompleted: number;
    coursesCompleted: number;
    carbonOffsetKg: number;
    badges: { id: string; name: string; earnedDate?: string; isUnlocked: boolean; icon: string }[];
  }
  ```

---

## Code Layout

```
d:/green yotuh/gen_young_app/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   ├── banking.ts          # BankAccount, VirtualCard, UpiTx, SavingsGoal
    │   ├── benefits.ts         # BenefitItem, BenefitCategory, WalletState
    │   ├── drops.ts            # FridayDrop, DropInventory, WaitlistEntry
    │   ├── sos.ts              # SosAlert, GpsLocation, Contact, HazardAlert
    │   ├── learning.ts         # Quiz, Question, Quest, UserProgress
    │   ├── green.ts            # GreenBadge, EcoAction, CarbonMetric
    │   ├── persona.ts          # UserPersona, PersonaContextType
    │   └── accessibility.ts    # AccessibilitySettings, PrivacyAuditLog
    ├── data/
    │   ├── mockPersonas.ts     # 3 Personas (College 21, Aspirant 16, Pro 24)
    │   ├── mockBenefits.ts     # 16+ Rich Schemes across 6 categories
    │   ├── mockDrops.ts        # Friday Drops with live inventory & countdowns
    │   ├── mockQuizzes.ts      # 4 Modules & 5-minute interactive quizzes
    │   ├── mockQuests.ts       # 3-step action quests unlocking perks
    │   └── mockGreenBadges.ts  # Green Passport badges & eco metrics
    ├── context/
    │   ├── PersonaContext.tsx  # Dynamic persona state & contextual overrides
    │   ├── BankingContext.tsx  # Balance, card controls, UPI simulator, goals
    │   ├── BenefitsContext.tsx # Available, Claimed, Active, Expiring wallet
    │   ├── AccessibilityContext.tsx # High-contrast, TTS, text scale, privacy log
    │   └── ToastContext.tsx    # App-wide feedback toast notifications
    ├── utils/
    │   ├── soundEffects.ts     # Web Audio API procedural beeps, alarms & chimes
    │   ├── ttsReader.ts        # Web Speech API speech synthesis controller
    │   ├── confetti.ts         # Canvas-confetti explosion helper
    │   └── formatters.ts       # INR currency (₹), countdown time, date formatters
    ├── components/
    │   ├── common/             # BottomNav, TopHeader, PersonaSwitcherModal, Toast
    │   ├── banking/            # AccountCard, VirtualDebitCard, UpiTransferModal, SavingsGoals
    │   ├── benefits/           # BenefitsMarketplace, BenefitCard, BenefitDetailModal, BenefitsWallet
    │   ├── drops/              # FridayDropsHub, DropInventoryBar, ClaimDropModal, WaitlistModal
    │   ├── sos/                # EmergencySosHub, HoldToActivateButton, ErssDispatchModal, GpsLocationCard
    │   ├── learning/           # LearningHub, InteractiveQuizModal, QuestsHub
    │   ├── green/              # GreenPassportHub, VerifiedEcoActions
    │   └── accessibility/      # AccessibilityDrawer, SignLanguageVisualModal, PrivacyControlCenter
    └── views/
        ├── HomeView.tsx        # Banking Dashboard, quick actions, recommended perks
        ├── BenefitsView.tsx    # Marketplace & 4-State Benefits Wallet
        ├── DropsView.tsx       # Friday Drops & Waitlists
        ├── SosView.tsx         # Emergency SOS & Safety Hub
        ├── LearnView.tsx       # Financial Literacy, Quizzes & Quests
        └── ProfileView.tsx     # Persona settings, Green Passport, Privacy & Accessibility
```
