import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { login } from "../../store/features/authSlice";
import { useEffect, useState } from "react";
import authHeader from "../../services/auth-header";
import DisplayErrors from "../forms/DisplayErrors";

export interface LoginFormValues {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [errors, setErrors] = useState<string[]>([]);

    const auth = useAppSelector(state => state.auth);

    const handleLogin = (formValue: LoginFormValues) => {
        const { password, email: email } = formValue;
        dispatch(login({ Password: password, Email: email })).unwrap().then(
            (res) => {
                console.log("Okey in login", res);
                if (errors.length > 0) {
                    setErrors([]);
                }
                navigate("/");
            },
            (err) => {
                setErrors(err);
            }
        );
    }

    return <>
        <div className="m-3">
            <h3>Login</h3>
            <DisplayErrors erorrs={errors} />
            <LoginForm model={{ email: "", password: "" }}
                onSubmit={(values) => handleLogin({ email: values.email, password: values.password })} />
        </div>
    </>
};

export default Login;