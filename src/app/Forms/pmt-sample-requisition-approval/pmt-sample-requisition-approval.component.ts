import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-pmt-sample-requisition-approval',
  templateUrl: './pmt-sample-requisition-approval.component.html',
  styleUrls: ['./pmt-sample-requisition-approval.component.css']
})
export class PMTSampleRequisitionApprovalComponent implements OnInit {
  @ViewChild('dt3') dt3: any;
  isLoaded: boolean = false;
  PREDEFINE_LIST_RANGE: any = [];
  INNER_PACK: any;
  PRODUCT: any;
  TOTAL_STOCK: any;
  TOTAL_REQUESTED_PACK_QTY: any;
  SAMPLE_REQUISITION_LIST: any = [];
  UserDetail: any = {};
  USER_ID: any;
  USER_NAME: any;
  PRODUCT_LIST: any = [];
  isProductList: boolean = false;
  isHqCodeList: boolean = false;
  HQ_CODE_LIST: any = [];
  SAMPLE_STATUS_LIST: any = [];
  STATUS_LIST: any = [];
  RSM_LIST: any = [];
  SAMPLE_RSM_LIST: any = [];
  SAMPLE_PRODUCT_LIST: any = [];
  DROPDOWN_PRODUCT_LIST: any = [];
  DROPDOWN_HQ_CODE_LIST: any = [];
  totalRecords: any;
  first: any;
  rowsPerPage: any;
  DATA_LIST: any = [];
  CYCLE_ID: any;
  TRXN_ID: any;
  isConformationPopup: boolean = false;
  DROPDOWN_POOL_LIST: any = [];
  DROPDOWN_FM_LIST: any = [];
  DROPDOWN_RSM_LIST: any = [];
  DROPDOWN_SM_LIST: any = [];
  SAMPLE_DROPDOWN_POOL_LIST: any = [];
  SAMPLE_DROPDOWN_FM_LIST: any = [];
  SAMPLE_DROPDOWN_RSM_LIST: any = [];
  SAMPLE_DROPDOWN_SM_LIST: any = [];
  SAMPLE_DROPDOWN_HQ_CODE_LIST: any = [];
  QTY: number = 0;
  isNextConformationPopup: boolean = false;
  QTY_LIST: any = [{
    "QTY_CODE": 1, "QTY_DESC": 'Increase'
  }, {
    "QTY_CODE": 2, "QTY_DESC": 'Decrease'
  }];
  QTY_CODE: any;

  constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.UserDetail = this.authService.getUserDetail();
    this.USER_ID = JSON.parse(this.UserDetail).USER_ID;
    this.USER_NAME = JSON.parse(this.UserDetail).USER_NAME;
    this.GETPMTSAMPLEREQUISITIONLISTBYUSERID();
  }

  GETPMTSAMPLEREQUISITIONLISTBYUSERID() {
    let data = {
      "USER_ID": this.USER_ID
    }
    this.http.postnew(this.url.GETPMTSAMPLEREQUISITIONLISTBYUSERID, data).then((res: any) => {
      this.SAMPLE_REQUISITION_LIST = res.SAMPLE_REQUISITION_LIST;
      this.CYCLE_ID = this.SAMPLE_REQUISITION_LIST[0].CYCLE_ID;
      this.TRXN_ID = this.SAMPLE_REQUISITION_LIST[0].TRXN_ID;
      this.STATUS_LIST = [];
      this.RSM_LIST = [];
      this.SAMPLE_STATUS_LIST = this.SAMPLE_REQUISITION_LIST.map((item: any) => ({
        STATUS: item.STATUS,
        STATUS_DESC: item.STATUS_DESC
      }));
      this.SAMPLE_RSM_LIST = this.SAMPLE_REQUISITION_LIST.map((item: any) => ({
        RSM_CODE: item.RSM_CODE,
        RSM_NAME: item.RSM_NAME
      }));
      const samplelist = [...new Set(this.SAMPLE_STATUS_LIST.map((item: any) => item.STATUS_DESC))];
      samplelist.forEach((element: any) => {
        this.STATUS_LIST.push({ label: element, value: element })
      })
      const rsmlist = [...new Set(this.SAMPLE_RSM_LIST.map((item: any) => item.RSM_NAME))];
      rsmlist.forEach((element: any) => {
        this.RSM_LIST.push({ label: element, value: element })
      })
      this.isHqCodeList = false;
      this.isProductList = false;
    });
  }

  GETPRODUCTLISTBYTRXNID() {
    // this.TRXN_ID = data.TRXN_ID;
    let data1 = {
      "USER_ID": this.USER_ID,
      "CYCLE_ID": this.CYCLE_ID
      // "TRXN_ID": data.TRXN_ID
    }
    this.http.postnew(this.url.GETPRODUCTLISTBYTRXNID, data1).then((res: any) => {
      this.PRODUCT_LIST = res.PRODUCT_LIST;
      this.DROPDOWN_PRODUCT_LIST = [];
      this.SAMPLE_PRODUCT_LIST = this.PRODUCT_LIST.map((item: any) => ({
        SAMPLE_PRODUCT_CODE: item.SAMPLE_PRODUCT_CODE,
        PRODUCT_DESC: item.PRODUCT_DESC,
      }));
      const productlist = [...new Set(this.SAMPLE_PRODUCT_LIST.map((item: any) => item.PRODUCT_DESC))];
      productlist.forEach((element: any) => {
        this.DROPDOWN_PRODUCT_LIST.push({ label: element, value: element })
      })
      this.fetchData();
      this.isHqCodeList = false;
      this.isNextConformationPopup = false;
      this.isProductList = true;
    });
  }

  GETHQCODELISTBYPRODUCTCODE(data: any) {
    let data1 = {
      "USER_ID": this.USER_ID,
      "CYCLE_ID": this.CYCLE_ID,
      "SAMPLE_PRODUCT_CODE": data.SAMPLE_PRODUCT_CODE
    }
    this.http.postnew(this.url.GETHQCODELISTBYPRODUCTCODE, data1).then((res: any) => {
      this.HQ_CODE_LIST = res.HQ_CODE_LIST;
      this.DATA_LIST = res.DATA_LIST;
      this.PRODUCT = this.DATA_LIST[0].SAMPLE_PRODUCT_DESCRIPTION;
      this.INNER_PACK = this.DATA_LIST[0].INNER_PACK;
      this.TOTAL_STOCK = this.DATA_LIST[0].STOCK;
      this.TOTAL_REQUESTED_PACK_QTY = this.DATA_LIST[0].TOTAL_REQUESTED_PACK_QTY;
      this.DROPDOWN_POOL_LIST = [];
      this.DROPDOWN_FM_LIST = [];
      this.DROPDOWN_RSM_LIST = [];
      this.DROPDOWN_SM_LIST = [];
      this.DROPDOWN_HQ_CODE_LIST = [];
      this.SAMPLE_DROPDOWN_HQ_CODE_LIST = [];
      this.SAMPLE_DROPDOWN_POOL_LIST = [];
      this.SAMPLE_DROPDOWN_FM_LIST = [];
      this.SAMPLE_DROPDOWN_RSM_LIST = [];
      this.SAMPLE_DROPDOWN_SM_LIST = [];
      this.SAMPLE_DROPDOWN_HQ_CODE_LIST = this.HQ_CODE_LIST.map((item: any) => ({
        HQ_DESC: item.HQ_DESC,
        HQ_CODE: item.HQ_CODE
      }));
      const hqcodelist = [...new Set(this.HQ_CODE_LIST.map((item: any) => item.HQ_DESC))];
      hqcodelist.forEach((element: any) => {
        this.DROPDOWN_HQ_CODE_LIST.push({ label: element, value: element })
      })
      this.SAMPLE_DROPDOWN_POOL_LIST = this.HQ_CODE_LIST.map((item: any) => ({
        POOL_DESC: item.POOL_DESC
      }));
      const poollist = [...new Set(this.HQ_CODE_LIST.map((item: any) => item.POOL_DESC))];
      poollist.forEach((element: any) => {
        this.DROPDOWN_POOL_LIST.push({ label: element, value: element })
      })
      this.SAMPLE_DROPDOWN_FM_LIST = this.HQ_CODE_LIST.map((item: any) => ({
        FM_NAME: item.FM_NAME
      }));
      const fmlist = [...new Set(this.HQ_CODE_LIST.map((item: any) => item.FM_NAME))];
      fmlist.forEach((element: any) => {
        this.DROPDOWN_FM_LIST.push({ label: element, value: element })
      })
      this.SAMPLE_DROPDOWN_RSM_LIST = this.HQ_CODE_LIST.map((item: any) => ({
        RSM_NAME: item.RSM_NAME
      }));
      const rsmlist = [...new Set(this.HQ_CODE_LIST.map((item: any) => item.RSM_NAME))];
      rsmlist.forEach((element: any) => {
        this.DROPDOWN_RSM_LIST.push({ label: element, value: element })
      })
      this.SAMPLE_DROPDOWN_SM_LIST = this.HQ_CODE_LIST.map((item: any) => ({
        SM_NAME: item.SM_NAME
      }));
      const smlist = [...new Set(this.HQ_CODE_LIST.map((item: any) => item.SM_NAME))];
      smlist.forEach((element: any) => {
        this.DROPDOWN_SM_LIST.push({ label: element, value: element })
      })
      this.isProductList = false;
      this.isHqCodeList = true;
    });
  }

  GETPMTCALCULATEPACKQTYBYPOOLCODE(data: any) {
    this.HQ_CODE_LIST.forEach((element: any) => {
      if (element.HQ_CODE == data.HQ_CODE) {
        element.HQ_QTY = element.REQUESTED_PACK_QTY * this.INNER_PACK
      }
    });
    let data1 = {
      USER_ID: this.USER_ID,
      TRXN_ID: data.TRXN_ID,
      HQ_CODE: data.HQ_CODE,
      POOL_CODE: data.POOL_CODE,
      SAMPLE_PRODUCT_CODE: data.SAMPLE_PRODUCT_CODE,
      REQUESTED_PACK_QTY: data.REQUESTED_PACK_QTY,
      HQ_QTY: data.HQ_QTY
    }
    // console.log(' data1 ->', JSON.stringify(data1))
    // return
    this.http.postnew(this.url.GETPMTCALCULATEPACKQTYBYPOOLCODE, data1).then((res: any) => {
      if (res.data[0].FLAG == 1) {
        this.TOTAL_REQUESTED_PACK_QTY = res.data[0].TOTAL_REQUESTED_PACK_QTY;
        // this.toastrService.success(res.data[0].MSG);
      } else if (res.data[0].FLAG == 0) {
        // this.toastrService.error(res.data[0].MSG);
      }
    });
  }

  SAVEPMTSAMPLEREQUISITIONDATA() {
    let data = {
      "USER_ID": this.USER_ID,
      "CYCLE_ID": this.CYCLE_ID,
      "TRXN_ID": this.TRXN_ID
    }
    this.http.postnew(this.url.SAVEPMTSAMPLEREQUISITIONDATA, data).then((res: any) => {
      if (res.data[0].FLAG == 1) {
        this.toastrService.success(res.data[0].MSG);
        this.GETPMTSAMPLEREQUISITIONLISTBYUSERID();
        this.isProductList == false
        this.isHqCodeList == false
      } else if (res.data[0].FLAG == 0) {
        this.toastrService.error(res.data[0].MSG);
      }
    });
  }

  Next() {
    console.log(' SAMPLE_REQUISITION_LIST -> ', this.SAMPLE_REQUISITION_LIST)
  }

  Back() {
    let data = {
      "TRXN_ID": this.TRXN_ID
    }
    this.GETPRODUCTLISTBYTRXNID();
    this.isProductList == true
    this.isHqCodeList == false
  }

  Back1() {
    this.GETPMTSAMPLEREQUISITIONLISTBYUSERID();
    this.isProductList == false
    this.isHqCodeList == false
  }

  fetchData() {
    this.totalRecords = this.PRODUCT_LIST.length;
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rowsPerPage = event.rows;
    this.fetchData();
  }

  OpenConformationPopup() {
    this.isConformationPopup = true;
  }

  CancelConformationPopup() {
    this.isConformationPopup = false;
  }

  OpenNextConformationPopup() {
    this.isNextConformationPopup = true;
  }

  CancelNextConformationPopup() {
    this.isNextConformationPopup = false;
  }

  Approve() {

  }

  increaseQty() {
    let qty = this.QTY
    this.QTY = (qty || 0) + 1;
  }

  decreaseQty() {
    let qty = this.QTY
    this.QTY = qty - 1;
  }

  UpdateReqInnerpack() {
    const filteredData = this.dt3.filteredValue || this.HQ_CODE_LIST;
    filteredData.forEach((element: any) => {
      const currentQty = element.REQUESTED_PACK_QTY;
      let newQty = currentQty;
      if (this.QTY_CODE == 1) {
        newQty += (+this.QTY); 
      } else if (this.QTY_CODE == 2) {
        newQty -= (+this.QTY);
      }
      if (newQty < 0) {
        newQty = 0;
      }
      element.REQUESTED_PACK_QTY = newQty;
      element.HQ_QTY = element.REQUESTED_PACK_QTY * this.INNER_PACK
    });
  }

}
