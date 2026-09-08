/**
 * Indian Sign Language (ISL) Text-to-Gloss & Gesture Synthesis
 * 
 * Adapted & quoted from:
 * https://github.com/37OMKAR/text-to-signlanguage.git
 * 
 * Implements rule-based NLP lemmatization, stopword suppression,
 * and ISL handshape gesture classification for Gen-Young accessibility.
 */

export interface IslSign {
  gloss: string;
  category: 'banking' | 'emergency' | 'benefits' | 'general';
  handshape: string;
  location: string;
  movement: string;
  description: string;
  svgGesture: string; // descriptive SVG path representation
}

// Stopwords suppressed in sign language gloss (from text-to-signlanguage nlp rules)
const DROP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
  'do', 'does', 'did', 'of', 'to', 'for', 'at', 'on', 'in', 'by', 'with', 'from',
  'that', 'this', 'these', 'those', 'it', 'its', 'my', 'your', 'our', 'their'
]);

// Lemmatization mapping toward base sign dictionary keys
const LEMMA_MAP: Record<string, string> = {
  // Banking & Financial
  'balances': 'BALANCE',
  'balance': 'BALANCE',
  'moneys': 'MONEY',
  'money': 'MONEY',
  'rupees': 'MONEY',
  'rupee': 'MONEY',
  'cash': 'MONEY',
  'funds': 'MONEY',
  'transfer': 'TRANSFER',
  'transferred': 'TRANSFER',
  'transferring': 'TRANSFER',
  'send': 'SEND',
  'sent': 'SEND',
  'pay': 'PAY',
  'paid': 'PAY',
  'payment': 'PAY',
  'cards': 'CARD',
  'card': 'CARD',
  'debit': 'CARD',
  'freeze': 'FREEZE',
  'frozen': 'FREEZE',
  'lock': 'FREEZE',
  'locked': 'FREEZE',
  'saving': 'SAVE',
  'savings': 'SAVE',
  'saved': 'SAVE',
  'deposit': 'DEPOSIT',

  // Emergency & Safety
  'emergency': 'EMERGENCY',
  'urgent': 'EMERGENCY',
  'help': 'HELP',
  'sos': 'SOS',
  'police': 'POLICE',
  'doctor': 'DOCTOR',
  'hospital': 'HOSPITAL',
  'safe': 'SAFE',
  'safety': 'SAFE',
  'danger': 'DANGER',
  'alert': 'ALERT',

  // Benefits & Schemes
  'scholarship': 'SCHOLARSHIP',
  'scholarships': 'SCHOLARSHIP',
  'benefit': 'BENEFIT',
  'benefits': 'BENEFIT',
  'scheme': 'SCHEME',
  'schemes': 'SCHEME',
  'apply': 'APPLY',
  'applied': 'APPLY',
  'applying': 'APPLY',
  'claim': 'CLAIM',
  'claimed': 'CLAIM',
  'eligible': 'ELIGIBLE',
  'eligibility': 'ELIGIBLE',
  'student': 'STUDENT',
  'students': 'STUDENT',
  'learn': 'LEARN',
  'learning': 'LEARN',
  'course': 'COURSE',
  'courses': 'COURSE',
  'education': 'LEARN',

  // General Actions
  'hello': 'HELLO',
  'yes': 'YES',
  'no': 'NO',
  'thank': 'THANK-YOU',
  'thanks': 'THANK-YOU',
};

