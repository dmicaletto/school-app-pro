import React, { useState } from 'react';
import { Mail, Lock, Loader2, GraduationCap } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function AuthScreen() {
    const [mode, setMode] = useState('login'); // 'login' or 'register'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (mode === 'login') {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (err) {
            console.error(err);
            switch (err.code) {
                case 'auth/invalid-email': setError('Email non valida.'); break;
                case 'auth/user-not-found': setError('Utente non trovato.'); break;
                case 'auth/wrong-password': setError('Password errata.'); break;
                case 'auth/email-already-in-use': setError('Email già registrata.'); break;
                case 'auth/weak-password': setError('Password troppo debole (min 6 caratteri).'); break;
                default: setError('Errore di autenticazione: ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-blue-600 flex flex-col justify-center p-6 text-white relative overflow-hidden font-sans">
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
                <div className="absolute top-1/2 -right-24 w-80 h-80 bg-cyan-500 rounded-full opacity-30 blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-md mx-auto w-full">
                <div className="mb-10 text-center">
                    <div className="bg-white w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3 transform transition-transform hover:rotate-6">
                        <GraduationCap className="text-blue-600" size={48} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-2">SchoolApp</h1>
                    <p className="text-blue-100 text-lg font-medium">Il tuo compagno di studi intelligente</p>
                </div>

                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 text-gray-800 shadow-2xl border border-white/50">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        {mode === 'login' ? 'Bentornato a Scuola' : 'Crea il tuo Profilo'}
                    </h2>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100 font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                            <span className="text-lg">⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleAuth} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
                            <input
                                type="email"
                                placeholder="Email dello studente"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full pl-12 p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-gray-700 placeholder-gray-400"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
                            <input
                                type="password"
                                placeholder="Password segreta"
                                required
                                minLength={6}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full pl-12 p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-gray-700 placeholder-gray-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all flex justify-center shadow-lg shadow-blue-600/30 mt-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (mode === 'login' ? 'Accedi' : 'Inizia Ora')}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500 font-medium">
                        {mode === 'login' ? "Non hai ancora un diario digitale? " : "Hai già un account? "}
                        <button
                            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
                            className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors"
                        >
                            {mode === 'login' ? "Registrati" : "Accedi"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
