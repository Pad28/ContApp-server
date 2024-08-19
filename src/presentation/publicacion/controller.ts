import fs from "fs";

import { Request, Response } from "express";
import { PublicacionesService } from "../services/publicaciones.service";
import { AppController } from "../share";

import {
    CreatePublicacionDto,
    DeletePublicacionDto,
    SearchIdDto,
    UpdatePublicacionDto
} from "../../domain/dtos";

export class PublicacionController extends AppController {
    constructor(
        private readonly publicacionService: PublicacionesService,
    ) { super(); }

    public getDocToImage = (req: Request, res: Response) => {
        const { id, pageNumber } = req.params;
        const [error, searchDto] = SearchIdDto.create({ id });
        if (error || !searchDto) return res.status(400).json({ error });

        this.publicacionService.getDocToImage(searchDto, +pageNumber)
            .then(result => {
                res.sendFile(result.path!);
                setTimeout(() => {
                    fs.unlinkSync(result.path!);
                }, 50)
            })
            .catch(error => this.triggerError(error, res));
    }

    public getPublicacionByDocumentId = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, searchDto] = SearchIdDto.create({ id });
        if (error || !searchDto) return res.status(400).json({ error });

        this.publicacionService.getPublicationByDocId(searchDto)
            .then(pub => res.sendFile(pub))
            .catch(error => this.triggerError(error, res));
    }

    public getPublicacionByGrupoId = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, searchDto] = SearchIdDto.create({ id });
        if (error || !searchDto) return res.status(400).json({ error });

        this.publicacionService.listPublicacionesByGrupoId(searchDto)
            .then(results => res.json(results))
            .catch(error => this.triggerError(error, res));
    }

    public getPublicacionByProfesorId = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, searchDto] = SearchIdDto.create({ id });
        if (error || !searchDto) return res.status(400).json({ error });

        this.publicacionService.listPublicacionesByProfesorId(searchDto)
            .then(results => res.json(results))
            .catch(error => this.triggerError(error, res));
    }

    public crearPublicacion = (req: Request, res: Response) => {
        if (!req.file) return res.status(401).json({ error: 'No hay archivo que subir' });
        const [error, createDto] = CreatePublicacionDto.create(req.body);
        if (error || !createDto) return res.status(400).json({ error });

        this.publicacionService.createPublicacion(createDto, req.file)
            .then(publicacion => res.json(publicacion))
            .catch(error => this.triggerError(error, res));
    }

    public updatePublicacion = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, updateDto] = UpdatePublicacionDto.create({ ...req.body, id });
        if (error || !updateDto) return res.status(400).json({ error });

        this.publicacionService.updatePublicacion(updateDto)
            .then(pub => res.json(pub))
            .catch(error => this.triggerError(error, res));
    }

    public deletePublicacion = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, deleteDto] = DeletePublicacionDto.create({ id });
        if (error || !deleteDto) return res.status(400).json({ error });
        this.publicacionService.deletePublicacionDto(deleteDto)
            .then(result => res.json(result))
            .catch(error => this.triggerError(error, res));
    }
}