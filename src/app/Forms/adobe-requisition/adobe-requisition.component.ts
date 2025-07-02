import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { SharedService } from 'src/app/Service/shared.service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-adobe-requisition',
  templateUrl: './adobe-requisition.component.html',
  styleUrls: ['./adobe-requisition.component.css']
})
export class AdobeRequisitionComponent implements OnInit {

  UserDetail: any = {};
  USER_ID: any;
  USER_NAME: any;
  isLoaded: boolean = false;
  ADOBE_REQUISITION_LIST: any = [];
  PERIOD_LIST: any = [];
  REQ_VALUE: any;
  MAX_SAMPEL_VALUE: any;
  TOTAL_TARGET: any;
  CYCLE_ID: any;
  totalRecords: any;
  first: any;
  rowsPerPage: any;
  DROPDOWN_PRODUCT_LIST: any = [];
  PRODUCT_LIST: any = [];
  SAMPLE_PRODUCT_LIST: any = [];
  MASTER_LIST: any = [];

  constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService, private SharedService: SharedService) { }

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
        this.CYCLE_ID = res.DATA_LIST[0].CYCLE_ID;
        this.GETPRODUCTLISTBYCYCLEID(this.CYCLE_ID)
      });
  }

  GETPRODUCTLISTBYCYCLEID(CYCLE_ID: any) {
    let data1 = {
      "USER_ID": this.USER_ID,
      "CYCLE_ID": CYCLE_ID
    }
    this.http.postnew(this.url.GETPRODUCTLISTBYCYCLEID, data1).then((res: any) => {
      this.PRODUCT_LIST = res.PRODUCT_LIST;
      this.MASTER_LIST = res.MASTER_LIST;
      this.REQ_VALUE = 0;
      this.MAX_SAMPEL_VALUE = 0;
      this.TOTAL_TARGET = 0;
      this.CYCLE_ID = this.MASTER_LIST[0].CYCLE_ID;
      this.TOTAL_TARGET = this.MASTER_LIST[0].TOTAL_TARGET;
      this.MAX_SAMPEL_VALUE = this.MASTER_LIST[0].MAX_SAMPLE_VALUE;
      this.REQ_VALUE = this.MASTER_LIST[0].REQ_VALUE || 0;
      this.DROPDOWN_PRODUCT_LIST = [];
      this.SAMPLE_PRODUCT_LIST = this.PRODUCT_LIST.map((item: any) => ({
        SAMPLE_PRODUCT_CODE: item.SAMPLE_PRODUCT_CODE,
        DESCRIPTION: item.DESCRIPTION,
      }));
      const productlist = [...new Set(this.SAMPLE_PRODUCT_LIST.map((item: any) => item.DESCRIPTION))];
      productlist.forEach((element: any) => {
        this.DROPDOWN_PRODUCT_LIST.push({ label: element, value: element })
      })
      this.fetchData();
    });
  }

  GETCALCULATEPACKQTYBYPOOLCODE(data: any) {
    let POOL_CODE = data.POOL_CODE;
    let SAMPLE_PRODUCT_CODE = data.SAMPLE_PRODUCT_CODE;
    this.PRODUCT_LIST.forEach((element: any) => {
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

  }

  fetchData() {
    this.totalRecords = this.PRODUCT_LIST.length;
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rowsPerPage = event.rows;
    this.fetchData();
  }


}
