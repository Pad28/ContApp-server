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

        router.get("/", [
            AuthMiddleware.validateUserJwt
        ], controller.getActividades);

        router.post("/", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.PROFESOR, UserRoles.ADMIN),
        ], controller.createActividad);

        router.put("/:id", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.PROFESOR, UserRoles.ADMIN),
        ], controller.updateActividad);

        router.delete("/:id", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.PROFESOR, UserRoles.ADMIN),
        ], controller.deleteActivity);

        return router;
    }
}