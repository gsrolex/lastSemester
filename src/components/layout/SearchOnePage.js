import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Container } from "react-bootstrap";

import Card from "react-bootstrap/Card";

export default function SearchOnePage() {
  const [posts, setPosts] = useState([]);

  const [q, setQ] = useState("");

  const http = useAxios();

  useEffect(
    function () {
      async function getMedia() {
        try {
          const response = await http.get("wp/v2/posts/?per_page=100");
          console.log("responseeeee1", response);
          setPosts(response.data);
        } catch (error) {
          console.log("tull");
          console.log(error);
        }
      }

      getMedia();
    },
    [http]
  );

  function search(posts) {
    return posts.filter((item) => {
      return (
        item.title.rendered.toString().toLowerCase().indexOf(q.toLowerCase()) >
        -1
      );
    });
  }

  return (
    <div className="wrapper">
      <Form className="d-flex searchStyle center">
        <Form.Control
          type="search"
          name="search-form"
          id="search-form"
          placeholder="Search"
          className="me-2 search search-inpu p-3"
          aria-label="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button className="lessMargin" variant="outline-success">
          SEARCH
        </Button>
      </Form>

      <ul className="card-grid">
        {(q ? search(posts) : posts).map((item) => (
          <Container className="d-flex justify-content-center ">
            <Row
              className=" d-flex justify-content-center text-center"
              xs={6}
              md={3}
            >
              <Card className="column " style={{ width: "50vw" }}>
                <Card.Body>
                  <Card.Title className="p-3">{item.title.rendered}</Card.Title>
                  <Card.Text className="p-3">{item.excerpt.rendered}</Card.Text>
                </Card.Body>
              </Card>
            </Row>
          </Container>
        ))}
      </ul>
    </div>
  );
}
