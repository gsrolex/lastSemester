import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function Navv() {
  const [auth, setAuth] = useContext(AuthContext);

  const history = useHistory();

  function logout() {
    setAuth(null);
    history.push("/");
  }

  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Container>
          <Link to="/">
            <Navbar.Brand className="logoFont">WIKI CODE</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse className="justify-content-end" id="navbarScroll">
            <Nav
              className=" my-2 my-lg-0 text-light px-5"
              style={{ maxHeight: "130px" }}
            >
              <Nav.Link className="lightFont" href="/">
                Home
              </Nav.Link>
              {auth ? (
                <>
                  <Nav.Link className="lightFont" href="/EditPosts">
                    Edit
                  </Nav.Link>
                  <Nav.Link className="loginFont" onClick={logout}>
                    Log out
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link className="loginFont" href="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navv;
