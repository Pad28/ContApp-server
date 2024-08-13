import { Router } from "express";
import { ActidvidadController } from "./controller";
import { ActividadService } from "../services";
import { AuthMiddleware } from "../middlewares";
import { UserRoles } from "../../data";

export class ActividadRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new ActidvidadController(
            new ActividadService()
        );

        router.post("/", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.PROFESOR, UserRoles.ADMIN),
        ], controller.createActividad);

        router.get("/", [
            AuthMiddleware.validateUserJwt
        ], controller.getActividades);

        return router;
    }
}