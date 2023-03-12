/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_user_id_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "bouquet" (
    "id" TEXT NOT NULL,
    "date" TEXT,
    "name" TEXT,
    "detail" TEXT,
    "url" TEXT,
    "username" TEXT,

    CONSTRAINT "bouquet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bouquet2023" (
    "date" TEXT,
    "description" TEXT,
    "url" TEXT,
    "username" TEXT,
    "id" SERIAL NOT NULL,
    "emoji" TEXT,

    CONSTRAINT "bouquet2023_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bouquet_emoji_lookup" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "emoji" VARCHAR,
    "bouquetId" TEXT,

    CONSTRAINT "bouquet_emoji_lookup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "firehose_Items" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "postdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "firehose_Items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "firehose_Items_url_key" ON "firehose_Items"("url");

-- AddForeignKey
ALTER TABLE "bouquet_emoji_lookup" ADD CONSTRAINT "bouquet_emoji_lookup_bouquetId_fkey" FOREIGN KEY ("bouquetId") REFERENCES "bouquet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
