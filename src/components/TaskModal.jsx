import React, { useState, useEffect } from 'react';
import { X, Calendar, BookOpen, AlignLeft, Save, Loader2 } from 'lucide-react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db, appId } from '../lib/firebase';
import { TIMETABLE } from '../constants';
import { format } from 'date-fns';

export default function TaskModal({ isOpen, onClose, userId, initialDate, initialData }) {
    const [formData, setFormData] = useState({
        type: 'homework', // homework, exam, commitment
        subject: '',
        description: '',
        dueDate: initialDate ? format(initialDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
        time: ''
    });
    const [loading, setLoading] = useState(false);
    const [suggestedSubjects, setSuggestedSubjects] = useState([]);

    // Reset form when opening
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    type: initialData.type || 'homework',
                    subject: initialData.subject || '',
                    description: initialData.description || '',
                    dueDate: initialData.dueDate || '',
                    time: initialData.time || ''
                });
            } else {
                setFormData({
                    type: 'homework',
                    subject: '',
                    description: '',
                    dueDate: initialDate ? format(initialDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
                    time: ''
                });
            }
        }
    }, [isOpen, initialDate, initialData]);

    // Update suggestions based on date
    useEffect(() => {
        if (formData.dueDate) {
            const date = new Date(formData.dueDate);
            // getDay: 0=Dom, 1=Lun...
            const dayIndex = date.getDay();
            // TIMETABLE usava lun, mar...
            const map = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'];
            const key = map[dayIndex];
            const subjects = TIMETABLE[key] || [];
            // Unique subjects
            setSuggestedSubjects([...new Set(subjects)]);
        }
    }, [formData.dueDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) return;
        setLoading(true);
        try {
            if (initialData?.id) {
                // Update
                await updateDoc(doc(db, "artifacts", appId, "users", userId, "tasks", initialData.id), {
                    ...formData
                });
            } else {
                // Create
                await addDoc(collection(db, "artifacts", appId, "users", userId, "tasks"), {
                    ...formData,
                    completed: false,
                    createdAt: new Date().toISOString()
                });
            }
            onClose();
        } catch (e) {
            console.error(e);
            alert("Errore salvataggio");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
            {/* Search background overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" onClick={onClose} />

            {/* Modal Content */}
            <div className="bg-white w-full max-w-md sm:rounded-2xl rounded-t-3xl p-6 pointer-events-auto shadow-2xl transform transition-transform animate-in slide-in-from-bottom duration-300">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden" />

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        {initialData ? 'Modifica Compito' : 'Nuovo Compito'}
                    </h2>
                    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Type Selector */}
                    <div className="flex bg-gray-100 p-1 rounded-xl mb-4">
                        {[
                            { id: 'homework', label: 'Compito', icon: BookOpen },
                            { id: 'exam', label: 'Verifica', icon: AlignLeft },
                            { id: 'commitment', label: 'Impegno', icon: Calendar }
                        ].map(t => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, type: t.id })}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${formData.type === t.id
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* Subject Selection (Only for homework/exam) */}
                    {formData.type !== 'commitment' && (
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-500 ml-1">Materia</label>
                            <div className="relative">
                                <BookOpen className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input
                                    list="subjects-list"
                                    value={formData.subject}
                                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                                    placeholder="Scegli o scrivi materia..."
                                    required
                                />
                                <datalist id="subjects-list">
                                    {suggestedSubjects.map(s => <option key={s} value={s} />)}
                                </datalist>
                            </div>
                            {/* Visual Chips for suggestions */}
                            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                                {suggestedSubjects.map(s => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, subject: s })}
                                        className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${formData.subject === s ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-600 border-gray-100'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Title (Only for commitment) */}
                    {formData.type === 'commitment' && (
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-500 ml-1">Titolo Impegno</label>
                            <input
                                value={formData.subject}
                                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                                placeholder="Es. Allenamento, Dentista..."
                                required
                            />
                        </div>
                    )}

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 ml-1">Descrizione (Opzionale)</label>
                        <div className="relative">
                            <AlignLeft className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                rows={2}
                                className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                placeholder={formData.type === 'exam' ? 'Argomenti verifica...' : 'Dettagli...'}
                            />
                        </div>
                    </div>

                    {/* Time (Only for commitment or exam) */}
                    {(formData.type === 'commitment' || formData.type === 'exam') && (
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-500 ml-1">Orario</label>
                            <input
                                type="time"
                                value={formData.time}
                                onChange={e => setFormData({ ...formData, time: e.target.value })}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                            />
                        </div>
                    )}

                    {/* Date */}
                    <div className="space-y-2 pb-24"> {/* Extra padding for sticky footer */}
                        <label className="text-sm font-bold text-gray-500 ml-1">Data Scadenza</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input
                                type="date"
                                value={formData.dueDate}
                                onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                                className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                                required
                            />
                        </div>
                    </div>

                    {/* Sticky Footer Action */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 rounded-b-3xl sm:rounded-b-2xl">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white font-bold rounded-xl p-4 shadow-lg hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                            {initialData ? 'Salva Modifiche' : 'Aggiungi Compito'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

