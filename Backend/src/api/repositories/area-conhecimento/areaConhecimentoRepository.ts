import prisma from "../../config/prisma";

export async function findAllAreasConhecimento() {
  const areas = await prisma.areaConhecimento.findMany({
    select: {
      id: true,
      nome: true,
      categoria: true,
    },
  });

  return areas;
}
