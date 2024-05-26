/*
  Warnings:

  - Added the required column `puesto` to the `Empleados` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Empleados" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "puesto" TEXT NOT NULL,
    "sueldo" REAL NOT NULL
);
INSERT INTO "new_Empleados" ("apellido", "id", "nombre", "sueldo") SELECT "apellido", "id", "nombre", "sueldo" FROM "Empleados";
DROP TABLE "Empleados";
ALTER TABLE "new_Empleados" RENAME TO "Empleados";
PRAGMA foreign_key_check("Empleados");
PRAGMA foreign_keys=ON;
