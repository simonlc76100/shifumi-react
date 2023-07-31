import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Form from "../components/Form";
import { CONSTANTS_REGISTER } from "../constants/Constants";

import { Center } from "@chakra-ui/react";

export default function Register({ formData, setFormData }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();
    const res_reg = await fetch("http://server:5000:3000/register", {
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
        const response = await fetch("http://server:5000:3000/login", {
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
            navigate("/matches");
            break;
          default:
            console.log("error");
            setError(true);
            break;
        }
      }
      login();
    }
  }, [isRegistered, formData.username, formData.password, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/matches");
    }
  }, [navigate]);

  return (
    <Center className="login-view" height="inherit" width="inherit">
      <Form
        error={error}
        setError={setError}
        formData={formData}
        setFormData={setFormData}
        submitFunction={register}
        CONSTANTS={CONSTANTS_REGISTER}
        route="/login"
      />
    </Center>
  );
}
