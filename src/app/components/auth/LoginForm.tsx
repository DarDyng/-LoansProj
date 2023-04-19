import { Form, Formik, FormikHelpers } from "formik";
import { userCredentionals } from "./auth-models";
import * as Yup from "yup";
import TextField from "../forms/TextField";
import { Link, useNavigation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Google from "./Google";
import { useAppSelector } from "../../store/store";
import { IModelErrors } from "../../store/features/authSlice";
import Socials from "./Socials";
import PasswordField from "../forms/PasswordField";

const LoginForm = (props: authFormProps) => {
    const { loading, errors: error, modelErrors } = useAppSelector(state => state.auth)

    return <>
        <div>
            <Formik
                initialValues={props.model}
                onSubmit={props.onSubmit}
                validationSchema={
                    Yup.object({
                        email: Yup.string().required("This field is required")
                            .email("You have to insert valid email"),
                        password: Yup.string().required("This field is required")
                    })
                }>
                {(formikPorps) => {
                    return <>
                        <Form>
                            <div className="m-1">
                                <TextField displayField="Email" field="email" />
                            </div>
                            <div className="m-1">
                                <PasswordField />
                            </div >
                            <div className="m-2 text-center">
                                <p>Not a member? <Link style={{ color: "blue" }} to={"/register"}>Register</Link></p>
                                <p>or sign in with:</p>
                                <Socials />
                            </div>
                            <div className="mt-3 d-flex flex-column gap-2">
                                <button className="btn btn-primary" disabled={loading} type="submit">Login</button>
                                <Link className="btn btn-secondary" to={"/"}>Cancel</Link>
                            </div>
                        </Form>
                    </>
                }}
            </Formik>
        </div>
    </>
}

export default LoginForm;

interface authFormProps {
    model: userCredentionals;
    onSubmit(values: userCredentionals, actions: FormikHelpers<userCredentionals>): void;
}   