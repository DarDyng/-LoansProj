import { GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../../store/store";
import { google, handleAuth } from "../../store/features/authSlice";

const Google = () => {
    const dispatch = useAppDispatch();

    return <GoogleLogin
    theme={"outline"}
    size={"medium"}
    shape={"pill"}
    logo_alignment={"center"}
    locale={"en_US"}
    onSuccess={(resposne) => {
        if (resposne.credential) {
            dispatch(google({IdToken: resposne.credential}))
            dispatch(handleAuth());
        }
    }}
    onError={() => {
        console.log("Error")
    }}/>
};

export default Google;