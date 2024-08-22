"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActividadContestatdaRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const services_1 = require("../services");
const middlewares_1 = require("../middlewares");
class ActividadContestatdaRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.ActividadContestadaController(new services_1.ActividadContestadaService());
        // Buscar actividad contestada por ID
        router.get("/activity-by-id/:id", [
            middlewares_1.AuthMiddleware.validateUserJwt,
        ], controller.getActivityById);
        // Lista de actividades contestadas por un alumno, 
        // busqueda realizado por medio de la matricula del alumno 
        router.get("/activities-by-alumno/:id", [
            middlewares_1.AuthMiddleware.validateUserJwt,
        ], controller.getActivitiesByAlumno);
        // Crear registro de actividad contestada
        router.post("/", [
            middlewares_1.AuthMiddleware.validateUserJwt
        ], controller.insertarActiviadadContestada);
        return router;
    }
}
exports.ActividadContestatdaRoutes = ActividadContestatdaRoutes;
