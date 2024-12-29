/*
  Warnings:

  - You are about to drop the column `data` on the `Agendamento` table. All the data in the column will be lost.
  - Added the required column `dia` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agendamento" DROP COLUMN "data",
ADD COLUMN     "dia" TIMESTAMP(3) NOT NULL;
