"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const share_1 = require("../share");
const dtos_1 = require("../../domain/dtos");
class UserController extends share_1.AppController {
    constructor(userService) {
        super();
        this.userService = userService;
        this.createProfesor = (req, res) => {
            const [error, createProfesorDto] = dtos_1.CreateProfesorDto.create(req.body);
            if (error || !createProfesorDto)
                return res.status(400).json({ error });
            this.userService.createProfesor(createProfesorDto)
                .then(user => res.json(user))
                .catch(error => this.triggerError(error, res));
        };
        this.createAlumno = (req, res) => {
            const [error, createAlumnoDto] = dtos_1.CreateAlumnoDto.create(req.body);
            if (error || !createAlumnoDto)
                return res.status(400).json({ error });
            this.userService.createAlumno(createAlumnoDto)
                .then(user => res.json(user))
                .catch(error => this.triggerError(error, res));
        };
    }
}
exports.UserController = UserController;
