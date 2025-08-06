import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod/mini";

/**
 * Schema de validação para o formulário de registro.
 * Utiliza Zod para definir as regras de validação dos campos.
 */
const registerSchema = z
  .object({
    nome_completo: z
      .string()
      .check(z.minLength(1, "O nome completo é obrigatório")),
    email: z
      .email("Email inválido.")
      .check(z.minLength(1, "O email é obrigatório")),
    curso: z.string().check(z.minLength(1, "O curso é obrigatório.")),
    senha: z.string().check(z.minLength(1, "A senha é obrigatória")),
    confirmar_senha: z.string(),
    tipo: z.enum(["aluno", "professor"], {
      message: "Tipo de usuário inválido. Deve ser 'aluno' ou 'professor'.",
    }),
  })
  .check(
    z.refine((data) => data.senha === data.confirmar_senha, {
      message: "As senhas não coincidem.",
      path: ["confirmar_senha"],
    })
  );

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Hook para gerenciar o formulário de registro.
 * Utiliza react-hook-form para gerenciar o estado do formulário e validação com Zod.
 * @returns {object} Objeto contendo métodos e propriedades do formulário.
 * @returns {object} Métodos e propriedades do formulário, incluindo register, handleSubmit, formState, etc.
 */
export function useRegisterForm() {
  return useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
}
