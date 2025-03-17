import { useContext, useEffect } from 'react';
import useSound from 'use-sound';
import { TimerProvider, TimerContext } from './context/TimerContext';
import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls';
import DurationSelector from './components/DurationSelector';

function AppContent() {
  const {
    timeLeft,
    setTimeLeft,
    isRunning,
    setIsRunning,
    selectedDuration,
    setSelectedDuration,
    isBreak,
    setIsBreak,
    breakDuration
  } = useContext(TimerContext);
  
  const [play] = useSound('/alarm.mp3');

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      play();
      if (!isBreak) {
        setIsBreak(true);
        setTimeLeft(breakDuration * 60);
        setIsRunning(true);
      } else {
        setIsBreak(false);
        setTimeLeft(selectedDuration * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedDuration * 60);
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
    setTimeLeft(duration * 60);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md mx-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
          {isBreak ? 'Take A Coffee Break Now ☕' : 'Pomodoro Clock'}
        </h1>
        <TimerDisplay />
        <div className="w-full flex justify-center">
          <TimerControls 
            isRunning={isRunning}
            onStart={handleStart}
            onStop={handleStop}
            onReset={handleReset}
          />
        </div>
        {!isRunning && (
          <div className="mt-8 bg-gray-50 p-6 rounded-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Select Duration</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <DurationSelector 
                selectedDuration={selectedDuration}
                onDurationChange={handleDurationChange}
              />
            </div>
          </div>
        )}
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
