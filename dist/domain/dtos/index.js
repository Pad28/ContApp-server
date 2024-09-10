"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./actividad/create-actividad.dto"), exports);
__exportStar(require("./actividad/delete-actividad.dto"), exports);
__exportStar(require("./actividad/update-actividad.dto"), exports);
__exportStar(require("./actividadContestada/create-actividad-contestada.dto"), exports);
__exportStar(require("./auth/check-email-alumno.dto"), exports);
__exportStar(require("./auth/forgot-password.dto"), exports);
__exportStar(require("./auth/login-alumno.dto"), exports);
__exportStar(require("./auth/login-profesor.dto"), exports);
__exportStar(require("./auth/recover-password.dto"), exports);
__exportStar(require("./auth/register-student"), exports);
__exportStar(require("./auth/renew-token.dto"), exports);
__exportStar(require("./grupo/create-grupo.dto"), exports);
__exportStar(require("./grupo/update.grupo.dto"), exports);
__exportStar(require("./preguntas/create-pregunta.dto"), exports);
__exportStar(require("./publicacion/create-publicacion.dto"), exports);
__exportStar(require("./publicacion/delete-publicacion.dto"), exports);
__exportStar(require("./publicacion/update-publicacion.dto"), exports);
__exportStar(require("./respuesta/create-respuesta.dto"), exports);
__exportStar(require("./share/BaseDto"), exports);
__exportStar(require("./share/search-id.dto"), exports);
__exportStar(require("./user/create-alumno.dto"), exports);
__exportStar(require("./user/create-profesor.dto"), exports);
__exportStar(require("./user/update-alumno.dto"), exports);
__exportStar(require("./user/update-profesor.dto"), exports);
__exportStar(require("./preguntaRespondida/create-pregunta-respondida.dto"), exports);
