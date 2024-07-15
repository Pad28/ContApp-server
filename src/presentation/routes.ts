import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { AuthRoutes } from "./auth/routes";


export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/user", UserRoutes.routes);
        router.use("/api/auth", AuthRoutes.routes);

        return router;
    }
}