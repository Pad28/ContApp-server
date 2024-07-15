import path from "path";
import express, { Application, Router } from "express";
import cors from "cors";
import compression from "compression";


interface ServerOptions {
    port: number;
    publicPath: string;
    routes: Router;
}

export class Server {

    private readonly app: Application;
    private readonly routes: Router;

    constructor(
        private readonly options: ServerOptions,
    ) {
        this.app = express();
        this.routes = this.options.routes;
    }

    public async start() {

        // Middlewares
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }) );
        this.app.use( cors() );
        this.app.use( compression() );
        
        // Public folder
        this.app.use(express.static(this.options.publicPath));

        // Routes
        this.app.use(this.routes);

        this.app.get("/test", (req, res) => {
            res.sendFile(path.resolve(__dirname, "../../public/Guía de estudio-Las cuentas.pdf"));
        })
        this.app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, `../../${this.options.publicPath}`, "index.html"));
        });
        
        this.app.listen(this.options.port, () => {
            console.log(`Servidor escuchando en puerto ${this.options.port}`);
        });
    }

}