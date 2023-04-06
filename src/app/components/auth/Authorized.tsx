import { useContext, useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import AuthContext from "./auth-context";

const Authorized = (props: authorizedProps) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const { claims } = useContext(AuthContext);

    useEffect(() => {
        if (props.role) {
            const index = claims.findIndex(claim =>
                claim.name === "role" && claim.value === props.role);
            setIsAuthorized(index > -1);
        }
        else{
            setIsAuthorized(claims.length > 0);
        }
    }, [claims, props.role]);

    return <>
        {isAuthorized ? props.authorized : props.nonAuthorized}
    </>
};

interface authorizedProps {
    authorized: ReactElement,
    nonAuthorized?: ReactElement,
    role?: string
};

export default Authorized;