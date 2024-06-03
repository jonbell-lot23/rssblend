-- AlterTable
ALTER TABLE "firehose" ADD COLUMN     "sourceId" INTEGER;

-- AddForeignKey
ALTER TABLE "firehose" ADD CONSTRAINT "firehose_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE SET NULL ON UPDATE CASCADE;
