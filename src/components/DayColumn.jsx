import React from 'react';
import { Plus } from 'lucide-react';
import { isToday } from '../utils/dateUtils';
import { TIMETABLE } from '../constants';
import TaskCard from './TaskCard';

export default function DayColumn({ day, dayKey, tasks, onAddTask, userId, onEditTask, timetable }) {
    const isWeekend = dayKey === 'sab' || dayKey === 'dom';
    const today = isToday(day.date);

    // Timetable Render Logic
    const renderTimetable = () => {
        if (isWeekend) return <span className="text-gray-400 text-xs">Weekend! 🎉</span>;
        // Use dynamic timetable if available, otherwise fallback (or empty)
        const subjects = timetable ? timetable[dayKey] : TIMETABLE[dayKey];
        if (!subjects || subjects.length === 0) return <span className="text-gray-400 text-xs">Nessuna lezione impostata</span>;

        // Group identical consecutive subjects
        let slots = [];
        let i = 0;
        while (i < subjects.length) {
            let subject = subjects[i];
            let j = i + 1;
            while (j < subjects.length && subjects[j] === subject) {
                j++;
            }
            slots.push({
                start: 8 + i,
                end: 8 + j,
                subject
            });
            i = j;
        }

        return (
            <div className="space-y-1.5">
                {slots.map((slot, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs group">
                        <span className="text-gray-400 font-mono w-16">{slot.start}:00</span>
                        <span className="font-semibold text-gray-700 truncate flex-1 text-right">{slot.subject}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div
            className={`min-w-[85vw] sm:min-w-0 sm:flex-1 bg-white rounded-sm shadow-sm p-4 flex flex-col border-r border-dashed border-gray-200 snap-center h-full overflow-hidden relative
        ${today ? 'bg-white' : 'bg-white/80'}
      `}
            style={{
                boxShadow: today ? '0 10px 30px -10px rgba(0,0,0,0.1)' : 'none',
                zIndex: today ? 10 : 1
            }}
        >
            {/* Holes punch effect (optional, keep it clean for now) */}

            {/* Header */}
            <div className="flex justify-between items-center mb-6 flex-shrink-0 relative z-10">
                <h2 className={`text-xl font-hand font-bold capitalize tracking-wide ${today ? 'text-slate-800 marker-highlight blue' : 'text-slate-500'}`}>
                    {day.name}
                </h2>
                <div className={`text-sm font-bold w-10 h-10 flex items-center justify-center rounded-full border-2 ${today
                        ? 'bg-yellow-100 border-yellow-300 text-yellow-700 shadow-sm rotate-3'
                        : 'bg-transparent border-slate-200 text-slate-400'
                    }`}>
                    {day.date.getDate()}
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">

                {/* Orario */}
                {!isWeekend && (
                    <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                            Orario
                        </div>
                        {renderTimetable()}
                    </div>
                )}

                {/* Compiti Header */}
                <div className="flex justify-between items-center mt-2 sticky top-0 bg-white z-10 py-1">
                    <h3 className="font-bold text-gray-700 text-sm flex items-center gap-2">
                        Compiti
                        <span className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded-md">{tasks.length}</span>
                    </h3>
                    <button
                        onClick={() => onAddTask && onAddTask(day.date)}
                        className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 active:scale-95 transition-all"
                    >
                        <Plus size={16} strokeWidth={3} />
                    </button>
                </div>

                {/* Task List */}
                <div className="space-y-2 pb-2">
                    {tasks.length === 0 ? (
                        <div
                            onClick={() => onAddTask && onAddTask(day.date)}
                            className="h-24 border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-pointer"
                        >
                            <Plus size={24} className="opacity-20 mb-1" />
                            <span className="text-xs">Aggiungi compito</span>
                        </div>
                    ) : (
                        tasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                userId={userId}
                                onEdit={onEditTask}
                            />
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}
