import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarView
} from 'angular-calendar';
import { ScheduleService } from '../services/schedule.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData: {
    title: string;
    event: CalendarEvent;
  };

  events$: Observable<Array<CalendarEvent<any>>>;
  activeDayIsOpen = false;

  constructor(private modal: NgbModal, private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.events$ = this.scheduleService.getSchedules();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  handleEvent(event: CalendarEvent): void {
    this.modalData = { event, title: event.title };
    this.modal.open(this.modalContent, { size: 'lg' });
  }



}
