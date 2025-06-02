import { Component, OnInit } from '@angular/core';
import { ToastrNotificationService } from 'src/app/Service/toastr-notification.service';

declare var $: any;
@Component({
  selector: 'app-company-master',
  templateUrl: './company-master.component.html',
  styleUrls: ['./company-master.component.css']
})
export class CompanyMasterComponent implements OnInit {
  disabled:boolean = false;
  activeIndex:number = 0;
  items = [
    {label: 'CREATE COMPANY ', routerLink: 'createcompany'},
    {label: 'GST NOS.', routerLink: 'gstnos'},
    {label: 'UNITS',routerLink: 'units'},
    {label: 'COMPANY FIN YEARS', routerLink: 'companyfinyear'},
    {label: 'COMPANY SETTINGS', routerLink: 'companysetting'}
];
  constructor(private toastrService:ToastrNotificationService) { }
  active = 1;
  ngOnInit(): void {
  }
  storeModalShow(){
    $('#storeModal').modal('show');
  }
  storeModalClose(){
    $('#storeModal').modal('hide');
  }
  saveForm(){
    this.toastrService.showError('Data not Submit', 'Please fill mandatory fields');
  }
  chan() {
    this.activeIndex += 1;
  }

}
