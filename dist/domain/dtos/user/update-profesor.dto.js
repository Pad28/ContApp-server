"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfesorDto = void 0;
const config_1 = require("../../../config");
const data_1 = require("../../../data");
const BaseDto_1 = require("../share/BaseDto");
class UpdateProfesorDto extends BaseDto_1.BaseDto {
    constructor(matricula, rol, correo, nombre, apellidos, password) {
        super();
        this.matricula = matricula;
        this.rol = rol;
        this.correo = correo;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.password = password;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("matricula");
            validators.checkPattern("matricula", /^\d{1,7}$/);
            validators.ifExistIsEmail("correo");
            validators.ifExistCapitalizar("nombre");
            validators.ifExistCapitalizar("apellidos");
            validators.ifExistIsString("password");
            validators.ifExistUpperCase("rol");
            validators.ifExistIncludes("rol", [data_1.UserRoles.PROFESOR, data_1.UserRoles.ADMIN]);
            const { matricula, rol, correo, nombre, apellidos, password, } = validators.data;
            return [undefined, new UpdateProfesorDto(matricula, rol, correo, nombre, apellidos, password)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.UpdateProfesorDto = UpdateProfesorDto;
