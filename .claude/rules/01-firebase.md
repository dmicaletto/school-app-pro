---
title: Regole Firebase — SchoolAppPro
description: Regole operative per interagire con Firebase Firestore e Auth in questo progetto.
version: "1.0.0"
last_updated: 2026-03-07
---

# Regole Firebase

## Sicurezza

- **MAI** scrivere credenziali Firebase nel codice sorgente.
- **MAI** committare `.env` o `.mcp.json`.
- Le variabili `VITE_FIREBASE_*` sono in `.env` locale e in GitHub Secrets per CI/CD.
- La Gemini API key è in Firestore (`artifacts/school-app-id/public/config/secrets`), NON nel codice.

## App ID

L'app ID è hardcoded in `src/lib/firebase.js`:

```javascript
export const appId = 'school-app-id';
```

Usa sempre questa costante per costruire i path Firestore. Non duplicare la stringa.

## Struttura Path Firestore

Usa sempre questi path canonici:

```
// Chiave Gemini (pubblica, read-only per tutti gli utenti autenticati)
artifacts/school-app-id/public/config/secrets

// Profilo studente
artifacts/school-app-id/users/{uid}/data/student_info

// Orario scolastico
artifacts/school-app-id/users/{uid}/data/timetable

// Task (collezione)
artifacts/school-app-id/users/{uid}/tasks/{taskId}
```

## Operazioni Consentite

- **Read** (onSnapshot, getDoc, getDocs): sempre consentite per sviluppo.
- **Write** (addDoc, updateDoc, setDoc): proponi prima la struttura del documento, poi implementa.
- **Delete** (deleteDoc): proponi sempre prima di implementare. Verifica se è soft-delete o hard-delete.
- **Regole Firestore**: qualsiasi modifica alle Security Rules va discussa e approvata prima.

## Realtime Listeners

- Usa `onSnapshot` per dati che cambiano in tempo reale (task, timetable).
- Usa `getDoc` per dati statici o caricati una sola volta (student_info, secrets).
- **Unsubscribe obbligatorio**: ogni listener va pulito nell'`useEffect` cleanup.

```javascript
// Pattern corretto
useEffect(() => {
  const unsub = onSnapshot(ref, (snap) => { /* ... */ });
  return () => unsub();
}, [userId]);
```

## Autenticazione

- Provider: **email/password** (`signInWithEmailAndPassword`, `createUserWithEmailAndPassword`).
- Il listener `onAuthStateChanged` è in `App.jsx` — non replicarlo altrove.
- Dopo logout (`signOut`), resetta sempre lo stato locale dell'applicazione.
- I messaggi di errore Firebase vanno tradotti in italiano (già gestito in `AuthScreen.jsx`).

## MCP Firebase

Il server MCP Firebase (`firebase-tools experimental:mcp`) è configurato in `.mcp.json`.
Usarlo solo per ispezione/debug in locale. Non automatizzare operazioni distruttive via MCP.
