"use client";
import DatePicker from "react-datepicker";
import { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { addTask } from "@/api";
import { v4 as uuidv4 } from "uuid";


const AddTaskButton = () => {
  const router = useRouter();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [taskText, setTaskText] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTask({
      id: Number(uuidv4()),
      title: taskText,
      descriptions: taskDescription,
      date: startDate,
      isCompleted: false,
    });

    setTaskText("");
    setTaskDescription("");
    setStartDate(null);
    setModal(false);
    router.refresh();
  };

  return (
    <div className="flex">
      <button
        className="btn w-full  py-4 px-8 text-xl bg-gray-800 border border-gray-700 hover:bg-gray-700 rounded-lg mt-8"
        onClick={() => setModal(!modal)}
      >
        ADD NEW TASK
      </button>
      <Modal modal={modal} setModal={setModal}>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="text" className="text-lg">
                Task Title
              </label>
              <input
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Add Task Name..."
                className="bg-gray-50 border my-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                required
              />
              <label htmlFor="text" className="text-lg">
                Descriptions
              </label>
              <textarea
                placeholder="Add descriptions..."
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                maxLength={60}
                className="bg-gray-50 border mt-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-40 dark:bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                required
              />
              <div className="mt-2">
                <label htmlFor="text" className="text-lg">
                  Date
                </label>
              </div>

              <DatePicker
                className="bg-gray-50 border text-sm rounded-lg py-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                required
              />
            </div>
          </div>
          <div className="flex items-center p-6 space-x-2 border-t rounded-b border-gray-600">
            <button
              type="submit"
              className="text-whitefocus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-9 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTaskButton;

