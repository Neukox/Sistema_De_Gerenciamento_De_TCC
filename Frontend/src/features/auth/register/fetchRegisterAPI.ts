import type { RegisterRequest } from "@/types/response/auth";
import register from "../services/register";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

/**
 * Hook para registrar um novo usuário.
 * @param {Object} data - Dados do usuário a serem registrados.
 * @returns {Promise<Object>} Promise que resolve com a resposta da API.
 */

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (data: RegisterRequest): Promise<void> => {
    setLoading(true);

    try {
      const response = await register(data);

      if (response.success) {
        navigate("maindashboard");
      }

      console.log("Usuário registrado com sucesso");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.message || "Erro ao registrar usuário"
        );
      } else {
        toast.error("Erro desconhecido ao registrar usuário");
      }
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading };
}
