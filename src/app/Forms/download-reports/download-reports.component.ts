import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { ToastrService } from 'ngx-toastr';
import { URLService } from 'src/app/Service/url.service';
import * as FileSaver from 'file-saver';
import * as xlsx from 'xlsx';
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
       this.exportExcelOptimized();
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
//   exportExcel(){

//   //    if(this.isFilter== true){
//   //   var exportableObj = JSON.parse(JSON.stringify(this.filteredValues));
//   // }else{
//   var exportableObj = JSON.parse(JSON.stringify(this.downloadReportList));
//   // }  
//   // exportableObj.forEach( (obj:any) => {
//   //   this.renameKey( obj, 'HQ_CODE', 'HQ Code' ) 
//   //   this.renameKey( obj, 'HQ_DESC', 'HQ Name' ) 
//   //   this.renameKey( obj, 'POOL_CODE', 'Pool Code' ) 
//   //   this.renameKey( obj, 'FM_CODE', 'FM Code' ) 
//   //   this.renameKey( obj, 'FM_NAME', 'FM Name' ) 
//   //   this.renameKey( obj, 'RSM_CODE', 'RSM Code' ) 
//   //   this.renameKey( obj, 'RSM_NAME', 'RSM Name' ) 
//   //   this.renameKey( obj, 'SM_CODE','SM Code')
//   //   this.renameKey( obj, 'SM_NAME','SM Name')
//   //   this.renameKey( obj, 'NET_SALES','NET Sales')

//   //   // delete obj['PROPOSAL_ID'];delete obj['DATE_SUBMITTED'];delete obj['PROJECT_START_DATE'];delete obj['PROJECT_LIVE_DATE'];delete obj['DEAL_TOTAL_MARGIN_AFTER_DISCOUNT'];delete obj['DEAL_SUB_MARGIN_AFTER_DISCOUNT'];delete obj['DEAL_SETUP_MARGIN_AFTER_DISCOUNT'];delete obj['CUSTOM_ENGINEERING'];delete obj['LEGAL_RISK'];delete obj['HIGH_RISK_IMPLEMENTATION'];delete obj['PRODUCT_ENHANCEMENT'];delete obj['PRIVATE_HYBRID_CLOUD_DEPLOYMENT'];delete obj['ENERGY_SETUP'];delete obj['OPERATION_SETUP'];delete obj['Custom_Solutioning'];delete obj['Local_Branch_Efforts'];delete obj['L2_Support_or_Hyper_care'];delete obj['License'];delete obj['License_Setup'];delete obj['ProductEnhancement'];delete obj['Setup_and_Integrations'];delete obj['Professional_Services'];delete obj['Third_Party_Software_Hardware'];delete obj['Custom_Solutioning_Branch'];delete obj['Local_Branch_Efforts_Branch'];delete obj['L2_Support_or_Hyper_care_Branch'];delete obj['License_Branch'];delete obj['License_Setup_Branch'];delete obj['ProductEnhancement_Branch'];delete obj['Setup_and_Integrations_Branch'];delete obj['Professional_Services_Branch'];delete obj['Third_Party_Software_Hardware_Branch'];delete obj['RISK_COMMENTS'];delete obj['PRODUCT_ENHANCE_TOTAL_EFFORTS_HOURS'];delete obj['SETUP'];delete obj['Yearly_SUBSCRIPTION'];delete obj['LOCAL_BRANCH_EFFORTS_HOURS'];delete obj['DEAL_TYPE'];delete obj['QUOTE_ID'];delete obj['PRODUCT_SELL_SETUP'];delete obj['COST_BRANCH_TOTAL_SETUP'];
//   //   // delete obj['PENDING_STATUS_To_APPROVE'];delete obj['PENDING_STATUS_TO_APPROVE_NEW'];delete obj['QUOTE_CREATOR_NAME'];
//   // })
//     // const exportableObj = this.downloadReportList.map(obj => {
//     //   return {
//     //     'HQ Code': obj['HQ_CODE'],
//     //     'HQ Name': obj['HQ_DESC'],
//     //     'Pool Code': obj['POOL_CODE'],
//     //     'FM Code': obj['FM_CODE'],
//     //     'FM Name': obj['FM_NAME'],
//     //     'RSM Code': obj['RSM_CODE'],
//     //     'RSM Name': obj['RSM_NAME'],
//     //     'SM Code': obj['SM_CODE'],
//     //     'SM Name': obj['SM_NAME'],
//     //     'NET Sales': obj['NET_SALES']
//     //   };
//     // });

