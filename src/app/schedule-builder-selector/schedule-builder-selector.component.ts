import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScheduleManager } from '../_helpers/ScheduleManager';
import { Schedule } from '../_models/Schedule';
import { DataService } from '../_services/data.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-schedule-builder-selector',
  templateUrl: './schedule-builder-selector.component.html',
  styleUrls: ['./schedule-builder-selector.component.css']
})
export class ScheduleBuilderSelectorComponent implements OnInit, OnChanges {

  @Input() newSchedule: Schedule;
  @Input() scheduleManager: ScheduleManager;

  newScheduleForm: FormGroup;
  schedName: FormControl;
  description: FormControl;
  publicVis: FormControl;

  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) {
      this.createFormControls();
      this.createForm();
  }

  ngOnInit(): void {}

  ngOnChanges(change: SimpleChanges) {
    console.log(change);
  }

  private createFormControls() {
    this.schedName = new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 _.-]*$'),
        Validators.minLength(4),
        Validators.maxLength(40)
    ]);
    this.description = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9 _.-]*$'),
      Validators.minLength(5),
      Validators.maxLength(100)
    ]);
    this.publicVis = new FormControl('');
  }

  private createForm() {
    this.newScheduleForm = new FormGroup({
      schedName: this.schedName,
      description: this.description,
      publicVis: this.publicVis,
    });
  }

  saveNewSchedule():void {
    if (this.newScheduleForm.invalid) {
      this.messageService.alertRed('Make sure all fields are valid!');
      return;
    }
    else if (this.newSchedule.courses.length === 0) {
      this.messageService.alertRed('You must have at least one course in your list!');
      return;
    }
    else if (this.scheduleManager.getNumSchedules() >= 20 ) {
      this.messageService.alertRed('You may only have 20 course saved. Delete some to make room.');
      return;
    }

    // update required fields
    this.newSchedule.title = this.schedName.value;
    this.newSchedule.description = this.description.value;
    this.newSchedule.lastEdited = new Date().toLocaleString();
    this.newSchedule.publicVis = (this.publicVis.value !== '');

    // make api call
    this.dataService.newUserSchedule(this.newSchedule).subscribe(
      data => {},
      error => {},
      () => {
        // update my course list and reset the form
        this.scheduleManager.addSchedule(this.newSchedule);
        this.newSchedule.reset();
        this.newScheduleForm.reset();
        this.messageService.alertGreen('Saved your new schedule!');
      }
    );
    
  }

  updateSchedule() {
    this.dataService.updateUserSchedule(this.newSchedule).subscribe(
      data => {},
      error => {},
      () => {
        // update my course list and reset the form
        this.scheduleManager.updateSchedule(this.newSchedule);
        this.scheduleManager.setEdit(false);
        this.newSchedule.reset();
        this.newScheduleForm.reset();
        this.messageService.alertGreen('Updated your schedule!');
      }
    );
  }

  cancelUpdateSchedule() {
    this.newSchedule.reset();
    this.scheduleManager.setEdit(false);
  }

  reset() {
    this.newSchedule.reset();
    this.newScheduleForm.reset();
  }

  clearCourseList() {
    this.newSchedule.courses = [];
  }

}
