import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from './model/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) { }

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>('api/exercise/all');
  }

  saveOrUpdateExercise(exercise: Exercise): Observable<Exercise> {
    if (exercise.id > 0) {
      return this.http.put<any>(`api/exercise/${exercise.id}/update`, exercise);
    } else {
      return this.http.post<any>(`api/exercise/insert`, exercise);
    }
  }

  getExerciseById(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`api/exercise/${id}`);
  }

  deleteExercise(id: number): Observable<any> {
    return this.http.delete<any>(`api/exercise/${id}/delete`);
  }

}
