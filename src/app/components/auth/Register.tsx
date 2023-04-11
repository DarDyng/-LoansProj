import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { clearErrors, register } from "../../store/features/authSlice";
import { useEffect } from "react";
import DisplayErrors from "../forms/DisplayErrors";

const Register = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);

    return <>
        <h3>Welcome to the site!</h3>
        <h3>Register</h3>
        <DisplayErrors />
        <RegisterForm model={{ email: "", password: "", username: "" }}
            onSubmit={async (values) => {
                dispatch(clearErrors());
                dispatch(register({ Email: values.email, Username: values.username, Password: values.password }));
            }} ></RegisterForm>
    </>
};

export default Register;