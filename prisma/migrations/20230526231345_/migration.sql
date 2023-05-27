/*
  Warnings:

  - The primary key for the `SalesOnTags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `salesSku` on the `SalesOnTags` table. All the data in the column will be lost.
  - Added the required column `salesId` to the `SalesOnTags` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SalesOnTags" (
    "tagId" TEXT NOT NULL,
    "salesId" TEXT NOT NULL,

    PRIMARY KEY ("tagId", "salesId"),
    CONSTRAINT "SalesOnTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SalesOnTags_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "Sales" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SalesOnTags" ("tagId") SELECT "tagId" FROM "SalesOnTags";
DROP TABLE "SalesOnTags";
ALTER TABLE "new_SalesOnTags" RENAME TO "SalesOnTags";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
