import { v1 } from "uuid";
import {
  FilterType,
} from "../../src/App";
import { AppStateType, InferActionsTypes } from "./store";
import { ThunkAction } from "@reduxjs/toolkit";
import { TaskType, todoListApi, TodoListType } from "../api/todolistApi";

export type TodoListStateType = {
  [x: string]: any;
  todoLists: Array<TodoListType>;
  tasks: Array<TaskType>
  isFetching: boolean;
  isAuth: boolean;
};

export type AddTodoListACType = {
  type: "ADD_TODOLIST";
  title: string;
  todoListId: string;
  order: number;
};
export type RemoveTodolistACType = {
  type: "REMOVE_TODOLIST";
  id: string;
};
export type UpdateTodolistFilterACType = {
  type: "UPDATE_TODOLIST_FILTER";
  filter: FilterType;
  id: string;
};
export type AddTaskACType = {
  type: "ADD_TASK";
  todoListId: string;
  task: TaskType;
};
export type RemoveTaskACType = {
  type: "REMOVE_TASK";
  todoListId: string;
  taskId: string;
};
export type ChangeTaskTitleACType = {
  type: "CHANGE_TASK_TITLE";
  todoListId: string;
  taskId: string;
  title: string;
};
export type ChangeCheckedACType = {
  type: "CHANGE_TASK_CHECKED";
  todoListId: string;
  taskId: string;
  isDone: boolean;
};
export type ChangeTodoListTitleACType = {
  type: "CHANGE_TODOLIST_TITLE";
  todoListId: string;
  title: string;
};
export type SetTodoListsType = {
  type: "SET_TODOLISTS";
  todoLists: any;
};
export type SetIsFetchingType = {
  type: "SET_IS_FETCHING";
  isFetching: boolean;
};
export type SetIsAuthType = {
  type: "SET_IS_AUTH";
  isAuth: boolean;
};

export type TodoListActionsType = InferActionsTypes<typeof actions>;
export type ThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  TodoListActionsType
>;
export const todoListId_1 = v1();

const initialState: TodoListStateType = {
  todoLists: [],
  tasks: {},
  isFetching: false,
  isAuth: false,
};

export const todoListReducer = (
  state: TodoListStateType = initialState,
  action: TodoListActionsType
): TodoListStateType => {
  switch (action.type) {
    case "ADD_TODOLIST":
      return {
        ...state,
        todoLists: [
          { id: action.todoListId, title: action.title, filter: "all", order: action.order, addedDate: new Date() },
          ...state.todoLists,
        ],
        tasks: {
          ...state.tasks,
          [action.todoListId]: [],
        },
      };
    case "REMOVE_TODOLIST":
      return {
        ...state,
        todoLists: [
          ...state.todoLists.filter((tl: TodoListType) => tl.id !== action.id),
        ],
      };
    case "UPDATE_TODOLIST_FILTER":
      return {
        ...state,
        todoLists: [
          ...state.todoLists.map((tl: TodoListType) =>
            tl.id === action.id ? { ...tl, filter: action.filter } : tl
          ),
        ],
      };
      case "ADD_TASK": {
      
        return {
          ...state,
        };
      }
    case "REMOVE_TASK":
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.todoListId]: [
            ...state.tasks[action.todoListId].filter(
              (task: TaskType) => task.id !== action.taskId
            ),
          ],
        },
      };
    case "CHANGE_TASK_TITLE":
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.todoListId]: [
            ...state.tasks[action.todoListId].map((task: TaskType) =>
              task.id === action.taskId
                ? { ...task, title: action.title }
                : task
            ),
          ],
        },
      };
    case "CHANGE_TASK_CHECKED":
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.todoListId]: state.tasks[action.todoListId].map(
            (task: TaskType) =>
              task.id === action.taskId
                ? { ...task, isDone: action.isDone }
                : task
          ),
        },
      };
    case "CHANGE_TODOLIST_TITLE":
      return {
        ...state,
        todoLists: [
          ...state.todoLists.map((tl: TodoListType) =>
            tl.id === action.todoListId ? { ...tl, title: action.title } : tl
          ),
        ],
      };
    case "SET_TODOLISTS":
      return {
        ...state,
        todoLists: action.todoLists,
      };
    case "SET_IS_AUTH":
      return {
        ...state,
        isAuth: action.isAuth,
      };
    case "SET_IS_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};

