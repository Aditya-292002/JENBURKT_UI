import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { CostFilterPipe, FilterPipe } from 'src/app/directive/filter.pipe';
import { FilterPipePipe } from 'src/app/Pipe/filter-pipe.pipe';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { PipeService } from 'src/app/Service/pipe.service';
import { SharedService } from 'src/app/Service/shared.service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-sample-requisition',
  templateUrl: './sample-requisition.component.html',
  styleUrls: ['./sample-requisition.component.css']
})
export class SampleRequisitionComponent implements OnInit {
  @ViewChild('dt1') dt1: Table | undefined;
  SAMPLE_LIST = [{ "CODE": 0, "SAMPLE_DESC": "All" }, { "CODE": 1, "SAMPLE_DESC": "Product" }, { "CODE": 2, "SAMPLE_DESC": "Pool" }];
  isHighLightRsm: string = "No";
  isHighLightPeriod: string = "No";
  isHighLightTotalTarget: string = "No";
  isHighLightMaxSampleValue: string = "No";
  isHighLightReqValue: string = "No";
  isHighLightFrom: string = "No";
  isHighLightTo: string = "No";
  isHighLightSample: string = "No";
  isHighLightPool: string = "No";
  RSM_CODE: any;
  CODE: any;
  PERIOD: any;
  MAX_SAMPEL_VALUE: any;
  isShowSampleProductRangeList: boolean = false;
  SAMPLE_REQUISITION_LIST: any = [];
  SAMPLE_POOL_LIST: any = [];
  TOTAL_TARGET: any;
  RANGE_CODE: any;
  isShowEditPopup: boolean = false;
  isLoaded: boolean = false;
  FROM_RANGE: any;
  TO_RANGE: any;
  REQ_VALUE: any;
  SAMPLE_PRODUCT_LIST: any = [];
  POOL_LIST: any = [];
  SAMPLE_CODE: any;
  PERIOD_LIST: any = [];
  CYCLE_NO: any;
  UserDetail: any = {};
  USER_ID: any;
  PRODUCT_LIST: any = [];
  isShowHqEditPopup: boolean = false;
  HQ_CODE_LIST: any = [];
  USER_NAME: any;
  TRXN_ID: any;
  DATA_LIST: any = [];
  POOL_DESC: any;
  PRODUCT_DESCRIPTION: any;
  POOL_HQCOUNT: any;
  REQUESTED_PACK_QTY: any;
  REQUESTED_HQ_QTY: any;
  TOTAL_REQUESTED_QTY: any;
  TOTAL_VALUE: any;
  SAMPLE_PRODUCT_CODE: any;
  POOL_CODE: any;
  MASTER_LIST: any = [];
  HQ_QTY: any;
  INNER_PACK: any;
  isConformationPopup: boolean = false;
  isDataPickUpPopup: boolean = false;
  isDataPickUpPopupMess: any;
  STATUS: any;
  totalRecords: number = 0;
  rowsPerPage: number = 5;
  first: number = 0;
  IS_DISABLED: boolean = false;

  constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService, private SharedService: SharedService, datepipe: DatePipe,
    private router: Router) { }

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
        this.CYCLE_NO = res.DATA_LIST[0].CYCLE_ID;
        this.TRXN_ID = res.DATA_LIST[0].TRXN_ID;
        this.GETSAMPLEREQUISITIONLISTBYCYCLEID(this.TRXN_ID, this.CYCLE_NO, 0);
      });
  }

  GETSAMPLEREQUISITIONLISTBYCYCLEID(TRXN_ID: any, CYCLE_NO: any, val: any) {
    let data = {
      "USER_ID": this.USER_ID,
      "TRXN_ID": TRXN_ID,
      "CYCLE_ID": CYCLE_NO,
      "IS_TEMP": val
    }
    this.http.postnew(this.url.GETSAMPLEREQUISITIONLISTBYCYCLEID, data).then(
      (res: any) => {
        this.MASTER_LIST = res.MASTER_LIST;
        this.REQ_VALUE = 0;
        this.MAX_SAMPEL_VALUE = 0;
        this.TOTAL_TARGET = 0;
        this.CYCLE_NO = this.MASTER_LIST[0].CYCLE_ID;
        this.TOTAL_TARGET = this.MASTER_LIST[0].TOTAL_TARGET;
        this.MAX_SAMPEL_VALUE = this.MASTER_LIST[0].MAX_SAMPLE_VALUE;
        this.REQ_VALUE = this.MASTER_LIST[0].REQ_VALUE || 0;
        this.TRXN_ID = this.MASTER_LIST[0].TRXN_ID;
        this.STATUS = this.MASTER_LIST[0].STATUS;
        if (this.STATUS == 'S' || this.STATUS == 'A') {
          this.IS_DISABLED = true;
        } else {
          this.IS_DISABLED = false;
        }
        if (res.SAMPLE_REQUISITION_LIST.length === 1) {
          this.isDataPickUpPopup = true;
          this.isDataPickUpPopupMess = res.SAMPLE_REQUISITION_LIST[0].MSG;
        } else {
          this.isDataPickUpPopup = false;
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
            this.clearForm();
          }
        }

      });
  }

  SAVESAMPLEREQUISITION(val: any) {
    if (!this.SharedService.isValid(this.CYCLE_NO)) {
      this.toastrService.error('Select a Period');
      return
    }
    // if (!this.SharedService.isValid(this.TOTAL_TARGET)) {
    //   this.toastrService.error('Enter a Total Target');
    //   return
    // }
    // if (!this.SharedService.isValid(this.MAX_SAMPEL_VALUE)) {
    //   this.toastrService.error('Enter a Max Sample Value');
    //   return
    // }
    // if (!this.SharedService.isValid(this.REQ_VALUE)) {
    //   this.toastrService.error('Enter a Req. Value');
    //   return
    // }
    if (this.REQ_VALUE == 0) {
      this.toastrService.error('Enter Req. inner pack');
      return
    }
    if (this.MAX_SAMPEL_VALUE < this.REQ_VALUE) {
      this.toastrService.error('Req. value should not be grater than max sample value');
      return
    }
    let data = {
      "USER_ID": this.USER_ID,
      "CYCLE_ID": this.CYCLE_NO,
      "TRXN_ID": this.TRXN_ID,
      "RSM_CODE": this.USER_NAME,
      "IS_DRAFT": val
    }
    // console.log('data ->', JSON.stringify(data))
    // return
    this.http.postnew(this.url.SAVESAMPLEREQUISITION, data).then((res: any) => {
      if (res.data[0].FLAG == 1) {
        this.STATUS = res.data[0].STATUS;
        if (this.STATUS == 'S' || this.STATUS == 'A') {
          this.IS_DISABLED = true;
        } else {
          this.IS_DISABLED = false;
        }
        this.toastrService.success(res.data[0].MSG);
        this.isConformationPopup = false;
      } else if (res.data[0].FLAG == 0) {
        this.STATUS = res.data[0].STATUS;
        if (this.STATUS == 'S' || this.STATUS == 'A') {
          this.IS_DISABLED = true;
        } else {
          this.IS_DISABLED = false;
        }
        this.toastrService.error(res.data[0].MSG);
        this.isConformationPopup = false;
      }
    });
  }

  GETHQCODELISTBYPOOLCODE(data: any) {
    //  if (data.HQ_UPDATED == 0 || data.HQ_UPDATED == null || data.HQ_UPDATED == undefined) {
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
      "SAMPLE_PRODUCT_CODE": data.SAMPLE_PRODUCT_CODE,
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

  loadDataLazily(e: any) {
    // sessionStorage.setItem("filter",JSON.stringify(e));
    // if(this.cachedTableEvent){
    //     e = this.cachedTableEvent;
    //   this.cachedTableEvent = null;
    // }
    // console.log( this.cachedTableEvent,"cache")
  }

  clearForm() {
    this.TOTAL_TARGET = "";
    this.MAX_SAMPEL_VALUE = "";
    this.REQ_VALUE = "";
    this.dt1.clear()
  }

  clear(table: Table) {
    sessionStorage.removeItem("statedemo-session3")
    this.dt1.clear()
  }

  GETCALCULATEHQQTY(rowData: any) {
    let POOL_CODE = rowData.POOL_CODE;
    this.SAMPLE_REQUISITION_LIST.forEach((element: any) => {
      if (POOL_CODE == element.POOL_CODE) {
        element.HQ_QTY = rowData.HQ_QTY
      }
    })
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
          //this.TOTAL_REQUESTED_QTY = this.REQUESTED_HQ_QTY * poolcount;
          let REQ_VALUE = this.TOTAL_REQUESTED_QTY * sampleCost;
          this.TOTAL_VALUE = Number(REQ_VALUE.toFixed(1));


          // console.log(' element -> ' , element)
          // console.log(' item -> ' , item)
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
      SM_UPDATED: 0
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

  Cancel() {
    this.isShowHqEditPopup = false;

  }

  GETCALCULATEPACKQTYBYPOOLCODE(data: any) {
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
      USER_ID: this.USER_ID,
      TRXN_ID: data.TRXN_ID,
      POOL_CODE: data.POOL_CODE,
      SAMPLE_PRODUCT_CODE: data.SAMPLE_PRODUCT_CODE,
      REQUESTED_PACK_QTY: data.REQUESTED_PACK_QTY,
      HQ_QTY: data.REQUESTED_HQ_QTY,
      TOTAL_REQ: data.TOTAL_REQUESTED_QTY,
      REQ_VALUE: data.REQ_VALUE
    }
    // console.log(' data1 ->' , data1)
    // return
    this.http.postnew(this.url.GETCALCULATEPACKQTYBYPOOLCODE, data1).then((res: any) => {
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

  OpenConformationPopup() {
    this.isConformationPopup = true;
  }

  CancelConformationPopup() {
    this.isConformationPopup = false;
  }

}



