//Algoritmo para buscar professores por nome

import { Request, Response } from 'express';
import prisma from '../../../prisma/PrismaClient/prisma';

export async function buscarProfessoresPorNome(req: Request, res: Response): Promise<void> {
    try {
        const { nome } = req.query;

        if (!nome || typeof nome !== 'string') {
            res.status(400).json({
                message: 'Parâmetro "nome" é obrigatório.',
                success: false
            });
            return;
        }

        const professores = await prisma.professor.findMany({
            where: {
                disponibilidade: true,
                usuario: {
                    OR: [
                        {
                            nome: {
                                contains: nome,
                                mode: 'insensitive'
                            }
                        },
                        {
                            sobrenome: {
                                contains: nome,
                                mode: 'insensitive'
                            }
                        }
                    ]
                }
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
            message: `${professores.length} professor(es) encontrado(s).`,
            success: true,
            professores: professores.map(prof => ({
                id: prof.id,
                nomeCompleto: `${prof.usuario.nome} ${prof.usuario.sobrenome}`,
                email: prof.usuario.email,
                area_atuacao: prof.area_atuacao,
                totalOrientacoes: prof.orientacoes.length,
                totalCoorientacoes: prof.coorientacoes.length
            }))
        });

    } catch (error) {
        console.error('Erro ao buscar professores:', error);
        res.status(500).json({
            message: 'Erro interno do servidor.',
            success: false,
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
}
