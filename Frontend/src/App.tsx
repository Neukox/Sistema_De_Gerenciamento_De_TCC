// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Register from "./features/auth/register/Register";
import MainDashboard from "./features/Dashboard/MainDashboard";
import LoginPage from "./pages/auth/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/maindashboard" 
        element={
          <ProtectedRoute>
            <MainDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
