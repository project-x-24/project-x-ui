// src/components/TaskList.js
import TaskItem from '../task-item/TaskItem';

const TaskList = ({ tasks, onToggleCompleted }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggleCompleted={onToggleCompleted} />
      ))}
    </div>
  );
};

export default TaskList;