import axios from "axios";
import { addTodoListAC } from "../state/todolistReducer";
import { TodoListType } from "../App";
const API_KEY = "a83b103e-23b0-41c5-b818-1707e71fa142";
const intense = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": API_KEY,
  },
});

export const todoListApi = {
    auth: async() => {
        const res = await intense.get(`auth/me`)
        return res
    },
    login: async(email: string, password: string, rememberMe: boolean, captcha: boolean) => {
        const res = await intense.post(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
        return res
    },
    getTodoLists: async() => {
        const res = await intense.get(`todo-lists`)
        console.log(res);
        res.data.forEach((tl: TodoListType) => addTodoListAC(tl.title))
        return res
    },
    addTodoList : async(title: string) => {
        const res = await intense.post(`todo-lists`, {title})
        return res
    },
    deleteTodoList: async(todoListId: string) => {
        const res = await intense.delete(`todo-lists/${todoListId}`)
        return res
    },
    updateTodoListTitle: async(todoListId: string,title: string) => {
        const res = await intense.put(`todo-lists/${todoListId}`, {title})
        return res
    },
    getTasks: async(todoListId: string, page: string) => {
        const res = await intense.get(`todo-lists/${todoListId}/tasks?count=${10}&page=${page}`)
        return res
    },
    addTask: async(todoListId: string, title: string) => {
        const res = await intense.post(`todo-lists/${todoListId}/tasks`, {title})
        console.log(res);
        
        return res
    }
}