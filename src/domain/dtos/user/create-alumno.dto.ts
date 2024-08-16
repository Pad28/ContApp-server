import { Validators } from "../../../config";
import { UserRoles } from "../../../data";
import { DynamicObject } from "../share/DynamicObject";

export class CreateAlumnoDto {

    private constructor(
        public readonly matricula: string,
        public readonly correo: string,
        public readonly nombre: string,
        public readonly apellidos: string,
        public readonly password: string,
        public readonly id_grupo: string,
        public readonly rol: string,
    ) { }

    static create(data: DynamicObject): [string?, CreateAlumnoDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys(
                "matricula",
                "nombre",
                "apellidos",
                "password",
                "id_grupo",
            );

            validators.checkPattern("matricula", /^\d{1,7}$/);
            validators.capitalizar("nombre");
            validators.capitalizar("apellidos");

            const { matricula, nombre, apellidos, password, id_grupo } = validators.data;
            return [undefined, new CreateAlumnoDto(
                matricula,
                matricula + "@upt.edu.mx",
                nombre,
                apellidos,
                password,
                id_grupo,
                UserRoles.ALUMNO,
            )];
        } catch (error) {
            return [error as string];
        }
    }
}