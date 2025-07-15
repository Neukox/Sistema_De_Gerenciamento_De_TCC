//Algoritmo que calculará o progresso do desenvolvimento do TCC baseado em 5 pilares
import { Request, Response } from "express";
import prisma from "../../config/prisma";

// Interface para o cálculo de progresso
interface ProgressoCalculado {
  progresso_tarefas: number;
  progresso_etapas: number;
  progresso_anotacoes: number;
  progresso_reunioes: number;
  progresso_defesas: number;
  progresso_total: number;
}

// Constantes dos pesos para cada componente (soma = 100%)
const PESO_TAREFAS = 30;
const PESO_ETAPAS = 30;
const PESO_ANOTACOES = 10;
const PESO_REUNIOES = 10;
const PESO_DEFESAS = 20;

// Quantidade mínima de anotações para obter pontuação completa
const MIN_ANOTACOES_COMPLETAS = 10;

/**
 * Controlador para calcular o progresso do desenvolvimento do TCC.
 * Baseado em 5 pilares: Tarefas (30%), Etapas (30%), Anotações (10%), Reuniões (10%), Defesas (20%)
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

        // Obtendo dados completos do TCC
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
                Atividades: true,
                Anotacoes: true
            }
        });

        // Verificar se o TCC existe
        if (!tcc) {
            return res.status(404).json({
                success: false,
                message: "TCC não encontrado."
            });
        }

        // Buscar etapas, reuniões e defesas separadamente por enquanto
        const etapas = await prisma.etapaTCC.findMany({
            where: { TCC_id: tcc.id }
        });
        
        const reunioes = await prisma.reuniao.findMany({
            where: { TCC_id: tcc.id }
        });
        
        const defesas = await prisma.defesa.findMany({
            where: { TCC_id: tcc.id }
        });

        // Calcular o progresso baseado nos 5 pilares
        const progresso = calcularProgressoCompleto({
            ...tcc,
            EtapasTCC: etapas,
            Reunioes: reunioes,
            Defesas: defesas
        });

        // Determinar status geral do TCC
        let statusGeral = "Não Iniciado";
        if (progresso.progresso_total === 100) {
            statusGeral = "Concluído";
        } else if (progresso.progresso_total > 0) {
            statusGeral = "Em Andamento";
        }

        return res.status(200).json({
            success: true,
            message: "Progresso calculado com sucesso.",
            data: {
                tccId: tcc.id,
                titulo: tcc.titulo,
                aluno: {
                    id: tcc.Aluno.Usuario.id,
                    nome: tcc.Aluno.Usuario.nome_completo,
                    curso: tcc.Aluno.curso
                },
                orientador: {
                    id: tcc.Orientador.Usuario.id,
                    nome: tcc.Orientador.Usuario.nome_completo,
                    areaAtuacao: tcc.Orientador.area_atuacao
                },
                progresso: {
                    total: Math.round(progresso.progresso_total * 100) / 100,
                    status: statusGeral,
                    statusAtual: tcc.status_atual,
                    detalhamento: {
                        tarefas: {
                            pontuacao: Math.round(progresso.progresso_tarefas * 100) / 100,
                            peso: PESO_TAREFAS,
                            total: tcc.Atividades.length,
                            concluidas: tcc.Atividades.filter((a: any) => a.status === "CONCLUIDA").length
                        },
                        etapas: {
                            pontuacao: Math.round(progresso.progresso_etapas * 100) / 100,
                            peso: PESO_ETAPAS,
                            total: etapas.length,
                            concluidas: etapas.filter((e: any) => e.status === "CONCLUIDA").length
                        },
                        anotacoes: {
                            pontuacao: Math.round(progresso.progresso_anotacoes * 100) / 100,
                            peso: PESO_ANOTACOES,
                            total: tcc.Anotacoes.length,
                            minimo: MIN_ANOTACOES_COMPLETAS
                        },
                        reunioes: {
                            pontuacao: Math.round(progresso.progresso_reunioes * 100) / 100,
                            peso: PESO_REUNIOES,
                            agendadas: reunioes.length,
                            realizadas: reunioes.filter((r: any) => r.status === "REALIZADA").length
                        },
                        defesas: {
                            pontuacao: Math.round(progresso.progresso_defesas * 100) / 100,
                            peso: PESO_DEFESAS,
                            preBanca: defesas.find((d: any) => d.tipo === "PRE_BANCA")?.status === "REALIZADA",
                            bancaFinal: defesas.find((d: any) => d.tipo === "BANCA_FINAL")?.status === "REALIZADA"
                        }
                    }
                }
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

/**
 * Função principal para calcular o progresso completo do TCC
 */
