import { Validators } from "../../../config";
import { DynamicObject } from "../share/DynamicObject";

export class CreateActividadDto {

    private constructor(
        public readonly nombre: string,
        public readonly fecha_activacion: Date,
        public readonly fecha_limite: Date,
    ) { }

    static create(data: DynamicObject): [string?, CreateActividadDto?] {
        try {
            const validators = new Validators(data);

            validators.requiredKeys("nombre", "fecha_activacion", "fecha_limite");
            validators.capitalizar("nombre");
            validators.checkPattern("fecha_activacion", /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
            validators.checkPattern("fecha_limite", /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)

            const { nombre, fecha_activacion, fecha_limite } = validators.data;
            return [undefined, new CreateActividadDto(nombre, fecha_activacion, fecha_limite)];
        } catch (error) {
            return [error as string]
        }
    }

}