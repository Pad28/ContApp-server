import { Request, Response } from "express";
import { PreguntaService } from "../services";
import { CreatePreguntaDto, SearchIdDto } from "../../domain/dtos";
import { AppController } from "../share";


export class PreguntaController extends AppController {
    constructor(
        private readonly preguntaService: PreguntaService
    ) { super(); }

    public listarPreguntaPorIdActividad = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, searchDto] = SearchIdDto.create({ id });
        if (error || !searchDto) return res.status(400).json({ error });

        this.preguntaService.listarPreguntaPorIdActividad(searchDto)
            .then(results => res.json(results))
            .catch(error => this.triggerError(error, res));
    }

    public createPregunta = (req: Request, res: Response) => {
        const [error, createDto] = CreatePreguntaDto.create(req.body);
        if (error || !createDto) return res.status(400).json({ error });

        this.preguntaService.createPregunta(createDto)
            .then(pregunta => res.json(pregunta))
            .catch(error => this.triggerError(error, res));
    }
}