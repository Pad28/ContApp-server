"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRespuestaDto = void 0;
const config_1 = require("../../../config");
const BaseDto_1 = require("../share/BaseDto");
class CreateRespuestaDto extends BaseDto_1.BaseDto {
    constructor(respuesta, esCorrecta, id_pregunta) {
        super();
        this.respuesta = respuesta;
        this.esCorrecta = esCorrecta;
        this.id_pregunta = id_pregunta;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("respuesta", "id_pregunta", "esCorrecta");
            validators.isString("respuesta");
            validators.isUIID("id_pregunta");
            validators.isString("esCorrecta");
            validators.includes("esCorrecta", ["true", "false"]);
            const { respuesta, id_pregunta, esCorrecta } = validators.data;
            return [undefined, new CreateRespuestaDto(respuesta, esCorrecta, id_pregunta)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CreateRespuestaDto = CreateRespuestaDto;
