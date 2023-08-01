import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../api/auth";
import Form from "../components/Form";
import { CONSTANTS_LOGIN } from "../constants/Constants";
import { Center } from "@chakra-ui/react";

export default function Login({ formData, setFormData }) {
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const data = await auth(formData, "login");
      localStorage.setItem("token", data.token);
      navigate("/matches");
    } catch (error) {
      console.log("login failed: ", error);
      setError(true);
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
        submitFunction={handleLogin}
        formData={formData}
        setFormData={setFormData}
        CONSTANTS={CONSTANTS_LOGIN}
        route="/register"
      />
    </Center>
  );
}
