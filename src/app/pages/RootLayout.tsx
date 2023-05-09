import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "../components/ui/Navbar";
import Navigation from "../components/ui/Navbar";

const RootLayout = () => {
    return <>
        <header>
            <Navigation />
        </header>
        <Container>
            <div style={{ width: "90%", margin: "auto" }}>
                <Outlet />
            </div>
        </Container>
    </>
};

export default RootLayout;