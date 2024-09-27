// src/components/TaskItem.js

const TaskItem = ({ task, onToggleCompleted }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleCompleted(task.id)}
          className="mr-4"
        />
        <span className={`text-lg ${task.completed ? 'line-through' : ''}`}>{task.name}</span>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => console.log(`Edit task ${task.id}`)}
          className="text-gray-600 hover:text-gray-900 mr-4"
        >
          Edit
        </button>
        <button
          onClick={() => console.log(`Delete task ${task.id}`)}
          className="text-red-600 hover:text-red-900"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;