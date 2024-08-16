import { Validators } from "../../../config";
import { UserRoles } from "../../../data";
import { BaseDto } from "../share/BaseDto";
import { DynamicObject } from "../share/DynamicObject";

export class UpdateProfesorDto extends BaseDto {
    constructor(
        public readonly matricula: string,
        public readonly rol?: string,
        public readonly correo?: string,
        public readonly nombre?: string,
        public readonly apellidos?: string,
        public readonly password?: string,
    ) { super(); }

    static create(data: DynamicObject): [string?, UpdateProfesorDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("matricula");
            validators.checkPattern("matricula", /^\d{1,7}$/);
            validators.ifExistIsEmail("correo");
            validators.ifExistCapitalizar("nombre");
            validators.ifExistCapitalizar("apellidos");
            validators.ifExistIsString("password");
            validators.ifExistUpperCase("rol");
            validators.ifExistIncludes("rol", [UserRoles.PROFESOR, UserRoles.ADMIN]);

            const {
                matricula,
                rol,
                correo,
                nombre,
                apellidos,
                password,
            } = validators.data;

            return [undefined, new UpdateProfesorDto(
                matricula, rol, correo, nombre, apellidos, password,
            )];
        } catch (error) {
            return [error as string];
        }
    }
}