import { Injectable } from '@angular/core';
import Patient from '../model/patient.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>('api/patient/');
  }

  getPatientByCpf(cpf: string): Observable<Patient> {
    return this.http.get<Patient>(`api/patient/${cpf}`);
  }

  deletePatient(cpf: string): Observable<Patient> {
    return this.http.delete<Patient>(`api/patient/${cpf}`);
  }

  saveOrUpdatePatient(patient: Patient, isEdit: boolean): Observable<Patient> {
    if (isEdit) {
      return this.http.put<Patient>(`api/patient/${patient.cpf}`, patient);
    } else {;
      return this.http.post<Patient>(`api/patient/`, patient);
    }
  }


}
