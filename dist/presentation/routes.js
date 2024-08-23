"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./user/routes");
const routes_2 = require("./auth/routes");
const routes_3 = require("./grupo/routes");
const routes_4 = require("./actividad/routes");
const routes_5 = require("./publicacion/routes");
const routes_6 = require("./actividad-contestada/routes");
const routes_7 = require("./pregunta/routes");
const routes_8 = require("./respuesta/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use("/api/actividad-contestada", routes_6.ActividadContestatdaRoutes.routes);
        router.use("/api/actividad", routes_4.ActividadRoutes.routes);
        router.use("/api/auth", routes_2.AuthRoutes.routes);
        router.use("/api/grupo", routes_3.GrupoRoutes.routes);
        router.use("/api/pregunta", routes_7.PreguntaRoutes.routes);
        router.use("/api/publicacion", routes_5.PublicacionRoutes.routes);
        router.use("/api/respuesta", routes_8.RespuestaRoutes.routes);
        router.use("/api/user", routes_1.UserRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
