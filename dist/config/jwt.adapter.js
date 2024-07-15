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
exports.JwtAdapter = void 0;
const envs_1 = require("./envs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SEED = envs_1.envs.JWT_SEED;
class JwtAdapter {
    static generateToken(payload_1) {
        return __awaiter(this, arguments, void 0, function* (payload, duration = "4h") {
            return new Promise((resolve) => {
                jsonwebtoken_1.default.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
                    if (err)
                        return resolve(null);
                    resolve(token);
                });
            });
        });
    }
    static validateToken(token) {
        return new Promise((resolve) => {
            jsonwebtoken_1.default.verify(token, JWT_SEED, (err, decoded) => {
                if (err)
                    return resolve(null);
                resolve(decoded);
            });
        });
    }
}
exports.JwtAdapter = JwtAdapter;
