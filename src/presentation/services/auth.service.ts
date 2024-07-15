import { User_roles } from "@prisma/client";
import { JwtAdapter, bcryptjsAdapter, checkEmailTemplate, forgotPasswordEmailTemplate } from "../../config";
import { prisma } from "../../data";
import { RequestError } from "../../domain";
import { CheckEmailAlumnoDto, ForgotPasswordDto, LoginAlumnoDto, RecoverPasswordDto, RegisterStudentDto, RenewTokenDto } from "../../domain/dtos";
import { EmailService } from "./emai.service";
import { TokenManager } from "./token-manager.service";


export class AuhtService {

    constructor(
        private readonly emailService: EmailService,
        private readonly tokenManager: TokenManager,
    ) {}

    // Enviar correo de verificacion para la creacion de cuenta como alumno
    public async sendCheckEmailAlumno(checkEmailDto: CheckEmailAlumnoDto) {
        const { usuario } = prisma;
        const userExist = await usuario.findUnique({ where: { matricula:  checkEmailDto.matricula} });
        if(userExist) throw RequestError.badRequest("Esta matricula ya fue registrada");
        
        const token = await JwtAdapter.generateToken({ id: checkEmailDto.matricula });
        if(!token) throw RequestError.internalServerError();

        this.emailService.sendEmail({
            addressee: `${checkEmailDto.matricula}@upt.edu.mx`,
            subject: "Registro ContApp",
            html: checkEmailTemplate(token as string),
        });

        return {msg: "Correo de verificación enviado"}
    }

    // Crear cuenta como alumno una vez se recibio el correo de verificación
    public async createStudentByVerifyEmail(regsiterStudentDto: RegisterStudentDto) {
        const { usuario, grupo } = prisma;
        const payload = await JwtAdapter.validateToken<{ id: string }>(regsiterStudentDto.token);
        if(!payload) throw RequestError.badRequest("Token no valido");

        const [existUser, existGroup] = await Promise.all([
            usuario.findUnique({ where: { matricula: payload.id } }),
            grupo.findUnique({ where: { id: regsiterStudentDto.id_grupo } }),
        ]);

        if(existUser) throw RequestError.badRequest("Enlace caducado");
        if(!existGroup) throw RequestError.badRequest("Grupo no valido");

        const password = bcryptjsAdapter.hash(regsiterStudentDto.password);
        const { token, ...rest } = regsiterStudentDto;
        const { password: registeredPAssword, ...newUser } = await usuario.create({data: {
            ...rest,
            password,
            correo: `${payload.id}@upt.edu.mx`,
            matricula: payload.id,
            rol: User_roles.ALUMNO,
        }});

        return newUser;
    }
    
    // Iniciar sesión como alumno
    public async loginAlumno(loginDto: LoginAlumnoDto) {
        const { usuario } = prisma;

        const existAlumno = await usuario.findUnique({ where: { matricula: loginDto.matricula} }); 
        if(!existAlumno) throw RequestError.badRequest("Matricula/Contraseña no valida");

        const isMatch = bcryptjsAdapter.compare(loginDto.passsword, existAlumno.password);
        if(!isMatch) throw RequestError.badRequest("Matricula/Contraseña no valida");
        
        const token = await JwtAdapter.generateToken({ id: existAlumno.matricula });
        if(!token) throw RequestError.internalServerError();

        const { password, ...data } = existAlumno
        return {
            alumno: data,
            token,
        }
    }

    // Enviar correo de recuperación de contraseña
    public async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
        const { usuario } = prisma;
        
        
        const existAlumno = await usuario.findUnique({ 
            where: { correo: forgotPasswordDto.correo } 
        });
        if(!existAlumno) throw RequestError.badRequest("Usuario no valido");

        const token = await JwtAdapter.generateToken({ correo: forgotPasswordDto.correo}, "1h");
        if(!token) throw RequestError.internalServerError();

        this.emailService.sendEmail({
            addressee: `${forgotPasswordDto.correo}`,
            subject: "Cambio de contraseña de ContApp",
            html: forgotPasswordEmailTemplate(token as string),
        });

        return { msg: "Correo de recuperación enviado a " +  `${forgotPasswordDto.correo}`};
    }

    // Cambiar contraseña por medio de jwt de autenticación
    public async recoveryPassword(recoverPasswordDto: RecoverPasswordDto) {
        const { usuario } = prisma;
        const { password, token } = recoverPasswordDto;
        
        if(this.tokenManager.getData.has(token)) throw RequestError.badRequest("Enlace caducado");

        const payload = await JwtAdapter.validateToken<{ correo: string }>(token);
        if(!payload) throw RequestError.badRequest("Token no valido");

        const existAlumno = await usuario.findUnique({ where: { correo: payload.correo } });
        if(!existAlumno) throw RequestError.badRequest("Enlace caducado");
        
        const newPassword = bcryptjsAdapter.hash(password);
        await usuario.update({
            where: { correo: payload.correo },
            data: { password: newPassword }
        });
        
        this.tokenManager.saveToken(token);
        return { msg: "Constraseña actualizada" };
    }
    
    public async renewToken(renewTokenDto: RenewTokenDto) {
        const { usuario } = prisma;
        const existUser = await usuario.findUnique({ where: { matricula: renewTokenDto.matricula } });
        if(!existUser) throw RequestError.badRequest("Usuario no valido");

        const token = await JwtAdapter.generateToken({ id: renewTokenDto.matricula });
        if(!token) throw RequestError.internalServerError();

        return {
            alumno: renewTokenDto,
            token
        }
    }

}