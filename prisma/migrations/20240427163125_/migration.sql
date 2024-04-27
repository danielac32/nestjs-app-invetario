/*
  Warnings:

  - You are about to drop the column `cantidad_persona` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `requerimiento` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Producto` table. All the data in the column will be lost.
  - Added the required column `codigo` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Modificacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "entregado" TEXT NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "valor" INTEGER NOT NULL,
    "observacion" TEXT,
    "cedula" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Modificacion_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Producto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "codigo" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Producto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userEntity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Producto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Producto" ("categoriaId", "createdAt", "descripcion", "id", "userId") SELECT "categoriaId", "createdAt", "descripcion", "id", "userId" FROM "Producto";
DROP TABLE "Producto";
ALTER TABLE "new_Producto" RENAME TO "Producto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
