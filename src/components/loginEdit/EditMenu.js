import { Link } from "react-router-dom";

export default function EditMenu() {
  return (
    <nav className="loginEdit">
      Sections: <Link to="/loginEdit/posts">Posts</Link>
    </nav>
  );
}
