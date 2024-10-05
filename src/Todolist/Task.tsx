import { Button, Box } from "@mui/material";
import React from "react";
import { Editable } from "./Editable";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskType } from "../api/todolistApi";

export type TaskPropsType = {
  task: TaskType;
  id: string;
  deleteTask: (id: string) => void;
  changeTaskTitle: (title: string, id: string) => void;
};

export const Task: React.FC<TaskPropsType> = React.memo((props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '4px' }}
    >
      <Editable
        deleteItem={props.deleteTask}
        id={props.task.id}
        title={props.task.title}
        changeItem={(title: string) => props.changeTaskTitle(title, props.task.id)}
      />
      <Button onClick={() => props.deleteTask(props.task.id)}>
        <DeleteIcon />
      </Button>
    </Box>
  );
});