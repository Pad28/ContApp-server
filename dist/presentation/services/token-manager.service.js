"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenManager = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Este servicio guarda de manera local los tokens generados 
class TokenManager {
    constructor(fileName) {
        this.fileName = fileName;
        this.data = new Array();
        this.repositoryPath = path_1.default.resolve(__dirname + "../../../../data");
        this.loadData();
    }
    get getData() {
        return this.data;
    }
    loadData() {
        const result = fs_1.default.readFileSync(this.repositoryPath + `/${this.fileName}`, { encoding: "utf-8" });
        this.data = JSON.parse(result).map(str => str);
    }
    saveFile() {
        fs_1.default.writeFileSync(this.repositoryPath + `/${this.fileName}`, JSON.stringify(this.data));
    }
    saveToken(token) {
        this.data.push(token);
        this.saveFile();
        setTimeout(() => {
            this.data = this.data.filter(str => str != token);
            this.saveFile();
        }, (3600 * 1000 * 4));
    }
}
exports.TokenManager = TokenManager;
