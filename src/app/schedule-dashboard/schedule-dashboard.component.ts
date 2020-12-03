import { Component, OnInit } from '@angular/core';
import { Schedule } from '../_models/Schedule';
import { AccountService } from '../_services/account.service';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-schedule-dashboard',
  templateUrl: './schedule-dashboard.component.html',
  styleUrls: ['./schedule-dashboard.component.css']
})
export class ScheduleDashboardComponent implements OnInit {

  mySchedules: Schedule[];

  constructor(
    public accountService: AccountService,
    private dataService: DataService
  ) { }
  ngOnInit(): void {
  }

  getUserSchedules():void {
    this.dataService.getUserSchedules()
      .subscribe(response => this.mySchedules = response);
  }

  async sendToken() {
    this.dataService.testToken().subscribe();
  }

}
