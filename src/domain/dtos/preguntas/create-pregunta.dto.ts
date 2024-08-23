import { Validators } from "../../../config";
import { BaseDto } from "../share/BaseDto";
import { DynamicObject } from "../share/DynamicObject";

export class CreatePreguntaDto extends BaseDto {
    private constructor(
        public readonly pregunta: string,
        public readonly id_actividad: string,
    ) { super(); }

    static create(data: DynamicObject): [string?, CreatePreguntaDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("pregunta", "id_actividad");
            validators.isString("pregunta");
            validators.isUIID("id_actividad");

            const { pregunta, id_actividad } = validators.data;
            return [undefined, new CreatePreguntaDto(
                pregunta, id_actividad
            )]
        } catch (error) {
            return [error as string]
        }
    }
}