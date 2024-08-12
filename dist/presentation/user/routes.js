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
        router.get("/profesor/names", controller.getTeacharNames);
        router.post("/profesor", [
            middlewares_1.AuthMiddleware.validateUserJwt,
            middlewares_1.AuthMiddleware.verificarRol(data_1.UserRoles.ADMIN),
        ], controller.createProfesor);
        router.post("/alumno", [
            middlewares_1.AuthMiddleware.validateUserJwt,
            middlewares_1.AuthMiddleware.verificarRol(data_1.UserRoles.ADMIN, data_1.UserRoles.PROFESOR),
        ], controller.createAlumno);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
