"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProfesorDto = void 0;
const config_1 = require("../../../config");
const data_1 = require("../../../data");
class CreateProfesorDto {
    constructor(matricula, correo, nombre, apellidos, password, rol) {
        this.matricula = matricula;
        this.correo = correo;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.password = password;
        this.rol = rol;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("matricula", "correo", "nombre", "apellidos", "password");
            validators.checkPattern("matricula", /^\d{1,7}$/);
            validators.isEmail("correo");
            validators.checkPattern("correo", /^[a-zA-Z0-9._%+-]+@upt\.edu\.mx$/);
            validators.capitalizar("nombre");
            validators.capitalizar("apellidos");
            const { matricula, correo, nombre, apellidos, password } = validators.data;
            return [undefined, new CreateProfesorDto(matricula, correo, nombre, apellidos, password, data_1.UserRoles.PROFESOR)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CreateProfesorDto = CreateProfesorDto;
