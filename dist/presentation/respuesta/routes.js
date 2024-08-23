"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespuestaRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const services_1 = require("../services");
const middlewares_1 = require("../middlewares");
const data_1 = require("../../data");
class RespuestaRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.RespuestaController(new services_1.RespuestaService());
        router.post("/", [
            middlewares_1.AuthMiddleware.validateUserJwt,
            middlewares_1.AuthMiddleware.verificarRol(data_1.UserRoles.PROFESOR, data_1.UserRoles.ADMIN),
        ], controller.createRespuesta);
        return router;
    }
}
exports.RespuestaRoutes = RespuestaRoutes;
