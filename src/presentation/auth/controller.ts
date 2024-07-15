import { Request, Response } from "express";
import { AuhtService } from "../services";
import { AppController } from "../share";
import { CheckEmailAlumnoDto, ForgotPasswordDto, LoginAlumnoDto, RecoverPasswordDto, RegisterStudentDto, RenewTokenDto } from "../../domain/dtos";

export class AuthController extends AppController {
    constructor(
        private readonly authService: AuhtService
    ) { super(); }

    // Enviar correo de verificación para crear cuenta como alumno 
    public sendVerifyEmailAlumno = (req: Request, res: Response) => {
        const { matricula } = req.params;
        const [ error, verifyDto ] = CheckEmailAlumnoDto.create({ matricula });
        if(error || !verifyDto) return res.status(400).json({ error });
    
        this.authService.sendCheckEmailAlumno(verifyDto)
            .then(response => res.json(response))
            .catch(error => this.triggerError(error, res));
    }

    // Crear cuenta como alumno una vez se recibio el correo de verificación
    public createStudentByVerifyEmail = (req: Request, res: Response) => {
        const { token } = req.params;
        const [error, registeredDto] = RegisterStudentDto.create({ token, ...req.body });
        if(error || !registeredDto) return res.status(400).json({ error });

        this.authService.createStudentByVerifyEmail(registeredDto)
            .then(user => res.json(user))
            .catch(error => this.triggerError(error, res));
    }
        
    // Iniciar sesión como alumno
    public loginAlumno = (req: Request, res: Response) => {
        const [ error, loginDto ] = LoginAlumnoDto.create(req.body);
        if(error || !loginDto) return res.status(400).json({ error });
    
        this.authService.loginAlumno(loginDto)
            .then(user => res.json(user))
            .catch(error => this.triggerError(error, res));
    }    

    // Enviar correo de recuperación de contraseña
    public forgotPassword = (req: Request, res: Response) => {
        const [ error, forgotPasswordDto ] = ForgotPasswordDto.create(req.body);
        if(error || !forgotPasswordDto) return res.status(400).json({ error });
        
        this.authService.forgotPassword(forgotPasswordDto)
            .then(msg => res.json(msg))
            .catch(error => this.triggerError(error, res));
    }

    // Cambiar contraseña por medio de jwt de autenticación
    public recoveryPassword = (req: Request, res: Response) => {
        const { token } = req.params;
        const [error, recoverPasswordDto] = RecoverPasswordDto.create({ token, ...req.body});
        if(error || !recoverPasswordDto) return res.status(400).json({ error });
        
        this.authService.recoveryPassword(recoverPasswordDto)
            .then(msg => res.json(msg))
            .catch(error => this.triggerError(error, res));
    }

    public renewJWT = (req: Request, res: Response) => {
        const { user } = req.body;
        const [ error, renewTokenDto ] = RenewTokenDto.create(user);
        if(error || !renewTokenDto) return res.status(400).json({ error });

        this.authService.renewToken(renewTokenDto)
            .then(user => res.json(user))
            .catch(error => this.triggerError(error, res));
    }
}
