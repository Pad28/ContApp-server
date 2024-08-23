"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreguntaController = void 0;
const dtos_1 = require("../../domain/dtos");
const share_1 = require("../share");
class PreguntaController extends share_1.AppController {
    constructor(preguntaService) {
        super();
        this.preguntaService = preguntaService;
        this.listarPreguntaPorIdActividad = (req, res) => {
            const { id } = req.params;
            const [error, searchDto] = dtos_1.SearchIdDto.create({ id });
            if (error || !searchDto)
                return res.status(400).json({ error });
            this.preguntaService.listarPreguntaPorIdActividad(searchDto)
                .then(results => res.json(results))
                .catch(error => this.triggerError(error, res));
        };
        this.createPregunta = (req, res) => {
            const [error, createDto] = dtos_1.CreatePreguntaDto.create(req.body);
            if (error || !createDto)
                return res.status(400).json({ error });
            this.preguntaService.createPregunta(createDto)
                .then(pregunta => res.json(pregunta))
                .catch(error => this.triggerError(error, res));
        };
    }
}
exports.PreguntaController = PreguntaController;
