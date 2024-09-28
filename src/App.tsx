import React, { useReducer } from "react";
import Todolist from "./Todolist/Todolist";
import { v1 } from "uuid";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  addTaskAC,
  addTodoListAC,
  changeCheckedTaskAC,
  changeTaskTitleAC,
  changeTodoListTitleAC,
  removeTaskAC,
  removeTodolistAC,
  todoListId_1,
  todoListReducer,
  TodolistStateType,
  updateTodolistFilterAC,
} from "./state/todolistReducer";
import { useSelector, useDispatch } from "react-redux";
import { AppRootStateType } from "./state/store";


export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type StateTasksType = {
  [key: string]: Array<TaskType>;
};

export type FilterType = "all" | "completed" | "active";

export type TodoListType = {
  title: string;
  id: string;
  filter: FilterType;
};

function App() {
  const todoLists = useSelector<AppRootStateType, TodoListType[]>(
    (state) => state.todoLists.todoLists
  );
  const tasks = useSelector<AppRootStateType, StateTasksType>(
    (state) => state.todoLists.tasks
  );
  const dispatch = useDispatch()

  const deleteTask = (todoListId: string, id: string) => {
    dispatch(removeTaskAC(todoListId, id));
  };

  const deleteTodoList = (todoListId: string) => {
    dispatch(removeTodolistAC(todoListId));
  };

  const addTask = (title: string, todoListId: string) => {
    dispatch(addTaskAC(todoListId, title));
  };

  const addTodoList = (title: string) => {
    dispatch(addTodoListAC(title));
  };

  const setChecked = (id: string, todoListId: string, isDone: boolean) => {
    dispatch(changeCheckedTaskAC(todoListId, id, isDone));
  };

  const setFilter = (filter: FilterType, todoListId: string) => {
    dispatch(updateTodolistFilterAC(filter, todoListId));
  };

  const changeTask = (title: string, todoListId: string, id: string) => {
    dispatch(changeTaskTitleAC(todoListId, id, title));
  };

  const changeTitle = (title: string, todoListId: string) => {
    dispatch(changeTodoListTitleAC(todoListId, title));
  };

  return (
    <div className="App">
      <CreateTodo addTodoList={addTodoList} />
      {todoLists.map((tl: TodoListType) => {
        let filteredTasks = tasks[tl.id];

        if (tl.filter === "active") {
          filteredTasks = filteredTasks.filter((task) => !task.isDone);
        }
        if (tl.filter === "completed") {
          filteredTasks = filteredTasks.filter((task) => task.isDone);
        }

        return (
          <Todolist
            changeTitle={changeTitle}
            changeTask={changeTask}
            deleteTodoList={deleteTodoList}
            setChecked={setChecked}
            deleteTask={deleteTask}
            addTask={addTask}
            tasks={filteredTasks}
            setFilter={setFilter}
            key={tl.id}
            id={tl.id}
            title={tl.title}
            filter={tl.filter}
          />
        );
      })}
    </div>
  );
}

export type CreateTodoPropsType = {
  addTodoList: (title: string) => void;
};
export type CreateTodoFormType = {
  todo: string;
};

const CreateTodo: React.FC<CreateTodoPropsType> = ({ addTodoList }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateTodoFormType>();

  const submit = (data: CreateTodoFormType) => {
    if (data.todo.trim()) {
      addTodoList(data.todo);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <TextField
        error={!!errors.todo}
        {...register("todo", { required: true })}
      />
      <Button type="submit">
        <AddIcon />
      </Button>
    </form>
  );
};

export default App;