function calcularProgressoCompleto(tcc: any): ProgressoCalculado {
    // 1. Progresso das Tarefas (30%)
    const totalTarefas = tcc.Atividades?.length || 0;
    const tarefasConcluidas = tcc.Atividades?.filter((atividade: any) => atividade.status === "CONCLUIDA").length || 0;
    const progresso_tarefas = totalTarefas > 0 ? (tarefasConcluidas / totalTarefas) * PESO_TAREFAS : 0;

    // 2. Progresso das Etapas (30%)
    const totalEtapas = tcc.EtapasTCC?.length || 0;
    const etapasConcluidas = tcc.EtapasTCC?.filter((etapa: any) => etapa.status === "CONCLUIDA").length || 0;
    const progresso_etapas = totalEtapas > 0 ? (etapasConcluidas / totalEtapas) * PESO_ETAPAS : 0;

    // 3. Progresso das Anotações (10%)
    const qtdAnotacoes = tcc.Anotacoes?.length || 0;
    const progresso_anotacoes = Math.min((qtdAnotacoes / MIN_ANOTACOES_COMPLETAS), 1) * PESO_ANOTACOES;

    // 4. Progresso das Reuniões (10%)
    const reunioesAgendadas = tcc.Reunioes?.length || 0;
    const reunioesCumpridas = tcc.Reunioes?.filter((reuniao: any) => reuniao.status === "REALIZADA").length || 0;
    const progresso_reunioes = reunioesAgendadas > 0 ? (reunioesCumpridas / reunioesAgendadas) * PESO_REUNIOES : 0;

    // 5. Progresso das Defesas (20% = 10% pré-banca + 10% banca final)
    let progresso_defesas = 0;
    const preBanca = tcc.Defesas?.find((defesa: any) => defesa.tipo === "PRE_BANCA");
    const bancaFinal = tcc.Defesas?.find((defesa: any) => defesa.tipo === "BANCA_FINAL");
    
    if (preBanca?.status === "REALIZADA") {
        progresso_defesas += 10; // 10% para pré-banca
    }
    if (bancaFinal?.status === "REALIZADA") {
        progresso_defesas += 10; // 10% para banca final
    }

    // Cálculo do progresso total
    const progresso_total = progresso_tarefas + progresso_etapas + progresso_anotacoes + progresso_reunioes + progresso_defesas;

    return {
        progresso_tarefas,
        progresso_etapas,
        progresso_anotacoes,
        progresso_reunioes,
        progresso_defesas,
        progresso_total
    };
}

/**
 * Controlador para obter progresso de todos os TCCs de um orientador
 */
export async function getOrientadorTCCsProgressController(
    req: Request, 
    res: Response
): Promise<Response> {
    try {
        const { orientadorId } = req.params;
        
        if (!orientadorId) {
            return res.status(400).json({
                success: false,
                message: "ID do orientador é obrigatório."
            });
        }

        const tccs = await prisma.tCC.findMany({
            where: {
                Orientador_id: parseInt(orientadorId, 10)
            },
            include: {
                Aluno: {
                    include: {
                        Usuario: true
                    }
                },
                Atividades: true,
                Anotacoes: true
            }
        });

        const progressos = await Promise.all(tccs.map(async (tcc) => {
            // Buscar dados adicionais para cada TCC
            const etapas = await prisma.etapaTCC.findMany({
                where: { TCC_id: tcc.id }
            });
            
            const reunioes = await prisma.reuniao.findMany({
                where: { TCC_id: tcc.id }
            });
            
            const defesas = await prisma.defesa.findMany({
                where: { TCC_id: tcc.id }
            });

            const progresso = calcularProgressoCompleto({
                ...tcc,
                EtapasTCC: etapas,
                Reunioes: reunioes,
                Defesas: defesas
            });

            return {
                tccId: tcc.id,
                titulo: tcc.titulo,
                aluno: tcc.Aluno.Usuario.nome_completo,
                progressoTotal: Math.round(progresso.progresso_total * 100) / 100,
                status: tcc.status_atual
            };
        }));

        return res.status(200).json({
            success: true,
            message: "Progressos calculados com sucesso.",
            data: progressos
        });

    } catch (error) {
        console.error('Erro ao calcular progressos dos TCCs:', error);
        
        return res.status(500).json({
            success: false,
            message: "Erro interno do servidor ao calcular progressos."
        });
    }
}