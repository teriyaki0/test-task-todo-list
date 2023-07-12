import { getOnCompletedTask, getOnProgressTask } from "@/api";
import AddTaskButton from "./components/AddTaskButton";
import TodoList from "./components/TodoList";
import CompletedList from "./components/CompletedList";

export default async function Home() {
  const onProgressTasks = await getOnProgressTask();
  const onCompleted = await getOnCompletedTask();

  return (
    <main className="container mx-auto px-4 flex flex-col h-screen">
      <AddTaskButton />
      <div>
        <div>
          <h1 className="mt-9 text-2xl mb-5">
            On Progress
            <span className="text-gray-500"> ({onProgressTasks.length})</span>
          </h1>
          <TodoList tasks={onProgressTasks} />
        </div>
        <div>
          <h1 className="mt-9 text-2xl">
            On Completed
            <span className="text-gray-500"> ({onCompleted.length})</span>
          </h1>
          <CompletedList tasks={onCompleted} />
        </div>
      </div>
    </main>
  );
}
