/*
  Warnings:

  - You are about to alter the column `fecha_creacion` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_activacion` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_limite` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Actividad` MODIFY `fecha_creacion` DATETIME NOT NULL,
    MODIFY `fecha_activacion` DATETIME NOT NULL,
    MODIFY `fecha_limite` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `ActividadContestada` (
    `id` VARCHAR(191) NOT NULL,
    `fecha` DATETIME NOT NULL,
    `id_alumno` VARCHAR(38) NOT NULL,
    `id_actividad` VARCHAR(38) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ActividadContestada` ADD CONSTRAINT `ActividadContestada_id_alumno_fkey` FOREIGN KEY (`id_alumno`) REFERENCES `Usuario`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActividadContestada` ADD CONSTRAINT `ActividadContestada_id_actividad_fkey` FOREIGN KEY (`id_actividad`) REFERENCES `Actividad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
