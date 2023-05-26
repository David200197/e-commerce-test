/*
  Warnings:

  - You are about to drop the column `productSku` on the `Tag` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Tag" ("id", "name") SELECT "id", "name" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
CREATE TABLE "new_AssociatedImage" (
    "url" TEXT NOT NULL PRIMARY KEY,
    "productSku" TEXT,
    "salesSku" TEXT,
    CONSTRAINT "AssociatedImage_productSku_fkey" FOREIGN KEY ("productSku") REFERENCES "Product" ("sku") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AssociatedImage_salesSku_fkey" FOREIGN KEY ("salesSku") REFERENCES "Sales" ("sku") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_AssociatedImage" ("productSku", "salesSku", "url") SELECT "productSku", "salesSku", "url" FROM "AssociatedImage";
DROP TABLE "AssociatedImage";
ALTER TABLE "new_AssociatedImage" RENAME TO "AssociatedImage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
