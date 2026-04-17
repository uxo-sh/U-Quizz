# U-Quizz

FROMSOFTWARE QUIZ APP — React Native + Expo — Phase 1: Frontend Scaffold

Project initialization
Create a new Expo project using the latest SDK with TypeScript template:
npx create-expo-app@latest fromsoftware-quiz --template blank-typescript
Use Expo Router (file-based routing) for navigation. Install and configure it from the start.

Tech stack

React Native + Expo SDK (latest)
Expo Router v3+ for navigation
TypeScript (strict mode)
NativeWind v4 (Tailwind for React Native) for styling
Expo Linear Gradient for atmospheric UI accents
React Native Reanimated for animations
React Native Safe Area Context
No backend, no API calls, no auth — static mock data only


Folder structure to generate
app/
  _layout.tsx              ← Root layout (Expo Router)
  index.tsx                ← Home / landing screen
  (quiz)/
    _layout.tsx
    select.tsx             ← Game & difficulty selection
    question.tsx           ← Active question screen
    result.tsx             ← End of run result screen
  leaderboard.tsx          ← Static leaderboard screen
  daily.tsx                ← Daily challenge screen (static)

components/
  ui/
    Button.tsx             ← Reusable dark-themed button
    Badge.tsx              ← Difficulty / category badge
    ProgressBar.tsx        ← Question progress indicator
    EstusBar.tsx           ← Lives display (3 flask icons)
    TimerRing.tsx          ← Circular countdown per question
    FogGateTransition.tsx  ← Animated screen transition overlay
  screens/
    HomeScreen.tsx
    SelectScreen.tsx
    QuestionScreen.tsx
    ResultScreen.tsx
    LeaderboardScreen.tsx

constants/
  mockData.ts              ← All static quiz questions (min. 20)
  theme.ts                 ← Colors, font sizes, spacing tokens
  games.ts                 ← Game list with metadata

hooks/
  useTimer.ts              ← Countdown logic hook
  useQuizState.ts          ← Local quiz state (no persistence yet)

assets/
  fonts/                   ← Include a gothic/medieval serif font (e.g. Cinzel via Google Fonts)
  images/                  ← Placeholder boss silhouette images

Screens to build — UI only, no deep logic
1. Home screen (index.tsx)

Full-screen dark background (#0D0B07)
Centered FromSoftware-style logo text: "ASHEN QUIZ" in Cinzel font
Glowing ember animated subtitle: "Seek wisdom, or be Hollowed"
Three buttons: Start Quiz / Daily Challenge / Leaderboard
Subtle looping particle/ember animation in background (use Reanimated)

2. Game & difficulty select screen (select.tsx)

Horizontal scrollable row of game cards: Dark Souls I, II, III — Bloodborne — Sekiro — Elden Ring — Demon's Souls — All Games
Each card shows: game name, a colored accent border, short tagline
Below: three difficulty buttons styled as tombstones or runestones: Hollowed / Undead / True Lord
Confirm button at the bottom → navigates to question screen

3. Question screen (question.tsx)

Top bar: EstusBar (3 flasks) left + TimerRing right + question counter center
ProgressBar below the top bar
Question text in large serif font, centered
4 answer option buttons stacked, each with a letter prefix (A B C D)
On answer tap: flash green (correct) or red (wrong) — no logic, just visual mock
"YOU DIED" overlay component (hidden by default, triggerable via dev button)

4. Result screen (result.tsx)

Shows: score out of 10, souls collected (XP), accuracy %
Three performance messages based on score range (hardcoded for now):

0–3: "You were Hollowed"
4–7: "Ashen One"
8–10: "Heir to the Fire"


Bonfire animation (looping SVG or Lottie if available)
Two buttons: Play Again / Back to Home

5. Leaderboard screen (leaderboard.tsx)

Static list of 10 mock players
Each row: rank number, player name, game category, souls score
Top 3 rows highlighted with amber/gold tint
Header: "Hall of Lords"

6. Daily challenge screen (daily.tsx)

Shows a "locked/unlocked" card per day of the week (7 cards)
Today's card is highlighted and tappable → goes to question screen
Streak counter at the top: "🔥 3 day streak"


Mock data (constants/mockData.ts)
Generate at least 20 questions in this shape:
tsexport type Question = {
  id: string;
  game: 'dark-souls-1' | 'dark-souls-2' | 'dark-souls-3' | 'bloodborne' | 'sekiro' | 'elden-ring' | 'demons-souls';
  difficulty: 'hollowed' | 'undead' | 'true-lord';
  type: 'multiple-choice' | 'true-false' | 'item-description';
  question: string;
  options: string[];
  correctIndex: number;
  loreExplainer: string;
};

Theme (constants/theme.ts)
tsexport const colors = {
  background: '#0D0B07',
  surface: '#1A1713',
  border: '#3D3020',
  accent: '#C8860A',       // ember amber
  accentSoft: '#7A4F10',
  textPrimary: '#E8DCC8',
  textSecondary: '#8C7B5E',
  danger: '#8B1A1A',
  success: '#1A4D2E',
  hollowed: '#4A7C7C',     // teal-ish
  undead: '#7A4F10',       // amber
  trueLord: '#6B1A1A',     // deep red
};

export const fonts = {
  serif: 'Cinzel',
  sans: 'System',
};

Key UI behaviors to implement (frontend only)

Fog gate transition: when navigating between screens, a dark overlay fades in then out
Timer ring: animates from full to empty over 30 seconds using Reanimated, resets on each question (mock only, no forfeit logic)
Estus flasks: 3 flask icons, tapping a "lose life" dev button empties one (visual only)
Answer flash: tapping any answer button triggers a 500ms color flash (green or red randomly for now)
"YOU DIED" overlay: a fullscreen red-tinted overlay with the text in Cinzel, fade in/out animation


Do NOT implement in this phase

No real answer checking logic
No score calculation
No timer forfeit
No data persistence or AsyncStorage
No backend or Supabase
No authentication
No sound playback
No real leaderboard data fetching


Deliverable
A fully runnable expo start project where all screens are navigable, all UI components are rendered with correct theming, and the visual identity matches a dark, gothic FromSoftware aesthetic. Every screen should be presentable as a design mock.