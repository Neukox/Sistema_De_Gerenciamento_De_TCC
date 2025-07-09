// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "../Sistema_De_Gerenciamento_De_TCC-master/Frontend/src/features/auth/Login";
import Register from "../Sistema_De_Gerenciamento_De_TCC-master/Frontend/src/features/auth/Register"; 
import MainDashboard from "../Sistema_De_Gerenciamento_De_TCC-master/Frontend/src/features/auth/Dashboard/MainDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/maindashboard" element={< MainDashboard />} />
    </Routes>
  );
}
