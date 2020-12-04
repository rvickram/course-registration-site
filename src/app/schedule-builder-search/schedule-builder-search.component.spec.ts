import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleBuilderSearchComponent } from './schedule-builder-search.component';

describe('ScheduleBuilderSearchComponent', () => {
  let component: ScheduleBuilderSearchComponent;
  let fixture: ComponentFixture<ScheduleBuilderSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleBuilderSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleBuilderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
