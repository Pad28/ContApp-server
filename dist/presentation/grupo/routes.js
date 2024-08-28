"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrupoRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const services_1 = require("../services");
const middlewares_1 = require("../middlewares");
const data_1 = require("../../data");
class GrupoRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.GrupoController(new services_1.GrupoService());
        // Listar grupos
        router.get("/", controller.getGrupos);
        // Crear grupo
        router.post("/", [
            middlewares_1.AuthMiddleware.validateUserJwt,
            middlewares_1.AuthMiddleware.verificarRol(data_1.UserRoles.ADMIN),
        ], controller.createGrupo);
        router.put("/:id", [
            middlewares_1.AuthMiddleware.validateUserJwt,
            middlewares_1.AuthMiddleware.verificarRol(data_1.UserRoles.PROFESOR, data_1.UserRoles.ADMIN),
        ], controller.updateGroup);
        return router;
    }
}
exports.GrupoRoutes = GrupoRoutes;
