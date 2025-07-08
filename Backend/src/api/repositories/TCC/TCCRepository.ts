import { PapelBanca } from "@prisma/client";
import prisma from "../../config/prisma";
import { GetTCCQuery, ICreateTCC } from "./interfaces";
import { CreateTCCPayload } from "./interfaces";

/**
 * Cria um novo TCC no banco de dados.
 * @param data - Dados do TCC a ser criado.
 * @returns O TCC criado.
 */
export async function createTCC(data: ICreateTCC): Promise<CreateTCCPayload> {
  const tcc = await prisma.tCC.create({
    data: {
      titulo: data.titulo,
      tema: data.tema,
      resumo: data.resumo,
      data_inicio: data.dataInicio,
      data_prevista_entrega: data.dataConclusao,
      status_atual: data.statusAtual,
      Aluno: {
        connect: { Usuario_id: data.alunoId },
      },
      Bancas: {
        create: [
          {
            Professor_id: data.orientadorId,
            papel: PapelBanca.ORIENTADOR,
          },
          ...(data.coorientadorId
            ? [
                {
                  Professor_id: data.coorientadorId,
                  papel: PapelBanca.COORIENTADOR,
                },
              ]
            : []),
        ],
      },
    },
    include: {
      Aluno: {
        select: {
          curso: true,
          Usuario: {
            select: {
              nome_completo: true,
            },
          },
        },
      },
      Bancas: {
        include: {
          Professor: {
            select: {
              Usuario_id: true,
              Usuario: {
                select: {
                  nome_completo: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return {
    titulo: tcc.titulo,
    tema: tcc.tema,
    curso: tcc.Aluno.curso,
    resumo: tcc.resumo,
    dataInicio: tcc.data_inicio,
    dataConclusao: tcc.data_prevista_entrega,
    statusAtual: tcc.status_atual,
    aluno: tcc.Aluno.Usuario.nome_completo,
    orientador:
      tcc.Bancas.find((banca) => banca.papel === PapelBanca.ORIENTADOR)
        ?.Professor.Usuario.nome_completo || "Não definido",
    coorientador:
      tcc.Bancas.find((banca) => banca.papel === PapelBanca.COORIENTADOR)
        ?.Professor.Usuario.nome_completo || "Não definido",
  };
}

/**
 * Buscar todos os TCCs do banco de dados.
 * @returns Lista de TCCs.
 */
export async function findAllTCCs(): Promise<GetTCCQuery[]> {
  const tccs = await prisma.tCC.findMany({
    include: {
      Aluno: {
        select: {
          curso: true,
          Usuario: {
            select: {
              id: true,
              nome_completo: true,
            },
          },
        },
      },
    },
  });

  return tccs.map((tcc) => ({
    id: tcc.id,
    titulo: tcc.titulo,
    tema: tcc.tema,
    resumo: tcc.resumo,
    dataInicio: tcc.data_inicio,
    dataConclusao: tcc.data_prevista_entrega,
    statusAtual: tcc.status_atual,
    criado_em: tcc.criado_em,
    atualizado_em: tcc.ultima_atualizacao,
    finalizado_em: tcc.finalizado_em || null,
    aluno: {
      id: tcc.Aluno.Usuario.id,
      nome: tcc.Aluno.Usuario.nome_completo,
      curso: tcc.Aluno.curso,
    },
  }));
}

/**
 * Busca um TCC pelo ID do aluno.
 * @param id - ID do TCC a ser buscado.
 * @returns O TCC encontrado ou null se não existir.
 */
export async function findTCCByAlunoId(id: number): Promise<GetTCCQuery | null> {
  const tcc = await prisma.tCC.findFirst({
    where: {
      Aluno: {
        Usuario_id: id,
      },
    },
    include: {
      Aluno: {
        select: {
          curso: true,
          Usuario: {
            select: {
              id: true,
              nome_completo: true,
            },
          },
        },
      },
    },
  });

  if(!tcc) {
    return null;
  }

  return {
    id: tcc.id,
    titulo: tcc.titulo,
    tema: tcc.tema,
    resumo: tcc.resumo,
    dataInicio: tcc.data_inicio,
    dataConclusao: tcc.data_prevista_entrega,
    statusAtual: tcc.status_atual,
    criado_em: tcc.criado_em,
    atualizado_em: tcc.ultima_atualizacao,
    finalizado_em: tcc.finalizado_em || null,
    aluno: {
      id: tcc.Aluno.Usuario.id,
      nome: tcc.Aluno.Usuario.nome_completo,
      curso: tcc.Aluno.curso,
    },
  };
}

/**
 * Busca um TCC pelo ID.
 * @param id - ID do TCC a ser buscado.
 * @returns O TCC encontrado ou null se não existir.
 */
export async function findTCCById(id: number): Promise<GetTCCQuery | null> {
  const tcc = await prisma.tCC.findUnique({
    where: {
      id: id,
    },
    include: {
      Aluno: {
        select: {
          curso: true,
          Usuario: {
            select: {
              id: true,
              nome_completo: true,
            },
          },
        },
      },
    },
  });

  if (!tcc) {
    return null;
  }

  return {
    id: tcc.id,
    titulo: tcc.titulo,
    tema: tcc.tema,
    resumo: tcc.resumo,
    dataInicio: tcc.data_inicio,
    dataConclusao: tcc.data_prevista_entrega,
    statusAtual: tcc.status_atual,
    criado_em: tcc.criado_em,
    atualizado_em: tcc.ultima_atualizacao,
    finalizado_em: tcc.finalizado_em || null,
    aluno: {
      id: tcc.Aluno.Usuario.id,
      nome: tcc.Aluno.Usuario.nome_completo,
      curso: tcc.Aluno.curso,
    },
  };
}
