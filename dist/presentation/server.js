"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
class Server {
    constructor(options) {
        this.options = options;
        this.app = (0, express_1.default)();
        this.routes = this.options.routes;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            // Middlewares
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            this.app.use((0, cors_1.default)());
            this.app.use((0, compression_1.default)());
            // Public folder
            this.app.use(express_1.default.static(this.options.publicPath));
            // Routes
            this.app.use(this.routes);
            this.app.get("/test/:token", (req, res) => {
                const data = {};
                res.json({ msg: "Test OK", data });
            });
            this.app.get("*", (req, res) => {
                res.sendFile(path_1.default.join(__dirname, `../../${this.options.publicPath}`, "index.html"));
            });
            this.app.listen(this.options.port, () => {
                console.log(`Servidor escuchando en puerto ${this.options.port}`);
            });
        });
    }
}
exports.Server = Server;
