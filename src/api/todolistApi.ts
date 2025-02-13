import axios from "axios";
import { FilterType } from "../App";
const API_KEY = "a83b103e-23b0-41c5-b818-1707e71fa142";
export const intence = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  headers: {
    "API-KEY": API_KEY,
  },
});

export type ResponseType<D> = {
  items: TaskType[];
  resultCode: number;
  messages: Array<string>;
  data: D;
};

export type TodoListType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
  filter?: FilterType;
};
export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: Date;
  deadline: Date;
  id: string;
  todoListId: string;
  order: number;
  addedDate: Date;
};
export type UpdateTaskType = {
  title: string;
  description: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: Date;
  deadline: Date;
};
export enum ResultCode {
  Success = 0,
  Error = 1,
  RequiredCaptcha = 10,
}

export const todoListApi = {
  getTodoLists: () => {
    return intence.get<Array<TodoListType>>(`todo-lists`);
  },
  addTodoList: (title: string) => {
    return intence.post<ResponseType<{ item: TodoListType }>>(`todo-lists`, {
      title,
    });
  },
  deleteTodoList: (todoListId: string) => {
    return intence.delete<ResponseType<{}>>(`todo-lists/${todoListId}`);
  },
  updateTodoListTitle: (todoListId: string, title: string) => {
    return intence.put(`todo-lists/${todoListId}`, { title });
  },
  getTasks: (todoListId: string) => {
    return intence.get<ResponseType<{}>>(`todo-lists/${todoListId}/tasks`);
  },
  addTask: (todoListId: string, title: string) => {
    return intence.post<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todoListId}/tasks`,
      { title }
    );
  },
  reorderTodoLists: (todoListId: string, putAfterItemId: string) => {
    return intence.put<ResponseType<{}>>(`todo-lists/${todoListId}/reorder`, {
      putAfterItemId,
    });
  },
  updateTask: (data: UpdateTaskType, todoListId: string, taskId: string) => {
    return intence.put<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todoListId}/tasks/${taskId}`,
      { ...data }
    );
  },
  deleteTask: (todoListId: string, taskId: string) => {
    return intence.delete<ResponseType<{}>>(
      `todo-lists/${todoListId}/tasks/${taskId}`
    );
  },
  reorderTasks: (
    todoListId: string,
    taskId: string,
    putAfterItemId: string
  ) => {
    return intence.put<ResponseType<{}>>(
      `todo-lists/${todoListId}/tasks/${taskId}/reorder`,
      { putAfterItemId }
    );
  },
};
