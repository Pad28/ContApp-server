"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreguntaRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const services_1 = require("../services");
const middlewares_1 = require("../middlewares");
const data_1 = require("../../data");
class PreguntaRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.PreguntaController(new services_1.PreguntaService());
        router.get("/:id", [
            middlewares_1.AuthMiddleware.validateUserJwt,
        ], controller.listarPreguntaPorIdActividad);
        router.post("/", [
            middlewares_1.AuthMiddleware.validateUserJwt,
            middlewares_1.AuthMiddleware.verificarRol(data_1.UserRoles.PROFESOR, data_1.UserRoles.ADMIN),
        ], controller.createPregunta);
        return router;
    }
}
exports.PreguntaRoutes = PreguntaRoutes;
