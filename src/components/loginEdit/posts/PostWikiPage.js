import { Link } from "react-router-dom";
import EditPosts from "../EditPosts";
import PostWikiList from "./PostWikiList";
import Heading from "../../layout/Heading";

export default function PostWikiPage() {
  return (
    <EditPosts>
      <Heading size="3" content="Posts" />
      <p>
        <Link to="/loginEdit/posts/add">Add post</Link>
      </p>
      <PostWikiList />
    </EditPosts>
  );
}
