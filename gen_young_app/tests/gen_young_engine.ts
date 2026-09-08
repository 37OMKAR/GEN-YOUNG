/**
 * Gen-Young Platform Domain Reference Engine & Opaque-Box Models
 * Author: teamwork_preview_test_writer
 * Derived from: ORIGINAL_REQUEST.md, PROJECT.md § Interface Contracts, TEST_INFRA.md
 */

// ==========================================
// 1. PERSONAS & CONTEXT (R1, Ch 3, 5, 34)
// ==========================================

export type PersonaRole = 'student' | 'aspirant' | 'professional';

export interface UserPersona {
  id: string;
  name: string;
  age: number;
  role: PersonaRole;
  city: string;
  state: string;
  institution: string;
  isMinor: boolean;
  guardianLinked: boolean;
  savingsBalance: number;
  monthlySpend: number;
  recommendedTags: string[];
}

export const MOCK_PERSONAS: Record<string, UserPersona> = {
  priya: {
    id: 'priya',
    name: 'Priya Sharma',
    age: 21,
    role: 'student',
    city: 'Mumbai',
    state: 'Maharashtra',
    institution: 'University of Mumbai (B.Tech Computer Science)',
    isMinor: false,
    guardianLinked: false,
    savingsBalance: 14500,
    monthlySpend: 4200,
    recommendedTags: ['Engineering', 'AI Tools', 'Scholarships', 'Transit Pass'],
  },
  aarav: {
    id: 'aarav',
    name: 'Aarav Patel',
    age: 16,
    role: 'aspirant',
    city: 'Ahmedabad',
    state: 'Gujarat',
    institution: 'Delhi Public School (Class 11 Science - JEE/NEET)',
    isMinor: true,
    guardianLinked: true,
    savingsBalance: 2800,
    monthlySpend: 850,
    recommendedTags: ['Competitive Exams', 'SATHEE', 'Minor Protections', 'Book Discounts'],
  },
  ananya: {
    id: 'ananya',
    name: 'Ananya Verma',
    age: 24,
    role: 'professional',
    city: 'Bengaluru',
    state: 'Karnataka',
    institution: 'Junior Software Engineer & Freelance Designer',
    isMinor: false,
    guardianLinked: false,
    savingsBalance: 58400,
    monthlySpend: 18500,
    recommendedTags: ['Life Cover', 'IndiaAI Compute', 'Design Perks', 'Tax Savings'],
  },
};

// ==========================================
// 2. CORE BANKING ENGINE (R1, Ch 4)
// ==========================================

export interface BankAccount {
  accountNumber: string;
  ifscCode: string;
  balance: number;
  minimumBalanceRequirement: number; // strictly 0
  monthlySpend: number;
  spendLimit: number;
  currency: string;
}

export interface VirtualCard {
  cardNumber: string; // 16 digits
  cardHolderName: string;
  expiry: string; // MM/YY
  cvv: string; // 3 digits
  isFrozen: boolean;
  onlineLimit: number; // min 500, max 25000
  tapAndPayEnabled: boolean;
  isCvvRevealed: boolean;
  cvvAutoMaskSeconds: number;
  isFlipped: boolean;
}

export interface UpiTransaction {
  id: string;
  timestamp: string;
  recipientUpiId: string;
  amount: number;
  type: 'debit' | 'credit';
  status: 'success' | 'failed' | 'declined';
  note?: string;
  utrNumber: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  category: 'tech' | 'travel' | 'books' | 'emergency' | 'general';
  isCompleted: boolean;
  createdAt: string;
}

// ==========================================
// 3. BENEFITS ENGINE & WALLET (R2, Ch 5, 6, 9, 32)
// ==========================================

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
  eligibleRoles: PersonaRole[];
  claimedStatus: 'unclaimed' | 'claimed' | 'active';
  voucherCode?: string;
  expiryDate?: string;
  daysUntilExpiry?: number;
}

