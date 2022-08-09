import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import useAxios from "../../../hooks/useAxios";
import Heading from "../../layout/Heading";
import DeleteButton from "./DeleteButton";
import Button from "react-bootstrap/Button";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

export default function EditWikiPost() {
  const [post, setPost] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingPost, setFetchingPost] = useState(true);
  const [updatingPost, setUpdatingPost] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();
  let { id } = useParams();

  useEffect(function () {
    async function getPost() {
      try {
        const http = useAxios();
        const url = `wp/v2/posts/${id}`;
        const response = await http.get(url);
        console.log("response", response.data);
        setPost(response.data);
      } catch (error) {
        console.log(error);
        setFetchError(error.toString());
      } finally {
        setFetchingPost(false);
      }
    }

    getPost();
  }, []);

  async function onSubmit(data) {
    setUpdatingPost(true);
    setUpdateError(null);
    setUpdated(false);

    console.log(data);

    try {
      const response = await http.put(url, data);
      console.log("response", response.data);
      setUpdated(true);
    } catch (error) {
      console.log("error", error);
      setUpdateError(error.toString());
    } finally {
      setUpdatingPost(false);
    }
  }

  if (fetchingPost) return <div>Loading...</div>;

  if (fetchError) return <div>Something went wrong</div>;

  return (
    <>
      <Heading className="center" content="Edit Post" />

      <form className="searchStyle " onSubmit={handleSubmit(onSubmit)}>
        {updateError && <FormError>{updateError}</FormError>}
        <Button
          className="bg-light text-dark goBack right d-flex justify-content-left "
          variant="outline-success"
          onClick={() => history.goBack()}
        >
          Go Back
        </Button>
        <fieldset className=" center row" disabled={updatingPost}>
          <div>
            <p>Heading</p>
            <input
              className="widthH h3"
              name="title"
              defaultValue={post.title.rendered}
              placeholder="Title"
              ref={register}
            />
            {errors.title && <FormError>{errors.title.message}</FormError>}
          </div>
          <div>
            <p>Content</p>
            <textarea
              className=" textAreaPost"
              name="content"
              defaultValue={post.content.rendered}
              placeholder="Content"
              ref={register}
            />
          </div>
          <div className="center">
            <Button className="widthH" variant="outline-success" type="submit">
              Update
            </Button>
          </div>
          {updated && <div className="success">The post was updated</div>}

          <div className="center">
            <DeleteButton id={post.id} />
          </div>
        </fieldset>
      </form>
    </>
  );
}
