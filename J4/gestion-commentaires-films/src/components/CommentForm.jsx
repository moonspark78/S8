import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/commentSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  comment: yup
    .string()
    .required("Le commentaire est obligatoire.")
    .max(500, "Le commentaire ne peut pas dépasser 500 caractères."),
  note: yup
    .number()
    .typeError("La note doit être un nombre.")
    .required("La note est obligatoire.")
    .min(1, "La note doit être au minimum 1.")
    .max(5, "La note doit être au maximum 5."),
  acceptConditions: yup
    .boolean()
    .oneOf([true], "Vous devez accepter les conditions générales."),
});

const CommentForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      comment: "",
      note: "",
      acceptConditions: false,
    },
  });

  const onSubmit = (data) => {
    const newComment = {
      id: Date.now(),
      text: data.comment,
      note: Number(data.note),
    };

    dispatch(addComment(newComment));
    reset();
  };

  return (
    <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="commentText">
        <Form.Label>Ajouter un commentaire</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          {...register("comment")}
          isInvalid={!!errors.comment}
        />
        <Form.Control.Feedback type="invalid">
          {errors.comment?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="commentNote">
        <Form.Label>Note</Form.Label>
        <Form.Select
          {...register("note")}
          isInvalid={!!errors.note}
        >
          <option value="">Sélectionnez une note</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.note?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="acceptTerms">
        <Form.Check
          type="checkbox"
          label="J'accepte les conditions générales"
          {...register("acceptConditions")}
          isInvalid={!!errors.acceptConditions}
          feedbackType="invalid"
          feedback={errors.acceptConditions?.message}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Ajouter
      </Button>
    </Form>
  );
};

export default CommentForm;
