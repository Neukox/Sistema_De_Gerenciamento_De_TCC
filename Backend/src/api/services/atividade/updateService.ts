import { $Enums, Atividade } from "@prisma/client";
import {
  getAtividadeById,
  updateAtividade,
} from "../../repositories/atividades/atividadesRepository";
import { ResponseError } from "../../helpers/ResponseError";
import { createHistoricoTcc } from "../../repositories/historico/historicoRepository";

/**
 * Serviço para atualizar uma atividade existente.
 * @param id - ID da atividade a ser atualizada.
 * @param data - Dados atualizados da atividade.
 * @returns A atividade atualizada ou null se falhar.
 */
export default async function updateAtividadeService(
  id: number,
  data: Partial<Atividade>
): Promise<Atividade | null> {
  // Verifica se a atividade existe
  const atividadeExistente = await getAtividadeById(id);

  if (!atividadeExistente) {
    throw new ResponseError(404, "Atividade não encontrada");
  }

  // converte o status para o formato correto, se fornecido
  if (data.status) {
    data.status = data.status.toUpperCase() as $Enums.StatusAtividade;
  }

  // Atualiza a atividade com os novos dados
  const atividadeAtualizada = await updateAtividade(id, data);

  if (atividadeAtualizada) {
    // Registra a ação no histórico
    await createHistoricoTcc({
      acao: "ALTERAR",
      entidade: "ATIVIDADE",
      entidadeId: atividadeAtualizada.id,
      usuarioId: atividadeAtualizada.Aluno_id, // ID do aluno associado à atividade
      tccId: atividadeAtualizada.TCC_id,
      detalhes: `Atualizou atividade: ${atividadeAtualizada.nome}.`,
    });
  }

  return atividadeAtualizada;
}
