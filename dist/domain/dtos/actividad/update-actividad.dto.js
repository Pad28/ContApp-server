"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateActividadDto = void 0;
const config_1 = require("../../../config");
const BaseDto_1 = require("../share/BaseDto");
class UpdateActividadDto extends BaseDto_1.BaseDto {
    constructor(id, nombre, fecha_activacion, fecha_limite) {
        super();
        this.id = id;
        this.nombre = nombre;
        this.fecha_activacion = fecha_activacion;
        this.fecha_limite = fecha_limite;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("id");
            validators.isUIID("id");
            validators.ifExistCapitalizar("nombre");
            validators.ifExistsCheckPattern("fecha_activacion", /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
            validators.ifExistsCheckPattern("fecha_limite", /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
            const { id, nombre, fecha_activacion, fecha_limite, } = validators.data;
            return [undefined, new UpdateActividadDto(id, nombre, fecha_activacion, fecha_limite)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.UpdateActividadDto = UpdateActividadDto;
