# Original User Request

## 2026-09-08T05:54:07Z

Build an interactive, production-grade concept prototype web application for **Gen-Young** — India's digital, inclusive youth banking and benefits ecosystem (ages 15–25), translating the 50-page concept specification and UI design system into a responsive, mobile-first experience using React, Vite, and Tailwind CSS.

Working directory: d:/green yotuh/gen_young_app
Integrity mode: development

Reference Materials:
- Specification: `d:/green yotuh/GEN-YOUNG_50_Page_Concept_Paper.pdf`
- Design mockups and flows: `d:/green yotuh/ChatGPT Image Sep 8, 2026, *.png`

## Requirements

### R1. Banking Foundation & Main Experience Dashboard
- Implement a mobile-first dashboard cleanly separating core banking features from the benefits marketplace.
- Display a zero-minimum-balance youth savings account with simulated balance, virtual debit card controls, simulated UPI transactions, and target-based savings goals.
- Include persistent bottom navigation: Home, Benefits, Learn, Drops, Emergency SOS, and Profile.
- Provide a persona switcher (e.g., College Student 21 in Mumbai, High School Aspirant 16, Young Professional 24) that dynamically changes dashboard context, recommendations, and eligibility states.

### R2. Benefits Engine & Marketplace
- Build a categorized discovery hub: Government Schemes (myScheme integration, Central/State scholarships, PMJJBY/PMSBY), AI & Productivity (Google AI Plus student year, IndiaAI compute), Education & Certifications (SWAYAM/NPTEL, SATHEE), Career & Internships, Health & Wellness (PM-JAY, student telemedicine), and Lifestyle Offers.
- Each benefit card must clearly display: Provider name, customer cost (Free vs Subsidized vs Paid), eligibility explanation ("Why am I seeing this?"), verification date, and action triggers (Claim, Apply, Check Eligibility).
- Implement a Benefits Wallet with 4 distinct views: Available, Claimed, Active, and Expiring Soon.

### R3. Friday Drop Engagement Engine
- Create a dedicated Drops hub featuring limited-inventory benefits released at set schedules without chance or pay-to-win mechanics.
- Include a live real-time countdown timer (e.g., Friday 10:00 AM drop), inventory meter (e.g., out of 100,000 cinema tickets or meal vouchers), and simulated claim flow with instantaneous capacity decrements.
- Include a waitlist registration flow for exhausted drops and sneak-peek previews of upcoming drops with reminder notifications.

### R4. Emergency SOS & Women's Safety Hub
- Build an accessible, high-stress emergency response interface.
- Implement a 3-second press-and-hold SOS button triggering simulated 112 Emergency Response Support System integration with an audible countdown and false-alarm cancel mechanism.
- Display live simulated GPS coordinates (with accuracy level and manual location picker).
- Include emergency contact notification simulation (dispatching location and alerts to designated trusted contacts: Mom, Guardian, Best Friend).
- Provide local hazard & weather warnings (heatwave, heavy rain, cyclone alerts).

### R5. Financial Literacy & Skill Paths
- Interactive financial education track featuring bite-sized modules: "Budgeting Basics", "Saving for Your Goals", and "Smart Digital Banking".
- Include interactive 5-minute quizzes with score tracking, streak increments, and level progression (Level 1 to Level 3).
- Implement quests (e.g., "Build Your Career", "Go Green") requiring 3 discrete actions to unlock partner perks.

### R6. Green Gen-Young & Sustainability Passport
- Build a dedicated Green Future hub connecting young users to environmental learning and action.
- Green Passport tracking verified actions: paperless statements opted, climate quizzes passed, UN SDG Academy / UN CC:e-Learn courses explored.
- Award verifiable sustainability badges (e.g., "Climate Learner", "Circular Economy Explorer", "Digital First").

### R7. Universal Accessibility & Privacy Control Center
- Built-in text-to-speech (Web Speech API read-aloud) button on benefit cards and learning content.
- High-contrast mode toggle, text resizing options, and Indian Sign Language (ISL) video/visual aid mockups.
- "Privacy & Offers" control center allowing users to toggle location matching, partner personalization, and view data audit trails without third-party ad tracking or cold-call sharing.

## Acceptance Criteria

### Functional Execution
- [ ] Application builds and runs cleanly with `npm run dev` and `npm run build` without TypeScript or bundle errors.
- [ ] Persona switching immediately updates recommended offers, eligibility badges, and learning suggestions across the app.
- [ ] Benefits Marketplace allows filtering by category (All, Government, AI & Learning, Health, Lifestyle, Green) and search.
- [ ] Friday Drop countdown functions in real time, allows claiming an available drop, displays updated remaining stock, and offers waitlist enrollment when sold out.
- [ ] SOS module executes 3-second hold countdown with visual feedback, supports cancellation before timeout, and confirms simulated 112 / trusted contact dispatch.
- [ ] Quizzes can be completed interactively, updating streak counter and user level.
- [ ] Green Passport accurately logs completed actions and displays earned badges.
- [ ] Accessibility panel functions: Read-aloud reads text via browser audio, high-contrast theme switches styling correctly.
