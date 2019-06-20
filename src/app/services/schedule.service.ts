import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Schedule from '../model/schedule.model';
import { map } from 'rxjs/operators';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getSchedulesForGrids(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`api/schedule/`);
  }

  getSchedules() {
    return this.http.get<Schedule[]>(`api/schedule/`).pipe(
      map(result => {
        let events = [];
        result.forEach(i => {
          events.push({
            start: new Date(i.startDate), end: new Date(i.endDate), title: i.patient.fullName, patient: i.patient,
            color: {
              primary: i.color,
              secondary: '#D1E8FF'
            }, exercises: i.exercises
          });
        });
        return events;
      })
    )
  }

  getScheduleById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(`api/schedule/${id}`);
  }

  deleteSchedule(id: number): Observable<Schedule> {
    return this.http.delete<Schedule>(`api/schedule/${id}`);
  }

  saveOrUpdateSchedule(schedule: Schedule): Observable<Schedule> {
    if (schedule.id > 0) {
      return this.http.put<Schedule>(`api/schedule/${schedule.id}`, schedule);
    } else {
      return this.http.post<Schedule>(`api/schedule/`, schedule);
    }
  }

}
