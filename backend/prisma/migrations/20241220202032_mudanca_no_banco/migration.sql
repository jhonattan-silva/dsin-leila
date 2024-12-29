/*
  Warnings:

  - You are about to drop the column `dia` on the `Agendamento` table. All the data in the column will be lost.
  - Added the required column `dataHoraFim` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataHoraInicio` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agendamento" DROP COLUMN "dia",
ADD COLUMN     "dataHoraFim" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dataHoraInicio" TIMESTAMP(3) NOT NULL;
