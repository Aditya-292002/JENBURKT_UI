import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recovery-cme',
  templateUrl: './recovery-cme.component.html',
  styleUrls: ['./recovery-cme.component.css']
})
export class RecoveryCmeComponent implements OnInit {

  
  CME_NO:any;
  DATE:any;
  REQ_BY:any;
  HQ_CODE:any;
  CME_TYPE:any;
  CAMP_TYPE:any;
  AMOUNT:any;
  GST:any;
  OLD_PAID:any;
  OLD_TDS:any;
  OS:any;
  PAID_AMOUNT:any;
  PAY_MODE:any;
  REF:any;
  EXCESS:any;
  RECOVERY:any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
