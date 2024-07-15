"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAlumnoDto = void 0;
const config_1 = require("../../../config");
const data_1 = require("../../../data");
class CreateAlumnoDto {
    constructor(matricula, correo, nombre, apellidos, password, id_grupo, rol) {
        this.matricula = matricula;
        this.correo = correo;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.password = password;
        this.id_grupo = id_grupo;
        this.rol = rol;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("matricula", "nombre", "apellidos", "password", "id_grupo");
            validators.checkPattern("matricula", /^\d{1,7}$/);
            validators.capitalizar("nombre");
            validators.capitalizar("apellidos");
            const { matricula, nombre, apellidos, password, id_grupo } = validators.data;
            return [undefined, new CreateAlumnoDto(matricula, matricula + "@upt.edu.mx", nombre, apellidos, password, id_grupo, data_1.UserRoles.ALUMNO)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CreateAlumnoDto = CreateAlumnoDto;
