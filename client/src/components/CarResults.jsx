import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { carSearchCriteria } from "~/services/CarService";
import { Container, Row, Col, Card } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CarResults = () => {
  const { state } = useLocation();
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await carSearchCriteria(state.criteria);
        setResults(response);
      } catch (error) {
        setErrorMessage("Arama sırasında bir hata oluştu.");
        console.error("Error fetching car results:", error);
      }
    };

    if (state && state.criteria) {
      fetchResults();
    }
  }, [state]);

  return (
    <Container className="my-5">
      <h2>Araçlar</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <Row>
        {results.map(car => (
          <Col key={car.id} md={4} className="mb-3">
            <Card className="car-card h-100">
              <LazyLoadImage
                className="card-img-top"
                src={`data:image/png;base64, ${car.photo}`}
                effect="blur"
                style={{ height: "200px", objectFit: "cover" }}
                alt={car.carName}
              />
              <Card.Body>
                <Card.Title>{car.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Model Yılı: {car.modelYear}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Günlük Fiyat:</strong> {car.dailyPrice}₺
                </Card.Text>
                <Card.Text>
                  <strong>Açıklama:</strong> {car.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CarResults;
