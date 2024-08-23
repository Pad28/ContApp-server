"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespuestaController = void 0;
const share_1 = require("../share");
const dtos_1 = require("../../domain/dtos");
class RespuestaController extends share_1.AppController {
    constructor(respuestaService) {
        super();
        this.respuestaService = respuestaService;
        this.createRespuesta = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, createDto] = dtos_1.CreateRespuestaDto.create(req.body);
            if (error || !createDto)
                return res.status(400).json({ error });
            this.respuestaService.createRespuesta(createDto)
                .then(respuesta => res.json(respuesta))
                .catch(error => this.triggerError(error, res));
        });
    }
}
exports.RespuestaController = RespuestaController;
