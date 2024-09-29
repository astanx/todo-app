import React, { useCallback, useState } from "react";
import classes from "./Todolist.module.css";
import { AddItemForm, FilterType, TaskType } from "../App";

import Button from "@mui/material/Button";
import { Checkbox, TextField } from "@mui/material";

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

  const tasks = useSelector<AppRootStateType, Array<TaskType>>(
    (state) => state.todoLists.tasks[props.id]
  );
  let filteredTasks = tasks;

  if (props.filter === "active") {
    filteredTasks = filteredTasks.filter((task) => !task.isDone);
  }
  if (props.filter === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.isDone);
  }
  const addTask = useCallback(
    (title: string) => dispatch(addTaskAC(props.id, title)),
    []
  );
  const changeTaskTitle = useCallback(
    (id: string, title: string) =>
      dispatch(changeTaskTitleAC(props.id, id, title)),
    []
  );
  const deleteTask = useCallback(
    (id: string) => dispatch(removeTaskAC(props.id, id)),
    []
  );
  return (
    <div className={classes.todo}>
      <Editable
        deleteItem={props.deleteTodoList}
        changeItem={props.changeTitle}
        title={props.title}
      />
      <Button onClick={() => props.deleteTodoList(props.id)}>
        <DeleteIcon />
      </Button>
      <AddItemForm addItem={addTask} />

      <ul>
        {filteredTasks.map((task) => {
          return (
            <li key={task.id}>
              <Checkbox
                checked={task.isDone}
                onChange={(e) =>
                  dispatch(
                    changeCheckedTaskAC(props.id, task.id, e.target.checked)
                  )
                }
              />
              <Editable
                deleteItem={(id: string) => deleteTask(id)}
                id={task.id}
                title={task.title}
                changeItem={(title: string) => changeTaskTitle(task.id, title)}
              />
              <Button onClick={() => deleteTask(task.id)}>
                <DeleteIcon />
              </Button>
            </li>
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

export type EditablePropsType = {
  title: string;
  id?: string;
  changeItem: (title: string, id: string) => void;
  deleteItem: (id: string) => void;
};

export const Editable: React.FC<EditablePropsType> = React.memo((props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.title);

  return isEditing ? (
    <TextField
      autoFocus
      onBlur={() => {
        if (title) {
          props.changeItem(title, props.id || "");
        } else {
          props.deleteItem(props.id || '');
        }

        setIsEditing(false);
      }}
      onChange={(e) => setTitle(e.target.value)}
      value={title}
    />
  ) : (
    <span onDoubleClick={() => setIsEditing(true)}>{props.title}</span>
  );
});

export default Todolist;
