import { GoogleOAuthProvider } from "@react-oauth/google";
import Google from "./Google";

const Socials = () => {
    return <>
        <div className="d-flex justify-content-center">
            <GoogleOAuthProvider
                clientId="29960840310-u61pkhacq5ug6feqhrteinabb4qqgcn6.apps.googleusercontent.com">
                <Google />
            </GoogleOAuthProvider>
        </div>
    </>
};

export default Socials;