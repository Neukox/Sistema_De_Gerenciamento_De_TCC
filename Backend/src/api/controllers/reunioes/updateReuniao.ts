import { Response } from "express";
import { RequestWithUser } from "../../types/auth";
import prisma from "../../config/prisma";

/**
 * Interface para os dados de atualização de reunião
 */
interface UpdateReuniaoData {
  titulo?: string;
  descricao?: string;
  data_agendada?: string;
  status?: string;
  participantes?: string;
  local?: string;
  observacoes?: string;
}

/**
 * Controller para atualizar uma reunião existente
 * @param req - Requisição com dados do usuário autenticado
 * @param res - Resposta da requisição
 */
export const updateReuniao = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    console.log('=== ATUALIZAR REUNIÃO ===');
    console.log('User ID:', req.user?.id);
    console.log('Reunião ID:', req.params.id);
    console.log('Body:', req.body);

    const userId = req.user?.id;
    const reuniaoId = parseInt(req.params.id, 10);
    const updateData: UpdateReuniaoData = req.body;

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
            titulo: true
          }
        }
      }
    });

    if (!reuniaoExistente) {
      res.status(404).json({
        success: false,
        message: "Reunião não encontrada ou você não tem permissão para editá-la."
      });
      return;
    }

    // Preparar dados para atualização
    const dadosAtualizacao: any = {
      atualizado_em: new Date()
    };

    // Validar e processar título
    if (updateData.titulo !== undefined) {
      if (typeof updateData.titulo !== 'string' || updateData.titulo.trim().length < 3) {
        res.status(400).json({
          success: false,
          message: "Título deve ter pelo menos 3 caracteres."
        });
        return;
      }

      if (updateData.titulo.length > 100) {
        res.status(400).json({
          success: false,
          message: "Título deve ter no máximo 100 caracteres."
        });
        return;
      }

      dadosAtualizacao.titulo = updateData.titulo.trim();
    }

    // Validar e processar descrição
    if (updateData.descricao !== undefined) {
      if (updateData.descricao && updateData.descricao.length > 500) {
        res.status(400).json({
          success: false,
          message: "Descrição deve ter no máximo 500 caracteres."
        });
        return;
      }

      dadosAtualizacao.descricao = updateData.descricao?.trim() || null;
    }

    // Validar e processar data_agendada
    if (updateData.data_agendada !== undefined) {
      const novaData = new Date(updateData.data_agendada);
      if (isNaN(novaData.getTime())) {
        res.status(400).json({
          success: false,
          message: "Formato de data inválido. Use o formato ISO (YYYY-MM-DDTHH:mm:ss)."
        });
        return;
      }

      // Só validar data futura se a reunião ainda não foi realizada
      if (reuniaoExistente.status === 'AGENDADA') {
        const agora = new Date();
        if (novaData <= agora) {
          res.status(400).json({
            success: false,
            message: "A data da reunião deve ser no futuro."
          });
          return;
        }

        // Verificar conflito de horário apenas se mudou a data
        if (novaData.getTime() !== reuniaoExistente.data_agendada.getTime()) {
          const conflito = await prisma.reuniao.findFirst({
            where: {
              TCC_id: reuniaoExistente.TCC.id,
              data_agendada: novaData,
              status: { not: "CANCELADA" },
              id: { not: reuniaoId }
            }
          });

          if (conflito) {
            res.status(409).json({
              success: false,
              message: "Já existe uma reunião agendada para este TCC neste horário."
            });
            return;
          }
        }
      }

      dadosAtualizacao.data_agendada = novaData;
    }

    // Validar e processar status
    if (updateData.status !== undefined) {
      const validStatuses = ['AGENDADA', 'REALIZADA', 'CANCELADA', 'NAO_COMPARECEU'];
      if (!validStatuses.includes(updateData.status.toUpperCase())) {
        res.status(400).json({
          success: false,
          message: "Status inválido. Use: AGENDADA, REALIZADA, CANCELADA ou NAO_COMPARECEU."
        });
        return;
      }

      dadosAtualizacao.status = updateData.status.toUpperCase();

      // Se marcar como realizada, definir data_realizada
      if (updateData.status.toUpperCase() === 'REALIZADA') {
        dadosAtualizacao.data_realizada = new Date();
      }
    }

    // Processar observações com participantes e local
    if (updateData.participantes !== undefined || updateData.local !== undefined || updateData.observacoes !== undefined) {
      let observacoes = updateData.observacoes || "";
      
      if (updateData.participantes) {
        if (observacoes) observacoes += " | ";
        observacoes += `Participantes: ${updateData.participantes}`;
      }
      
      if (updateData.local) {
        if (observacoes) observacoes += " | ";
        observacoes += `Local: ${updateData.local}`;
      }

      dadosAtualizacao.observacoes = observacoes || null;
    }

    // Atualizar a reunião
    const reuniaoAtualizada = await prisma.reuniao.update({
      where: { id: reuniaoId },
      data: dadosAtualizacao,
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

    console.log('Reunião atualizada com sucesso:', reuniaoAtualizada.id);

    // Resposta de sucesso
    res.status(200).json({
      success: true,
      message: "Reunião atualizada com sucesso!",
      reuniao: {
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
      }
    });

  } catch (error) {
    console.error("Erro ao atualizar reunião:", error);
    
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor ao atualizar reunião."
    });
  }
};

export default updateReuniao;
