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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicacionesService = void 0;
const path_1 = __importDefault(require("path"));
const data_1 = require("../../data");
const domain_1 = require("../../domain");
class PublicacionesService {
    constructor(fileManager) {
        this.fileManager = fileManager;
    }
    getPublicationByDocId(searchDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { publicacion } = data_1.prisma;
            const existPub = yield publicacion.findFirst({ where: { id_material: searchDto.id } });
            if (!existPub)
                throw domain_1.RequestError.badRequest("Publicación no encontrada");
            return existPub;
        });
    }
    listPublicacionesByGrupoId(searchDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { publicacion, grupo } = data_1.prisma;
            const existGrupo = yield grupo.findUnique({ where: { id: searchDto.id } });
            if (!existGrupo)
                throw domain_1.RequestError.badRequest("Grupo no valido");
            return {
                results: yield publicacion.findMany({
                    where: { id_grupo: searchDto.id }
                })
            };
        });
    }
    listPublicacionesByProfesorId(searchDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { publicacion, usuario } = data_1.prisma;
            const existProfesor = yield usuario.findUnique({
                where: { matricula: searchDto.id, rol: data_1.UserRoles.PROFESOR }
            });
            if (!existProfesor)
                throw domain_1.RequestError.badRequest("Profesor no valido");
            return {
                results: yield publicacion.findMany({
                    where: { id_profesor: searchDto.id }
                })
            };
        });
    }
    createPublicacion(createDto, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const { publicacion, grupo, usuario } = data_1.prisma;
            const [existGrupo, existProfesor] = yield Promise.all([
                grupo.findUnique({ where: { id: createDto.id_grupo } }),
                usuario.findUnique({ where: { matricula: createDto.id_profesor, rol: data_1.UserRoles.PROFESOR } }),
            ]);
            if (!existGrupo)
                throw domain_1.RequestError.badRequest("Grupo no valido");
            if (!existProfesor)
                throw domain_1.RequestError.badRequest("Profesor no valido");
            const [error, fileName] = this.fileManager.uploadFile({
                extencionesValidas: ["pdf"],
                file,
                path: path_1.default.resolve(__dirname + "../../../../uploads/publicaciones"),
            });
            if (error && !fileName)
                throw domain_1.RequestError.badRequest(error);
            return yield publicacion.create({
                data: Object.assign(Object.assign({}, createDto), { id_material: fileName })
            });
        });
    }
    updatePublicacion(updateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { publicacion, grupo } = data_1.prisma;
            const _a = updateDto.values, { id } = _a, data = __rest(_a, ["id"]);
            const existPublicacion = yield publicacion.findUnique({ where: { id } });
            if (!existPublicacion)
                throw domain_1.RequestError.badRequest("Publicación no encontrada");
            if (updateDto.id_grupo) {
                const existGrupo = yield grupo.findUnique({ where: { id: updateDto.id_grupo } });
                if (!existGrupo)
                    domain_1.RequestError.badRequest("Grupo no valido");
            }
            return yield publicacion.update({
                where: { id },
                data: data
            });
        });
    }
    deletePublicacionDto(deleteDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { publicacion } = data_1.prisma;
            const existPub = yield publicacion.findUnique({ where: { id: deleteDto.id } });
            if (!existPub)
                throw domain_1.RequestError.badRequest("Publicación no existente");
            this.fileManager.deleteFile(path_1.default.resolve(__dirname + "../../../../uploads/publicaciones/" + existPub.id_material));
            yield publicacion.delete({ where: { id: deleteDto.id } });
            return { message: "Publicación eliminada" };
        });
    }
}
exports.PublicacionesService = PublicacionesService;
