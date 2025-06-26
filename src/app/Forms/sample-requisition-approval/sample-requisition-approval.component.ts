import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-sample-requisition-approval',
  templateUrl: './sample-requisition-approval.component.html',
  styleUrls: ['./sample-requisition-approval.component.css']
})
export class SampleRequisitionApprovalComponent implements OnInit {
  @ViewChild('dt1') dt1: Table | undefined;
  RSM_CODE: any;
  CYCLE_NO: any;
  MAX_SAMPEL_VALUE: any;
  isShowSampleProductRangeList: boolean = false;
  PREDEFINE_LIST_RANGE: any = [];
  TOTAL_TARGET: any;
  PRODUCT_LIST: any = [];
  RANGE_CODE: any;
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
  CYCLE_ID: any;
  DATA_LIST: any = [];
  HQ_CODE_LIST: any = [];
  POOL_LIST: any = [];
  SAMPLE_POOL_LIST: any = [];
  SAMPLE_PRODUCT_LIST: any = [];
  isConformationPopup: boolean = false;
  RSM_NAME: any;
  isShowHqEditPopup: boolean = false;
  POOL_DESC: any;
  PRODUCT_DESCRIPTION: any;
  POOL_HQCOUNT: any;
  INNER_PACK: any;
  REQUESTED_PACK_QTY: any;
  REQUESTED_HQ_QTY: any;
  TOTAL_REQUESTED_QTY: any;
  TOTAL_VALUE: any;
  STATUS: any;
  totalRecords: number = 0;
  rowsPerPage: number = 5;
  first: number = 0;
  MASTER_LIST: any = [];
  TEMP_USER_ID: any;
  isDataPickUpPopup: boolean = false;
  isDataPickUpPopupMess: any;
  CYCLE_DESC: any;
  IS_DISABLED: boolean = false;
  IS_DRAFT: any;
  isDataPickUpPopup1: boolean = false;

  constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.TRXN_ID = localStorage.getItem('TRXN_ID');
    this.CYCLE_ID = localStorage.getItem('CYCLE_ID');
    this.TEMP_USER_ID = localStorage.getItem('USER_ID');
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
        this.GETSAMPLEREQUISITIONLISTBYTRXNID(this.TRXN_ID, this.CYCLE_ID, 0)
      });
  }

  GETSAMPLEREQUISITIONLISTBYTRXNID(TRXN_ID: any, CYCLE_ID: any, val: any) {
    let data = {
      "USER_ID": this.TEMP_USER_ID,
      "TRXN_ID": TRXN_ID,
      "CYCLE_ID": CYCLE_ID,
      "IS_TEMP": val
    }
    this.http.postnew(this.url.GETSAMPLEREQUISITIONLISTBYTRXNID, data).then(
      (res: any) => {
        this.MASTER_LIST = res.MASTER_LIST;
        this.REQ_VALUE = 0;
        this.MAX_SAMPEL_VALUE = 0;
        this.TOTAL_TARGET = 0;
        this.CYCLE_NO = this.MASTER_LIST[0].CYCLE_ID;
        this.TRXN_ID = this.MASTER_LIST[0].TRXN_ID;
        this.TOTAL_TARGET = this.MASTER_LIST[0].TOTAL_TARGET;
        this.MAX_SAMPEL_VALUE = this.MASTER_LIST[0].MAX_SAMPLE_VALUE;
        this.REQ_VALUE = this.MASTER_LIST[0].REQ_VALUE || 0;
        this.RSM_NAME = this.MASTER_LIST[0].USER_NAME;
        this.STATUS = this.MASTER_LIST[0].STATUS;
        if (this.STATUS == 'A' || this.STATUS == 'D') {
          this.IS_DISABLED = true;
        } else {
          this.IS_DISABLED = false;
        }
        this.CYCLE_DESC = this.MASTER_LIST[0].CYCLE_DESC;
        if (res.SAMPLE_REQUISITION_LIST.length == 1) {
          this.IS_DRAFT = res.SAMPLE_REQUISITION_LIST[0].IS_DRAFT;
          if (this.IS_DRAFT == 1) {
            this.isDataPickUpPopup = true;
            this.isDataPickUpPopupMess = res.SAMPLE_REQUISITION_LIST[0].MSG;
          } else if (this.IS_DRAFT == 0) {
            this.isDataPickUpPopup1 = true;
            this.isDataPickUpPopupMess = res.SAMPLE_REQUISITION_LIST[0].MSG;
          }
        } else {
          this.isDataPickUpPopup = false;
          this.isDataPickUpPopup1 = false;
          this.SAMPLE_REQUISITION_LIST = res.SAMPLE_REQUISITION_LIST;
          if (this.SAMPLE_REQUISITION_LIST.length > 0) {
            this.POOL_LIST = [];
            this.PRODUCT_LIST = [];
            this.SAMPLE_POOL_LIST = this.SAMPLE_REQUISITION_LIST.map((item: any) => ({
              POOL_CODE: item.POOL_CODE,
              POOL_DESC: item.POOL_DESC
            }));
            this.SAMPLE_PRODUCT_LIST = this.SAMPLE_REQUISITION_LIST.map((item: any) => ({
              SAMPLE_PRODUCT_CODE: item.SAMPLE_PRODUCT_CODE,
              PACK_INFO: item.PACK_INFO,
              DESCRIPTION: item.DESCRIPTION,
            }));

            const productlist = [...new Set(this.SAMPLE_PRODUCT_LIST.map((item: any) => item.DESCRIPTION))];
            productlist.forEach((element: any) => {
              this.PRODUCT_LIST.push({ label: element, value: element })
            })
            const poollist = [...new Set(this.SAMPLE_POOL_LIST.map((item: any) => item.POOL_DESC))];
            poollist.forEach((element: any) => {
              this.POOL_LIST.push({ label: element, value: element })
            })
            this.dt1.clear();
          } else {
            this.POOL_LIST = [];
            this.PRODUCT_LIST = [];
          }
        }
      });
  }

  GETHQCODELISTBYPOOLCODE(data: any) {
    // if (data.HQ_UPDATED == 0 || data.HQ_UPDATED == null || data.HQ_UPDATED == undefined) {
    //   return
    // }

    let Qty = data.HQ_QTY;
    this.POOL_DESC = data.POOL_DESC;
    this.PRODUCT_DESCRIPTION = data.DESCRIPTION;
    this.POOL_HQCOUNT = data.POOL_HQCOUNT;
    this.INNER_PACK = data.INNER_PACK;
    let data1 = {
      "TRXN_ID": this.TRXN_ID,
      "POOL_CODE": data.POOL_CODE,
      "SAMPLE_PRODUCT_CODE": data.SAMPLE_PRODUCT_CODE
    }
    this.http.postnew(this.url.GETHQCODELISTBYPOOLCODE, data1).then(
      (res: any) => {
        this.HQ_CODE_LIST = [];
        this.HQ_CODE_LIST = res.HQ_CODE_LIST;
        this.fetchData();
        this.isShowHqEditPopup = true;
      });
  }

  fetchData() {
    this.totalRecords = this.HQ_CODE_LIST.length;
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rowsPerPage = event.rows;
    this.fetchData();
  }

  GETSMCALCULATEPACKQTYBYPOOLCODE(data: any) {
    let POOL_CODE = data.POOL_CODE;
    let SAMPLE_PRODUCT_CODE = data.SAMPLE_PRODUCT_CODE;
    this.SAMPLE_REQUISITION_LIST.forEach((element: any) => {
      if (POOL_CODE == element.POOL_CODE && SAMPLE_PRODUCT_CODE == element.SAMPLE_PRODUCT_CODE) {
        let packQty = Number(element.REQUESTED_PACK_QTY) || 0;
        let innerpack = Number(element.INNER_PACK) || 0;
        let poolcount = Number(element.POOL_HQCOUNT) || 0;
        let sampleCost = Number(element.SAMPLE_COST) || 0;
        element.REQUESTED_HQ_QTY = packQty * innerpack;
        element.TOTAL_REQUESTED_QTY = element.REQUESTED_HQ_QTY * poolcount;
        let REQ_VALUE = element.TOTAL_REQUESTED_QTY * sampleCost;
        element.REQ_VALUE = Number(REQ_VALUE.toFixed(1));
      }
    });

    let data1 = {
      USER_ID: data.USER_ID,
      TRXN_ID: data.TRXN_ID,
      POOL_CODE: data.POOL_CODE,
      SAMPLE_PRODUCT_CODE: data.SAMPLE_PRODUCT_CODE,
      SM_REQUESTED_PACK_QTY: data.REQUESTED_PACK_QTY,
      HQ_QTY: data.REQUESTED_HQ_QTY,
      TOTAL_REQ: data.TOTAL_REQUESTED_QTY,
      REQ_VALUE: data.REQ_VALUE
    }
    // console.log(' data1 ->' , data1)
    // return
    this.http.postnew(this.url.GETSMCALCULATEPACKQTYBYPOOLCODE, data1).then((res: any) => {
      this.DATA_LIST = res.DATA_LIST;
      this.REQ_VALUE = Number(this.DATA_LIST[0].TOTAL_VALUE.toFixed(2));
    });
  }

  CalculateHqPackQty(data: any) {
    let POOL_CODE = data.POOL_CODE;
    let SAMPLE_PRODUCT_CODE = data.SAMPLE_PRODUCT_CODE;
    this.HQ_CODE_LIST.forEach((element: any) => {
      if (POOL_CODE == element.POOL_CODE && SAMPLE_PRODUCT_CODE == element.SAMPLE_PRODUCT_CODE) {
        let packQty = Number(element.REQUESTED_PACK_QTY) || 0;
        let innerpack = Number(element.INNER_PACK) || 0;
        element.HQ_QTY = packQty * innerpack;
      }
    });
  }

  APPROVEDSAMPLEREQUISITION() {
    let data = {
      "USER_ID": this.USER_ID,
      "CYCLE_ID": this.CYCLE_NO,
      "TRXN_ID": this.TRXN_ID,
      "RSM_CODE": this.USER_NAME
    }
    this.http.postnew(this.url.APPROVEDSAMPLEREQUISITION, data).then((res: any) => {
      if (res.DATA_LIST[0].FLAG == 1) {
        this.toastrService.success(res.DATA_LIST[0].MSG);
        this.isConformationPopup = false;
        this.router.navigate(["/samplerequisitionlist"]);
      } else if (res.DATA_LIST[0].FLAG == 0) {
        this.toastrService.error(res.DATA_LIST[0].MSG);
        this.isConformationPopup = false;
        this.router.navigate(["/samplerequisitionlist"]);
      }
    });
  }

  OpenConformationPopup() {
    this.isConformationPopup = true;
  }

  Cancel() {
    this.HQ_CODE_LIST = [];
    this.isShowHqEditPopup = false;
  }

  CancelConformationPopup() {
    this.isConformationPopup = false;
  }

  onEditListClick() {
    this.router.navigate(["/samplerequisitionlist"]);
  }

  SAVEHQCODEBYPOOLCODE() {
    // for (const element of this.HQ_CODE_LIST) {
    //   if (!this.SharedService.isValid(element.REMARKS)) {
    //     this.toastrService.error('Enter a Remarks');
    //     return;
    //   }
    // }
    this.REQUESTED_PACK_QTY = 0;
    this.REQUESTED_HQ_QTY = 0;
    this.TOTAL_REQUESTED_QTY = 0;
    this.TOTAL_VALUE = 0;
    let INNER_HQ_MATCH = 1
    let INNER_HQ_QTY: number = -1
    this.HQ_CODE_LIST.forEach((element: any) => {
      this.SAMPLE_REQUISITION_LIST.forEach((item: any) => {
        if (item.POOL_CODE == element.POOL_CODE && item.SAMPLE_PRODUCT_CODE == element.SAMPLE_PRODUCT_CODE) {
          if (INNER_HQ_QTY == -1) {
            INNER_HQ_QTY = Number(element.REQUESTED_PACK_QTY) || 0
          }
          if (INNER_HQ_QTY != Number(element.REQUESTED_PACK_QTY)) {
            INNER_HQ_MATCH = 0;
          }
          //this.REQUESTED_PACK_QTY += Number(element.REQUESTED_PACK_QTY) || 0;
          this.TOTAL_REQUESTED_QTY += Number(element.REQUESTED_PACK_QTY) * Number(element.INNER_PACK);
          if (INNER_HQ_MATCH == 1) {
            this.REQUESTED_PACK_QTY = INNER_HQ_QTY;
          }
          else {
            this.REQUESTED_PACK_QTY = 0;
          }
          let innerpack = Number(element.INNER_PACK) || 0;
          let poolcount = Number(element.POOL_HQCOUNT) || 0;
          let sampleCost = Number(item.SAMPLE_COST) || 0;
          this.REQUESTED_HQ_QTY = this.REQUESTED_PACK_QTY * innerpack;
          let REQ_VALUE = this.TOTAL_REQUESTED_QTY * sampleCost;
          this.TOTAL_VALUE = Number(REQ_VALUE.toFixed(1));
          item.REQUESTED_PACK_QTY = this.REQUESTED_PACK_QTY;
          item.REQUESTED_HQ_QTY = this.REQUESTED_PACK_QTY * innerpack;
          item.TOTAL_REQUESTED_QTY = this.TOTAL_REQUESTED_QTY;
          item.TOTAL_VALUE = this.TOTAL_VALUE;
          item.REQ_VALUE = this.TOTAL_VALUE;
          item.HQ_UPDATED = 1;
        }
      });
    });

    let data = {
      USER_ID: this.USER_ID,
      TRXN_ID: this.TRXN_ID,
      CYCLE_ID: this.CYCLE_NO,
      REQUESTED_PACK_QTY: this.REQUESTED_PACK_QTY,
      REQUESTED_HQ_QTY: this.REQUESTED_HQ_QTY,
      TOTAL_REQUESTED_QTY: this.TOTAL_REQUESTED_QTY,
      TOTAL_VALUE: this.TOTAL_VALUE,
      HQ_CODE_LIST: this.HQ_CODE_LIST,
      HQ_UPDATED: 1,
      SM_UPDATED: 1
    }
    // console.log(' data -> ' , JSON.stringify(data))
    // return
    this.http.postnew(this.url.SAVEHQCODEBYPOOLCODE, data).then((res: any) => {
      this.DATA_LIST = res.DATA_LIST;
      this.REQ_VALUE = Number(this.DATA_LIST[0].FINAL_TOTAL_VALUE.toFixed(2));
      this.isShowHqEditPopup = false;
      this.HQ_CODE_LIST = [];
    });
  }

  CloseisDataPickUpPopup1(){
    this.router.navigate(["/samplerequisitionlist"]);
  }

  EXCELDOWNLOAD(){
    
  }

}
