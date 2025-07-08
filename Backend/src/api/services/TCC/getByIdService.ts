import {
  getCoorientador,
  getOrientador,
} from "../../repositories/banca/bancaRepository";
import { ResponseError } from "../../helpers/ResponseError";
import { findTCCById } from "../../repositories/TCC/TCCRepository";
import { GetOneTCC } from "./contracts";

/**
 * Serviço para buscar um TCC pelo ID.
 * @returns Lista de TCCs.
 */
export default async function getTccByIdService(
  id: number
): Promise<GetOneTCC> {
  const tcc = await findTCCById(id);

  if (!tcc) {
    throw new ResponseError(404, "Nenhum TCC encontrado.");
  }

  // busca orientador e coorientador
  const orientador = await getOrientador(tcc.id);

  if (!orientador) {
    throw new ResponseError(
      400,
      "Não existe orientador definido para este TCC."
    );
  }

  const coorientador = await getCoorientador(tcc.id);

  return {
    id: tcc.id,
    titulo: tcc.titulo,
    tema: tcc.tema,
    resumo: tcc.resumo,
    dataInicio: tcc.dataInicio,
    dataConclusao: tcc.dataConclusao,
    statusAtual: tcc.statusAtual,
    criado_em: tcc.criado_em,
    atualizado_em: tcc.atualizado_em,
    finalizado_em: tcc.finalizado_em,
    aluno: {
      id: tcc.aluno.id,
      nome: tcc.aluno.nome,
      curso: tcc.aluno.curso,
    },
    orientador: orientador,
    coorientador: coorientador || "Não definido",
  };
}
