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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDB = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const config_1 = require("../../config");
exports.prisma = new client_1.PrismaClient();
const connectionDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        exports.prisma.$connect();
        console.log("Base de datos online");
        const { USER_ADMIN, PASSWORD_ADMIN } = config_1.envs;
        const existAdmin = yield exports.prisma.usuario.findUnique({ where: { correo: USER_ADMIN } });
        if (!existAdmin) {
            yield exports.prisma.usuario.create({
                data: {
                    correo: USER_ADMIN,
                    password: config_1.bcryptjsAdapter.hash(PASSWORD_ADMIN),
                    apellidos: " ",
                    matricula: "000",
                    rol: "ADMIN",
                    nombre: "ContApp"
                }
            });
        }
    }
    catch (error) {
        throw error;
    }
});
exports.connectionDB = connectionDB;
