import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Schedule from '../model/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getSchedules(): Observable<Schedule[]>{
    return this.http.get<Schedule[]>(`api/schedule/`)
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
