import { useRef, useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function Navigation() {
    const navRef = useRef<HTMLElement>(null);
    const [showNavbarState, setShowNavbar] = useState<boolean>(true);

    const showNavbar = () => {
        navRef.current?.classList.toggle(
            "responsive_nav"
        );
        setShowNavbar(!showNavbarState);

    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><Link to={"/"}>Credit App</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link><NavLink to={"/"}>Home</NavLink></Nav.Link>
              <Nav.Link><NavLink to={"/about"}>About</NavLink></Nav.Link>
              <Nav.Link><NavLink to={"/statistics"}>Statistic</NavLink></Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets"><Link to={"/login"}>Login</Link></Nav.Link>
              <Nav.Link href="#deets"><Link to={"/register"}>Sign Up</Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default Navigation;