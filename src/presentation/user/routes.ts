import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services";
import { AuthMiddleware } from "../middlewares";
import { UserRoles } from "../../data";

export class UserRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new UserController(
            new UserService()
        );

        // Listar los nombres de los profesores
        router.get("/profesor/names", controller.getTeacharNames);


        router.get("/alumnos-por-tutor/:tutor", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.ADMIN, UserRoles.PROFESOR),
        ], controller.getStudentsByTutor);

        // Listar alimnos por grupo
        router.get("/alumnos-por-grupo/:group", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.ADMIN, UserRoles.PROFESOR),
        ], controller.getStudentsByGroup);

        // Crear un profesor, adminte el rol de ADMIN
        router.post("/profesor", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.ADMIN),
        ], controller.createProfesor);

        // Crear alumno desde usuario con rol ADMIN o PROFESOR
        router.post("/alumno", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.ADMIN, UserRoles.PROFESOR),
        ], controller.createAlumno);

        // Actualizar alimno por medio del id
        router.put("/alumno/:id", [
            AuthMiddleware.validateUserJwt,
        ], controller.updateAlumno);

        // Actualizar profesor por medio de id, admite rol de PROFESOR y ADMIN
        router.put("/profesor/:id", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.PROFESOR, UserRoles.ADMIN),
        ], controller.updateProfesor);

        return router;
    }
}
