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
            }
        });

        if (!existAlumno) throw RequestError.badRequest("Alumno no valido");
        const results = await actividadContestada.findMany({ where: { id_alumno: idDto.id } });
        return { results };

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