import { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';

export default function TimerControls() {
  const { isRunning, handleStart, handleStop, handleReset } = useContext(TimerContext);
  return (
    <div className="flex gap-4 mb-2 justify-center w-full">
      {!isRunning ? (
        <button
          onClick={handleStart}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg w-full text-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          Start
        </button>
      ) : (
        <>
          <button
            onClick={handleStop}
            className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg"
          >
            Stop
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white font-bold py-3 px-6 rounded-lg"
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
}
