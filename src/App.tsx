import React, { useCallback, useEffect } from "react";
import Todolist from "./Todolist/Todolist";

import {
  TodoListActionsType,
  actions,
  auth,
  setTodoLists,
} from "./state/todolistReducer";
import { useSelector, useDispatch } from "react-redux";

import { AddItemForm } from "./AddItemForm";
import { AppStateType } from "./state/store";
import { ThunkDispatch } from "redux-thunk";

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
  const deleteTodoList = useCallback(
    (todoListId: string) => {
      dispatch(actions.removeTodolistAC(todoListId));
    },
    [dispatch]
  );

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(actions.addTodoListAC(title));
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
      dispatch(actions.changeTodoListTitleAC(todoListId, title));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(auth());
    if (isAuth) {
      dispatch(setTodoLists());
    }
  }, [isAuth]);
  

  return isFetching ? (
    <div>loading</div>
  ) : (
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

export default React.memo(App);
