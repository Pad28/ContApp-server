"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const share_1 = require("../share");
const dtos_1 = require("../../domain/dtos");
class UserController extends share_1.AppController {
    constructor(userService) {
        super();
        this.userService = userService;
        this.getTeacharNames = (req, res) => {
            this.userService.getTeacherNames()
                .then(names => res.json(names))
                .catch(error => this.triggerError(error, res));
        };
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
        this.updateAlumno = (req, res) => {
            const { id } = req.params;
            const { user } = req.body;
            const [error, updateAlumnoDto] = dtos_1.UpdateAlumnoDto.create(Object.assign(Object.assign({}, req.body), { matricula: id }));
            if (error || !updateAlumnoDto)
                return res.status(400).json({ error });
            this.userService.updateAlumno(updateAlumnoDto)
                .then(user => res.json(user))
                .catch(error => this.triggerError(error, res));
        };
        this.updateProfesor = (req, res) => {
            const { id } = req.params;
            const { user } = req.body;
            if (id !== user.matricula)
                return res.status(401).json({ error: "No autorizado" });
            const [error, updateProfesorDto] = dtos_1.UpdateProfesorDto.create(Object.assign(Object.assign({}, req.body), { matricula: id }));
            if (error || !updateProfesorDto)
                return res.status(400).json({ error });
            this.userService.updateProfesor(updateProfesorDto)
                .then(user => res.json(user))
                .catch(error => this.triggerError(error, res));
        };
    }
}
exports.UserController = UserController;
