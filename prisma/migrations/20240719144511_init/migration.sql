/*
  Warnings:

  - The primary key for the `Grupo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `materia` on the `Grupo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Grupo` DROP PRIMARY KEY,
    DROP COLUMN `materia`,
    MODIFY `id` VARCHAR(12) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Publicaciones` ADD COLUMN `id_material` VARCHAR(38) NULL;

-- AlterTable
ALTER TABLE `Usuario` MODIFY `nombre` VARCHAR(30) NOT NULL,
    MODIFY `apellidos` VARCHAR(30) NOT NULL;
