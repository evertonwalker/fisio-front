import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import Patient from 'src/app/model/patient.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Exercise } from 'src/app/model/exercise.model';
import Schedule from 'src/app/model/schedule.model';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-schedules-form',
  templateUrl: './schedules-form.component.html',
  styleUrls: ['./schedules-form.component.css']
})
export class SchedulesFormComponent implements OnInit {

  schedule = new Schedule();
  patients: Patient[];
  patientId: string;
  exercises: Exercise[];
  exercisesIds: number[];

  constructor(private patientService: PatientService, private exerciseService: ExerciseService,
    private scheduleService: ScheduleService, private utilService: UtilService) { }

  ngOnInit() {
    this.patientService.getPatients()
      .subscribe(resultPatients => {
        this.patients = resultPatients;
      }, error => console.log(error));

    this.exerciseService.getExercises()
      .subscribe(resultExercises => {
        this.exercises = resultExercises;
      }, error => console.log(error));
  }

  getTitleSchedule() {
    return this.schedule.id > 0 ? `Atualizar Agendamento` : `Cadastrar Agendamento`;
  }

  saveSchedule() {
    
    this.buildSchedule()    
    console.log(this.schedule);
    // this.scheduleService.saveOrUpdateSchedule(this.schedule)
    // .subscribe(result => {
    //   this.utilService.succesMessage(`O agendamento do paciente ${result.patient.fullName} foi salvo com sucesso.`);
    //   this.schedule = new Schedule();
    // }, error => {
    //   console.log(error);
    //   if (error.status === 400) {
    //     this.utilService.getErrosBadRequest(error.error.errors);
    //   } else {
    //     this.utilService.getErrosRule(error.error.message);
    //   }
    // });


  }

  buildSchedule() {
    this.schedule.exercises = [];
    this.schedule.patient = this.patients.find(i => i.cpf === this.patientId);
    this.exercisesIds.forEach(i => {
      this.schedule.exercises.push(this.exercises.find(Item => Item.id === i));
    })
  }

}
