import React from 'react';
import { Home, Calendar, Plus, Bot, User, LayoutGrid } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange, onAddClick }) {

    const NavItem = ({ id, icon: Icon, label }) => {
        const isActive = activeTab === id;
        return (
            <button
                onClick={() => onTabChange(id)}
                className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${isActive ? 'text-blue-600 dark:text-blue-400 scale-105' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}
            >
                <Icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[10px] font-medium mt-1 ${isActive ? 'opacity-100' : 'opacity-0 scale-0'} transition-all duration-200`}>
                    {label}
                </span>
            </button>
        );
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2 pointer-events-none">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-2xl rounded-2xl max-w-md mx-auto pointer-events-auto h-20 flex items-center justify-between px-2 relative transition-colors duration-200">

                {/* Left Group */}
                <div className="flex flex-1 justify-around">
                    <NavItem id="home" icon={Home} label="Oggi" />
                    <NavItem id="planner" icon={LayoutGrid} label="Piano" />
                </div>

                {/* Central Floating Button */}
                <div className="relative -top-8 mx-2">
                    <button
                        onClick={onAddClick}
                        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-full shadow-lg shadow-blue-500/30 dark:shadow-blue-600/30 border-4 border-gray-50 dark:border-gray-800 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-200"
                    >
                        <Plus size={32} strokeWidth={3} />
                    </button>
                </div>

                {/* Right Group */}
                <div className="flex flex-1 justify-around">
                    <NavItem id="ai" icon={Bot} label="Tutor" />
                    <NavItem id="profile" icon={User} label="Profilo" />
                </div>

            </div>
        </div>
    );
}
