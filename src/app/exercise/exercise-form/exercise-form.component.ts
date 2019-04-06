import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/model/exercise.model';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.css']
})
export class ExerciseFormComponent implements OnInit {

  exercise: Exercise = new Exercise();

  constructor() { }

  ngOnInit() {
  }

  getTitleExercise() {
    return this.exercise.id > 0 ? 'Cadastrar exercício' : 'Editar exercício';
  }

}
