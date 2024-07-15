"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAlumnoDto = void 0;
const config_1 = require("../../../config");
class LoginAlumnoDto {
    constructor(matricula, passsword) {
        this.matricula = matricula;
        this.passsword = passsword;
    }
    static create(data) {
        try {
            const validator = new config_1.Validators(data);
            validator.requiredKeys('matricula', 'password');
            validator.checkPattern('matricula', /^\d{7}$/);
            validator.isString("password");
            const { matricula, password } = data;
            return [undefined, new LoginAlumnoDto(matricula, password)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.LoginAlumnoDto = LoginAlumnoDto;
