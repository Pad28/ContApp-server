import { Validators } from "../../../config";
import { DynamicObject } from "../share/DynamicObject";


export class RecoverPasswordDto {

    private constructor(
        public token: string,
        public password: string,
    ) {}

    static create( data: DynamicObject ): [string?, RecoverPasswordDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("token", "password");
            validators.isString("token");
            validators.isString("password");

            return [undefined, new RecoverPasswordDto(
                validators.data["token"],
                validators.data["password"],
            )];
        } catch (error) {
            return [ error as string ]
        }
    }

}