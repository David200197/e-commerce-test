/*
  Warnings:

  - Added the required column `createAt` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sales" (
    "sku" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "additionalInformation" TEXT NOT NULL,
    "assessment" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL
);
INSERT INTO "new_Sales" ("additionalInformation", "assessment", "category", "description", "name", "price", "sku", "stockQuantity") SELECT "additionalInformation", "assessment", "category", "description", "name", "price", "sku", "stockQuantity" FROM "Sales";
DROP TABLE "Sales";
ALTER TABLE "new_Sales" RENAME TO "Sales";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
