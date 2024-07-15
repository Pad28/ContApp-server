"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordDto = void 0;
const config_1 = require("../../../config");
class ForgotPasswordDto {
    constructor(correo) {
        this.correo = correo;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("correo");
            validators.isEmail("correo");
            return [undefined, new ForgotPasswordDto(validators.data["correo"])];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.ForgotPasswordDto = ForgotPasswordDto;
