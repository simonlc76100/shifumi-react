import { useState } from "react";
import Form from "../components/Form";
import {
  HEADER_REGISTER,
  SUBMIT_REGISTER,
  QUESTION_REGISTER,
  BUTTON_REGISTER,
  ERROR_REGISTER,
} from "../constants/Constants";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  async function register(e) {
    e.preventDefault();
    const response = await fetch("http://fauques.freeboxos.fr:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.status === 201) {
      const data = await response.json();
      console.log(data);
      setError(false);
    } else {
      console.log("error");
      setError(true);
    }
  }

  return (
    <div
      className="register"
      style={{
        height: "inherit",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        error={error}
        setError={setError}
        setUsername={setUsername}
        setPassword={setPassword}
        submitFunction={register}
        text1={HEADER_REGISTER}
        text2={SUBMIT_REGISTER}
        text3={QUESTION_REGISTER}
        text4={BUTTON_REGISTER}
        text5={ERROR_REGISTER}
        route="/login"
      />
    </div>
  );
}
