-- CreateTable
CREATE TABLE `Usuario` (
    `matricula` VARCHAR(7) NOT NULL,
    `nombre` VARCHAR(30) NOT NULL,
    `apellidos` VARCHAR(30) NOT NULL,
    `correo` VARCHAR(30) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `rol` ENUM('ADMIN', 'ALUMNO', 'PROFESOR') NOT NULL,
    `id_grupo` VARCHAR(191) NULL,

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`matricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grupo` (
    `id` VARCHAR(12) NOT NULL,
    `id_maestro` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Publicacion` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(500) NOT NULL,
    `contenido` VARCHAR(500) NOT NULL,
    `id_material` VARCHAR(50) NOT NULL,
    `fecha_publicacion` DATETIME(3) NOT NULL,
    `id_grupo` VARCHAR(191) NOT NULL,
    `id_profesor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActividadContestada` (
    `id` VARCHAR(191) NOT NULL,
    `fecha` DATETIME NOT NULL,
    `id_alumno` VARCHAR(38) NOT NULL,
    `id_actividad` VARCHAR(38) NOT NULL,

    UNIQUE INDEX `ActividadContestada_id_alumno_id_actividad_key`(`id_alumno`, `id_actividad`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Actividad` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(38) NOT NULL,
    `fecha_creacion` DATETIME NOT NULL,
    `fecha_activacion` DATETIME NOT NULL,
    `fecha_limite` DATETIME NOT NULL,
    `id_grupo` VARCHAR(12) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pregunta` (
    `id` VARCHAR(191) NOT NULL,
    `pregunta` VARCHAR(150) NOT NULL,
    `id_actividad` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Respuesta` (
    `id` VARCHAR(191) NOT NULL,
    `respuesta` VARCHAR(200) NOT NULL,
    `esCorrecta` BOOLEAN NOT NULL,
    `id_pregunta` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `Grupo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grupo` ADD CONSTRAINT `Grupo_id_maestro_fkey` FOREIGN KEY (`id_maestro`) REFERENCES `Usuario`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publicacion` ADD CONSTRAINT `Publicacion_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `Grupo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publicacion` ADD CONSTRAINT `Publicacion_id_profesor_fkey` FOREIGN KEY (`id_profesor`) REFERENCES `Usuario`(`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActividadContestada` ADD CONSTRAINT `ActividadContestada_id_alumno_fkey` FOREIGN KEY (`id_alumno`) REFERENCES `Usuario`(`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActividadContestada` ADD CONSTRAINT `ActividadContestada_id_actividad_fkey` FOREIGN KEY (`id_actividad`) REFERENCES `Actividad`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Actividad` ADD CONSTRAINT `Actividad_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `Grupo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pregunta` ADD CONSTRAINT `Pregunta_id_actividad_fkey` FOREIGN KEY (`id_actividad`) REFERENCES `Actividad`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Respuesta` ADD CONSTRAINT `Respuesta_id_pregunta_fkey` FOREIGN KEY (`id_pregunta`) REFERENCES `Pregunta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
