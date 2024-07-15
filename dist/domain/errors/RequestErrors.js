"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestError = void 0;
class RequestError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
    static badRequest(message) {
        return new RequestError(400, message);
    }
    static unauthorized(message) {
        return new RequestError(401, message);
    }
    static forbidden(message) {
        return new RequestError(405, message);
    }
    static notFound(message) {
        return new RequestError(404, message);
    }
    static internalServerError(message = 'Error interno del servidor') {
        return new RequestError(500, message);
    }
}
exports.RequestError = RequestError;
