import { useState, useEffect } from "react";
import Form from "../components/Form";
import { CONSTANTS_REGISTER } from "../constants/Constants";

import { Navigate } from "react-router-dom";

export default function Register({ formData, setFormData }) {
  const [islogged, setIslogged] = useState(false);
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

    if (res_reg.status === 201) {
      const data_reg = await res_reg.json();
      console.log(data_reg);
      setIsRegistered(true);
    } else {
      console.log("error");
      setError(true);
    }
  }

  useEffect(() => {
    if (isRegistered && formData.username && formData.password) {
      async function login() {
        const res_log = await fetch("http://fauques.freeboxos.fr:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });

        if (res_log.status === 200) {
          const data_log = await res_log.json();
          console.log(data_log);
          localStorage.setItem("token", data_log.token);
          localStorage.setItem("username", formData.username);
          setIslogged(true);
        } else {
          console.log("error");
          setError(true);
        }
      }
      login();
    }
  }, [isRegistered, formData.username, formData.password]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIslogged(true);
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
