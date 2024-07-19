import { Router } from "express";
import { GrupoController } from "./controller";
import { GrupoService } from "../services";
import { AuthMiddleware } from "../middlewares";
import { UserRoles } from "../../data";


export class GrupoRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new GrupoController(
            new GrupoService(),
        );

        // Listar grupos
        router.get("/", controller.getGrupos);

        // Crear grupo
        router.post("/", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.ADMIN),
        ], controller.createGrupo);

        return router;
    }
}