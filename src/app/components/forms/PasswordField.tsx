import { FormCheck } from "react-bootstrap";
import TextField from "./TextField";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import React, { useState } from "react";

const PasswordField = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setShowPassword(e.target.checked);

    return <>
        <TextField displayField="Password" field="password" type={showPassword ? "text" : "password"} />
        <FormCheck>
            <FormCheckInput onChange={handleChange}/>
            <FormCheckLabel>Show password?</FormCheckLabel>
        </FormCheck>
        
    </>
};

export default PasswordField;