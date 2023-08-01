import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Form from "../components/Form";
import { CONSTANTS_LOGIN } from "../constants/Constants";

import { Center } from "@chakra-ui/react";

export default function Login({ formData, setFormData }) {
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    const response = await fetch("http://server:5000/login", {
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
        submitFunction={login}
        formData={formData}
        setFormData={setFormData}
        CONSTANTS={CONSTANTS_LOGIN}
        route="/register"
      />
    </Center>
  );
}
