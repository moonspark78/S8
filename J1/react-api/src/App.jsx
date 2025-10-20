import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import "./App.css";

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

  const handleAddProduct = async () => {
    const newProduct = {
      title: "Produit Test",
      price: 19.99,
      description: "Description du produit test",
      image: "https://via.placeholder.com/150",
      category: "test"
    };

      const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    alert(`Le produit avec l'id ${data.id} a été créé`);
  };


  return (
    <Container>
      <h1>🛍️ Nos Produits 🛍️</h1>
      <Button onClick={handleAddProduct} className="mb-4">
        Ajouter un produit
      </Button>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card>
              <Card.Img src={product.image} alt={product.title} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>{product.price} €</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
