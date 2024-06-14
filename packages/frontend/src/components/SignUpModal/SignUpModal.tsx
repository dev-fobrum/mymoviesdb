import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal, Button, Form, Col, Row, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
// import InputMask from "react-input-mask";

import { api, apiRoutes } from "../../services/api";

import "./styles.css";
import IIBGEData from "./IBGEData.interface";
import { mock, DEFAULT_USER_INFO } from "./mock";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const CreateUserModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageName = location.pathname;

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const [formData, setFormData] = useState(mock);
  const [formData, setFormData] = useState(DEFAULT_USER_INFO);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**
   * Get IBGE data from Zipcode info
   * @param zipcode
   * @returns
   */
  const handleZipCode = async (zipcode: string) => {
    if (!zipcode || formData["zipcode"] === zipcode) {
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`);
      const data: IIBGEData = await response.json();

      if (response.ok) {
        setFormData((prevState) => ({
          ...prevState,
          street: data.logradouro,
          number: "",
          complement: data.complemento,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
          country: "Brasil",
        }));
      } else {
        console.error("Error fetching Zipcode");
      }
    } catch (error: any) {
      console.error("Error fetching Zipcode:", error);
    }
  };

  /**
   * Handle password details
   * @param e
   */
  const handlePassword = (e: React.FocusEvent<HTMLInputElement>) => {
    const eventName = e.target.name;
    const eventValue = e.target.value;

    const otherFieldElement = e.target.form?.elements.namedItem(
      eventName === "password" ? "confirmPassword" : "password"
    );

    let otherFieldValue: string | undefined;
    if (otherFieldElement instanceof HTMLInputElement) {
      otherFieldValue = otherFieldElement.value;
    } else {
      otherFieldValue = undefined;
    }

    console.log("devlog otherFieldValue", otherFieldValue);

    // Check password strength
    if (eventName === "password") {
      const isStrong = PASSWORD_REGEX.test(eventValue);

      if (!isStrong) {
        console.log("senha fraca");
      }
    }

    if (eventValue !== otherFieldValue) {
      console.log("senhas não são idênticas");
    }
  };

  /**
   * Handle input change
   * @param e
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "zipcode" && value.length === 8) {
      handleZipCode(e.target.value);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Handle form submit
   * @param e
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMessage(null);

      const response = await api.post(apiRoutes.users.create, {
        ...formData,
      });

      setLoading(false);

      if (response.status === 200) {
        handleClose();
      }
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(error.response.data.error);
      console.error("Error creating user: ", error);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center my-3">
        <hr className="flex-grow-1" />
        <span className="mx-2">ou</span>
        <hr className="flex-grow-1" />
      </div>
      <div className="text-center">
        <span>
          É novo aqui?{" "}
          <span
            className="text-decoration-underline"
            style={{ cursor: "pointer" }}
            onClick={handleShow}
          >
            Faça sua conta
          </span>
        </span>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        keyboard={!loading}
        {...(loading ? { backdrop: "static" } : {})}
      >
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="row">
              <Col>
                <Form.Group controlId="name">
                  <Form.Label>Nome:</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="lastname">
                  <Form.Label>Sobrenome:</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="row">
              <Col>
                <Form.Group controlId="email">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="row">
              <Col>
                <Form.Group controlId="password">
                  <Form.Label>Senha:</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handlePassword}
                    autoComplete="off"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirmar Senha:</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handlePassword}
                    autoComplete="off"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="row">
              <Col>
                <Form.Group controlId="cpf">
                  <Form.Label>CPF:</Form.Label>
                  <Form.Control
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    // as={() => (
                    //   <InputMask
                    //     mask="999.999.999-99"
                    //     maskChar=""
                    //     value={formData.cpf}
                    //     onChange={handleChange}
                    //   />
                    // )}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="phone">
                  <Form.Label>Telefone:</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="row">
              <Col>
                <Form.Group controlId="zipcode">
                  <Form.Label>CEP:</Form.Label>
                  <Form.Control
                    type="text"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                    onBlur={(e) => {
                      handleZipCode(e.target.value);
                    }}
                    // as={() => (
                    //   <InputMask
                    //     mask="99999-999"
                    //     value={formData.zipcode}
                    //     onChange={handleChange}
                    //     maskPlaceholder={null}
                    //   />
                    // )}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="street">
                  <Form.Label>Rua:</Form.Label>
                  <Form.Control
                    className="form-control readonly-input"
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="row">
              <Col>
                <Form.Group controlId="number">
                  <Form.Label>Número:</Form.Label>
                  <Form.Control
                    type="text"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="complement">
                  <Form.Label>Complemento:</Form.Label>
                  <Form.Control
                    type="text"
                    name="complement"
                    value={formData.complement}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="row">
              <Col>
                <Form.Group controlId="neighborhood">
                  <Form.Label>Bairro:</Form.Label>
                  <Form.Control
                    className="form-control readonly-input"
                    type="text"
                    name="neighborhood"
                    readOnly
                    value={formData.neighborhood}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="city">
                  <Form.Label>Cidade:</Form.Label>
                  <Form.Control
                    className="form-control readonly-input"
                    type="text"
                    name="city"
                    readOnly
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="row">
              <Col>
                <Form.Group controlId="state">
                  <Form.Label>Estado:</Form.Label>
                  <Form.Control
                    className="form-control readonly-input"
                    type="text"
                    name="state"
                    readOnly
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="country">
                  <Form.Label>País:</Form.Label>
                  <Form.Control
                    className="form-control readonly-input"
                    type="text"
                    name="country"
                    readOnly
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-4">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>{" "}
                    Enviando informações
                  </>
                ) : (
                  <>Cadastrar</>
                )}
              </Button>
            </Row>
            <Row>
              <Col>
                {errorMessage && (
                  <Alert className="mt-2" variant="danger">
                    <div>{errorMessage}</div>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        pageName === "/forgotpassword"
                          ? handleClose()
                          : navigate("/forgotpassword")
                      }
                    >
                      Recuperar senha?
                    </div>
                  </Alert>
                )}
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateUserModal;
