import { Validators } from "../../../config";
import { DynamicObject } from "../share/DynamicObject";


export class CreatePreguntaRespondidaDto {

    private constructor(
        public readonly id_pregunta: string,
        public readonly id_respuesta: string,
    ) { }

    static create(data: DynamicObject): [string?, CreatePreguntaRespondidaDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("id_pregunta", "id_respuesta");
            validators.isUIID("id_pregunta");
            validators.isUIID("id_respuesta");

            const { id_pregunta, id_respuesta } = validators.data;
            return [undefined, new CreatePreguntaRespondidaDto(id_pregunta, id_respuesta)];
        } catch (error) {
            return [error as string];
        }
    }
}

export class CreatePreguntaRespondidaDtoArray {
    private constructor(
        public readonly data: { respuestas: CreatePreguntaRespondidaDto[] },
    ) { }

    static create(data: DynamicObject): [string?, CreatePreguntaRespondidaDtoArray?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("data");
            if (Array.isArray(validators.data.respuestas)) throw `data.respuesta debe ser un array`;
            const respuestas = (validators.data.respuestas as any[]).map(e => {
                const [error, createDto] = CreatePreguntaRespondidaDto.create(e)
                if (error || !createDto) throw error;
                return createDto;
            });

            return [
                undefined,
                new CreatePreguntaRespondidaDtoArray({
                    respuestas
                }),
            ];
        } catch (error) {
            return [error as string];
        }
    }
}