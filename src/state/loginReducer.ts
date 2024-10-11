import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./store.js";
import { todoListApi } from "../api/todolistApi";

export type InitialStateType = typeof initialState;

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
};

export const loginReducer = (
  state = initialState,
  action: LoginActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export type LoginActionsTypes = InferActionsTypes<typeof actions>;
export type ThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  LoginActionsTypes
>;
export const actions = {
  authAC: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: "LOGIN",
      data: { userId, email, login, isAuth },
    } as const),
};

export const auth = (): ThunkType => (dispatch) => {
  return todoListApi.auth().then((response) => {
    if (response.data.resultCode === 0) {
      const { id, login, email } = response.data.data;
      dispatch(actions.authAC(id, email, login, true));
    }
  });
};

export const logout = (): ThunkType => async (dispatch) => {
  const response = await todoListApi.logout();

  dispatch(actions.authAC(null, null, null, false));
};
export const login =
  (data: { email: string; password: string; rememberMe: boolean }): ThunkType =>
  (dispatch) => {
    return todoListApi.login(data.email, data.password, data.rememberMe);
  };
