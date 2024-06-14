import { FC } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./styles.css";

interface NavbarComponentProps {
  pageName?: string;
}

const Footer: FC<NavbarComponentProps> = ({ pageName }) => {
  const navigate = useNavigate();

  return (
    <Container className="navbar-container mt-4" fluid>
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="sm"
        className="bg-body-tertiary"
      >
        <Container fluid>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Footer;
