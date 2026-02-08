import React from 'react';

export const SkeletonBase = ({ className = '' }) => (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
);

export const SkeletonText = ({ lines = 1, className = '' }) => (
    <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
            <SkeletonBase
                key={i}
                className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
            />
        ))}
    </div>
);

export const SkeletonCard = ({ className = '' }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
        <div className="flex items-start gap-3">
            <SkeletonBase className="w-12 h-12 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <SkeletonBase className="h-5 w-3/4" />
                <SkeletonBase className="h-4 w-1/2" />
            </div>
        </div>
    </div>
);

export const SkeletonTaskCard = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 flex-1">
                <SkeletonBase className="w-5 h-5 rounded" />
                <SkeletonBase className="h-5 w-32" />
            </div>
            <SkeletonBase className="w-16 h-6 rounded-full" />
        </div>
        <SkeletonText lines={2} />
        <div className="flex items-center gap-2 mt-3">
            <SkeletonBase className="w-4 h-4 rounded" />
            <SkeletonBase className="h-3 w-24" />
        </div>
    </div>
);

export const SkeletonDayColumn = () => (
    <div className="flex-shrink-0 w-[280px] sm:w-auto snap-start">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 h-full flex flex-col">
            {/* Header */}
            <div className="mb-4">
                <SkeletonBase className="h-6 w-24 mb-1" />
                <SkeletonBase className="h-8 w-16" />
            </div>

            {/* Timetable */}
            <div className="space-y-2 mb-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-2">
                        <SkeletonBase className="w-12 h-8 rounded-lg" />
                        <SkeletonBase className="flex-1 h-8 rounded-lg" />
                    </div>
                ))}
            </div>

            {/* Tasks */}
            <div className="space-y-3 flex-1">
                <SkeletonTaskCard />
                <SkeletonTaskCard />
            </div>
        </div>
    </div>
);

export const SkeletonWeekGrid = () => (
    <div className="flex gap-3 overflow-x-auto pb-4 h-full">
        {[1, 2, 3, 4, 5].map(i => (
            <SkeletonDayColumn key={i} />
        ))}
    </div>
);

export const SkeletonAgendaItem = () => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4 items-center">
        <SkeletonBase className="w-12 h-12 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
            <SkeletonBase className="h-5 w-40" />
            <SkeletonBase className="h-4 w-24" />
        </div>
    </div>
);

export const SkeletonLoader = ({ type = 'card', count = 1, className = '' }) => {
    const components = {
        card: SkeletonCard,
        task: SkeletonTaskCard,
        day: SkeletonDayColumn,
        week: SkeletonWeekGrid,
        agenda: SkeletonAgendaItem,
        text: SkeletonText,
    };

    const Component = components[type] || SkeletonCard;

    if (type === 'week') {
        return <Component className={className} />;
    }

    return (
        <div className={`space-y-3 ${className}`}>
            {Array.from({ length: count }).map((_, i) => (
                <Component key={i} />
            ))}
        </div>
    );
};
