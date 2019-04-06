import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../../model/exercise.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExerciseService } from 'src/app/exercise.service';

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


  constructor(private exerciseService: ExerciseService) { }

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
}


