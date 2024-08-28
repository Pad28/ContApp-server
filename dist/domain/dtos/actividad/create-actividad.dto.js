"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateActividadDto = void 0;
const config_1 = require("../../../config");
class CreateActividadDto {
    constructor(nombre, id_grupo, fecha_activacion, fecha_limite) {
        this.nombre = nombre;
        this.id_grupo = id_grupo;
        this.fecha_activacion = fecha_activacion;
        this.fecha_limite = fecha_limite;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("nombre", "id_grupo", "fecha_activacion", "fecha_limite");
            validators.capitalizar("nombre");
            validators.checkPattern("fecha_activacion", /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
            validators.checkPattern("fecha_limite", /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
            validators.toUpperCase("id_grupo");
            const { nombre, fecha_activacion, fecha_limite, id_grupo } = validators.data;
            return [undefined, new CreateActividadDto(nombre, id_grupo, fecha_activacion, fecha_limite)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CreateActividadDto = CreateActividadDto;
