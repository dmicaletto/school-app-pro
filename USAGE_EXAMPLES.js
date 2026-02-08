/**
 * 🎨 School App v2 - UX Features Usage Examples
 * 
 * Questo file contiene esempi pratici di come utilizzare
 * le nuove funzionalità UX implementate nell'app.
 */

// ============================================
// 1. 🌙 DARK MODE
// ============================================

import { useTheme } from './contexts/ThemeContext';

function MyComponent() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div>
            {/* Mostra stato corrente */}
            <p>Tema corrente: {isDark ? 'Scuro' : 'Chiaro'}</p>

            {/* Toggle button */}
            <button onClick={toggleTheme}>
                {isDark ? '☀️ Modalità Chiara' : '🌙 Modalità Scura'}
            </button>

            {/* Componente con dark mode */}
            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200">
                Questo testo si adatta automaticamente al tema
            </div>
        </div>
    );
}

// ============================================
// 2. 🔔 TOAST NOTIFICATIONS
// ============================================

import { useToast } from './contexts/ToastContext';

function FormComponent() {
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Simula operazione
            await saveData();

            // ✅ Success toast
            toast.success('Dati salvati con successo!');

        } catch (error) {
            // ❌ Error toast
            toast.error('Errore durante il salvataggio');
        }
    };

    const handleWarning = () => {
        // ⚠️ Warning toast
        toast.warning('Attenzione: alcuni campi sono vuoti');
    };

    const handleInfo = () => {
        // ℹ️ Info toast
        toast.info('Ricorda di salvare le modifiche');
    };

    // Toast con durata personalizzata (default: 4000ms)
    const handleCustomDuration = () => {
        toast.success('Questo scompare dopo 2 secondi', 2000);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <button type="submit">Salva</button>
        </form>
    );
}

// ============================================
// 3. ⚡ SKELETON LOADERS
// ============================================

import {
    SkeletonWeekGrid,
    SkeletonLoader,
    SkeletonTaskCard,
    SkeletonDayColumn
} from './components/SkeletonLoader';

function DataComponent() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        loadData().then(data => {
            setData(data);
            setLoading(false);
        });
    }, []);

    // Esempio 1: Skeleton per griglia settimanale
    if (loading) {
        return <SkeletonWeekGrid />;
    }

    return <WeekGrid data={data} />;
}

