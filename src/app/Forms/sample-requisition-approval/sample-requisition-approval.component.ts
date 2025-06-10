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
  CYCLE_NO: any;
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
  PERIOD_LIST: any = [];
  UserDetail: any = {};
  USER_ID: any;
  USER_NAME: any;
  SAMPLE_REQUISITION_LIST: any = [];
  TRXN_ID: any;

  constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.UserDetail = this.authService.getUserDetail();
    this.USER_ID = JSON.parse(this.UserDetail).USER_ID;
    this.USER_NAME = JSON.parse(this.UserDetail).USER_NAME;
    this.GETSAMPLEREQUISITIONMASTERLIST();
  }

  GETSAMPLEREQUISITIONMASTERLIST() {
    let data = {
      "USER_ID": this.USER_ID,
      "FYEAR": "2025"
    }
    this.http.postnew(this.url.GETSAMPLEREQUISITIONMASTERLIST, data).then(
      (res: any) => {
        this.PERIOD_LIST = res.PERIOD_LIST;
      });
  }

  GETSAMPLEREQUISITIONLISTBYCYCLEID(id: any) {
    let data = {
      "USER_ID": this.USER_ID,
      "CYCLE_ID": id
    }
    this.http.postnew(this.url.GETSAMPLEREQUISITIONLISTBYCYCLEID, data).then(
      (res: any) => {
        this.SAMPLE_REQUISITION_LIST = res.SAMPLE_REQUISITION_LIST;
        this.TOTAL_TARGET = this.SAMPLE_REQUISITION_LIST[0].TOTAL_TARGET;
        this.MAX_SAMPEL_VALUE = this.SAMPLE_REQUISITION_LIST[0].MAX_SAMPLE_VALUE;
        this.REQ_VALUE = this.SAMPLE_REQUISITION_LIST[0].REQ_VALUE;
        this.TRXN_ID = this.SAMPLE_REQUISITION_LIST[0].TRXN_ID;
        this.SAMPLE_REQUISITION_LIST.forEach((element: any) => {
          this.REQ_VALUE = 0;
          let sampleCost = Number(element.SAMPLE_COST) || 0;
          element.HQ_QTY = element.REQUESTED_HQ_QTY;
          element.TOTAL_REQ = element.TOTAT_REQUESTED_QTY;
          element.REQ_VALUE = element.TOTAL_REQ * sampleCost;
          this.REQ_VALUE += element.REQ_VALUE;
        })
      });
  }

  Approved() {

  }



}
