import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkHourSelectComponent } from './work-hour-select.component';

describe('WorkHourSelectComponent', () => {
  let component: WorkHourSelectComponent;
  let fixture: ComponentFixture<WorkHourSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkHourSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkHourSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
