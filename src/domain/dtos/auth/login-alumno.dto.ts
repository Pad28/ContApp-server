import { Validators } from "../../../config";
import { DynamicObject } from "../share/DynamicObject";


export class LoginAlumnoDto {
    private constructor(
        public readonly matricula: string,
        public readonly passsword: string,
    ) { }


    static create(data: DynamicObject): [string?, LoginAlumnoDto?] {
        try {
            const validator = new Validators(data);
            validator.requiredKeys('password', 'matricula');
            validator.checkPattern('matricula', /^\d{7}$/);
            validator.isString("password");

            const { matricula, password } = data;
            return [undefined, new LoginAlumnoDto(matricula, password)];

        } catch (error) {
            return [error as string];
        }
    }

}