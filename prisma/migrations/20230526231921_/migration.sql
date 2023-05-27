/*
  Warnings:

  - You are about to drop the column `stockQuantity` on the `Sales` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sales" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "additionalInformation" TEXT NOT NULL,
    "assessment" INTEGER NOT NULL,
    "createAt" DATETIME NOT NULL
);
INSERT INTO "new_Sales" ("additionalInformation", "assessment", "category", "createAt", "description", "id", "name", "price", "sku") SELECT "additionalInformation", "assessment", "category", "createAt", "description", "id", "name", "price", "sku" FROM "Sales";
DROP TABLE "Sales";
ALTER TABLE "new_Sales" RENAME TO "Sales";
CREATE UNIQUE INDEX "Sales_sku_key" ON "Sales"("sku");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
