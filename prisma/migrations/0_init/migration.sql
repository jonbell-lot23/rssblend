-- CreateTable
CREATE TABLE "firehose" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "postdate" TIMESTAMP(3) NOT NULL,
    "source" TEXT,
    "slug" TEXT DEFAULT '',

    CONSTRAINT "firehose_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "firehose_url_key" ON "firehose"("url");

-- CreateIndex
CREATE UNIQUE INDEX "firehose_slug_key" ON "firehose"("slug");

