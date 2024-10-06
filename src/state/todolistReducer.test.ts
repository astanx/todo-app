import { v1 } from "uuid";
import { TodoListStateType, actions, todoListReducer } from "./todolistReducer";
import { TaskType, TodoListType } from ".././api/todolistApi";

const todoListId_1 = v1();
const todoListId_2 = v1();

const getInitialState = (): TodoListStateType => ({
  todoLists: [
    {
      id: todoListId_1,
      filter: "all",
      title: "TODO",
      addedDate: new Date().toISOString(),
      order: 0,
    },
  ],
  tasks: {
    [todoListId_1]: [
      {
        description: "string",
        title: "string",
        completed: false,
        status: 2,
        priority: 2,
        startDate: new Date(),
        deadline: new Date(),
        id: "string",
        todoListId: "string",
        order: 2,
        addedDate: new Date(),
      },
    ],
    [todoListId_2]: [
      {
        description: "string",
        title: "string",
        completed: false,
        status: 2,
        priority: 2,
        startDate: new Date(),
        deadline: new Date(),
        id: "string",
        todoListId: "string",
        order: 2,
        addedDate: new Date(),
      },
    ],
  },
  isFetching: false,
  isAuth: false,
});

test("adds todoList", () => {
  const initialState = getInitialState();

  const newState = todoListReducer(
    initialState,
    actions.addTodoListAC("abc", "TO BUY", 1)
  );

  expect(newState.todoLists.length).toBe(2);
  expect(newState.todoLists[0].title).toBe("TO BUY");
  expect(Object.keys(newState.tasks).length).toBe(3);
});

test("removes todoList", () => {
  const initialState = getInitialState();

  const newState = todoListReducer(
    initialState,
    actions.removeTodolistAC(todoListId_1)
  );

  expect(newState.todoLists.length).toBe(0);
});

test("add task to todoList", () => {
  const initialState = getInitialState();
  const Task: TaskType = {
    description: "string",
    title: "string",
    completed: false,
    status: 2,
    priority: 2,
    startDate: new Date(),
    deadline: new Date(),
    id: "string",
    todoListId: "string",
    order: 2,
    addedDate: new Date(),
  };
  const newState = todoListReducer(
    initialState,
    actions.addTaskAC(todoListId_1, Task)
  );

  expect(newState.tasks[todoListId_1][0].title).toBe("REACT");
  expect(newState.tasks[todoListId_1][0].completed).toBe(false);
  expect(newState.tasks[todoListId_1][1].title).toBe("HTML");
});

test("remove task from todoList", () => {
  const initialState = getInitialState();

  const newState = todoListReducer(
    initialState,
    actions.removeTaskAC(todoListId_1, initialState.tasks[todoListId_1][0].id)
  );
  expect(newState.tasks[todoListId_1].length).toBe(0);
});
test("changes task title in todoList", () => {
  const initialState = getInitialState();

  const newState = todoListReducer(
    initialState,
    actions.updateTask(todoListId_1, initialState.tasks[todoListId_1][0].id, {
      ...initialState.tasks[todoListId_1][0],
      title: "CSS",
    })
  );
  expect(newState.tasks[todoListId_1][0].title).toBe("CSS");
  expect(newState.tasks[todoListId_1][0].completed).toBe(true);
});
test("changes task checked in todoList", () => {
  const initialState = getInitialState();

  const newState = todoListReducer(
    initialState,
    actions.updateTask(todoListId_1, initialState.tasks[todoListId_1][0].id, {
      ...initialState.tasks[todoListId_1][0],
      status: 0,
    })
  );
  expect(newState.tasks[todoListId_1][0].title).toBe("HTML");
  expect(newState.tasks[todoListId_1][0].completed).toBe(0);
});
test("changes todolist title", () => {
  const initialState = getInitialState();

  const newState = todoListReducer(
    initialState,
    actions.changeTodoListTitleAC(todoListId_1, "TO LEARN")
  );
  expect(
    newState.todoLists.find((tl: TodoListType) => tl.id === todoListId_1)?.title
  ).toBe("TO LEARN");
  expect(newState.tasks[todoListId_1][0].completed).toBe(true);
});
test("updates todolist filter", () => {
  const initialState = getInitialState();

  const newState = todoListReducer(
    initialState,
    actions.updateTodolistFilterAC("completed", todoListId_1)
  );
  expect(
    newState.todoLists.find((tl: TodoListType) => tl.id === todoListId_1)
      ?.filter
  ).toBe("completed");
  expect(newState.tasks[todoListId_1][0].completed).toBe(true);
});
