import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import Patient from 'src/app/model/patient.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Exercise } from 'src/app/model/exercise.model';
import Schedule from 'src/app/model/schedule.model';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UtilService } from 'src/app/services/util.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedules-form',
  templateUrl: './schedules-form.component.html',
  styleUrls: ['./schedules-form.component.css']
})
export class SchedulesFormComponent implements OnInit {

  schedule = new Schedule();
  patients: Patient[];
  patientId: string;
  isEdit = false;
  exercises: Exercise[];
  exercisesIds: number[] = [];
  notPatient = 'Nenhum paciente encontrado';
  notExercises = 'Nehum exercício encontrado.';

  constructor(private patientService: PatientService, private exerciseService: ExerciseService,
    private scheduleService: ScheduleService, private utilService: UtilService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.patientService.getPatients()
      .subscribe(resultPatients => {
        this.patients = resultPatients;
      }, error => console.log(error));

    this.exerciseService.getExercises()
      .subscribe(resultExercises => {
        this.exercises = resultExercises;
      }, error => console.log(error));


    const id = this.route.snapshot.params.id;
    if (id) {
      this.isEdit = true;
      this.scheduleService.getScheduleById(id)
        .subscribe(resultSchedule => {
          this.schedule = resultSchedule;
          this.patientId = this.schedule.patient.cpf;
          this.schedule.exercises.forEach(i => {
            this.exercisesIds.push(i.id);
          });
        });
    }



  }

  getTitleSchedule() {
    return this.schedule.id > 0 ? `Atualizar Agendamento` : `Cadastrar Agendamento`;
  }

  saveSchedule() {

    this.buildSchedule()
    this.scheduleService.saveOrUpdateSchedule(this.schedule)
      .subscribe(result => {
        this.utilService.succesMessage(`O agendamento do paciente ${result.patient.fullName} foi salvo com sucesso.`);
        this.schedule = new Schedule();
        this.patientId = undefined;
        this.exercisesIds = [];
      }, error => {
        console.log(error);
        if (error.status === 400) {
          this.utilService.getErrosBadRequest(error.error.errors);
        } else {
          this.utilService.getErrosRule(error.error.message);
        }
      });


  }

  buildSchedule() {
    this.schedule.exercises = [];
    this.schedule.patient = this.patients.find(i => i.cpf === this.patientId);
    this.exercisesIds.forEach(i => {
      this.schedule.exercises.push(this.exercises.find(Item => Item.id === i));
    })
  }

}
