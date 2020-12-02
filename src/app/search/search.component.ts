import { Component, OnInit } from '@angular/core';
import { Course } from '../_models/Course';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  selSubject: string = 'None';
  subjects: string[] = [];
  selCourse: string = 'All';
  courses: string[] = [];
  selCourseComponent: string = 'All';

  searchResults: Course[] = [];

  constructor(private dataService: DataService) { 
    this.fetchSubjects();
  }

  ngOnInit(): void {
    
  }

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
          this.courses.push(element.catalog_nbr);
        }));
    }
  }

  search(): void {
    this.searchResults = [];

    if (this.selCourseComponent === 'All') {
      this.dataService.searchCourses(this.selSubject, this.selCourse)
          .subscribe(response => response.forEach(element => {
            this.searchResults.push(this.parseCourse(element));
          }));
    }
    else {
      this.dataService.searchCourses(this.selSubject, this.selCourse, this.selCourseComponent)
          .subscribe(response => this.searchResults.push(this.parseCourse(response)));
    }

    console.log(this.searchResults);
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
