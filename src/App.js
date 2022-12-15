import Login from "./views/Login";
import Register from "./views/Register";
import Matches from "./views/Matches";
import { Route, Routes } from "react-router-dom";
import "./assets/styles/App.css";
import PrivateRoute from "./utils/PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Matches />} />
      </Route>
    </Routes>
  );
}
