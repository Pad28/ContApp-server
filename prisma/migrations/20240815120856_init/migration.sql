/*
  Warnings:

  - You are about to alter the column `fecha_creacion` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_activacion` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_limite` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha` on the `ActividadContestada` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `Publicaciones` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Publicaciones` DROP FOREIGN KEY `Publicaciones_id_profesor_fkey`;

-- AlterTable
ALTER TABLE `Actividad` MODIFY `fecha_creacion` DATETIME NOT NULL,
    MODIFY `fecha_activacion` DATETIME NOT NULL,
    MODIFY `fecha_limite` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `ActividadContestada` MODIFY `fecha` DATETIME NOT NULL;

-- DropTable
DROP TABLE `Publicaciones`;

-- CreateTable
CREATE TABLE `Publicacion` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(500) NOT NULL,
    `contenido` VARCHAR(500) NOT NULL,
    `id_material` VARCHAR(38) NULL,
    `fecha_publicacion` DATETIME(3) NOT NULL,
    `id_profesor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Publicacion` ADD CONSTRAINT `Publicacion_id_profesor_fkey` FOREIGN KEY (`id_profesor`) REFERENCES `Usuario`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;
