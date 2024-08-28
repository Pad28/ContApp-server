import { prisma, UserRoles } from "../../data";
import { RequestError } from "../../domain";
import { CreateGrupoDto, UpdateGrupoDto } from "../../domain/dtos";


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

    public async updateGrupo(updateDto: UpdateGrupoDto) {
        const { grupo, usuario } = prisma;
        const { id, ...data } = updateDto.values;
        const existGrupo = await grupo.findUnique({ where: { id } });
        if (!existGrupo) throw RequestError.badRequest("Grupo no encontrado");

        if (updateDto.id_maestro) {
            const existTeacher = await usuario.findUnique({
                where: { matricula: updateDto.id_maestro, rol: UserRoles.PROFESOR }
            });
            if (!existTeacher) throw RequestError.badRequest("Profesor no enontrado");
        }

        if (updateDto.new_id) {
            const validId = await grupo.findUnique({ where: { id: updateDto.new_id } });
            if (validId) throw RequestError.badRequest("Nombre de grupo no valido");
            data.id = updateDto.new_id;
        }


        const { new_id, ...rest } = data;
        updateDto.new_id ? rest.id = updateDto.new_id : null;
        return await grupo.update({
            where: { id },
            data: { ...rest }
        })
    }
}