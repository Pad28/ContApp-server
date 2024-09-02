import { prisma, UserRoles } from "../../data";
import { RequestError } from "../../domain";
import { CreateActividadContestadaDto, SearchIdDto } from "../../domain/dtos";

export class ActividadContestadaService {
    constructor() { }

    public async getActivityById(idDto: SearchIdDto) {
        const { actividadContestada } = prisma;
        const existActivity = await actividadContestada.findUnique({
            where: {
                id: idDto.id,
            }
        });
        if (!existActivity) throw RequestError.badRequest("Actividad no encontrada");
        return existActivity;
    }

    public async getActivitiesByAlumno(idDto: SearchIdDto) {
        const { usuario, actividadContestada } = prisma;

        const existAlumno = await usuario.findUnique({
            where: {
                matricula: idDto.id,
            },
        });

        if (!existAlumno) throw RequestError.badRequest("Alumno no valido");
        const results = await actividadContestada.findMany({
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
                    }
                });

                return {
                    id_actividad: j.id,
                    fk_pregunta_respondida,
                }
            });

            return {
                id_actividad_contestada: e.id,
                id_actividad: e.id_actividad,
                fk_actividad: questionData

            }
        })

        return { results: data };

    }

    public async insertarActividadContestada(createDto: CreateActividadContestadaDto) {
        const { actividadContestada, usuario, actividad } = prisma;

        const [existActividad, existUsuario, isActividadAnswered] = await Promise.all([
            actividad.findUnique({ where: { id: createDto.id_actividad } }),
            usuario.findUnique({ where: { matricula: createDto.id_alumno } }),
            actividadContestada.findFirst({
                where: {
                    id_alumno: createDto.id_alumno,
                    id_actividad: createDto.id_actividad,
                }
            })
        ]);

        if (!existActividad) throw RequestError.badRequest(
            `La actividad ${createDto.id_actividad} no existe`
        );
        if (!existUsuario) throw RequestError.badRequest(
            `La matricula ${createDto.id_alumno} no existe`
        );
        if (isActividadAnswered) throw RequestError.badRequest(
            `Esta actividad ya fue contestada`
        );

        const result = await actividadContestada.create({ data: createDto });
        return result;
    }

}