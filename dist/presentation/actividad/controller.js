"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActidvidadController = void 0;
const share_1 = require("../share");
const dtos_1 = require("../../domain/dtos");
class ActidvidadController extends share_1.AppController {
    constructor(actividadService) {
        super();
        this.actividadService = actividadService;
        this.getActivityByGroup = (req, res) => {
            const { id } = req.params;
            const [error, searchDto] = dtos_1.SearchIdDto.create({ id });
            if (error || !searchDto)
                return res.status(400).json({ error });
            this.actividadService.getActivityByGroup(searchDto)
                .then(result => res.json(result))
                .catch(error => this.triggerError(error, res));
        };
        this.getActivityById = (req, res) => {
            const { id } = req.params;
            const [error, searchDto] = dtos_1.SearchIdDto.create({ id });
            if (error || !searchDto)
                return res.status(400).json({ error });
            this.actividadService.getActivityById(searchDto)
                .then(result => res.json(result))
                .catch(error => this.triggerError(error, res));
        };
        this.getActividades = (req, res) => {
            this.actividadService.getAvtividades()
                .then(results => res.json(results))
                .catch(error => this.triggerError(error, res));
        };
        this.createActividad = (req, res) => {
            const [error, createActividadDto] = dtos_1.CreateActividadDto.create(req.body);
            if (error || !createActividadDto)
                return res.status(400).json({ error });
            this.actividadService.createActividad(createActividadDto)
                .then(actividad => res.json(actividad))
                .catch(error => this.triggerError(error, res));
        };
        this.updateActividad = (req, res) => {
            const { id } = req.params;
            const [error, updateDto] = dtos_1.UpdateActividadDto.create(Object.assign({ id }, req.body));
            if (error || !updateDto)
                return res.status(400).json({ error });
            this.actividadService.updateActividad(updateDto)
                .then(actividad => res.json(actividad))
                .catch(error => this.triggerError(error, res));
        };
        this.deleteActivity = (req, res) => {
            const { id } = req.params;
            const [error, deleteDto] = dtos_1.DeleteActividadDto.create({ id });
            if (error || !deleteDto)
                return res.status(400).json({ error });
            this.actividadService.deleteActividad(deleteDto)
                .then(result => res.json(result))
                .catch(error => this.triggerError(error, res));
        };
    }
}
exports.ActidvidadController = ActidvidadController;
