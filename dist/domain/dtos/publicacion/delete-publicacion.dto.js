"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePublicacionDto = void 0;
const config_1 = require("../../../config");
class DeletePublicacionDto {
    constructor(id) {
        this.id = id;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("id");
            validators.isUIID("id");
            return [undefined, new DeletePublicacionDto(validators.data.id)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.DeletePublicacionDto = DeletePublicacionDto;
