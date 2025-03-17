import { createContext, useState } from 'react';
import { config } from '../config';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(config.durations[1] * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(config.durations[1]);
  const [isBreak, setIsBreak] = useState(false);

  return (
    <TimerContext.Provider value={{
      timeLeft,
      setTimeLeft,
      isRunning,
      setIsRunning,
      selectedDuration,
      setSelectedDuration,
      isBreak,
      setIsBreak,
      durations: config.durations,
      breakDuration: config.breakDuration,
      handleStart: () => setIsRunning(true),
      handleStop: () => setIsRunning(false),
      handleReset: () => {
        setIsRunning(false);
        setTimeLeft(selectedDuration * 60);
      },
      handleDurationChange: (duration) => {
        setSelectedDuration(duration);
        setTimeLeft(duration * 60);
      }
    }}>
      {children}
    </TimerContext.Provider>
  );
};
