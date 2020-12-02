import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubSchedulesComponent } from './pub-schedules.component';

describe('PubSchedulesComponent', () => {
  let component: PubSchedulesComponent;
  let fixture: ComponentFixture<PubSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
