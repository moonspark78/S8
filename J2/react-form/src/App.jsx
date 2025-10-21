import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    dueDate: "",
    priority: "low",
    isCompleted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value, 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    setFormData({
      name: "",
      dueDate: "",
      priority: "low",
      isCompleted: false,
    });
  };

  return (
    <Container className="mt-5">
      <h1>Ajouter une tâche</h1>
      <Form onSubmit={handleSubmit}>
        
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Entrez le nom"
            required
          />
        </Form.Group>

        
        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>Date due</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

       
        <Form.Group className="mb-3" controlId="formPriority">
          <Form.Label>Priority</Form.Label>
          <Form.Select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Basse - Par défaut</option>
            <option value="middle">Moyenne</option>
            <option value="high">Élevée</option>
          </Form.Select>
        </Form.Group>

       
        <Form.Group className="mb-3" controlId="formCompleted">
          <Form.Check
            type="checkbox"
            name="isCompleted"
            label="Tâche terminée"
            checked={formData.isCompleted}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Ajouter
        </Button>
      </Form>
    </Container>
  );
};

export default App;
