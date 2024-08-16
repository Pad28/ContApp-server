"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePublicacionDto = void 0;
const config_1 = require("../../../config");
const BaseDto_1 = require("../share/BaseDto");
class UpdatePublicacionDto extends BaseDto_1.BaseDto {
    constructor(id, titulo, contenido, id_grupo) {
        super();
        this.id = id;
        this.titulo = titulo;
        this.contenido = contenido;
        this.id_grupo = id_grupo;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("id");
            validators.isUIID("id");
            validators.ifExistCapitalizar("titulo");
            validators.ifExistIsString("contenido");
            validators.ifExistUpperCase("id_grupo");
            const { id, titulo, contenido, id_grupo, id_profesor, } = validators.data;
            return [undefined, new UpdatePublicacionDto(id, titulo, contenido, id_grupo)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.UpdatePublicacionDto = UpdatePublicacionDto;
