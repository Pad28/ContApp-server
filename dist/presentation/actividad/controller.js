"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActidvidadController = void 0;
const share_1 = require("../share");
const dtos_1 = require("../../domain/dtos");
class ActidvidadController extends share_1.AppController {
    constructor(actividadService) {
        super();
        this.actividadService = actividadService;
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
    }
}
exports.ActidvidadController = ActidvidadController;
