import { Request, Response } from "express";
import { GrupoService } from "../services";
import { AppController } from "../share";
import { CreateGrupoDto, UpdateGrupoDto } from "../../domain/dtos";


export class GrupoController extends AppController {
    constructor(
        private readonly grupoService: GrupoService,
    ) { super(); }

    public createGrupo = (req: Request, res: Response) => {
        const [error, createDto] = CreateGrupoDto.create(req.body);
        if (error || !createDto) return res.status(400).json({ error });

        this.grupoService.createGrupo(createDto)
            .then(grupo => res.json(grupo))
            .catch(error => this.triggerError(error, res));
    }

    public getGrupos = (req: Request, res: Response) => {
        this.grupoService.getGrupos()
            .then(results => res.json(results))
            .catch(error => this.triggerError(error, res));
    }

    public updateGroup = (req: Request, res: Response) => {
        const [error, updaDto] = UpdateGrupoDto.create({ ...req.body, id: req.params.id });
        if (error || !updaDto) return res.status(400).json({ error });

        this.grupoService.updateGrupo(updaDto)
            .then(result => res.json(result))
            .catch(error => this.triggerError(error, res));
    }
}