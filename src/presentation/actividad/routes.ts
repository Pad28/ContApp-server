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

        // Entrega la lista de actividades
        router.get("/", [
            AuthMiddleware.validateUserJwt
        ], controller.getActividades);

        // Crear una actividad con el rol de profesor o de administrador
        router.post("/", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.PROFESOR, UserRoles.ADMIN),
        ], controller.createActividad);

        // Actualizar una actividad por medio del ID
        router.put("/:id", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.PROFESOR, UserRoles.ADMIN),
        ], controller.updateActividad);

        // Eliminar una actividad por medio de ID
        router.delete("/:id", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.PROFESOR, UserRoles.ADMIN),
        ], controller.deleteActivity);

        return router;
    }
}