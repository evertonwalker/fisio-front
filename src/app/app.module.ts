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
import { PatientGridComponent } from './patient/patient-grid/patient-grid.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule }    from '@angular/common/http';
import { ExerciseService } from './services/exercise.service';
import { MaterialModule } from './material.module';
import { ExerciseFormComponent } from './exercise/exercise-form/exercise-form.component';
import { ExerciseGridComponent } from './exercise/exercise-grid/exercise-grid.component';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { PatientService } from './services/patient.service';
import { PatientFormComponent } from './patient/patient-form/patient-form.component';
import { UtilService } from './services/util.service';
import { SchedulesGridComponent } from './schedules/schedules-grid/schedules-grid.component';
import { SchedulesFormComponent } from './schedules/schedules-form/schedules-form.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';

registerLocaleData(localeBr, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PatientGridComponent,
    ExerciseGridComponent,
    ExerciseFormComponent,
    PatientFormComponent,
    SchedulesGridComponent,
    SchedulesFormComponent
  ],
  imports: [
    NgxSelectModule,
    SimpleNotificationsModule.forRoot(),
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
  providers: [ExerciseService, NotificationsService, PatientService, UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
