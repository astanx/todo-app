import React, { useCallback, useEffect } from "react";
import Todolist from "./Todolist/Todolist";
import {
  TodoListActionsType,
  actions,
  addTodoList,
  auth,
  deleteTodoList,
  setTodoLists,
  updateTodoListTitle,
} from "./state/todolistReducer";
import { useSelector, useDispatch } from "react-redux";
import { AddItemForm } from "./AddItemForm";
import { AppStateType } from "./state/store";
import { ThunkDispatch } from "redux-thunk";
import { TaskType, TodoListType } from "./api/todolistApi";
import { Box } from "@mui/material";

export type StateTasksType = {
  [key: string]: Array<TaskType>;
};

export type FilterType = "all" | "completed" | "active";

function App() {
  const todoLists = useSelector<AppStateType, TodoListType[]>(
    (state) => state.todoLists.todoLists
  );
  const isFetching = useSelector<AppStateType, boolean>(
    (state) => state.todoLists.isFetching
  );
  const isAuth = useSelector<AppStateType, boolean>(
    (state) => state.todoLists.isAuth
  );

  const dispatch: ThunkDispatch<AppStateType, void, TodoListActionsType> =
    useDispatch();

  const deleteTodoListCallBack = useCallback(
    (todoListId: string) => {
      dispatch(deleteTodoList(todoListId));
    },
    [dispatch]
  );

  const addTodoListCallBack = useCallback(
    (title: string) => {
      dispatch(addTodoList(title));
    },
    [dispatch]
  );

  const setFilter = useCallback(
    (filter: FilterType, todoListId: string) => {
      dispatch(actions.updateTodolistFilterAC(filter, todoListId));
    },
    [dispatch]
  );

  const changeTitle = useCallback(
    (title: string, todoListId: string) => {
      dispatch(updateTodoListTitle(todoListId, title));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isAuth) {
      dispatch(auth());
    }
    if (isAuth) {
      dispatch(setTodoLists());
    }
  }, [isAuth, dispatch]);

  return isFetching ? (
    <div>loading</div>
  ) : (
    <Box sx={{ padding: 2 }}>
      <AddItemForm addItem={addTodoListCallBack} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          marginTop: 2,
        }}
      >
        {todoLists.map((tl: TodoListType) => {
          return (
            <Box
              key={tl.id}
              sx={{
                flex: "1 1 30%",
                minWidth: 300,
                boxShadow: 1,
                borderRadius: 2,
                backgroundColor: "background.paper",
              }}
            >
              <Todolist
                changeTitle={changeTitle}
                deleteTodoList={deleteTodoListCallBack}
                setFilter={setFilter}
                id={tl.id}
                title={tl.title}
                filter={tl.filter || "all"}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default React.memo(App);
