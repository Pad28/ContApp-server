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
exports.ActividadContestadaService = void 0;
const data_1 = require("../../data");
const domain_1 = require("../../domain");
class ActividadContestadaService {
    constructor() { }
    getActivityById(idDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { actividadContestada } = data_1.prisma;
            const existActivity = yield actividadContestada.findUnique({
                where: {
                    id: idDto.id,
                }
            });
            if (!existActivity)
                throw domain_1.RequestError.badRequest("Actividad no encontrada");
            return existActivity;
        });
    }
    getActivitiesByAlumno(idDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, actividadContestada } = data_1.prisma;
            const existAlumno = yield usuario.findUnique({
                where: {
                    matricula: idDto.id,
                },
            });
            if (!existAlumno)
                throw domain_1.RequestError.badRequest("Alumno no valido");
            const results = yield actividadContestada.findMany({
                where: { id_alumno: idDto.id },
                include: {
                    fk_actividad: {
                        include: {
                            fk_pregunta: {
                                include: {
                                    fk_pregunta_respondida: { include: { fk_respuesta: true } }
                                }
                            },
                        }
                    }
                },
                orderBy: { fk_actividad: { fecha_creacion: "asc" } }
            });
            const data = results.map(e => {
                const { fk_pregunta } = e.fk_actividad;
                const questionData = fk_pregunta.map(j => {
                    const fk_pregunta_respondida = j.fk_pregunta_respondida.map(c => {
                        const { fk_respuesta, id } = c;
                        return {
                            id,
                            fk_respuesta
                        };
                    });
                    return {
                        id_actividad: j.id,
                        fk_pregunta_respondida,
                    };
                });
                return {
                    id_actividad_contestada: e.id,
                    id_actividad: e.id_actividad,
                    fk_actividad: questionData
                };
            });
            return { results: data };
        });
    }
    insertarActividadContestada(createDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { actividadContestada, usuario, actividad } = data_1.prisma;
            const [existActividad, existUsuario, isActividadAnswered] = yield Promise.all([
                actividad.findUnique({ where: { id: createDto.id_actividad } }),
                usuario.findUnique({ where: { matricula: createDto.id_alumno } }),
                actividadContestada.findFirst({
                    where: {
                        id_alumno: createDto.id_alumno,
                        id_actividad: createDto.id_actividad,
                    }
                })
            ]);
            if (!existActividad)
                throw domain_1.RequestError.badRequest(`La actividad ${createDto.id_actividad} no existe`);
            if (!existUsuario)
                throw domain_1.RequestError.badRequest(`La matricula ${createDto.id_alumno} no existe`);
            if (isActividadAnswered)
                throw domain_1.RequestError.badRequest(`Esta actividad ya fue contestada`);
            const result = yield actividadContestada.create({ data: createDto });
            return result;
        });
    }
}
exports.ActividadContestadaService = ActividadContestadaService;
