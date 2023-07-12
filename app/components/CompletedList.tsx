import { FC } from "react";
import TodoList from "./TodoList";
import { ITask } from "@/types/tasks";

interface TodoListProps {
    tasks: ITask[];
  }

const CompletedList: FC<TodoListProps> = ({tasks}) => {
  return (
    <div className="w-full h-96 bg-slate-600 rounded-lg p-4 mt-8">
      {tasks ? (
        <TodoList tasks={tasks} />
      ) : (
        <h1 className="text-2xl">Pull in me</h1>
      )}
    </div>
  );
};

export default CompletedList;
