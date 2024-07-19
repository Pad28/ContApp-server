import { Validators } from "../../../config";
import { DynamicObject } from "../share/DynamicObject";


export class LoginProfesorDto {
    private constructor(
        public readonly correo: string,
        public readonly passsword: string,
    ) { }


    static create(data: DynamicObject): [string?, LoginProfesorDto?] {
        try {
            const validator = new Validators(data);
            validator.requiredKeys('password', 'correo');
            validator.isEmail("correo");
            validator.isString("password");

            const { correo, password } = data;
            return [undefined, new LoginProfesorDto(correo, password)];

        } catch (error) {
            return [error as string];
        }
    }

}