export default function TimerDisplay({ timeLeft, isBreak, isRunning, selectedDuration }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const progress = ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * circumference;

  return (
    <div className="text-center mb-8 mx-auto w-64 h-64 relative">
      <svg className="w-full h-full" viewBox="0 0 250 250">
        <circle
          className="text-gray-200"
          stroke="currentColor"
          strokeWidth="20"
          fill="transparent"
          r={radius}
          cx="125"
          cy="125"
        />
        <circle
          className={`${
            !isRunning ? 'text-transparent' : 
            isBreak ? 'text-green-500' : 'text-orange-500'
          } transition-all duration-1000 ease-linear`}
          stroke="currentColor"
          strokeWidth="20"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="125"
          cy="125"
          transform="rotate(-90 125 125)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-6xl font-bold">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
