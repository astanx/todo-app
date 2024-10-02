import { TextField } from "@mui/material";
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
    />
  ) : (
    <span onDoubleClick={() => setIsEditing(true)}>{props.title}</span>
  );
});
