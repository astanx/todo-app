import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  actions,
  addTask,
  deleteTask,
  TodoListActionsType,
  updateTask,
} from "../state/todolistReducer";
import { Editable } from "./Editable";
import { Task } from "./Task";
import { AddItemForm } from "../AddItemForm";
import { AppStateType } from "../state/store";
import { ThunkDispatch } from "redux-thunk";
import { TaskType } from "../api/todolistApi";
import {
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  Checkbox,
  Box,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FilterType } from "../App";

export type TodoPropsType = {
  id: string;
  title: string;
  filter: FilterType;
  setFilter: (filter: FilterType, todoListId: string) => void;
  deleteTodoList: (todoListId: string) => void;
  changeTitle: (title: string, todoListId: string) => void;
};

const Todolist: React.FC<TodoPropsType> = React.memo((props) => {
  const dispatch: ThunkDispatch<AppStateType, void, TodoListActionsType> =
    useDispatch();

  const tasks =
    useSelector<AppStateType, Array<TaskType>>(
      (state) => state.todoLists.tasks[props.id]
    ) || [];

  let filteredTasks = tasks;

  if (props.filter === "active") {
    filteredTasks = filteredTasks.filter((task) => !!!task.status);
  }
  if (props.filter === "completed") {
    filteredTasks = filteredTasks.filter((task) => !!task.status);
  }

  const addTaskCallBack = useCallback(
    (title: string) => dispatch(addTask(props.id, title)),
    [dispatch, props.id]
  );

  const changeTaskTitle = useCallback(
    (id: string, task: TaskType) => dispatch(updateTask(task, props.id, id)),
    [dispatch, props.id]
  );

  const deleteTaskCallBack = useCallback(
    (id: string) => dispatch(deleteTask(props.id, id)),
    [dispatch, props.id]
  );

  return (
    <Box sx={{ width: "100%", maxWidth: 360, margin: "16px" }}>
      {" "}
      {/* Используйте Box для задания максимальной ширины и отступов */}
      <Card variant="outlined">
        <CardContent>
          <Editable
            deleteItem={props.deleteTodoList}
            changeItem={props.changeTitle}
            title={props.title}
            id={props.id}
          />
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => props.deleteTodoList(props.id)}
          >
            Delete
          </Button>
          <AddItemForm addItem={addTaskCallBack} />

          <List>
            {filteredTasks.map((task) => {
              const changeChecked = (e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(
                  updateTask(
                    { ...task, status: e.target.checked ? 1 : 0 },
                    props.id,
                    task.id
                  )
                );


              return (
                <ListItem key={task.id}>
                  <Checkbox
                    checked={!!task.status}
                    onChange={changeChecked}
                    color="primary"
                  />
                  <Task
                    id={props.id}
                    task={task}
                    deleteTask={(id: string) => deleteTaskCallBack(id)}
                    changeTaskTitle={(title: string) =>
                      changeTaskTitle(task.id, { ...task, title })
                    }
                  />
                </ListItem>
              );
            })}
          </List>

          <Stack direction="row" spacing={1} justifyContent="flex-start">
            {" "}
            {/* Используйте Stack для компоновки кнопок */}
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
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
});

export default Todolist;
