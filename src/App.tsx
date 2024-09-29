import React, { useCallback } from "react";
import Todolist from "./Todolist/Todolist";

import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  addTodoListAC,
  changeTodoListTitleAC,
  removeTodolistAC,
  updateTodolistFilterAC,
} from "./state/todolistReducer";
import { useSelector, useDispatch } from "react-redux";
import { AppRootStateType } from "./state/store";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type StateTasksType = {
  [key: string]: Array<TaskType>;
};

export type FilterType = "all" | "completed" | "active";

export type TodoListType = {
  title: string;
  id: string;
  filter: FilterType;
};

function App() {
  console.log("APP");

  const todoLists = useSelector<AppRootStateType, TodoListType[]>(
    (state) => state.todoLists.todoLists
  );

  const dispatch = useDispatch();

  const deleteTodoList = useCallback((todoListId: string) => {
    dispatch(removeTodolistAC(todoListId));
  },[]);

  const addTodoList = useCallback((title: string) => {
    dispatch(addTodoListAC(title));
  }, []);

  const setFilter = useCallback((filter: FilterType, todoListId: string) => {
    dispatch(updateTodolistFilterAC(filter, todoListId));
  },[]);

  const changeTitle = useCallback((title: string, todoListId: string) => {
    dispatch(changeTodoListTitleAC(todoListId, title));
  },[]);

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />
      {todoLists.map((tl: TodoListType) => {
        return (
          <Todolist
            changeTitle={changeTitle}
            deleteTodoList={deleteTodoList}
            setFilter={setFilter}
            key={tl.id}
            id={tl.id}
            title={tl.title}
            filter={tl.filter}
          />
        );
      })}
    </div>
  );
}

export type AddItemFormPropsType = {
  addItem: (title: string) => void;
};
export type CreateTodoFormType = {
  title: string;
};

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(
  ({ addItem }) => {
    console.log("ADD ITEM");

    const {
      handleSubmit,
      register,
      reset,
      formState: { errors },
    } = useForm<CreateTodoFormType>();

    const submit = (data: CreateTodoFormType) => {
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

export default React.memo(App);
