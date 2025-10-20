// App.jsx
import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./App.css"; // ✅ on importe le CSS

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <Container className="my-5">
      <h1 className="products-title">🛍️ Nos Produits 🛍️</h1>
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="product-card">
              <div className="product-image-container">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
              </div>

              <Card.Body className="d-flex flex-column">
                <Card.Title className="product-title">
                  {product.title}
                </Card.Title>
                <Card.Text className="product-description">
                  {product.description}
                </Card.Text>
                <h5 className="fw-bold">{product.price} €</h5>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
