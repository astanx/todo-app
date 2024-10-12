import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export type EditablePropsType = {
  title: string;
  id?: string;
  task?: boolean
  changeItem: (title: string, id: string) => void;
  deleteItem: (id: string) => void;
};
type EditableFormType = {
  title: string;
};

export const Editable: React.FC<EditablePropsType> = React.memo((props) => {
  const [isEditing, setIsEditing] = useState(false);

  const { handleSubmit, register } = useForm<EditableFormType>({
    defaultValues: {
      title: props.task ? '' : props.title,
    },
  });

  const submit = (data: EditableFormType) => {
    if (data.title) {
      props.changeItem(data.title, props.id || "");
    } else {
      props.deleteItem(props.id || "");
    }

    setIsEditing(false);
  };

  return isEditing ? (
    <form onSubmit={handleSubmit(submit)}>
      <TextField
        {...register("title")}
        autoFocus
        onBlur={handleSubmit(submit)}
        sx={{
          flexGrow: 1,
          whiteSpace: "normal",
          display: "block",
          wordWrap: "break-word",
          maxWidth: "200px",
        }}
      />
    </form>
  ) : (
    <Box
      onDoubleClick={() => setIsEditing(true)}
      sx={{
        whiteSpace: "normal",
        display: "block",
        wordWrap: "break-word",
        maxWidth: "200px",
      }}
    >
      {props.title}
    </Box>
  );
});
