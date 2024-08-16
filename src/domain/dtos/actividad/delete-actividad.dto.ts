import { Validators } from "../../../config";
import { DynamicObject } from "../share/DynamicObject";


export class DeleteActividadDto {
    private constructor(
        public readonly id: string,
    ) { }

    static create(data: DynamicObject): [string?, DeleteActividadDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("id");
            validators.isUIID("id");

            return [undefined, new DeleteActividadDto(validators.data.id)];
        } catch (error) {
            return [error as string]
        }

    }

}