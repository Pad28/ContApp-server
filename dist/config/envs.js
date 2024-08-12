"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)("PORT").required().asPortNumber(), // Puerto en el que estara activo el servicio
    PUBLIC_PATH: (0, env_var_1.get)("PUBLIC_PATH").default("public").asString(), // Directorio donde se encuentra el contenido estatico que ser servido
    DATABASE_URL: (0, env_var_1.get)("DATABASE_URL").required().asString(), // Direccion sql de la base de datos
    JWT_SEED: (0, env_var_1.get)("JWT_SEED").required().asString(), // Clave secreta para la firma de los jwt
    GMAIL_USER: (0, env_var_1.get)("GMAIL_USER").required().asEmailString(), // Usuario gmail de la aplicacion
    GMAIL_KEY: (0, env_var_1.get)("GMAIL_KEY").required().asString(), // Clave de aplicaciones de la cuenta gmail de la aplicacion
    API_SERVICE: (0, env_var_1.get)("API_SERVICE").required().asUrlString(), // Direccion o dominio donde se encuentra escuchando el servicio
    USER_ADMIN: (0, env_var_1.get)("USER_ADMIN").required().asEmailString(),
    PASSWORD_ADMIN: (0, env_var_1.get)("PASSWORD_ADMIN").required().asString(),
};
