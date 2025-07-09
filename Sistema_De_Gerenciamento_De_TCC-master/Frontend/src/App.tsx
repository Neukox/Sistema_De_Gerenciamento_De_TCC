// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import MainDashboard from "./features/auth/Dashboard/MainDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/maindashboard" element={<MainDashboard />} />
    </Routes>
  );
}