export const MOCK_BENEFITS: BenefitItem[] = [
  {
    id: 'b-01',
    title: 'Google AI Plus 1-Year Student Offer',
    category: 'ai',
    provider: 'Google India',
    cost: 'Free',
    costDetails: '12-month zero-cost trial access to Gemini Advanced & 2TB Drive',
    futureCostWarning: 'Renews automatically at ₹499/mo after 12 months unless cancelled. No surprise charges.',
    shortDescription: 'Free 12 months access to premium Google AI tools, Gemini Advanced, and 2TB cloud storage.',
    fullDescription: 'Empowering students across India with world-class AI reasoning, coding assistance, and research tools.',
    whySeeingThis: 'Matched because you are a verified college student aged 18-25 in India.',
    verifiedDate: '2026-09-01',
    actionLabel: 'Claim Student Pass',
    eligibilityAge: { min: 18, max: 25 },
    eligibleRoles: ['student'],
    claimedStatus: 'unclaimed',
  },
  {
    id: 'b-02',
    title: 'SATHEE Self-Paced Exam Prep Portal',
    category: 'education',
    provider: 'Ministry of Education & IIT Kanpur',
    cost: 'Free',
    costDetails: '100% Free national preparatory platform for JEE, NEET, SSC',
    shortDescription: 'Official free high-yield interactive coaching, mock tests, and AI tutor for national exams.',
    fullDescription: 'Joint initiative by the Ministry of Education and IIT Kanpur to provide equal access to competitive exam resources.',
    whySeeingThis: 'Matched because you are an enrolled high-school aspirant preparing for competitive tests.',
    verifiedDate: '2026-08-28',
    actionLabel: 'Access Portal',
    eligibilityAge: { min: 15, max: 20 },
    eligibleRoles: ['aspirant', 'student'],
    claimedStatus: 'unclaimed',
  },
  {
    id: 'b-03',
    title: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)',
    category: 'govt',
    provider: 'Govt of India / Life Insurance Corp',
    cost: 'Subsidized',
    costDetails: '₹436 per year for ₹2 Lakh life insurance coverage',
    futureCostWarning: 'Annual auto-debit of ₹436 in May each year with 30-day advance SMS alert.',
    shortDescription: 'Affordable renewable life insurance cover of ₹2,00,000 for young working citizens.',
    fullDescription: 'Backed by the Government of India, offering financial peace of mind to young earners and dependents.',
    whySeeingThis: 'Matched because you are an Indian citizen aged 18-50 with a bank savings account.',
    verifiedDate: '2026-08-15',
    actionLabel: 'Enroll Cover',
    eligibilityAge: { min: 18, max: 50 },
    eligibleRoles: ['student', 'professional'],
    claimedStatus: 'unclaimed',
  },
  {
    id: 'b-04',
    title: 'PMSBY Accidental Disability & Death Cover',
    category: 'govt',
    provider: 'Govt of India',
    cost: 'Subsidized',
    costDetails: '₹20 per year for up to ₹2 Lakh accidental protection',
    futureCostWarning: 'Annual renewable premium of ₹20 debited on May 31.',
    shortDescription: 'Essential accident insurance providing up to ₹2,00,000 protection at just ₹20/year.',
    fullDescription: 'Universal social security protection against accidental death or permanent disability.',
    whySeeingThis: 'Matched because you hold a valid youth bank account and are 18+ years old.',
    verifiedDate: '2026-08-20',
    actionLabel: 'Activate Protection',
    eligibilityAge: { min: 18, max: 70 },
    eligibleRoles: ['student', 'professional'],
    claimedStatus: 'unclaimed',
  },
  {
    id: 'b-05',
    title: 'IndiaAI Compute Fellowship Access',
    category: 'ai',
    provider: 'IndiaAI Mission, MeitY',
    cost: 'Free',
    costDetails: '100% compute subsidy for university research workloads',
    shortDescription: 'Subsidized GPU and TPU cloud hours for Indian student developers and researchers.',
    fullDescription: 'National AI infrastructure access provided by the Ministry of Electronics and IT to accelerate indigenous AI models.',
    whySeeingThis: 'Matched because you are a STEM student or young tech professional in an Indian tech hub.',
    verifiedDate: '2026-09-02',
    actionLabel: 'Apply for GPU Grant',
    eligibilityAge: { min: 18, max: 28 },
    eligibleRoles: ['student', 'professional'],
    claimedStatus: 'unclaimed',
  },
  {
    id: 'b-06',
    title: 'SWAYAM / NPTEL Advanced AI Certification',
    category: 'education',
    provider: 'Ministry of Education & IIT Madras',
    cost: 'Subsidized',
    costDetails: 'Free learning modules; 50% exam fee reimbursement on passing with distinction',
    shortDescription: 'Premier university-credited certifications taught by IIT and IISc faculty.',
    fullDescription: 'Earn university-transferable academic credits and verified certifications recognised by top Indian employers.',
    whySeeingThis: 'Matched because you are an enrolled university student in Maharashtra.',
    verifiedDate: '2026-08-30',
    actionLabel: 'Explore Courses',
    eligibilityAge: { min: 17, max: 25 },
    eligibleRoles: ['student'],
    claimedStatus: 'unclaimed',
  },
  {
    id: 'b-07',
    title: 'Student 24/7 Telemedicine & Mental Wellness',
    category: 'health',
    provider: 'YouthHealth Network',
    cost: 'Free',
    costDetails: 'Free unlimited confidential chat consultations for enrolled youth',
    shortDescription: 'Immediate, confidential access to certified general physicians and student counselors.',
    fullDescription: 'Safe, judgment-free medical advice, exam stress counseling, and prescription assistance.',
    whySeeingThis: 'Matched for all Gen-Young account holders aged 15-25.',
    verifiedDate: '2026-09-01',
    actionLabel: 'Consult Doctor',
    eligibilityAge: { min: 15, max: 25 },
    eligibleRoles: ['aspirant', 'student', 'professional'],
    claimedStatus: 'unclaimed',
  },
  {
    id: 'b-08',
    title: 'Mumbai Metro Green Transit Pass',
    category: 'lifestyle',
    provider: 'Maha Mumbai Metro (MMRDA)',
    cost: 'Subsidized',
    costDetails: '33% concession on student smart card passes',
    shortDescription: 'Daily commute discount on all Mumbai Metro lines for verified college students.',
    fullDescription: 'Supporting sustainable urban mobility with subsidized travel fares across Mumbai metropolitan region.',
    whySeeingThis: 'Matched because your verified city is Mumbai and you are an active college student.',
    verifiedDate: '2026-08-25',
    actionLabel: 'Get Concession Card',
    eligibilityAge: { min: 16, max: 25 },
    eligibleRoles: ['student'],
    claimedStatus: 'unclaimed',
  },
];

