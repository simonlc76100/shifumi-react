import { useState, useEffect } from "react";
import Form from "../components/Form";
import { CONSTANTS_REGISTER } from "../constants/Constants";

import { Navigate } from "react-router-dom";

export default function Register({ formData, setFormData }) {
  const [islogged, setIsLogged] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(false);

  async function register(e) {
    e.preventDefault();
    const res_reg = await fetch("http://fauques.freeboxos.fr:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    });

    switch (res_reg.status) {
      case 201:
        const data_reg = await res_reg.json();
        console.log(data_reg);
        setIsRegistered(true);
        break;
      default:
        console.log("error");
        setError(true);
        break;
    }
  }

  useEffect(() => {
    if (isRegistered && formData.username && formData.password) {
      async function login() {
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

        switch (response.status) {
          case 200:
            const data = await response.json();
            console.log(data);

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", formData.username);

            setIsLogged(true);
            break;
          default:
            console.log("error");
            setError(true);
            break;
        }
      }
      login();
    }
  }, [isRegistered, formData.username, formData.password]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, []);

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
      {islogged ? (
        <Navigate to="/" />
      ) : (
        <Form
          error={error}
          setError={setError}
          formData={formData}
          setFormData={setFormData}
          submitFunction={register}
          CONSTANTS={CONSTANTS_REGISTER}
          route="/login"
        />
      )}
    </div>
  );
}
