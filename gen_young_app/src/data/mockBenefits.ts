/**
 * Gen-Young Benefits Catalogue — Dummy Offers for Demo
 * Path: src/data/mockBenefits.ts
 *
 * These reflect the 16+ real-world benefit types shown in the concept paper
 * and the visual design boards (docs/assets/03–05, 09, 13, 16, 19).
 */

import { BenefitItem } from '../types/benefits';

export const mockBenefits: BenefitItem[] = [
  // ── AI & Technology ────────────────────────────────────────
  {
    id: 'benefit_google_ai_plus',
    title: 'Google AI Plus — 1 Year Free for Students',
    category: 'ai',
    provider: 'Google (via Student India Programme)',
    cost: 'Free',
    costDetails: '₹0 for the first 12 months',
    futureCostWarning: 'Auto-renews at ₹1,950/mo unless cancelled before the end of the 12th month.',
    shortDescription: '1 year of Gemini Advanced, NotebookLM Plus and 2TB Google One at zero cost for verified students.',
    fullDescription:
      'Verified full-time students in India get 12 months of Google AI Plus at no charge. Includes Gemini 2.5 Pro access, NotebookLM Plus (100 notebooks / 5 audio overviews per day), Whisk video generation, and 2TB Google One cloud storage. Requires eligibility verification via SheerID.',
    whySeeingThis:
      'Shown because your profile indicates you are a student under 25 with an active academic institution and interest in AI tools.',
    verifiedDate: '2026-09-05',
    actionLabel: 'Claim on Google',
    eligibilityAge: { min: 18, max: 25 },
    eligibleRoles: ['student'],
    claimedStatus: 'unclaimed',
  },
  {
    id: 'benefit_india_ai_compute',
    title: 'IndiaAI Compute Credits (₹5,000)',
    category: 'ai',
    provider: 'IndiaAI Mission · MeitY',
    cost: 'Free',
    costDetails: 'Government-subsidised GPU compute',
    shortDescription: '₹5,000 GPU credits on IndiaAI-empanelled cloud for youth building AI projects.',
    fullDescription:
      'The IndiaAI Mission provides subsidised GPU compute credits to Indian youth building AI models. Redeemable on empanelled cloud providers (Yotta, CtrlS, Tata Communications). Requires an active college ID or startup registration.',
    whySeeingThis:
      'Shown because your profile lists AI & Data Skills as a learning interest.',
    verifiedDate: '2026-09-01',
    actionLabel: 'Apply on IndiaAI',
    eligibilityAge: { min: 18, max: 30 },
    eligibleRoles: ['student', 'professional'],
    claimedStatus: 'unclaimed',
  },
  {
    id: 'benefit_figma_pro_perk',
    title: 'Figma Professional — Free for 1 Year',
    category: 'ai',
    provider: 'Figma (via Gen-Young Partnership)',
    cost: 'Free',
    costDetails: '₹0 for 12 months (worth $180)',
    shortDescription: 'Full Figma Pro workspace with unlimited files, dev mode and premium fonts.',
    fullDescription:
      'Design and prototype with Figma Professional — unlimited files, unlimited version history, Dev Mode with Playgrounds, and premium fonts. Includes FigJam Professional access.',
    whySeeingThis:
      'Shown because your profile shows Design & Creativity as an interest and you are a young professional.',
    verifiedDate: '2026-09-06',
    actionLabel: 'Activate Figma',
    eligibilityAge: { min: 18, max: 25 },
    eligibleRoles: ['professional', 'student'],
    claimedStatus: 'unclaimed',
  },

  // ── Government Schemes ─────────────────────────────────────
  {
    id: 'benefit_central_scholarship',
    title: 'National Means-cum-Merit Scholarship (₹12,000/yr)',
    category: 'govt',
    provider: 'Department of School Education · MoE (via myScheme)',
    cost: 'Free',
    costDetails: 'Direct benefit transfer to your bank account',
    shortDescription: 'Annual scholarship of ₹12,000 for meritorious students from economically weaker families.',
    fullDescription:
      'The NMMS awards ₹12,000 per year (₹1,000/month × 12) to eligible students in Classes 9–12. Selection is based on a two-stage state examination. Payment is made via direct benefit transfer to the student\'s Aadhaar-seeded bank account.',
    whySeeingThis:
      'Shown because you are between 14–18, in secondary schooling, and your profile matches the NMMS scheme criteria on myScheme.',
    verifiedDate: '2026-08-28',
    actionLabel: 'Check Eligibility on myScheme',
    eligibilityAge: { min: 14, max: 18 },
    eligibleRoles: ['aspirant', 'student'],
    claimedStatus: 'unclaimed',
  },
  {
    id: 'benefit_pmjjby_life_cover',
    title: 'PMJJBY — ₹2 Lakh Life Cover (₹436/yr)',
    category: 'govt',
    provider: 'Government of India · Life Insurance Corporation',
    cost: 'Subsidized',
    costDetails: '₹436/year auto-debited annually on 1 June',
    shortDescription: '₹2,00,000 term life cover for the entire year at ₹436 — Government-backed and one-tap enrolment.',
    fullDescription:
      'The Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) provides ₹2,00,000 term life insurance cover for any cause of death, for eligible account holders aged 18–50. Auto-debited from your savings account annually. Enrolment is one-tap through your linked bank.',
    whySeeingThis:
      'Shown because you are 18+ and hold an eligible Gen-Young savings account, matching PMJJBY criteria.',
    verifiedDate: '2026-09-01',
    actionLabel: 'Activate PMJJBY',
    eligibilityAge: { min: 18, max: 50 },
    eligibleRoles: ['student', 'professional'],
    claimedStatus: 'unclaimed',
  },
  {
    id: 'benefit_pmsby_accidental_cover',
    title: 'PMSBY — ₹2 Lakh Accidental Cover (₹20/yr)',
    category: 'govt',
    provider: 'Government of India · General Insurance Corporation',
    cost: 'Subsidized',
    costDetails: '₹20/year auto-debited annually on 1 June',
    shortDescription: 'Government-backed ₹2 lakh accidental death and total disability cover for just ₹20/year.',
    fullDescription:
      'The Pradhan Mantri Suraksha Bima Yojana (PMSBY) provides ₹2 lakh cover for accidental death or total permanent disability, and ₹1 lakh for partial permanent disability. Eligible for account holders aged 18–70. Renewal is automatic while the linked savings account remains active.',
    whySeeingThis: 'Shown because you are 18+ and hold an eligible Gen-Young savings account.',
    verifiedDate: '2026-09-01',
    actionLabel: 'Activate PMSBY',
    eligibilityAge: { min: 18, max: 70 },
    eligibleRoles: ['student', 'professional'],
    claimedStatus: 'unclaimed',
  },
  {
    id: 'benefit_ayushman_bharat',
    title: 'Ayushman Bharat PM-JAY — Up to ₹5 Lakh/year',
    category: 'govt',
    provider: 'National Health Authority',
    cost: 'Free',
    costDetails: 'Zero-premium government health cover',
    shortDescription: 'Up to ₹5,00,000 per family per year for secondary and tertiary hospitalisation at empanelled hospitals.',
    fullDescription:
      'The Pradhan Mantri Jan Arogya Yojana (PM-JAY) is the world\'s largest government-funded health insurance scheme, offering ₹5 lakh per family per year cover at 27,000+ empanelled hospitals. Eligibility is family-based, determined by the SECC-2011 deprivation criteria — verify on the official PM-JAY portal.',
    whySeeingThis:
      'Shown as a check-your-eligibility card. Final eligibility is decided by the National Health Authority, not by Gen-Young.',
    verifiedDate: '2026-08-25',
    actionLabel: 'Check Eligibility on PM-JAY',
    eligibilityAge: { min: 0, max: 99 },
    eligibleRoles: ['student', 'aspirant', 'professional'],
    claimedStatus: 'unclaimed',
  },

  // ── Education ──────────────────────────────────────────────
  {
    id: 'benefit_nptel_ai_cert',
    title: 'NPTEL — Introduction to AI (12-Week Certificate)',
    category: 'education',
    provider: 'NPTEL · IIT Madras',
    cost: 'Free',
    costDetails: 'Course is free; optional proctored exam ₹1,000',
    shortDescription: '12-week structured AI course from IIT Madras with an optional NPTEL-recognised certificate.',
    fullDescription:
      'Learn foundational AI from IIT Madras — problem solving, logic and reasoning, search, planning, uncertainty, and machine learning basics. Course access is free; optional proctored certification exam is ₹1,000. Certificates are widely recognised by Indian recruiters.',
    whySeeingThis: 'Shown because your profile lists AI & Data Skills as a learning goal.',
    verifiedDate: '2026-09-04',
    actionLabel: 'Enrol on NPTEL',
    eligibilityAge: { min: 16, max: 30 },
    eligibleRoles: ['student', 'aspirant', 'professional'],
    claimedStatus: 'unclaimed',
  },
  {
    id: 'benefit_sathee_jee_prep',
    title: 'SATHEE — Free JEE / NEET Prep (Ministry of Education)',
    category: 'education',
    provider: 'SATHEE · MoE · IIT Kanpur',
    cost: 'Free',
    costDetails: '₹0 · Government-funded free coaching platform',
    shortDescription: 'Free JEE and NEET prep with structured video lessons, live doubt clearing and AI-based mentors.',
    fullDescription:
      'Self-Assessment Test and Help for Entrance Exams (SATHEE) is a Ministry of Education initiative offering free JEE Main, JEE Advanced and NEET preparation. Includes structured video content, weekly live sessions, mock tests, and an AI-based Sathee Bot for doubt resolution.',
    whySeeingThis:
      'Shown because you are a Class 11 aspirant preparing for competitive engineering entrances.',
    verifiedDate: '2026-09-02',
    actionLabel: 'Start on SATHEE',
    eligibilityAge: { min: 14, max: 20 },
    eligibleRoles: ['aspirant', 'student'],
    claimedStatus: 'unclaimed',
  },
  {
    id: 'benefit_swayam_green_econ',
    title: 'SWAYAM — Green Economy & Sustainable Finance',
    category: 'education',
    provider: 'SWAYAM · Ministry of Education',
    cost: 'Free',
    costDetails: 'Free course; certificate exam ₹500',
    shortDescription: '8-week course covering green finance, ESG investing, and climate risk in banking.',
    fullDescription:
      '8-week academic course from IIM-recognised faculty covering green economics, ESG investing frameworks, climate risk in banking, and career pathways in sustainable finance. Widely credit-transferable across UGC universities.',
    whySeeingThis: 'Shown because your profile lists Green Future as an interest.',
    verifiedDate: '2026-08-30',
    actionLabel: 'Enrol on SWAYAM',
    eligibilityAge: { min: 17, max: 30 },
    eligibleRoles: ['student', 'professional'],
    claimedStatus: 'unclaimed',
  },

  // ── Career ─────────────────────────────────────────────────
  {
    id: 'benefit_apprenticeship_neat',
    title: 'National Apprenticeship Promotion Scheme',
    category: 'career',
    provider: 'MSDE · Government of India',
    cost: 'Free',
    costDetails: 'Government stipend of ₹5,000–₹9,000/month',
    shortDescription: 'Get placed as an apprentice at a partner company with a government-funded monthly stipend.',
    fullDescription:
      'NAPS provides subsidised apprenticeship placements at 40,000+ registered establishments across India. Duration ranges from 6 to 36 months. The government funds 25% of the prescribed stipend (up to ₹1,500/month), with the employer paying the rest.',
    whySeeingThis: 'Shown because you match the age band and are actively looking for internships/jobs.',
    verifiedDate: '2026-09-03',
    actionLabel: 'Register on Apprenticeship Portal',
    eligibilityAge: { min: 18, max: 25 },
    eligibleRoles: ['student', 'professional'],
    claimedStatus: 'unclaimed',
  },
  {
    id: 'benefit_sustainability_intern',
    title: 'Pan-India Sustainability Research Internship',
    category: 'career',
    provider: 'CSTEP · Bengaluru',
    cost: 'Free',
    costDetails: 'Paid internship: ₹15,000/month stipend',
    shortDescription: '3-month research internship on climate policy, renewables and sustainable cities.',
    fullDescription:
      'CSTEP (Center for Study of Science, Technology & Policy) offers a 3-month paid research internship focused on climate policy, renewable energy transition, and sustainable urban infrastructure. Requires an ongoing UG/PG programme.',
    whySeeingThis: 'Shown because your profile lists Green Future and Career interests.',
    verifiedDate: '2026-09-05',
    actionLabel: 'Apply on CSTEP',
    eligibilityAge: { min: 19, max: 26 },
    eligibleRoles: ['student', 'professional'],
    claimedStatus: 'unclaimed',
  },

  // ── Health ─────────────────────────────────────────────────
  {
    id: 'benefit_student_telemedicine',
    title: 'Youth Telemedicine Pack — ₹99/quarter',
    category: 'health',
    provider: 'Practo Health Partners',
    cost: 'Paid',
    costDetails: '₹99 for a full quarter (worth ₹1,500)',
    shortDescription: 'Unlimited GP consultations, one gynaecologist / mental health session, and 24×7 chat support.',
    fullDescription:
      'A quarterly telemedicine pack tailored for young Indians — unlimited general practitioner video consultations, one specialist consultation (gynaecologist, dermatologist or mental health counsellor) per quarter, and 24×7 chat-based support.',
    whySeeingThis: 'Shown because your profile lists Health & Wellness as an interest.',
    verifiedDate: '2026-08-29',
    actionLabel: 'Subscribe on Practo',
    eligibilityAge: { min: 15, max: 25 },
    eligibleRoles: ['student', 'aspirant', 'professional'],
    claimedStatus: 'unclaimed',
  },

  // ── Lifestyle & Local ──────────────────────────────────────
  {
    id: 'benefit_mumbai_metro_pass',
    title: 'Mumbai Metro — 30-Day Youth Pass at 20% Off',
    category: 'lifestyle',
    provider: 'Maha Mumbai Metro (MMRDA)',
    cost: 'Subsidized',
    costDetails: '₹640 for 30 days (regular price ₹800)',
    shortDescription: 'Unlimited rides on Line 2A, 7 and 3 for 30 days at a special youth-only rate.',
    fullDescription:
      'A 30-day unlimited-rides Mumbai Metro pass available exclusively to Gen-Young users aged 15–25 living in the Mumbai Metropolitan Region. Redeemable via the metro\'s QR-based ticketing.',
    whySeeingThis: 'Shown because your location is Mumbai and you use the metro network.',
    verifiedDate: '2026-09-06',
    actionLabel: 'Buy Pass',
    eligibilityAge: { min: 15, max: 25 },
    eligibleRoles: ['student', 'professional'],
    claimedStatus: 'unclaimed',
  },
  {
    id: 'benefit_cultfit_pass',
    title: 'Cult.fit Elite — ₹499 First Month',
    category: 'lifestyle',
    provider: 'Cure.Fit · Bengaluru',
    cost: 'Paid',
    costDetails: '₹499 first month (regular ₹2,499)',
    shortDescription: 'One month of unlimited gym, group classes, yoga and boxing at any Cult.fit centre.',
    fullDescription:
      'Elite tier membership giving unlimited access to all Cult.fit gyms, group classes (S&C, yoga, dance, boxing), and Cure app content. First month at ₹499 for young professionals aged 22–28.',
    whySeeingThis: 'Shown because your city is Bengaluru and your profile lists Health & Fitness.',
    verifiedDate: '2026-09-04',
    actionLabel: 'Redeem on Cult.fit',
    eligibilityAge: { min: 22, max: 28 },
    eligibleRoles: ['professional'],
    claimedStatus: 'unclaimed',
  },
];

