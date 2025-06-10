import { Component, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
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
  SAMPLE_POOL_LIST: any = [{
    "POOL_CODE": "ANBRP001",
    "POOL_DESC": "GAYA - 1",
  },
  {
    "POOL_CODE": "ANBRP002",
    "POOL_DESC": "BHAGALPUR",
  },
  {
    "POOL_CODE": "ANBRP003",
    "POOL_DESC": "BEGUSARAI",
  },
  {
    "POOL_CODE": "ANBRP004",
    "POOL_DESC": "PURNEA",
  },
  {
    "POOL_CODE": "ANBRP006",
    "POOL_DESC": "DARBHANGA+MADHUBANI 2",
  }];
  TOTAL_TARGET: any;
  RANGE_CODE: any;
  isShowEditPopup: boolean = false;
  isLoaded: boolean = false;
  FROM_RANGE: any;
  TO_RANGE: any;
  REQ_VALUE: any;
  SAMPLE_PRODUCT_LIST: any = [{
    "LINK_FG_CODE": "PS0000006",
    "SAMPLE_PRODUCT_CODE": "FG0000066",
    "PACK_INFO": "72 Strip",
    "RANGE_CODE": "1001",
    "DESCRIPTION": "ZIX Tablet PS",
  },
  {
    "LINK_FG_CODE": "PS0000007",
    "SAMPLE_PRODUCT_CODE": "FG0000067",
    "PACK_INFO": "12 Strip",
    "RANGE_CODE": "1002",
    "DESCRIPTION": "ZIX1 Tablet PS1",
  },
  {
    "LINK_FG_CODE": "PS0000008",
    "SAMPLE_PRODUCT_CODE": "FG0000068",
    "PACK_INFO": "24 Strip",
    "RANGE_CODE": "1003",
    "DESCRIPTION": "ZIX2 Tablet PS2",
  },
  {
    "LINK_FG_CODE": "PS0000009",
    "SAMPLE_PRODUCT_CODE": "FG0000069",
    "PACK_INFO": "74 Strip",
    "RANGE_CODE": "1004",
    "DESCRIPTION": "ZIX3 Tablet PS3",
  },
  {
    "LINK_FG_CODE": "PS0000009",
    "SAMPLE_PRODUCT_CODE": "FG0000069",
    "PACK_INFO": "37 Strip",
    "RANGE_CODE": "1004",
    "DESCRIPTION": "ZIX4 Tablet PS4",
  }];
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
  HQCOUNT: any;

  constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService, private SharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.UserDetail = this.authService.getUserDetail();
    this.USER_ID = JSON.parse(this.UserDetail).USER_ID;
    this.USER_NAME = JSON.parse(this.UserDetail).USER_NAME;
    // console.log('  JSON.parse(this.UserDetail) ->' ,  JSON.parse(this.UserDetail))
    this.GETSAMPLEREQUISITIONMASTERLIST();
    this.SAMPLE_REQUISITION_LIST.forEach((element: any) => {
      const hqQty = Number(element.HQ_QTY);
      const poolCount = Number(element.POOL_HQCOUNT);
      element.TOTAL_REQ = poolCount * hqQty;
      element.REQ_VALUE = element.TOTAL_REQ * Number(element.SAMPEL_COST);
    });
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
    const productlist = [...new Set(this.SAMPLE_PRODUCT_LIST.map((item: any) => item.DESCRIPTION))];
    productlist.forEach((element: any) => {
      this.PRODUCT_LIST.push({ label: element, value: element })
    })
    const poollist = [...new Set(this.SAMPLE_POOL_LIST.map((item: any) => item.POOL_DESC))];
    poollist.forEach((element: any) => {
      this.POOL_LIST.push({ label: element, value: element })
    })
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
          // this.CalculatePackQty(element.POOL_CODE);
        })
      });
  }

  SAVESAMPLEREQUISITION() {
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
      "TOTAL_TARGET": this.TOTAL_TARGET,
      "MAX_SAMPEL_VALUE": this.MAX_SAMPEL_VALUE,
      "REQ_VALUE": this.REQ_VALUE,
      "SAMPLE_REQUISITION_LIST": this.SAMPLE_REQUISITION_LIST
    }
    // console.log('data ->', JSON.stringify(data))
    // return
    this.http.postnew(this.url.SAVESAMPLEREQUISITION, data).then((res: any) => {
      if (res.data[0].FLAG == 1) {
        this.toastrService.success(res.data[0].MSG);
      } else if (res.data[0].FLAG == 0) {
        this.toastrService.error(res.data[0].MSG);
      }
    })
  }

  onEditListClick() {
    this.router.navigate(["/samplerequisitionlist"]);
  }

  GETHQCODELISTBYPOOLCODE(data: any) {
    let Qty = data.HQ_QTY;
    this.SAMPLE_REQUISITION_LIST.forEach((element: any) => {
      if (element.POOL_CODE == data.POOL_CODE) {
        this.HQ_CODE_LIST = element.HQ_CODE_DETAILS;
        this.HQ_CODE_LIST.forEach((element: any) => {
          element.HQ_QTY = Qty
        });
      }
    })
    this.isShowHqEditPopup = true;
    // let data1 = {
    //   "POOL_CODE": data.POOL_CODE
    // }
    // this.http.postnew(this.url.GETHQCODELISTBYPOOLCODE, data1).then(
    //   (res: any) => {
    //     this.HQ_CODE_LIST = res.HQ_CODE_LIST;
    //     this.HQ_CODE_LIST.forEach((element: any) => {
    //       element.HQ_QTY = Qty
    //     });
    //     this.isShowHqEditPopup = true;
    //   });
  }

  loadDataLazily(e: any) {
    // sessionStorage.setItem("filter",JSON.stringify(e));
    // if(this.cachedTableEvent){
    //     e = this.cachedTableEvent;
    //   this.cachedTableEvent = null;
    // }
    // console.log( this.cachedTableEvent,"cache")
  }

  ClosePopUp() {
    this.isShowHqEditPopup = false;
  }

  clearForm() {
    this.CYCLE_NO = "";
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

  Save() {
    for (const element of this.HQ_CODE_LIST) {
      if (!this.SharedService.isValid(element.REMARKS)) {
        this.toastrService.error('Enter a Remarks');
        return;
      }
    }
    this.HQCOUNT = 0;
    this.REQ_VALUE = 0;
    let POOL_CODE = this.HQ_CODE_LIST[0].POOL_CODE;
    this.HQ_CODE_LIST.forEach((element: any) => {
      this.HQCOUNT += (+element.HQ_QTY);
    });
    this.SAMPLE_REQUISITION_LIST.forEach((element: any) => {
      if (POOL_CODE == element.POOL_CODE) {
        let poolcount = Number(element.POOL_HQCOUNT) || 0;
        let sampleCost = Number(element.SAMPLE_COST) || 0;
        element.HQ_QTY = this.HQCOUNT;
        element.TOTAL_REQ = element.HQ_QTY * poolcount;
        element.REQ_VALUE = element.TOTAL_REQ * sampleCost;
        element.ReqInnerPackDisabled = true;
        this.REQ_VALUE += element.REQ_VALUE;
      }
    });
    this.isShowHqEditPopup = false;
  }

  Cancel() {
    this.isShowHqEditPopup = false;
  }

  CalculatePackQty(code: any) {
    let POOL_CODE = code;
    this.REQ_VALUE = 0;
    this.SAMPLE_REQUISITION_LIST.forEach((element: any) => {
      if (POOL_CODE == element.POOL_CODE) {
        let packQty = Number(element.REQUESTED_PACK_QTY) || 0;
        let innerpack = Number(element.INNER_PACK) || 0;
        let poolcount = Number(element.POOL_HQCOUNT) || 0;
        let sampleCost = Number(element.SAMPLE_COST) || 0;
        element.HQ_QTY = packQty * innerpack;
        element.TOTAL_REQ = element.HQ_QTY * poolcount;
        element.REQ_VALUE = element.TOTAL_REQ * sampleCost;
        this.REQ_VALUE += element.REQ_VALUE;
      }
    });
  }

}


