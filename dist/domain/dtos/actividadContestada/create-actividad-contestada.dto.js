"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateActividadContestadaDto = void 0;
const config_1 = require("../../../config");
const BaseDto_1 = require("../share/BaseDto");
class CreateActividadContestadaDto extends BaseDto_1.BaseDto {
    constructor(fecha, id_alumno, id_actividad) {
        super();
        this.fecha = fecha;
        this.id_alumno = id_alumno;
        this.id_actividad = id_actividad;
    }
    ;
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("id_alumno", "id_actividad");
            validators.checkPattern("id_alumno", /^[0-9]+$/);
            validators.isUIID("id_actividad");
            const date = this.getCurrentDateTime;
            const { id_alumno, id_actividad } = validators.data;
            return [undefined, new CreateActividadContestadaDto(date, id_alumno, id_actividad)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CreateActividadContestadaDto = CreateActividadContestadaDto;
