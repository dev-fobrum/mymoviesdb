import React, { useState, FC } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  isView?: boolean;
}

const StarRating: FC<StarRatingProps> = ({ rating, setRating, isView }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <Form.Group>
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;

              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={!isView ? () => setRating(ratingValue) : () => {}}
                    style={{ display: "none" }}
                  />
                  <FaStar
                    size={30}
                    color={
                      ratingValue <= (hover || rating) ? "#61dafb" : "#e4e5e9"
                    }
                    onMouseEnter={
                      !isView ? () => setHover(ratingValue) : () => {}
                    }
                    onMouseLeave={!isView ? () => setHover(null) : () => {}}
                    style={{
                      cursor: isView ? "inherit" : "pointer",
                      transition: "color 200ms",
                    }}
                  />
                </label>
              );
            })}
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default StarRating;
