-- AlterTable
ALTER TABLE "TCC" ADD COLUMN     "coorientadorId" INTEGER,
ADD COLUMN     "orientadorId" INTEGER;

-- AddForeignKey
ALTER TABLE "TCC" ADD CONSTRAINT "TCC_orientadorId_fkey" FOREIGN KEY ("orientadorId") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TCC" ADD CONSTRAINT "TCC_coorientadorId_fkey" FOREIGN KEY ("coorientadorId") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
