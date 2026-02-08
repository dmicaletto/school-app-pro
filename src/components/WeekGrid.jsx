
import React, { useEffect, useRef, useState } from 'react';
import DayColumn from './DayColumn';
import TaskModal from './TaskModal';
import { getWeekDays, isToday } from '../utils/dateUtils';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db, appId } from '../lib/firebase';
import { format } from 'date-fns';
import { TIMETABLE as DEFAULT_TIMETABLE } from '../constants'; // Fallback

export default function WeekGrid({ startDate, userId }) {
    const scrollContainerRef = useRef(null);
    const weekDays = getWeekDays(startDate);

    const [tasks, setTasks] = useState([]);
    const [timetable, setTimetable] = useState(DEFAULT_TIMETABLE);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [editingTask, setEditingTask] = useState(null);

    // Fetch Tasks & Timetable
    useEffect(() => {
        if (!userId) return;

        // 1. Fetch Timetable (single fetch is usually enough, but real-time is cool too)
        const timetableRef = doc(db, "artifacts", appId, "users", userId, "data", "timetable");
        const unsubTimetable = onSnapshot(timetableRef, (snap) => {
            if (snap.exists()) {
                setTimetable(snap.data());
            }
        });

        // 2. Fetch Tasks
        const q = query(collection(db, "artifacts", appId, "users", userId, "tasks"));
        const unsubTasks = onSnapshot(q, (snapshot) => {
            const tasksData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTasks(tasksData);
        });

        return () => {
            unsubTimetable();
            unsubTasks();
        };
    }, [userId]);

    // Auto-scroll logic (unchanged)
    useEffect(() => {
        if (scrollContainerRef.current) {
            const todayIndex = weekDays.findIndex(d => isToday(d.date));
            if (todayIndex !== -1) {
                const cardWidth = scrollContainerRef.current.firstChild?.offsetWidth || 0;
                if (cardWidth) {
                    scrollContainerRef.current.scrollTo({
                        left: (cardWidth + 12) * todayIndex,
                        behavior: 'smooth'
                    });
                }
            }
        }
    }, [startDate]);

    const handleAddTask = (date) => {
        setSelectedDate(date);
        setEditingTask(null);
        setModalOpen(true);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setSelectedDate(null);
        setModalOpen(true);
    };

    return (
        <>
            <div
                ref={scrollContainerRef}
                className="flex gap-3 overflow-x-auto pb-4 h-full snap-x snap-mandatory no-scrollbar sm:grid sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-7 sm:overflow-visible"
            >
                {weekDays.map((day) => {
                    const dayTasks = tasks.filter(t => t.dueDate === format(day.date, 'yyyy-MM-dd'));
                    return (
                        <DayColumn
                            key={day.date.toISOString()}
                            day={day}
                            dayKey={day.key}
                            tasks={dayTasks}
                            userId={userId}
                            onAddTask={handleAddTask}
                            onEditTask={handleEditTask}
                            timetable={timetable}
                        />
                    );
                })}
            </div>

            <TaskModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                userId={userId}
                initialDate={selectedDate}
                initialData={editingTask}
            />
        </>
    );
}
