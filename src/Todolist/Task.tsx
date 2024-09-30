import { Button, Checkbox } from "@mui/material";
import { TaskType } from "../App";
import React from "react";
import { Editable } from "./Editable";
import DeleteIcon from "@mui/icons-material/Delete";

export type TaskPropsType = {
  task: TaskType;
  id: string;
  deleteTask: (id: string) => void;
  changeTaskTitle: (title: string, id: string) => void;
  changeChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Task: React.FC<TaskPropsType> = React.memo((props) => {
  return (
    <li key={props.task.id}>
      <Checkbox
        checked={props.task.isDone}
        onChange={(e) => props.changeChecked(e)}
      />
      <Editable
        deleteItem={(id: string) => props.deleteTask(id)}
        id={props.task.id}
        title={props.task.title}
        changeItem={(title: string) =>
          props.changeTaskTitle(title, props.task.id)
        }
      />
      <Button onClick={() => props.deleteTask(props.task.id)}>
        <DeleteIcon />
      </Button>
    </li>
  );
});
