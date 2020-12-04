import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleBuilderSelectorComponent } from './schedule-builder-selector.component';

describe('ScheduleBuilderSelectorComponent', () => {
  let component: ScheduleBuilderSelectorComponent;
  let fixture: ComponentFixture<ScheduleBuilderSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleBuilderSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleBuilderSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
