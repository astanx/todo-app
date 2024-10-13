import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import classes from "./Login.module.css";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { AppStateType } from "../../state/store";
import { ThunkDispatch } from "redux-thunk";
import { TodoListActionsType } from "../../state/todolistReducer";
import { useDispatch } from "react-redux";
import { auth, getCaptcha, login } from "../../state/loginReducer";
import { ResultCode } from "../../api/todolistApi";
import { LoginAPIType } from "../../api/loginApi";

type FormValuesType = {
  email: string;
  password: string;
  captcha: string;
  rememberMe: boolean;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [captchaVisible, setCaptchaVisible] = useState(false);
  const captcha =
    useSelector<AppStateType, string | null>((state) => state.login.captcha) ||
    "";
  const [serverError, setServerError] = useState<string | null>(null);
  const isAuth = useSelector<AppStateType, boolean>(
    (state) => state.login.isAuth
  );
  const dispatch: ThunkDispatch<AppStateType, void, TodoListActionsType> =
    useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>();

  useEffect(() => {
    if (isAuth) {
      navigate("/profile");
    }
  }, [isAuth, navigate]);

  const submit = async (data: FormValuesType) => {
    setServerError(null);

    try {
      const response = (await dispatch(login(data))) as unknown as LoginAPIType;

      if (response.data.resultCode === ResultCode.Success) {
        dispatch(auth());
        navigate("/profile");
      } else if (response.data.resultCode === ResultCode.Error) {
        setServerError("Wrong data. Try again.");
      } else if (response.data.resultCode === ResultCode.RequiredCaptcha) {
        setCaptchaVisible(true);
        dispatch(getCaptcha());
      }
    } catch (error) {
      setServerError("An error occurred");
    }
  };

  return (
    <div className={classes.content}>
      <h3>Login</h3>
      <form className={classes.form} onSubmit={handleSubmit(submit)}>
        <TextField
          error={!!errors.email}
          label="Email"
          variant="outlined"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className={classes.error}>This field is required</p>
        )}

        <TextField
          error={!!errors.password}
          label="Password"
          variant="outlined"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className={classes.error}>This field is required</p>
        )}

        <FormGroup>
          <FormControlLabel
            label="Remember me"
            control={<Checkbox {...register("rememberMe")} />}
          />
        </FormGroup>
        {captchaVisible && (
          <div className={classes.captcha}>
            <img src={captcha} alt="Captcha" />
            <TextField
              error={!!errors.captcha}
              label="Captcha"
              variant="outlined"
              {...register("captcha", { required: true })}
            />
            {errors.captcha && (
              <p className={classes.error}>This field is required</p>
            )}
          </div>
        )}
        {serverError && <p className={classes.error}>{serverError}</p>}

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
