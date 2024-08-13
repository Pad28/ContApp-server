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
exports.ActividadService = void 0;
const data_1 = require("../../data");
class ActividadService {
    getAvtividades() {
        return __awaiter(this, void 0, void 0, function* () {
            const { actividad } = data_1.prisma;
            return { results: yield actividad.findMany() };
        });
    }
    createActividad(createDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { actividad } = data_1.prisma;
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
                    fecha_creacion: formattedDate,
                    fecha_limite: createDto.fecha_limite,
                    fecha_activacion: createDto.fecha_activacion,
                }
            });
        });
    }
}
exports.ActividadService = ActividadService;
