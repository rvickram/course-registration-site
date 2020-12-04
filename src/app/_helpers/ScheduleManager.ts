import { Schedule } from "../_models/Schedule";

export class ScheduleManager {

    private scheduleList: Schedule[] = [];

    constructor(private editing: boolean = false) {}

    public setEdit(editing: boolean):void {
        this.editing = editing;
    }

    public setSchedules(scheduleList: Schedule[]):void {
        this.scheduleList = scheduleList;
    }

    public getNumSchedules(): number {
        return this.scheduleList.length;
    }

    public getScheduleList(): Schedule[] {
        return this.scheduleList;
    }

    public addSchedule(schedule: Schedule):void {
        this.scheduleList.push(schedule);
    }

    public updateSchedule(schedule: Schedule):void {
        const index: number = this.scheduleList.findIndex(s => s.title === schedule.title);

        this.scheduleList[index].set(schedule);
    }

    public deleteSchedule(schedule: Schedule):void {
        this.scheduleList = this.scheduleList.filter(s => s.title !== schedule.title);
    }

    public edit(): boolean {
        return this.editing;
    }
}