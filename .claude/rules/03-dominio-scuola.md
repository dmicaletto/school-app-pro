---
title: Regole Dominio Scolastico — SchoolAppPro
description: Terminologia, tipi di dati e convenzioni del dominio applicativo.
version: "1.0.0"
last_updated: 2026-03-07
---

# Regole Dominio Scolastico

## Terminologia

| ✅ Corretto | ❌ Evitare |
|---|---|
| `compito` o `homework` | "tarea", "assignment" |
| `verifica` o `exam` | "test", "esame" (nel codice) |
| `impegno` o `commitment` | "evento", "appuntamento" |
| `orario` o `timetable` | "schedule", "lezioni" |
| `materia` o `subject` | "corso", "disciplina" |
| `studente` o `student` | "utente" (nel dominio scolastico) |

## Tipi di Task

Il campo `type` accetta esattamente tre valori:

| Valore | Etichetta UI | Colore suggerito |
|---|---|---|
| `homework` | Compito | Blu |
| `exam` | Verifica | Rosso/Arancio |
| `commitment` | Impegno | Verde/Viola |

Non aggiungere nuovi tipi senza approvazione: impatta filtraggio, colori e visualizzazione.

## Struttura Task (Firestore)

```javascript
{
  type: 'homework' | 'exam' | 'commitment',  // obbligatorio
  subject: string,          // materia (es. "Matematica")
  description: string,      // testo libero
  dueDate: 'yyyy-MM-dd',    // data scadenza (stringa ISO)
  time: string,             // orario opzionale (es. "09:00")
  completed: boolean,       // default: false
  createdAt: Timestamp      // Firebase server timestamp
}
```

## Profilo Studente (Firestore)

```javascript
{
  name: string,         // nome
  surname: string,      // cognome
  age: number,          // età
  school: string,       // nome istituto
  classRoom: string,    // classe (es. "3B", "5A Scientifico")
  gender: string        // genere (opzioni: _(da verificare)_)
}
```

## Orario Scolastico (Firestore)

```javascript
{
  lun: ['Materia1', 'Materia2', ...],  // Lunedì
  mar: [...],                           // Martedì
  mer: [...],                           // Mercoledì
  gio: [...],                           // Giovedì
  ven: [...],                           // Venerdì
  sab: [...],                           // Sabato (opzionale)
}
```

- Le chiavi dei giorni sono **abbreviazioni minuscole italiane** a 3 lettere.
- Ogni array contiene le materie in ordine di ora (prima ora = indice 0).
- Il sabato è opzionale: non assumere che sia sempre presente.
- Default hardcoded in `src/constants.js` → `TIMETABLE`.

## AI Tutor (Gemini)

- Modello: **Gemini 2.5 Flash** (`gemini-2.5-flash`)
- Persona: "SchoolBot" — simpatico, paziente, per studenti delle superiori italiane
- Lingua: **italiano**
- Linea guida pedagogica: non fornire soluzioni complete ai compiti, guidare verso la risposta
- API key: letta da Firestore a runtime, poi salvata in `localStorage` per la sessione
- Endpoint: `generativelanguage.googleapis.com`

## Giorni della Settimana

Quando costruisci logica su giorni:
- Usa `date-fns` con locale `it` per la visualizzazione
- Le chiavi Firestore sono sempre le abbreviazioni `lun|mar|mer|gio|ven|sab`
- La settimana inizia da **lunedì** (non domenica) — `startOfWeek(date, { weekStartsOn: 1 })`

## Materie Comuni

Materie predefinite nel timetable di default (da `constants.js`):

`Latino`, `Matematica`, `Inglese`, `Italiano`, `Motoria`, `Scienze`, `Arte`, `Religione`

Queste sono solo il default — ogni studente può avere materie diverse nel proprio timetable.

## Regole UI per il Dominio

- I task `exam` (verifiche) vanno evidenziati visivamente rispetto ai task ordinari.
- Le verifiche imminenti (entro 3 giorni) meritano badge/highlight urgente.
- La vista `PlannerView` mostra solo task futuri ordinati per `dueDate`.
- Il `WeekGrid` mostra i task del giorno corrente in evidenza rispetto agli altri giorni.
