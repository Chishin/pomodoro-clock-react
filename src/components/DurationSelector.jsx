export default function DurationSelector({ selectedDuration, onDurationChange }) {
  const durations = [15, 25, 50];

  return (
    <>
      {durations.map((duration) => (
        <div key={duration} className="flex justify-center">
          <label className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 w-full justify-center">
            <input
              type="radio"
              name="duration"
              value={duration}
              checked={selectedDuration === duration}
              onChange={() => onDurationChange(duration)}
              className="form-radio h-5 w-5 text-primary focus:ring-primary"
            />
            <span className="text-gray-700 font-medium">{duration} minutes</span>
          </label>
        </div>
      ))}
    </>
  );
}