function TaskListComponent() {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    // Esempio 2: Skeleton per lista compiti
    if (loading) {
        return <SkeletonLoader type="task" count={5} />;
    }

    return (
        <div>
            {tasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
    );
}

function AgendaComponent() {
    const [loading, setLoading] = useState(true);

    // Esempio 3: Skeleton per agenda
    if (loading) {
        return <SkeletonLoader type="agenda" count={3} />;
    }

    return <AgendaView />;
}

// ============================================
// 4. ✨ ANIMAZIONI CUSTOM
// ============================================

function AnimatedComponent() {
    return (
        <div>
            {/* Fade in */}
            <div className="animate-fade-in">
                Questo elemento appare con fade
            </div>

            {/* Slide up */}
            <div className="animate-slide-up">
                Questo elemento sale dal basso
            </div>

            {/* Slide down */}
            <div className="animate-slide-down">
                Questo elemento scende dall'alto
            </div>

            {/* Scale in */}
            <div className="animate-scale-in">
                Questo elemento si ingrandisce
            </div>

            {/* Transizioni smooth */}
            <button className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200">
                Hover per vedere la transizione
            </button>

            {/* Active state con scale */}
            <button className="active:scale-95 transition-transform">
                Click per vedere lo scale
            </button>
        </div>
    );
}

// ============================================
// 5. 🎨 PATTERN COMPLETO: Form con tutte le features
// ============================================

import { useState } from 'react';
import { useTheme } from './contexts/ThemeContext';
import { useToast } from './contexts/ToastContext';
import { SkeletonLoader } from './components/SkeletonLoader';

function CompleteFormExample() {
    const { isDark } = useTheme();
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validazione
        if (!formData.name || !formData.email) {
            toast.warning('Compila tutti i campi obbligatori');
            return;
        }

        setLoading(true);

        try {
            await saveFormData(formData);
            toast.success('Dati salvati con successo!');
            setFormData({ name: '', email: '' });
        } catch (error) {
            toast.error('Errore durante il salvataggio');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <SkeletonLoader type="card" count={1} />;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Form di Esempio
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nome */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Nome
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Inserisci il tuo nome"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="email@esempio.com"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 dark:bg-blue-500 text-white font-bold py-3 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Salvataggio...' : 'Salva'}
                </button>
            </form>

            {/* Info toast button */}
            <button
                onClick={() => toast.info('Questo è un messaggio informativo')}
                className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
                Mostra info
            </button>
        </div>
    );
}

// ============================================
// 6. 🎯 BEST PRACTICES
// ============================================

/**
 * ✅ DO's
 */

// 1. Usa sempre transition-colors per smooth theme switching
<div className="bg-white dark:bg-gray-800 transition-colors duration-200">

// 2. Fornisci feedback immediato con toast
    toast.success('Operazione completata!');

    // 3. Usa skeleton loaders per caricamenti
    if (loading) return <SkeletonLoader type="card" />;

    // 4. Aggiungi hover states per interattività
    <button className="hover:bg-blue-600 transition-colors">

// 5. Usa active:scale per feedback tattile
        <button className="active:scale-95 transition-transform">

/**
            * ❌ DON'T's
            */

// 1. Non usare alert() - usa toast
// ❌ alert('Salvato!');
// ✅ toast.success('Salvato!');

// 2. Non dimenticare le classi dark:
// ❌ <div className="bg-white text-gray-900">
// ✅ <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">

// 3. Non usare spinner generici - usa skeleton
// ❌ if (loading) return <Spinner />;
// ✅ if (loading) return <SkeletonWeekGrid />;

// 4. Non dimenticare transition per smooth UX
// ❌ <div className="bg-blue-500 hover:bg-blue-600">
// ✅ <div className="bg-blue-500 hover:bg-blue-600 transition-colors">

// ============================================
                            // 7. 🎨 COLOR PALETTE REFERENCE
                            // ============================================

                            const colorPalette = {
                                light: {
                                background: 'bg-gray-50',
                            card: 'bg-white',
                            input: 'bg-gray-50',
                            text: {
                                primary: 'text-gray-900',
                            secondary: 'text-gray-700',
                            tertiary: 'text-gray-500'
        },
                            border: 'border-gray-200'
    },
                            dark: {
                                background: 'dark:bg-gray-900',
                            card: 'dark:bg-gray-800',
                            input: 'dark:bg-gray-700',
                            text: {
                                primary: 'dark:text-gray-100',
                            secondary: 'dark:text-gray-300',
                            tertiary: 'dark:text-gray-400'
        },
                            border: 'dark:border-gray-700'
    },
                            accent: {
                                primary: 'bg-blue-600 dark:bg-blue-500',
                            success: 'bg-green-500 dark:bg-green-600',
                            error: 'bg-red-500 dark:bg-red-600',
                            warning: 'bg-yellow-500 dark:bg-yellow-600',
                            info: 'bg-blue-500 dark:bg-blue-600'
    }
};

                            // ============================================
                            // 8. 📱 RESPONSIVE PATTERNS
                            // ============================================

                            function ResponsiveComponent() {
    return (
                            <div className="
            bg-white dark:bg-gray-800
            p-4 sm:p-6 md:p-8
            rounded-xl sm:rounded-2xl
            transition-colors duration-200
        ">
                                <h1 className="
                text-xl sm:text-2xl md:text-3xl
                font-bold
                text-gray-900 dark:text-gray-100
            ">
                                    Titolo Responsive
                                </h1>
                            </div>
                            );
}

                            export {
                                MyComponent,
                                FormComponent,
                                DataComponent,
                                AnimatedComponent,
                                CompleteFormExample,
                                ResponsiveComponent
                            };
