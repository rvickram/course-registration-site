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
      Validators.minLength(4),
      Validators.maxLength(40)
    ]);
    this.description = new FormControl('', [
      Validators.required,
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
      this.messageService.alertRed('Make sure your title is valid!');
      return;
    }
    else if (this.newSchedule.courses.length === 0) {
      this.messageService.alertRed('You must have at least one course in your list!');
      return;
    }

    // update required fields
    this.newSchedule.title = this.schedName.value;
    this.newSchedule.description = this.description.value;
    let date: Date = new Date();
    this.newSchedule.lastEdited = date.toLocaleString();
    this.newSchedule.publicVis = (this.publicVis.value !== '');

    // make api call
    this.dataService.setUserSchedule(this.newSchedule).subscribe(
      data => {},
      error => {},
      () => this.messageService.alertGreen('Saved your new schedule!')
    );
  }

  clear() {
    this.newSchedule.courses = [];
  }

}
