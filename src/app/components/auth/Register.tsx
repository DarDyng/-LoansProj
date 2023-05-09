import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { clearErrors, register } from "../../store/features/authSlice";
import { useContext, useEffect, useState } from "react";
import DisplayErrors from "../forms/DisplayErrors";
import { registerCredentionals } from "./auth-models";
import DisplaySuccess from "../forms/DisplaySuccess";
import classes from "./Register.module.css";
import { AuthContextErrorHandler } from "../contexts/AuthContextErrorHandler";

const Register = () => {
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const [successMessage, setSuccessMessage] = useState<string | undefined>();
    const navigate = useNavigate();
    const { errors, setErrors, clearError } = useContext(AuthContextErrorHandler);

    useEffect(() => {
        clearError();
    }, []);


    const handleRegister = (values: registerCredentionals) => {
        dispatch(clearErrors());
        dispatch(register({ Email: values.email, Username: values.username, Password: values.password })).unwrap().then(
            (res) => {
                setSuccessMessage(res)
                console.log("Okey in login", res);
                if (errors.length > 0) {
                    setErrors([]);
                }
                navigate("/");
            },
            (err) => {
                setSuccessMessage(undefined);
                setErrors(err);
            }
        );
    }

    return <>
        <div className="m-2">
            <h3 className="text-center">Register form</h3>
            <DisplaySuccess message={successMessage} />
            <DisplayErrors erorrs={errors} />
            <RegisterForm model={{ email: "", password: "", username: "" }}
                onSubmit={handleRegister} ></RegisterForm>
        </div>
    </>
};

export default Register;