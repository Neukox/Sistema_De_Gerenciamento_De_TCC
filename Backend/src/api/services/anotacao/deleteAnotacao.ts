import { deleteAnotacao } from "../../repositories/anotacoes/anotacoesRepository";

/**
 * Service para deletar uma anotação
 * @param id - ID da anotação a ser deletada
 */

export default async function deleteAnotacaoService(id: number): Promise<void> {
  // Chama o repositório para deletar a anotação
  await deleteAnotacao(id);
}
