import { Router } from "express";
import { AuthController } from "./controller";
import { AuhtService, EmailService, TokenManager } from "../services";
import { AuthMiddleware } from "../middlewares";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new AuthController(
            new AuhtService(
                new EmailService(),
                new TokenManager(),
            ),
        );

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
            AuthMiddleware.validateUserJwt
        ], controller.renewJWT);

        return router;
    }
}