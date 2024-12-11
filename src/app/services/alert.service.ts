import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  public showError(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    });
  }

  public showInfo(message: string): void {
    Swal.fire({
      icon: 'info',
      title: 'Information',
      text: message
    });
  }

  public showSuccess(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message
    });
  }
}
