import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import Schedule from 'src/app/model/schedule.model';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-schedules-grid',
  templateUrl: './schedules-grid.component.html',
  styleUrls: ['./schedules-grid.component.css']
})
export class SchedulesGridComponent implements OnInit {

  displayedColumns: string[] = ['fullName', 'startDate', 'endDate', 'actions'];
  dataSource: MatTableDataSource<Schedule>;
  showLoading = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private scheduleService: ScheduleService, private router: Router, private utilService: UtilService) { }

  ngOnInit() {
    this.scheduleService.getSchedules()
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

  editSchedule(id: number) {
    this.scheduleService.getScheduleById(id)
      .subscribe(result => {
        if (result) {
          this.router.navigateByUrl(`/form-schedule/${id}`);
        }
      })
  }

  deleteSchedule(id: number) {
    this.scheduleService.deleteSchedule(id)
      .subscribe(() => {
        this.utilService.succesMessage(`O Agendamento foi removido com sucesso.`);

        let array = this.dataSource.data;
        let findItem = array.findIndex(i => i.id === id);
        array.splice(findItem, 1);
        this.dataSource = new MatTableDataSource<Schedule>(array);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }, error => {
        console.log(error);
        if (error.status === 400) {
          this.utilService.getErrosBadRequest(error.error.errors);
        } else {
          this.utilService.getErrosRule(error.error.message);
        }

      });
  }

}