export const benefitById = (id: string): BenefitItem | undefined =>
  mockBenefits.find((b) => b.id === id);

// Category → colour mapping used by BenefitsView filter chips
export const categoryMeta: Record<
  string,
  { label: string; short: string; accent: string; bg: string }
> = {
  all: {
    label: 'All',
    short: 'All',
    accent: 'text-white',
    bg: 'bg-slate-700 border-slate-600',
  },
  govt: {
    label: 'Government Schemes',
    short: 'Govt',
    accent: 'text-emerald-300',
    bg: 'bg-emerald-500/15 border-emerald-500/30',
  },
  ai: {
    label: 'AI & Technology',
    short: 'AI',
    accent: 'text-purple-300',
    bg: 'bg-purple-500/15 border-purple-500/30',
  },
  education: {
    label: 'Education',
    short: 'Learn',
    accent: 'text-teal-300',
    bg: 'bg-teal-500/15 border-teal-500/30',
  },
  career: {
    label: 'Career',
    short: 'Career',
    accent: 'text-amber-300',
    bg: 'bg-amber-500/15 border-amber-500/30',
  },
  health: {
    label: 'Health',
    short: 'Health',
    accent: 'text-rose-300',
    bg: 'bg-rose-500/15 border-rose-500/30',
  },
  lifestyle: {
    label: 'Lifestyle & Local',
    short: 'Lifestyle',
    accent: 'text-cyan-300',
    bg: 'bg-cyan-500/15 border-cyan-500/30',
  },
};
