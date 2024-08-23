import { Router } from "express";
import { PreguntaController } from "./controller";
import { PreguntaService } from "../services";
import { AuthMiddleware } from "../middlewares";
import { UserRoles } from "../../data";

export class PreguntaRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new PreguntaController(
            new PreguntaService()
        );

        router.get("/:id", [
            AuthMiddleware.validateUserJwt,
        ], controller.listarPreguntaPorIdActividad);

        router.post("/", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.PROFESOR, UserRoles.ADMIN),
        ], controller.createPregunta);

        return router;
    }
}