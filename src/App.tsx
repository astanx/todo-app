import React, { useCallback, useEffect } from "react";
import Todolist from "./Todolist/Todolist";
import {
  TodoListActionsType,
  actions,
  addTodoList,
  deleteTodoList,
  reorderTodoList,
  setTodoLists,
  updateTodoListTitle,
} from "./state/todolistReducer";
import { useSelector, useDispatch } from "react-redux";
import { AddItemForm } from "./AddItemForm";
import { AppStateType } from "./state/store";
import { ThunkDispatch } from "redux-thunk";
import { TaskType, TodoListType } from "./api/todolistApi";
import { Box } from "@mui/material";
import Preloader from "./UI/Preloader/Preloader";
import { auth } from "./state/loginReducer";
import Login from "./Login/Login";
import { useNavigate } from "react-router-dom";

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
    (state) => state.login.isAuth
  );

  const dispatch: ThunkDispatch<AppStateType, void, TodoListActionsType> =
    useDispatch();
  const navigate = useNavigate();

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
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  return isFetching ? (
    <Preloader />
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
          const reorderTodoListLeft = () => {
            const todoIndex = todoLists.findIndex(
              (todo: TodoListType) => tl.id === todo.id
            );
            if (todoIndex - 1 >= 0) {
              dispatch(reorderTodoList(tl.id, todoLists[todoIndex - 1].id));
            }
          };
          const reorderTodoListRight = () => {
            const todoIndex = todoLists.findIndex(
              (todo: TodoListType) => tl.id === todo.id
            );
            if (todoIndex + 1 < todoLists.length) {
              dispatch(reorderTodoList(tl.id, todoLists[todoIndex + 1].id));
            }
          };
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
                reorderTodoListRight={reorderTodoListRight}
                reorderTodoListLeft={reorderTodoListLeft}
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
