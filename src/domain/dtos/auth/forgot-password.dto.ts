import { Validators } from "../../../config";
import { DynamicObject } from "../share/DynamicObject";


export class ForgotPasswordDto {

    private constructor(
        public readonly correo: string,
    ) {}

    static create(data: DynamicObject): [string?, ForgotPasswordDto?] {
        try {
            const validators =new Validators(data);
            validators.requiredKeys("correo");
            validators.isEmail("correo")

            return [undefined, new ForgotPasswordDto(validators.data["correo"])];
        } catch (error) {
            return [error as string];
        }       
    }

}