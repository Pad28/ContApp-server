import { Router } from "express";
import { PublicacionController } from "./controller";
import { PublicacionesService } from "../services/publicaciones.service";
import { FileManagerService } from "../services";
import multer from "multer";
import { AuthMiddleware } from "../middlewares";
import { UserRoles } from "../../data";

export class PublicacionRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new PublicacionController(
            new PublicacionesService(
                new FileManagerService()
            ),
        );
        const upload = multer({ dest: 'uploads/tmp' });

        // Servir pagina de PDF como imagen, la consulta se realiza a travez del ID del documento
        // en lugar del ID de publicación, debe incluir la extencion .pdf
        router.get("/document-to-image/:id/:pageNumber", [
            AuthMiddleware.validateUserJwt,
        ], controller.getDocToImage);

        // Servir PDF por medio del id del documento
        router.get("/by-document-id/:id", [
            AuthMiddleware.validateUserJwt,
        ], controller.getPublicacionByDocumentId);

        // Lista de documentos por medio del nombre del grupo
        router.get("/by-group-id/:id", [
            AuthMiddleware.validateUserJwt,
        ], controller.getPublicacionByGrupoId);

        // lista de documentos por medio de la matricual del profesor
        router.get("/by-profesor-id/:id", [
            AuthMiddleware.validateUserJwt,
        ], controller.getPublicacionByProfesorId);

        // Crear publicación y subir documento pdf, adminte rol de PROFESOR y ADMIN
        // El archivo a subir debe estar en una key nombrada 'file' en el form-data
        router.post("/", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.PROFESOR, UserRoles.ADMIN),
            upload.single("file"),
        ], controller.crearPublicacion);

        // Actualizar información de la publicaión por medio del id
        router.put("/:id", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.PROFESOR, UserRoles.ADMIN),
        ], controller.updatePublicacion);

        // Eliminar publicación por medio del id
        router.delete("/:id", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.PROFESOR, UserRoles.ADMIN),
        ], controller.deletePublicacion);

        return router;
    }
}