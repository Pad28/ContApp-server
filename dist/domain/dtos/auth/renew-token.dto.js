"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenewTokenDto = void 0;
const config_1 = require("../../../config");
class RenewTokenDto {
    constructor(matricula, nombre, apellidos, correo, rol, id_grupo) {
        this.matricula = matricula;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.rol = rol;
        this.id_grupo = id_grupo;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("matricula", "nombre", "apellidos", "correo", "rol", "id_grupo");
            validators.checkPattern('matricula', /^\d{7}$/);
            validators.capitalizar("nombre");
            validators.capitalizar("apellidos");
            validators.isEmail("correo");
            validators.toUpperCase("rol");
            validators.toUpperCase("id_grupo");
            const { matricula, nombre, apellidos, correo, rol, id_grupo } = validators.data;
            return [undefined, new RenewTokenDto(matricula, nombre, apellidos, correo, rol, id_grupo)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.RenewTokenDto = RenewTokenDto;