// Curated ISL dictionary containing handshape, movement, and orientation
export const ISL_DICTIONARY: Record<string, IslSign> = {
  'BALANCE': {
    gloss: 'BALANCE',
    category: 'banking',
    handshape: 'Open Flat Palms (B-hand)',
    location: 'Chest Level',
    movement: 'Both hands level, slight alternating weighing motion indicating balance equilibrium',
    description: 'Place both open flat palms face up in front of chest, rock slightly like balancing scales.',
    svgGesture: 'M4 12h16M12 4v16'
  },
  'MONEY': {
    gloss: 'MONEY',
    category: 'banking',
    handshape: 'Fingers Flat rubbing Thumb',
    location: 'Neutral Space in front of torso',
    movement: 'Thumb repeatedly rubs index and middle fingertips together',
    description: 'Hold dominant hand in front, rub thumb pad over index and middle fingers in circular motion.',
    svgGesture: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'
  },
  'CARD': {
    gloss: 'CARD',
    category: 'banking',
    handshape: 'L-shape with index and thumb',
    location: 'Neutral Space',
    movement: 'Index fingers and thumbs trace rectangular card perimeter in air',
    description: 'Trace the outline of a rectangular payment card using both index fingers and thumbs.',
    svgGesture: 'M3 5h18v14H3zM3 10h18'
  },
  'FREEZE': {
    gloss: 'FREEZE / LOCK',
    category: 'banking',
    handshape: 'Fist (S-hand)',
    location: 'Center Chest',
    movement: 'Firm sudden stop gesture, closed fist held rigidly stationary',
    description: 'Bring fist down firmly into open palm, stopping rigidly to signal lock/freeze status.',
    svgGesture: 'M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5z'
  },
  'PAY': {
    gloss: 'PAY / TRANSFER',
    category: 'banking',
    handshape: 'Open Palm towards recipient',
    location: 'Torso to Forward',
    movement: 'Dominant hand slides across non-dominant palm then sweeps forward',
    description: 'Slide dominant fingertips across flat non-dominant palm, pushing forward toward payee.',
    svgGesture: 'M5 12h14M12 5l7 7-7 7'
  },
  'SAVE': {
    gloss: 'SAVE / DEPOSIT',
    category: 'banking',
    handshape: 'Curved V-hand tapping flat fist',
    location: 'Neutral Space',
    movement: 'V-fingers tap against closed fist representing securing coins into vault',
    description: 'Tap two fingers of dominant hand gently against back of stationary closed fist.',
    svgGesture: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'
  },
  'SOS': {
    gloss: 'EMERGENCY / SOS',
    category: 'emergency',
    handshape: 'Open 5-hand waving rapidly',
    location: 'Shoulder to Head Level',
    movement: 'Urgent vertical pulsating wave with alert facial expression',
    description: 'Raise dominant hand with fingers splayed, shake wrist in quick urgent alert motions.',
    svgGesture: 'M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'
  },
  'HELP': {
    gloss: 'HELP',
    category: 'emergency',
    handshape: 'Thumbs-up (A-hand) resting on open palm',
    location: 'Chest Level upward',
    movement: 'Open flat non-dominant hand lifts dominant thumbs-up upward together',
    description: 'Rest dominant fist with thumb up onto flat non-dominant palm; lift both together toward person.',
    svgGesture: 'M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z'
  },
  'POLICE': {
    gloss: 'POLICE (112)',
    category: 'emergency',
    handshape: 'C-hand / Badge tap',
    location: 'Upper Left Chest',
    movement: 'Tap thumb and fingers to left chest twice indicating official badge',
    description: 'Tap curved thumb and index finger against left chest, denoting the police badge.',
    svgGesture: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
  },
  'SCHOLARSHIP': {
    gloss: 'SCHOLARSHIP / BENEFIT',
    category: 'benefits',
    handshape: 'Open hands cupped receiving',
    location: 'Neutral Space to Chest',
    movement: 'Both hands reach outward and draw inward toward heart in receiving posture',
    description: 'Cup both hands forward, draw them gently inward toward chest, expressing received educational grant.',
    svgGesture: 'M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c0 2 3 3 6 3s6-1 6-3v-5'
  },
  'LEARN': {
    gloss: 'LEARN / STUDY',
    category: 'benefits',
    handshape: 'Open hand grasping info from book to forehead',
    location: 'Non-dominant palm to Forehead',
    movement: 'Fingertips take from open non-dominant palm and tap against temple',
    description: 'Grasp with dominant fingertips from flat open palm and bring fingers to touch forehead.',
    svgGesture: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'
  },
  'STUDENT': {
    gloss: 'STUDENT',
    category: 'benefits',
    handshape: 'LEARN + AGENT compound sign',
    location: 'Forehead to Sides of Torso',
    movement: 'Sign LEARN then drop both flat palms down parallel indicating person',
    description: 'Execute LEARN sign followed immediately by both open palms moving down at sides (person marker).',
    svgGesture: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'
  },
  'SAFE': {
    gloss: 'SAFE / PROTECTED',
    category: 'emergency',
    handshape: 'S-hands crossed then uncrossing outwards',
    location: 'Chest Level',
    movement: 'Crossed wrists move outwards into strong defensive guard',
    description: 'Cross wrists in front of chest then swing outwards confidently, signaling all clear and protected.',
    svgGesture: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
  }
};

/**
 * Converts conversational text into Indian Sign Language (ISL) gloss tokens
 * and identifies mapped gestures according to 37OMKAR/text-to-signlanguage rules.
 */
export function textToIslGloss(inputText: string): {
  tokens: string[];
  glossSequence: string;
  matchingSigns: IslSign[];
} {
  const words = inputText
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);

  const rawGlosses: string[] = [];
  const matchingSigns: IslSign[] = [];
  const seenGlosses = new Set<string>();

  for (const word of words) {
    if (DROP_WORDS.has(word)) continue;

    const gloss = LEMMA_MAP[word] || word.toUpperCase();
    rawGlosses.push(gloss);

    if (ISL_DICTIONARY[gloss] && !seenGlosses.has(gloss)) {
      seenGlosses.add(gloss);
      matchingSigns.push(ISL_DICTIONARY[gloss]);
    }
  }

  // Fallback if no specific word matched dictionary
  if (matchingSigns.length === 0) {
    matchingSigns.push(ISL_DICTIONARY['BALANCE']);
    matchingSigns.push(ISL_DICTIONARY['MONEY']);
  }

  return {
    tokens: rawGlosses,
    glossSequence: rawGlosses.join(' + ') || 'GEN-YOUNG + SIGN',
    matchingSigns
  };
}
