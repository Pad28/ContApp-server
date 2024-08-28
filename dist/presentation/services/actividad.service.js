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
exports.ActividadService = void 0;
const data_1 = require("../../data");
const domain_1 = require("../../domain");
class ActividadService {
    getAvtividades() {
        return __awaiter(this, void 0, void 0, function* () {
            const { actividad } = data_1.prisma;
            return { results: yield actividad.findMany() };
        });
    }
    getActivityByGroup(searchDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { actividad } = data_1.prisma;
            return yield actividad.findMany({
                where: { id_grupo: searchDto.id },
                // include: { fk_pregunta: { include: { fk_respuesta: true, _count: true } } }
            });
        });
    }
    getActivityById(seacthDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { actividad } = data_1.prisma;
            return yield actividad.findUnique({
                where: { id: seacthDto.id },
                include: { fk_pregunta: { include: { fk_respuesta: true, _count: true } } }
            });
        });
    }
    createActividad(createDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { actividad, grupo } = data_1.prisma;
            const existGroup = yield grupo.findUnique({ where: { id: createDto.id_grupo } });
            if (!existGroup)
                throw domain_1.RequestError.badRequest("Grupo no encontrado");
            // Obtener la fecha y hora local
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes de 0 a 11
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
            return yield actividad.create({
                data: {
                    nombre: createDto.nombre,
                    id_grupo: existGroup.id,
                    fecha_creacion: formattedDate,
                    fecha_limite: createDto.fecha_limite,
                    fecha_activacion: createDto.fecha_activacion,
                }
            });
        });
    }
    updateActividad(updateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { actividad } = data_1.prisma;
            const _a = updateDto.values, { id } = _a, data = __rest(_a, ["id"]);
            const existActivity = yield actividad.findUnique({ where: { id } });
            if (!existActivity)
                throw domain_1.RequestError.badRequest("Actividad no encontrada");
            return yield actividad.update({
                where: { id },
                data
            });
        });
    }
    deleteActividad(deleteDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { actividad } = data_1.prisma;
            const existActivity = yield actividad.findUnique({ where: { id: deleteDto.id } });
            if (!existActivity)
                throw domain_1.RequestError.badRequest("Actividad no encontrada");
            yield actividad.delete({ where: { id: deleteDto.id } });
            return { message: "Actividad eliminada" };
        });
    }
}
exports.ActividadService = ActividadService;
