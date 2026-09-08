/**
 * Gen-Young Mock Personas Dataset
 * Authoritative mock data for Priya (21), Aarav (16), and Ananya (24)
 * Path: src/data/mockPersonas.ts
 */

import { UserPersona } from '../types/persona';

export const mockPersonas: Record<string, UserPersona> = {
  priya: {
    id: 'priya',
    name: 'Priya Sharma',
    age: 21,
    gender: 'female',
    role: 'student',
    roleLabel: 'College Senior (Final Year B.Tech)',
    tagline: 'Tech Innovator & Aspiring AI Developer',
    bio: 'Final-year Computer Engineering student at VJTI / University of Mumbai, balancing campus hackathons, research projects, and tech internships.',
    institutionOrCompany: 'Veermata Jijabai Technological Institute (VJTI), Mumbai',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    avatarInitials: 'PS',
    isMinor: false,
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      locality: 'Kalina Campus / Bandra Kurla Complex',
      pincode: '400098',
      coordinates: {
        lat: 19.0760,
        lng: 72.8777,
        accuracy: 5
      }
    },
    trustedContacts: [
      {
        id: 'tc_priya_1',
        name: 'Anita Sharma',
        relation: 'Mother',
        phone: '+91 98201 23456',
        isPrimary: true
      },
      {
        id: 'tc_priya_2',
        name: 'Rhea Patel',
        relation: 'Best Friend / Flatmate',
        phone: '+91 98202 34567',
        isPrimary: false
      },
      {
        id: 'tc_priya_3',
        name: 'Dr. Arvind Kulkarni',
        relation: 'Hostel Chief Warden',
        phone: '+91 98203 45678',
        isPrimary: false
      }
    ],
    initialBankAccount: {
      accountNumber: '987654321021',
      ifsc: 'GYBK0001001',
      branch: 'Mumbai Fort Youth Branch',
      accountType: 'Zero-Balance Youth Savings',
      balance: 14500,
      currency: 'INR',
      monthlySpent: 6240,
      monthlyBudget: 20000,
      virtualCard: {
        cardNumber: '5081 2840 9210 4092',
        maskedCardNumber: '5081 •••• •••• 4092',
        cardHolder: 'PRIYA SHARMA',
        expiryMonth: 8,
        expiryYear: 29,
        expiryFormatted: '08/29',
        cvv: '729',
        isFrozen: false,
        onlineLimit: 15000,
        nfcEnabled: true,
        network: 'RuPay Platinum Youth'
      },
      savingsGoals: [
        {
          id: 'goal_priya_1',
          title: 'MacBook Pro Upgrade',
          category: 'tech',
          targetAmount: 45000,
          currentAmount: 22000,
          targetDate: '2026-12-31',
          color: 'violet',
          icon: 'Laptop',
          isCompleted: false,
          createdAt: '2026-07-01T10:00:00.000Z',
          lastTopUpDate: '2026-09-02T14:30:00.000Z'
        },
        {
          id: 'goal_priya_2',
          title: 'Graduation Goa Trip',
          category: 'travel',
          targetAmount: 12000,
          currentAmount: 8500,
          targetDate: '2026-11-15',
          color: 'teal',
          icon: 'Palmtree',
          isCompleted: false,
          createdAt: '2026-07-15T12:00:00.000Z',
          lastTopUpDate: '2026-08-28T18:15:00.000Z'
        }
      ],
      transactions: [
        {
          id: 'tx_p_001',
          timestamp: '2026-09-06T15:30:00.000Z',
          title: 'Monthly Allowance from Dad',
          description: 'UPI Transfer from Parent Account',
          amount: 10000,
          type: 'credit',
          category: 'allowance',
          senderOrRecipient: 'Rajesh Sharma',
          upiId: 'rajesh.sharma@okhdfc',
          referenceNumber: 'UPI/2026/81920193',
          status: 'success',
          note: 'Semester living expenses'
        },
        {
          id: 'tx_p_002',
          timestamp: '2026-09-07T13:15:00.000Z',
          title: 'Swiggy Campus Lunch',
          description: 'Bandra Food Delivery',
          amount: 280,
          type: 'debit',
          category: 'upi',
          senderOrRecipient: 'Swiggy Pay',
          upiId: 'swiggypay@icici',
          referenceNumber: 'UPI/2026/81920412',
          status: 'success',
          note: 'Lunch at lab'
        },
        {
          id: 'tx_p_003',
          timestamp: '2026-09-07T17:45:00.000Z',
          title: 'Starbucks Coffee BKC',
          description: 'RuPay Card Tap & Pay',
          amount: 350,
          type: 'debit',
          category: 'card',
          senderOrRecipient: 'Tata Starbucks BKC',
          referenceNumber: 'POS/2026/7192841',
          status: 'success',
          note: 'Study session beverage'
        },
        {
          id: 'tx_p_004',
          timestamp: '2026-09-05T11:20:00.000Z',
          title: 'Freelance UI Design Project',
          description: 'Direct Payment for FinTech Icons',
          amount: 7500,
          type: 'credit',
          category: 'upi',
          senderOrRecipient: 'Studio Pixel Mumbai',
          upiId: 'designstudio@kotak',
          referenceNumber: 'UPI/2026/81920999',
          status: 'success',
          note: 'Milestone 2 deliverable'
        },
        {
          id: 'tx_p_005',
          timestamp: '2026-09-04T09:10:00.000Z',
          title: 'Mumbai Metro Smart Card Recharge',
          description: 'RuPay Online Payment',
          amount: 500,
          type: 'debit',
          category: 'card',
          senderOrRecipient: 'Maha Mumbai Metro MMRDA',
          referenceNumber: 'METRO/2026/102938',
          status: 'success'
        },
        {
          id: 'tx_p_006',
          timestamp: '2026-09-03T19:40:00.000Z',
          title: 'BookMyShow Student Movie',
          description: 'PVR Phoenix Kurla Screen 4',
          amount: 220,
          type: 'debit',
          category: 'upi',
          senderOrRecipient: 'BookMyShow',
          upiId: 'bookmyshow@axis',
          referenceNumber: 'UPI/2026/81921102',
          status: 'success'
        }
      ]
    },
    greenProfile: {
      paperlessOpted: true,
      paperlessMonths: 8,
      carbonOffsetKg: 3.2,
      unSdgCoursesCompleted: 3,
      unlockedBadges: ['climate_learner', 'circular_economy', 'digital_first']
    },
    learningProfile: {
      level: 2,
      levelTitle: 'Money Explorer',
      xp: 340,
      nextLevelXp: 500,
      streakDays: 14,
      completedModuleIds: ['mod_budgeting_basics', 'mod_smart_banking'],
      completedQuizIds: ['quiz_budgeting_1', 'quiz_smart_banking_1']
    },
    recommendedBenefitIds: [
      'benefit_google_ai_plus',
      'benefit_nptel_ai_cert',
      'benefit_central_scholarship',
      'benefit_mumbai_metro_pass',
      'drop_pvr_cinema_pass'
    ],
    eligibleBenefitCategories: ['government', 'ai_productivity', 'education', 'health', 'lifestyle', 'green']
  },

  aarav: {
    id: 'aarav',
    name: 'Aarav Patel',
    age: 16,
    gender: 'male',
    role: 'aspirant',
    roleLabel: 'Class 11 JEE Aspirant (Minor Account)',
    tagline: 'High School Student & STEM Aspirant',
    bio: 'Dedicated 11th grade student preparing for IIT JEE and competitive science olympiads, learning financial discipline with guardian oversight.',
    institutionOrCompany: 'Delhi Public School (DPS) Bopal & Allen Career Institute, Ahmedabad',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
    avatarInitials: 'AP',
    isMinor: true,
    location: {
      city: 'Ahmedabad',
      state: 'Gujarat',
      locality: 'Navrangpura / Vastrapur Lake',
      pincode: '380009',
      coordinates: {
        lat: 23.0225,
        lng: 72.5714,
        accuracy: 5
      }
    },
    guardian: {
      name: 'Vikram Patel',
      relation: 'Father / Legal Guardian',
      phone: '+91 98250 12345',
      email: 'vikram.patel@gmail.com',
      linkedSince: 'June 2025',
      coSignLimit: 1000,
      guardianOversightActive: true
    },
    trustedContacts: [
      {
        id: 'tc_aarav_1',
        name: 'Vikram Patel (Father)',
        relation: 'Primary Guardian',
        phone: '+91 98250 12345',
        isPrimary: true
      },
      {
        id: 'tc_aarav_2',
        name: 'Bhavna Patel (Mother)',
        relation: 'Mother',
        phone: '+91 98250 23456',
        isPrimary: false
      },
      {
        id: 'tc_aarav_3',
        name: 'Nilesh Shah',
        relation: 'Allen Academic Mentor',
        phone: '+91 98250 34567',
        isPrimary: false
      }
    ],
    initialBankAccount: {
      accountNumber: '987654321016',
      ifsc: 'GYBK0002002',
      branch: 'Ahmedabad CG Road Youth Branch',
      accountType: 'Zero-Balance Minor Savings Account',
      balance: 2800,
      currency: 'INR',
      monthlySpent: 1450,
      monthlyBudget: 5000,
      virtualCard: {
        cardNumber: '5081 4920 1830 8104',
        maskedCardNumber: '5081 •••• •••• 8104',
        cardHolder: 'AARAV V PATEL',
        expiryMonth: 11,
        expiryYear: 28,
        expiryFormatted: '11/28',
        cvv: '318',
        isFrozen: false,
        onlineLimit: 3000,
        nfcEnabled: false,
        network: 'RuPay Youth Junior'
      },
      savingsGoals: [
        {
          id: 'goal_aarav_1',
          title: 'HC Verma Books & Study Tablet',
          category: 'education',
          targetAmount: 6000,
          currentAmount: 3500,
          targetDate: '2026-10-15',
          color: 'amber',
          icon: 'BookOpen',
          isCompleted: false,
          createdAt: '2026-08-01T11:00:00.000Z',
          lastTopUpDate: '2026-09-04T16:00:00.000Z'
        }
      ],
      transactions: [
        {
          id: 'tx_a_001',
          timestamp: '2026-09-07T08:30:00.000Z',
          title: 'Pocket Money from Father',
          description: 'Guardian Monthly Pocket Transfer',
          amount: 2500,
          type: 'credit',
          category: 'allowance',
          senderOrRecipient: 'Vikram Patel',
          upiId: 'vikram.patel@okaxis',
          referenceNumber: 'UPI/2026/72019481',
          status: 'success',
          note: 'September allowance'
        },
        {
          id: 'tx_a_002',
          timestamp: '2026-09-07T16:45:00.000Z',
          title: 'Navrang Stationery Books',
          description: 'Physics & Chemistry Workbooks',
          amount: 420,
          type: 'debit',
          category: 'upi',
          senderOrRecipient: 'Navrang Book Depot',
          upiId: 'navrangbooks@paytm',
          referenceNumber: 'UPI/2026/72019502',
          status: 'success'
        },
        {
          id: 'tx_a_003',
          timestamp: '2026-09-06T18:20:00.000Z',
          title: 'Amul Cafe Milkshake & Sandwich',
          description: 'Post-Coaching Snack',
          amount: 110,
          type: 'debit',
          category: 'upi',
          senderOrRecipient: 'Amul Parlour Vastrapur',
          upiId: 'amulparlour@sbi',
          referenceNumber: 'UPI/2026/72019623',
          status: 'success'
        },
        {
          id: 'tx_a_004',
          timestamp: '2026-09-05T14:10:00.000Z',
          title: 'Allen Online Mock Test Series',
          description: 'Virtual Debit Card Payment',
          amount: 650,
          type: 'debit',
          category: 'card',
          senderOrRecipient: 'Allen Career Institute',
          referenceNumber: 'EDUPAY/2026/9102',
          status: 'success'
        },
        {
          id: 'tx_a_005',
          timestamp: '2026-09-04T07:50:00.000Z',
          title: 'Ahmedabad BRTS Bus Pass Recharge',
          description: 'Monthly Student Commuter Pass',
          amount: 150,
          type: 'debit',
          category: 'card',
          senderOrRecipient: 'Ahmedabad Janmarg BRTS',
          referenceNumber: 'BRTS/2026/41029',
          status: 'success'
        }
      ]
    },
    greenProfile: {
      paperlessOpted: true,
      paperlessMonths: 4,
      carbonOffsetKg: 1.6,
      unSdgCoursesCompleted: 1,
      unlockedBadges: ['digital_first']
    },
    learningProfile: {
      level: 1,
      levelTitle: 'Financial Novice',
      xp: 120,
      nextLevelXp: 200,
      streakDays: 5,
      completedModuleIds: ['mod_budgeting_basics'],
      completedQuizIds: ['quiz_budgeting_1']
    },
    recommendedBenefitIds: [
      'benefit_sathee_jee_prep',
      'benefit_nmms_scholarship',
      'benefit_student_telemedicine',
      'drop_dominos_student_feast'
    ],
    eligibleBenefitCategories: ['government', 'education', 'health', 'lifestyle', 'green']
  },

  ananya: {
    id: 'ananya',
    name: 'Ananya Verma',
    age: 24,
    gender: 'female',
    role: 'professional',
    roleLabel: 'Associate Software Engineer',
    tagline: 'Financially Independent Tech Professional',
    bio: 'Junior Software Engineer and Product Designer at a Bengaluru AI startup, actively building emergency reserves and exploring sustainable investment strategies.',
    institutionOrCompany: 'NexGen Labs India, Indiranagar, Bengaluru',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    avatarInitials: 'AV',
    isMinor: false,
    location: {
      city: 'Bengaluru',
      state: 'Karnataka',
      locality: 'Indiranagar / 100 Feet Road',
      pincode: '560038',
      coordinates: {
        lat: 12.9716,
        lng: 77.5946,
        accuracy: 5
      }
    },
    trustedContacts: [
      {
        id: 'tc_ananya_1',
        name: 'Kavya Verma',
        relation: 'Sister',
        phone: '+91 98450 12345',
        isPrimary: true
      },
      {
        id: 'tc_ananya_2',
        name: 'Pooja Rao',
        relation: 'Flatmate & Colleague',
        phone: '+91 98450 23456',
        isPrimary: false
      },
      {
        id: 'tc_ananya_3',
        name: 'Dr. K. Ramanathan',
        relation: 'Family Physician',
        phone: '+91 98450 34567',
        isPrimary: false
      }
    ],
    initialBankAccount: {
      accountNumber: '987654321024',
      ifsc: 'GYBK0003003',
      branch: 'Bengaluru MG Road Youth Branch',
      accountType: 'Zero-Balance Youth Corporate Savings',
      balance: 58400,
      currency: 'INR',
      monthlySpent: 21800,
      monthlyBudget: 40000,
      virtualCard: {
        cardNumber: '5081 7410 9302 9341',
        maskedCardNumber: '5081 •••• •••• 9341',
        cardHolder: 'ANANYA VERMA',
        expiryMonth: 4,
        expiryYear: 30,
        expiryFormatted: '04/30',
        cvv: '592',
        isFrozen: false,
        onlineLimit: 25000,
        nfcEnabled: true,
        network: 'RuPay Platinum Youth Corporate'
      },
      savingsGoals: [
        {
          id: 'goal_ananya_1',
          title: '3-Month Emergency Fund',
          category: 'emergency',
          targetAmount: 100000,
          currentAmount: 65000,
          targetDate: '2027-03-31',
          color: 'emerald',
          icon: 'ShieldCheck',
          isCompleted: false,
          createdAt: '2026-05-01T10:00:00.000Z',
          lastTopUpDate: '2026-09-01T18:00:00.000Z'
        },
        {
          id: 'goal_ananya_2',
          title: 'Leh Ladakh Bike Expedition',
          category: 'lifestyle',
          targetAmount: 35000,
          currentAmount: 18000,
          targetDate: '2026-11-20',
          color: 'amber',
          icon: 'Compass',
          isCompleted: false,
          createdAt: '2026-06-15T14:00:00.000Z',
          lastTopUpDate: '2026-08-25T11:30:00.000Z'
        }
      ],
      transactions: [
        {
          id: 'tx_an_001',
          timestamp: '2026-09-01T10:00:00.000Z',
          title: 'Salary Credit - NexGen Labs',
          description: 'Direct Corporate NEFT Salary',
          amount: 45000,
          type: 'credit',
          category: 'salary',
          senderOrRecipient: 'NexGen Labs India Pvt Ltd',
          referenceNumber: 'SAL/2026/09/NEXGEN',
          status: 'success',
          note: 'August salary payout'
        },
        {
          id: 'tx_an_002',
          timestamp: '2026-09-07T09:30:00.000Z',
          title: 'Third Wave Coffee Roasters',
          description: 'Indiranagar Morning Flat White',
          amount: 420,
          type: 'debit',
          category: 'upi',
          senderOrRecipient: 'Third Wave Indiranagar',
          upiId: 'thirdwave@hdfcbank',
          referenceNumber: 'UPI/2026/61902831',
          status: 'success'
        },
        {
          id: 'tx_an_003',
          timestamp: '2026-09-06T19:00:00.000Z',
          title: 'Cult.fit Monthly Gym Pass',
          description: 'Fitness & Yoga Access',
          amount: 1800,
          type: 'debit',
          category: 'upi',
          senderOrRecipient: 'CureFit Healthcare',
          upiId: 'cultfit@icici',
          referenceNumber: 'UPI/2026/61902914',
          status: 'success'
        },
        {
          id: 'tx_an_004',
          timestamp: '2026-09-05T20:15:00.000Z',
          title: 'Blinkit Quick Grocery',
          description: 'Fresh Produce & Pantry Essentials',
          amount: 890,
          type: 'debit',
          category: 'upi',
          senderOrRecipient: 'Blinkit Commerce',
          upiId: 'blinkit@kotak',
          referenceNumber: 'UPI/2026/61903022',
          status: 'success'
        },
        {
          id: 'tx_an_005',
          timestamp: '2026-09-03T16:00:00.000Z',
          title: 'Design Sprint Performance Bonus',
          description: 'Q2 Innovation Recognition',
          amount: 12000,
          type: 'credit',
          category: 'transfer',
          senderOrRecipient: 'NexGen Labs Bonus Pool',
          referenceNumber: 'BONUS/2026/08',
          status: 'success'
        },
        {
          id: 'tx_an_006',
          timestamp: '2026-09-02T11:00:00.000Z',
          title: 'SIP Mutual Fund Investment',
          description: 'Nifty 50 Index Fund Monthly SIP',
          amount: 5000,
          type: 'debit',
          category: 'transfer',
          senderOrRecipient: 'Zerodha Coin Auto-Debit',
          referenceNumber: 'MF/2026/SIP10294',
          status: 'success'
        }
      ]
    },
    greenProfile: {
      paperlessOpted: true,
      paperlessMonths: 14,
      carbonOffsetKg: 5.6,
      unSdgCoursesCompleted: 4,
      unlockedBadges: ['climate_learner', 'circular_economy', 'sustainable_finance', 'digital_first']
    },
    learningProfile: {
      level: 3,
      levelTitle: 'Youth Financial Master',
      xp: 580,
      nextLevelXp: 1000,
      streakDays: 28,
      completedModuleIds: ['mod_budgeting_basics', 'mod_smart_banking', 'mod_savings_goals', 'mod_sustainable_finance'],
      completedQuizIds: ['quiz_budgeting_1', 'quiz_smart_banking_1', 'quiz_savings_1', 'quiz_green_1']
    },
    recommendedBenefitIds: [
      'benefit_pmjjby_life_cover',
      'benefit_pmsby_accidental_cover',
      'benefit_india_ai_compute',
      'benefit_figma_pro_perk',
      'drop_cultfit_elite_pass'
    ],
    eligibleBenefitCategories: ['government', 'ai_productivity', 'education', 'career', 'health', 'lifestyle', 'green']
  }
};

Object.values(mockPersonas).forEach((p) => {
  p.bankAccount = p.initialBankAccount;
});

export const defaultPersonaId: 'priya' = 'priya';

export const personasList: UserPersona[] = Object.values(mockPersonas);

