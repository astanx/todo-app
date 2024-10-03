import axios from "axios";
const API_KEY = "a83b103e-23b0-41c5-b818-1707e71fa142";
const intence = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": API_KEY,
  },
});

export const todoListApi = {
  auth: () => {
    return intence.get(`auth/me`);
  },
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: boolean
  ) => {
    return intence.post(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  getTodoLists: () => {
    return intence.get(`todo-lists`);
  },
  addTodoList: (title: string) => {
    return intence.post(`todo-lists`, { title });
  },
  deleteTodoList: (todoListId: string) => {
    return intence.delete(`todo-lists/${todoListId}`);
  },
  updateTodoListTitle: (todoListId: string, title: string) => {
    return intence.put(`todo-lists/${todoListId}`, { title });
  },
  getTasks: (todoListId: string, page: number) => {
    return intence.get(
      `todo-lists/${todoListId}/tasks?count=${10}&page=${page}`
    );
  },
  addTask: (todoListId: string, title: string) => {
    return intence.post(`todo-lists/${todoListId}/tasks`, { title });
  },
};
