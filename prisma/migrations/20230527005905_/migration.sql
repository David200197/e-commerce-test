/*
  Warnings:

  - You are about to drop the column `salesId` on the `CopyAssociatedImage` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "SalesOnCopyAssociatedImage" (
    "copyAssociatedImageUrl" TEXT NOT NULL,
    "salesId" TEXT NOT NULL,

    PRIMARY KEY ("copyAssociatedImageUrl", "salesId"),
    CONSTRAINT "SalesOnCopyAssociatedImage_copyAssociatedImageUrl_fkey" FOREIGN KEY ("copyAssociatedImageUrl") REFERENCES "CopyAssociatedImage" ("url") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SalesOnCopyAssociatedImage_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "Sales" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CopyAssociatedImage" (
    "url" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_CopyAssociatedImage" ("url") SELECT "url" FROM "CopyAssociatedImage";
DROP TABLE "CopyAssociatedImage";
ALTER TABLE "new_CopyAssociatedImage" RENAME TO "CopyAssociatedImage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
