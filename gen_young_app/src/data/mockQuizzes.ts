/**
 * Gen-Young Learning Quiz Bank — Dummy Content for Demo
 * Path: src/data/mockQuizzes.ts
 */

import { Quiz } from '../types/learning';

export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz_budgeting_basics',
    title: 'Budgeting Basics',
    description: 'Manage your money better with the 50/30/20 rule.',
    category: 'Money',
    level: 1,
    durationMinutes: 5,
    xpReward: 50,
    questions: [
      {
        id: 'q_b1',
        question:
          'In the 50/30/20 budgeting rule, what percentage goes to your needs (rent, food, transport)?',
        options: ['20%', '30%', '50%', '70%'],
        correctIndex: 2,
        explanation:
          '50% for needs (essentials), 30% for wants (lifestyle), and 20% for savings and debt.',
      },
      {
        id: 'q_b2',
        question: 'Which of these is a "need", not a "want"?',
        options: [
          'Netflix subscription',
          'A movie ticket',
          'Monthly hostel rent',
          'A weekend Zomato order',
        ],
        correctIndex: 2,
        explanation: 'Rent covers a basic essential (housing) — it is a need, not a want.',
      },
      {
        id: 'q_b3',
        question:
          'You spent ₹8,000 this month on essentials and your income was ₹20,000. Are you within the 50/30/20 needs cap?',
        options: [
          'Yes — you spent exactly 40% on needs',
          'No — you spent 60% on needs',
          'Yes — you spent 20% on needs',
          'It doesn\'t matter for the rule',
        ],
        correctIndex: 0,
        explanation:
          '₹8,000 ÷ ₹20,000 = 40%. Below the 50% cap — you have room to save more or add wants.',
      },
    ],
  },
  {
    id: 'quiz_smart_banking',
    title: 'Smart Digital Banking & UPI Safety',
    description: 'Recognise UPI scams and protect your money.',
    category: 'Safety',
    level: 1,
    durationMinutes: 6,
    xpReward: 60,
    questions: [
      {
        id: 'q_s1',
        question: 'You receive a UPI request for ₹1,999 from "PrizeWinCash". What should you do?',
        options: [
          'Approve — you might have won',
          'Reject and report the UPI ID',
          'Send them ₹1 first to verify',
          'Call the number in the request',
        ],
        correctIndex: 1,
        explanation:
          'UPI collect requests never mean you receive money. Approving = you pay them. Always reject unknown requests.',
      },
      {
        id: 'q_s2',
        question: 'A caller claims to be from your bank and asks for your UPI PIN. You should:',
        options: [
          'Share it — it\'s the bank calling',
          'Ask them to verify with your account number',
          'Never share your PIN over phone / SMS / email',
          'Give it, then change your PIN afterwards',
        ],
        correctIndex: 2,
        explanation:
          'No legitimate bank staff will ever ask for your UPI PIN or OTP. This is the #1 rule.',
      },
      {
        id: 'q_s3',
        question: 'What does "card freeze" do in Gen-Young?',
        options: [
          'Physically freezes your card in an ice pack',
          'Instantly blocks all card transactions until you unfreeze',
          'Cancels your card permanently',
          'Locks your bank account entirely',
        ],
        correctIndex: 1,
        explanation:
          'Card freeze is an instant, reversible block on card usage. Great if you lose it briefly and want to be safe.',
      },
    ],
  },
  {
    id: 'quiz_savings_goals',
    title: 'Target Savings & Goal Mastery',
    description: 'Turn dreams into savings pots with realistic timelines.',
    category: 'Money',
    level: 2,
    durationMinutes: 4,
    xpReward: 40,
    questions: [
      {
        id: 'q_g1',
        question:
          'You want a ₹36,000 laptop in 12 months. How much should you save per month?',
        options: ['₹1,500', '₹3,000', '₹4,000', '₹6,000'],
        correctIndex: 1,
        explanation: '₹36,000 ÷ 12 months = ₹3,000 per month. A realistic savings pot.',
      },
      {
        id: 'q_g2',
        question: 'What\'s the best first step before setting a savings goal?',
        options: [
          'Pick the largest goal you can dream of',
          'Know your monthly income and essential expenses',
          'Ask a friend how much they save',
          'Open five different bank accounts',
        ],
        correctIndex: 1,
        explanation:
          'You can\'t plan what to save until you know what\'s coming in and what\'s already going out.',
      },
      {
        id: 'q_g3',
        question:
          'A savings goal is at 80% completion. Should you withdraw from it to spend on a wants purchase?',
        options: [
          'Yes — you already saved most of it',
          'Only if it\'s a "need"',
          'No — never touch it',
          'Depends on your budget & the purchase; savings pots have a purpose',
        ],
        correctIndex: 3,
        explanation:
          'Savings pots are earmarked. Withdrawing for wants defeats the point. Emergencies or reassigned goals are fine.',
      },
    ],
  },
];

export const quizById = (id: string): Quiz | undefined =>
  mockQuizzes.find((q) => q.id === id);
