import { prisma } from "../../data"
import { CreateActividadDto } from "../../domain/dtos";


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
}