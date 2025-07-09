/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "id" INTEGER NOT NULL,
    "curso" TEXT NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" INTEGER NOT NULL,
    "area_atuacao" TEXT NOT NULL,
    "disponibilidade" BOOLEAN NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TCC" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "tema" TEXT NOT NULL,
    "resumo" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultima_atualizacao" TIMESTAMP(3) NOT NULL,
    "alunoId" INTEGER NOT NULL,

    CONSTRAINT "TCC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banca" (
    "id" TEXT NOT NULL,
    "papel" TEXT NOT NULL,
    "tccId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,

    CONSTRAINT "Banca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultima_atualizacao" TIMESTAMP(3) NOT NULL,
    "titulo" TEXT NOT NULL,
    "tccId" INTEGER NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atividade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "data_entrega" TIMESTAMP(3) NOT NULL,
    "arquivo_url" TEXT NOT NULL,
    "concluido_em" TIMESTAMP(3) NOT NULL,
    "feedback" TEXT,
    "tccId" INTEGER NOT NULL,

    CONSTRAINT "Atividade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TCC_alunoId_key" ON "TCC"("alunoId");

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_id_fkey" FOREIGN KEY ("id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_id_fkey" FOREIGN KEY ("id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TCC" ADD CONSTRAINT "TCC_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banca" ADD CONSTRAINT "Banca_tccId_fkey" FOREIGN KEY ("tccId") REFERENCES "TCC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banca" ADD CONSTRAINT "Banca_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_tccId_fkey" FOREIGN KEY ("tccId") REFERENCES "TCC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atividade" ADD CONSTRAINT "Atividade_tccId_fkey" FOREIGN KEY ("tccId") REFERENCES "TCC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
