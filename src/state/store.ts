import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todoListReducer } from "./todolistReducer";
import { loginReducer } from "./loginReducer";

const RootReducer = combineReducers({
  todoLists: todoListReducer,
  login: loginReducer,
});

type RootReducerType = typeof RootReducer;
export type AppStateType = ReturnType<RootReducerType>;
export type InferActionsTypes<T> = T extends { [key: string]: infer U }
  ? U extends (...args: any[]) => infer A
    ? A
    : never
  : never;
const store = configureStore({ reducer: RootReducer });

export default store;
