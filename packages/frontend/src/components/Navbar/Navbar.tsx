import { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { FaHeart, FaPencilAlt, FaUser, FaSearch } from "react-icons/fa";

import Logo from "../Logo/Logo";

import { logout } from "../../store/authSlice";

import "./styles.css";
import { setSearchQuerySearch } from "../../store/filtersSlice";

interface NavbarComponentProps {
  pageName?: string;
}

const NavbarComponent: FC<NavbarComponentProps> = ({ pageName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { name, lastName } = useSelector(
    (state: any) => state.auth.credentials
  );

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const searchTermEncoded = encodeURIComponent(searchTerm.trim());
      dispatch(setSearchQuerySearch(searchTermEncoded));
      navigate(`/search?q=${searchTermEncoded}`);
    }

    if (event.key === " ") {
      event.preventDefault();
      setSearchTerm((prevTerm) => prevTerm + " ");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container className="navbar-container" fluid>
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="lg"
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
              {pageName === "/dashboard" ? (
                <>
                  <Nav.Link href="#Destaques">Destaques</Nav.Link>
                  <Nav.Link href="#Favoritos">Favoritos</Nav.Link>
                  <Nav.Link href="#Visto Recentemente">
                    Visto Recentemente
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => navigate("/dashboard")}>
                  Início
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              <Nav.Link className="search-container">
                <div
                  className="round-cover"
                  onClick={() =>
                    searchRef?.current && searchRef.current.focus()
                  }
                >
                  <FaSearch />
                </div>
                <FormControl
                  ref={searchRef}
                  type="text"
                  placeholder="Enter para Buscar"
                  className="search-input"
                  value={searchTerm}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                />
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/reviews")}>
                <div className="round-cover">
                  <FaPencilAlt />
                </div>
              </Nav.Link>
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
