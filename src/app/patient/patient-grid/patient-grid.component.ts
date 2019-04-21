import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import Patient from '../../model/patient.model';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-patient-grid',
  templateUrl: './patient-grid.component.html',
  styleUrls: ['./patient-grid.component.css']
})
export class PatientGridComponent implements OnInit {

  displayedColumns: string[] = [ 'fullName', 'cellPhone', 'email', 'actions'];
  dataSource: MatTableDataSource<Patient>;
  showLoading = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private patientService: PatientService, private router: Router, private utilService: UtilService) { }

  ngOnInit() {
    this.patientService.getPatients()
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

  editPatient(cpf: string) {
    this.patientService.getPatientByCpf(cpf)
      .subscribe(result => {
        if (result) {
          this.router.navigateByUrl(`/form-patient/${cpf}`);
        }
      })
  }

  deletePatient(cpf: string) {
    this.patientService.deletePatient(cpf)
      .subscribe(() => {
        this.utilService.succesMessage(`O Paciente foi removido com sucesso.`);

        let array = this.dataSource.data;
        let findItem = array.findIndex(i => i.cpf === cpf);
        array.splice(findItem, 1);
        this.dataSource = new MatTableDataSource<Patient>(array);
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
