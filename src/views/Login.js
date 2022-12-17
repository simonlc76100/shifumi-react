import { useState, useEffect } from "react";
import Form from "../components/Form";
import { CONSTANTS_LOGIN } from "../constants/Constants";

import { Navigate } from "react-router-dom";

export default function Login({ formData, setFormData }) {
  const [isLogged, setIsLogged] = useState(false);

  const [error, setError] = useState(false);

  async function login(e) {
    e.preventDefault();
    const response = await fetch("http://fauques.freeboxos.fr:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", formData.username);

      setIsLogged(true);
    } else {
      console.log("error");
      setError(true);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
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
      {isLogged ? (
        <Navigate to="/" />
      ) : (
        <Form
          error={error}
          setError={setError}
          submitFunction={login}
          formData={formData}
          setFormData={setFormData}
          CONSTANTS={CONSTANTS_LOGIN}
          route="/register"
        />
      )}
    </div>
  );
}
