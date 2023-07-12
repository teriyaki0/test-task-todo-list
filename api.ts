import axios from "axios";
import { ITask } from "./types/tasks";
import moment from "moment";

axios.defaults.baseURL = "http://localhost:3001"


export const getOnProgressTask = async (): Promise<ITask[]> => {
  const { data } = await axios.get("/tasks", {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });

  const filteredTasks = data.filter((task: ITask) => !task.isComplited);

  filteredTasks.sort((a: ITask, b: ITask) => {
    const dateA = moment(a.date);
    const dateB = moment(b.date);
    return dateA.diff(dateB);
  });

  return filteredTasks;
};

export const getOnCompletedTask = async (): Promise<ITask[]> => {
  const { data } = await axios.get("/tasks", {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
  const filteredTasks = data.filter((task: ITask) => task.isComplited);
  return filteredTasks;
};

export const addTask = async (data: ITask): Promise<ITask> => {
  const newTodo = await axios.post("/tasks", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return newTodo.data;
};

export const editTask = async (data: ITask): Promise<ITask> => {
  const res = await axios.put(`/tasks/${data.id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const completedTask = async (data: ITask): Promise<ITask> => {
  const res = await axios.put(`/tasks/${data.id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`/tasks/${id}`);
};
