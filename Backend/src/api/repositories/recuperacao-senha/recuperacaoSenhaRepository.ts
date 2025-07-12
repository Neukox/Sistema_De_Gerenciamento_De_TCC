import prisma from "../../config/prisma";
import { RecuperacaoSenha } from "@prisma/client";

/**
 * Função para criar um registro de recuperação de senha no banco de dados
 * @param {number} userId - ID do usuário para o qual a recuperação de senha é solicitada
 * @returns {Promise<RecuperacaoSenha>} Retorna o registro de recuperação de senha criado
 */
export async function setPasswordRecoveryToken(
  userId: number,
  token: string,
  expires: Date
): Promise<RecuperacaoSenha | null> {
  const recoveryRequest = await prisma.recuperacaoSenha.create({
    data: {
      Usuario_id: userId,
      tokenHash: token,
      expiracao: expires,
    },
  });

  return recoveryRequest;
}
