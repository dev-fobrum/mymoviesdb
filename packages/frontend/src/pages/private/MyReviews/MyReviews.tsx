import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { api, apiRoutes } from "../../../services/api";

import AvaliationModal from "../../../components/ReviewModal/ReviewModal";
import StarRating from "../../../components/ReviewModal/StarRating";

import IReview from "../../../interfaces/Review";

import "./styles.css";
import { formatDateToBR } from "../../../utils/Dates";

const MyReviews = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [movieToReview, setMovieToReview] = useState({
    reviewId: 0,
    movieId: 0,
    movieTitle: "",
  });

  async function fetchData() {
    const response = await api.get(apiRoutes.review.create);

    setReviews(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemoveReview = async (reviewId: number) => {
    try {
      const response = await api.delete(apiRoutes.review.delete(reviewId));

      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting review: ", error);
    }
  };

  return (
    <Container className="page-my-reviews">
      <Row>
        <Col>
          <div className="display-5 mt-4 mb-3 section-title">
            Minhas Avaliações
          </div>
        </Col>
      </Row>

      <Row>
        {reviews.length === 0 ? (
          <div className="theme-primary-color d-flex justify-content-center">
            Nenhuma avaliação encontrada 🥺
          </div>
        ) : (
          <></>
        )}
        {reviews.map((review, index) => (
          <Col xs={12} md={6} className="mb-4" key={index}>
            <Card className="h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title
                  className="text-decoration-underline cursor-pointer"
                  onClick={() => navigate(`/moviedetails/${review.movieId}`)}
                >
                  {review.movieName}
                </Card.Title>
                <Card.Text>
                  <Row>
                    <Col className="d-flex justify-content-center">
                      Avaliado em {formatDateToBR(review.updatedAt, true)}
                    </Col>
                  </Row>
                </Card.Text>
                <Card.Text>
                  <StarRating
                    rating={review.rating}
                    setRating={() => {}}
                    isView={true}
                  />
                </Card.Text>
                <Card.Text>{review.opinion}</Card.Text>
                <Card.Footer>
                  <Row className="w-100 d-flex justify-items-between align-items-between">
                    <Col>
                      <Button
                        variant="primary theme-btn"
                        onClick={() => {
                          setMovieToReview({
                            reviewId: review.id,
                            movieId: review.movieId,
                            movieTitle: review.movieName,
                          });

                          setShow(true);
                        }}
                      >
                        Editar
                      </Button>
                    </Col>
                    <Col className="d-flex justify-items-end align-items-end">
                      <Button
                        variant="primary btn-danger"
                        onClick={() => handleRemoveReview(review.id)}
                      >
                        Excluir
                      </Button>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}

        <AvaliationModal
          reviewId={movieToReview.reviewId}
          movieId={movieToReview.movieId}
          movieTitle={movieToReview.movieTitle}
          show={show}
          setShow={setShow}
          fetchData={fetchData}
        />
      </Row>
    </Container>
  );
};

export default MyReviews;
