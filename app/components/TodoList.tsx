import { FC } from "react";
import { ITask } from "../../types/tasks";
import TaskCard from "./TaskCard";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
};

export default TodoList;
