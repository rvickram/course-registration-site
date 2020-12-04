import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Schedule } from '../_models/Schedule';
import { AccountService } from '../_services/account.service';
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
  publicVis: FormControl;

  constructor(
    private accountService: AccountService,
    private messageService: MessageService
  ) {
      this.createFormControls();
      this.createForm();
  }

  ngOnInit(): void {}

  createFormControls() {
    this.schedName = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(40)
    ]);
    this.publicVis = new FormControl('');
  }

  createForm() {
    this.newScheduleForm = new FormGroup({
      schedName: this.schedName,
      publicVis: this.publicVis,
    });
  }

  onSubmit() {
    console.log(this.newSchedule);
  }

  clear() {
    this.newSchedule.courses = [];
  }

}
