import { useState } from "react";
import { useHistory } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import Button from "react-bootstrap/Button";

export default function DeleteButton({ id }) {
  const [error, setError] = useState(null);

  const url = `/wp/v2/posts/${id}`;

  const http = useAxios();
  const history = useHistory();

  async function handleDelete() {
    try {
      await http.delete(url);
      history.push("/loginEdit/posts");
    } catch (error) {
      setError(error);
    }
  }

  return (
    <Button
      variant="outline-success"
      type="button"
      className="bg-danger hover-success delete border-0 widthH mt-3"
      onClick={handleDelete}
    >
      {error ? "Error" : "Delete"}
    </Button>
  );
}
