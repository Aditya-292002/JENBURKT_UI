import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrNotificationService {

  constructor(private toastr: ToastrService) { }

  showSucess(message: any,title: any){
    this.toastr.success(message,title)
  }
  showError(message: any, title: any){
      this.toastr.error(message, title)
  }
}
