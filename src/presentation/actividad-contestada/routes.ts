import { Router } from "express";
import { ActividadContestadaController } from "./controller";
import { ActividadContestadaService } from "../services";
import { AuthMiddleware } from "../middlewares";

export class ActividadContestatdaRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new ActividadContestadaController(
            new ActividadContestadaService(),
        );

        router.post("/", [
            AuthMiddleware.validateUserJwt
        ], controller.insertarActiviadadContestada);

        return router;
    }
}