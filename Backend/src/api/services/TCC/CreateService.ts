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
  if (!data.orientadorId) {
    throw new ResponseError(
      400,
      "O orientador é obrigatório para criar um TCC."
    );
  }

  // Verifica se o orientador existe
  const orientador = await findProfessorByUsuarioId(data.orientadorId);

  if (!orientador) {
    throw new ResponseError(404, "Orientador não encontrado.");
  }

  // Verifica se o coorientador existe, se fornecido
  if (data.coorientadorId) {
    const coorientador = await findProfessorByUsuarioId(data.coorientadorId);
    if (!coorientador) {
      throw new ResponseError(404, "Coorientador não encontrado.");
    }
  }

  // Validação de limite de orientação
  const count = await prisma.banca.count({
    where: {
      Professor: {
        Usuario_id: data.orientadorId,
      },
      papel: "ORIENTADOR",
    },
  });

  if (count >= 5) {
    throw new ResponseError(
      400,
      "O orientador já atingiu o limite de 5 orientações."
    );
  }

  // Criação do TCC
  const tcc = await createTCC({
    titulo: data.titulo,
    tema: data.tema,
    resumo: data.resumo,
    dataInicio: dataInicioDate,
    dataConclusao: dataConclusaoDate,
    statusAtual: data.statusAtual,
    alunoId: data.alunoId,
    areaConhecimentoId: data.areaConhecimentoId, // ID da área de conhecimento
    orientadorId: data.orientadorId,
    coorientadorId: data.coorientadorId, // Opcional, pode ser nulo se não houver coorientador
  });

  // Criação da banca
  await createBanca(tcc.id, data.orientadorId, "ORIENTADOR");

  // Se houver coorientador, cria a banca para ele também
  if (data.coorientadorId) {
    await createBanca(tcc.id, data.coorientadorId, "COORIENTADOR");
  }

  return tcc;
}
