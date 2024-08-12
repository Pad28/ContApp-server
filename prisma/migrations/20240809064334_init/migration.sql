/*
  Warnings:

  - You are about to alter the column `fecha_creacion` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_activacion` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_limite` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha` on the `ActividadContestada` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[id_alumno,id_actividad]` on the table `ActividadContestada` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `total_preguntas` to the `Actividad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aciertos` to the `ActividadContestada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calificacion` to the `ActividadContestada` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Actividad` ADD COLUMN `total_preguntas` INTEGER NOT NULL,
    MODIFY `fecha_creacion` DATETIME NOT NULL,
    MODIFY `fecha_activacion` DATETIME NOT NULL,
    MODIFY `fecha_limite` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `ActividadContestada` ADD COLUMN `aciertos` VARCHAR(10) NOT NULL,
    ADD COLUMN `calificacion` DOUBLE NOT NULL,
    MODIFY `fecha` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ActividadContestada_id_alumno_id_actividad_key` ON `ActividadContestada`(`id_alumno`, `id_actividad`);
