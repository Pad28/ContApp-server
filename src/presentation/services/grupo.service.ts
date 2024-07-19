import { prisma, UserRoles } from "../../data";
import { RequestError } from "../../domain";
import { CreateGrupoDto } from "../../domain/dtos";


export class GrupoService {
    constructor() { }

    public async createGrupo(createDto: CreateGrupoDto) {
        const { grupo, usuario } = prisma;

        const [existMaestro, existGrupo] = await Promise.all([
            await usuario.findUnique({ where: { matricula: createDto.id_maestro, rol: UserRoles.PROFESOR } }),
            await grupo.findUnique({ where: { id: createDto.id } }),
        ]);
        if (!existMaestro) throw RequestError.badRequest("Profesor no valido");
        if (existGrupo) throw RequestError.badRequest("Grupo ya registrado");

        return await grupo.create({ data: createDto });
    }

    public async getGrupos() {
        const { grupo } = prisma;
        return { results: await grupo.findMany() }
    }
}