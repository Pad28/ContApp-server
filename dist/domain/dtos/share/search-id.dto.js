"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchIdDto = void 0;
const config_1 = require("../../../config");
class SearchIdDto {
    constructor(id) {
        this.id = id;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("id");
            return [undefined, new SearchIdDto(validators.data["id"])];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.SearchIdDto = SearchIdDto;
