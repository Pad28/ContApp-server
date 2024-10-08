"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicacionController = void 0;
const fs_1 = __importDefault(require("fs"));
const share_1 = require("../share");
const dtos_1 = require("../../domain/dtos");
class PublicacionController extends share_1.AppController {
    constructor(publicacionService) {
        super();
        this.publicacionService = publicacionService;
        this.getDocToImage = (req, res) => {
            const { id, pageNumber } = req.params;
            const [error, searchDto] = dtos_1.SearchIdDto.create({ id });
            if (error || !searchDto)
                return res.status(400).json({ error });
            this.publicacionService.getDocToImage(searchDto, +pageNumber)
                .then(result => {
                res.sendFile(result.path);
                setTimeout(() => {
                    fs_1.default.unlinkSync(result.path);
                }, 50);
            })
                .catch(error => this.triggerError(error, res));
        };
        this.getPublicacionByDocumentId = (req, res) => {
            const { id } = req.params;
            const [error, searchDto] = dtos_1.SearchIdDto.create({ id });
            if (error || !searchDto)
                return res.status(400).json({ error });
            this.publicacionService.getPublicationByDocId(searchDto)
                .then(pub => res.sendFile(pub))
                .catch(error => this.triggerError(error, res));
        };
        this.getPublicacionByGrupoId = (req, res) => {
            const { id } = req.params;
            const [error, searchDto] = dtos_1.SearchIdDto.create({ id });
            if (error || !searchDto)
                return res.status(400).json({ error });
            this.publicacionService.listPublicacionesByGrupoId(searchDto)
                .then(results => res.json(results))
                .catch(error => this.triggerError(error, res));
        };
        this.getPublicacionByProfesorId = (req, res) => {
            const { id } = req.params;
            const [error, searchDto] = dtos_1.SearchIdDto.create({ id });
            if (error || !searchDto)
                return res.status(400).json({ error });
            this.publicacionService.listPublicacionesByProfesorId(searchDto)
                .then(results => res.json(results))
                .catch(error => this.triggerError(error, res));
        };
        this.crearPublicacion = (req, res) => {
            if (!req.file)
                return res.status(401).json({ error: 'No hay archivo que subir' });
            const [error, createDto] = dtos_1.CreatePublicacionDto.create(req.body);
            if (error || !createDto)
                return res.status(400).json({ error });
            this.publicacionService.createPublicacion(createDto, req.file)
                .then(publicacion => res.json(publicacion))
                .catch(error => this.triggerError(error, res));
        };
        this.updatePublicacion = (req, res) => {
            const { id } = req.params;
            const [error, updateDto] = dtos_1.UpdatePublicacionDto.create(Object.assign(Object.assign({}, req.body), { id }));
            if (error || !updateDto)
                return res.status(400).json({ error });
            this.publicacionService.updatePublicacion(updateDto)
                .then(pub => res.json(pub))
                .catch(error => this.triggerError(error, res));
        };
        this.deletePublicacion = (req, res) => {
            const { id } = req.params;
            const [error, deleteDto] = dtos_1.DeletePublicacionDto.create({ id });
            if (error || !deleteDto)
                return res.status(400).json({ error });
            this.publicacionService.deletePublicacionDto(deleteDto)
                .then(result => res.json(result))
                .catch(error => this.triggerError(error, res));
        };
    }
}
exports.PublicacionController = PublicacionController;
