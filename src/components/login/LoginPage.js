import Heading from "../layout/Heading";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <>
      <Heading className="center p-5" content="Login" />
      <LoginForm />
    </>
  );
}
