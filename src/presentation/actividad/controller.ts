import { Request, Response } from "express";
import { AppController } from "../share";
import { CreateActividadDto } from "../../domain/dtos";
import { ActividadService } from "../services";


export class ActidvidadController extends AppController {
    constructor(
        private actividadService: ActividadService,
    ) { super(); }

    public getActividades = (req: Request, res: Response) => {
        this.actividadService.getAvtividades()
            .then(results => res.json(results))
            .catch(error => this.triggerError(error, res));
    }

    public createActividad = (req: Request, res: Response) => {
        const [error, createActividadDto] = CreateActividadDto.create(req.body);
        if (error || !createActividadDto) return res.status(400).json({ error });

        this.actividadService.createActividad(createActividadDto)
            .then(actividad => res.json(actividad))
            .catch(error => this.triggerError(error, res));
    }
}