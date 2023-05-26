/*
  Warnings:

  - You are about to alter the column `assessment` on the `Sales` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `price` on the `Sales` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `assessment` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sales" (
    "sku" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "additionalInformation" TEXT NOT NULL,
    "assessment" REAL NOT NULL,
    "createAt" DATETIME NOT NULL
);
INSERT INTO "new_Sales" ("additionalInformation", "assessment", "category", "createAt", "description", "name", "price", "sku", "stockQuantity") SELECT "additionalInformation", "assessment", "category", "createAt", "description", "name", "price", "sku", "stockQuantity" FROM "Sales";
DROP TABLE "Sales";
ALTER TABLE "new_Sales" RENAME TO "Sales";
CREATE TABLE "new_Product" (
    "sku" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "additionalInformation" TEXT NOT NULL,
    "assessment" REAL NOT NULL
);
INSERT INTO "new_Product" ("additionalInformation", "assessment", "category", "description", "name", "price", "sku", "stockQuantity") SELECT "additionalInformation", "assessment", "category", "description", "name", "price", "sku", "stockQuantity" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
