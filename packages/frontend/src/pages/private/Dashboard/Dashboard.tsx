import { useEffect, useState, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";

import { api, apiRoutes } from "../../../services/api";
import { logout } from "../../../store/slice";

import Logo from "../../../components/Logo/Logo";

import "./styles.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(apiRoutes.dashboard.get);
      setData(response.data);
    }

    fetchData();
  }, []);

  return (
    <Suspense>
      <Container className="navbar-header">
        <Row className="flex justify-content-end">
          <Col>
            <Logo width={50} height={50} />
          </Col>
          <Col>Favoritos</Col>
          <Col>
            <DropdownButton id="dropdown-item-button" title="Minha conta">
              <Dropdown.Item as="button">Configurações</Dropdown.Item>
              <Dropdown.Item as="button" onClick={handleLogout}>
                Sair
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Container>
    </Suspense>
  );
};

export default Dashboard;
