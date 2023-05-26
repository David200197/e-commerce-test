-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SalesOnTags" (
    "tagId" TEXT NOT NULL,
    "salesSku" TEXT NOT NULL,

    PRIMARY KEY ("tagId", "salesSku"),
    CONSTRAINT "SalesOnTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SalesOnTags_salesSku_fkey" FOREIGN KEY ("salesSku") REFERENCES "Sales" ("sku") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SalesOnTags" ("salesSku", "tagId") SELECT "salesSku", "tagId" FROM "SalesOnTags";
DROP TABLE "SalesOnTags";
ALTER TABLE "new_SalesOnTags" RENAME TO "SalesOnTags";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
