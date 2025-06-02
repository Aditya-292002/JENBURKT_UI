import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-sample-requisition-approval',
  templateUrl: './sample-requisition-approval.component.html',
  styleUrls: ['./sample-requisition-approval.component.css']
})
export class SampleRequisitionApprovalComponent implements OnInit {

isHighLightRsm: string = "No";
  isHighLightPeriod: string = "No";
  isHighLightTotalTarget: string = "No";
  isHighLightMaxSampleValue: string = "No";
  isHighLightReqValue: string = "No";
  isHighLightFrom: string = "No";
  isHighLightTo: string = "No";
  RSM_CODE: any;
  PERIOD: any;
  MAX_SAMPEL_VALUE: any;
  isShowSampleProductRangeList: boolean = false;
  PREDEFINE_LIST_RANGE: any = [];
  TOTAL_TARGET: any;
  PRODUCT_LIST: any = [];
  RANGE_CODE: any;
  isShowEditPopup: boolean = false;
  isLoaded: boolean = false;
  FROM_RANGE: any;
  TO_RANGE: any;
  REQ_VALUE: any;

  constructor(private authService: AuthService, private url: URLService, private http: HttpService, 
    private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  Approved(){

  }

 
  
}
