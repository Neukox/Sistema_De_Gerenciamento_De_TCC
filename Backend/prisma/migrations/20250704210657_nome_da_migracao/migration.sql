-- CreateEnum
CREATE TYPE "StatusTCC" AS ENUM ('PLANEJAMENTO', 'DESENVOLVIMENTO', 'REVISAO', 'FINALIZACAO', 'CONCLUIDO');

-- AlterTable
ALTER TABLE "TCC" ADD COLUMN     "status_atual" "StatusTCC" NOT NULL DEFAULT 'PLANEJAMENTO';
