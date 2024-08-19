import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { AuthRoutes } from "./auth/routes";
import { GrupoRoutes } from "./grupo/routes";
import { ActividadRoutes } from "./actividad/routes";
import { PublicacionRoutes } from "./publicacion/routes";
import { ActividadContestatdaRoutes } from "./actividad-contestada/routes";


export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/actividad-contestada", ActividadContestatdaRoutes.routes);
        router.use("/api/actividad", ActividadRoutes.routes);
        router.use("/api/auth", AuthRoutes.routes);
        router.use("/api/grupo", GrupoRoutes.routes);
        router.use("/api/publicacion", PublicacionRoutes.routes);
        router.use("/api/user", UserRoutes.routes);

        return router;
    }
}