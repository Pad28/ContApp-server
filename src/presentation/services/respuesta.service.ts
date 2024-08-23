import { prisma } from "../../data";
import { RequestError } from "../../domain";
import { CreateRespuestaDto } from "../../domain/dtos";

export class RespuestaService {
    constructor() { }

    public async createRespuesta(createDto: CreateRespuestaDto) {
        const { pregunta, respuesta } = prisma;
        const existQuestion = await pregunta.findUnique({ where: { id: createDto.id_pregunta } });
        if (!existQuestion) throw RequestError.badRequest("Actividad no existente");

        let { esCorrecta, ...data } = createDto;
        return await respuesta.create({
            data: {
                ...data,
                esCorrecta: esCorrecta === "true"
            },
        })
    }

}