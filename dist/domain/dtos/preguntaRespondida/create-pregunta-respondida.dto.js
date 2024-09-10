"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePreguntaRespondidaDtoArray = exports.CreatePreguntaRespondidaDto = void 0;
const config_1 = require("../../../config");
class CreatePreguntaRespondidaDto {
    constructor(id_pregunta, id_respuesta) {
        this.id_pregunta = id_pregunta;
        this.id_respuesta = id_respuesta;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("id_pregunta", "id_respuesta");
            validators.isUIID("id_pregunta");
            validators.isUIID("id_respuesta");
            const { id_pregunta, id_respuesta } = validators.data;
            return [undefined, new CreatePreguntaRespondidaDto(id_pregunta, id_respuesta)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CreatePreguntaRespondidaDto = CreatePreguntaRespondidaDto;
class CreatePreguntaRespondidaDtoArray {
    constructor(data) {
        this.data = data;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("data");
            if (Array.isArray(validators.data.respuestas))
                throw `data.respuesta debe ser un array`;
            const respuestas = validators.data.respuestas.map(e => {
                const [error, createDto] = CreatePreguntaRespondidaDto.create(e);
                if (error || !createDto)
                    throw error;
                return createDto;
            });
            return [
                undefined,
                new CreatePreguntaRespondidaDtoArray({
                    respuestas
                }),
            ];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CreatePreguntaRespondidaDtoArray = CreatePreguntaRespondidaDtoArray;
