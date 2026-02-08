import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../contexts/ToastContext';
import { SkeletonLoader, SkeletonWeekGrid, SkeletonTaskCard } from './SkeletonLoader';
import { Moon, Sun, CheckCircle, XCircle, AlertTriangle, Info, Sparkles } from 'lucide-react';

/**
 * 🎨 UX Features Demo Component
 * 
 * Componente dimostrativo per testare tutte le nuove funzionalità UX:
 * - Dark Mode Toggle
 * - Toast Notifications (4 tipi)
 * - Skeleton Loaders
 * - Animazioni Custom
 */
export default function UXDemo() {
    const { isDark, toggleTheme } = useTheme();
    const toast = useToast();
    const [showSkeleton, setShowSkeleton] = useState(false);

    const handleToastDemo = (type) => {
        const messages = {
            success: 'Operazione completata con successo! 🎉',
            error: 'Si è verificato un errore. Riprova.',
            warning: 'Attenzione: questa azione richiede conferma.',
            info: 'Informazione: ricorda di salvare le modifiche.'
        };
        toast[type](messages[type]);
    };

    const handleSkeletonDemo = () => {
        setShowSkeleton(true);
        setTimeout(() => setShowSkeleton(false), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center mb-8 animate-fade-in">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Sparkles className="text-blue-500 dark:text-blue-400" size={32} />
                    <h1 className="text-4xl font-black text-gray-900 dark:text-gray-100">
                        UX Features Demo
                    </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    Testa tutte le nuove funzionalità di Design & UX
                </p>
            </div>

            {/* Dark Mode Section */}
            <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200 animate-slide-up">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    {isDark ? <Moon size={24} /> : <Sun size={24} />}
                    Dark Mode
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Tema corrente: <span className="font-bold">{isDark ? 'Scuro 🌙' : 'Chiaro ☀️'}</span>
                </p>
                <button
                    onClick={toggleTheme}
                    className={`
                        px-6 py-3 rounded-xl font-bold transition-all
                        ${isDark
                            ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        }
                        active:scale-95
                    `}
                >
                    {isDark ? '☀️ Passa a Tema Chiaro' : '🌙 Passa a Tema Scuro'}
                </button>
            </section>

            {/* Toast Notifications Section */}
            <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200 animate-slide-up" style={{ animationDelay: '100ms' }}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    🔔 Toast Notifications
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Clicca sui pulsanti per vedere i diversi tipi di notifiche
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                        onClick={() => handleToastDemo('success')}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors font-bold"
                    >
                        <CheckCircle size={20} />
                        Success
                    </button>
                    <button
                        onClick={() => handleToastDemo('error')}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-bold"
                    >
                        <XCircle size={20} />
                        Error
                    </button>
                    <button
                        onClick={() => handleToastDemo('warning')}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-xl hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors font-bold"
                    >
                        <AlertTriangle size={20} />
                        Warning
                    </button>
                    <button
                        onClick={() => handleToastDemo('info')}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-bold"
                    >
                        <Info size={20} />
                        Info
                    </button>
                </div>
            </section>

            {/* Skeleton Loaders Section */}
            <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    ⚡ Skeleton Loaders
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Clicca per vedere i skeleton loaders in azione (3 secondi)
                </p>
                <button
                    onClick={handleSkeletonDemo}
                    disabled={showSkeleton}
                    className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-bold active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                    {showSkeleton ? 'Caricamento...' : 'Mostra Skeleton'}
                </button>

                {showSkeleton ? (
                    <div className="space-y-4">
                        <SkeletonTaskCard />
                        <SkeletonTaskCard />
                        <SkeletonTaskCard />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Task Card 1</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Contenuto della card di esempio</p>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Task Card 2</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Contenuto della card di esempio</p>
                        </div>
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800">
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Task Card 3</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Contenuto della card di esempio</p>
                        </div>
                    </div>
                )}
            </section>

            {/* Animations Section */}
            <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200 animate-slide-up" style={{ animationDelay: '300ms' }}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    ✨ Animazioni Custom
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Esempi di animazioni disponibili
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-4 rounded-xl text-white text-center font-bold animate-fade-in">
                        Fade In
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 p-4 rounded-xl text-white text-center font-bold animate-slide-up">
                        Slide Up
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 p-4 rounded-xl text-white text-center font-bold animate-slide-down">
                        Slide Down
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 p-4 rounded-xl text-white text-center font-bold animate-scale-in">
                        Scale In
                    </div>
                </div>
            </section>

            {/* Interactive Elements */}
            <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200 animate-slide-up" style={{ animationDelay: '400ms' }}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    🎯 Elementi Interattivi
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Hover e click per vedere le transizioni
                </p>
                <div className="space-y-3">
                    <button className="w-full px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-bold">
                        Hover per transizione colore
                    </button>
                    <button className="w-full px-6 py-3 bg-purple-600 dark:bg-purple-500 text-white rounded-xl hover:scale-105 transition-transform font-bold">
                        Hover per scale
                    </button>
                    <button className="w-full px-6 py-3 bg-green-600 dark:bg-green-500 text-white rounded-xl active:scale-95 transition-transform font-bold">
                        Click per feedback tattile
                    </button>
                </div>
            </section>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 animate-fade-in" style={{ animationDelay: '500ms' }}>
                <p>🎨 Tutte le funzionalità UX implementate con successo!</p>
                <p className="mt-2">Dark Mode • Toast Notifications • Skeleton Loaders • Animazioni</p>
            </div>
        </div>
    );
}
