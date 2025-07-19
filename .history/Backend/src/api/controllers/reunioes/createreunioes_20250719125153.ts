import { Response } from "express";
import { RequestWithUser } from "../../types/auth";
import prisma from "../../config/prisma";

/**
 * Interface para os dados de criação de reunião
 */
interface CreateReuniaoData {
  titulo: string;
  descricao?: string;
  data_agendada: string; // ISO string format
  participantes?: string;
  local?: string;
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

    const { titulo, descricao, data_agendada, participantes, local, tcc_id }: CreateReuniaoData = req.body;
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
        message: "Data e hora da reunião são obrigatórias."
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

    // Validar formato da data
    const dataReuniao = new Date(data_agendada);
    if (isNaN(dataReuniao.getTime())) {
      res.status(400).json({
        success: false,
        message: "Formato de data inválido. Use o formato ISO (YYYY-MM-DDTHH:mm:ss)."
      });
      return;
    }

    // Validar se a data não é no passado
    const agora = new Date();
    if (dataReuniao <= agora) {
      res.status(400).json({
        success: false,
        message: "A data da reunião deve ser no futuro."
      });
      return;
    }

    // Validar tamanho dos campos
    if (titulo.trim().length < 3) {
      res.status(400).json({
        success: false,
        message: "Título deve ter pelo menos 3 caracteres."
      });
      return;
    }

    if (titulo.length > 100) {
      res.status(400).json({
        success: false,
        message: "Título deve ter no máximo 100 caracteres."
      });
      return;
    }

    if (descricao && descricao.length > 500) {
      res.status(400).json({
        success: false,
        message: "Descrição deve ter no máximo 500 caracteres."
      });
      return;
    }

    // Verificar se o TCC existe e se o usuário tem acesso a ele
    const tcc = await prisma.tCC.findFirst({
      where: { 
        id: tcc_id,
        OR: [
          { Aluno_id: userId }, // É o aluno do TCC
          { Orientador_id: userId }, // É o orientador
          { Coorientador_id: userId }, // É o coorientador
        ]
      },
      include: {
        Aluno: {
          include: {
            Usuario: {
              select: {
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
                nome_completo: true,
                email: true
              }
            }
          }
        }
      }
    });

    if (!tcc) {
      res.status(404).json({
        success: false,
        message: "TCC não encontrado ou você não tem permissão para agendar reuniões neste TCC."
      });
      return;
    }

    // Verificar se já existe uma reunião agendada no mesmo horário para o TCC
    const reuniaoExistente = await prisma.reuniao.findFirst({
      where: {
        TCC_id: tcc_id,
        data_agendada: dataReuniao,
        status: {
          not: "CANCELADA"
        }
      }
    });

    if (reuniaoExistente) {
      res.status(409).json({
        success: false,
        message: "Já existe uma reunião agendada para este TCC neste horário."
      });
      return;
    }

    // Criar a observação com informações dos participantes e local
    let observacoes = "";
    if (participantes) {
      observacoes += `Participantes: ${participantes}`;
    }
    if (local) {
      if (observacoes) observacoes += " | ";
      observacoes += `Local: ${local}`;
    }

    // Criar a reunião
    const novaReuniao = await prisma.reuniao.create({
      data: {
        titulo: titulo.trim(),
        descricao: descricao?.trim() || null,
        data_agendada: dataReuniao,
        status: "AGENDADA",
        observacoes: observacoes || null,
        TCC_id: tcc_id
      },
      include: {
        TCC: {
          select: {
            id: true,
            titulo: true,
            Aluno: {
              include: {
                Usuario: {
                  select: {
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

    // Resposta de sucesso
    res.status(201).json({
      success: true,
      message: "Reunião agendada com sucesso!",
      reuniao: {
        id: novaReuniao.id,
        titulo: novaReuniao.titulo,
        descricao: novaReuniao.descricao,
        data_agendada: novaReuniao.data_agendada,
        status: novaReuniao.status,
        observacoes: novaReuniao.observacoes,
        tcc: {
          id: novaReuniao.TCC.id,
          titulo: novaReuniao.TCC.titulo,
          aluno: novaReuniao.TCC.Aluno.Usuario.nome_completo
        },
        criado_em: novaReuniao.criado_em
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
