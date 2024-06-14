import React, { ChangeEvent, FC, useState } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
// import InputMask from "react-input-mask";

import { api, apiRoutes } from "../../services/api";

import StarRating from "./StarRating";

import "./styles.css";

interface AvaliationModalProps {
  movieTitle: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const AvaliationModal: FC<AvaliationModalProps> = ({
  movieTitle,
  show,
  setShow,
}) => {
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    opnion: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**
   * Handle input change
   * @param e
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

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
      const response = await api.post(apiRoutes.movies.avaliate, {
        ...formData,
        rating,
      });

      console.log(response);

      if (response.status === 200) {
        handleClose();
      }
    } catch (error) {
      console.error("Error creating avaliation: ", error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Body>
          <Row className="mb-2">
            <Col>
              <h2>Avaliar: {movieTitle}</h2>
            </Col>
          </Row>

          <Form onSubmit={handleSubmit}>
            <Row className="row">
              <Col>
                <StarRating rating={rating} setRating={setRating} />
                <Form.Group controlId="opnion">
                  <Form.Label>Opinião:</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="opnion"
                    value={formData.opnion}
                    onChange={handleChange}
                    rows={10}
                    style={{ resize: "none" }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="theme-btn"
            onClick={handleSubmit}
          >
            Avaliar
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AvaliationModal;
