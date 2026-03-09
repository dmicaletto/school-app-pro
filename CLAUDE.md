---
title: SchoolAppPro — Agenda Scolastica con Planner AI
description: PWA + Android app per studenti delle scuole superiori italiane. Task, orario, AI tutor Gemini.
version: "1.3.0"
tags: [react, firebase, capacitor, pwa, android, gemini, tailwind]
last_updated: 2026-03-07
related:
  - .claude/rules/01-firebase.md
  - .claude/rules/02-architettura.md
  - .claude/rules/03-dominio-scuola.md
---

# SchoolAppPro

## Descrizione

PWA + app Android per studenti delle scuole superiori italiane.
Funzionalità: gestione task settimanale, editor orario, AI tutor (Gemini), profilo studente.
Distribuita su GitHub Pages (web) e GitHub Actions (APK Android).

## Stack Tecnologico

| Layer | Tecnologia |
|---|---|
| Frontend | React 19 + Vite 7 |
| Styling | TailwindCSS 4 (dark mode: `class`) + Framer Motion |
| Icone | Lucide React |
| Grafici | Chart.js + react-chartjs-2 |
| Backend | Firebase Auth + Firestore |
| AI | Google Gemini 2.5 Flash |
| Mobile | Capacitor 8 (Android 8+) |
| Date | date-fns (locale: `it`) |
| CI/CD | GitHub Actions (deploy.yml + android.yml) |

## Struttura Progetto

```
src/
├── components/       # Componenti React (view + compositi)
├── contexts/         # ThemeContext, ToastContext
├── lib/              # firebase.js, gemini.js
├── utils/            # dateUtils.js
├── constants.js      # TIMETABLE default
├── main.jsx          # Entry + Providers
└── index.css         # Stili globali
.github/workflows/    # deploy.yml, android.yml
.claude/rules/        # Regole specifiche Claude
```

## Architettura

**Provider stack:** `ThemeProvider` → `ToastProvider` → `App`

**App.jsx** gestisce:
- Auth state (`onAuthStateChanged`)
- Routing tab: `home` | `planner` | `ai` | `profile`

### View principali

| Tab | Componente | Funzione |
|---|---|---|
| `home` | `WeekGrid` + `DayColumn` | Vista settimanale task |
| `planner` | `PlannerView` | Agenda verifiche + editor orario |
| `ai` | `ChatView` | AI tutor Gemini |
| `profile` | `ProfileView` | Profilo studente + impostazioni |

### Struttura Firestore

```
artifacts/school-app-id/
├── public/config/secrets        → { gemini_key }
└── users/{uid}/
    ├── data/student_info        → { name, surname, age, school, classRoom, gender }
    ├── data/timetable           → { lun:[...], mar:[...], ... }
    └── tasks/{taskId}           → { type, subject, description, dueDate, time, completed, createdAt }
```

**App ID:** `school-app-id` (hardcoded in `src/lib/firebase.js`)

## Firebase

### Variabili d'ambiente (`.env` locale — non committare mai)

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

Gli stessi valori vanno come **GitHub Secrets** per il deploy CI/CD e la build Android.

## Note di Sicurezza

- Firebase web config è **pubblica per design**: la sicurezza è delegata alle Firestore Security Rules.
- La Gemini API key NON è nel codice: viene letta da Firestore a runtime (`artifacts/.../secrets`).
- L'accesso admin (MCP, service account) richiede credenziali separate dalla web API key.
- `.mcp.json` è in `.gitignore` — NON va committato mai.
- `.env` è in `.gitignore` — NON va committato mai.

## Comandi di Sviluppo

```bash
npm run dev        # Dev server locale (http://localhost:5173)
npm run build      # Build produzione → ./dist
npm run preview    # Preview build produzione
npm run lint       # ESLint (flat config, React Hooks)
```

## Versionamento

- `package.json` → `"version"` aggiornata manualmente
- Tag git `vX.Y.Z` triggerano build Android con versionCode automatico (da `github.run_number`)
- Semantic versioning: MAJOR.MINOR.PATCH
