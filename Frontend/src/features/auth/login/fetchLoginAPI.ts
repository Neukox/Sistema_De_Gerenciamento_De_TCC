import login from "../services/login";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (email: string, password: string): Promise<void> => {
    setLoading(true);

    try {
      const response = await login(email, password);

      if (response.success) {
        navigate("/maindashboard");
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || "Erro ao realizar login");
      } else {
        toast.error("Erro desconhecido ao realizar login");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading };
}
