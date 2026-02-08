import React, { useState, useEffect } from 'react';
import { UserCircle, School, GraduationCap, Save, Loader2, CheckCircle2, Moon, Sun, LogOut } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, appId, auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../contexts/ToastContext';

export default function ProfileView({ user }) {
    const { isDark, toggleTheme } = useTheme();
    const toast = useToast();

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        age: '',
        school: '',
        classRoom: '',
        gender: 'Femmina'
    });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Logout effettuato con successo!');
        } catch (error) {
            toast.error('Errore durante il logout');
        }
    };

    useEffect(() => {
        if (!user) return;
        const loadProfile = async () => {
            setLoading(true);
            try {
                const ref = doc(db, "artifacts", appId, "users", user.uid, "data", "student_info");
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    setFormData(snap.data());
                }
            } catch (e) {
                console.error("Error loading profile", e);
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSuccess(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!user) return;
        setSaving(true);
        try {
            const ref = doc(db, "artifacts", appId, "users", user.uid, "data", "student_info");
            await setDoc(ref, formData);
            setSuccess(true);
            toast.success('Profilo salvato con successo!');
            setTimeout(() => setSuccess(false), 3000);
        } catch (e) {
            console.error("Error saving profile", e);
            toast.error('Errore nel salvataggio del profilo!');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex h-full items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>;

    return (
        <div className="max-w-md mx-auto h-full overflow-y-auto pb-24">
            {/* Header Profile */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6 text-center relative overflow-hidden transition-colors duration-200">
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-10 dark:opacity-20"></div>
                <div className="relative z-10">
                    <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-full mx-auto mb-3 flex items-center justify-center border-4 border-white dark:border-gray-600 shadow-lg text-blue-500 dark:text-blue-400 transition-colors duration-200">
                        <UserCircle size={64} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        {formData.name ? `${formData.name} ${formData.surname}` : 'Studente'}
                    </h2>
                    <p className="text-gray-400 dark:text-gray-500 text-sm">
                        {formData.school || 'Scuola non impostata'}
                    </p>
                </div>
            </div>

            {/* Settings Section */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 mb-4 px-2 transition-colors duration-200">
                <h3 className="font-bold text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider mb-4">Impostazioni</h3>

                {/* Theme Toggle */}
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-3 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                        {isDark ? <Moon size={20} className="text-blue-400" /> : <Sun size={20} className="text-yellow-500" />}
                        <div>
                            <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Tema Scuro</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Attiva la modalità scura</p>
                        </div>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 ${isDark ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                    >
                        <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ${isDark ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-bold text-sm"
                >
                    <LogOut size={18} />
                    Esci dall'Account
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-4 px-2">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4 transition-colors duration-200">
                    <h3 className="font-bold text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider mb-2">Dati Personali</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 ml-1">Nome</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all"
                                placeholder="Nome"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 ml-1">Cognome</label>
                            <input
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all"
                                placeholder="Cognome"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 ml-1">Età</label>
                            <input
                                name="age"
                                type="number"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all"
                                placeholder="Anni"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 ml-1">Sesso</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all"
                            >
                                <option value="Femmina">Femmina</option>
                                <option value="Maschio">Maschio</option>
                                <option value="Altro">Altro</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4 transition-colors duration-200">
                    <h3 className="font-bold text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                        <School size={16} /> Scuola
                    </h3>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 ml-1">Nome Scuola</label>
                        <div className="relative">
                            <School className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                            <input
                                name="school"
                                value={formData.school}
                                onChange={handleChange}
                                className="w-full pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all"
                                placeholder="Es. Liceo Scientifico..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 ml-1">Classe</label>
                        <div className="relative">
                            <GraduationCap className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                            <input
                                name="classRoom"
                                value={formData.classRoom}
                                onChange={handleChange}
                                className="w-full pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all"
                                placeholder="Es. 3B"
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className={`w-full font-bold rounded-2xl p-4 shadow-lg transition-all flex items-center justify-center gap-2 ${success
                        ? 'bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'
                        : 'bg-gray-900 dark:bg-blue-600 text-white hover:bg-gray-800 dark:hover:bg-blue-700'
                        }`}
                >
                    {saving ? <Loader2 className="animate-spin" /> : success ? <CheckCircle2 /> : <Save size={20} />}
                    {saving ? 'Salvataggio...' : success ? 'Salvato!' : 'Salva Modifiche'}
                </button>
            </form>
        </div>
    );
}
