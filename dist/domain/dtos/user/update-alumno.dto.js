"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAlumnoDto = void 0;
const config_1 = require("../../../config");
const BaseDto_1 = require("../share/BaseDto");
class UpdateAlumnoDto extends BaseDto_1.BaseDto {
    constructor(matricula, correo, nombre, apellidos, password, id_grupo) {
        super();
        this.matricula = matricula;
        this.correo = correo;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.password = password;
        this.id_grupo = id_grupo;
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
            validators.ifExistUpperCase("id_grupo");
            const { matricula, correo, nombre, apellidos, password, id_grupo, } = validators.data;
            return [undefined, new UpdateAlumnoDto(matricula, correo, nombre, apellidos, password, id_grupo)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.UpdateAlumnoDto = UpdateAlumnoDto;
