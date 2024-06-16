import React, { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
// import InputMask from "react-input-mask";

import { api, apiRoutes } from "../../services/api";

import StarRating from "./StarRating";

import "./styles.css";
import { formatDateToBR } from "../../utils/Dates";

interface ReviewModalProps {
  reviewId?: number | string;
  movieId?: number | string;
  movieTitle: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData?: () => {};
}

const ReviewModal: FC<ReviewModalProps> = ({
  reviewId,
  movieId,
  movieTitle,
  show,
  setShow,
  fetchData,
}) => {
  const params = useParams();

  const [id, setId] = useState(reviewId);
  const [ratingDate, setRatingDate] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    opinion: "",
  });

  const handleClose = () => {
    setShow(false);
    fetchData && fetchData();
  };

  useEffect(() => {
    async function fetchReviewData() {
      try {
        const movieIdToUse = movieId || params?.movieId || "";
        const reviewIdToUse = reviewId || movieIdToUse;

        if (!reviewIdToUse) return;

        const endpoint = reviewId
          ? apiRoutes.review.findOne(reviewIdToUse)
          : apiRoutes.review.findByUser(movieIdToUse);

        const response = await api.get(endpoint);

        if (response?.data) {
          const { id, rating, updatedAt, opinion } = response.data;
          setId(id);
          setRating(rating);
          setRatingDate(updatedAt);
          setFormData({ opinion });
        }
      } catch (error) {
        console.error("Erro ao buscar dados da avaliação:", error);
      }
    }

    fetchReviewData();
  }, [reviewId, movieId, params.movieId]);

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
      if (!rating) {
        console.error("Nota é um campo obrigatório"); // TODO: Alerta usuário
        return;
      }

      let status: number;

      if (id) {
        const response = await api.put(apiRoutes.review.update(id), {
          ...formData,
          reviewId: id,
          movieName: movieTitle,
          movieId: movieId || params?.movieId,
          rating,
        });

        status = response.status;
      } else {
        const response = await api.post(apiRoutes.review.create, {
          ...formData,
          movieName: movieTitle,
          movieId: movieId || params?.movieId,
          rating,
        });

        status = response.status;
      }

      if (status === 201) {
        handleClose();
      }
    } catch (error) {
      console.error("Error creating review: ", error);
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
            {ratingDate ? (
              <Row>
                <Col className="d-flex justify-content-center">
                  Você avaliou esse filme em {formatDateToBR(ratingDate, true)}
                </Col>
              </Row>
            ) : (
              <></>
            )}
            <Row className="row">
              <Col>
                <StarRating rating={rating} setRating={setRating} />
                <Form.Group controlId="opinion">
                  <Form.Label>Opinião:</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="opinion"
                    value={formData.opinion}
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

export default ReviewModal;
