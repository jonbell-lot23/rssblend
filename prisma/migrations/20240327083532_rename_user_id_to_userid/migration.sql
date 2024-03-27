/*
  Warnings:

  - You are about to drop the column `userId` on the `Source` table. All the data in the column will be lost.
  - Added the required column `userid` to the `Source` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Source" DROP CONSTRAINT "Source_userId_fkey";

-- AlterTable
ALTER TABLE "Source" DROP COLUMN "userId",
ADD COLUMN     "userid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_userId_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
