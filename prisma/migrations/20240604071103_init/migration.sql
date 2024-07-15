-- CreateTable
CREATE TABLE `Usuario` (
    `matricula` VARCHAR(7) NOT NULL,
    `nombre` VARCHAR(20) NOT NULL,
    `apellidos` VARCHAR(20) NOT NULL,
    `correo` VARCHAR(20) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `rol` ENUM('ADMIN', 'ALUMNO', 'PROFESOR') NOT NULL,
    `id_grupo` VARCHAR(191) NULL,

    PRIMARY KEY (`matricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grupo` (
    `id` VARCHAR(7) NOT NULL,
    `materia` VARCHAR(10) NOT NULL,
    `id_maestro` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Publicaciones` (
    `id` VARCHAR(191) NOT NULL,
    `contenido` VARCHAR(500) NOT NULL,
    `fecha_publicacion` DATETIME(3) NOT NULL,
    `id_profesor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `Grupo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grupo` ADD CONSTRAINT `Grupo_id_maestro_fkey` FOREIGN KEY (`id_maestro`) REFERENCES `Usuario`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publicaciones` ADD CONSTRAINT `Publicaciones_id_profesor_fkey` FOREIGN KEY (`id_profesor`) REFERENCES `Usuario`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;
