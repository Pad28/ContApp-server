import { Router } from "express";
import { ActividadContestadaController } from "./controller";
import { ActividadContestadaService } from "../services";
import { AuthMiddleware } from "../middlewares";

export class ActividadContestatdaRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new ActividadContestadaController(
            new ActividadContestadaService(),
        );

        // Buscar actividad contestada por ID
        router.get("/activity-by-id/:id", [
            AuthMiddleware.validateUserJwt,
        ], controller.getActivityById);

        // Lista de actividades contestadas por un alumno, 
        // busqueda realizado por medio de la matricula del alumno 
        router.get("/activities-by-alumno/:id", [
            AuthMiddleware.validateUserJwt,
        ], controller.getActivitiesByAlumno);

        // Crear registro de actividad contestada
        router.post("/", [
            AuthMiddleware.validateUserJwt
        ], controller.insertarActiviadadContestada);

        return router;
    }
}