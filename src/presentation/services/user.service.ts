import { User_roles } from "@prisma/client";
import { bcryptjsAdapter } from "../../config";
import { prisma } from "../../data";
import { RequestError } from "../../domain";
import { CreateAlumnoDto, CreateProfesorDto, SearchIdDto, UpdateAlumnoDto, UpdateProfesorDto } from "../../domain/dtos";


export class UserService {
    constructor() { }

    public async getTeacherNames() {
        const { usuario } = prisma;

        const results = await usuario.findMany({
            where: { rol: "PROFESOR" },
            select: {
                nombre: true,
                apellidos: true,
                id_grupo: true,
                matricula: true,
            }
        });
        return { results };
    }

    public async getStudentsByGroup(serachDto: SearchIdDto) {
        const { usuario } = prisma;
        const results = await usuario.findMany({
            where: { id_grupo: serachDto.id },
            select: {
                nombre: true,
                apellidos: true,
                id_grupo: true,
                matricula: true,
                correo: true,
            }
        });
        return { results };
    }

    public async getStudentsByTutor(serachDto: SearchIdDto) {
        const { usuario, grupo } = prisma;


        const results = await usuario.findMany({
            where: { fk_grupo: { id_maestro: serachDto.id } },
            select: {
                nombre: true,
                apellidos: true,
                id_grupo: true,
                matricula: true,
                correo: true,
            }
        });
        return { results };
    }

    public async createProfesor(createProfesorDto: CreateProfesorDto) {
        const { usuario } = prisma;

        const [matriculaExists, correoExists] = await Promise.all([
            usuario.findUnique({ where: { matricula: createProfesorDto.matricula } }),
            usuario.findUnique({ where: { correo: createProfesorDto.correo } }),
        ]);
        if (matriculaExists) throw RequestError.badRequest("La matricula ya fue registrada");
        if (correoExists) throw RequestError.badRequest("El correo ya fue registrado");

        const password = bcryptjsAdapter.hash(createProfesorDto.password);
        const { password: registeredPassword, id_grupo, ...newUser } = await usuario.create({
            data: {
                ...createProfesorDto,
                rol: createProfesorDto.rol as User_roles,
                password,
            }
        });

        return newUser;
    }

    public async createAlumno(createAlumnoDto: CreateAlumnoDto) {
        const { usuario, grupo } = prisma;

        const [matriculaExists, correoExists, grupoExist] = await Promise.all([
            usuario.findUnique({ where: { matricula: createAlumnoDto.matricula } }),
            usuario.findUnique({ where: { correo: createAlumnoDto.correo } }),
            grupo.findUnique({ where: { id: createAlumnoDto.id_grupo } }),
        ]);

        if (matriculaExists) throw RequestError.badRequest("La matricula ya fue registrada");
        if (correoExists) throw RequestError.badRequest("El correo ya fue registrado");
        if (!grupoExist) throw RequestError.badRequest("El grupo no es valido");

        const password = bcryptjsAdapter.hash(createAlumnoDto.password);
        const { password: registeredPassword, ...newUser } = await usuario.create({
            data: {
                ...createAlumnoDto,
                rol: createAlumnoDto.rol as User_roles,
                password
            }
        })

        return newUser;
    }

    public async updateAlumno(updateUserDto: UpdateAlumnoDto) {
        const { usuario, grupo } = prisma;
        const { matricula, ...data } = updateUserDto.values;

        const existUser = await usuario.findUnique({ where: { matricula } });
        if (!existUser) throw RequestError.badRequest("Matricula no valida");

        if (updateUserDto.id_grupo) {
            const existGrupo = await grupo.findUnique({ where: { id: updateUserDto.id_grupo } });
            if (!existGrupo) RequestError.badRequest("Grupo no valido");
        }

        if (updateUserDto.password) data.password = bcryptjsAdapter.hash(updateUserDto.password);
        const { password, ...rest } = await usuario.update({
            where: { matricula },
            data
        });

        return rest;
    }

    public async updateProfesor(updateUserDto: UpdateProfesorDto) {
        const { usuario, grupo } = prisma;
        const { matricula, ...data } = updateUserDto.values;

        const existUser = await usuario.findUnique({ where: { matricula } });
        if (!existUser) throw RequestError.badRequest("Matricula no valida");

        if (updateUserDto.correo) {
            const existEmail = await usuario.findUnique({ where: { correo: updateUserDto.correo } });
            if (existEmail) RequestError.badRequest("Correo no valido");
        }

        if (updateUserDto.password) data.password = bcryptjsAdapter.hash(updateUserDto.password);
        const { password, ...rest } = await usuario.update({
            where: { matricula },
            data
        });

        return rest;
    }

}