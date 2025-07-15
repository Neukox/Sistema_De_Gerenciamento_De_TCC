//Algoritmo que calculará o progresso do desenvolvimento do TCC
import { Request, Response } from "express";
import prisma from "../../config/prisma";


/**
 * Controlador para calcular o progresso do desenvolvimento do TCC.
 * @param {Request} req - A requisição HTTP contendo os dados necessários para calcular o progresso.
 * @param {Response} res - A resposta HTTP a ser enviada ao cliente.
 * @returns {Promise<Response>} - Retorna uma resposta JSON com o progresso calculado.
 */

export async function calculateTCCProgressController(
    req: Request, 
    res: Response
): Promise<Response> {
    try {
        const { tccId } = req.params;
        
        // Validar se o ID do TCC foi fornecido
        if (!tccId) {
            return res.status(400).json({
                success: false,
                message: "ID do TCC é obrigatório."
            });
        }

        // Obtendo dados do TCC específico da tabela TCC
        const tcc = await prisma.tCC.findUnique({
            where: {
                id: parseInt(tccId, 10)
            },
            include: {
                Orientador: {
                    include: {
                        Usuario: true
                    }
                },
                Aluno: {
                    include: {
                        Usuario: true
                    }
                },
                Atividades: true
            }
        });

        // Verificar se o TCC existe
        if (!tcc) {
            return res.status(404).json({
                success: false,
                message: "TCC não encontrado."
            });
        }

        // Calcular o progresso baseado nas atividades
        const totalAtividades = tcc.Atividades.length;
        const atividadesConcluidas = tcc.Atividades.filter(
            atividade => atividade.status.nome === "Concluída" || atividade.status.nome === "Finalizada"
        ).length;

        const porcentagemProgresso = totalAtividades > 0 
            ? Math.round((atividadesConcluidas / totalAtividades) * 100) 
            : 0;

        // Determinar status geral do TCC
        let statusGeral = "Não Iniciado";
        if (porcentagemProgresso === 100) {
            statusGeral = "Concluído";
        } else if (porcentagemProgresso > 0) {
            statusGeral = "Em Andamento";
        }

        return res.status(200).json({
            success: true,
            message: "Progresso calculado com sucesso.",
            data: {
                tccId: tcc.id,
                titulo: tcc.titulo,
                aluno: {
                    id: tcc.Aluno.id,
                    nome: tcc.Aluno.nome_completo
                },
                orientador: {
                    id: tcc.Orientador.id,
                    nome: tcc.Orientador.nome_completo
                },
                progresso: {
                    porcentagem: porcentagemProgresso,
                    status: statusGeral,
                    totalAtividades: totalAtividades,
                    atividadesConcluidas: atividadesConcluidas,
                    atividadesPendentes: totalAtividades - atividadesConcluidas
                },
                atividades: tcc.Atividades.map(atividade => ({
                    id: atividade.id,
                    titulo: atividade.titulo,
                    descricao: atividade.descricao,
                    status: atividade.status.nome,
                    dataInicio: atividade.data_inicio,
                    dataFim: atividade.data_fim
                }))
            }
        });

    } catch (error) {
        console.error('Erro ao calcular progresso do TCC:', error);
        
        return res.status(500).json({
            success: false,
            message: "Erro interno do servidor ao calcular o progresso do TCC."
        });
    }
}