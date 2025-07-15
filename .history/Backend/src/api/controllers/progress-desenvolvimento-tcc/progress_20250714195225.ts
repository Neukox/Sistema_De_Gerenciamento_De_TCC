//Algoritmo que calculará o progresso do desenvolvimento do TCC
import { Request, Response } from "express";
import prisma from "api/config/prisma";


/**
 * Controlador para calcular o progresso do desenvolvimento do TCC.
 * @param {Request} req - A requisição HTTP contendo os dados necessários para calcular o progresso.
 * @param {Response} res - A resposta HTTP a ser enviada ao cliente.
 * @returns {Promise<Response>} - Retorna uma resposta JSON com o progresso calculado.
 */

export async function calculateTCCProgressController() {
    try {
        //Obtendo dados do TCC criado da tabela TCC

        const tccs = await prisma.tCC.findMany({
            include: {
                orientador: true,
                aluno: true,
                atividades: {
                    include: {
                        tarefa: true
                    }
                }
            }
        })
    } catch (error) {
        
    }
}