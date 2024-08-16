import { Validators } from "../../../config";
import { DynamicObject } from "./DynamicObject";

export class SearchIdDto {
    private constructor(
        public readonly id: string,
    ) { }

    static create(data: DynamicObject): [string?, SearchIdDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("id");

            return [undefined, new SearchIdDto(validators.data["id"])];
        } catch (error) {
            return [error as string]
        }
    }
}

