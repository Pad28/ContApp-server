import { Router } from "express";
import { RespuestaController } from "./controller";
import { RespuestaService } from "../services";
import { AuthMiddleware } from "../middlewares";
import { UserRoles } from "../../data";

export class RespuestaRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new RespuestaController(
            new RespuestaService(),
        )

        router.post("/", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.PROFESOR, UserRoles.ADMIN),
        ], controller.createRespuesta);

        return router;
    }
}