/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Made the column `genre` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Book" ALTER COLUMN "genre" SET NOT NULL,
ALTER COLUMN "genre" SET DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_key" ON "public"."Book"("title");
