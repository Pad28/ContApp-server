/*
  Warnings:

  - You are about to alter the column `fecha_creacion` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_activacion` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_limite` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha` on the `ActividadContestada` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `titulo` to the `Publicaciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Actividad` MODIFY `fecha_creacion` DATETIME NOT NULL,
    MODIFY `fecha_activacion` DATETIME NOT NULL,
    MODIFY `fecha_limite` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `ActividadContestada` MODIFY `fecha` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Publicaciones` ADD COLUMN `titulo` VARCHAR(500) NOT NULL;
