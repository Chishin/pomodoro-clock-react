import { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';

export default function TimerDisplay() {
  const { timeLeft } = useContext(TimerContext);
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex justify-center items-center">
      <div className="bg-slate-600 rounded-lg p-6 text-6xl font-bold w-32">
        {String(minutes).padStart(2, '0')}
      </div>
      <div className="text-6xl mx-2">:</div>
      <div className="bg-slate-600 rounded-lg p-6 text-6xl font-bold w-32">
        {String(seconds).padStart(2, '0')}
      </div>
    </div>
  );
}
