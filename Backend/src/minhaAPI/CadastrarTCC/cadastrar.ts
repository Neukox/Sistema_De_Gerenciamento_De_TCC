//Algoritmo de cadastro de TCC

import { Request, Response } from 'express';
import prisma from '../../../prisma/PrismaClient/prisma';
import { StatusTCC } from '@prisma/client';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role: string;
    tipo: string;
    email: string;
  };
}

export async function cadastrarTCC(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        //Desestruturando os dados do corpo da requisição.
        const { titulo, tema, curso, orientador, coorientador, resumo, dataInicio, dataConclusao, statusAtual } = req.body;

        //Verificando se todos os campos obrigatórios foram preenchidos.
        if (!titulo || !tema || !curso || !resumo || !dataInicio || !dataConclusao || !statusAtual) {
            res.status(400).json({
                message: 'Os campos titulo, tema, curso, resumo, dataInicio, dataConclusao e statusAtual são obrigatórios.',
                success: false
            });
            return;
        }

        // Verificar se o status é válido
        const statusValidos = Object.values(StatusTCC);
        if (!statusValidos.includes(statusAtual)) {
            res.status(400).json({
                message: `Status inválido. Status válidos: ${statusValidos.join(', ')}`,
                success: false
            });
            return;
        }

        // Validação e conversão das datas
        const dataInicioDate = new Date(dataInicio);
        const dataConclusaoDate = new Date(dataConclusao);
        
        if (isNaN(dataInicioDate.getTime()) || isNaN(dataConclusaoDate.getTime())) {
            res.status(400).json({
                message: 'Formato de data inválido. Use o formato YYYY-MM-DD ou ISO 8601.',
                success: false
            });
            return;
        }

        if (dataConclusaoDate <= dataInicioDate) {
            res.status(400).json({
                message: 'A data de conclusão deve ser posterior à data de início.',
                success: false
            });
            return;
        }

        // Buscar o aluno logado pelo email do token JWT
        if (!req.user) {
            res.status(401).json({
                message: 'Usuário não autenticado.',
                success: false
            });
            return;
        }

        // Buscar o aluno pelo usuário logado
        const aluno = await prisma.aluno.findFirst({
            where: {
                usuario: {
                    email: req.user.email
                }
            },
            include: {
                usuario: true
            }
        });

        if (!aluno) {
            res.status(403).json({
                message: 'Apenas alunos podem cadastrar TCC.',
                success: false
            });
            return;
        }

        // Verificar se o curso do aluno bate com o curso informado
        if (aluno.curso !== curso) {
            res.status(400).json({
                message: `Curso informado (${curso}) não confere com o curso do aluno (${aluno.curso}).`,
                success: false
            });
            return;
        }

        // Verificar se o aluno já possui um TCC
        const tccExistente = await prisma.tCC.findUnique({
            where: { alunoId: aluno.id }
        });

        if (tccExistente) {
            res.status(400).json({
                message: 'Você já possui um TCC cadastrado.',
                success: false
            });
            return;
        }

        // Buscar orientador pelo nome (se fornecido)
        let orientadorId = null;
        if (orientador && orientador.trim()) {
            // Por enquanto, aceita qualquer nome sem buscar no banco
            console.log(`Orientador informado: ${orientador}`);
        }

        // Buscar coorientador pelo nome (se fornecido)
        let coorientadorId = null;
        if (coorientador && coorientador.trim()) {
            // Por enquanto, aceita qualquer nome sem buscar no banco
            console.log(`Coorientador informado: ${coorientador}`);
        }

        // Verificação removida temporariamente - não há IDs para comparar
        // if (orientadorId && coorientadorId && orientadorId === coorientadorId) {...

        //Se todos os campos foram validados, os dados serão salvos no banco de dados.
        const tccSalvo = await prisma.tCC.create({
            data: {
                titulo,
                tema,
                resumo,
                dataInicio: dataInicioDate,
                dataConclusao: dataConclusaoDate,
                status_atual: statusAtual,
                alunoId: aluno.id,
                orientador_nome: orientador && orientador.trim() ? orientador.trim() : null,
                coorientador_nome: coorientador && coorientador.trim() ? coorientador.trim() : null,
                orientadorId,
                coorientadorId
            },
            include: {
                aluno: {
                    include: {
                        usuario: {
                            select: {
                                nome: true,
                                sobrenome: true,
                                email: true
                            }
                        }
                    }
                },
                orientador: {
                    include: {
                        usuario: {
                            select: {
                                nome: true,
                                sobrenome: true,
                                email: true
                            }
                        }
                    }
                },
                coorientador: {
                    include: {
                        usuario: {
                            select: {
                                nome: true,
                                sobrenome: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });

        //Tudo ocorrendo bem, retorna uma resposta de sucesso.
        res.status(201).json({
            message: 'TCC cadastrado com sucesso.',
            success: true,
            tcc: tccSalvo
        });

    } catch (error) {
        //Se ocorrer algum erro no servidor, retorna uma resposta de erro.
        console.error('Erro ao cadastrar TCC:', error);
        res.status(500).json({
            message: 'Erro interno do servidor.',
            success: false,
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
}