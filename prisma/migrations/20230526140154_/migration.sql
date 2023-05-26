/*
  Warnings:

  - You are about to alter the column `assessment` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `String` to `Decimal`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "sku" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "additionalInformation" TEXT NOT NULL,
    "assessment" DECIMAL NOT NULL
);
INSERT INTO "new_Product" ("additionalInformation", "assessment", "category", "description", "name", "price", "sku", "stockQuantity") SELECT "additionalInformation", "assessment", "category", "description", "name", "price", "sku", "stockQuantity" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
