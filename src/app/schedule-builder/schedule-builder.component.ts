import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScheduleManager } from '../_helpers/ScheduleManager';
import { Schedule } from '../_models/Schedule';

@Component({
  selector: 'app-schedule-builder',
  templateUrl: './schedule-builder.component.html',
  styleUrls: ['./schedule-builder.component.css']
})
export class ScheduleBuilderComponent implements OnInit {

  @Input() newSchedule: Schedule;
  @Input() scheduleManager: ScheduleManager;

  constructor() { }

  ngOnInit(): void {
  }

}
