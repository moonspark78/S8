import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(8, "Min 8 caractères")
    .max(15, "Max 15 caractères")
    .required("Nom requis"),

  date: yup
    .string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Format jj/mm/aaaa"
    )
    .test("is-future", "Date invalide", (value) => {
      if (!value) return false;
      const [d, m, y] = value.split("/").map(Number);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const enteredDate = new Date(y, m - 1, d);
      return enteredDate >= today;
    })
    .required("Date requise"),

  priority: yup
    .string()
    .oneOf(["basse", "moyenne", "élevée"], "Doit être basse, moyenne ou élevée")
    .required("Priorité requise"),

  checkbox: yup.boolean().required(),
});

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      date: "",
      priority: "",
      checkbox: false,
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <Container className="mt-5">
      <h1>Ajouter une tâche</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez le nom"
            {...register("name")}
            isInvalid={!!errors.name}
          />
          {errors.name && (
            <Form.Control.Feedback type="invalid">
              {errors.name.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date due</Form.Label>
          <Form.Control
            type="text"
            placeholder="jj/mm/aaaa"
            {...register("date")}
            isInvalid={!!errors.date}
          />
          {errors.date && (
            <Form.Control.Feedback type="invalid">
              {errors.date.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Priorité</Form.Label>
          <Form.Select {...register("priority")} isInvalid={!!errors.priority}>
            <option value="">Choisir priorité</option>
            <option value="basse">Basse</option>
            <option value="moyenne">Moyenne</option>
            <option value="élevée">Élevée</option>
          </Form.Select>
          {errors.priority && (
            <Form.Control.Feedback type="invalid">
              {errors.priority.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Tâche terminée"
            {...register("checkbox")}
            isInvalid={!!errors.checkbox}
          />
          {errors.checkbox && (
            <Form.Control.Feedback type="invalid">
              {errors.checkbox.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button type="submit">Envoyer</Button>
      </Form>
    </Container>
  );
};

export default App;
