import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesGridComponent } from './schedules-grid.component';

describe('SchedulesGridComponent', () => {
  let component: SchedulesGridComponent;
  let fixture: ComponentFixture<SchedulesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
