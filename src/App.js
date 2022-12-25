import Login from "./views/Login";
import Register from "./views/Register";
import Matches from "./views/Matches";
import Match from "./views/Match";

import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import NotFound from "./views/NotFound";

import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/matches" />} />
      <Route element={<PrivateRoute />}>
        <Route path="/matches" element={<Matches />} />
        <Route path="/matches/:idParam" element={<Match />} />
      </Route>
      <Route
        path="/login"
        element={<Login formData={formData} setFormData={setFormData} />}
      />
      <Route
        path="/register"
        element={<Register formData={formData} setFormData={setFormData} />}
      />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}