// ==========================================
// 4. FRIDAY DROP ENGINE (R3, Ch 10, 11, 13)
// ==========================================

export interface FridayDrop {
  id: string;
  title: string;
  brand: string;
  category: 'cinema' | 'dining' | 'tech' | 'course';
  totalStock: number;
  remainingStock: number;
  dropTime: string; // ISO 8601
  isLive: boolean;
  isClaimed: boolean;
  isWaitlisted: boolean;
  waitlistPosition?: number;
  claimedVoucher?: string;
  hasReminder: boolean;
}

export const MOCK_DROPS: FridayDrop[] = [
  {
    id: 'drop-cinema-pvr',
    title: 'Weekend Cinema Pass — Zero Fee Ticket',
    brand: 'PVR INOX',
    category: 'cinema',
    totalStock: 100000,
    remainingStock: 42150,
    dropTime: '2026-09-11T10:00:00+05:30', // Friday 10:00 AM IST
    isLive: true,
    isClaimed: false,
    isWaitlisted: false,
    hasReminder: false,
  },
  {
    id: 'drop-dining-dominos',
    title: 'Campus Pizza Feast — 100% Voucher',
    brand: "Domino's India",
    category: 'dining',
    totalStock: 50000,
    remainingStock: 0, // Exhausted to test waitlist
    dropTime: '2026-09-11T10:00:00+05:30',
    isLive: true,
    isClaimed: false,
    isWaitlisted: false,
    hasReminder: false,
  },
  {
    id: 'drop-tech-boat',
    title: 'ANC Earbuds 60% Exclusive Drop',
    brand: 'boAt Lifestyle',
    category: 'tech',
    totalStock: 25000,
    remainingStock: 25000,
    dropTime: '2026-09-18T10:00:00+05:30', // Next Friday
    isLive: false,
    isClaimed: false,
    isWaitlisted: false,
    hasReminder: false,
  },
];

// ==========================================
// 5. EMERGENCY SOS & SAFETY HUB (R4, Ch 19, 20)
// ==========================================

export interface SosContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  status: 'sent' | 'delivered' | 'pending';
}

export interface GpsLocation {
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  locality: string;
  state: string;
  isManualOverride: boolean;
}

export interface HazardAlert {
  id: string;
  type: 'heatwave' | 'heavy_rain' | 'cyclone' | 'air_quality';
  severity: 'low' | 'moderate' | 'high' | 'severe';
  title: string;
  message: string;
  locality: string;
  issuedAt: string;
  safetyTips: string[];
}

export interface EmergencyState {
  isTriggered: boolean;
  isCancelling: boolean;
  cancelSecondsLeft: number;
  isDispatched: boolean;
  erssTicketId?: string;
  location: GpsLocation;
  contacts: SosContact[];
  auditLogs: { timestamp: string; action: string }[];
}

// ==========================================
// 6. FINANCIAL LITERACY & GAMIFICATION (R5, Ch 8, 12, 14)
// ==========================================

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizModule {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  xpReward: number;
  questions: QuizQuestion[];
}

export interface QuestStep {
  id: string;
  title: string;
  isCompleted: boolean;
  actionKey: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  steps: QuestStep[];
  isCompleted: boolean;
  rewardPerk: string;
}

export interface UserLearningProgress {
  streakDays: number;
  xp: number;
  level: number; // 1: Novice (0-99), 2: Explorer (100-299), 3: Master (300+)
  completedModules: string[];
  activeQuests: Quest[];
}

export const MOCK_QUIZZES: QuizModule[] = [
  {
    id: 'mod-budgeting',
    title: 'Budgeting Basics: The 50/30/20 Rule',
    description: 'Learn how to split your pocket money or internship stipend into Needs, Wants, and Savings.',
    estimatedMinutes: 5,
    xpReward: 50,
    questions: [
      {
        id: 'q-b1',
        question: 'Under the 50/30/20 budgeting framework, what does the 20% represent?',
        options: ['Food & Outing', 'Savings & Investments', 'House Rent', 'Online Subscriptions'],
        correctIndex: 1,
        explanation: 'The 20% portion is strictly earmarked for emergency funds, target savings, and debt-free investments.',
      },
      {
        id: 'q-b2',
        question: 'Why should a college student maintain an emergency fund?',
        options: ['To buy festival clothes', 'To avoid borrowing money for unexpected expenses', 'To gamble on penny stocks', 'It is not needed for youth'],
        correctIndex: 1,
        explanation: 'An emergency fund prevents students from falling into predatory loans or panic when urgent medical or tech needs arise.',
      },
      {
        id: 'q-b3',
        question: 'What is a zero-minimum-balance account benefit?',
        options: ['Zero penalties if balance hits ₹0', 'Free iPhone every year', 'Unlimited bank overdraft without interest', 'No account number'],
        correctIndex: 0,
        explanation: 'Zero-minimum-balance accounts ensure young citizens are never hit by unfair non-maintenance penalty charges.',
      },
    ],
  },
  {
    id: 'mod-upi-safety',
    title: 'Smart Digital Banking & UPI Security',
    description: 'Essential defense tactics against phishing, fake QR codes, and SIM-swap fraud.',
    estimatedMinutes: 5,
    xpReward: 50,
    questions: [
      {
        id: 'q-s1',
        question: 'Do you ever need to enter your UPI PIN to RECEIVE money?',
        options: ['Yes, always', 'Only on weekends', 'No, never — UPI PIN is only for sending money', 'Only if the amount is >₹5,000'],
        correctIndex: 2,
        explanation: 'Golden Rule of UPI: Entering your UPI PIN always DEBITS money from your account. You NEVER enter a PIN to receive funds.',
      },
      {
        id: 'q-s2',
        question: 'What should you do if your virtual debit card is compromised?',
        options: ['Wait for next month statement', 'Instantly freeze it via your mobile app', 'Tell a friend', 'Post on Twitter'],
        correctIndex: 1,
        explanation: 'Instant freeze locks the card immediately, blocking all unauthorized online and POS transactions.',
      },
    ],
  },
];

