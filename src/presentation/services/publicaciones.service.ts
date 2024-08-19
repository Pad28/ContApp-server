import path from "path";
import { prisma, UserRoles } from "../../data";
import { RequestError } from "../../domain";
import { CreatePublicacionDto, DeletePublicacionDto, SearchIdDto, UpdatePublicacionDto } from "../../domain/dtos";
import { FileManagerService } from "./file-manager.service";
import { pdf2pic } from "../../config";

export class PublicacionesService {
    constructor(
        private readonly fileManager: FileManagerService,
    ) { }

    public async getDocToImage(searchDto: SearchIdDto, pageNumber: number) {
        const { publicacion } = prisma;
        const existPub = await publicacion.findFirst({ where: { id_material: searchDto.id } });
        if (!existPub) throw RequestError.badRequest("Publicación no encontrada");

        const filePath = path.resolve(
            __dirname, "../../../uploads/publicaciones/", existPub.id_material
        );
        const savePath = path.resolve(__dirname, "../../../uploads/tmp/")

        const image = await pdf2pic.convert(filePath, pageNumber, savePath);
        if (!image) throw RequestError.notFound("Error al generar la imagen");
        return image;
    }

    public async getPublicationByDocId(searchDto: SearchIdDto) {
        const { publicacion } = prisma;
        const existPub = await publicacion.findFirst({ where: { id_material: searchDto.id } });
        if (!existPub) throw RequestError.badRequest("Publicación no encontrada");
        console.log(existPub);

        return path.resolve(__dirname + `../../../../uploads/publicaciones/${existPub.id_material}`);
    }

    public async listPublicacionesByGrupoId(searchDto: SearchIdDto) {
        const { publicacion, grupo } = prisma;
        const existGrupo = await grupo.findUnique({ where: { id: searchDto.id } });
        if (!existGrupo) throw RequestError.badRequest("Grupo no valido");

        return {
            results: await publicacion.findMany({
                where: { id_grupo: searchDto.id }

            })
        };
    }

    public async listPublicacionesByProfesorId(searchDto: SearchIdDto) {
        const { publicacion, usuario } = prisma;
        const existProfesor = await usuario.findUnique({
            where: { matricula: searchDto.id, rol: UserRoles.PROFESOR }
        });
        if (!existProfesor) throw RequestError.badRequest("Profesor no valido");

        return {
            results: await publicacion.findMany({
                where: { id_profesor: searchDto.id }
            })
        };
    }

    public async createPublicacion(createDto: CreatePublicacionDto, file: Express.Multer.File) {
        const { publicacion, grupo, usuario } = prisma;

        const [existGrupo, existProfesor] = await Promise.all([
            grupo.findUnique({ where: { id: createDto.id_grupo } }),
            usuario.findUnique({ where: { matricula: createDto.id_profesor, rol: UserRoles.PROFESOR } }),
        ]);

        if (!existGrupo) throw RequestError.badRequest("Grupo no valido");
        if (!existProfesor) throw RequestError.badRequest("Profesor no valido");

        const [error, fileName] = this.fileManager.uploadFile({
            extencionesValidas: ["pdf"],
            file,
            path: path.resolve(__dirname + "../../../../uploads/publicaciones"),
        });
        if (error && !fileName) throw RequestError.badRequest(error);
        return await publicacion.create({
            data: { ...createDto, id_material: fileName! }
        })
    }

    public async updatePublicacion(updateDto: UpdatePublicacionDto) {
        const { publicacion, grupo } = prisma;
        const { id, ...data } = updateDto.values

        const existPublicacion = await publicacion.findUnique({ where: { id } });
        if (!existPublicacion) throw RequestError.badRequest("Publicación no encontrada");

        if (updateDto.id_grupo) {
            const existGrupo = await grupo.findUnique({ where: { id: updateDto.id_grupo } });
            if (!existGrupo) RequestError.badRequest("Grupo no valido");
        }

        return await publicacion.update({
            where: { id },
            data: data
        });
    }

    public async deletePublicacionDto(deleteDto: DeletePublicacionDto) {
        const { publicacion } = prisma;

        const existPub = await publicacion.findUnique({ where: { id: deleteDto.id } });
        if (!existPub) throw RequestError.badRequest("Publicación no existente");
        this.fileManager.deleteFile(
            path.resolve(__dirname + "../../../../uploads/publicaciones/" + existPub.id_material),
        )

        await publicacion.delete({ where: { id: deleteDto.id } });
        return { message: "Publicación eliminada" };
    }
}