import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db, appId } from '../lib/firebase';
import { CalendarClock, GraduationCap, ChevronRight, School, AlertTriangle } from 'lucide-react';
import { format, isSameDay, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';
import TimeTableEditor from './TimeTableEditor';

export default function PlannerView({ user }) {
    const [showTimetable, setShowTimetable] = useState(false);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        // Fetch future exams and commitments
        const today = new Date().toISOString().split('T')[0];
        const q = query(
            collection(db, "artifacts", appId, "users", user.uid, "tasks"),
            where("dueDate", ">=", today),
            orderBy("dueDate", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const events = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(t => t.type === 'exam' || t.type === 'commitment'); // Only interesting types
            setUpcomingEvents(events);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    if (showTimetable) {
        return (
            <div className="h-full flex flex-col">
                <button
                    onClick={() => setShowTimetable(false)}
                    className="flex items-center gap-2 text-blue-600 font-bold mb-4 px-2"
                >
                    <ChevronRight className="rotate-180" /> Torna all'Agenda
                </button>
                <TimeTableEditor user={user} />
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto pb-24 px-2">
            <div className="flex justify-between items-center mb-6 mt-2">
                <h2 className="text-2xl font-bold text-gray-800">Agenda</h2>
                <button
                    onClick={() => setShowTimetable(true)}
                    className="bg-white border border-gray-200 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                    <School size={18} /> Orario
                </button>
            </div>

            {/* Upcoming Exams Section */}
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <GraduationCap size={16} /> Prossime Verifiche
            </h3>

            <div className="space-y-3 mb-8">
                {upcomingEvents.filter(e => e.type === 'exam').length === 0 ? (
                    <div className="p-6 text-center border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 text-sm">
                        Nessuna verifica in vista! 🏖️
                    </div>
                ) : (
                    upcomingEvents.filter(e => e.type === 'exam').map(event => (
                        <div key={event.id} className="bg-white p-4 rounded-2xl shadow-sm border border-red-100 flex gap-4 items-center relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-400"></div>
                            <div className="bg-red-50 text-red-500 w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold uppercase">{format(parseISO(event.dueDate), 'MMM', { locale: it })}</span>
                                <span className="text-lg font-bold leading-none">{format(parseISO(event.dueDate), 'dd')}</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">{event.subject}</h4>
                                <p className="text-xs text-gray-500 line-clamp-1">{event.description || 'Nessuna descrizione'}</p>
                                {event.time && <span className="text-xs font-mono text-gray-400 mt-1 flex items-center gap-1"><CalendarClock size={12} /> {event.time}</span>}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Upcoming Commitments Section */}
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CalendarClock size={16} /> Impegni
            </h3>

            <div className="space-y-3">
                {upcomingEvents.filter(e => e.type === 'commitment').length === 0 ? (
                    <div className="p-6 text-center border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 text-sm">
                        Nessun impegno salvato.
                    </div>
                ) : (
                    upcomingEvents.filter(e => e.type === 'commitment').map(event => (
                        <div key={event.id} className="bg-white p-4 rounded-2xl shadow-sm border border-purple-100 flex gap-4 items-center relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-400"></div>
                            <div className="bg-purple-50 text-purple-500 w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold uppercase">{format(parseISO(event.dueDate), 'MMM', { locale: it })}</span>
                                <span className="text-lg font-bold leading-none">{format(parseISO(event.dueDate), 'dd')}</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">{event.subject}</h4>
                                {event.time && <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-md mt-1 inline-block">{event.time}</span>}
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}
