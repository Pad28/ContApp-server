import { Validators } from "../../../config";
import { BaseDto } from "../share/BaseDto";
import { DynamicObject } from "../share/DynamicObject";

export class CreatePublicacionDto extends BaseDto {
    private constructor(
        public readonly titulo: string,
        public readonly contenido: string,
        public readonly fecha_publicacion: string,
        public readonly id_grupo: string,
        public readonly id_profesor: string,
    ) { super(); }

    static create(data: DynamicObject): [string?, CreatePublicacionDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("titulo", "contenido", "id_grupo", "id_profesor");
            validators.capitalizar("titulo");
            validators.isString("contenido");
            validators.isString("id_profesor");
            validators.toUpperCase("id_grupo");

            const { titulo, contenido, id_grupo, id_profesor } = validators.data;
            return [undefined, new CreatePublicacionDto(
                titulo, contenido, this.getCurrentDateTime, id_grupo, id_profesor
            )]
        } catch (error) {
            return [error as string]
        }
    }
}