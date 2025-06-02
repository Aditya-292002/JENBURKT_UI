import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  COUNTRY = [];
  STATE=[];
  CITY=[];
  PIN_CODE=[];
  GST_NO=[];
  constructor() { }

  ngOnInit(): void {
  }
  storeModalShow(){
    $('#storeModal').modal('show');
  }
  storeModalClose(){
    $('#storeModal').modal('hide');
  }

}
