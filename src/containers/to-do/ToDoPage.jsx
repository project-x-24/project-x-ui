// src/containers/TodoListContainer.js
import { useState } from 'react';
import TaskList from '../../components/task-list/TaskList';

const ToDoPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', completed: false },
    { id: 2, name: 'Task 2', completed: true },
    { id: 3, name: 'Task 3', completed: false },
  ]);

  const handleToggleCompleted = (taskId) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <TaskList tasks={tasks} onToggleCompleted={handleToggleCompleted} />
    </div>
  );
};

export default ToDoPage;