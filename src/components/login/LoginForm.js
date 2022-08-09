import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../common/FormError";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
  username: yup.string().required("username, please"),
  password: yup.string().required("password, please"),
});

export default function LoginForm() {
  const [loginError, setLoginError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [, setAuth] = useContext(AuthContext);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
      setAuth(response.data);
      history.push("/EditPosts");
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Form
        className="center bg-dark text-light formBackground"
        onSubmit={handleSubmit(onSubmit)}
      >
        {loginError && <FormError>{loginError}</FormError>}
        <fieldset className="loginFieldset" disabled={submitting}>
          <Form.Group className="mb-3  " controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter email"
              name="username"
              ref={register}
            />
            {errors.username && (
              <FormError>{errors.username.message}</FormError>
            )}
          </Form.Group>

          <Form.Group className="mb-3 " controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              ref={register}
            />
            {errors.password && (
              <FormError>{errors.password.message}</FormError>
            )}
          </Form.Group>

          <Button
            className=" w-100 bg-success border-0 "
            variant="primary"
            type="submit"
          >
            {submitting ? "Loggin in.." : "Login"}
          </Button>
        </fieldset>
      </Form>
    </>
  );
}
