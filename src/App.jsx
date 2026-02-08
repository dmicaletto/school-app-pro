
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { getStartOfWeek, formatWeekRange } from './utils/dateUtils';
import WeekGrid from './components/WeekGrid';
import BottomNav from './components/BottomNav';
import ProfileView from './components/ProfileView';
import AuthScreen from './components/AuthScreen';
import PlannerView from './components/PlannerView';
import ChatView from './components/ChatView';
import { SkeletonWeekGrid } from './components/SkeletonLoader';

export default function App() {
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handlePrevWeek = () => {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() - 7);
    setCurrentWeekStart(d);
  };

  const handleNextWeek = () => {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() + 7);
    setCurrentWeekStart(d);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
      </div>
    );
  }

  if (!user) return <AuthScreen />;

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <WeekGrid startDate={currentWeekStart} userId={user?.uid} />;
      case 'planner':
        return <PlannerView user={user} />;
      case 'ai':
        return <ChatView />;
      case 'profile':
        return <ProfileView user={user} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans relative transition-colors duration-200">
      {/* Header - Only visible on Home tab or customizable per tab */}
      {activeTab === 'home' && (
        <header className="px-4 py-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-30 flex-shrink-0 transition-colors duration-200">
          <div className="max-w-md mx-auto flex justify-between items-center">
            <h1 className="text-xl font-black tracking-tight text-blue-600 dark:text-blue-400">
              Bacheca
            </h1>

            <div className="flex items-center gap-1 bg-white dark:bg-gray-800 p-1 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
              <button onClick={handlePrevWeek} className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <ChevronLeft size={18} strokeWidth={2.5} />
              </button>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300 w-24 text-center select-none uppercase tracking-wide">
                {formatWeekRange(currentWeekStart)}
              </span>
              <button onClick={handleNextWeek} className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden p-3 sm:p-4 diary-pattern pb-28">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => console.log("Open Add Modal")}
      />
    </div>
  );
}
