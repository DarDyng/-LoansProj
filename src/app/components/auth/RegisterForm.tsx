import { Form, Formik, FormikHelpers } from "formik";
import { registerCredentionals, userCredentionals } from "./auth-models";
import * as Yup from "yup";
import TextField from "../forms/TextField";
import { Link, useNavigation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Google from "./Google";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { clearErrors } from "../../store/features/authSlice";
import Socials from "./Socials";
import PasswordField from "../forms/PasswordField";
import { useState } from "react";

const RegisterForm = (props: RegisterFormProps) => {
    const isLoading = useAppSelector(state => state.auth.loading)
    return <>
        <div>
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
                            <PasswordField />
                            <div className="m-2">
                                <p className="text-center">or sign in with:</p>
                                <Socials />
                            </div>
                            <div className="mt-3 d-flex flex-column gap-2">
                                <button className="btn btn-primary" disabled={isLoading} type="submit">Register</button>
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