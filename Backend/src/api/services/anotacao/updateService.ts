import { updateAnotacao } from "../../repositories/anotacoes/anotacoesRepository";
import { Anotacao } from "@prisma/client";

/**
 * Serviço para atualizar uma anotação existente.
 * @param id - ID da anotação a ser atualizada
 * @param data - Dados atualizados da anotação
 * @returns Anotação atualizada
 */
export default async function updateAnotacaoService(
  id: number,
  conteudo: string
): Promise<Anotacao | null> {
  // Atualiza a anotação com os novos dados
  const updatedAnotacao = await updateAnotacao(id, conteudo);

  return updatedAnotacao;
}
