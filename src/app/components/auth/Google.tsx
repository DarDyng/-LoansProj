import { GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../../store/store";
import { google, handleAuth } from "../../store/features/authSlice";
import { useContext } from "react";
import { AuthContextErrorHandler } from "../contexts/AuthContextErrorHandler";
import { useNavigate } from "react-router";

const Google = () => {
    const dispatch = useAppDispatch();
    const {errors, setErrors }= useContext(AuthContextErrorHandler);
    
    const navigate = useNavigate();

    return <GoogleLogin
    theme={"outline"}
    size={"medium"}
    shape={"pill"}
    logo_alignment={"center"}
    locale={"en_US"}
    onSuccess={(resposne) => {
        if (resposne.credential) {
            dispatch(google({IdToken: resposne.credential})).unwrap().then(
                res => {
                    navigate("/");
                },
                rej => {
                    console.log("In google error!!!", rej);
                    setErrors([...rej]);                    
                })
            dispatch(handleAuth());
        }
    }}
    onError={() => {
        console.log("Error")
    }}/>
};

export default Google;