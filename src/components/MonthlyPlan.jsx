import { useState } from 'react';

export default function MonthlyPlan() {
  const [monthlyPlan, setMonthlyPlan] = useState({
    goals: [],
    totalHours: 0,
    completedHours: 0,
    selectedDate: new Date().toISOString().split('T')[0],
    dailyTasks: {}
  });

  return (
    <div className="bg-slate-700 rounded-3xl shadow-lg p-8 text-white h-full">
      <h1 className="text-3xl font-bold text-center mb-6">
        Monthly Plan
      </h1>

      <div className="space-y-6">
        {/* Monthly Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300">Monthly Progress</span>
            <span className="text-slate-300">
              {monthlyPlan.completedHours}/{monthlyPlan.totalHours} hours
            </span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${monthlyPlan.totalHours > 0 
                  ? (monthlyPlan.completedHours / monthlyPlan.totalHours) * 100 
                  : 0}%` 
              }}
            ></div>
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <input
            type="date"
            value={monthlyPlan.selectedDate}
            onChange={(e) => setMonthlyPlan(prev => ({
              ...prev,
              selectedDate: e.target.value
            }))}
            className="w-full bg-slate-600 text-white px-4 py-2 rounded-lg focus:outline-none"
          />
        </div>

        {/* Add New Task */}
        <div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="New task for selected date"
              className="flex-1 bg-slate-600 text-white px-4 py-2 rounded-lg focus:outline-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target;
                  if (input.value.trim()) {
                    setMonthlyPlan(prev => {
                      const newTask = {
                        id: Date.now(),
                        text: input.value.trim(),
                        hours: 0,
                        completed: false,
                        date: prev.selectedDate
                      };
                      return {
                        ...prev,
                        goals: [...prev.goals, newTask],
                        dailyTasks: {
                          ...prev.dailyTasks,
                          [prev.selectedDate]: [
                            ...(prev.dailyTasks[prev.selectedDate] || []),
                            newTask
                          ]
                        }
                      };
                    });
                    input.value = '';
                  }
                }
              }}
            />
            <button 
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
              onClick={(e) => {
                const input = e.target.previousElementSibling;
                if (input.value.trim()) {
                  setMonthlyPlan(prev => {
                    const newTask = {
                      id: Date.now(),
                      text: input.value.trim(),
                      hours: 0,
                      completed: false,
                      date: prev.selectedDate
                    };
                    return {
                      ...prev,
                      goals: [...prev.goals, newTask],
                      dailyTasks: {
                        ...prev.dailyTasks,
                        [prev.selectedDate]: [
                          ...(prev.dailyTasks[prev.selectedDate] || []),
                          newTask
                        ]
                      }
                    };
                  });
                  input.value = '';
                }
              }}
            >
              Add
            </button>
          </div>
        </div>

        {/* Daily Tasks Grid */}
        <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[500px] pr-2">
          {monthlyPlan.dailyTasks[monthlyPlan.selectedDate]?.map(task => (
            <div 
              key={task.id} 
              className={`bg-slate-600 rounded-lg p-4 shadow-lg transition-all duration-200 hover:shadow-xl ${
                task.completed ? 'border-l-4 border-green-500' : 'border-l-4 border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {
                      setMonthlyPlan(prev => ({
                        ...prev,
                        dailyTasks: {
                          ...prev.dailyTasks,
                          [prev.selectedDate]: prev.dailyTasks[prev.selectedDate].map(t => 
                            t.id === task.id 
                              ? { ...t, completed: !t.completed }
                              : t
                          )
                        },
                        completedHours: task.completed 
                          ? prev.completedHours - task.hours 
                          : prev.completedHours + task.hours
                      }));
                    }}
                    className="w-4 h-4 rounded border-slate-500 mt-1"
                  />
                  <div>
                    <h3 className={`font-medium ${task.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                      {task.text}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {new Date(task.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    value={task.hours}
                    onChange={(e) => {
                      const newHours = parseInt(e.target.value) || 0;
                      const hoursDiff = newHours - task.hours;
                      setMonthlyPlan(prev => ({
                        ...prev,
                        dailyTasks: {
                          ...prev.dailyTasks,
                          [prev.selectedDate]: prev.dailyTasks[prev.selectedDate].map(t => 
                            t.id === task.id 
                              ? { ...t, hours: newHours }
                              : t
                          )
                        },
                        totalHours: prev.totalHours + hoursDiff
                      }));
                    }}
                    className="w-16 bg-slate-700 text-white px-2 py-1 rounded focus:outline-none"
                  />
                  <span className="text-slate-300">hrs</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className={`px-2 py-1 rounded-full ${
                  task.completed 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {task.completed ? 'Completed' : 'In Progress'}
                </span>
                <span className="text-slate-400">
                  {task.hours} hours planned
                </span>
              </div>
            </div>
          ))}
          {(!monthlyPlan.dailyTasks[monthlyPlan.selectedDate] || monthlyPlan.dailyTasks[monthlyPlan.selectedDate].length === 0) && (
            <div className="text-slate-400 text-center py-8 bg-slate-600 rounded-lg">
              <p className="text-lg mb-2">No tasks for this date</p>
              <p className="text-sm">Add a task to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 