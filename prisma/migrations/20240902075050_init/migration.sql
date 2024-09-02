/*
  Warnings:

  - You are about to alter the column `fecha_creacion` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_activacion` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_limite` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha` on the `ActividadContestada` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Actividad` MODIFY `fecha_creacion` DATETIME NOT NULL,
    MODIFY `fecha_activacion` DATETIME NOT NULL,
    MODIFY `fecha_limite` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `ActividadContestada` MODIFY `fecha` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `PreguntaRespondida` (
    `id` VARCHAR(191) NOT NULL,
    `id_pregunta` VARCHAR(40) NOT NULL,
    `id_respuesta` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PreguntaRespondida` ADD CONSTRAINT `PreguntaRespondida_id_pregunta_fkey` FOREIGN KEY (`id_pregunta`) REFERENCES `Pregunta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PreguntaRespondida` ADD CONSTRAINT `PreguntaRespondida_id_respuesta_fkey` FOREIGN KEY (`id_respuesta`) REFERENCES `Respuesta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
