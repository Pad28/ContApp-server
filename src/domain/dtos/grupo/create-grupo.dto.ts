import { Validators } from "../../../config"
import { DynamicObject } from "../share/DynamicObject"


export class CreateGrupoDto {

    private constructor(
        public readonly id: string,
        public readonly id_maestro: string,
    ) { }

    static create(data: DynamicObject): [string?, CreateGrupoDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("id", "id_maestro");
            validators.toUpperCase("id");
            validators.isString("id_maestro")

            return [undefined, new CreateGrupoDto(
                validators.data["id"],
                validators.data["id_maestro"],
            )]
        } catch (error) {
            return [error as string]
        }
    }
}