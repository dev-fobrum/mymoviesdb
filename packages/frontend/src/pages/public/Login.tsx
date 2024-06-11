import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

import { api } from "../../services/api";

import Logo from "../../components/Logo/Logo";
import SignUpModal from "../../components/SignUpModal/SignUpModal";

import "./styles.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    username: boolean;
    password: boolean;
  }>({ username: false, password: false });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setErrors({ username: !username, password: !password });
      return;
    }

    try {
      const response = await api.post("/login", { username, password });

      if (response.status === 200) {
        navigate("/dashboard");
      } else {
        setErrorMessage("Error logging in. Please check your credentials.");
      }
    } catch (error) {
      setErrorMessage("Error logging in. Please try again later.");
    }
  };

  return (
    <div className="login-background">
      <Container className="h-100 d-flex justify-content-center align-items-center">
        <Row className="w-100">
          <Col
            md={6}
            lg={4}
            className="mx-auto bg-light bg-rounded rounded-lg shadow-lg p-3"
          >
            <Logo />

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label>E-mail:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  isInvalid={errors.username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrors({ ...errors, username: false });
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, digite seu usuário
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="password" className="mt-3">
                <Form.Label>Senha:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  isInvalid={errors.password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: false });
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, digite sua senha
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" className="mt-4 w-100 text-white">
                Entrar
              </Button>
            </Form>

            <div className="text-center mt-3">
              <a
                href="/forgotpassword"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/forgotpassword");
                }}
              >
                Esqueceu a senha?
              </a>
            </div>
            <SignUpModal />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;