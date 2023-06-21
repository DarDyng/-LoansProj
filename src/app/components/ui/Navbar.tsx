import { useEffect, useRef, useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import authService from "../../services/auth-service";
import { logout } from "../../store/features/authSlice";


function Navigation() {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const linkStyle = {
    color: isHovered ? 'orange' : 'white'
  };

  const auth = useAppSelector(state => state.auth);
  const [email, setEmail] = useState<string>("");

  const navRef = useRef<HTMLElement>(null);
  const [showNavbarState, setShowNavbar] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const showNavbar = () => {

    navRef.current?.classList.toggle(
      "responsive_nav"
    );
    setShowNavbar(!showNavbarState);

  };

  useEffect(() => {
    console.log("User info in navigation ", auth.userInfo);
    setEmail(auth.userInfo?.email!);
  }, [auth.userInfo])

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
        <Nav.Link href="#"  onClick={() => window.open("https://t.me/dardyng", "_blank")}         
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={linkStyle}>
           Dmytro Serafym  
        </Nav.Link>
        </Nav>


        <Navbar.Brand> <Link to={"/"} style={{ fontFamily: "Arial, sans-serif", fontSize: "24px", fontWeight: "bold" }}>   Loan Portfolio
          </Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><NavLink to={"/"}>Home</NavLink></Nav.Link>
            <Nav.Link><NavLink to={"/about"}>About</NavLink></Nav.Link>
            <Nav.Link><NavLink to={"/statistic"}>Statistic</NavLink></Nav.Link>
          </Nav>
          <Nav>
            {auth.isLoggedIn ?
              <>
                <Nav.Link>Hello, {auth.userInfo?.email ?? "User"}</Nav.Link>
                <Nav.Link onClick={() => dispatch(logout())}>Logout</Nav.Link>
              </>
              :
              <>
                <Nav.Link><Link to={"/login"}>Login</Link></Nav.Link>
                <Nav.Link><Link to={"/register"}>Sign Up</Link></Nav.Link>
              </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;