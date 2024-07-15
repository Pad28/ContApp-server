"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverPasswordDto = void 0;
const config_1 = require("../../../config");
class RecoverPasswordDto {
    constructor(token, password) {
        this.token = token;
        this.password = password;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("token", "password");
            validators.isString("token");
            validators.isString("password");
            return [undefined, new RecoverPasswordDto(validators.data["token"], validators.data["password"])];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.RecoverPasswordDto = RecoverPasswordDto;
