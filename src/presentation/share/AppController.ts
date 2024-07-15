import { Response } from "express";
import { RequestError } from "../../domain";
import { Logger } from "../../config";

export class AppController {
    protected triggerError = (error: unknown, res: Response) => {
        if(error instanceof RequestError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        Logger.log(`${error}`);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}