import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../../model/exercise.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-exercise-grid',
  templateUrl: './exercise-grid.component.html',
  styleUrls: ['./exercise-grid.component.css'],
  providers: [ExerciseService]
})
export class ExerciseGridComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<Exercise>;
  showLoading = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private exerciseService: ExerciseService, private router: Router, private notificationService: NotificationsService) { }

  ngOnInit() {
    this.exerciseService.getExercises()
      .subscribe(result => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showLoading = false;
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
      .subscribe(() => {
        this.notificationService.success('Alerta', 'Exercício removido com sucesso', {
          timeOut: 4000,
        });

        let array = this.dataSource.data;
        let findItem = array.findIndex(i => i.id === id);
        array.splice(findItem, 1);
        this.dataSource = new MatTableDataSource<Exercise>(array);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }, error => console.log(error))
  }

}


