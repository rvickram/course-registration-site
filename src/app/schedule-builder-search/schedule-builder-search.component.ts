import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../_models/Course';
import { Schedule } from '../_models/Schedule';
import { DataService } from '../_services/data.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-schedule-builder-search',
  templateUrl: './schedule-builder-search.component.html',
  styleUrls: ['./schedule-builder-search.component.css']
})
export class ScheduleBuilderSearchComponent implements OnInit {
  
  @Input() newSchedule: Schedule;

  selSubject: string = 'None';
  subjects: string[] = [];
  selCourse: string = 'All';
  courses: string[] = [];
  selCourseComponent: string = 'All';

  searchResults: Course[] = [];

  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) { 
    this.fetchSubjects();
  }

  ngOnInit(): void {}

  /**
   * Gets all subject codes on page load
   */
  private fetchSubjects() {
    this.dataService.getAllSubjects()
      .subscribe(subjects => this.subjects = subjects);
  }

  /**
   * Updates the course codes list whenever selSubject is changed
   */
  fetchCourseCodes() {
    if (this.selSubject !== 'None') {
      this.selCourse = 'All';
      this.courses = [];
      this.dataService.getAllCourses(this.selSubject)
        .subscribe(data => data.forEach(element => {
          let courseCodeRaw = element.catalog_nbr;
          if (isNaN(courseCodeRaw)) {
            this.courses.push(courseCodeRaw);
          }
          else {
            this.courses.push(parseInt(courseCodeRaw).toString());
          }
        }));
    }
  }


  /**
   * This functions searches for courses.
   */
  search(): void {
    const newSearchResults: Course[] = [];

    if (this.selSubject === 'None') {
      this.messageService.alertRed('You must enter a subject code at minimum!');
      return;
    }
    // search by subject code only (return all courses for a subject)
    else if (this.selCourse === 'All') {
      for (let course of this.courses) {
        this.dataService.searchCourses(this.selSubject, course)
          .subscribe(response => response.forEach(element => {
            newSearchResults.push(this.parseCourse(element));
          }));
      }
    }
    // search by subject + course code only
    else {
      this.dataService.searchCourses(this.selSubject, this.selCourse)
          .subscribe(response => response.forEach(element => {
            newSearchResults.push(this.parseCourse(element));
          }));
    }

    this.searchResults = newSearchResults;
  }

  clear() {
    this.searchResults = [];
  }

  addToSchedule(course: Course):void {
    this.newSchedule.courses.push(course);
  }

  private parseCourse(element): Course {
    return new Course(
      element.subject,
      element.catalog_nbr,
      element.className,
      element.course_info[0].class_nbr,
      element.course_info[0].start_time,
      element.course_info[0].end_time,
      element.course_info[0].campus,
      element.course_info[0].facility_id,
      element.course_info[0].class_section,
      element.course_info[0].ssr_component,
      element.course_info[0].days.join(' ')
    );
  }
}
