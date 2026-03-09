---
title: Regole Architettura — SchoolAppPro
description: Convenzioni React, componenti, styling e pattern da seguire nel progetto.
version: "1.0.0"
last_updated: 2026-03-07
---

# Regole Architettura

## Regole Generali Claude

- **NO commit automatici**: l'utente gestisce autonomamente tutte le operazioni git.
- **NO push, NO force-push**: mai, in nessun caso.
- **Ogni decisione di implementazione**: proponi prima (cosa fare e perché), implementa solo dopo approvazione esplicita.
- **Modifiche chirurgiche**: modifica solo le righe strettamente necessarie al task. Nessuna riformattazione automatica.
- **Nessun refactoring non richiesto**: non "migliorare" codice circostante, non aggiungere docstring o commenti non richiesti.

## Lingua

- **Business logic e UI copy**: italiano (etichette, messaggi toast, placeholder, testi AI).
- **Termini tecnici**: inglese (variabili, funzioni, prop names, commenti tecnici).
- **Info non verificate**: marcare con `_(da verificare)_`.
- **Documenti pianificati**: marcare con `_(da creare)_`.

## Struttura Componenti

### Gerarchia View

```
App.jsx          ← router tab + auth check
├── AuthScreen   ← standalone, solo se non autenticato
├── WeekGrid     ← tab "home", dipende da DayColumn, TaskCard, TaskModal
├── PlannerView  ← tab "planner", include TimeTableEditor
├── ChatView     ← tab "ai", standalone
└── ProfileView  ← tab "profile", standalone
```

### Regole di Composizione

- I componenti View (tab-level) ricevono almeno `userId` come prop.
- I componenti compositi (TaskCard, DayColumn, ecc.) non accedono direttamente a Firestore: ricevono i dati via props.
- Solo i componenti View fanno fetch/listener Firestore.
- Non creare nuovi Context senza approvazione: valuta prima se basta prop drilling o state locale.

### Naming

| Tipo | Convenzione | Esempio |
|---|---|---|
| Componenti | PascalCase | `TaskModal`, `DayColumn` |
| File componenti | PascalCase + `.jsx` | `TaskModal.jsx` |
| Hook custom | camelCase con `use` | `useTheme`, `useToast` |
| Funzioni handler | `handle` + azione | `handleSave`, `handleDelete` |
| Variabili state | camelCase | `isLoading`, `taskList` |
| Costanti | UPPER_SNAKE_CASE | `TIMETABLE`, `APP_ID` |

## Styling

- **Framework:** TailwindCSS 4 — usa classi utility, non CSS custom salvo casi eccezionali.
- **Dark mode:** strategia `class` — usa sempre classi in coppia: `bg-white dark:bg-gray-900`.
- **Colori:** usa la palette definita in `DARK_MODE_GUIDE.md` — non inventare nuovi colori.
- **Animazioni TailwindCSS:** usa le keyframe custom definite in `tailwind.config.js` (`animate-fade-in`, `animate-slide-up`, `animate-slide-down`, `animate-scale-in`).
- **Animazioni Framer Motion:** solo per toast, modal e transizioni di pagina. Non usarla per micro-interazioni semplici.
- **Utility merge:** usa `clsx` + `tailwind-merge` per classi condizionali.

```javascript
// Pattern corretto
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
const cn = (...inputs) => twMerge(clsx(inputs));
```

## Context

| Context | Hook | Fornisce |
|---|---|---|
| `ThemeContext` | `useTheme()` | `{ isDark, toggleTheme }` |
| `ToastContext` | `useToast()` | `{ success(), error(), warning(), info() }` |

- Importa sempre via hook, mai da `useContext` diretto.
- Non accedere al Context fuori dai componenti React.

## Icone

- Usa esclusivamente **Lucide React**. Non aggiungere altre librerie di icone.
- Import tree-shakable: `import { CalendarDays, BookOpen } from 'lucide-react'`.

## Date

- Usa **date-fns** per tutte le manipolazioni di date. Non usare `moment.js` o operazioni manuali su Date.
- Locale italiana: importa e usa `{ it }` da `date-fns/locale`.
- Formato storage Firestore: `yyyy-MM-dd` (stringa ISO, senza orario).
- Formato display: usa le funzioni di `src/utils/dateUtils.js`.

## Performance

- Usa `useCallback` e `useMemo` solo quando necessario e motivato, non preventivamente.
- I listener `onSnapshot` vanno sempre unsubscribed nel cleanup dell'`useEffect`.
- Evita re-render inutili: non passare oggetti/array inline come props.

## ESLint

- Config: flat config ESLint 9 (`eslint.config.js`).
- Plugins attivi: `react-hooks`, `react-refresh`.
- Componenti React non usati in JSX non sono segnalati (`varsIgnorePattern`).
- Prima di ogni PR/commit: `npm run lint` — risolvere tutti i warning.
