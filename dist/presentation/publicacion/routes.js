"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicacionRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const publicaciones_service_1 = require("../services/publicaciones.service");
const services_1 = require("../services");
const multer_1 = __importDefault(require("multer"));
const middlewares_1 = require("../middlewares");
const data_1 = require("../../data");
class PublicacionRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.PublicacionController(new publicaciones_service_1.PublicacionesService(new services_1.FileManagerService()));
        const upload = (0, multer_1.default)({ dest: 'uploads/tmp' });
        router.get("/by-document-id/:id", [
            middlewares_1.AuthMiddleware.validateUserJwt,
        ], controller.getPublicacionByDocumentID);
        router.get("/by-group-id/:id", [
            middlewares_1.AuthMiddleware.validateUserJwt,
        ], controller.getPublicacionByGrupoId);
        router.get("/by-profesor-id/:id", [
            middlewares_1.AuthMiddleware.validateUserJwt,
        ], controller.getPublicacionByProfesorId);
        router.post("/", [
            middlewares_1.AuthMiddleware.validateUserJwt,
            middlewares_1.AuthMiddleware.verificarRol(data_1.UserRoles.PROFESOR, data_1.UserRoles.ADMIN),
            upload.single("file"),
        ], controller.crearPublicacion);
        router.put("/", [
            middlewares_1.AuthMiddleware.validateUserJwt,
            middlewares_1.AuthMiddleware.verificarRol(data_1.UserRoles.PROFESOR, data_1.UserRoles.ADMIN),
        ], controller.updatePublicacion);
        router.delete("/:id", [
            middlewares_1.AuthMiddleware.validateUserJwt,
            middlewares_1.AuthMiddleware.verificarRol(data_1.UserRoles.PROFESOR, data_1.UserRoles.ADMIN),
        ], controller.deletePublicacion);
        return router;
    }
}
exports.PublicacionRoutes = PublicacionRoutes;
