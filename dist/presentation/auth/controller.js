"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const share_1 = require("../share");
const dtos_1 = require("../../domain/dtos");
class AuthController extends share_1.AppController {
    constructor(authService) {
        super();
        this.authService = authService;
        // Enviar correo de verificación para crear cuenta como alumno 
        this.sendVerifyEmailAlumno = (req, res) => {
            const { matricula } = req.params;
            const [error, verifyDto] = dtos_1.CheckEmailAlumnoDto.create({ matricula });
            if (error || !verifyDto)
                return res.status(400).json({ error });
            this.authService.sendCheckEmailAlumno(verifyDto)
                .then(response => res.json(response))
                .catch(error => this.triggerError(error, res));
        };
        // Crear cuenta como alumno una vez se recibio el correo de verificación
        this.createStudentByVerifyEmail = (req, res) => {
            const { token } = req.params;
            const [error, registeredDto] = dtos_1.RegisterStudentDto.create(Object.assign({ token }, req.body));
            if (error || !registeredDto)
                return res.status(400).json({ error });
            this.authService.createStudentByVerifyEmail(registeredDto)
                .then(user => res.json(user))
                .catch(error => this.triggerError(error, res));
        };
        // Iniciar sesión como alumno
        this.loginAlumno = (req, res) => {
            const [error, loginDto] = dtos_1.LoginAlumnoDto.create(req.body);
            if (error || !loginDto)
                return res.status(400).json({ error });
            this.authService.loginAlumno(loginDto)
                .then(user => res.json(user))
                .catch(error => this.triggerError(error, res));
        };
        // Iniciar sesión como profesor
        this.loginProfesor = (req, res) => {
            const [error, loginDto] = dtos_1.LoginProfesorDto.create(req.body);
            if (error || !loginDto)
                return res.status(400).json({ error });
            this.authService.loginProfesor(loginDto)
                .then(user => res.json(user))
                .catch(error => this.triggerError(error, res));
        };
        // Enviar correo de recuperación de contraseña
        this.forgotPassword = (req, res) => {
            const [error, forgotPasswordDto] = dtos_1.ForgotPasswordDto.create(req.body);
            if (error || !forgotPasswordDto)
                return res.status(400).json({ error });
            this.authService.forgotPassword(forgotPasswordDto)
                .then(msg => res.json(msg))
                .catch(error => this.triggerError(error, res));
        };
        // Cambiar contraseña por medio de jwt de autenticación
        this.recoveryPassword = (req, res) => {
            const { token } = req.params;
            const [error, recoverPasswordDto] = dtos_1.RecoverPasswordDto.create(Object.assign({ token }, req.body));
            if (error || !recoverPasswordDto)
                return res.status(400).json({ error });
            this.authService.recoveryPassword(recoverPasswordDto)
                .then(msg => res.json(msg))
                .catch(error => this.triggerError(error, res));
        };
        this.renewJWT = (req, res) => {
            const { user } = req.body;
            const [error, renewTokenDto] = dtos_1.RenewTokenDto.create(user);
            if (error || !renewTokenDto)
                return res.status(400).json({ error });
            this.authService.renewToken(renewTokenDto)
                .then(user => res.json(user))
                .catch(error => this.triggerError(error, res));
        };
    }
}
exports.AuthController = AuthController;
