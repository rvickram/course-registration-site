import { Course } from "../_models/Course";
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
        const newSchedList: Schedule[] = this.scheduleList.filter(s => 
            s.title !== schedule.title
        );
        
        newSchedList.push(schedule);
        this.scheduleList = newSchedList;
    }

    public deleteSchedule(schedule: Schedule):void {
        this.scheduleList = this.scheduleList.filter(s => s.title !== schedule.title);
    }

    public edit(): boolean {
        return this.editing;
    }

    public parseSchedule(rawSched): Schedule {
        const schedTitle = rawSched.title;
        const schedDescription = rawSched.description;
        const schedCourseList: Course[] = this.parseCourses(rawSched.courses);
        const schedLastEdited = rawSched.lastEdited;
        const schedPublicVis = rawSched.publicVis;
    
        return new Schedule(
          schedTitle,
          schedDescription,
          schedCourseList,
          schedLastEdited,
          schedPublicVis
        );
      }
    
      private parseCourses(rawCourseList): Course[] {
        const courseList: Course[] = [];
    
        for (var courseKey in rawCourseList) {
          let course = rawCourseList[courseKey];
    
          courseList.push(new Course(
            course.subject,
            course.course_code,
            course.class_name,
            course.class_number,
            course.start_time,
            course.end_time,
            course.campus,
            course.room,
            course.class_section,
            course.course_component,
            course.days
          ));
        }
    
        return courseList;
      }
}