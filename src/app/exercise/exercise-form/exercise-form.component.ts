import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/model/exercise.model';
import { ExerciseService } from 'src/app/exercise.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.css']
})
export class ExerciseFormComponent implements OnInit {

  exercise: Exercise = new Exercise();

  constructor(private exerciseService: ExerciseService, private route: ActivatedRoute) { }

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
        console.log(result.error.text);
      }, error => console.log(error));
  }


}
