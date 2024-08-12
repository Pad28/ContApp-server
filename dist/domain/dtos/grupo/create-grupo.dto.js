"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGrupoDto = void 0;
const config_1 = require("../../../config");
class CreateGrupoDto {
    constructor(id, id_maestro) {
        this.id = id;
        this.id_maestro = id_maestro;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("id", "id_maestro");
            validators.toUpperCase("id");
            validators.isString("id_maestro");
            return [undefined, new CreateGrupoDto(validators.data["id"], validators.data["id_maestro"])];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CreateGrupoDto = CreateGrupoDto;
