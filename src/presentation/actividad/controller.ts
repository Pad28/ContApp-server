import { Request, Response } from "express";
import { AppController } from "../share";
import { CreateActividadDto, DeleteActividadDto, SearchIdDto, UpdateActividadDto } from "../../domain/dtos";
import { ActividadService } from "../services";


export class ActidvidadController extends AppController {
    constructor(
        private actividadService: ActividadService,
    ) { super(); }

    public getActivityById = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, searchDto] = SearchIdDto.create({ id });
        if (error || !searchDto) return res.status(400).json({ error });

        this.actividadService.getActivityById(searchDto)
            .then(result => res.json(result))
            .catch(error => this.triggerError(error, res));
    }

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

    public updateActividad = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, updateDto] = UpdateActividadDto.create({ id, ...req.body });
        if (error || !updateDto) return res.status(400).json({ error });

        this.actividadService.updateActividad(updateDto)
            .then(actividad => res.json(actividad))
            .catch(error => this.triggerError(error, res));
    }

    public deleteActivity = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, deleteDto] = DeleteActividadDto.create({ id });
        if (error || !deleteDto) return res.status(400).json({ error });

        this.actividadService.deleteActividad(deleteDto)
            .then(result => res.json(result))
            .catch(error => this.triggerError(error, res));

    }
}