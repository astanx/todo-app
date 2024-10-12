import { ResponseType, intence } from "./todolistApi";

export type AuthAPIType = ResponseType<{
    id: number;
    email: string;
    login: string;
  }>;
export type LoginAPIType = ResponseType<{ userId: number }>;
export const loginAPI = {
    auth: () => {
      return intence.get<AuthAPIType>(`auth/me`);
    },
    login: (
      email: string,
      password: string,
      rememberMe: boolean = false,
      captcha: string | null
    ) => {
      return intence.post<LoginAPIType>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      });
    },
    logout: () => {
      return intence.post<ResponseType<{}>>(`auth/logout`);
    },
    getCaptcha: () => {
      return intence.get(`security/get-captcha-url`);
    },
  };
  