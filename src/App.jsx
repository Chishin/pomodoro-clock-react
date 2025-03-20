import { useState } from 'react';
import { TimerProvider } from './context/TimerContext';
import Timer from './components/Timer';
import MonthlyPlan from './components/MonthlyPlan';

function AppContent() {
  const [viewMode, setViewMode] = useState('timer'); // 'timer' or 'monthly'

  return (
    <div className="min-h-screen bg-slate-800 flex flex-col items-center p-4">
      {/* View Toggle */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => setViewMode('timer')}
          className={`px-6 py-2 rounded-lg transition-all duration-300 ${
            viewMode === 'timer'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
          }`}
        >
          Timer
        </button>
        <button
          onClick={() => setViewMode('monthly')}
          className={`px-6 py-2 rounded-lg transition-all duration-300 ${
            viewMode === 'monthly'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
          }`}
        >
          Monthly Plan
        </button>
      </div>

      {/* Content Container with Transition */}
      <div className="relative w-full max-w-md mx-auto min-h-[800px]">
        {/* Timer View */}
        <div 
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
            viewMode === 'timer' 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-full'
          }`}
        >
          <Timer />
        </div>

        {/* Monthly Plan View */}
        <div 
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
            viewMode === 'monthly' 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-full'
          }`}
        >
          <MonthlyPlan />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <TimerProvider>
      <AppContent />
    </TimerProvider>
  );
}
