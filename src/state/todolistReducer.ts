import { v1 } from "uuid";
import {
  FilterType,
  StateTasksType,
  TaskType,
  TodoListType,
} from "../../src/App";

export type TodolistStateType = {
  [x: string]: any;
  todoLists: Array<TodoListType>;
  tasks: StateTasksType;
};

export type AddTodoListACType = {
  type: "ADD_TODOLIST";
  title: string;
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
  title: string;
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

export type TodolistActionsType =
  | AddTodoListACType
  | RemoveTodolistACType
  | UpdateTodolistFilterACType
  | AddTaskACType
  | RemoveTaskACType
  | ChangeTaskTitleACType
  | ChangeCheckedACType
  | ChangeTodoListTitleACType;

export const todoListId_1 = v1();

const initialState: TodolistStateType = {
  todoLists: [],
  tasks: {},
};

export const todoListReducer = (
  state: TodolistStateType = initialState,
  action: TodolistActionsType
): TodolistStateType => {
  switch (action.type) {
    case "ADD_TODOLIST":
      const todolistId = v1();
      return {
        ...state,
        todoLists: [
          ...state.todoLists,
          { id: todolistId, title: action.title, filter: "all" },
        ],
        tasks: {
          ...state.tasks,
          [todolistId]: [],
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
    case "ADD_TASK":
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.todoListId]: [
            ...state.tasks[action.todoListId] || [],
            { id: v1(), title: action.title, isDone: false },
          ],
        },
      };
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
    default:
      return state;
  }
};

export const addTodoListAC = (title: string): AddTodoListACType => ({
  type: "ADD_TODOLIST",
  title,
});
export const removeTodolistAC = (id: string): RemoveTodolistACType => ({
  type: "REMOVE_TODOLIST",
  id,
});
export const updateTodolistFilterAC = (
  filter: FilterType,
  id: string
): UpdateTodolistFilterACType => ({
  type: "UPDATE_TODOLIST_FILTER",
  filter,
  id,
});
export const addTaskAC = (
  todoListId: string,
  title: string
): AddTaskACType => ({
  type: "ADD_TASK",
  title,
  todoListId,
});

export const removeTaskAC = (
  todoListId: string,
  taskId: string
): RemoveTaskACType => ({
  type: "REMOVE_TASK",
  todoListId,
  taskId,
});
export const changeTaskTitleAC = (
  todoListId: string,
  taskId: string,
  title: string
): ChangeTaskTitleACType => ({
  type: "CHANGE_TASK_TITLE",
  todoListId,
  taskId,
  title,
});
export const changeCheckedTaskAC = (
  todoListId: string,
  taskId: string,
  isDone: boolean
): ChangeCheckedACType => ({
  type: "CHANGE_TASK_CHECKED",
  todoListId,
  taskId,
  isDone,
});
export const changeTodoListTitleAC = (
  todoListId: string,
  title: string
): ChangeTodoListTitleACType => ({
  type: "CHANGE_TODOLIST_TITLE",
  todoListId,
  title,
});
