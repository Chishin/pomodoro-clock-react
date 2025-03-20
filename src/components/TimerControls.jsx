import { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';

export default function TimerControls({ isRunning, onStart, onPause, onStop }) {
  return (
    <div className="flex gap-4 justify-between w-full">
      <button
        onClick={onStart}
        className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-lg flex-1"
      >
        Start
      </button>
      <button
        onClick={onPause}
        className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-lg flex-1"
      >
        Pause
      </button>
      <button
        onClick={onStop}
        className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-lg flex-1"
      >
        Stop
      </button>
    </div>
  );
}
