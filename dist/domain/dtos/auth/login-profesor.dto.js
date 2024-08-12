"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginProfesorDto = void 0;
const config_1 = require("../../../config");
class LoginProfesorDto {
    constructor(correo, passsword) {
        this.correo = correo;
        this.passsword = passsword;
    }
    static create(data) {
        try {
            const validator = new config_1.Validators(data);
            validator.requiredKeys('password', 'correo');
            validator.isEmail("correo");
            validator.isString("password");
            const { correo, password } = data;
            return [undefined, new LoginProfesorDto(correo, password)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.LoginProfesorDto = LoginProfesorDto;
