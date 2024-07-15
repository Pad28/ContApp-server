"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterStudentDto = void 0;
const config_1 = require("../../../config");
class RegisterStudentDto {
    constructor(token, nombre, apellidos, password, id_grupo) {
        this.token = token;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.password = password;
        this.id_grupo = id_grupo;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("token", "nombre", "apellidos", "password", "id_grupo");
            validators.isString("token");
            validators.toUpperCase("id_grupo");
            validators.capitalizar("nombre");
            validators.capitalizar("apellidos");
            const { token, nombre, apellidos, password, id_grupo } = validators.data;
            return [undefined, new RegisterStudentDto(token, nombre, apellidos, password, id_grupo)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.RegisterStudentDto = RegisterStudentDto;
