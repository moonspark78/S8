import { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import MovieCard from "./components/MovieCard";
import CommentForm from "./components/CommentForm";
import CommentsList from "./components/CommentsList";
import "./App.css";

const App = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  fetch("https://jsonfakery.com/movies/random/1")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Erreur ${res.status} : ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => {
      setMovie(data[0]);
    })
    .catch((err) => {
      console.log("Erreur lors du fetch :", err);
      setError("Impossible de charger le film pour le moment.");
    })
    .finally(() => {
      setLoading(false); 
    });
}, []);

  if (loading) return <p className="loading-text">Chargement du film...</p>;

  if (error)
    return (
      <Alert variant="danger" className="text-center mt-4">
        {error}
      </Alert>
    );

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={6}>
          <MovieCard movie={movie} />
          <h2 className="mt-4">Commentaires</h2>
          <CommentForm />
          <CommentsList />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
