import { Validators } from "../../../config";
import { BaseDto } from "../share/BaseDto";
import { DynamicObject } from "../share/DynamicObject";

export class UpdateAlumnoDto extends BaseDto {
    constructor(
        public readonly matricula: string,
        public readonly correo?: string,
        public readonly nombre?: string,
        public readonly apellidos?: string,
        public readonly password?: string,
        public readonly id_grupo?: string,
    ) { super(); }

    static create(data: DynamicObject): [string?, UpdateAlumnoDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("matricula");
            validators.checkPattern("matricula", /^\d{1,7}$/);
            validators.ifExistIsEmail("correo");
            validators.ifExistCapitalizar("nombre");
            validators.ifExistCapitalizar("apellidos");
            validators.ifExistIsString("password");
            validators.ifExistUpperCase("id_grupo");

            const {
                matricula,
                correo,
                nombre,
                apellidos,
                password,
                id_grupo,
            } = validators.data;

            return [undefined, new UpdateAlumnoDto(
                matricula, correo, nombre, apellidos, password, id_grupo,
            )];
        } catch (error) {
            return [error as string];
        }
    }
}