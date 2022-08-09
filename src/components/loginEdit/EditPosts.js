import { Link } from "react-router-dom";
import Heading from "../layout/Heading";
import Button from "react-bootstrap/Button";
import PostWikiList from "./posts/PostWikiList";
import { useHistory } from "react-router-dom";

export default function EditPosts({ children }) {
  const history = useHistory();
  return (
    <>
      <Heading className="center" content="Edit Posts" />
      <div className="searchStyle">
        <Button
          className="bg-light text-dark goBack right d-flex justify-content-left "
          variant="outline-success"
          onClick={() => history.goBack()}
        >
          Go Back
        </Button>
      </div>
      <Link className="searchStyle" to={`/loginEdit/posts/add`}>
        <Button className="my-4 btn-lg btn-success">
          Create a new post here&nbsp;&nbsp;&#10132;
        </Button>
      </Link>
      <PostWikiList></PostWikiList>
    </>
  );
}
