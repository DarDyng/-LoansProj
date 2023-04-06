import { Form } from "react-bootstrap";
import AuthForm from "../components/auth/AuthForm";

const LoginPage = () => {
    return <>
        <div className="">

            <h2>Login page</h2>
            <AuthForm model={{email: "", password: ""}} onSubmit={(values) => {
                console.log(values);
            }}/>
        </div>
    </>
};

export default LoginPage;