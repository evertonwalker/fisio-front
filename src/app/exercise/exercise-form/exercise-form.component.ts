import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/model/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.css']
})
export class ExerciseFormComponent implements OnInit {

  exercise: Exercise = new Exercise();

  constructor(private exerciseService: ExerciseService, private route: ActivatedRoute,
    private utilService: UtilService) { }

  ngOnInit() {

    const idExercise = +this.route.snapshot.params.id;
    if (idExercise > 0) {
      this.exerciseService.getExerciseById(idExercise)
        .subscribe(result => {
          this.exercise = result;
        }, error => console.log(error));
    }

  }

  getTitleExercise() {
    return this.exercise.id > 0 ? 'Cadastrar exercício' : 'Editar exercício';
  }

  saveExercise() {
    this.exerciseService.saveOrUpdateExercise(this.exercise)
      .subscribe(result => {
        this.utilService.succesMessage(`Exercício ${result.name} foi salvo com sucesso`);
        this.exercise = new Exercise();
      }, error => {
        if (error.status === 400) {
          this.utilService.getErrosBadRequest(error.error.errors);
        } else {
          this.utilService.getErrosRule(error.error.message);
        }
        console.log(error)
      });
  }


}
