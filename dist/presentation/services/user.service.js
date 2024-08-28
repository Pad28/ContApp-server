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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const config_1 = require("../../config");
const data_1 = require("../../data");
const domain_1 = require("../../domain");
class UserService {
    constructor() { }
    getTeacherNames() {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario } = data_1.prisma;
            const results = yield usuario.findMany({
                where: { rol: "PROFESOR" },
                select: {
                    nombre: true,
                    apellidos: true,
                    id_grupo: true,
                    matricula: true,
                }
            });
            return { results };
        });
    }
    createProfesor(createProfesorDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario } = data_1.prisma;
            const [matriculaExists, correoExists] = yield Promise.all([
                usuario.findUnique({ where: { matricula: createProfesorDto.matricula } }),
                usuario.findUnique({ where: { correo: createProfesorDto.correo } }),
            ]);
            if (matriculaExists)
                throw domain_1.RequestError.badRequest("La matricula ya fue registrada");
            if (correoExists)
                throw domain_1.RequestError.badRequest("El correo ya fue registrado");
            const password = config_1.bcryptjsAdapter.hash(createProfesorDto.password);
            const _a = yield usuario.create({
                data: Object.assign(Object.assign({}, createProfesorDto), { rol: createProfesorDto.rol, password })
            }), { password: registeredPassword, id_grupo } = _a, newUser = __rest(_a, ["password", "id_grupo"]);
            return newUser;
        });
    }
    createAlumno(createAlumnoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, grupo } = data_1.prisma;
            const [matriculaExists, correoExists, grupoExist] = yield Promise.all([
                usuario.findUnique({ where: { matricula: createAlumnoDto.matricula } }),
                usuario.findUnique({ where: { correo: createAlumnoDto.correo } }),
                grupo.findUnique({ where: { id: createAlumnoDto.id_grupo } }),
            ]);
            if (matriculaExists)
                throw domain_1.RequestError.badRequest("La matricula ya fue registrada");
            if (correoExists)
                throw domain_1.RequestError.badRequest("El correo ya fue registrado");
            if (!grupoExist)
                throw domain_1.RequestError.badRequest("El grupo no es valido");
            const password = config_1.bcryptjsAdapter.hash(createAlumnoDto.password);
            const _a = yield usuario.create({
                data: Object.assign(Object.assign({}, createAlumnoDto), { rol: createAlumnoDto.rol, password })
            }), { password: registeredPassword } = _a, newUser = __rest(_a, ["password"]);
            return newUser;
        });
    }
    updateAlumno(updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, grupo } = data_1.prisma;
            const _a = updateUserDto.values, { matricula } = _a, data = __rest(_a, ["matricula"]);
            const existUser = yield usuario.findUnique({ where: { matricula } });
            if (!existUser)
                throw domain_1.RequestError.badRequest("Matricula no valida");
            if (updateUserDto.id_grupo) {
                const existGrupo = yield grupo.findUnique({ where: { id: updateUserDto.id_grupo } });
                if (!existGrupo)
                    domain_1.RequestError.badRequest("Grupo no valido");
            }
            if (updateUserDto.password)
                data.password = config_1.bcryptjsAdapter.hash(updateUserDto.password);
            const _b = yield usuario.update({
                where: { matricula },
                data
            }), { password } = _b, rest = __rest(_b, ["password"]);
            return rest;
        });
    }
    updateProfesor(updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, grupo } = data_1.prisma;
            const _a = updateUserDto.values, { matricula } = _a, data = __rest(_a, ["matricula"]);
            const existUser = yield usuario.findUnique({ where: { matricula } });
            if (!existUser)
                throw domain_1.RequestError.badRequest("Matricula no valida");
            if (updateUserDto.correo) {
                const existEmail = yield usuario.findUnique({ where: { correo: updateUserDto.correo } });
                if (existEmail)
                    domain_1.RequestError.badRequest("Correo no valido");
            }
            if (updateUserDto.password)
                data.password = config_1.bcryptjsAdapter.hash(updateUserDto.password);
            const _b = yield usuario.update({
                where: { matricula },
                data
            }), { password } = _b, rest = __rest(_b, ["password"]);
            return rest;
        });
    }
}
exports.UserService = UserService;
