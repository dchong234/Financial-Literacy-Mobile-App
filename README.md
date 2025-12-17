# Financial Literacy Mobile App

A lightweight Expo + React Native prototype focused on helping adults with low financial literacy onboard, track expenses, learn basics, and get AI-guided suggestions.

## Getting started

1) Install dependencies
```
npm install
```

2) Run the Expo dev server
```
npm run start
```
- Launch on a simulator or device from the Expo Dev Tools (`i` for iOS simulator, `a` for Android emulator).

## Project structure (initial)
- `App.tsx` – app entry, wraps navigation.
- `src/navigation/` – stack + tab navigators and route types.
- `src/screens/` – placeholder screens (Onboarding, Dashboard, Expenses, Education, Advisor).
- `src/theme/` – shared design tokens (colors).

## Scripts
- `npm run start` – start Metro/Expo.
- `npm run android` – start and open Android.
- `npm run ios` – start and open iOS.
- `npm run web` – start web preview.
- `npm run lint` – run ESLint.

## Next steps
- Flesh out onboarding form fields (income range, risk preference, goals).
- Add state management and local storage (AsyncStorage) for expenses.
- Implement mock advisor service behind a pluggable interface.
- Add charts and basic breakdowns on the dashboard.