//     // exportableObj.forEach( (obj:any) => {
//   //   this.renameKey( obj, 'HQ_CODE', 'HQ Code' ) 
//   //   this.renameKey( obj, 'HQ_DESC', 'HQ Name' ) 
//   //   this.renameKey( obj, 'POOL_CODE', 'Pool Code' ) 
//   //   this.renameKey( obj, 'FM_CODE', 'FM Code' ) 
//   //   this.renameKey( obj, 'FM_NAME', 'FM Name' ) 
//   //   this.renameKey( obj, 'RSM_CODE', 'RSM Code' ) 
//   //   this.renameKey( obj, 'RSM_NAME', 'RSM Name' ) 
//   //   this.renameKey( obj, 'SM_CODE','SM Code')
//   //   this.renameKey( obj, 'SM_NAME','SM Name')
//   //   this.renameKey( obj, 'NET_SALES','NET Sales')


//  const worker = new Worker('assets/workers/excel-worker.worker', { type: 'module' });
//     worker.postMessage(exportableObj);


    
//     worker.onmessage = (e) => {
//       const excelBuffer = e.data;
//       this.saveAsExcelFile(excelBuffer, "Download_Report");
//       worker.terminate();
//     };
 

//   import("xlsx").then(xlsx => {
//     const worksheet = xlsx.utils.json_to_sheet(exportableObj);
//     const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
//     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
//     this.saveAsExcelFile(excelBuffer, "Download_Report");
//   });
// }

// saveAsExcelFile(buffer: any, fileName: string): void {
//   let EXCEL_TYPE =
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//   let EXCEL_EXTENSION = ".xlsx";
//   const data: Blob = new Blob([buffer], {
//     type: EXCEL_TYPE
//   });
//   FileSaver.saveAs(
//     data,
//     fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
//   );
// }


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

  onmessage = function (e) {
  const exportableObj = e.data;
  const worksheet = xlsx.utils.json_to_sheet(exportableObj);
  const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });

  postMessage(excelBuffer);  // Send data back to the main thread
};



// Solution 1: Streaming Export with Chunked Processing
async exportExcelOptimized() {
  const CHUNK_SIZE = 1000; // Process in chunks of 1000 rows
  const totalRows = this.downloadReportList.length;
  try {
    // Show loading indicator
    this.showLoadingIndicator('Preparing Excel export...');
    // Import xlsx module
    const xlsx = await import("xlsx");
    // Create workbook
    const workbook = xlsx.utils.book_new();
    // Process data in chunks to avoid memory issues
    const processedData = [];
    for (let i = 0; i < totalRows; i += CHUNK_SIZE) {
      const chunk = this.downloadReportList.slice(i, i + CHUNK_SIZE);
      const processedChunk = this.processChunk(chunk);
      processedData.push(...processedChunk);
      // Update progress
      const progress = Math.round(((i + CHUNK_SIZE) / totalRows) * 100);
      this.updateProgress(`Processing: ${progress}%`);
      // Allow UI to update
      await this.delay(10);
    }
    // Create worksheet
    const worksheet = xlsx.utils.json_to_sheet(processedData);
    // Optimize worksheet
   
    // Add worksheet to workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'data');
    // Write workbook with streaming
    const excelBuffer = xlsx.write(workbook, { 
      bookType: 'xlsx', 
      type: 'array',
      compression: true // Enable compression
    });
    this.saveAsExcelFile(excelBuffer, "Download Report");
  } catch (error) {
    console.error('Export failed:', error);
    this.showError('Export failed. Please try again.');
  } finally {
    this.hideLoadingIndicator();
  }
}
 
// Process chunk of data
processChunk(chunk: any[]): any[] {
  return chunk.map(obj => {
    // Deep clone to avoid reference issues
    const processedObj = { ...obj };
    // Rename keys
    this.renameKey(processedObj, 'HQ_CODE', 'HQ Code');
    this.renameKey(processedObj, 'HQ_DESC', 'HQ Name');
    this.renameKey(processedObj, 'POOL_CODE', 'Pool Code');
    this.renameKey(processedObj, 'FM_CODE', 'FM Code');
    this.renameKey(processedObj, 'FM_NAME', 'FM Name');
    this.renameKey(processedObj, 'RSM_CODE', 'RSM Code');
    this.renameKey(processedObj, 'RSM_NAME', 'RSM Name');
    this.renameKey(processedObj, 'SM_CODE', 'SM Code');
    this.renameKey(processedObj, 'SM_NAME', 'SM Name');
    this.renameKey(processedObj, 'NET_SALES', 'NET Sales');
    // Remove unwanted fields
    this.removeUnwantedFields(processedObj);
    return processedObj;
  });
}
 

