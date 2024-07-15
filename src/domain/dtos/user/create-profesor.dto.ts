import { Validators } from "../../../config";
import { UserRoles } from "../../../data";
import { DynamicObject } from "../share/DynamicObject";

export class CreateProfesorDto {

    private constructor(
        public readonly matricula: string,
        public readonly correo: string,
        public readonly nombre: string,
        public readonly apellidos: string,
        public readonly password: string,
        public readonly rol: string,
    ) {}

    static create(data: DynamicObject): [string?, CreateProfesorDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys(
                "matricula",
                "correo",
                "nombre",
                "apellidos",
                "password",
            );

            validators.checkPattern("matricula", /^\d{1,7}$/);
            validators.isEmail("correo");
            validators.checkPattern("correo", /^[a-zA-Z0-9._%+-]+@upt\.edu\.mx$/);
            validators.capitalizar("nombre");
            validators.capitalizar("apellidos");
            
            const { matricula, correo, nombre, apellidos, password } = validators.data; 
            return [undefined, new CreateProfesorDto(
                matricula, 
                correo,
                nombre, 
                apellidos, 
                password, 
                UserRoles.PROFESOR
            )];
        } catch (error) {
            return [error as string];
        }
    }
}