import { ErrorMessage, Field } from "formik";

const TextField = (props: textFieldProps) => {
    return <>
        <label htmlFor={props.field}>{props.displayField}</label>
        <Field type={props.type}
        name={props.field} id={props.field} className='form-control'></Field>
        <ErrorMessage name={props.field}>{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
    </>
};

interface textFieldProps {
    field: string;
    displayField: string;
    type: "text" | "password";
}

TextField.defaultProps = {
    type: "text"
};

export default TextField;