import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { ToastrService } from 'ngx-toastr';
import { URLService } from 'src/app/Service/url.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-download-reports',
  templateUrl: './download-reports.component.html',
  styleUrls: ['./download-reports.component.css']
})
export class DownloadReportsComponent implements OnInit {
  LAST_DATE_ON = new Date();
  PERIOD=[];
  REPORT_NAME=[];
  periodList:any=[];
  reportList:any=[];
  downloadReportList:any=[];
  periodId:any;
  reportId:any;
  userInfo:any={};
  isLoaded:boolean=true;
  showGridData:any = [];
  v_data:any = {};
  x_data:any = {};
  // REPORT_LIST:any=[];
//   REPORT_LIST=[{"HQ_CODE":"BNBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
//   "RSM_CODE":"ANRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",}
// ,{"HQ_CODE":"BNBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
// "RSM_CODE":"BNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
// "RSM_CODE":"ANRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
// "RSM_CODE":"ANRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
// "RSM_CODE":"NNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
// "RSM_CODE":"FNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
// "RSM_CODE":"SNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
// "RSM_CODE":"GNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
// "RSM_CODE":"CNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
// "RSM_CODE":"UNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
// "RSM_CODE":"KNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
// "RSM_CODE":"JNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
// "RSM_CODE":"PNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
// "RSM_CODE":"ANRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
// "RSM_CODE":"ANRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",}]
  
constructor(private router: Router,private SharedService: SharedService,private AuthService: AuthService,
    private ToastrService: ToastrService,private url: URLService,private http: HttpService) { }

