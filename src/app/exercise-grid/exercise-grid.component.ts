import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-exercise-grid',
  templateUrl: './exercise-grid.component.html',
  styleUrls: ['./exercise-grid.component.css'],
  providers: [ExerciseService]
})
export class ExerciseGridComponent implements OnInit {

  rows = [
  ];

  temp = [];
  columns = [
    { prop: 'Id' },
    { name: 'Nome' },
    { name: 'Descrição' }
  ];

  reserv = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {

    this.exerciseService.getExercises()
      .subscribe(result => {
        result.forEach(ex => {
          this.rows.push({ id: ex.id, name: ex.name, description: ex.name });
        });

      }, error => console.log(error));
      
      this.reserv = this.rows;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    if (val !== '') {
      this.rows = this.reserv;
      const temp = this.rows.filter(function (d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        // Whenever the filter changes, always go back to the first page
      });
      this.rows = temp;
      this.table.offset = 0;
    } else {
      this.rows = this.reserv;
      this.table.offset = 0;
    }
    // filter our data



  }

}