// ==========================================
// 7. GREEN GEN-YOUNG & SUSTAINABILITY (R6, Ch 25, 28, 30)
// ==========================================

export interface GreenBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  earnedDate?: string;
}

export interface GreenPassport {
  paperlessMonths: number;
  quizzesPassed: number;
  sdgCoursesViewed: number;
  carbonOffsetKg: number;
  paperSheetsAvoided: number;
  waterSavedLiters: number;
  badges: GreenBadge[];
}

export const MOCK_GREEN_BADGES: GreenBadge[] = [
  {
    id: 'badge-climate-learner',
    name: 'Climate Learner',
    description: 'Completed the sustainable finance and climate literacy track.',
    icon: '🌱',
    isUnlocked: false,
  },
  {
    id: 'badge-circular-explorer',
    name: 'Circular Economy Explorer',
    description: 'Explored UN SDG Academy course on sustainable cities.',
    icon: '🔄',
    isUnlocked: false,
  },
  {
    id: 'badge-sustainable-saver',
    name: 'Sustainable Finance Learner',
    description: 'Set up an eco-conscious savings goal and opted for paperless banking.',
    icon: '🌍',
    isUnlocked: false,
  },
  {
    id: 'badge-digital-first',
    name: 'Digital First',
    description: 'Maintained 100% paperless statements and digital transactions for 3+ months.',
    icon: '⚡',
    isUnlocked: false,
  },
];

// ==========================================
// 8. ACCESSIBILITY & DPDP PRIVACY (R7, Ch 16, 21, 22, 35)
// ==========================================

export interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'xl';
  speechRate: number; // 0.75, 1.0, 1.25
  locationSharing: boolean;
  partnerPersonalization: boolean;
}

export interface PrivacyAuditEntry {
  id: string;
  timestamp: string;
  systemOrService: string;
  attributesAccessed: string[];
  purpose: string;
  dpdpCompliant: boolean;
  thirdPartyLeaked: boolean;
}

// ==========================================
// 9. CENTRAL PLATFORM SIMULATOR ENGINE
// ==========================================

export class GenYoungEngine {
  public activePersona: UserPersona;
  public account: BankAccount;
  public card: VirtualCard;
  public upiLedger: UpiTransaction[] = [];
  public savingsGoals: SavingsGoal[] = [];
  public benefits: BenefitItem[] = [];
  public drops: FridayDrop[] = [];
  public emergency: EmergencyState;
  public userProgress: UserLearningProgress;
  public greenPassport: GreenPassport;
  public accessibility: AccessibilitySettings;
  public privacyAuditTrail: PrivacyAuditEntry[] = [];

  // Audio / Visual Callbacks
  public onAudioChime?: (type: 'upi_success' | 'sos_tick' | 'sos_alarm' | 'click') => void;
  public onConfetti?: (type: 'drop_claimed' | 'goal_completed' | 'level_up') => void;
  public onTtsSpeak?: (text: string, rate: number) => void;

