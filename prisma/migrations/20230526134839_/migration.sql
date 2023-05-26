/*
  Warnings:

  - You are about to alter the column `assessment` on the `Sales` table. The data in that column could be lost. The data in that column will be cast from `String` to `Decimal`.

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
    "assessment" DECIMAL NOT NULL,
    "createAt" DATETIME NOT NULL
);
INSERT INTO "new_Sales" ("additionalInformation", "assessment", "category", "createAt", "description", "name", "price", "sku", "stockQuantity") SELECT "additionalInformation", "assessment", "category", "createAt", "description", "name", "price", "sku", "stockQuantity" FROM "Sales";
DROP TABLE "Sales";
ALTER TABLE "new_Sales" RENAME TO "Sales";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
