import { Component, OnInit } from '@angular/core';
import { Course } from '../_models/Course';
import { Schedule } from '../_models/Schedule';
import { AccountService } from '../_services/account.service';
import { DataService } from '../_services/data.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-schedule-dashboard',
  templateUrl: './schedule-dashboard.component.html',
  styleUrls: ['./schedule-dashboard.component.css']
})
export class ScheduleDashboardComponent implements OnInit {

  mySchedules: Schedule[] = [];
  newSchedule: Schedule;

  constructor(
    public accountService: AccountService,
    private dataService: DataService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
  }

  getUserSchedules():void {
    this.dataService.getUserSchedules().subscribe(userSchedules => {
      const newSchedList:Schedule[] = [];
      for (let key in userSchedules) {
        const schedule: Schedule = this.parseSchedule(userSchedules[key]);

        newSchedList.push(schedule);
      }

      this.mySchedules = newSchedList;
    });
  }

  editSchedule(schedule: Schedule): void {
    console.log(`Edit ${schedule}`);
  }

  deleteSchedule(schedule: Schedule): void {
    console.log(`Del ${schedule}`);
  }

  async sendToken() {
    this.dataService.testToken().subscribe();
  }

  parseSchedule(rawSched): Schedule {
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

  parseCourses(rawCourseList): Course[] {
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
