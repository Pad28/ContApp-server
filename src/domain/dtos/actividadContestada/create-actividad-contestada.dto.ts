import { Validators } from "../../../config";
import { BaseDto } from "../share/BaseDto";
import { DynamicObject } from "../share/DynamicObject";


export class CreateActividadContestadaDto extends BaseDto {
    private constructor(
        public readonly fecha: string,
        public readonly id_alumno: string,
        public readonly id_actividad: string,
    ) { super() };

    static create(data: DynamicObject): [string?, CreateActividadContestadaDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("id_alumno", "id_actividad");
            validators.checkPattern("id_alumno", /^[0-9]+$/);
            validators.isUIID("id_actividad");

            const date = this.getCurrentDateTime;
            const { id_alumno, id_actividad } = validators.data;

            return [undefined, new CreateActividadContestadaDto(
                date, id_alumno, id_actividad,
            )];
        } catch (error) {
            return [error as string]
        }
    }
}