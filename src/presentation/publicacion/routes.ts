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

        router.get("/by-document-id/:id", [
            AuthMiddleware.validateUserJwt,
        ], controller.getPublicacionByDocumentID);

        router.get("/by-group-id/:id", [
            AuthMiddleware.validateUserJwt,
        ], controller.getPublicacionByGrupoId);

        router.get("/by-profesor-id/:id", [
            AuthMiddleware.validateUserJwt,
        ], controller.getPublicacionByProfesorId);

        router.post("/", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.PROFESOR, UserRoles.ADMIN),
            upload.single("file"),
        ], controller.crearPublicacion);

        router.put("/", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.PROFESOR, UserRoles.ADMIN),
        ], controller.updatePublicacion);

        router.delete("/:id", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.PROFESOR, UserRoles.ADMIN),
        ], controller.deletePublicacion);

        return router;
    }
}