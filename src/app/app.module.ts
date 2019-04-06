import { BrowserModule } from '@angular/platform-browser';
import 'flatpickr/dist/flatpickr.css';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppComponent } from './app.component';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { PatientGridComponent } from './patient-grid/patient-grid.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule }    from '@angular/common/http';
import { ExerciseService } from './exercise.service';
import { MaterialModule } from './material.module';
import { ExerciseFormComponent } from './exercise/exercise-form/exercise-form.component';
import { ExerciseGridComponent } from './exercise/exercise-grid/exercise-grid.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PatientGridComponent,
    ExerciseGridComponent,
    ExerciseFormComponent
  ],
  imports: [
    MaterialModule,
    HttpClientModule,
    NgxDatatableModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    AppRoutingModule

  ],
  providers: [ExerciseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
