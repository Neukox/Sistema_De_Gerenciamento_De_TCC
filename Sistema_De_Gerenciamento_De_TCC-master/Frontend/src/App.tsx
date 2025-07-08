import './index.css'
import { Routes, Route } from "react-router-dom";
import Login from "../src/features/auth/Login";
import Register from "../src/features/auth/Register"; 
import MainDashboard from "../src/features/auth/Dashboard/MainDashboard";

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

