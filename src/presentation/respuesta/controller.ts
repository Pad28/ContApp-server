import { Request, Response } from "express";
import { RespuestaService } from "../services";
import { AppController } from "../share";
import { CreateRespuestaDto } from "../../domain/dtos";

export class RespuestaController extends AppController {
    constructor(
        private readonly respuestaService: RespuestaService,
    ) { super(); }

    public createRespuesta = async (req: Request, res: Response) => {
        const [error, createDto] = CreateRespuestaDto.create(req.body);
        if (error || !createDto) return res.status(400).json({ error });

        this.respuestaService.createRespuesta(createDto)
            .then(respuesta => res.json(respuesta))
            .catch(error => this.triggerError(error, res));
    }
}
