import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

import { api, apiRoutes } from "../../services/api";

import Logo from "../../components/Logo/Logo";
import SignUpModal from "../../components/SignUpModal/SignUpModal";

import "./styles.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState<{
    username: boolean;
  }>({ username: false });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      setErrors({ username: !username });
      return;
    }

    try {
      const response = await api.post(apiRoutes.auth.forgotPassword, {
        username,
      });

      if (response.status === 200) {
        setSuccessMessage("E-mail enviado");
        return;
      } else {
        setErrorMessage("Erro ao recuperar senha.");
      }
    } catch (error) {
      setErrorMessage("Erro ao recuperar senha");
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

            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
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
                  Por favor, digite seu e-mail
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" className="mt-4 w-100 text-white">
                Recuperar Senha
              </Button>
            </Form>

            <div className="text-center mt-3">
              <a
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Lembrou a senha?
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
