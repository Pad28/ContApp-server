import { Validators } from "../../../config";
import { DynamicObject } from "../share/DynamicObject";

export class RenewTokenDto {
    private constructor(
        public readonly matricula: string,
        public readonly nombre: string,
        public readonly apellidos: string,
        public readonly correo: string,
        public readonly rol: string,
        public readonly id_grupo: string,
    ) {}

    static create(data: DynamicObject): [string?, RenewTokenDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys(
                "matricula",
                "nombre",
                "apellidos",
                "correo",
                "rol",
                "id_grupo"
            );
            validators.checkPattern('matricula', /^\d{7}$/);
            validators.capitalizar("nombre");
            validators.capitalizar("apellidos");
            validators.isEmail("correo");
            validators.toUpperCase("rol");
            validators.toUpperCase("id_grupo");

            const { matricula, nombre, apellidos, correo, rol, id_grupo } = validators.data;
            return [undefined, new RenewTokenDto(
                matricula,
                nombre,
                apellidos,
                correo,
                rol,
                id_grupo,
            )];
        } catch (error) {
            return [error as string]
        }
    }
}