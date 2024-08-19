/*
  Warnings:

  - You are about to alter the column `fecha_creacion` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_activacion` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_limite` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha` on the `ActividadContestada` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `ActividadContestada` DROP FOREIGN KEY `ActividadContestada_id_actividad_fkey`;

-- DropForeignKey
ALTER TABLE `ActividadContestada` DROP FOREIGN KEY `ActividadContestada_id_alumno_fkey`;

-- DropForeignKey
ALTER TABLE `Pregunta` DROP FOREIGN KEY `Pregunta_id_actividad_fkey`;

-- DropForeignKey
ALTER TABLE `Publicacion` DROP FOREIGN KEY `Publicacion_id_grupo_fkey`;

-- DropForeignKey
ALTER TABLE `Publicacion` DROP FOREIGN KEY `Publicacion_id_profesor_fkey`;

-- DropForeignKey
ALTER TABLE `Respuesta` DROP FOREIGN KEY `Respuesta_id_pregunta_fkey`;

-- AlterTable
ALTER TABLE `Actividad` MODIFY `fecha_creacion` DATETIME NOT NULL,
    MODIFY `fecha_activacion` DATETIME NOT NULL,
    MODIFY `fecha_limite` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `ActividadContestada` MODIFY `fecha` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `Publicacion` ADD CONSTRAINT `Publicacion_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `Grupo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publicacion` ADD CONSTRAINT `Publicacion_id_profesor_fkey` FOREIGN KEY (`id_profesor`) REFERENCES `Usuario`(`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActividadContestada` ADD CONSTRAINT `ActividadContestada_id_alumno_fkey` FOREIGN KEY (`id_alumno`) REFERENCES `Usuario`(`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActividadContestada` ADD CONSTRAINT `ActividadContestada_id_actividad_fkey` FOREIGN KEY (`id_actividad`) REFERENCES `Actividad`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pregunta` ADD CONSTRAINT `Pregunta_id_actividad_fkey` FOREIGN KEY (`id_actividad`) REFERENCES `Actividad`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Respuesta` ADD CONSTRAINT `Respuesta_id_pregunta_fkey` FOREIGN KEY (`id_pregunta`) REFERENCES `Pregunta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
