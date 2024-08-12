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
exports.GrupoService = void 0;
const data_1 = require("../../data");
const domain_1 = require("../../domain");
class GrupoService {
    constructor() { }
    createGrupo(createDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { grupo, usuario } = data_1.prisma;
            const [existMaestro, existGrupo] = yield Promise.all([
                yield usuario.findUnique({ where: { matricula: createDto.id_maestro, rol: data_1.UserRoles.PROFESOR } }),
                yield grupo.findUnique({ where: { id: createDto.id } }),
            ]);
            if (!existMaestro)
                throw domain_1.RequestError.badRequest("Profesor no valido");
            if (existGrupo)
                throw domain_1.RequestError.badRequest("Grupo ya registrado");
            return yield grupo.create({ data: createDto });
        });
    }
    getGrupos() {
        return __awaiter(this, void 0, void 0, function* () {
            const { grupo } = data_1.prisma;
            return { results: yield grupo.findMany() };
        });
    }
}
exports.GrupoService = GrupoService;
