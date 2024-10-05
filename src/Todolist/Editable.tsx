import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";

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
          props.deleteItem(props.id || "");
        }

        setIsEditing(false);
      }}
      onChange={(e) => setTitle(e.target.value)}
      value={title}
      sx={{ flexGrow: 1 }}
    />
  ) : (
    <Typography
      onDoubleClick={() => setIsEditing(true)}
      sx={{
        whiteSpace: 'normal', // Разрешить перенос текста
        display: 'block', // Устанавливаем блок, чтобы текст обрабатывался как блоковый элемент
        wordWrap: 'break-word', // Позволяем словам переноситься
        maxWidth: '200px'
      }}
    >
      {props.title}
    </Typography>
  );
});