import axios, { AxiosError } from "axios";
import { ITask } from "./types/tasks";
import moment from "moment";

axios.defaults.baseURL = process.env.API_URL;

export const getOnProgressTask = async (): Promise<ITask[]> => {
  try {
    const { data } = await axios.get("/tasks", {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    const filteredTasks = data.filter((task: ITask) => !task.isCompleted);

    filteredTasks.sort((a: ITask, b: ITask) => {
      const dateA = moment(a.date);
      const dateB = moment(b.date);
      return dateA.diff(dateB);
    });

    return filteredTasks;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

export const getOnCompletedTask = async (): Promise<ITask[]> => {
  try {
    const { data } = await axios.get("/tasks", {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    const filteredTasks = data.filter((task: ITask) => task.isCompleted);
    return filteredTasks;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

export const addTask = async (data: ITask): Promise<ITask> => {
  try {
    const newTodo = await axios.post("/tasks", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return newTodo.data;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

export const editTask = async (data: ITask): Promise<ITask> => {
  try {
    const res = await axios.put(`/tasks/${data.id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

export const completedTask = async (data: ITask): Promise<ITask> => {
  try {
    const res = await axios.put(`/tasks/${data.id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/tasks/${id}`);
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

const handleRequestError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    console.error("Request Error:", axiosError.response?.data);
  } else {
    console.error("Unknown Error:", error);
  }
};
