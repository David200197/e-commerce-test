/*
  Warnings:

  - You are about to drop the column `salesSku` on the `CopyAssociatedImage` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CopyAssociatedImage" (
    "url" TEXT NOT NULL PRIMARY KEY,
    "salesId" TEXT,
    CONSTRAINT "CopyAssociatedImage_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "Sales" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CopyAssociatedImage" ("url") SELECT "url" FROM "CopyAssociatedImage";
DROP TABLE "CopyAssociatedImage";
ALTER TABLE "new_CopyAssociatedImage" RENAME TO "CopyAssociatedImage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
