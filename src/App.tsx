import React, { useCallback, useEffect } from "react";
import Todolist from "./Todolist/Todolist";

import {
  TodoListActionsType,
  actions,
  addTodoList,
  auth,
  deleteTodoList,
  getTasks,
  setTodoLists,
} from "./state/todolistReducer";
import { useSelector, useDispatch } from "react-redux";

import { AddItemForm } from "./AddItemForm";
import { AppStateType } from "./state/store";
import { ThunkDispatch } from "redux-thunk";
import { TaskType, TodoListType } from "./api/todolistApi";

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
      dispatch(actions.changeTodoListTitleAC(todoListId, title));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isAuth){
    dispatch(auth());
    }
    if (isAuth) {
      dispatch(setTodoLists());
    }
  }, [isAuth]);
  

  return isFetching ? (
    <div>loading</div>
  ) : (
    <div className="App">
      <AddItemForm addItem={addTodoListCallBack} />
      {todoLists.map((tl: TodoListType) => {
        return (
          <Todolist
            changeTitle={changeTitle}
            deleteTodoList={deleteTodoListCallBack}
            setFilter={setFilter}
            key={tl.id}
            id={tl.id}
            title={tl.title}
            filter={tl.filter || 'all'}
          />
        );
      })}
    </div>
  );
}

export default React.memo(App);
