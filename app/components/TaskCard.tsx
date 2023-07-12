"use client";

import { ITask } from "@/types/tasks";
import { useRouter } from "next/navigation";
import { FC, FormEventHandler, useState } from "react";
import Modal from "./Modal";
import DatePicker from "react-datepicker";
import { completedTask, deleteTask, editTask } from "@/api";

interface TaskProps {
  task: ITask;
}

const TaskCard: FC<TaskProps> = ({ task }) => {
  const router = useRouter();

  const date = new Date(task.date as Date);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const [startDate, setStartDate] = useState<Date | null>(date);
  const [taskText, setTaskText] = useState<string>(task.title);
  const [taskDescription, setTaskDescription] = useState<string>(
    task.descriptions
  );

  const handleSumbitEdit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTask({
      id: task.id,
      title: taskText,
      descriptions: taskDescription,
      date: startDate,
      isCompleted: false,
    });

    setOpenEditModal(false);
    router.refresh();
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    router.refresh();
  };

  const handleCompleted = async () => {
    await completedTask({
      id: task.id,
      title: task.title,
      descriptions: task.descriptions,
      date: task.date,
      isCompleted: !task.isCompleted,
    });
    router.refresh();
  };

  return (
    <div
      key={task.id}
      className='block p-6 border rounded-lg shadow bg-gray-800 border-gray-700 "max-w-sm'
    >
      <div className="border-b-2 border-gray-700 pb-3 flex justify-between 	">
        <div className="flex items-center">
          <div className="me-2 cursor-pointer" onClick={handleCompleted}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              fill="#fff"
              viewBox="0 0 512 512"
            >
              <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z" />
            </svg>
          </div>
          <div>
            <h5
              className={` text-2xl font-bold tracking-tight  text-white  ${
                task.isCompleted ? "text-decoration-line: line-through" : ""
              }`}
            >
              {task.title}
            </h5>
            <span className="text-xs text-gray-500 ">
              {date.toDateString()}
            </span>
          </div>
        </div>

        {task.isCompleted ? (
          ""
        ) : (
          <div className="flex">
            <div
              className="ms-6 cursor-pointer"
              onClick={() => {
                setOpenEditModal(!openEditModal);
              }}
            >
              <svg
                className="feather feather-edit"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
            <div
              className="text-xl ms-2 cursor-pointer"
              onClick={() => {
                setOpenDeleteModal(!openDeleteModal);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                version="1.1"
                id="Capa_1"
                width="23px"
                height="23px"
                viewBox="0 0 41.336 41.336"
              >
                <g>
                  <path d="M36.335,5.668h-8.167V1.5c0-0.828-0.672-1.5-1.5-1.5h-12c-0.828,0-1.5,0.672-1.5,1.5v4.168H5.001c-1.104,0-2,0.896-2,2   s0.896,2,2,2h2.001v29.168c0,1.381,1.119,2.5,2.5,2.5h22.332c1.381,0,2.5-1.119,2.5-2.5V9.668h2.001c1.104,0,2-0.896,2-2   S37.438,5.668,36.335,5.668z M14.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5   s1.5,0.672,1.5,1.5V35.67z M22.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5   s1.5,0.672,1.5,1.5V35.67z M25.168,5.668h-9V3h9V5.668z M30.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21   c0-0.828,0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5V35.67z" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
      <h1 className=" mt-4 text-gray-400">Descriptions:</h1>
      <p className="font-normal  text-gray-300">{task.descriptions}</p>

      <Modal modal={openDeleteModal} setModal={setOpenDeleteModal}>
        <div className="p-6 space-y-6">
          <h1 className="text-lg">do you really want to delete the task?</h1>
          <button
            onClick={handleDelete}
            className="text-whitefocus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-9 py-2.5 text-center bg-red-500 hover:bg-red-700 focus:ring-red-800"
          >
            Delete
          </button>
        </div>
      </Modal>
      <Modal modal={openEditModal} setModal={setOpenEditModal}>
        <form onSubmit={handleSumbitEdit}>
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
              Update
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TaskCard;
