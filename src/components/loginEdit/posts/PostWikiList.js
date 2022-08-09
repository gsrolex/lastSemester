import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Heading from "../../layout/Heading";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import Spinner from "react-bootstrap/Spinner";

export default function PostWikiList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function getMedia() {
      try {
        const http = useAxios();
        const response = await http.get("wp/v2/posts/?per_page=100");
        console.log("response", response);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getMedia();
  }, []);

  if (loading)
    return (
      <div>
        <Spinner animation="border" />
      </div>
    );

  if (error) return <div>{}</div>;

  return (
    <ListGroup>
      <Heading
        className="h4 pb-3 pt-5"
        content="Chose a post from the list below to start to edit"
      ></Heading>
      {posts.map((post) => {
        return (
          <ListGroup.Item className="p-4 font moving-left" key={post.id}>
            <Link to={`/loginEdit/posts/edit/${post.id}`}>
              {post.title.rendered}&nbsp; &nbsp; &#10132;
            </Link>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
