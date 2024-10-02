import React, { useCallback } from "react";
import classes from "./Todolist.module.css";
import { FilterType, TaskType } from "../App";

import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../state/store";
import { useDispatch } from "react-redux";
import {
  addTaskAC,
  changeCheckedTaskAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "../state/todolistReducer";
import { Editable } from "./Editable";
import { Task } from "./Task";
import { AddItemForm } from "../AddItemForm";

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
  const dispatch = useDispatch();

  const tasks =
    useSelector<AppRootStateType, Array<TaskType>>(
      (state) => state.todoLists.tasks[props.id]
    ) || [];
  let filteredTasks = tasks;

  if (props.filter === "active") {
    filteredTasks = filteredTasks.filter((task) => !task.isDone);
  }
  if (props.filter === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.isDone);
  }
  const addTask = useCallback(
    (title: string) => dispatch(addTaskAC(props.id, title)),
    [dispatch, props.id]
  );
  const changeTaskTitle = useCallback(
    (id: string, title: string) =>
      dispatch(changeTaskTitleAC(props.id, id, title)),
    [dispatch, props.id]
  );
  const deleteTask = useCallback(
    (id: string) => dispatch(removeTaskAC(props.id, id)),
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
      <AddItemForm addItem={addTask} />

      <ul>
        {filteredTasks.map((task) => {
          const changeChecked = (e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(changeCheckedTaskAC(props.id, task.id, e.target.checked));

          return (
            <Task
              key={task.id}
              changeChecked={changeChecked}
              id={props.id}
              task={task}
              deleteTask={(id: string) => deleteTask(id)}
              changeTaskTitle={(title: string) =>
                changeTaskTitle(task.id, title)
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
