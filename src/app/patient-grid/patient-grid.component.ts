import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-patient-grid',
  templateUrl: './patient-grid.component.html',
  styleUrls: ['./patient-grid.component.css']
})
export class PatientGridComponent implements AfterViewChecked {

  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];

  temp = [];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  reserv = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private exerciseService: ExerciseService) { }

  ngAfterViewChecked(): void {
    this.exerciseService.getExercises()
      .subscribe(result => {
        result.forEach(ex => {
          this.rows.push({ name: 'teste', gender: 'e', company: 'ee' });
          this.reserv = this.rows;
        });

      }, error => console.log(error));
    
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
