import { envs } from "./config";
import { connectionDB } from "./data";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";


(async() => {
    await connectionDB();

    const server = new Server({
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    });

    server.start();
})();

