import { Validators } from "../../../config";
import { BaseDto } from "../share/BaseDto";
import { DynamicObject } from "../share/DynamicObject";


export class UpdateActividadDto extends BaseDto {
    private constructor(
        public readonly id: string,
        public readonly nombre?: string,
        public readonly fecha_activacion?: string,
        public readonly fecha_limite?: string,
    ) { super(); }

    static create(data: DynamicObject): [string?, UpdateActividadDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("id");
            validators.isUIID("id");
            validators.ifExistCapitalizar("nombre");
            validators.ifExistsCheckPattern(
                "fecha_activacion",
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
            );
            validators.ifExistsCheckPattern(
                "fecha_limite",
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
            );

            const {
                id,
                nombre,
                fecha_activacion,
                fecha_limite,
            } = validators.data;
            return [undefined, new UpdateActividadDto(
                id, nombre, fecha_activacion, fecha_limite,
            )]
        } catch (error) {
            return [error as string];
        }
    }

}