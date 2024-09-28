import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todoListReducer } from "./todolistReducer";

const rootReducer = combineReducers({
  todoLists: todoListReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>

const store = configureStore({ reducer: rootReducer });

export default store;
