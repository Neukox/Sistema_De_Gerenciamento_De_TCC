/*
  Warnings:

  - Added the required column `instituicao` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Primeiro, adiciona a coluna com um valor padrão
ALTER TABLE "Aluno" ADD COLUMN "instituicao" TEXT NOT NULL DEFAULT 'Não informado';

-- Atualiza os registros existentes para usar o valor do curso como instituição temporariamente
UPDATE "Aluno" SET "instituicao" = "curso";

-- Remove o valor padrão para futuras inserções
ALTER TABLE "Aluno" ALTER COLUMN "instituicao" DROP DEFAULT;
