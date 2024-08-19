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
exports.AuhtService = void 0;
const client_1 = require("@prisma/client");
const data_1 = require("../../data");
const domain_1 = require("../../domain");
const config_1 = require("../../config");
class AuhtService {
    constructor(emailService, tokenManager) {
        this.emailService = emailService;
        this.tokenManager = tokenManager;
    }
    // Enviar correo de verificacion para la creacion de cuenta como alumno
    sendCheckEmailAlumno(checkEmailDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario } = data_1.prisma;
            const userExist = yield usuario.findUnique({ where: { matricula: checkEmailDto.matricula } });
            if (userExist)
                throw domain_1.RequestError.badRequest("Esta matricula ya fue registrada");
            const token = yield config_1.JwtAdapter.generateToken({ id: checkEmailDto.matricula });
            if (!token)
                throw domain_1.RequestError.internalServerError();
            this.emailService.sendEmail({
                addressee: `${checkEmailDto.matricula}@upt.edu.mx`,
                subject: "Registro ContApp",
                html: (0, config_1.checkEmailTemplate)(token),
            });
            return { msg: "Correo de verificación enviado" };
        });
    }
    // Crear cuenta como alumno una vez se recibio el correo de verificación
    createStudentByVerifyEmail(regsiterStudentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, grupo } = data_1.prisma;
            const payload = yield config_1.JwtAdapter.validateToken(regsiterStudentDto.token);
            if (!payload)
                throw domain_1.RequestError.badRequest("Token no valido");
            const [existUser, existGroup] = yield Promise.all([
                usuario.findUnique({ where: { matricula: payload.id } }),
                grupo.findUnique({ where: { id: regsiterStudentDto.id_grupo } }),
            ]);
            if (existUser)
                throw domain_1.RequestError.badRequest("Enlace caducado");
            if (!existGroup)
                throw domain_1.RequestError.badRequest("Grupo no valido");
            const password = config_1.bcryptjsAdapter.hash(regsiterStudentDto.password);
            const { token } = regsiterStudentDto, rest = __rest(regsiterStudentDto, ["token"]);
            const _a = yield usuario.create({
                data: Object.assign(Object.assign({}, rest), { password, correo: `${payload.id}@upt.edu.mx`, matricula: payload.id, rol: client_1.User_roles.ALUMNO })
            }), { password: registeredPAssword } = _a, newUser = __rest(_a, ["password"]);
            return newUser;
        });
    }
    // Iniciar sesión como alumno
    loginAlumno(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario } = data_1.prisma;
            const existAlumno = yield usuario.findUnique({ where: { matricula: loginDto.matricula } });
            if (!existAlumno)
                throw domain_1.RequestError.badRequest("Matricula/Contraseña no valida");
            const isMatch = config_1.bcryptjsAdapter.compare(loginDto.passsword, existAlumno.password);
            if (!isMatch)
                throw domain_1.RequestError.badRequest("Matricula/Contraseña no valida");
            const token = yield config_1.JwtAdapter.generateToken({ id: existAlumno.matricula });
            if (!token)
                throw domain_1.RequestError.internalServerError();
            const { password } = existAlumno, data = __rest(existAlumno, ["password"]);
            return {
                user: data,
                token,
            };
        });
    }
    // Iniciar sesión como profesor
    loginProfesor(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario } = data_1.prisma;
            const existProfesor = yield usuario.findUnique({ where: { correo: loginDto.correo } });
            if (!existProfesor)
                throw domain_1.RequestError.badRequest("Correo/Contraseña no valida");
            const isMatch = config_1.bcryptjsAdapter.compare(loginDto.passsword, existProfesor.password);
            if (!isMatch)
                throw domain_1.RequestError.badRequest("Correo/Contraseña no valida");
            const token = yield config_1.JwtAdapter.generateToken({ id: existProfesor.matricula });
            if (!token)
                throw domain_1.RequestError.internalServerError();
            const { password } = existProfesor, data = __rest(existProfesor, ["password"]);
            return {
                user: data,
                token,
            };
        });
    }
    // Enviar correo de recuperación de contraseña
    forgotPassword(forgotPasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario } = data_1.prisma;
            const existAlumno = yield usuario.findUnique({
                where: { correo: forgotPasswordDto.correo }
            });
            if (!existAlumno)
                throw domain_1.RequestError.badRequest("Usuario no valido");
            const token = yield config_1.JwtAdapter.generateToken({ correo: forgotPasswordDto.correo }, "1h");
            if (!token)
                throw domain_1.RequestError.internalServerError();
            this.emailService.sendEmail({
                addressee: `${forgotPasswordDto.correo}`,
                subject: "Cambio de contraseña de ContApp",
                html: (0, config_1.forgotPasswordEmailTemplate)(token),
            });
            return { msg: "Correo de recuperación enviado a " + `${forgotPasswordDto.correo}` };
        });
    }
    // Cambiar contraseña por medio de jwt de autenticación
    recoveryPassword(recoverPasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario } = data_1.prisma;
            const { password, token } = recoverPasswordDto;
            if (this.tokenManager.getData.has(token))
                throw domain_1.RequestError.badRequest("Enlace caducado");
            const payload = yield config_1.JwtAdapter.validateToken(token);
            if (!payload)
                throw domain_1.RequestError.badRequest("Token no valido");
            const existAlumno = yield usuario.findUnique({ where: { correo: payload.correo } });
            if (!existAlumno)
                throw domain_1.RequestError.badRequest("Enlace caducado");
            const newPassword = config_1.bcryptjsAdapter.hash(password);
            yield usuario.update({
                where: { correo: payload.correo },
                data: { password: newPassword }
            });
            this.tokenManager.saveToken(token);
            return { msg: "Constraseña actualizada" };
        });
    }
    renewToken(renewTokenDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario } = data_1.prisma;
            const existUser = yield usuario.findUnique({ where: { matricula: renewTokenDto.matricula } });
            if (!existUser)
                throw domain_1.RequestError.badRequest("Usuario no valido");
            const token = yield config_1.JwtAdapter.generateToken({ id: renewTokenDto.matricula });
            if (!token)
                throw domain_1.RequestError.internalServerError();
            return {
                user: renewTokenDto,
                token
            };
        });
    }
}
exports.AuhtService = AuhtService;
