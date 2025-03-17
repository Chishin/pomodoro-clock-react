export const config = {
  durations: import.meta.env.VITE_DURATIONS?.split(',').map(Number) || [15, 25, 50],
  breakDuration: parseInt(import.meta.env.VITE_BREAK_DURATION) || 5
};
