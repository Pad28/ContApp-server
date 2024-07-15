import { Request, Response } from "express";
import { AppController } from "../share";
import { CreateAlumnoDto, CreateProfesorDto } from "../../domain/dtos";
import { UserService } from "../services";

export class UserController extends AppController {
    constructor(
        private readonly userService: UserService,
    ) { super(); }

    public createProfesor = (req: Request, res: Response) => {
        const [error, createProfesorDto] = CreateProfesorDto.create(req.body);
        if(error || !createProfesorDto) return res.status(400).json({ error });

        this.userService.createProfesor(createProfesorDto)
            .then(user => res.json(user))
            .catch(error => this.triggerError(error, res));
    }
    
    public createAlumno = (req: Request, res: Response) => {
        const [error, createAlumnoDto] = CreateAlumnoDto.create(req.body);
        if(error || !createAlumnoDto) return res.status(400).json({ error });

        this.userService.createAlumno(createAlumnoDto)
            .then(user => res.json(user))
            .catch(error => this.triggerError(error, res));
    }
}