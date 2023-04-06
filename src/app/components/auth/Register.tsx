import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticationResponse, userCredentionals } from "./auth-models";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./handleJwt";

const Register = () => {
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    return <>
        <h3>Welcome to the site!</h3>
        <h3>Register</h3>
        <AuthForm model={{ email: "", password: "" }}
            onSubmit={async (values) => {
                console.log(values);
            }} ></AuthForm>
    </>
};

export default Register;