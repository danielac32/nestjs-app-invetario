/*
  Warnings:

  - You are about to drop the column `address` on the `Categoria` table. All the data in the column will be lost.
  - Added the required column `name` to the `Categoria` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Categoria" ("id") SELECT "id" FROM "Categoria";
DROP TABLE "Categoria";
ALTER TABLE "new_Categoria" RENAME TO "Categoria";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
