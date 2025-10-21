import React from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Button } from "react-bootstrap";

const App = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      dueDate: "",
      priority: "low",
      isCompleted: false,
    },
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    reset();
  };

  return (
    <Container className="mt-5">
      <h1>Ajouter une tâche</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez le nom"
            {...register("name", { required: "Le nom est requis" })}
          />
          {errors.name && (
            <small className="text-danger">{errors.name.message}</small>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>Date due</Form.Label>
          <Form.Control
            type="date"
            {...register("dueDate", { required: "La date est requise" })}
          />
          {errors.dueDate && (
            <small className="text-danger">{errors.dueDate.message}</small>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPriority">
          <Form.Label>Priorité</Form.Label>
          <Form.Select {...register("priority", { required: true })}>
            <option value="low">Basse</option>
            <option value="middle">Moyenne</option>
            <option value="high">Élevée</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCompleted">
          <Form.Check
            type="checkbox"
            label="Tâche terminée"
            {...register("isCompleted")}
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
