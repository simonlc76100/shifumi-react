import Login from "./views/Login";
import Register from "./views/Register";
import Matches from "./views/Matches";
import { Route, Routes } from "react-router-dom";
import "./assets/styles/App.css";
import PrivateRoute from "./utils/PrivateRoute";

import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login formData={formData} setFormData={setFormData} />}
      />
      <Route
        path="/register"
        element={<Register formData={formData} setFormData={setFormData} />}
      />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Matches />} />
      </Route>
    </Routes>
  );
}
