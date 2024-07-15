"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckEmailAlumnoDto = void 0;
const config_1 = require("../../../config");
class CheckEmailAlumnoDto {
    constructor(matricula) {
        this.matricula = matricula;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("matricula");
            validators.checkPattern("matricula", /^\d{7}$/);
            return [undefined, new CheckEmailAlumnoDto(validators.data["matricula"])];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CheckEmailAlumnoDto = CheckEmailAlumnoDto;
