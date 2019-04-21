import Schedule from "./schedule.model";

export class Exercise {
    id: number;
    name: string;
    description: string;
    schedules: Schedule[];
}