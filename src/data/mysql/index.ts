import { PrismaClient } from "@prisma/client";
import { bcryptjsAdapter, envs } from "../../config";


export const prisma = new PrismaClient();
export const connectionDB = async() => {
    try {
        prisma.$connect();
        console.log("Base de datos online");
        // const { USER_ADMIN, PASSWORD_ADMIN } = envs;
        // const existAdmin = await prisma.usuario.findUnique({ where: { correo: USER_ADMIN } });
        // if(!existAdmin) {
        //     await prisma.usuario.create({ data: {
        //         correo: USER_ADMIN,
        //         password: bcryptjsAdapter.hash(PASSWORD_ADMIN),
        //         apellidos: " ",
        //         matricula: "000",
        //         rol: "ADMIN",
        //         nombre: "ContApp"
        //     } });
        // }
    } catch (error) {
        throw error
    }
}