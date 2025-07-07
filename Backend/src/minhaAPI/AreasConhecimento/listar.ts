import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface AreaConhecimento {
  id: number
  nome: string
}

/**
 * Lista todas as áreas de conhecimento disponíveis
 * @param req Request
 * @param res Response
 */
export async function listarAreasConhecimento(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Buscar todas as áreas de conhecimento ordenadas por nome
    const areas: AreaConhecimento[] = await prisma.areaConhecimento.findMany({
      select: {
        id: true,
        nome: true
      },
      orderBy: {
        nome: 'asc'
      }
    })

    // Verificar se encontrou áreas
    if (areas.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Nenhuma área de conhecimento encontrada',
        data: []
      })
      return
    }

    // Retornar as áreas encontradas
    res.status(200).json({
      success: true,
      message: `${areas.length} áreas de conhecimento encontradas`,
      data: areas
    })

  } catch (error) {
    console.error('Erro ao buscar áreas de conhecimento:', error)
    
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor ao buscar áreas de conhecimento',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * Busca uma área de conhecimento específica por ID
 * @param req Request
 * @param res Response
 */
export async function buscarAreaPorId(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params
    
    // Validar se o ID é um número
    const areaId = parseInt(id)
    if (isNaN(areaId)) {
      res.status(400).json({
        success: false,
        message: 'ID da área de conhecimento deve ser um número válido'
      })
      return
    }

    // Buscar a área específica
    const area = await prisma.areaConhecimento.findUnique({
      where: {
        id: areaId
      },
      select: {
        id: true,
        nome: true,
        _count: {
          select: {
            tccs: true // Contar quantos TCCs estão nesta área
          }
        }
      }
    })

    if (!area) {
      res.status(404).json({
        success: false,
        message: 'Área de conhecimento não encontrada'
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'Área de conhecimento encontrada',
      data: {
        id: area.id,
        nome: area.nome,
        quantidadeTccs: area._count.tccs
      }
    })

  } catch (error) {
    console.error('Erro ao buscar área de conhecimento:', error)
    
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor ao buscar área de conhecimento',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  } finally {
    await prisma.$disconnect()
  }
}