  ngOnInit(): void {
    this.getReportList();
  }
  getReportList() {
    this.userInfo = this.AuthService.getUserDetail();
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID
    }
    this.http.postnew(this.url.getDownloadReportList, data).then(
      (res:any)=>{
        console.log("response",res);
        this.periodList=res.periodlist;
        this.reportList=res.reportlist;
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  onViewDownloadReport(){
    this.DownloadReportList();
  }
  DownloadReportList() {
    this.isLoaded = false;
    this.userInfo = this.AuthService.getUserDetail();
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
      PERIOD_ID: (+this.periodId.PERIOD_ID),
      REPORT_ID:(+this.reportId.REPORT_ID),
    }
    console.log(data,"datas")
  
    this.http.postnew(this.url.getDownloadReport, data).then(
      (res:any)=>{
        console.log("response",res);
        this.downloadReportList = res.reportdata;
        this.exportExcel();
        this.isLoaded = true;
      //   // this.isExport = true;
      //   // console.log("response",res);
      //   // this.incentiveReportList=res;
      //   this.showGridData["GridList"] = [];
      //   this.showGridData["GridList"] = this.downloadReportList;
      //   // this.setValue = this.gridDataSetValue;
      //   // console.log("showGridData",this.showGridData);
      //   this.v_data["Headers"] = [];
      //   this.v_data["Field"] = [];
      //   this.showGridData["GridHeadersList"] =[];
      //   this.showGridData["SearchKey"] =[];
      //   this.showGridData.GridList.forEach((currentValue: any, index: any) => {
      //     let k = Object.keys(currentValue)[index];
      //     if(k != undefined){
      //       // console.log("Data", k);
      //       this.v_data["Headers"] = k;
      //       this.v_data["Field"] = k;
      //       this.showGridData["SearchKey"].push(k);
      //       this.x_data = this.v_data
      //       this.showGridData["GridHeadersList"].push(this.x_data);
      //       this.x_data ={};
      //       this.v_data ={};
      //     } 
       
      // });
      console.log(this.showGridData,"gridata")
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  renameKey ( obj:any, oldKey:any, newKey:any ) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
  exportExcel(){
  // if(this.isFilter== true){
  //   var exportableObj = JSON.parse(JSON.stringify(this.filteredValues));
  // }else{
  var exportableObj = JSON.parse(JSON.stringify(this.downloadReportList));
  // }  
  exportableObj.forEach( (obj:any) => {
    this.renameKey( obj, 'HQ_CODE', 'HQ Code' ) 
    this.renameKey( obj, 'HQ_DESC', 'HQ Name' ) 
    this.renameKey( obj, 'POOL_CODE', 'Pool Code' ) 
    this.renameKey( obj, 'FM_CODE', 'FM Code' ) 
    this.renameKey( obj, 'FM_NAME', 'FM Name' ) 
    this.renameKey( obj, 'RSM_CODE', 'RSM Code' ) 
    this.renameKey( obj, 'RSM_NAME', 'RSM Name' ) 
    this.renameKey( obj, 'SM_CODE','SM Code')
    this.renameKey( obj, 'SM_NAME','SM Name')
    this.renameKey( obj, 'NET_SALES','NET Sales')

    // delete obj['PROPOSAL_ID'];delete obj['DATE_SUBMITTED'];delete obj['PROJECT_START_DATE'];delete obj['PROJECT_LIVE_DATE'];delete obj['DEAL_TOTAL_MARGIN_AFTER_DISCOUNT'];delete obj['DEAL_SUB_MARGIN_AFTER_DISCOUNT'];delete obj['DEAL_SETUP_MARGIN_AFTER_DISCOUNT'];delete obj['CUSTOM_ENGINEERING'];delete obj['LEGAL_RISK'];delete obj['HIGH_RISK_IMPLEMENTATION'];delete obj['PRODUCT_ENHANCEMENT'];delete obj['PRIVATE_HYBRID_CLOUD_DEPLOYMENT'];delete obj['ENERGY_SETUP'];delete obj['OPERATION_SETUP'];delete obj['Custom_Solutioning'];delete obj['Local_Branch_Efforts'];delete obj['L2_Support_or_Hyper_care'];delete obj['License'];delete obj['License_Setup'];delete obj['ProductEnhancement'];delete obj['Setup_and_Integrations'];delete obj['Professional_Services'];delete obj['Third_Party_Software_Hardware'];delete obj['Custom_Solutioning_Branch'];delete obj['Local_Branch_Efforts_Branch'];delete obj['L2_Support_or_Hyper_care_Branch'];delete obj['License_Branch'];delete obj['License_Setup_Branch'];delete obj['ProductEnhancement_Branch'];delete obj['Setup_and_Integrations_Branch'];delete obj['Professional_Services_Branch'];delete obj['Third_Party_Software_Hardware_Branch'];delete obj['RISK_COMMENTS'];delete obj['PRODUCT_ENHANCE_TOTAL_EFFORTS_HOURS'];delete obj['SETUP'];delete obj['Yearly_SUBSCRIPTION'];delete obj['LOCAL_BRANCH_EFFORTS_HOURS'];delete obj['DEAL_TYPE'];delete obj['QUOTE_ID'];delete obj['PRODUCT_SELL_SETUP'];delete obj['COST_BRANCH_TOTAL_SETUP'];
    // delete obj['PENDING_STATUS_To_APPROVE'];delete obj['PENDING_STATUS_TO_APPROVE_NEW'];delete obj['QUOTE_CREATOR_NAME'];
  })

  import("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(exportableObj);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "Download Report");
  });
}

saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  let EXCEL_EXTENSION = ".xlsx";
  const data: Blob = new Blob([buffer], {
    type: EXCEL_TYPE
  });
  FileSaver.saveAs(
    data,
    fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
  );
}
onCLick(){
  console.log("dash board is being Called.")
}

filterPeriodId:any=[];
filteredPeriodId(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.periodList.length; i++) {
      let periodList = this.periodList[i];
      if (periodList.PERIOD_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(periodList);
      }
    }
  
    this.filterPeriodId = filtered;
  }
  
  setPeriodId(fileterlist, code: any) {
    code = "";
      this.filterPeriodId.forEach((element: any, index: number) => {
        if (element.PERIOD_DESC != this.periodList[0].PERIOD_DESC && this.periodList[0].PERIOD_DESC == undefined) {
          if (index == 0) {
            code = element;
            this.periodList = code;
            this.filterPeriodId = [];
          }
          else {
            this.periodList = element;
            return;
          }
        }
      });
  }

  filterReportId:any=[];
  filteredReportId(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.reportList.length; i++) {
      let reportList = this.reportList[i];
      if (reportList.REPORT_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(reportList);
      }
    }
  
    this.filterReportId = filtered;
  }
  
  setReportId(fileterlist, code: any) {
    code = "";
      this.filterReportId.forEach((element: any, index: number) => {
        if (element.REPORT_NAME != this.reportList[0].REPORT_NAME && this.reportList[0].REPORT_NAME == undefined) {
          if (index == 0) {
            code = element;
            this.reportList = code;
            this.filterReportId = [];
          }
          else {
            this.reportList = element;
            return;
          }
        }
      });
  }
  
}
