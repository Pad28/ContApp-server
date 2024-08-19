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
        router.post("/", [
            middlewares_1.AuthMiddleware.validateUserJwt
        ], controller.insertarActiviadadContestada);
        return router;
    }
}
exports.ActividadContestatdaRoutes = ActividadContestatdaRoutes;
