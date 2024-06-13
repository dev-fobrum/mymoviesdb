import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import "./styles.css";

const Footer = () => {
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
              <Nav.Link href="#Destaques">Destaques</Nav.Link>
              <Nav.Link href="#Favoritos">Favoritos</Nav.Link>
              <Nav.Link href="#Visto Recentemente">Visto Recentemente</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Footer;
