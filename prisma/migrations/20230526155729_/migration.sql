/*
  Warnings:

  - You are about to drop the column `salesSku` on the `AssociatedImage` table. All the data in the column will be lost.
  - You are about to drop the column `salesSku` on the `ProductsOnTags` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "CopyAssociatedImage" (
    "url" TEXT NOT NULL PRIMARY KEY,
    "salesSku" TEXT,
    CONSTRAINT "CopyAssociatedImage_salesSku_fkey" FOREIGN KEY ("salesSku") REFERENCES "Sales" ("sku") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AssociatedImage" (
    "url" TEXT NOT NULL PRIMARY KEY,
    "productSku" TEXT,
    CONSTRAINT "AssociatedImage_productSku_fkey" FOREIGN KEY ("productSku") REFERENCES "Product" ("sku") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AssociatedImage" ("productSku", "url") SELECT "productSku", "url" FROM "AssociatedImage";
DROP TABLE "AssociatedImage";
ALTER TABLE "new_AssociatedImage" RENAME TO "AssociatedImage";
CREATE TABLE "new_ProductsOnTags" (
    "tagId" TEXT NOT NULL,
    "productSku" TEXT NOT NULL,

    PRIMARY KEY ("tagId", "productSku"),
    CONSTRAINT "ProductsOnTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductsOnTags_productSku_fkey" FOREIGN KEY ("productSku") REFERENCES "Product" ("sku") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductsOnTags" ("productSku", "tagId") SELECT "productSku", "tagId" FROM "ProductsOnTags";
DROP TABLE "ProductsOnTags";
ALTER TABLE "new_ProductsOnTags" RENAME TO "ProductsOnTags";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
