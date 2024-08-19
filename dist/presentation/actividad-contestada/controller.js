"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActividadContestadaController = void 0;
const dtos_1 = require("../../domain/dtos");
const share_1 = require("../share");
class ActividadContestadaController extends share_1.AppController {
    constructor(actividadContestadaService) {
        super();
        this.actividadContestadaService = actividadContestadaService;
        this.insertarActiviadadContestada = (req, res) => {
            const { matricula } = req.body.user;
            const [error, createDto] = dtos_1.CreateActividadContestadaDto.create(Object.assign(Object.assign({}, req.body), { id_alumno: matricula }));
            if (error || !createDto)
                return res.status(400).json({ error });
            this.actividadContestadaService.insertarActividadContestada(createDto)
                .then(activity => res.json(activity))
                .catch(error => this.triggerError(error, res));
        };
    }
}
exports.ActividadContestadaController = ActividadContestadaController;
