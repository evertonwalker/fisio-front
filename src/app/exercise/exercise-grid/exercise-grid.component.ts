import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../../model/exercise.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExerciseService } from 'src/app/exercise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise-grid',
  templateUrl: './exercise-grid.component.html',
  styleUrls: ['./exercise-grid.component.css'],
  providers: [ExerciseService]
})
export class ExerciseGridComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<Exercise>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private exerciseService: ExerciseService, private router: Router) { }

  ngOnInit() {
    this.exerciseService.getExercises()
      .subscribe(result => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editExercise(id: number) {
    this.exerciseService.getExerciseById(id)
      .subscribe(result => {
        if (result) {
          this.router.navigateByUrl(`/form-exercise/${id}`);
        }
      })
  }

  deleteExercise(id: number) {
    this.exerciseService.deleteExercise(id)
      .subscribe(result => {
        console.log(result);
        this.dataSource.data.splice(id, 1);
      }, error => console.log(error))
  }

}


