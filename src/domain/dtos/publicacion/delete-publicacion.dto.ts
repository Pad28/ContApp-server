import { Validators } from "../../../config";
import { DynamicObject } from "../share/DynamicObject";


export class DeletePublicacionDto {
    private constructor(
        public readonly id: string,
    ) { }

    static create(data: DynamicObject): [string?, DeletePublicacionDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("id");
            validators.isUIID("id");

            return [undefined, new DeletePublicacionDto(validators.data.id)];
        } catch (error) {
            return [error as string]
        }

    }

}