import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import NotAllowedPage from "../UI/NotAllowedPage";
import AuthContext from "./auth-context";


const ProtectedRoutes = (props: protectedRouteProps) => {
    const context = useContext(AuthContext);

    const isAdmin = () => {
        return context.claims.findIndex(x => x.name === "role" && x.value === "admin") > -1;
    };

    const isUser = () => {
        return context.claims.findIndex(x => x.name === "role" && x.value === "user") > -1;
    }

    const isAdminRes = isAdmin();
    const isUserRes = isUser();

    if (props.isAnyAuthUser) {
        if (isUserRes) {
            return <Outlet />;
        }
        else {
            return <Navigate to={"/login"} />
        }
    }
    else {
        if (isAdminRes) {
            return <Outlet />
        }
        else if (!isAdminRes && isUserRes) {
            return <NotAllowedPage />
        }
        else {
            return <Navigate to={"/login"} />
        }
    }
};

interface protectedRouteProps {
    isAdmin: boolean;
    isAnyAuthUser: boolean;
};

export default ProtectedRoutes;