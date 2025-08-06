import { useForm } from "react-hook-form";
import * as z from "zod/mini";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Schema de validação para o formulário de recuperação de senha.
 * Define que o campo email é obrigatório e deve ser um email válido.
 */
const resetPasswordSchema = z
  .object({
    novaSenha: z.string().check(z.minLength(1, "A nova senha é obrigatória")),
    confirmarNovaSenha: z.string(),
  })
  .check(
    z.refine((data) => data.novaSenha === data.confirmarNovaSenha, {
      message: "As senhas não coincidem.",
      path: ["confirmarNovaSenha"],
    })
  );

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

/**
 * Hook para gerenciar o formulário de redefinição de senha.
 * Fornece métodos e estados para manipular o formulário.
 *
 * @returns {Object} - Objeto contendo métodos e estados do formulário.
 */
export function useResetPasswordForm() {
  return useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });
}
