import React, { useState } from "react";
import classes from "./Todolist.module.css";
import { FilterType, TaskType } from "../App";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { Checkbox, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export type TodoPropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterType;
  deleteTask: (todoListId: string, id: string) => void;
  addTask: (title: string, todoListId: string) => void;
  setChecked: (id: string, todoListId: string, isDone: boolean) => void;
  setFilter: (filter: FilterType, todoListId: string) => void;
  deleteTodoList: (todoListId: string) => void;
  changeTask: (title: string, todoListId: string, id: string) => void;
  changeTitle: (title: string, todoListId: string) => void;
};

export type TodoFormType = {
  title: string;
};

const Todolist: React.FC<TodoPropsType> = (props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TodoFormType>();
  const submit = (data: TodoFormType) => {
    if (data.title.trim()) {
      props.addTask(data.title, props.id);
    }
    reset();
  };
  return (
    <div className={classes.todo}>
      <Editable
        deleteItem={props.deleteTodoList}
        changeItem={props.changeTitle}
        todoListId={props.id}
        title={props.title}
      />
      <Button onClick={() => props.deleteTodoList(props.id)}>
        <DeleteIcon />
      </Button>
      <form onSubmit={handleSubmit(submit)}>
        <TextField
          label="Task"
          {...register("title", { required: true })}
          error={!!errors.title}
        />

        <Button type="submit">
          <AddIcon />
        </Button>
      </form>
      <ul>
        {props.tasks.map((task) => {
          return (
            <li key={task.id}>
              <Checkbox
                checked={task.isDone}
                onChange={(e) =>
                  props.setChecked(task.id, props.id, e.target.checked)
                }
              />
              <Editable
                deleteItem={props.deleteTask}
                todoListId={props.id}
                id={task.id}
                title={task.title}
                changeItem={props.changeTask}
              />
              <Button onClick={() => props.deleteTask(props.id, task.id)}>
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
};

export type EditablePropsType = {
  title: string;
  todoListId: string;
  id?: string;
  changeItem: (title: string, todoListId: string, id: string) => void;
  deleteItem: (todoListId: string, id: string) => void;
};

export const Editable: React.FC<EditablePropsType> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.title);

  return isEditing ? (
    <TextField
      autoFocus
      onBlur={() => {
        if (title) {
          props.changeItem(title, props.todoListId, props.id || "");
        } else {
          props.deleteItem(props.todoListId, props.id || "");
        }

        setIsEditing(false);
      }}
      onChange={(e) => setTitle(e.target.value)}
      value={title}
    />
  ) : (
    <span onDoubleClick={() => setIsEditing(true)}>{props.title}</span>
  );
};

export default Todolist;
