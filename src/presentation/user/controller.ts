import { Request, Response } from "express";
import { AppController } from "../share";
import { CreateAlumnoDto, CreateProfesorDto, UpdateAlumnoDto, UpdateProfesorDto } from "../../domain/dtos";
import { UserService } from "../services";
import { UserRoles } from "../../data";

export class UserController extends AppController {
    constructor(
        private readonly userService: UserService,
    ) { super(); }

    public getTeacharNames = (req: Request, res: Response) => {
        this.userService.getTeacherNames()
            .then(names => res.json(names))
            .catch(error => this.triggerError(error, res));
    }

    public createProfesor = (req: Request, res: Response) => {
        const [error, createProfesorDto] = CreateProfesorDto.create(req.body);
        if (error || !createProfesorDto) return res.status(400).json({ error });

        this.userService.createProfesor(createProfesorDto)
            .then(user => res.json(user))
            .catch(error => this.triggerError(error, res));
    }

    public createAlumno = (req: Request, res: Response) => {
        const [error, createAlumnoDto] = CreateAlumnoDto.create(req.body);
        if (error || !createAlumnoDto) return res.status(400).json({ error });

        this.userService.createAlumno(createAlumnoDto)
            .then(user => res.json(user))
            .catch(error => this.triggerError(error, res));
    }

    public updateAlumno = (req: Request, res: Response) => {
        const { id } = req.params;
        const { user } = req.body;

        const [error, updateAlumnoDto] = UpdateAlumnoDto.create({ ...req.body, matricula: id });
        if (error || !updateAlumnoDto) return res.status(400).json({ error });

        this.userService.updateAlumno(updateAlumnoDto)
            .then(user => res.json(user))
            .catch(error => this.triggerError(error, res));
    }

    public updateProfesor = (req: Request, res: Response) => {
        const { id } = req.params;
        const { user } = req.body;
        if (id !== user.matricula) return res.status(401).json({ error: "No autorizado" });

        const [error, updateProfesorDto] = UpdateProfesorDto.create({ ...req.body, matricula: id });
        if (error || !updateProfesorDto) return res.status(400).json({ error });

        this.userService.updateProfesor(updateProfesorDto)
            .then(user => res.json(user))
            .catch(error => this.triggerError(error, res));

    }
}