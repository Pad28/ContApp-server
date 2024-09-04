import { prisma } from "../../data";
import { RequestError } from "../../domain";
import { CreatePreguntaRespondidaDto, CreatePreguntaRespondidaDtoArray } from "../../domain/dtos";


export class PreguntaRespondidaService {
    constructor() { }

    public async createAnsweredQuestion(createDto: CreatePreguntaRespondidaDtoArray) {
        const { preguntaRespondida, pregunta, respuesta } = prisma;

        for (const dto of createDto.data.respuestas) {
            const [existQuestion, existAnswer] = await Promise.all([
                pregunta.findUnique({ where: { id: dto.id_pregunta } }),
                respuesta.findUnique({ where: { id: dto.id_respuesta } }),
            ]);

            if (!existQuestion) throw RequestError.badRequest(`ID ${dto.id_pregunta} de pregunta no valida`);
            if (!existAnswer) throw RequestError.badRequest(`ID ${dto.id_respuesta} de respuesta no valida`);
            await preguntaRespondida.create({ data: dto });
        }

        return `Respuestas registradas exitosamente`;

    }
}