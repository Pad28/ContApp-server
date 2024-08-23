"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePreguntaDto = void 0;
const config_1 = require("../../../config");
const BaseDto_1 = require("../share/BaseDto");
class CreatePreguntaDto extends BaseDto_1.BaseDto {
    constructor(pregunta, id_actividad) {
        super();
        this.pregunta = pregunta;
        this.id_actividad = id_actividad;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("pregunta", "id_actividad");
            validators.isString("pregunta");
            validators.isUIID("id_actividad");
            const { pregunta, id_actividad } = validators.data;
            return [undefined, new CreatePreguntaDto(pregunta, id_actividad)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CreatePreguntaDto = CreatePreguntaDto;
