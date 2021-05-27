import { Inject, Injectable } from '@angular/core';
import { TYPE } from '../helpers/toastConstants';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor() {
   }

  toast(typeIcon = TYPE.SUCCESS, timerProgressBar: boolean = false,message:string = "welcome") {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 5000,
      title: message
    })
  }
}
