import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { login } from "../../store/features/authSlice";
import { useEffect } from "react";
import authHeader from "../../services/auth-header";

export interface LoginFormValues {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);

    // useEffect(() => {
    //     if (auth.loading === false && !auth.error) {
    //         navigate("/");
    //     }
    // }, [auth])

    const handleLogin = (formValue: LoginFormValues) => {
        const { password, email: email } = formValue;
        dispatch(login({ Password: password, Email: email }));
    }

    return <>
        <h3>Login</h3>
        <AuthForm model={{ email: "", password: "" }}
            onSubmit={(values) => handleLogin({ email: values.email, password: values.password })} />
    </>
};

export default Login;