import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  selectedSubject: string = 'None';
  subjects: string[] = [];
  selectedCourse: string = 'All';
  courses: string[] = [];

  constructor(private dataService: DataService) { 
    this.fetchSubjects();
  }

  ngOnInit(): void {
    
  }

  private fetchSubjects() {
    const subjects = this.dataService.getAllSubjects()
      .subscribe(subjects => this.subjects = subjects);
  }

}
