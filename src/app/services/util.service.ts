import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private notificationService: NotificationsService) { }

  succesMessage(message) {
    this.notificationService.success('Sucesso', message, { timeOut: 4000 });
  }

  getErrosBadRequest(erros) {
    erros.forEach(i => {
      this.notificationService.error('Ocorreu um erro', i.defaultMessage, { timeOut: 5000 })
    });
  }

  getErrosRule(message) {
    this.notificationService.error('Ocorreu um erro', message, { timeOut: 5000 })
  }


}