// Remove unwanted fields efficiently
removeUnwantedFields(obj: any) {
  const fieldsToRemove = [
    'PROPOSAL_ID', 'DATE_SUBMITTED', 'PROJECT_START_DATE', 'PROJECT_LIVE_DATE',
    'DEAL_TOTAL_MARGIN_AFTER_DISCOUNT', 'DEAL_SUB_MARGIN_AFTER_DISCOUNT',
    'DEAL_SETUP_MARGIN_AFTER_DISCOUNT', 'CUSTOM_ENGINEERING', 'LEGAL_RISK',
    'HIGH_RISK_IMPLEMENTATION', 'PRODUCT_ENHANCEMENT', 'PRIVATE_HYBRID_CLOUD_DEPLOYMENT',
    'ENERGY_SETUP', 'OPERATION_SETUP', 'Custom_Solutioning', 'Local_Branch_Efforts',
    'L2_Support_or_Hyper_care', 'License', 'License_Setup', 'ProductEnhancement',
    'Setup_and_Integrations', 'Professional_Services', 'Third_Party_Software_Hardware',
    'Custom_Solutioning_Branch', 'Local_Branch_Efforts_Branch', 'L2_Support_or_Hyper_care_Branch',
    'License_Branch', 'License_Setup_Branch', 'ProductEnhancement_Branch',
    'Setup_and_Integrations_Branch', 'Professional_Services_Branch',
    'Third_Party_Software_Hardware_Branch', 'RISK_COMMENTS', 'PRODUCT_ENHANCE_TOTAL_EFFORTS_HOURS',
    'SETUP', 'Yearly_SUBSCRIPTION', 'LOCAL_BRANCH_EFFORTS_HOURS', 'DEAL_TYPE',
    'QUOTE_ID', 'PRODUCT_SELL_SETUP', 'COST_BRANCH_TOTAL_SETUP',
    'PENDING_STATUS_To_APPROVE', 'PENDING_STATUS_TO_APPROVE_NEW', 'QUOTE_CREATOR_NAME'
  ];
  fieldsToRemove.forEach(field => delete obj[field]);
}
 
// Solution 2: Web Worker for Background Processing

 
// Solution 3: Server-Side Export (Recommended for very large datasets)

 
// Utility methods
private delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
 
private showLoadingIndicator(message: string) {
  // Implement your loading indicator logic
  console.log(message);
}
 
private updateProgress(message: string) {
  // Implement your progress update logic
  console.log(message);
}
 
private hideLoadingIndicator() {
  // Implement your loading indicator hide logic
}
 
private showError(message: string) {
  // Implement your error display logic
  console.error(message);
}
 
private getSelectedColumns() {
  // Return array of selected columns for export
  return ['HQ Code', 'HQ Name', 'Pool Code', 'FM Code', 'FM Name', 'RSM Code', 'RSM Name', 'SM Code', 'SM Name', 'NET Sales'];
}
 
// Enhanced saveAsExcelFile with better error handling
saveAsExcelFile(buffer: any, fileName: string): void {
  try {
    const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    // Check if file size is reasonable (warn if > 50MB)
    if (data.size > 50 * 1024 * 1024) {
      const proceed = confirm('The file is quite large. Do you want to continue with the download?');
      if (!proceed) return;
    }
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  } catch (error) {
    console.error('Save failed:', error);
    this.showError('Failed to save file. Please try again.');
  }
}
 
// Alternative: CSV Export for better performance with large datasets
exportCSV() {
  const exportableObj = this.downloadReportList.map(obj => {
    const processedObj = { ...obj };
    // Apply same transformations
    this.renameKey(processedObj, 'HQ_CODE', 'HQ Code');
    this.renameKey(processedObj, 'HQ_DESC', 'HQ Name');
    // ... other transformations
    this.removeUnwantedFields(processedObj);
    return processedObj;
  });
  // Convert to CSV
  const csv = this.convertToCSV(exportableObj);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  FileSaver.saveAs(blob, `Download_Report_${new Date().getTime()}.csv`);
}
 
private convertToCSV(data: any[]): string {
  if (data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => 
        `"${String(row[header] || '').replace(/"/g, '""')}"`
      ).join(',')
    )
  ].join('\n');
  return csvContent;
}
  
}
