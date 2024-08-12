-- CreateTable
CREATE TABLE `Actividad` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(38) NOT NULL,
    `fecha_creacion` DATETIME NOT NULL,
    `fecha_activacion` DATETIME NOT NULL,
    `fecha_limite` DATETIME NOT NULL,

    UNIQUE INDEX `Actividad_nombre_key`(`nombre`),
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
ALTER TABLE `Pregunta` ADD CONSTRAINT `Pregunta_id_actividad_fkey` FOREIGN KEY (`id_actividad`) REFERENCES `Actividad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Respuesta` ADD CONSTRAINT `Respuesta_id_pregunta_fkey` FOREIGN KEY (`id_pregunta`) REFERENCES `Pregunta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
