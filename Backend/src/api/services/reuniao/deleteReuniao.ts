import { deleteReuniao } from "../../repositories/reuniao/reuniaoRepository";
import { ResponseError } from "../../helpers/ResponseError";
import prisma from "../../config/prisma";
import { createHistoricoTcc } from "../../repositories/historico/historicoRepository";
import { Reuniao } from "@prisma/client";

/**
 * Serviço para deletar uma reunião.
 * @param id - ID da reunião a ser deletada.
 * @param userId - ID do usuário que está realizando a ação.
 * @returns A reunião deletada ou lança um erro se não existir.
 */
export default async function deleteReuniaoService(
  id: number,
  userId: number
): Promise<Reuniao | null> {
  // Verificar se a reunião existe
  const reuniao = await prisma.reuniao.findUnique({
    where: { id },
  });

  if (!reuniao) {
    throw new ResponseError(404, "Reunião não encontrada.");
  }

  // Deletar a reunião
  const deletedReuniao = await deleteReuniao(id);

  if (deletedReuniao) {
    // Registrar histórico de deleção de reunião
    await createHistoricoTcc({
      acao: "EXCLUIR",
      entidade: "REUNIAO",
      entidadeId: deletedReuniao.id,
      usuarioId: userId,
      tccId: deletedReuniao.TCC_id,
      descricao: "Reunião deletada",
      detalhes: `Reunião deletada para o TCC: ${deletedReuniao.titulo}.`,
    });
  }

  return deletedReuniao;
}
