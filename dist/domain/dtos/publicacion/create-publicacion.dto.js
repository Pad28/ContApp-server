"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePublicacionDto = void 0;
const config_1 = require("../../../config");
const BaseDto_1 = require("../share/BaseDto");
class CreatePublicacionDto extends BaseDto_1.BaseDto {
    constructor(titulo, contenido, fecha_publicacion, id_grupo, id_profesor) {
        super();
        this.titulo = titulo;
        this.contenido = contenido;
        this.fecha_publicacion = fecha_publicacion;
        this.id_grupo = id_grupo;
        this.id_profesor = id_profesor;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("titulo", "contenido", "id_grupo", "id_profesor");
            validators.capitalizar("titulo");
            validators.isString("contenido");
            validators.isString("id_profesor");
            validators.toUpperCase("id_grupo");
            const { titulo, contenido, id_grupo, id_profesor } = validators.data;
            return [undefined, new CreatePublicacionDto(titulo, contenido, this.getCurrentDateTime, id_grupo, id_profesor)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CreatePublicacionDto = CreatePublicacionDto;
