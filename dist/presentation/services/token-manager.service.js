"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenManager = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class TokenManager {
    constructor() {
        this.data = new Map();
        this.repositoryPath = path_1.default.resolve(__dirname + "../../../data/local_storage");
    }
    get getData() {
        return this.data;
    }
    saveFile() {
        const data = {};
        this.data.forEach(e => data[e] = e);
        fs_1.default.writeFileSync(this.repositoryPath + "/data.json", JSON.stringify(data));
    }
    saveToken(token) {
        if (!fs_1.default.existsSync(this.repositoryPath))
            fs_1.default.mkdirSync(this.repositoryPath);
        this.data.set(token, token);
        this.saveFile();
        setTimeout(() => {
            this.data.delete(token);
            this.saveFile();
        }, (3600 * 1000));
    }
}
exports.TokenManager = TokenManager;
