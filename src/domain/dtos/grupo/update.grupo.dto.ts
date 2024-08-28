import { Validators } from "../../../config";
import { BaseDto } from "../share/BaseDto";
import { DynamicObject } from "../share/DynamicObject";


export class UpdateGrupoDto extends BaseDto {
    constructor(
        public readonly id: string,
        public readonly id_maestro?: string,
        public readonly new_id?: string,
    ) { super(); }

    static create(data: DynamicObject): [string?, UpdateGrupoDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("id");
            validators.toUpperCase("id");
            validators.ifExistUpperCase("new_id");

            const { id, id_maestro, new_id } = validators.data;
            return [undefined, new UpdateGrupoDto(
                id, id_maestro, new_id,
            )]
        } catch (error) {
            return [error as string];
        }
    }
}