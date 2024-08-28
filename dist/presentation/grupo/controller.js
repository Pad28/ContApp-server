"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrupoController = void 0;
const share_1 = require("../share");
const dtos_1 = require("../../domain/dtos");
class GrupoController extends share_1.AppController {
    constructor(grupoService) {
        super();
        this.grupoService = grupoService;
        this.createGrupo = (req, res) => {
            const [error, createDto] = dtos_1.CreateGrupoDto.create(req.body);
            if (error || !createDto)
                return res.status(400).json({ error });
            this.grupoService.createGrupo(createDto)
                .then(grupo => res.json(grupo))
                .catch(error => this.triggerError(error, res));
        };
        this.getGrupos = (req, res) => {
            this.grupoService.getGrupos()
                .then(results => res.json(results))
                .catch(error => this.triggerError(error, res));
        };
        this.updateGroup = (req, res) => {
            const [error, updaDto] = dtos_1.UpdateGrupoDto.create(Object.assign(Object.assign({}, req.body), { id: req.params.id }));
            if (error || !updaDto)
                return res.status(400).json({ error });
            this.grupoService.updateGrupo(updaDto)
                .then(result => res.json(result))
                .catch(error => this.triggerError(error, res));
        };
    }
}
exports.GrupoController = GrupoController;
