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
    updateGrupo(updateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { grupo, usuario } = data_1.prisma;
            const _a = updateDto.values, { id } = _a, data = __rest(_a, ["id"]);
            const existGrupo = yield grupo.findUnique({ where: { id } });
            if (!existGrupo)
                throw domain_1.RequestError.badRequest("Grupo no encontrado");
            if (updateDto.id_maestro) {
                const existTeacher = yield usuario.findUnique({
                    where: { matricula: updateDto.id_maestro, rol: data_1.UserRoles.PROFESOR }
                });
                if (!existTeacher)
                    throw domain_1.RequestError.badRequest("Profesor no enontrado");
            }
            if (updateDto.new_id) {
                const validId = yield grupo.findUnique({ where: { id: updateDto.new_id } });
                if (validId)
                    throw domain_1.RequestError.badRequest("Nombre de grupo no valido");
                data.id = updateDto.new_id;
            }
            const { new_id } = data, rest = __rest(data, ["new_id"]);
            updateDto.new_id ? rest.id = updateDto.new_id : null;
            return yield grupo.update({
                where: { id },
                data: Object.assign({}, rest)
            });
        });
    }
}
exports.GrupoService = GrupoService;
