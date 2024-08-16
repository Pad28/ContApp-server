/*
  Warnings:

  - You are about to alter the column `fecha_creacion` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_activacion` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_limite` on the `Actividad` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha` on the `ActividadContestada` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `id_profesor` on the `Publicacion` table. All the data in the column will be lost.
  - Added the required column `id_grupo` to the `Publicacion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Publicacion` DROP FOREIGN KEY `Publicacion_id_profesor_fkey`;

-- AlterTable
ALTER TABLE `Actividad` MODIFY `fecha_creacion` DATETIME NOT NULL,
    MODIFY `fecha_activacion` DATETIME NOT NULL,
    MODIFY `fecha_limite` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `ActividadContestada` MODIFY `fecha` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Publicacion` DROP COLUMN `id_profesor`,
    ADD COLUMN `id_grupo` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Publicacion` ADD CONSTRAINT `Publicacion_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `Grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
