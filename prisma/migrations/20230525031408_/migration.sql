/*
  Warnings:

  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateTable
CREATE TABLE "ProductsOnTags" (
    "tagId" TEXT NOT NULL,
    "productSku" TEXT NOT NULL,
    "salesSku" TEXT,

    PRIMARY KEY ("tagId", "productSku"),
    CONSTRAINT "ProductsOnTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductsOnTags_productSku_fkey" FOREIGN KEY ("productSku") REFERENCES "Product" ("sku") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sales" (
    "sku" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "additionalInformation" TEXT NOT NULL,
    "assessment" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SalesOnTags" (
    "tagId" TEXT NOT NULL,
    "salesSku" TEXT NOT NULL,

    PRIMARY KEY ("tagId", "salesSku"),
    CONSTRAINT "SalesOnTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SalesOnTags_salesSku_fkey" FOREIGN KEY ("salesSku") REFERENCES "Sales" ("sku") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AssociatedImage" (
    "url" TEXT NOT NULL PRIMARY KEY,
    "productSku" TEXT,
    "salesSku" TEXT,
    CONSTRAINT "AssociatedImage_productSku_fkey" FOREIGN KEY ("productSku") REFERENCES "Product" ("sku") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AssociatedImage_salesSku_fkey" FOREIGN KEY ("salesSku") REFERENCES "Sales" ("sku") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_AssociatedImage" ("productSku", "url") SELECT "productSku", "url" FROM "AssociatedImage";
DROP TABLE "AssociatedImage";
ALTER TABLE "new_AssociatedImage" RENAME TO "AssociatedImage";
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "productSku" TEXT
);
INSERT INTO "new_Tag" ("id", "name", "productSku") SELECT "id", "name", "productSku" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
