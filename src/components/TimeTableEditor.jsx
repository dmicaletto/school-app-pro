import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Clock, Loader2 } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, appId } from '../lib/firebase';
import { TIMETABLE as DEFAULT_TIMETABLE } from '../constants';
import { useToast } from '../contexts/ToastContext';

const DAYS = [
    { key: 'lun', label: 'Lunedì' },
    { key: 'mar', label: 'Martedì' },
    { key: 'mer', label: 'Mercoledì' },
    { key: 'gio', label: 'Giovedì' },
    { key: 'ven', label: 'Venerdì' },
    { key: 'sab', label: 'Sabato' },
];

export default function TimeTableEditor({ user }) {
    const toast = useToast();
    const [timetable, setTimetable] = useState(DEFAULT_TIMETABLE);
    const [activeDay, setActiveDay] = useState('lun');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!user) return;
        const loadData = async () => {
            setLoading(true);
            try {
                const ref = doc(db, "artifacts", appId, "users", user.uid, "data", "timetable");
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    setTimetable(snap.data());
                }
            } catch (e) {
                console.error("Error loading timetable", e);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [user]);

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            const ref = doc(db, "artifacts", appId, "users", user.uid, "data", "timetable");
            await setDoc(ref, timetable);
            toast.success('Orario salvato con successo!');
        } catch (e) {
            console.error(e);
            toast.error('Errore nel salvataggio dell\'orario!');
        } finally {
            setSaving(false);
        }
    };

    const updateSubject = (dayKey, index, value) => {
        const newDay = [...(timetable[dayKey] || [])];
        newDay[index] = value;
        setTimetable({ ...timetable, [dayKey]: newDay });
    };

    const addHour = (dayKey) => {
        const newDay = [...(timetable[dayKey] || []), ""];
        setTimetable({ ...timetable, [dayKey]: newDay });
    };

    const removeHour = (dayKey, index) => {
        const newDay = [...(timetable[dayKey] || [])];
        newDay.splice(index, 1);
        setTimetable({ ...timetable, [dayKey]: newDay });
    };

    if (loading) return <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-blue-500" /></div>;

    return (
        <div className="h-full flex flex-col max-w-md mx-auto bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
            {/* Header Tabs */}
            <div className="flex overflow-x-auto p-2 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 no-scrollbar gap-2 transition-colors duration-200">
                {DAYS.map(day => (
                    <button
                        key={day.key}
                        onClick={() => setActiveDay(day.key)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeDay === day.key
                            ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                            : 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                            }`}
                    >
                        {day.label}
                    </button>
                ))}
            </div>

            {/* Editor Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <Clock size={18} className="text-blue-500 dark:text-blue-400" />
                        Ore di Lezione
                    </h3>
                    <button
                        onClick={() => addHour(activeDay)}
                        className="text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                        + Aggiungi Ora
                    </button>
                </div>

                <div className="space-y-3">
                    {(timetable[activeDay] || []).map((subject, idx) => (
                        <div key={idx} className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-300" style={{ animationDelay: `${idx * 50}ms` }}>
                            <span className="font-mono text-gray-400 dark:text-gray-500 text-sm w-12 pt-1">{8 + idx}:00</span>
                            <input
                                value={subject}
                                onChange={(e) => updateSubject(activeDay, idx, e.target.value)}
                                placeholder="Materia (es. Matematica)"
                                className="flex-1 p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-colors"
                            />
                            <button
                                onClick={() => removeHour(activeDay, idx)}
                                className="p-3 text-red-400 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}

                    {(timetable[activeDay] || []).length === 0 && (
                        <div className="text-center py-10 text-gray-400 dark:text-gray-500 text-sm">
                            Nessuna lezione inserita per questo giorno.
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Save */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 transition-colors duration-200">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-gray-900 dark:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 dark:hover:bg-blue-700 active:scale-95 transition-all flex justify-center items-center gap-2"
                >
                    {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                    Salva Orario
                </button>
            </div>
        </div>
    );
}
