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
        const { titulo, tema, curso, orientador, coorientador, resumo, statusAtual } = req.body;

        //Verificando se todos os campos obrigatórios foram preenchidos.
        if (!titulo || !tema || !curso || !resumo || !statusAtual) {
            res.status(400).json({
                message: 'Os campos titulo, tema, curso, resumo e statusAtual são obrigatórios.',
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

        // Buscar o aluno logado pelo email do token JWT
        if (!req.user) {
            res.status(401).json({
                message: 'Usuário não autenticado.',
                success: false
            });
            return;
        }

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
            res.status(404).json({
                message: 'Aluno não encontrado.',
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

        // Atualizar o curso do aluno
        await prisma.aluno.update({
            where: { id: aluno.id },
            data: { curso: curso.trim() }
        });

        //Se todos os campos foram validados, os dados serão salvos no banco de dados.
        const tccSalvo = await prisma.tCC.create({
            data: {
                titulo,
                tema,
                resumo,
                status_atual: statusAtual,
                alunoId: aluno.id,
                orientadorId,
                coorientadorId
            },
            include: {
                aluno: {
                    include: {
                        usuario: {
                            select: {
                                nomeCompleto: true,
                                email: true
                            }
                        }
                    }
                },
                orientador: {
                    include: {
                        usuario: {
                            select: {
                                nomeCompleto: true,
                                email: true
                            }
                        }
                    }
                },
                coorientador: {
                    include: {
                        usuario: {
                            select: {
                                nomeCompleto: true,
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
