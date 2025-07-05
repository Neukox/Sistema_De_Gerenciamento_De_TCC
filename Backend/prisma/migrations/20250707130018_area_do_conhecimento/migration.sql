-- AlterTable
ALTER TABLE "TCC" ADD COLUMN     "areaConhecimentoId" INTEGER;

-- CreateTable
CREATE TABLE "AreaConhecimento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "AreaConhecimento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AreaConhecimento_nome_key" ON "AreaConhecimento"("nome");

-- AddForeignKey
ALTER TABLE "TCC" ADD CONSTRAINT "TCC_areaConhecimentoId_fkey" FOREIGN KEY ("areaConhecimentoId") REFERENCES "AreaConhecimento"("id") ON DELETE SET NULL ON UPDATE CASCADE;
