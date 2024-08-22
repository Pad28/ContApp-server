"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActividadRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const services_1 = require("../services");
const middlewares_1 = require("../middlewares");
const data_1 = require("../../data");
class ActividadRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.ActidvidadController(new services_1.ActividadService());
        // Entrega la lista de actividades
        router.get("/", [
            middlewares_1.AuthMiddleware.validateUserJwt
        ], controller.getActividades);
        // Crear una actividad con el rol de profesor o de administrador
        router.post("/", [
            middlewares_1.AuthMiddleware.validateUserJwt,
            middlewares_1.AuthMiddleware.verificarRol(data_1.UserRoles.PROFESOR, data_1.UserRoles.ADMIN),
        ], controller.createActividad);
        // Actualizar una actividad por medio del ID
        router.put("/:id", [
            middlewares_1.AuthMiddleware.validateUserJwt,
            middlewares_1.AuthMiddleware.verificarRol(data_1.UserRoles.PROFESOR, data_1.UserRoles.ADMIN),
        ], controller.updateActividad);
        // Eliminar una actividad por medio de ID
        router.delete("/:id", [
            middlewares_1.AuthMiddleware.validateUserJwt,
            middlewares_1.AuthMiddleware.verificarRol(data_1.UserRoles.PROFESOR, data_1.UserRoles.ADMIN),
        ], controller.deleteActivity);
        return router;
    }
}
exports.ActividadRoutes = ActividadRoutes;
