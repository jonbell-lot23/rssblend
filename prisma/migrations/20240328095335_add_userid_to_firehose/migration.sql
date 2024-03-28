-- AlterTable
ALTER TABLE "firehose" ADD COLUMN     "userid" INTEGER NOT NULL DEFAULT 1;

-- RenameForeignKey
ALTER TABLE "Source" RENAME CONSTRAINT "Source_userId_fkey" TO "Source_userid_fkey";

-- AddForeignKey
ALTER TABLE "firehose" ADD CONSTRAINT "firehose_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
