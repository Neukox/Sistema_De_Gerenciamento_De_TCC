import * as z from "zod/mini";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Esquema de validação para o formulário de login.
 * Utiliza zod para definir as regras de validação dos campos.
 * - email: deve ser um email válido e não pode estar vazio.
 * - password: deve ser uma string não vazia com pelo menos 6 caracteres.
 */
const loginSchema = z.object({
  email: z
    .email("Insira um e-mail válido.")
    .check(z.minLength(1, "O email é obrigatório")),
  password: z
    .string()
    .check(
      z.minLength(6, "A senha deve ter pelo menos 6 caracteres"),
      z.minLength(1, "A senha é obrigatória")
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Hook personalizado para gerenciar o formulário de login.
 * Utiliza react-hook-form com zod para validação.
 * Retorna as funções e estados necessários para manipular o formulário.
 */
export function useLoginForm() {
  return useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
}
