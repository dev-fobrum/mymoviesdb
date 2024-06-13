import React, { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { FaHome } from "react-icons/fa";

import Footer from "../../../components/Footer/Footer";
import NavbarComponent from "../../../components/Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageName = location.pathname; // Obtém o caminho atual

  console.log("devlog pageName", pageName);

  return (
    <div>
      <NavbarComponent />
      {pageName !== "/dashboard" && (
        <Row className="m-4">
          <Col>
            <Button
              className="theme-btn btn btn-secondary d-flex justify-content-center align-items-center"
              onClick={() => navigate("/dashboard")}
              variant="primary"
            >
              <FaHome />
              <div className="ml-1" style={{ marginLeft: "5px" }}>
                Voltar para o Início
              </div>
            </Button>
          </Col>
        </Row>
      )}
      <>{children}</>
      <Footer />
    </div>
  );
};

export default Layout;
