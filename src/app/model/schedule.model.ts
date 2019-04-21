import { Exercise } from "./exercise.model";
import Patient from "./patient.model";

export default class Schedule {
    id: number;
    startDate: Date;
    endDate: Date;
    exercises: Exercise[];
    patient: Patient;
}