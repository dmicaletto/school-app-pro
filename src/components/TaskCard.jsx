import React from 'react';
import { Check, Trash2, Edit2, AlertTriangle, Calendar, Clock } from 'lucide-react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, appId } from '../lib/firebase';

export default function TaskCard({ task, userId, onEdit }) {

    const toggleComplete = async () => {
        try {
            const ref = doc(db, "artifacts", appId, "users", userId, "tasks", task.id);
            await updateDoc(ref, { completed: !task.completed });
        } catch (e) {
            console.error(e);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Vuoi davvero eliminare questo elemento?")) return;
        try {
            const ref = doc(db, "artifacts", appId, "users", userId, "tasks", task.id);
            await deleteDoc(ref);
        } catch (e) {
            console.error(e);
        }
    };

    // Style Logic
    const getStyle = () => {
        if (task.completed) return 'bg-gray-100/80 border-transparent opacity-60 scale-95 grayscale';
        switch (task.type) {
            case 'exam': return 'bg-red-50 border-b-4 border-red-100 rotate-1 hover:rotate-0 hover:scale-[1.02] shadow-sm';
            case 'commitment': return 'bg-purple-50 border-b-4 border-purple-100 -rotate-1 hover:rotate-0 hover:scale-[1.02] shadow-sm';
            default: return 'bg-yellow-50 border-b-4 border-yellow-100 rotate-[0.5deg] hover:rotate-0 hover:scale-[1.02] shadow-sm';
        }
    };

    const getTypeIcon = () => {
        switch (task.type) {
            case 'exam': return <AlertTriangle size={14} className="text-red-400" />;
            case 'commitment': return <Calendar size={14} className="text-purple-400" />;
            default: return null;
        }
    };

    return (
        <div className={`p-3 rounded-md mb-3 transition-all duration-300 group relative ${getStyle()}`}>
            {/* Tape Strip Effect - Only for non-completed items to look attached */}
            {!task.completed && <div className="tape-strip bg-white/30 w-16 h-3 -top-1.5 left-1/2 -translate-x-1/2 rotate-1 absolute block"></div>}

            <div className="flex items-start gap-3 relative z-10">
                {/* Checkbox */}
                <button
                    onClick={toggleComplete}
                    className={`mt-0.5 min-w-[20px] h-5 rounded-full border-2 flex items-center justify-center transition-all ${task.completed
                            ? 'bg-slate-400 border-slate-400 text-white'
                            : task.type === 'exam' ? 'border-red-300 hover:bg-red-200'
                                : task.type === 'commitment' ? 'border-purple-300 hover:bg-purple-200'
                                    : 'border-yellow-600/30 hover:bg-yellow-200 text-yellow-700'
                        }`}
                >
                    {task.completed && <Check size={12} strokeWidth={3} />}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                        {getTypeIcon()}
                        <h4 className={`text-sm font-bold truncate tracking-tight ${task.completed ? 'text-gray-500 line-through decoration-2' : 'text-slate-700'}`}>
                            {task.subject}
                        </h4>
                        {task.time && (
                            <span className="text-[10px] font-bold bg-white/60 px-1.5 py-0.5 rounded text-slate-600 flex items-center gap-1">
                                <Clock size={10} /> {task.time}
                            </span>
                        )}
                    </div>
                    {task.description && (
                        <p className={`text-xs mt-0.5 line-clamp-2 ${task.completed ? 'text-gray-400 line-through decoration-1' : 'text-slate-500'}`}>
                            {task.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Actions (visible on hover or swipe - simple hover here) */}
            {!task.completed && (
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm rounded-lg p-1">
                    <button onClick={() => onEdit(task)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md">
                        <Edit2 size={14} />
                    </button>
                    <button onClick={handleDelete} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md">
                        <Trash2 size={14} />
                    </button>
                </div>
            )}
        </div>
    );
}
