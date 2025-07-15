import {
  createTCC,
  findTCCByAlunoId,
} from "../../repositories/TCC/TCCRepository";
import { ResponseError } from "../../helpers/ResponseError";
import prisma from "../../config/prisma";
import { CreateTCCPayload } from "../../repositories/TCC/interfaces";
import { ICreateTCCService } from "./contracts";
import { findProfessorByUsuarioId } from "../../repositories/professor/professorRepository";
import { createBanca } from "../../repositories/banca/bancaRepository";

export default async function createTCCService(
  data: ICreateTCCService
): Promise<CreateTCCPayload> {
  // Validação de limite de TCCs
  const existingTCCs = await findTCCByAlunoId(data.alunoId);

  if (existingTCCs) {
    throw new ResponseError(
      400,
      "O aluno já possui um TCC cadastrado. Não é possível criar mais de um TCC."
    );
  }

  // Validação de datas
  const dataInicioDate = new Date(data.dataInicio as string);
  const dataConclusaoDate = new Date(data.dataConclusao as string);

  if (isNaN(dataInicioDate.getTime()) || isNaN(dataConclusaoDate.getTime())) {
    throw new ResponseError(
      400,
      "Formato de data inválido. Use o formato YYYY-MM-DD ou ISO 8601."
    );
  }

  if (dataConclusaoDate <= dataInicioDate) {
    throw new ResponseError(
      400,
      "A data de conclusão deve ser posterior à data de início."
    );
  }

  // Validação de orientador
  if (!data.orientadorNome) {
    throw new ResponseError(
      400,
      "O nome do orientador é obrigatório para criar um TCC."
    );
  }

  // Criação do TCC com orientador como string
  const tcc = await createTCC({
    titulo: data.titulo,
    tema: data.tema,
    resumo: data.resumo,
    dataInicio: dataInicioDate,
    dataConclusao: dataConclusaoDate,
    statusAtual: data.statusAtual,
    alunoId: data.alunoId,
    areaConhecimentoId: data.areaConhecimentoId,
    orientadorNome: data.orientadorNome,
    coorientadorNome: data.coorientadorNome,
  });

  return tcc;
}
