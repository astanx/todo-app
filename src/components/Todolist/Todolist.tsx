import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  deleteTask,
  reorderTask,
  TodoListActionsType,
  updateTask,
} from "../../state/todolistReducer";
import { Editable } from "./Editable";
import { Task } from "./Task";
import { AddItemForm } from "../../AddItemForm";
import { AppStateType } from "../../state/store";
import { ThunkDispatch } from "redux-thunk";
import { TaskType } from "../../api/todolistApi";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  Checkbox,
  Box,
  Stack,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FilterType } from "../../App";

export type TodoPropsType = {
  id: string;
  title: string;
  filter: FilterType;
  setFilter: (filter: FilterType, todoListId: string) => void;
  deleteTodoList: (todoListId: string) => void;
  changeTitle: (title: string, todoListId: string) => void;
  reorderTodoListRight: () => void;
  reorderTodoListLeft: () => void;
};

const Todolist: React.FC<TodoPropsType> = React.memo((props) => {
  const dispatch: ThunkDispatch<AppStateType, void, TodoListActionsType> =
    useDispatch();
  const [filter, setFilter] = useState("");
  const [filterDirection, setFilterDirection] = useState("down");
  const tasks =
    useSelector<AppStateType, Array<TaskType>>(
      (state) => state.todoLists.tasks[props.id]
    ) || [];
  const handleFilterChange = (e: SelectChangeEvent) => {
    setFilter(e.target.value);
  };
  const setFilterDirectionUp = () => {
    setFilterDirection("up");
  };
  const setFilterDirectionDown = () => {
    setFilterDirection("down");
  };

  let filteredTasks = tasks;

  if (props.filter === "active") {
    filteredTasks = filteredTasks.filter((task) => !!!task.status);
  }
  if (props.filter === "completed") {
    filteredTasks = filteredTasks.filter((task) => !!task.status);
  }
  if (filter === "priority") {
    filteredTasks = filteredTasks.sort((task1, task2) =>
      filterDirection === "up"
        ? task1.priority - task2.priority
        : task2.priority - task1.priority
    );
  }
  if (filter === "date") {
    filteredTasks = filteredTasks.sort((task1, task2) => {
      const addedDate1 =
        task1.addedDate && typeof task1.addedDate === "object"
          ? task1.addedDate.getTime()
          : Date.parse(task1.addedDate);
      const addedDate2 =
        task2.addedDate && typeof task2.addedDate === "object"
          ? task2.addedDate.getTime()
          : Date.parse(task2.addedDate);

      return filterDirection === "up"
        ? addedDate1 - addedDate2
        : addedDate2 - addedDate1;
    });
  }
  if (filter === "deadline") {
    filteredTasks = filteredTasks.sort((task1, task2) => {
      const deadline1 =
        task1.deadline && typeof task1.deadline === "object"
          ? task1.deadline.getTime()
          : Date.parse(task1.deadline);
      const deadline2 =
        task2.deadline && typeof task2.deadline === "object"
          ? task2.deadline.getTime()
          : Date.parse(task2.deadline);

      return filterDirection === "up"
        ? deadline1 - deadline2
        : deadline2 - deadline1;
    });
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
      <Card variant="outlined">
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <IconButton onClick={props.reorderTodoListLeft}>
              <ArrowBackIcon />
            </IconButton>
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
            <IconButton onClick={props.reorderTodoListRight}>
              <ArrowForwardIcon />
            </IconButton>
          </Box>
          <Box display={"flex"}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Filter"
                onChange={handleFilterChange}
                value={filter}
              >
                <MenuItem value={"priority"}>Priotiry</MenuItem>
                <MenuItem value={"deadline"}>Deadline</MenuItem>
                <MenuItem value={"date"}>Added Date</MenuItem>
              </Select>
            </FormControl>
            <IconButton onClick={setFilterDirectionUp}>
              <ArrowUpwardIcon />
            </IconButton>
            <IconButton onClick={setFilterDirectionDown}>
              <ArrowDownwardIcon />
            </IconButton>
          </Box>

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
              const reorderTaskLeft = () => {
                const taskIndex = tasks.findIndex(
                  (t: TaskType) => t.id === task.id
                );
                if (taskIndex - 1 >= 0) {
                  dispatch(
                    reorderTask(props.id, task.id, tasks[taskIndex - 1].id)
                  );
                }
              };
              const reorderTaskRight = () => {
                const taskIndex = tasks.findIndex(
                  (t: TaskType) => t.id === task.id
                );
                if (taskIndex + 1 < tasks.length) {
                  dispatch(
                    reorderTask(props.id, task.id, tasks[taskIndex + 1].id)
                  );
                }
              };
              return (
                <ListItem key={task.id}>
                  <Checkbox
                    checked={!!task.status}
                    onChange={changeChecked}
                    color="primary"
                  />
                  <Task
                    reorderTaskLeft={reorderTaskLeft}
                    reorderTaskRight={reorderTaskRight}
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