  constructor(initialPersonaId = 'priya') {
    this.activePersona = { ...MOCK_PERSONAS[initialPersonaId] };

    // Core Banking
    this.account = {
      accountNumber: 'GENY' + Math.floor(10000000 + Math.random() * 90000000),
      ifscCode: 'GENY0000108',
      balance: this.activePersona.savingsBalance,
      minimumBalanceRequirement: 0,
      monthlySpend: this.activePersona.monthlySpend,
      spendLimit: 25000,
      currency: 'INR',
    };

    // Virtual Card
    this.card = {
      cardNumber: '4092440188921049',
      cardHolderName: this.activePersona.name.toUpperCase(),
      expiry: '09/29',
      cvv: '739',
      isFrozen: false,
      onlineLimit: 5000,
      tapAndPayEnabled: true,
      isCvvRevealed: false,
      cvvAutoMaskSeconds: 30,
      isFlipped: false,
    };

    // Default Savings Goals
    this.savingsGoals = [
      {
        id: 'goal-1',
        name: this.activePersona.id === 'priya' ? 'Laptop Upgrade' : 'Exam Study Material',
        targetAmount: 20000,
        savedAmount: 8500,
        category: 'tech',
        isCompleted: false,
        createdAt: '2026-08-01',
      },
    ];

    // Benefits
    this.benefits = MOCK_BENEFITS.map((b) => ({ ...b }));

    // Drops
    this.drops = MOCK_DROPS.map((d) => ({ ...d }));

    // Emergency SOS State
    this.emergency = {
      isTriggered: false,
      isCancelling: false,
      cancelSecondsLeft: 10,
      isDispatched: false,
      location: {
        latitude: 19.076,
        longitude: 72.8777,
        accuracyMeters: 5,
        locality: 'Dadar West, Mumbai',
        state: 'Maharashtra',
        isManualOverride: false,
      },
      contacts: [
        { id: 'c-1', name: 'Mom (Primary)', relation: 'Mother', phone: '+919820011223', status: 'pending' },
        { id: 'c-2', name: 'Sunita (Guardian)', relation: 'Guardian', phone: '+919820044556', status: 'pending' },
        { id: 'c-3', name: 'Rohan (Roommate)', relation: 'Best Friend', phone: '+919820077889', status: 'pending' },
      ],
      auditLogs: [],
    };

    // Learning & Gamification
    this.userProgress = {
      streakDays: 4,
      xp: 120,
      level: 2,
      completedModules: [],
      activeQuests: [
        {
          id: 'quest-career',
          title: 'Build Your Career Quest',
          description: 'Take 3 decisive steps to launch your tech and career trajectory.',
          isCompleted: false,
          rewardPerk: 'Priority Mentor Connect Session',
          steps: [
            { id: 'qs-1', title: 'Complete Budgeting Module', isCompleted: false, actionKey: 'complete_quiz' },
            { id: 'qs-2', title: 'Claim Google AI Plus Offer', isCompleted: false, actionKey: 'claim_ai_perk' },
            { id: 'qs-3', title: 'Explore NPTEL Course', isCompleted: false, actionKey: 'explore_course' },
          ],
        },
      ],
    };

    // Green Passport
    this.greenPassport = {
      paperlessMonths: 6,
      quizzesPassed: 1,
      sdgCoursesViewed: 1,
      carbonOffsetKg: 1.8, // 6 months * 0.3kg
      paperSheetsAvoided: 12,
      waterSavedLiters: 120,
      badges: MOCK_GREEN_BADGES.map((b) => ({ ...b })),
    };

    // Accessibility & Privacy
    this.accessibility = {
      highContrast: false,
      fontSize: 'normal',
      speechRate: 1.0,
      locationSharing: true,
      partnerPersonalization: true,
    };

    // Initial DPDP Audit Entry
    this.logPrivacyAccess('BankingCore', ['account_balance', 'kyc_status'], 'Initial Account Dashboard Render');
  }

  // --- Persona Operations ---
  switchPersona(personaId: string): void {
    const target = MOCK_PERSONAS[personaId];
    if (!target) {
      throw new Error(`Invalid persona ID: ${personaId}`);
    }
    this.activePersona = { ...target };
    this.account.balance = target.savingsBalance;
    this.account.monthlySpend = target.monthlySpend;
    this.card.cardHolderName = target.name.toUpperCase();

    // Minor protections rule
    if (target.isMinor) {
      this.card.onlineLimit = Math.min(this.card.onlineLimit, 2000);
      this.emergency.contacts[0].name = 'Guardian / Parent (Linked)';
    }

    this.logPrivacyAccess('PersonaManager', ['persona_role', 'age', 'city'], `Switched context to ${target.name}`);
  }

  // --- Banking & Virtual Card ---
  toggleCardFreeze(): boolean {
    this.card.isFrozen = !this.card.isFrozen;
    return this.card.isFrozen;
  }

  setOnlineCardLimit(newLimit: number): void {
    if (newLimit < 500) {
      throw new Error(`Limit ₹${newLimit} is below minimum allowed limit of ₹500`);
    }
    if (newLimit > 25000) {
      throw new Error(`Limit ₹${newLimit} exceeds maximum allowed limit of ₹25,000`);
    }
    if (this.activePersona.isMinor && newLimit > 5000) {
      throw new Error(`Minors (under 18) cannot exceed online card limit of ₹5,000 without parental consent`);
    }
    this.card.onlineLimit = newLimit;
  }

  toggleCardFlip(): void {
    this.card.isFlipped = !this.card.isFlipped;
  }

  revealCvv(): void {
    this.card.isCvvRevealed = true;
    this.card.cvvAutoMaskSeconds = 30;
  }

  hideCvv(): void {
    this.card.isCvvRevealed = false;
  }

  authorizeCardTransaction(amount: number, merchant: string): boolean {
    if (amount <= 0) {
      throw new Error('Transaction amount must be strictly positive');
    }
    if (this.card.isFrozen) {
      throw new Error('Card is frozen. Unlock card in security controls to transact.');
    }
    if (amount > this.card.onlineLimit) {
      throw new Error(`Transaction amount ₹${amount} exceeds card online limit of ₹${this.card.onlineLimit}`);
    }
    if (amount > this.account.balance) {
      throw new Error(`Insufficient funds: account balance ₹${this.account.balance} is less than ₹${amount}`);
    }

    this.account.balance -= amount;
    this.account.monthlySpend += amount;
    return true;
  }

