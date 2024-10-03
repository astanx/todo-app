import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import React from "react";

export type AddItemFormPropsType = {
  addItem: (title: string) => void;
};
export type AddItemFormType = {
  title: string;
};

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(
  ({ addItem }) => {
    const {
      handleSubmit,
      register,
      reset,
      formState: { errors },
    } = useForm<AddItemFormType>();

    const submit = (data: AddItemFormType) => {
      if (data.title.trim()) {
        addItem(data.title);
        reset();
      }
    };

    return (
      <form onSubmit={handleSubmit(submit)}>
        <TextField
          error={!!errors.title}
          {...register("title", { required: true })}
        />
        <Button type="submit">
          <AddIcon />
        </Button>
      </form>
    );
  }
);
