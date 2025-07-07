import prisma from "../../config/prisma";

export async function createTCC(data: any): Promise<any> {
  const tcc = await prisma.tCC.create({
    data: {
      titulo: data.titulo,
      tema: data.tema,
      curso: data.curso,
      orientador: data.orientador,
      coorientador: data.coorientador,
      resumo: data.resumo,
      dataInicio: data.dataInicio,
      dataConclusao: data.dataConclusao,
      status_atual: data.statusAtual,
      alunoId: data.alunoId,
      orientadorId: data.orientadorId,
      coorientadorId: data.coorientadorId,
    },
  });

  return tcc;
}
