# 🎓 School App v2

Un'applicazione moderna per la gestione scolastica con supporto completo per dark mode, notifiche toast e animazioni fluide.

## ✨ Funzionalità Principali

### 📅 Gestione Settimanale
- Vista settimanale interattiva con scroll automatico al giorno corrente
- Aggiunta e modifica di compiti, verifiche e impegni
- Visualizzazione dell'orario scolastico per ogni giorno

### 🗓️ Agenda & Pianificazione
- Vista delle prossime verifiche con evidenziazione visiva
- Gestione impegni e scadenze
- Editor personalizzabile dell'orario delle lezioni

### 🎨 Design & UX Migliorati
- **🌙 Dark Mode**: Tema scuro completo con toggle nel profilo
- **🔔 Toast Notifications**: Notifiche moderne e animate per feedback immediato
- **⚡ Skeleton Loaders**: Caricamenti fluidi con placeholder animati
- **✨ Animazioni**: Transizioni smooth con Framer Motion

### 💬 AI Tutor
- Assistente AI integrato per aiuto con i compiti
- Chat interattiva

### 👤 Profilo Utente
- Gestione dati personali e scolastici
- Toggle dark mode
- Logout sicuro

## 🛠️ Stack Tecnologico

- **Frontend**: React 19 + Vite
- **Styling**: TailwindCSS 4 con dark mode
- **Database**: Firebase Firestore
- **Autenticazione**: Firebase Auth
- **Animazioni**: Framer Motion
- **Icone**: Lucide React
- **Grafici**: Chart.js
- **Mobile**: Capacitor (Android/iOS)

## 🚀 Installazione

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build
```

## 🎨 Nuove Funzionalità UX

### Dark Mode
Il dark mode è completamente integrato in tutta l'applicazione:
- Toggle nel profilo utente
- Persistenza della preferenza in localStorage
- Rilevamento automatico delle preferenze di sistema
- Transizioni fluide tra i temi

### Toast Notifications
Sistema di notifiche moderne con 4 tipi:
- ✅ **Success**: Operazioni completate con successo
- ❌ **Error**: Errori e problemi
- ⚠️ **Warning**: Avvisi importanti
- ℹ️ **Info**: Informazioni generali

Utilizzo:
```javascript
import { useToast } from './contexts/ToastContext';

const toast = useToast();
toast.success('Operazione completata!');
toast.error('Si è verificato un errore');
toast.warning('Attenzione!');
toast.info('Informazione importante');
```

### Skeleton Loaders
Componenti di caricamento per una UX migliore:
- `SkeletonWeekGrid`: Griglia settimanale
- `SkeletonTaskCard`: Card compiti
- `SkeletonDayColumn`: Colonna giornaliera
- `SkeletonAgendaItem`: Elementi agenda

## 📁 Struttura Progetto

```
src/
├── components/          # Componenti React
│   ├── App.jsx
│   ├── AuthScreen.jsx
│   ├── BottomNav.jsx
│   ├── ChatView.jsx
│   ├── DayColumn.jsx
│   ├── PlannerView.jsx
│   ├── ProfileView.jsx
│   ├── SkeletonLoader.jsx  # 🆕 Skeleton loaders
│   ├── TaskCard.jsx
│   ├── TaskModal.jsx
│   ├── TimeTableEditor.jsx
│   └── WeekGrid.jsx
├── contexts/            # 🆕 Context providers
│   ├── ThemeContext.jsx    # Dark mode management
│   └── ToastContext.jsx    # Toast notifications
├── lib/                 # Firebase config
├── utils/               # Utility functions
└── constants.js         # Costanti app
```

## 🎯 Prossimi Sviluppi

- [ ] Dashboard statistiche con grafici
- [ ] Sistema di notifiche push
- [ ] Calendario mensile
- [ ] Priorità e filtri avanzati
- [ ] Modalità offline (PWA)
- [ ] Export/import dati
- [ ] Condivisione compiti
- [ ] Integrazione calendario Google

## 📝 Configurazione Firebase

Crea un file `.env` nella root del progetto:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🎨 Personalizzazione Tema

Il tema può essere personalizzato modificando `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      // Aggiungi i tuoi colori personalizzati
    },
    animation: {
      // Aggiungi animazioni custom
    }
  }
}
```

## 📱 Build Mobile

```bash
# Aggiungi piattaforma Android
npx cap add android

# Aggiungi piattaforma iOS
npx cap add ios

# Sincronizza il codice
npx cap sync

# Apri in Android Studio
npx cap open android

# Apri in Xcode
npx cap open ios
```

## 🤝 Contribuire

Contributi, issues e feature requests sono benvenuti!

## 📄 Licenza

Questo progetto è privato.

---

**Sviluppato con ❤️ per studenti**