export const actions = {
  addTodoListAC: (todoListId: string, title: string, order: number): AddTodoListACType =>
    ({
      type: "ADD_TODOLIST",
      todoListId,
      title,
      order
    } as const),

  removeTodolistAC: (id: string): RemoveTodolistACType =>
    ({
      type: "REMOVE_TODOLIST",
      id,
    } as const),

  updateTodolistFilterAC: (
    filter: FilterType,
    id: string
  ): UpdateTodolistFilterACType =>
    ({
      type: "UPDATE_TODOLIST_FILTER",
      filter,
      id,
    } as const),

  addTaskAC: (todoListId: string, task: TaskType): AddTaskACType =>
    ({
      type: "ADD_TASK",
      task,
      todoListId,
    } as const),

  removeTaskAC: (todoListId: string, taskId: string): RemoveTaskACType =>
    ({
      type: "REMOVE_TASK",
      todoListId,
      taskId,
    } as const),

  changeTaskTitleAC: (
    todoListId: string,
    taskId: string,
    title: string
  ): ChangeTaskTitleACType =>
    ({
      type: "CHANGE_TASK_TITLE",
      todoListId,
      taskId,
      title,
    } as const),

  changeCheckedTaskAC: (
    todoListId: string,
    taskId: string,
    isDone: boolean
  ): ChangeCheckedACType =>
    ({
      type: "CHANGE_TASK_CHECKED",
      todoListId,
      taskId,
      isDone,
    } as const),

  changeTodoListTitleAC: (
    todoListId: string,
    title: string
  ): ChangeTodoListTitleACType =>
    ({
      type: "CHANGE_TODOLIST_TITLE",
      todoListId,
      title,
    } as const),

  setTodoLists: (todoLists: Array<TodoListType>) =>
    ({
      type: "SET_TODOLISTS",
      todoLists,
    } as const),
  setIsFetching: (isFetching: boolean): SetIsFetchingType =>
    ({
      type: "SET_IS_FETCHING",
      isFetching,
    } as const),
  setIsAuth: (isAuth: boolean): SetIsAuthType =>
    ({
      type: "SET_IS_AUTH",
      isAuth,
    } as const),
};

export const setTodoLists = (): ThunkType => async (dispatch) => {
  dispatch(actions.setIsFetching(true));
  const data = await todoListApi.getTodoLists();
  dispatch(actions.setTodoLists(data.data))
  dispatch(actions.setIsFetching(false));
  console.log(data);
  
};
export const addTodoList =
  (title: string): ThunkType =>
  async (dispatch) => {
    const data = await todoListApi.addTodoList(title);
    dispatch(actions.addTodoListAC(data.data.data.item.id, title, data.data.data.item.order))
  };
export const addTask =
  (todoListId: string, title: string): ThunkType =>
  async (dispatch) => {
    const data = await todoListApi.addTask(todoListId, title);
    dispatch(actions.addTaskAC(todoListId, data.data.data.item))
    console.log(data);
  };
export const deleteTodoList =
  (todoListId: string): ThunkType =>
  async (dispatch) => {
    const data = await todoListApi.deleteTodoList(todoListId);
    dispatch(actions.removeTodolistAC(todoListId))
  };
export const getTasks =
  (todoListId: string, page: number = 10): ThunkType =>
  async (dispatch) => {
    const data = await todoListApi.getTasks(todoListId, page);
    console.log(data);
  };
export const updateTodoListTitle =
  (todoListId: string, title: string): ThunkType =>
  async (dispatch) => {
    const data = await todoListApi.updateTodoListTitle(todoListId, title);
    console.log(data);
  };
export const auth = (): ThunkType => async (dispatch) => {
  dispatch(actions.setIsFetching(true));
  const data = await todoListApi.auth();
  console.log(data);

  if (data.data.resultCode === 0) {
    dispatch(actions.setIsAuth(true));
  }
  dispatch(actions.setIsFetching(false));
};
