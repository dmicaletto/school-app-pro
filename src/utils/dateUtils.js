import { startOfWeek, addDays, format, isSameDay } from 'date-fns';
import { it } from 'date-fns/locale';

export const getStartOfWeek = (date) => {
    return startOfWeek(date, { weekStartsOn: 1 }); // Monday start
};

export const getWeekDays = (startDate) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
        const d = addDays(startDate, i);
        days.push({
            date: d,
            name: format(d, 'EEEE', { locale: it }), // Lunedì, Martedì...
            key: format(d, 'EEE', { locale: it }).toLowerCase().slice(0, 3) // lun, mar (normalized later if needed)
        });
    }
    return days;
};

export const formatWeekRange = (startDate) => {
    const endDate = addDays(startDate, 6);
    return `${format(startDate, 'd/M')} - ${format(endDate, 'd/M')}`;
};

export const isToday = (date) => isSameDay(date, new Date());
