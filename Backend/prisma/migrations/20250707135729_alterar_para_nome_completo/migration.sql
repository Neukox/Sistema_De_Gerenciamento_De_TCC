/*
  Warnings:

  - You are about to drop the column `nome` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `sobrenome` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `nomeCompleto` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- Primeiro, adicionar a coluna nomeCompleto como nullable
ALTER TABLE "Usuario" ADD COLUMN "nomeCompleto" TEXT;

-- Preencher a coluna nomeCompleto com a concatenação de nome e sobrenome
UPDATE "Usuario" SET "nomeCompleto" = CONCAT("nome", ' ', "sobrenome");

-- Tornar a coluna nomeCompleto obrigatória
ALTER TABLE "Usuario" ALTER COLUMN "nomeCompleto" SET NOT NULL;

-- Agora remover as colunas antigas
ALTER TABLE "Usuario" DROP COLUMN "nome";
ALTER TABLE "Usuario" DROP COLUMN "sobrenome";
