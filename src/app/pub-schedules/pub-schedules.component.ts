import { Component, OnInit } from '@angular/core';
import { ScheduleManager } from '../_helpers/ScheduleManager';
import { Schedule } from '../_models/Schedule';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-pub-schedules',
  templateUrl: './pub-schedules.component.html',
  styleUrls: ['./pub-schedules.component.css']
})
export class PubSchedulesComponent implements OnInit {

  scheduleManager: ScheduleManager = new ScheduleManager();

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
   this.dataService.getPublicSchedules().subscribe(
     pubSchedules => {
      const newSchedList:Schedule[] = [];
      for (let key in pubSchedules) {
        const schedule: Schedule = this.scheduleManager.parseSchedule(pubSchedules[key]);
        newSchedList.push(schedule);
      }

      this.scheduleManager.setSchedules(newSchedList);
     }
   )
  }

}
