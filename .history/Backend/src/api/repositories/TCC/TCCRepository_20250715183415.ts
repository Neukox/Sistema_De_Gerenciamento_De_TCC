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
      dataInicio: data.dataInicio,
      dataConclusao: data.dataConclusao,
      status_atual: data.statusAtual,
      orientador_nome: data.orientadorNome,
      coorientador_nome: data.coorientadorNome,
      Aluno: {
        connect: { Usuario_id: data.alunoId },
      },
      AreaConhecimento: {
        connect: { id: data.areaConhecimentoId },
      },
    },
    include: {
      Aluno: {
        select: {
          Usuario_id: true,
          curso: true,
          Usuario: {
            select: {
              nome_completo: true,
              email: true,
            },
          },
        },
      },
      AreaConhecimento: {
        select: {
          id: true,
          nome: true,
        },
      },
      Orientador: {
        select: {
          Usuario_id: true,
          area_atuacao: true,
          Usuario: {
            select: {
              nome_completo: true,
              email: true,
            },
          },
        },
      },
      Coorientador: {
        select: {
          Usuario_id: true,
          area_atuacao: true,
          Usuario: {
            select: {
              nome_completo: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return {
    id: tcc.id,
    titulo: tcc.titulo,
    tema: tcc.tema,
    curso: tcc.Aluno.curso,
    resumo: tcc.resumo,
    dataInicio: tcc.dataInicio,
    dataConclusao: tcc.dataConclusao,
    statusAtual: tcc.status_atual,
    criado_em: tcc.criado_em,
    aluno: {
      id: tcc.Aluno.Usuario_id,
      nome: tcc.Aluno.Usuario.nome_completo,
      curso: tcc.Aluno.curso,
      email: tcc.Aluno.Usuario.email,
    },
    areaConhecimento: {
      id: tcc.AreaConhecimento?.id,
      nome: tcc.AreaConhecimento?.nome,
    },
    orientador: {
      id: tcc.Orientador.Usuario_id,
      nome: tcc.Orientador.Usuario.nome_completo,
      area_atuacao: tcc.Orientador.area_atuacao,
      email: tcc.Orientador.Usuario.email,
    },
    coorientador: tcc.Coorientador
      ? {
          id: tcc.Coorientador.Usuario_id,
          nome: tcc.Coorientador.Usuario.nome_completo,
          area_atuacao: tcc.Coorientador.area_atuacao,
          email: tcc.Coorientador.Usuario.email,
        }
      : "Não definido",
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
              email: true,
            },
          },
        },
      },
      AreaConhecimento: {
        select: {
          id: true,
          nome: true,
        },
      },
      Orientador: {
        select: {
          area_atuacao: true,
          Usuario: {
            select: {
              id: true,
              nome_completo: true,
              email: true,
            },
          },
        },
      },
      Coorientador: {
        select: {
          area_atuacao: true,
          Usuario: {
            select: {
              id: true,
              nome_completo: true,
              email: true,
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
    dataInicio: tcc.dataInicio,
    dataConclusao: tcc.dataConclusao,
    statusAtual: tcc.status_atual,
    criado_em: tcc.criado_em,
    atualizado_em: tcc.ultima_atualizacao,
    finalizado_em: tcc.finalizado_em || null,
    aluno: {
      id: tcc.Aluno.Usuario.id,
      nome: tcc.Aluno.Usuario.nome_completo,
      curso: tcc.Aluno.curso,
      email: tcc.Aluno.Usuario.email,
    },
    areaConhecimento: {
      id: tcc.AreaConhecimento?.id,
      nome: tcc.AreaConhecimento?.nome,
    },
    orientador: {
      id: tcc.Orientador.Usuario.id,
      nome: tcc.Orientador.Usuario.nome_completo,
      area_atuacao: tcc.Orientador.area_atuacao,
      email: tcc.Orientador.Usuario.email,
    },
    coorientador: tcc.Coorientador
      ? {
          id: tcc.Coorientador.Usuario.id,
          nome: tcc.Coorientador.Usuario.nome_completo,
          area_atuacao: tcc.Coorientador.area_atuacao,
          email: tcc.Coorientador.Usuario.email,
        }
      : "Não definido",
  }));
}

/**
 * Busca um TCC pelo ID do aluno.
 * @param id - ID do TCC a ser buscado.
 * @returns O TCC encontrado ou null se não existir.
 */
export async function findTCCByAlunoId(
  id: number
): Promise<GetTCCQuery | null> {
  const tcc = await prisma.tCC.findFirst({
    where: {
      Aluno: {
        Usuario_id: id,
      },
    },
    include: {
      Aluno: {
        select: {
          Usuario_id: true,
          curso: true,
          Usuario: {
            select: {
              nome_completo: true,
              email: true,
            },
          },
        },
      },
      AreaConhecimento: {
        select: {
          id: true,
          nome: true,
        },
      },
      Orientador: {
        select: {
          Usuario_id: true,
          area_atuacao: true,
          Usuario: {
            select: {
              nome_completo: true,
              email: true,
            },
          },
        },
      },
      Coorientador: {
        select: {
          Usuario_id: true,
          area_atuacao: true,
          Usuario: {
            select: {
              nome_completo: true,
              email: true,
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
    dataInicio: tcc.dataInicio,
    dataConclusao: tcc.dataConclusao,
    statusAtual: tcc.status_atual,
    criado_em: tcc.criado_em,
    atualizado_em: tcc.ultima_atualizacao,
    finalizado_em: tcc.finalizado_em || null,
    aluno: {
      id: tcc.Aluno.Usuario_id,
      nome: tcc.Aluno.Usuario.nome_completo,
      curso: tcc.Aluno.curso,
      email: tcc.Aluno.Usuario.email,
    },
    orientador: {
      id: tcc.Orientador.Usuario_id,
      nome: tcc.Orientador.Usuario.nome_completo,
      area_atuacao: tcc.Orientador.area_atuacao,
      email: tcc.Orientador.Usuario.email,
    },
    coorientador: tcc.Coorientador
      ? {
          id: tcc.Coorientador.Usuario_id,
          nome: tcc.Coorientador.Usuario.nome_completo,
          area_atuacao: tcc.Coorientador.area_atuacao,
          email: tcc.Coorientador.Usuario.email,
        }
      : "Não definido",
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
              email: true,
            },
          },
        },
      },
      AreaConhecimento: {
        select: {
          id: true,
          nome: true,
        },
      },
      Orientador: {
        select: {
          area_atuacao: true,
          Usuario: {
            select: {
              id: true,
              nome_completo: true,
              email: true,
            },
          },
        },
      },
      Coorientador: {
        select: {
          area_atuacao: true,
          Usuario: {
            select: {
              id: true,
              nome_completo: true,
              email: true,
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
    dataInicio: tcc.dataInicio,
    dataConclusao: tcc.dataConclusao,
    statusAtual: tcc.status_atual,
    criado_em: tcc.criado_em,
    atualizado_em: tcc.ultima_atualizacao,
    finalizado_em: tcc.finalizado_em || null,
    aluno: {
      id: tcc.Aluno.Usuario.id,
      nome: tcc.Aluno.Usuario.nome_completo,
      curso: tcc.Aluno.curso,
      email: tcc.Aluno.Usuario.email,
    },
    areaConhecimento: {
      id: tcc.AreaConhecimento?.id,
      nome: tcc.AreaConhecimento?.nome,
    },
    orientador: {
      id: tcc.Orientador.Usuario.id,
      nome: tcc.Orientador.Usuario.nome_completo,
      area_atuacao: tcc.Orientador.area_atuacao,
      email: tcc.Orientador.Usuario.email,
    },
    coorientador: tcc.Coorientador
      ? {
          id: tcc.Coorientador.Usuario.id,
          nome: tcc.Coorientador.Usuario.nome_completo,
          area_atuacao: tcc.Coorientador.area_atuacao,
          email: tcc.Coorientador.Usuario.email,
        }
      : "Não definido",
  };
}
