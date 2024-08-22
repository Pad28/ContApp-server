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

        router.get("/profesor/names", controller.getTeacharNames);

        router.post("/profesor", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.ADMIN),
        ], controller.createProfesor);

        router.post("/alumno", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.ADMIN, UserRoles.PROFESOR),
        ], controller.createAlumno);

        router.put("/alumno/:id", [
            AuthMiddleware.validateUserJwt,
        ], controller.updateAlumno);

        router.put("/profesor/:id", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.PROFESOR, UserRoles.ADMIN),
        ], controller.updateProfesor);

        return router;
    }
}
