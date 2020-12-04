import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EditSched } from '../_helpers/EditSched';
import { Schedule } from '../_models/Schedule';

@Component({
  selector: 'app-schedule-builder',
  templateUrl: './schedule-builder.component.html',
  styleUrls: ['./schedule-builder.component.css']
})
export class ScheduleBuilderComponent implements OnInit {

  @Input() newSchedule: Schedule;
  @Input() mySchedules: Schedule[];
  @Input() editSched: EditSched;

  constructor() { }

  ngOnInit(): void {
  }

}
