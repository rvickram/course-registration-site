import { Component, OnInit } from '@angular/core';
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

  courseSearch() {

  }
}
