import { Response } from "express";
import { RequestWithUser } from "../../types/auth";
import prisma from "../../config/prisma";

/**
 * Controller para deletar/cancelar uma reunião
 * @param req - Requisição com dados do usuário autenticado
 * @param res - Resposta da requisição
 */
export const deleteReuniao = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    console.log('=== DELETAR REUNIÃO ===');
    console.log('User ID:', req.user?.id);
    console.log('Reunião ID:', req.params.id);

    const userId = req.user?.id;
    const reuniaoId = parseInt(req.params.id, 10);
    const { forceDelete = false } = req.query;

    // Validações básicas
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Usuário não autenticado."
      });
      return;
    }

    if (isNaN(reuniaoId) || reuniaoId <= 0) {
      res.status(400).json({
        success: false,
        message: "ID da reunião inválido."
      });
      return;
    }

    // Verificar se a reunião existe e se o usuário tem acesso
    const reuniaoExistente = await prisma.reuniao.findFirst({
      where: {
        id: reuniaoId,
        TCC: {
          OR: [
            { Aluno_id: userId },
            { Orientador_id: userId },
            { Coorientador_id: userId }
          ]
        }
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

    if (!reuniaoExistente) {
      res.status(404).json({
        success: false,
        message: "Reunião não encontrada ou você não tem permissão para deletá-la."
      });
      return;
    }

    // Verificar se a reunião já foi realizada
    if (reuniaoExistente.status === 'REALIZADA' && !forceDelete) {
      res.status(400).json({
        success: false,
        message: "Não é possível deletar uma reunião que já foi realizada. Use o parâmetro forceDelete=true se necessário."
      });
      return;
    }

    let reuniaoAtualizada;
    let message;

    // Se forceDelete for true, deletar permanentemente
    if (forceDelete === 'true') {
      await prisma.reuniao.delete({
        where: { id: reuniaoId }
      });
      
      message = "Reunião deletada permanentemente com sucesso!";
      reuniaoAtualizada = null;
      
      console.log('Reunião deletada permanentemente:', reuniaoId);
    } else {
      // Caso contrário, apenas marcar como cancelada
      reuniaoAtualizada = await prisma.reuniao.update({
        where: { id: reuniaoId },
        data: {
          status: 'CANCELADA',
          observacoes: reuniaoExistente.observacoes 
            ? `${reuniaoExistente.observacoes} | Cancelada em ${new Date().toLocaleString('pt-BR')}`
            : `Cancelada em ${new Date().toLocaleString('pt-BR')}`
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

      message = "Reunião cancelada com sucesso!";
      
      console.log('Reunião cancelada:', reuniaoAtualizada.id);
    }

    // Resposta de sucesso
    const response: any = {
      success: true,
      message,
    };

    if (reuniaoAtualizada) {
      response.reuniao = {
        id: reuniaoAtualizada.id,
        titulo: reuniaoAtualizada.titulo,
        descricao: reuniaoAtualizada.descricao,
        data_agendada: reuniaoAtualizada.data_agendada,
        data_realizada: reuniaoAtualizada.data_realizada,
        status: reuniaoAtualizada.status,
        observacoes: reuniaoAtualizada.observacoes,
        tcc: {
          id: reuniaoAtualizada.TCC.id,
          titulo: reuniaoAtualizada.TCC.titulo,
          aluno: reuniaoAtualizada.TCC.Aluno.Usuario.nome_completo
        },
        criado_em: reuniaoAtualizada.criado_em
      };
    }

    res.status(200).json(response);

  } catch (error) {
    console.error("Erro ao deletar reunião:", error);
    
    // Verificar se é erro de foreign key constraint
    if (error instanceof Error && error.message.includes('foreign key constraint')) {
      res.status(400).json({
        success: false,
        message: "Não é possível deletar esta reunião pois ela possui dependências. Use cancelamento ao invés de deleção."
      });
      return;
    }
    
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor ao deletar reunião."
    });
  }
};

export default deleteReuniao;
