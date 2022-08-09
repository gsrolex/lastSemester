import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import useAxios from "../../../hooks/useAxios";
import Heading from "../../layout/Heading";
import Button from "react-bootstrap/Button";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

export default function AddWikiPost() {
  const [serverError, setServerError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const http = useAxios();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    data.status = "publish";

    if (data.featured_media === "") {
      data.featured_media = null;
    }

    console.log(data);

    try {
      const response = await http.post("/wp/v2/posts", data);
      console.log("response", response.data);
      history.push("/loginEdit/posts");
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Heading className="center" content="Add post" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="searchStyle">
          <Button
            className="bg-light text-dark goBack right d-flex justify-content-left "
            variant="outline-success"
            onClick={() => history.goBack()}
          >
            Go Back
          </Button>
        </div>
        {serverError && <FormError>{serverError}</FormError>}
        <fieldset className=" center row" disabled={submitting}>
          <div>
            <p>Heading</p>
            <input
              className="widthH h5 p-3"
              name="title"
              placeholder="Title"
              ref={register}
            />
            {errors.title && <FormError>{errors.title.message}</FormError>}
          </div>
          <div>
            <p>Content</p>
            <textarea
              className=" textAreaPost my-2"
              name="content"
              placeholder="Content"
              ref={register}
            />
          </div>
          <div className="center searchStyle">
            <Button className="widthH" variant="outline-success" type="submit">
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
