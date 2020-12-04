import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Schedule } from '../_models/Schedule';
import { DataService } from '../_services/data.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-schedule-builder-selector',
  templateUrl: './schedule-builder-selector.component.html',
  styleUrls: ['./schedule-builder-selector.component.css']
})
export class ScheduleBuilderSelectorComponent implements OnInit {

  @Input() newSchedule: Schedule;
  @Input() mySchedules: Schedule[];
  @Input() editSched: boolean;

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

  onSubmit():void {
    if (this.newScheduleForm.invalid) {
      this.messageService.alertRed('Make sure all fields are valid!');
      return;
    }
    else if (this.newSchedule.courses.length === 0) {
      this.messageService.alertRed('You must have at least one course in your list!');
      return;
    }
    else if (this.mySchedules.length >= 20 ) {
      this.messageService.alertRed('You may only have 20 course saved. Delete some to make room.');
      return;
    }
    else if (!this.editSched && this.scheduleExists(this.newSchedule)) {
      this.messageService.alertRed('A schedule with this name already exists!');
      return;
    }

    // update required fields
    this.newSchedule.title = this.schedName.value;
    this.newSchedule.description = this.description.value;
    let date: Date = new Date();
    this.newSchedule.lastEdited = date.toLocaleString();
    this.newSchedule.publicVis = (this.publicVis.value !== '');

    // make api call
    if (this.editSched) {
      this.dataService.updateUserSchedule(this.newSchedule).subscribe(
        data => {},
        error => {},
        () => {
          // update my course list and reset the form
          this.mySchedules.push(this.newSchedule);
          this.newSchedule.courses = [];
          this.newScheduleForm.reset();
          this.messageService.alertGreen('Saved your new schedule!');
        }
      );
    }
    else {
      this.dataService.newUserSchedule(this.newSchedule).subscribe(
        data => {},
        error => {},
        () => {
          // update my course list and reset the form
          this.mySchedules.push(this.newSchedule);
          this.newSchedule.courses = [];
          this.newScheduleForm.reset();
          this.messageService.alertGreen('Saved your new schedule!');
        }
      );
    }
    
  }

  private scheduleExists(schedule: Schedule):boolean {
    const existingSched: Schedule[] = this.mySchedules.filter(s => {
      s.title === schedule.title;
    });

    console.log(existingSched);

    return (existingSched.length > 0);
  }

  clear() {
    this.newSchedule.courses = [];
  }

}
