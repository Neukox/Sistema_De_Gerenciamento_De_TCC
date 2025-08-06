import * as z from "zod/mini";

/**
 * Schema de validação para o formulário de atualização de senha.
 * Define as regras de validação para os campos de senha.
 */
const updatePasswordSchema = z
  .object({
    novaSenha: z.string().check(z.minLength(1, "A nova senha é obrigatória")),
    confirmarNovaSenha: z.string(),
  })
  .check(
    z.refine((data) => data.novaSenha === data.confirmarNovaSenha, {
      message: "As senhas não coincidem",
      path: ["confirmarNovaSenha"],
    })
  );

export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
export default updatePasswordSchema;
