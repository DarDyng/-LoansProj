import { Form, Formik, FormikHelpers } from "formik";
import { registerCredentionals, userCredentionals } from "./auth-models";
import * as Yup from "yup";
import TextField from "../forms/TextField";
import { Link, useNavigation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Google from "./Google";
import { useAppSelector } from "../../store/store";

const RegisterForm = (props: RegisterFormProps) => {
    const isLoading = useAppSelector(state => state.auth.loading)
    return <>
        <div>
            <div className="social-logins">
                <GoogleOAuthProvider
                    clientId="751194953100-ir5sfu1kssme9p9sh9a5m6cls66n99uu.apps.googleusercontent.com">
                    <Google />
                </GoogleOAuthProvider>
            </div>
            <Formik
                initialValues={props.model}
                onSubmit={props.onSubmit}
                validationSchema={
                    Yup.object({
                        email: Yup.string().required("This field is required")
                            .email("You have to insert valid email"),
                        password: Yup.string().required("This field is required"),
                        username: Yup.string().required("This field is required!")
                    })
                }>
                {(formikPorps) => {
                    return <>
                        <Form>
                            <TextField displayField="Email" field="email" />
                            <TextField displayField="Username" field="username" type={"text"} />
                            <TextField displayField="Password" field="password" type={"password"} />

                            <div className="mt-3 d-flex gap-2">
                                <button className="btn btn-primary" disabled={isLoading} type="submit">Send</button>
                                <Link className="btn btn-secondary" to={"/"}>Cancel</Link>
                            </div>
                        </Form>
                    </>
                }}
            </Formik>
        </div>
    </>
}

export default RegisterForm;

interface RegisterFormProps {
    model: registerCredentionals;
    onSubmit(values: registerCredentionals, actions: FormikHelpers<registerCredentionals>): void;
}   