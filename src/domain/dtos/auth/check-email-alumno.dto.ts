import { Validators } from "../../../config";
import { DynamicObject } from "../share/DynamicObject";


export class CheckEmailAlumnoDto {

    private constructor(
        public readonly matricula: string,
    ) {}

    static create(data: DynamicObject): [string?, CheckEmailAlumnoDto?] {
        try {
            
            const validators = new Validators(data);
            validators.requiredKeys("matricula");
            validators.checkPattern("matricula", /^\d{7}$/);

            return [undefined, new CheckEmailAlumnoDto(validators.data["matricula"])];
        } catch (error) {
            return [error as string];
        }
    }
}