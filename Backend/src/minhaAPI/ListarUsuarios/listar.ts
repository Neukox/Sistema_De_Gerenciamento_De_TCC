//Algoritmo para listar alunos e professores disponíveis

import { Request, Response } from 'express';
import prisma from '../../../prisma/PrismaClient/prisma';

export async function listarAlunos(req: Request, res: Response): Promise<void> {
    try {
        const alunos = await prisma.aluno.findMany({
            include: {
                usuario: {
                    select: {
                        nome: true,
                        sobrenome: true,
                        email: true
                    }
                },
                tcc: {
                    select: {
                        id: true,
                        titulo: true
                    }
                }
            },
            orderBy: {
                usuario: {
                    nome: 'asc'
                }
            }
        });

        res.status(200).json({
            message: 'Alunos listados com sucesso.',
            success: true,
            alunos,
            total: alunos.length
        });

    } catch (error) {
        console.error('Erro ao listar alunos:', error);
        res.status(500).json({
            message: 'Erro interno do servidor.',
            success: false,
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
}

export async function listarProfessores(req: Request, res: Response): Promise<void> {
    try {
        const professores = await prisma.professor.findMany({
            include: {
                usuario: {
                    select: {
                        nome: true,
                        sobrenome: true,
                        email: true
                    }
                },
                orientacoes: {
                    select: {
                        id: true,
                        titulo: true
                    }
                },
                coorientacoes: {
                    select: {
                        id: true,
                        titulo: true
                    }
                }
            },
            orderBy: {
                usuario: {
                    nome: 'asc'
                }
            }
        });

        res.status(200).json({
            message: 'Professores listados com sucesso.',
            success: true,
            professores,
            total: professores.length
        });

    } catch (error) {
        console.error('Erro ao listar professores:', error);
        res.status(500).json({
            message: 'Erro interno do servidor.',
            success: false,
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
}

export async function listarProfessoresDisponiveis(req: Request, res: Response): Promise<void> {
    try {
        const professores = await prisma.professor.findMany({
            where: {
                disponibilidade: true
            },
            include: {
                usuario: {
                    select: {
                        nome: true,
                        sobrenome: true,
                        email: true
                    }
                },
                orientacoes: {
                    select: {
                        id: true,
                        titulo: true
                    }
                },
                coorientacoes: {
                    select: {
                        id: true,
                        titulo: true
                    }
                }
            },
            orderBy: {
                usuario: {
                    nome: 'asc'
                }
            }
        });

        res.status(200).json({
            message: 'Professores disponíveis listados com sucesso.',
            success: true,
            professores,
            total: professores.length
        });

    } catch (error) {
        console.error('Erro ao listar professores disponíveis:', error);
        res.status(500).json({
            message: 'Erro interno do servidor.',
            success: false,
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
}
