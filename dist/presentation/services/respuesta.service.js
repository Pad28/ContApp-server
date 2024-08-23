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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespuestaService = void 0;
const data_1 = require("../../data");
const domain_1 = require("../../domain");
class RespuestaService {
    constructor() { }
    createRespuesta(createDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pregunta, respuesta } = data_1.prisma;
            const existQuestion = yield pregunta.findUnique({ where: { id: createDto.id_pregunta } });
            if (!existQuestion)
                throw domain_1.RequestError.badRequest("Actividad no existente");
            let { esCorrecta } = createDto, data = __rest(createDto, ["esCorrecta"]);
            return yield respuesta.create({
                data: Object.assign(Object.assign({}, data), { esCorrecta: esCorrecta === "true" }),
            });
        });
    }
}
exports.RespuestaService = RespuestaService;
