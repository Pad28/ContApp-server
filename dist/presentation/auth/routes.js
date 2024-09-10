"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const services_1 = require("../services");
const middlewares_1 = require("../middlewares");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.AuthController(new services_1.AuhtService(new services_1.EmailService(), new services_1.TokenManager("tokens.json")));
        // Ruta para iniciar sesión como alumno
        router.post("/alumno", controller.loginAlumno);
        // Ruta para iniciar sesión como profesor
        router.post("/profesor", controller.loginProfesor);
        // Ruta para enviar correo de verificación a alumno
        router.post("/alumno/send-email/:matricula", controller.sendVerifyEmailAlumno);
        // Ruta para registrar alumno una vez se recibio el token de verificacion
        router.post("/alumno/register/:token", controller.createStudentByVerifyEmail);
        // Ruta para registrar recuperacion de contraseña
        router.post("/forgot-password", controller.forgotPassword);
        // Cambio de contraseña una vez se ha recibido el token de verificación al correo del usuario 
        router.post("/recover-password/:token", controller.recoveryPassword);
        // Renovar JWT
        router.post("/renew-token", [
            middlewares_1.AuthMiddleware.validateUserJwt
        ], controller.renewJWT);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
