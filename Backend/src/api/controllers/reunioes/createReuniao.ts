import { Response } from "express";
import { RequestWithUser } from "../../types/auth";
import prisma from "../../config/prisma";

/**
 * Interface para os dados de criação de uma reunião
 */
interface CreateReuniaoData {
  titulo: string;
  descricao?: string;
  data_agendada: string;
  observacoes?: string;
  tcc_id: number;
}

/**
 * Controller para criar uma nova reunião
 * @param req - Requisição com dados do usuário autenticado
 * @param res - Resposta da requisição
 */
export const createReuniaoController = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    console.log('=== CRIAR REUNIÃO ===');
    console.log('User ID:', req.user?.id);
    console.log('Body:', req.body);

    const { titulo, descricao, data_agendada, observacoes, tcc_id }: CreateReuniaoData = req.body;
    const userId = req.user?.id;

    // Validações básicas
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Usuário não autenticado."
      });
      return;
    }

    // Validar campos obrigatórios
    if (!titulo || typeof titulo !== 'string') {
      res.status(400).json({
        success: false,
        message: "Título da reunião é obrigatório."
      });
      return;
    }

    if (!data_agendada) {
      res.status(400).json({
        success: false,
        message: "Data agendada é obrigatória."
      });
      return;
    }

    if (!tcc_id || typeof tcc_id !== 'number') {
      res.status(400).json({
        success: false,
        message: "ID do TCC é obrigatório."
      });
      return;
    }

    // Validar formato do título
    const tituloFormatado = titulo.trim();
    if (tituloFormatado.length === 0) {
      res.status(400).json({
        success: false,
        message: "Título não pode estar vazio."
      });
      return;
    }

    if (tituloFormatado.length > 100) {
      res.status(400).json({
        success: false,
        message: "Título deve ter no máximo 100 caracteres."
      });
      return;
    }

    // Validar descrição se fornecida
    if (descricao && descricao.length > 500) {
      res.status(400).json({
        success: false,
        message: "Descrição deve ter no máximo 500 caracteres."
      });
      return;
    }

    // Validar data agendada
    const dataAgendada = new Date(data_agendada);
    if (isNaN(dataAgendada.getTime())) {
      res.status(400).json({
        success: false,
        message: "Formato de data inválido. Use o formato ISO (YYYY-MM-DDTHH:mm:ss)."
      });
      return;
    }

    // Verificar se a data não é no passado
    const agora = new Date();
    if (dataAgendada <= agora) {
      res.status(400).json({
        success: false,
        message: "Data agendada deve ser no futuro."
      });
      return;
    }

    // Verificar se o TCC existe
    const tccExistente = await prisma.tCC.findUnique({
      where: { id: tcc_id },
      include: {
        Aluno: {
          include: {
            Usuario: true
          }
        },
        Orientador: {
          include: {
            Usuario: true
          }
        },
        Coorientador: {
          include: {
            Usuario: true
          }
        }
      }
    });

    if (!tccExistente) {
      res.status(404).json({
        success: false,
        message: "TCC não encontrado."
      });
      return;
    }

    // Verificar se o usuário tem permissão para criar reunião para este TCC
    const isAluno = tccExistente.Aluno.Usuario_id === userId;
    const isOrientador = tccExistente.Orientador?.Usuario_id === userId;
    const isCoorientador = tccExistente.Coorientador?.Usuario_id === userId;

    if (!isAluno && !isOrientador && !isCoorientador) {
      res.status(403).json({
        success: false,
        message: "Você não tem permissão para criar reuniões para este TCC."
      });
      return;
    }

    // Verificar se já existe uma reunião agendada muito próxima (mesmo dia)
    const inicioDoDia = new Date(dataAgendada);
    inicioDoDia.setHours(0, 0, 0, 0);
    const fimDoDia = new Date(dataAgendada);
    fimDoDia.setHours(23, 59, 59, 999);

    const reuniaoConflitante = await prisma.reuniao.findFirst({
      where: {
        TCC_id: tcc_id,
        data_agendada: {
          gte: inicioDoDia,
          lte: fimDoDia
        },
        status: {
          in: ['AGENDADA']
        }
      }
    });

    if (reuniaoConflitante) {
      res.status(409).json({
        success: false,
        message: "Já existe uma reunião agendada para este TCC no mesmo dia."
      });
      return;
    }

    // Criar a reunião
    const novaReuniao = await prisma.reuniao.create({
      data: {
        titulo: tituloFormatado,
        descricao: descricao?.trim() || null,
        data_agendada: dataAgendada,
        observacoes: observacoes?.trim() || null,
        TCC_id: tcc_id,
        status: 'AGENDADA'
      },
      include: {
        TCC: {
          include: {
            Aluno: {
              include: {
                Usuario: {
                  select: {
                    id: true,
                    nome_completo: true,
                    email: true
                  }
                }
              }
            },
            Orientador: {
              include: {
                Usuario: {
                  select: {
                    id: true,
                    nome_completo: true,
                    email: true
                  }
                }
              }
            },
            Coorientador: {
              include: {
                Usuario: {
                  select: {
                    id: true,
                    nome_completo: true,
                    email: true
                  }
                }
              }
            }
          }
        }
      }
    });

    console.log('Reunião criada com sucesso:', novaReuniao.id);

    res.status(201).json({
      success: true,
      message: "Reunião criada com sucesso!",
      reuniao: {
        id: novaReuniao.id,
        titulo: novaReuniao.titulo,
        descricao: novaReuniao.descricao,
        data_agendada: novaReuniao.data_agendada,
        status: novaReuniao.status,
        observacoes: novaReuniao.observacoes,
        criado_em: novaReuniao.criado_em,
        tcc: {
          id: novaReuniao.TCC.id,
          titulo: novaReuniao.TCC.titulo,
          aluno: novaReuniao.TCC.Aluno.Usuario.nome_completo,
          orientador: novaReuniao.TCC.Orientador?.Usuario?.nome_completo || null,
          coorientador: novaReuniao.TCC.Coorientador?.Usuario?.nome_completo || null
        }
      }
    });

  } catch (error) {
    console.error("Erro ao criar reunião:", error);
    
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor ao criar reunião."
    });
  }
};

export default createReuniaoController;
