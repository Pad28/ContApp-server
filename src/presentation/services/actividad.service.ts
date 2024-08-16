import { prisma } from "../../data"
import { RequestError } from "../../domain";
import { CreateActividadDto, DeleteActividadDto, SearchIdDto, UpdateActividadDto } from "../../domain/dtos";


export class ActividadService {
    public async getAvtividades() {
        const { actividad } = prisma;
        return { results: await actividad.findMany() };
    }

    public async createActividad(createDto: CreateActividadDto) {
        const { actividad } = prisma;

        // Obtener la fecha y hora local
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes de 0 a 11
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;

        return await actividad.create({
            data: {
                nombre: createDto.nombre,
                fecha_creacion: formattedDate,
                fecha_limite: createDto.fecha_limite,
                fecha_activacion: createDto.fecha_activacion,
            }
        });
    }

    public async updateActividad(updateDto: UpdateActividadDto) {
        const { actividad } = prisma;
        const { id, ...data } = updateDto.values;

        const existActivity = await actividad.findUnique({ where: { id } });
        if (!existActivity) throw RequestError.badRequest("Actividad no encontrada");

        return await actividad.update({
            where: { id },
            data
        });
    }

    public async deleteActividad(deleteDto: DeleteActividadDto) {
        const { actividad } = prisma;

        const existActivity = await actividad.findUnique({ where: { id: deleteDto.id } });
        if (!existActivity) throw RequestError.badRequest("Actividad no encontrada");

        await actividad.delete({ where: { id: deleteDto.id } });
        return { message: "Actividad eliminada" };
    }
}