  // --- Simulated UPI Payments ---
  sendUpi(recipient: string, amount: number, note = 'Transfer'): UpiTransaction {
    if (amount <= 0) {
      throw new Error('Transfer amount must be strictly positive');
    }
    if (amount > this.account.balance) {
      throw new Error(`Insufficient balance: ₹${this.account.balance} available, ₹${amount} requested`);
    }

    // Validate UPI ID or Phone
    const isUpiFormat = /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test(recipient);
    const isPhoneFormat = /^[6-9]\d{9}$/.test(recipient);
    if (!isUpiFormat && !isPhoneFormat) {
      throw new Error(`Invalid UPI ID or 10-digit Indian mobile number format: ${recipient}`);
    }

    this.account.balance -= amount;
    this.account.monthlySpend += amount;

    const tx: UpiTransaction = {
      id: 'UPI' + Date.now(),
      timestamp: new Date().toISOString(),
      recipientUpiId: recipient,
      amount,
      type: 'debit',
      status: 'success',
      note,
      utrNumber: 'UTR' + Math.floor(100000000000 + Math.random() * 900000000000),
    };
    this.upiLedger.unshift(tx);

    this.onAudioChime?.('upi_success');
    return tx;
  }

  // --- Savings Goals ---
  createSavingsGoal(name: string, targetAmount: number, category: SavingsGoal['category']): SavingsGoal {
    if (!name || name.trim().length === 0) {
      throw new Error('Goal name cannot be empty');
    }
    if (targetAmount < 500) {
      throw new Error('Target amount must be at least ₹500');
    }
    const goal: SavingsGoal = {
      id: 'goal-' + Date.now(),
      name: name.trim(),
      targetAmount,
      savedAmount: 0,
      category,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };
    this.savingsGoals.push(goal);
    return goal;
  }

  topUpSavingsGoal(goalId: string, amount: number): SavingsGoal {
    const goal = this.savingsGoals.find((g) => g.id === goalId);
    if (!goal) {
      throw new Error(`Savings goal ${goalId} not found`);
    }
    if (amount <= 0) {
      throw new Error('Top-up amount must be strictly positive');
    }
    if (amount > this.account.balance) {
      throw new Error(`Insufficient balance for top-up: ₹${this.account.balance} available`);
    }

    this.account.balance -= amount;
    goal.savedAmount += amount;

    if (goal.savedAmount >= goal.targetAmount) {
      goal.isCompleted = true;
      this.onConfetti?.('goal_completed');
    }
    return goal;
  }

  withdrawSavingsGoal(goalId: string, amount: number): SavingsGoal {
    const goal = this.savingsGoals.find((g) => g.id === goalId);
    if (!goal) {
      throw new Error(`Savings goal ${goalId} not found`);
    }
    if (amount <= 0) {
      throw new Error('Withdrawal amount must be strictly positive');
    }
    if (amount > goal.savedAmount) {
      throw new Error(`Cannot withdraw ₹${amount}: only ₹${goal.savedAmount} saved in goal`);
    }

    goal.savedAmount -= amount;
    this.account.balance += amount;
    if (goal.savedAmount < goal.targetAmount) {
      goal.isCompleted = false;
    }
    return goal;
  }

  // --- Benefits Engine & 4-State Wallet ---
  getBenefitsForActivePersona(): BenefitItem[] {
    const p = this.activePersona;
    return this.benefits.filter((b) => {
      const ageOk = p.age >= b.eligibilityAge.min && p.age <= b.eligibilityAge.max;
      const roleOk = b.eligibleRoles.includes(p.role);
      return ageOk && roleOk;
    });
  }

