import { Button, Card, Col, Container, Row } from "react-bootstrap";
import StarRating from "../../../components/AvaliationModal/StarRating";

import "./styles.css";

const movies = [
  {
    name: "Filme 1",
    rating: 4,
    review:
      "Excelente filme! Recomendo a todosExcelente filme! Recomendo a todosExcelente filme! Recomendo a todosExcelente filme! Recomendo a todosExcelente filme! Recomendo a todosExcelente filme! Recomendo a todosExcelente filme! Recomendo a todosExcelente filme! Recomendo a todosExcelente filme! Recomendo a todosExcelente filme! Recomendo a todosExcelente filme! Recomendo a todosExcelente filme! Recomendo a todosExcelente filme! Recomendo a todosExcelente filme! Recomendo a todosExcelente filme! Recomendo a todosExcelente filme! Recomendo a todosExcelente filme! Recomendo a todos.",
  },
  {
    name: "Filme 2",
    rating: 5,
    review: "Um dos melhores filmes que já vi.",
  },
  {
    name: "Filme 3",
    rating: 3,
    review: "Bom filme, mas poderia ser melhor.",
  },
  {
    name: "Filme 4",
    rating: 2,
    review: "Não gostei muito, esperava mais.",
  },
];

const MyReviews = () => {
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
        {movies.map((movie, index) => (
          <Col xs={12} md={6} className="mb-4" key={index}>
            <Card className="h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.name}</Card.Title>
                <Card.Text>
                  <StarRating
                    rating={movie.rating}
                    setRating={() => {}}
                    isView={true}
                  />
                </Card.Text>
                <Card.Text>{movie.review}</Card.Text>
                <Card.Footer className="w-100 d-flex justify-items-end align-items-end">
                  <Button variant="primary theme-btn">Editar</Button>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyReviews;
