import { Validators } from "../../../config";
import { DynamicObject } from "../share/DynamicObject";

export class RegisterStudentDto {
    private constructor(
        public readonly token: string,
        public readonly nombre: string,
        public readonly apellidos: string,
        public readonly password: string,
        public readonly id_grupo: string, 
    ) {}

    static create(data: DynamicObject): [string?, RegisterStudentDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys(
                "token",
                "nombre",
                "apellidos",
                "password",
                "id_grupo",
            );

            validators.isString("token")
            validators.toUpperCase("id_grupo")
            validators.capitalizar("nombre");
            validators.capitalizar("apellidos");
            
            const { token, nombre, apellidos, password, id_grupo } = validators.data; 
            return [undefined, new RegisterStudentDto(
                token,
                nombre, 
                apellidos, 
                password, 
                id_grupo,
            )];
        } catch (error) {
            return [error as string];
        }
    }
}