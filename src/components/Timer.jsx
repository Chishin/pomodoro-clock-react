import { useContext, useEffect, useState, useRef } from 'react';
import useSound from 'use-sound';
import { TimerContext } from '../context/TimerContext';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';

export default function Timer() {
  const {
    timeLeft,
    setTimeLeft,
    isRunning,
    setIsRunning,
    selectedDuration,
    setSelectedDuration,
  } = useContext(TimerContext);
  
  const [play] = useSound('/alarm.mp3');
  const [task, setTask] = useState('');
  const [manualMinutes, setManualMinutes] = useState('');
  const [manualSeconds, setManualSeconds] = useState('');
  const [timerHistory, setTimerHistory] = useState([]);

  // Calculate progress percentage for the progress bar
  const progressPercentage = timeLeft > 0 && selectedDuration > 0
    ? (timeLeft / (selectedDuration * 60)) * 100
    : 0;
  
  // Use a ref to track the previous progress for smoother animation
  const prevProgressRef = useRef(progressPercentage);
  
  // Update the ref when progress changes
  useEffect(() => {
    prevProgressRef.current = progressPercentage;
  }, [progressPercentage]);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      play();
      // Add completed timer to history
      const newTimer = {
        title: task || 'Untitled Timer',
        duration: formatTime(selectedDuration * 60),
        status: `Completed (${formatTime(selectedDuration * 60)} Spent)`,
        timestamp: formatTimestamp(new Date()),
        completed: true
      };
      setTimerHistory(prev => [newTimer, ...prev]);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, play, selectedDuration, task]);

  // Update manual input fields when timeLeft changes
  useEffect(() => {
    // Only update the manual inputs if they're not being edited
    if (!document.activeElement || 
        (document.activeElement.id !== 'minutes-input' && 
         document.activeElement.id !== 'seconds-input')) {
      const mins = Math.floor(timeLeft / 60);
      const secs = timeLeft % 60;
      setManualMinutes(String(mins));
      setManualSeconds(String(secs));
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formatTimestamp = (date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleStart = () => {
    if (timeLeft === 0) {
      setTimeLeft(selectedDuration * 60);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
    
    // Add paused timer to history
    if (timeLeft > 0) {
      const timeSpent = selectedDuration * 60 - timeLeft;
      const newTimer = {
        title: task || 'Untitled Timer',
        duration: formatTime(timeLeft),
        status: `Paused (${formatTime(timeLeft)} Left)`,
        timestamp: formatTimestamp(new Date()),
        completed: false,
        paused: true,
        originalTimeLeft: timeLeft,
        originalTask: task || 'Untitled Timer'
      };
      setTimerHistory(prev => [newTimer, ...prev]);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(0);
    
    // Add stopped timer to history
    if (timeLeft > 0) {
      const timeSpent = selectedDuration * 60 - timeLeft;
      const newTimer = {
        title: task || 'Untitled Timer',
        duration: formatTime(timeSpent),
        status: `Completed (${formatTime(timeSpent)} Spent)`,
        timestamp: formatTimestamp(new Date()),
        completed: true
      };
      setTimerHistory(prev => [newTimer, ...prev]);
    }
  };

  const addTime = (minutes) => {
    const secondsToAdd = minutes * 60;
    setTimeLeft(prev => prev + secondsToAdd);
    setSelectedDuration(prev => prev + minutes);
  };

  const handleManualTimeChange = (field, value) => {
    // Only allow numeric input
    if (!/^\d*$/.test(value)) return;

    if (field === 'minutes') {
      setManualMinutes(value);
      if (value === '') {
        // Handle empty input
        setTimeLeft(prevTime => (prevTime % 60));
        setSelectedDuration(0);
      } else {
        const newMinutes = parseInt(value, 10);
        // Don't enforce any maximum for minutes
        setTimeLeft(prevTime => (newMinutes * 60) + (prevTime % 60));
        setSelectedDuration(newMinutes + (parseInt(manualSeconds, 10) || 0) / 60);
      }
    } else if (field === 'seconds') {
      // For seconds, we'll allow any input but warn if > 59
      setManualSeconds(value);
      if (value === '') {
        // Handle empty input
        setTimeLeft(prevTime => Math.floor(prevTime / 60) * 60);
      } else {
        const newSeconds = parseInt(value, 10);
        // Allow any value for display, but cap at 59 for calculations
        const calculationSeconds = newSeconds > 59 ? 59 : newSeconds;
        setTimeLeft(prevTime => (Math.floor(prevTime / 60) * 60) + calculationSeconds);
        setSelectedDuration((parseInt(manualMinutes, 10) || 0) + calculationSeconds / 60);
      }
    }
  };

  // Add a new function to handle input blur (when user clicks away)
  const handleInputBlur = (field) => {
    if (field === 'minutes') {
      // If empty, set to 00
      if (manualMinutes === '') {
        setManualMinutes('00');
      }
    } else if (field === 'seconds') {
      // If empty, set to 00
      if (manualSeconds === '') {
        setManualSeconds('00');
      } else {
        // If > 59, cap at 59
        const seconds = parseInt(manualSeconds, 10);
        if (seconds > 59) {
          setManualSeconds('59');
          setTimeLeft(prevTime => (Math.floor(prevTime / 60) * 60) + 59);
        }
      }
    }
  };

  const handleContinueTimer = (timer, index) => {
    // Remove the timer from history
    setTimerHistory(prev => prev.filter((_, i) => i !== index));
    
    // Set the timer values
    setTimeLeft(timer.originalTimeLeft);
    setTask(timer.originalTask);
    setSelectedDuration(timer.originalTimeLeft / 60);
    
    // Start the timer
    setIsRunning(true);
  };

  const handleMarkAsDone = (index) => {
    // Update the timer in history to mark it as completed
    setTimerHistory(prev => {
      const newHistory = [...prev];
      const timer = newHistory[index];
      const timeSpent = selectedDuration * 60 - timer.originalTimeLeft;
      
      newHistory[index] = {
        ...timer,
        status: `Completed (${formatTime(timeSpent)} Spent)`,
        completed: true,
        paused: false
      };
      
      return newHistory;
    });
  };

  return (
    <div className="bg-slate-700 rounded-3xl shadow-lg p-8 text-white h-full">
      <h1 className="text-3xl font-bold text-center mb-6">
        Focus Timer
      </h1>
      
      {/* Task Input */}
      <div className="mb-6">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What are you working on?"
          className="w-full bg-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none"
        />
      </div>
      
      {/* Quick Add Time Buttons */}
      <div className="flex justify-between gap-2 mb-6">
        <button 
          onClick={() => addTime(5/60)} 
          className="bg-slate-600 hover:bg-slate-500 px-4 py-2 rounded-lg"
        >
          +5s
        </button>
        <button 
          onClick={() => addTime(15)} 
          className="bg-slate-600 hover:bg-slate-500 px-4 py-2 rounded-lg"
        >
          +15m
        </button>
        <button 
          onClick={() => addTime(30)} 
          className="bg-slate-600 hover:bg-slate-500 px-4 py-2 rounded-lg"
        >
          +30m
        </button>
        <button 
          onClick={() => addTime(60)} 
          className="bg-slate-600 hover:bg-slate-500 px-4 py-2 rounded-lg"
        >
          +1h
        </button>
      </div>
      
      {/* Manual Timer Input */}
      {!isRunning && (
        <div className="flex justify-center items-center mb-6">
          <input
            id="minutes-input"
            type="text"
            value={manualMinutes}
            onChange={(e) => handleManualTimeChange('minutes', e.target.value)}
            onBlur={() => handleInputBlur('minutes')}
            className="bg-slate-600 rounded-lg p-6 text-6xl font-bold w-32 text-center focus:outline-none"
            maxLength="3"
          />
          <div className="text-6xl mx-2">:</div>
          <input
            id="seconds-input"
            type="text"
            value={manualSeconds}
            onChange={(e) => handleManualTimeChange('seconds', e.target.value)}
            onBlur={() => handleInputBlur('seconds')}
            className={`bg-slate-600 rounded-lg p-6 text-6xl font-bold w-32 text-center focus:outline-none ${
              manualSeconds !== '' && parseInt(manualSeconds, 10) > 59 ? 'border-2 border-red-500' : ''
            }`}
            maxLength="2"
          />
          {manualSeconds !== '' && parseInt(manualSeconds, 10) > 59 && (
            <div className="absolute mt-32 text-red-500">Seconds should be less than 60</div>
          )}
        </div>
      )}
      
      {/* Timer Display (only show when running) */}
      {isRunning && <TimerDisplay />}
      
      {/* Progress Bar */}
      <div className="my-6 w-full bg-slate-600 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-blue-500 h-full transition-all duration-1000 ease-linear"
          style={{ 
            width: `${progressPercentage}%`,
            transition: isRunning ? 'width 1s linear' : 'none'
          }}
        ></div>
      </div>
      
      {/* Timer Controls */}
      <TimerControls 
        isRunning={isRunning}
        onStart={handleStart}
        onPause={handlePause}
        onStop={handleStop}
      />
      
      {/* Divider */}
      <div className="border-t border-slate-600 my-6"></div>
      
      {/* Timer History */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Timer History</h2>
        <div className="bg-slate-600 rounded-lg p-4">
          {timerHistory.map((timer, index) => (
            <div key={index} className="mb-4 bg-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {timer.completed ? (
                    <span className="text-green-400 mr-2">✓</span>
                  ) : timer.paused ? (
                    <span className="text-yellow-400 mr-2">⏸</span>
                  ) : (
                    <span className="mr-2">•</span>
                  )}
                  <div className="text-left">
                    <div className="font-medium">{timer.title}</div>
                    <div className="text-sm text-slate-400">{timer.status}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-slate-800 px-3 py-1 rounded-lg">{timer.duration}</div>
                  <div className="text-xs text-slate-400 ml-2">{timer.timestamp}</div>
                </div>
              </div>
              
              {/* Continue and Mark as Done buttons for paused timers */}
              {timer.paused && (
                <div className="flex mt-2 gap-2">
                  <button 
                    onClick={() => handleContinueTimer(timer, index)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
                  >
                    Continue
                  </button>
                  <button 
                    onClick={() => handleMarkAsDone(index)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
                  >
                    Mark as Done
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 