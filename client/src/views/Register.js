import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/api/auth";
import Form from "../components/Form";
import { CONSTANTS_REGISTER } from "../constants/Constants";
import { Center } from "@chakra-ui/react";

export default function Register({ formData, setFormData }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await auth(formData, "register");
      setIsRegistered(true);
    } catch (error) {
      console.log("register failed: ", error);
      setError(true);
    }
  }

  useEffect(() => {
    if (isRegistered && formData.username && formData.password) {
      async function handleLogin() {
        try {
          const data = await auth(formData, "login");
          localStorage.setItem("token", data.token);
          navigate("/matches");
        } catch (error) {
          console.log("login failed: ", error);
          setError(true);
        }
      }
      handleLogin();
    }
  }, [isRegistered, formData, navigate]);

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
        submitFunction={handleRegister}
        CONSTANTS={CONSTANTS_REGISTER}
        route="/login"
      />
    </Center>
  );
}
