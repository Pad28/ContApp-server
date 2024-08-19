import { Request, Response } from "express";
import { CreateActividadContestadaDto } from "../../domain/dtos";
import { ActividadContestadaService } from "../services";
import { AppController } from "../share";

export class ActividadContestadaController extends AppController {
    constructor(
        private readonly actividadContestadaService: ActividadContestadaService
    ) { super(); }

    public insertarActiviadadContestada = (req: Request, res: Response) => {
        const { matricula } = req.body.user;

        const [error, createDto] = CreateActividadContestadaDto.create({
            ...req.body,
            id_alumno: matricula
        });
        if (error || !createDto) return res.status(400).json({ error });

        this.actividadContestadaService.insertarActividadContestada(createDto)
            .then(activity => res.json(activity))
            .catch(error => this.triggerError(error, res));
    }
}