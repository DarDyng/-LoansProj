import axios from "axios";
import { useState } from "react";
import { urlAccounts } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import AuthContext from "./auth-context";
import { authenticationResponse, userCredentionals } from "./auth-models";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./handleJwt";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    async function login(credentials: userCredentionals) {
        try {
            const response = await axios
                .post<authenticationResponse>(`${urlAccounts}/login`, credentials);
            saveToken(response.data);
            ctx.update(getClaims());
            navigate("/");
            console.log(response.data);
        } catch (error: any) {
            if (error.response.data) {
                setErrors(error.response.data);
            }
        }
    }

    return <>
        <h3>Login</h3>
        <DisplayErrors errors={errors} />
        <AuthForm model={{ email: "", password: "" }}
            onSubmit={async (values) => {
                await login(values);
            }}></AuthForm>
    </>
};

export default Login;