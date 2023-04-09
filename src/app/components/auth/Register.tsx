import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { register } from "../../store/features/authSlice";
import { useEffect } from "react";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);
    
    // useEffect(() => {
    //     if (auth.loading === false && !auth.error) {
    //         navigate("/login");
    //     }
    // }, [auth]
    // )
    return <>
        <h3>Welcome to the site!</h3>
        <h3>Register</h3>
        <RegisterForm model={{ email: "", password: "", username: "" }}
            onSubmit={async (values) => {
                dispatch(register({ Email: values.email, Username: values.username, Password: values.password }));
                navigate("/login");
            }} ></RegisterForm>
    </>
};

export default Register;