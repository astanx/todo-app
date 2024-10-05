import React, { useCallback } from "react";
import classes from "./Todolist.module.css";
import { FilterType } from "../App";

import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  actions,
  addTask,
  deleteTask,
  TodoListActionsType,
  updateTask,
} from "../state/todolistReducer";
import { Editable } from "./Editable";
import { Task } from "./Task";
import { AddItemForm } from "../AddItemForm";
import { AppStateType } from "../state/store";
import { ThunkDispatch } from "redux-thunk";
import { TodoListType, UpdateTaskType } from "../api/todolistApi";
import { TaskType } from "../api/todolistApi";

export type TodoPropsType = {
  id: string;
  title: string;
  filter: FilterType;
  setFilter: (filter: FilterType, todoListId: string) => void;
  deleteTodoList: (todoListId: string) => void;
  changeTitle: (title: string, todoListId: string) => void;
};

export type TodoFormType = {
  title: string;
};

const Todolist: React.FC<TodoPropsType> = React.memo((props) => {
  const dispatch: ThunkDispatch<AppStateType, void, TodoListActionsType> =
    useDispatch();

  const tasks =
    useSelector<AppStateType, Array<TaskType>>(
      (state) => state.todoLists.tasks[props.id]
    ) || [];
  let filteredTasks = tasks;

  if (props.filter === "active") {
    filteredTasks = filteredTasks.filter((task) => !!!task.status);
  }
  if (props.filter === "completed") {
    filteredTasks = filteredTasks.filter((task) => !!task.status);
  }
  const addTaskCallBack = useCallback(
    (title: string) => dispatch(addTask(props.id, title)),
    [dispatch, props.id]
  );
  const changeTaskTitle = useCallback(
    (id: string, task: TaskType) => dispatch(updateTask(task, props.id, id)),
    [dispatch, props.id]
  );
  const deleteTaskCallBack = useCallback(
    (id: string) => dispatch(deleteTask(props.id, id)),
    [dispatch, props.id]
  );
  return (
    <div className={classes.todo}>
      <Editable
        deleteItem={props.deleteTodoList}
        changeItem={props.changeTitle}
        title={props.title}
        id={props.id}
      />
      <Button onClick={() => props.deleteTodoList(props.id)}>
        <DeleteIcon />
      </Button>
      <AddItemForm addItem={addTaskCallBack} />

      <ul>
        {filteredTasks.map((task) => {
          const changeChecked = (e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(
              updateTask(
                { ...task, status: e.target.checked ? 1 : 0 },
                props.id,
                task.id
              )
            );

          return (
            <Task
              key={task.id}
              changeChecked={changeChecked}
              id={props.id}
              task={task}
              deleteTask={(id: string) => deleteTaskCallBack(id)}
              changeTaskTitle={(title: string) =>
                changeTaskTitle(task.id, { ...task, title })
              }
            />
          );
        })}
      </ul>
      <Button
        variant={props.filter === "all" ? "contained" : "outlined"}
        onClick={() => props.setFilter("all", props.id)}
      >
        all
      </Button>
      <Button
        variant={props.filter === "completed" ? "contained" : "outlined"}
        onClick={() => props.setFilter("completed", props.id)}
      >
        completed
      </Button>
      <Button
        variant={props.filter === "active" ? "contained" : "outlined"}
        onClick={() => props.setFilter("active", props.id)}
      >
        active
      </Button>
    </div>
  );
});

export default Todolist;
