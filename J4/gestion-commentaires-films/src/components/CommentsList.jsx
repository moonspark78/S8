
import { useSelector, useDispatch} from "react-redux";
import { Alert, ListGroup, Button } from "react-bootstrap";
import { removeComment } from "../redux/commentSlice";

const CommentsList = () => {
  const comments = useSelector((state) => state.comments);

    const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeComment(id));
  };

  if (comments.length === 0) {
    return (
      <div className="mt-4">
        <Alert variant="info" className="text-center">
          Aucun commentaire pour le moment.
        </Alert>
      </div>
    );
  }

  return (
    <div className="mt-4 mb-4">
      <h3>Liste des commentaires</h3>
      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>Note : {comment.note}/5</strong>   
                <p>{comment.text}</p>
              </div>
              <Button variant="danger" onClick={() => handleDelete(comment.id)}>Supprimer</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CommentsList;
