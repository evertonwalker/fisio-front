import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientGridComponent } from './patient/patient-grid/patient-grid.component';
import { HomeComponent } from './home/home.component';
import { ExerciseGridComponent } from './exercise/exercise-grid/exercise-grid.component';
import { ExerciseFormComponent } from './exercise/exercise-form/exercise-form.component';
import { PatientFormComponent } from './patient/patient-form/patient-form.component';
import { SchedulesGridComponent } from './schedules/schedules-grid/schedules-grid.component';
import { SchedulesFormComponent } from './schedules/schedules-form/schedules-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'patient', component: PatientGridComponent },
  { path: 'exercise', component: ExerciseGridComponent },
  { path: 'form-exercise', component: ExerciseFormComponent },
  { path: 'form-exercise/:id', component: ExerciseFormComponent },
  { path: 'form-patient', component: PatientFormComponent },
  { path: 'form-patient/:cpf', component: PatientFormComponent },
  { path: 'schedules', component: SchedulesGridComponent },
  { path: 'form-schedule', component: SchedulesFormComponent },
  { path: 'form-schedule/:id', component: SchedulesFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
