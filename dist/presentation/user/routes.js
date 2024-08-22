"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const services_1 = require("../services");
const middlewares_1 = require("../middlewares");
const data_1 = require("../../data");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.UserController(new services_1.UserService());
        // Listar los nombres de los profesores
        router.get("/profesor/names", controller.getTeacharNames);
        // Crear un profesor, adminte el rol de ADMIN
        router.post("/profesor", [
            middlewares_1.AuthMiddleware.validateUserJwt,
            middlewares_1.AuthMiddleware.verificarRol(data_1.UserRoles.ADMIN),
        ], controller.createProfesor);
        // Crear alumno desde usuario con rol ADMIN o PROFESOR
        router.post("/alumno", [
            middlewares_1.AuthMiddleware.validateUserJwt,
            middlewares_1.AuthMiddleware.verificarRol(data_1.UserRoles.ADMIN, data_1.UserRoles.PROFESOR),
        ], controller.createAlumno);
        // Actualizar alimno por medio del id
        router.put("/alumno/:id", [
            middlewares_1.AuthMiddleware.validateUserJwt,
        ], controller.updateAlumno);
        // Actualizar profesor por medio de id, admite rol de PROFESOR y ADMIN
        router.put("/profesor/:id", [
            middlewares_1.AuthMiddleware.validateUserJwt,
            middlewares_1.AuthMiddleware.verificarRol(data_1.UserRoles.PROFESOR, data_1.UserRoles.ADMIN),
        ], controller.updateProfesor);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
