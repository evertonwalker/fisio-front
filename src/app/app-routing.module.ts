import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientGridComponent } from './patient-grid/patient-grid.component';
import { HomeComponent } from './home/home.component';
import { ExerciseGridComponent } from './exercise/exercise-grid/exercise-grid.component';
import { ExerciseFormComponent } from './exercise/exercise-form/exercise-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'patient', component: PatientGridComponent },
  { path: 'exercise', component: ExerciseGridComponent },
  { path: 'form-exercise', component: ExerciseFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
