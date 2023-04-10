import { Form, Formik, FormikHelpers } from "formik";
import { userCredentionals } from "./auth-models";
import * as Yup from "yup";
import TextField from "../forms/TextField";
import { Link, useNavigation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Google from "./Google";
import { useAppSelector } from "../../store/store";
import { IModelErrors } from "../../store/features/authSlice";

const AuthForm = (props: authFormProps) => {
    const { loading, error, modelErrors } = useAppSelector(state => state.auth)

    return <>
        <div>
            {modelErrors && <>
                <ul>
                    {/* {modelErrors?.map(x => x.errors?.map(error => <li key={x.name + x.errors.length}>
                        {error}
                    </li>))} */}
                    {error?.map(x => <li key={x}>
                        {x}
                    </li>)}
                </ul>
            </>}
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
                        password: Yup.string().required("This field is required")
                    })
                }>
                {(formikPorps) => {
                    return <>
                        <Form>
                            <TextField displayField="Email" field="email" />
                            <TextField displayField="Password" field="password" type={"password"}></TextField>

                            <div className="mt-3 d-flex gap-2">
                                <button className="btn btn-primary" disabled={loading} type="submit">Send</button>
                                <Link className="btn btn-secondary" to={"/"}>Cancel</Link>
                            </div>
                        </Form>
                    </>
                }}
            </Formik>
        </div>
    </>
}

export default AuthForm;

interface authFormProps {
    model: userCredentionals;
    onSubmit(values: userCredentionals, actions: FormikHelpers<userCredentionals>): void;
}   