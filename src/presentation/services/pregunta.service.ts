import { prisma } from "../../data";
import { RequestError } from "../../domain";
import { CreatePreguntaDto, SearchIdDto } from "../../domain/dtos";


export class PreguntaService {
    constructor() { }

    public async createPregunta(createDto: CreatePreguntaDto) {
        const { pregunta, actividad } = prisma;

        const existActivity = await actividad.findUnique({ where: { id: createDto.id_actividad } });
        if (!existActivity) throw RequestError.badRequest("Actividad no existente");

        return await pregunta.create({
            data: createDto,
        })
    }

    public async listarPreguntaPorIdActividad(searchDto: SearchIdDto) {
        const { pregunta, actividad } = prisma;
        const existActivity = await actividad.findUnique({ where: { id: searchDto.id } });
        if (!existActivity) throw RequestError.badRequest("Actividad no existente");
        return {
            results: await pregunta.findMany({
                where: { id_actividad: existActivity.id },
                include: {
                    fk_respuesta: true
                }
            })
        }
    }
}
