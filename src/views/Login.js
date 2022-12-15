import { useState, useEffect } from "react";
import Form from "../components/Form";
import { HEADER_LOGIN, SUBMIT_LOGIN, QUESTION_LOGIN, BUTTON_LOGIN, ERROR_LOGIN } from "../constants/Constants";

import { Navigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [islogged, setIslogged] = useState(false);

  const [error, setError] = useState(false);

  async function login(e) {
    e.preventDefault();
    const response = await fetch("http://fauques.freeboxos.fr:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);

      localStorage.setItem("token", data.token);
      setError(false);
      setIslogged(true);
    } else {
      console.log("error");
      setError(true);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIslogged(true);
    }
  }, []);

  return (
    <div
      className="login"
      style={{
        height: "inherit",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {islogged ? (
        <Navigate to="/" />
      ) : (
        <Form
          error={error}
          setError={setError}
          setUsername={setUsername}
          setPassword={setPassword}
          submitFunction={login}
          text1={HEADER_LOGIN}
          text2={SUBMIT_LOGIN}
          text3={QUESTION_LOGIN}
          text4={BUTTON_LOGIN}
          text5={ERROR_LOGIN}
          route="/register"
        />
      )}
    </div>
  );
}
