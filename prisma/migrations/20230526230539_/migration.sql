/*
  Warnings:

  - The primary key for the `Sales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sales" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "additionalInformation" TEXT NOT NULL,
    "assessment" INTEGER NOT NULL,
    "createAt" DATETIME NOT NULL
);
INSERT INTO "new_Sales" ("additionalInformation", "assessment", "category", "createAt", "description", "name", "price", "sku", "stockQuantity") SELECT "additionalInformation", "assessment", "category", "createAt", "description", "name", "price", "sku", "stockQuantity" FROM "Sales";
DROP TABLE "Sales";
ALTER TABLE "new_Sales" RENAME TO "Sales";
CREATE UNIQUE INDEX "Sales_sku_key" ON "Sales"("sku");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
