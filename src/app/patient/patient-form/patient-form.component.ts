import { Component, OnInit } from '@angular/core';
import Patient from 'src/app/model/patient.model';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  patient: Patient = new Patient();
  isEdit = false;
  dateAux;

  constructor(private patientService: PatientService, private route: ActivatedRoute,
    private utilService: UtilService) { }

  ngOnInit() {

    const cpf = this.route.snapshot.params.cpf;
    if (cpf) {
      this.patientService.getPatientByCpf(cpf)
        .subscribe(result => {
          this.isEdit = true;
          this.patient = result;  
          this.dateAux =  `${this.patient.birthOfDate}`.split(`T`)[0];
        }, error => console.log(error));
    }

  }

  getTitlePatient() {
    return this.isEdit ? 'Atualizar paciente' : 'Cadastrar paciente';
  }

  savePatient() {
    this.patientService.saveOrUpdatePatient(this.patient, this.isEdit)
      .subscribe(result => {
        this.utilService.succesMessage(`O paciente ${result.fullName} foi salvo com sucesso.`);
        this.patient = new Patient();
        this.dateAux = undefined;
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
