"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGrupoDto = void 0;
const config_1 = require("../../../config");
const BaseDto_1 = require("../share/BaseDto");
class UpdateGrupoDto extends BaseDto_1.BaseDto {
    constructor(id, id_maestro, new_id) {
        super();
        this.id = id;
        this.id_maestro = id_maestro;
        this.new_id = new_id;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("id");
            validators.toUpperCase("id");
            validators.ifExistUpperCase("new_id");
            const { id, id_maestro, new_id } = validators.data;
            return [undefined, new UpdateGrupoDto(id, id_maestro, new_id)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.UpdateGrupoDto = UpdateGrupoDto;
