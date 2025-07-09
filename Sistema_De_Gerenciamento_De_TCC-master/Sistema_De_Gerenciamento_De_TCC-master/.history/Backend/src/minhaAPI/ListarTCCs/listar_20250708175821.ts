//Algoritmo para listar TCCs

import { Request, Response } from 'express';
import prisma from '../../../prisma/PrismaClient/prisma';

export async function listarTCCs(req: Request, res: Response): Promise<void> {
    try {
        const tccs = await prisma.tCC.findMany({
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
            },
            orderBy: {
                criado_em: 'desc'
            }
        });

        res.status(200).json({
            message: 'TCCs listados com sucesso.',
            success: true,
            tccs,
            total: tccs.length
        });

    } catch (error) {
        console.error('Erro ao listar TCCs:', error);
        res.status(500).json({
            message: 'Erro interno do servidor.',
            success: false,
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
}

export async function buscarTCCPorId(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            res.status(400).json({
                message: 'ID do TCC inválido.',
                success: false
            });
            return;
        }

        const tcc = await prisma.tCC.findUnique({
            where: { id: parseInt(id) },
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
                },
                comentarios: {
                    orderBy: {
                        data_criacao: 'desc'
                    }
                },
                atividades: {
                    orderBy: {
                        data_entrega: 'asc'
                    }
                }
            }
        });

        if (!tcc) {
            res.status(404).json({
                message: 'TCC não encontrado.',
                success: false
            });
            return;
        }

        res.status(200).json({
            message: 'TCC encontrado.',
            success: true,
            tcc
        });

    } catch (error) {
        console.error('Erro ao buscar TCC:', error);
        res.status(500).json({
            message: 'Erro interno do servidor.',
            success: false,
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
}
