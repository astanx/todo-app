import { v1 } from "uuid";

import {
  TodolistStateType,
  addTaskAC,
  addTodoListAC,
  changeCheckedTaskAC,
  changeTaskTitleAC,
  changeTodoListTitleAC,
  removeTaskAC,
  removeTodolistAC,
  todoListReducer,
  updateTodolistFilterAC,
} from "./todolistReducer";
import { TodoListType } from "../App";

const todoListId_1 = v1();
const todoListId_2 = v1();

const getInitialState = (): TodolistStateType => ({
  todoLists: [{ id: todoListId_1, filter: "all", title: "TODO" }],
  tasks: {
    [todoListId_1]: [{ id: v1(), title: "HTML", isDone: true }],
    [todoListId_2]: [{ id: v1(), title: "HTML", isDone: true }],
  },
});

test("adds todoList", () => {
  const initialState = getInitialState();

  const newState = todoListReducer(initialState, addTodoListAC("TO BUY"));

  expect(newState.todoLists.length).toBe(2);
  expect(newState.todoLists[0].title).toBe("TO BUY");
  expect(Object.keys(newState.tasks).length).toBe(3);
});

test("removes todoList", () => {
  const initialState = getInitialState();

  const newState = todoListReducer(
    initialState,
    removeTodolistAC(todoListId_1)
  );

  expect(newState.todoLists.length).toBe(0);
});

test("add task to todoList", () => {
  const initialState = getInitialState();

  const newState = todoListReducer(
    initialState,
    addTaskAC(todoListId_1, "REACT")
  );

  expect(newState.tasks[todoListId_1][0].title).toBe("REACT");
  expect(newState.tasks[todoListId_1][0].isDone).toBe(false);
  expect(newState.tasks[todoListId_1][1].title).toBe("HTML");
});

test("remove task from todoList", () => {
  const initialState = getInitialState();

  const newState = todoListReducer(
    initialState,
    removeTaskAC(todoListId_1, initialState.tasks[todoListId_1][0].id)
  );
  expect(newState.tasks[todoListId_1].length).toBe(0);
});
test("changes task title in todoList", () => {
  const initialState = getInitialState();

  const newState = todoListReducer(
    initialState,
    changeTaskTitleAC(
      todoListId_1,
      initialState.tasks[todoListId_1][0].id,
      "CSS"
    )
  );
  expect(newState.tasks[todoListId_1][0].title).toBe("CSS");
  expect(newState.tasks[todoListId_1][0].isDone).toBe(true);
});
test("changes task checked in todoList", () => {
  const initialState = getInitialState();

  const newState = todoListReducer(
    initialState,
    changeCheckedTaskAC(
      todoListId_1,
      initialState.tasks[todoListId_1][0].id,
      false
    )
  );
  expect(newState.tasks[todoListId_1][0].title).toBe("HTML");
  expect(newState.tasks[todoListId_1][0].isDone).toBe(false);
});
test("changes todolist title", () => {
  const initialState = getInitialState();

  const newState = todoListReducer(
    initialState,
    changeTodoListTitleAC(todoListId_1, "TO LEARN")
  );
  expect(
    newState.todoLists.find((tl: TodoListType) => tl.id === todoListId_1)?.title
  ).toBe("TO LEARN");
  expect(newState.tasks[todoListId_1][0].isDone).toBe(true);
});
test("updates todolist filter", () => {
  const initialState = getInitialState();

  const newState = todoListReducer(
    initialState,
    updateTodolistFilterAC("completed", todoListId_1)
  );
  expect(
    newState.todoLists.find((tl: TodoListType) => tl.id === todoListId_1)
      ?.filter
  ).toBe("completed");
  expect(newState.tasks[todoListId_1][0].isDone).toBe(true);
});
