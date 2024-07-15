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

        router.post("/profesor", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol( UserRoles.ADMIN ),
        ],  controller.createProfesor);

        router.post("/alumno", [
            AuthMiddleware.validateUserJwt,
            AuthMiddleware.verificarRol(UserRoles.ADMIN, UserRoles.PROFESOR),
        ], controller.createAlumno);

        return router;
    }
}
