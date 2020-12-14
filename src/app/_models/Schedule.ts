import { Course } from "./Course";

export class Schedule {
    constructor(
        public title:string = '',
        public description:string = '',
        public courses:Course[] = [],
        public lastEdited:string = '',
        public publicVis:boolean = false,
        public displayName:string = ''
    ) {};

    public set(schedule: Schedule) {
        this.title = schedule.title;
        this.description = schedule.description;
        this.courses = schedule.courses;
        this.lastEdited = schedule.lastEdited;
        this.publicVis = schedule.publicVis;
    }

    public setPub(schedule: Schedule) {
        this.set(schedule);

        this.displayName = schedule.displayName;
    }

    public reset():void {
        this.title = '';
        this.description = '';
        this.courses = [];
        this.lastEdited = '';
        this.publicVis = false;
    }
}