import prisma from "../../config/prisma";
import { AreaConhecimento } from "@prisma/client";
import { GetAreaConhecimento } from "../../services/area-conhecimento/contracts";

export async function findAllAreasConhecimento(): Promise<AreaConhecimento[]> {
  const areas = await prisma.areaConhecimento.findMany({
    select: {
      id: true,
      nome: true,
      categoria: true,
    },
  });

  return areas;
}

export async function findAreaConhecimentoById(
  id: number
): Promise<GetAreaConhecimento | null> {
  const area = await prisma.areaConhecimento.findUnique({
    where: { id },
    select: {
      id: true,
      nome: true,
      categoria: true,
      _count: {
        select: {
          tccs: true, // Contar quantos TCCs estão nesta área
        },
      },
    },
  });

  if (!area) {
    return null;
  }

  return {
    id: area.id,
    nome: area.nome,
    categoria: area.categoria,
    quantidadeTCCs: area._count.tccs || 0, // Adiciona a contagem de TCCs
  };
}
