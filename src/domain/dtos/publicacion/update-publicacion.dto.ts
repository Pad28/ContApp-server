import { Validators } from "../../../config";
import { BaseDto } from "../share/BaseDto";
import { DynamicObject } from "../share/DynamicObject";


export class UpdatePublicacionDto extends BaseDto {
    private constructor(
        public readonly id: string,
        public readonly titulo?: string,
        public readonly contenido?: string,
        public readonly id_grupo?: string,
    ) { super(); }

    static create(data: DynamicObject): [string?, UpdatePublicacionDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("id");
            validators.isUIID("id");
            validators.ifExistCapitalizar("titulo");
            validators.ifExistIsString("contenido");
            validators.ifExistUpperCase("id_grupo");

            const {
                id,
                titulo,
                contenido,
                id_grupo,
                id_profesor,
            } = validators.data;
            return [undefined, new UpdatePublicacionDto(
                id, titulo, contenido, id_grupo,
            )]
        } catch (error) {
            return [error as string];
        }
    }

}