  filterBenefits(category?: BenefitCategory | 'all', search = ''): BenefitItem[] {
    let list = this.getBenefitsForActivePersona();
    if (category && category !== 'all') {
      list = list.filter((b) => b.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((b) => b.title.toLowerCase().includes(q) || b.shortDescription.toLowerCase().includes(q) || b.provider.toLowerCase().includes(q));
    }
    return list;
  }

  explainEligibility(benefitId: string): string {
    const b = this.benefits.find((x) => x.id === benefitId);
    if (!b) throw new Error(`Benefit ${benefitId} not found`);
    const p = this.activePersona;
    return `Eligible because: Age ${p.age} is within [${b.eligibilityAge.min}-${b.eligibilityAge.max}] and role "${p.role}" matches required roles [${b.eligibleRoles.join(', ')}]. Location: ${p.city}, ${p.state}.`;
  }

  claimBenefit(benefitId: string): BenefitItem {
    const b = this.benefits.find((x) => x.id === benefitId);
    if (!b) throw new Error(`Benefit ${benefitId} not found`);
    if (b.claimedStatus !== 'unclaimed') {
      throw new Error(`Benefit is already claimed (status: ${b.claimedStatus})`);
    }

    b.claimedStatus = 'claimed';
    b.voucherCode = 'GENY-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    b.expiryDate = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];
    b.daysUntilExpiry = 30;

    // Link with quests if applicable
    if (b.category === 'ai') {
      this.advanceQuestStep('quest-career', 'claim_ai_perk');
    }

    this.logPrivacyAccess('BenefitsEngine', ['voucher_generation'], `Claimed benefit ${b.title}`);
    return b;
  }

  getWalletItems(tab: WalletTab): BenefitItem[] {
    switch (tab) {
      case 'available':
        return this.getBenefitsForActivePersona().filter((b) => b.claimedStatus === 'unclaimed');
      case 'claimed':
        return this.benefits.filter((b) => b.claimedStatus === 'claimed');
      case 'active':
        return this.benefits.filter((b) => b.claimedStatus === 'active');
      case 'expiring':
        return this.benefits.filter((b) => b.daysUntilExpiry !== undefined && b.daysUntilExpiry <= 14);
    }
  }

  // --- Friday Drop Engagement Engine ---
  checkDropStatus(dropId: string): { status: 'upcoming' | 'live' | 'exhausted'; remainingPercent: number } {
    const drop = this.drops.find((d) => d.id === dropId);
    if (!drop) throw new Error(`Drop ${dropId} not found`);

    const remainingPercent = drop.totalStock > 0 ? (drop.remainingStock / drop.totalStock) * 100 : 0;
    if (drop.remainingStock <= 0) {
      return { status: 'exhausted', remainingPercent: 0 };
    }
    if (drop.isLive) {
      return { status: 'live', remainingPercent };
    }
    return { status: 'upcoming', remainingPercent };
  }

  claimFridayDrop(dropId: string): { success: boolean; voucherCode: string; remaining: number } {
    const drop = this.drops.find((d) => d.id === dropId);
    if (!drop) throw new Error(`Drop ${dropId} not found`);
    if (!drop.isLive) throw new Error('Drop is not currently live');
    if (drop.remainingStock <= 0) throw new Error('Drop is completely exhausted');
    if (drop.isClaimed) throw new Error('Double claim forbidden: user already claimed this drop');

    drop.remainingStock -= 1;
    drop.isClaimed = true;
    const voucher = 'DROP-' + drop.brand.substring(0, 3).toUpperCase() + '-' + Math.floor(100000 + Math.random() * 900000);
    drop.claimedVoucher = voucher;

    this.onConfetti?.('drop_claimed');
    return { success: true, voucherCode: voucher, remaining: drop.remainingStock };
  }

  joinDropWaitlist(dropId: string): { waitlistPosition: number } {
    const drop = this.drops.find((d) => d.id === dropId);
    if (!drop) throw new Error(`Drop ${dropId} not found`);
    if (drop.remainingStock > 0) throw new Error('Waitlist is only available when stock is exhausted');
    if (drop.isWaitlisted) throw new Error('User is already registered on waitlist for this drop');

    drop.isWaitlisted = true;
    drop.waitlistPosition = 412; // transparent queue number
    return { waitlistPosition: 412 };
  }

  toggleDropReminder(dropId: string): boolean {
    const drop = this.drops.find((d) => d.id === dropId);
    if (!drop) throw new Error(`Drop ${dropId} not found`);
    drop.hasReminder = !drop.hasReminder;
    return drop.hasReminder;
  }

  // --- Emergency SOS & Safety Hub ---
  startSosHold(): void {
    this.emergency.isTriggered = true;
    this.onAudioChime?.('sos_tick');
    this.emergency.auditLogs.push({ timestamp: new Date().toISOString(), action: 'SOS button pressed & held' });
  }

  cancelSosHoldEarly(): void {
    if (this.emergency.isTriggered && !this.emergency.isCancelling) {
      this.emergency.isTriggered = false;
      this.emergency.auditLogs.push({ timestamp: new Date().toISOString(), action: 'SOS button released before 3s threshold (reset)' });
    }
  }

  completeSosHold(): void {
    // 3s hold reached -> enter 10s false alarm grace window
    this.emergency.isTriggered = true;
    this.emergency.isCancelling = true;
    this.emergency.cancelSecondsLeft = 10;
    this.onAudioChime?.('sos_alarm');
    this.emergency.auditLogs.push({ timestamp: new Date().toISOString(), action: '3s SOS hold completed. 10s grace window initiated.' });
  }

  abortEmergencyGraceWindow(): void {
    if (!this.emergency.isCancelling) {
      throw new Error('No emergency grace window currently active to abort');
    }
    this.emergency.isTriggered = false;
    this.emergency.isCancelling = false;
    this.emergency.cancelSecondsLeft = 10;
    this.emergency.auditLogs.push({ timestamp: new Date().toISOString(), action: 'Emergency aborted by user during 10s false-alarm window' });
  }

  dispatchErssEmergency(): string {
    this.emergency.isCancelling = false;
    this.emergency.isDispatched = true;
    const ticket = 'ERSS-MH-2026-' + Math.floor(10000 + Math.random() * 90000);
    this.emergency.erssTicketId = ticket;

    // Dispatch SMS to contacts
    for (const c of this.emergency.contacts) {
      c.status = 'sent';
    }

    this.emergency.auditLogs.push({ timestamp: new Date().toISOString(), action: `112 ERSS ticket generated: ${ticket} with SMS dispatch to 3 contacts` });
    return ticket;
  }

  updateGpsLocation(lat: number, lng: number, locality: string, isManual = false): void {
    this.emergency.location = {
      latitude: lat,
      longitude: lng,
      accuracyMeters: isManual ? 1 : 5,
      locality,
      state: this.activePersona.state,
      isManualOverride: isManual,
    };
    this.logPrivacyAccess('GpsService', ['precise_location'], `Updated location to ${locality} (${lat}, ${lng})`);
  }

  getWeatherHazardWarnings(): HazardAlert[] {
    return [
      {
        id: 'h-01',
        type: 'heatwave',
        severity: 'high',
        title: 'IMD Severe Heatwave Alert',
        message: 'Day temperatures exceeding 41°C. Stay hydrated and avoid outdoor exertion between 12 PM - 3 PM.',
        locality: this.emergency.location.locality,
        issuedAt: '2026-09-08T09:00:00+05:30',
        safetyTips: ['Drink plenty of water / ORS', 'Wear light cotton fabrics', 'Carry an umbrella'],
      },
    ];
  }

  // --- Financial Literacy & Skill Paths ---
  submitQuizAnswers(moduleId: string, answers: number[]): { score: number; total: number; passed: boolean; xpEarned: number } {
    const mod = MOCK_QUIZZES.find((m) => m.id === moduleId);
    if (!mod) throw new Error(`Quiz module ${moduleId} not found`);

    let score = 0;
    for (let i = 0; i < mod.questions.length; i++) {
      if (answers[i] === mod.questions[i].correctIndex) {
        score++;
      }
    }
    const total = mod.questions.length;
    const passed = score / total >= 0.66; // 2 out of 3 is passing

    let xpEarned = 0;
    if (passed) {
      xpEarned = mod.xpReward;
      this.userProgress.xp += xpEarned;
      this.userProgress.streakDays += 1;
      if (!this.userProgress.completedModules.includes(moduleId)) {
        this.userProgress.completedModules.push(moduleId);
      }
      this.recalculateLevel();
      this.advanceQuestStep('quest-career', 'complete_quiz');
    }

    return { score, total, passed, xpEarned };
  }

  private recalculateLevel(): void {
    const xp = this.userProgress.xp;
    const prevLevel = this.userProgress.level;
    if (xp >= 300) {
      this.userProgress.level = 3; // Youth Master
    } else if (xp >= 100) {
      this.userProgress.level = 2; // Money Explorer
    } else {
      this.userProgress.level = 1; // Financial Novice
    }
    if (this.userProgress.level > prevLevel) {
      this.onConfetti?.('level_up');
    }
  }

  advanceQuestStep(questId: string, actionKey: string): void {
    const quest = this.userProgress.activeQuests.find((q) => q.id === questId);
    if (!quest) return;
    const step = quest.steps.find((s) => s.actionKey === actionKey);
    if (step && !step.isCompleted) {
      step.isCompleted = true;
      if (quest.steps.every((s) => s.isCompleted)) {
        quest.isCompleted = true;
        this.onConfetti?.('goal_completed');
      }
    }
  }

  // --- Green Gen-Young & Sustainability Passport ---
  logEcoAction(type: 'paperless' | 'quiz_passed' | 'course_viewed' | 'green_goal'): void {
    switch (type) {
      case 'paperless':
        this.greenPassport.paperlessMonths += 1;
        this.greenPassport.paperSheetsAvoided += 2;
        this.greenPassport.carbonOffsetKg += 0.3;
        this.greenPassport.waterSavedLiters += 20;
        if (this.greenPassport.paperlessMonths >= 3) {
          this.unlockGreenBadge('badge-digital-first');
        }
        break;
      case 'quiz_passed':
        this.greenPassport.quizzesPassed += 1;
        this.unlockGreenBadge('badge-climate-learner');
        break;
      case 'course_viewed':
        this.greenPassport.sdgCoursesViewed += 1;
        this.unlockGreenBadge('badge-circular-explorer');
        break;
      case 'green_goal':
        this.unlockGreenBadge('badge-sustainable-saver');
        break;
    }
  }

  private unlockGreenBadge(badgeId: string): void {
    const b = this.greenPassport.badges.find((x) => x.id === badgeId);
    if (b && !b.isUnlocked) {
      b.isUnlocked = true;
      b.earnedDate = new Date().toISOString().split('T')[0];
    }
  }

  // --- Universal Accessibility & Privacy ---
  updateAccessibility(updates: Partial<AccessibilitySettings>): void {
    this.accessibility = { ...this.accessibility, ...updates };
  }

  speakText(text: string): void {
    this.onTtsSpeak?.(text, this.accessibility.speechRate);
  }

  logPrivacyAccess(serviceName: string, attributesAccessed: string[], purpose: string): void {
    const entry: PrivacyAuditEntry = {
      id: 'AUD-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString(),
      systemOrService: serviceName,
      attributesAccessed,
      purpose,
      dpdpCompliant: true,
      thirdPartyLeaked: false,
    };
    this.privacyAuditTrail.unshift(entry);
  }
}
