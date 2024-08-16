"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDto = void 0;
class BaseDto {
    constructor() { }
    static get getCurrentDateTime() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes de 0 a 11
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
    }
    get values() {
        const obj = {};
        for (const k in this) {
            if (this[k])
                obj[k] = this[k];
        }
        return obj;
    }
}
exports.BaseDto = BaseDto;
