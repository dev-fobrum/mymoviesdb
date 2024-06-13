import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaHeart, FaUser } from "react-icons/fa";

import Logo from "../Logo/Logo";

import { logout } from "../../store/authSlice";

import "./styles.css";

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, lastName } = useSelector(
    (state: any) => state.auth.credentials
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container className="navbar-container" fluid>
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="sm"
        className="bg-body-tertiary"
      >
        <Container fluid>
          <Navbar.Brand
            className="cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <Logo width={50} height={50} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#Destaques">Destaques</Nav.Link>
              <Nav.Link href="#Favoritos">Favoritos</Nav.Link>
              <Nav.Link href="#Visto Recentemente">Visto Recentemente</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={() => navigate("/favorites")}>
                <div className="round-cover">
                  <FaHeart />
                </div>
              </Nav.Link>

              <NavDropdown
                title={
                  <div className="round-cover">
                    <FaUser />
                  </div>
                }
                id="dropdown-profile"
                className="dropdown-profile"
              >
                <NavDropdown.ItemText>{`${name} ${lastName}`}</NavDropdown.ItemText>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate("/profile")}>
                  Perfil
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Sair</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default NavbarComponent;
