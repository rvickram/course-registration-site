import { Component, Input, OnInit } from '@angular/core';
import { Schedule } from '../_models/Schedule';

@Component({
  selector: 'app-schedule-builder',
  templateUrl: './schedule-builder.component.html',
  styleUrls: ['./schedule-builder.component.css']
})
export class ScheduleBuilderComponent implements OnInit {

  @Input() newSchedule: Schedule;
  @Input() mySchedules: Schedule[];
  @Input() editSched: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
