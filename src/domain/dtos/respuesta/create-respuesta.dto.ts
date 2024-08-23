import { Validators } from "../../../config";
import { BaseDto } from "../share/BaseDto";
import { DynamicObject } from "../share/DynamicObject";

export class CreateRespuestaDto extends BaseDto {
    private constructor(
        public readonly respuesta: string,
        public readonly esCorrecta: string,
        public readonly id_pregunta: string,
    ) { super(); }

    static create(data: DynamicObject): [string?, CreateRespuestaDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("respuesta", "id_pregunta", "esCorrecta");
            validators.isString("respuesta");
            validators.isUIID("id_pregunta");
            validators.isString("esCorrecta");
            validators.includes("esCorrecta", ["true", "false"]);

            const { respuesta, id_pregunta, esCorrecta } = validators.data;
            return [undefined, new CreateRespuestaDto(
                respuesta, esCorrecta, id_pregunta
            )]
        } catch (error) {
            return [error as string]
        }
    }
}