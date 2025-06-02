import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { ToastrService } from 'ngx-toastr';
import { URLService } from 'src/app/Service/url.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-expenese-report',
  templateUrl: './expenese-report.component.html',
  styleUrls: ['./expenese-report.component.css']
})
export class ExpeneseReportComponent implements OnInit {
  isDisabled:boolean = true;
  LAST_DATE_ON = new Date();
  fromDate:any;
  toDate:any;
  keyFigure:any;
  underEmployee:any;
  userInfo:any={};
  periodList:any=[];
  keyFigureList:any=[];
  underEmployeeList:any=[];
  SalesReportList:any=[];
  SalesCommonList:any=[];
  SalesList1:any=[];
  SalesList2:any=[];
  SalesList3:any=[];
  SalesList4:any=[];
  SalesList5:any=[];
  SalesList6:any=[];
  SalesList7:any=[];
  counter:any;
  isEnabled = 0;
  QTY_VALUE:any={"CODE":"001","NAME":"Qty"};
  QTY_VALUE_LIST:any=[{"CODE":"001","NAME":"Qty"},{"CODE":"002","NAME":"Value"}];
  REPORT_LIST:any=[];
  isQualitySelected:boolean=true;
  isLoaded:boolean=true;
  constructor(private router: Router,private SharedService: SharedService,private AuthService: AuthService,
    private ToastrService: ToastrService,private url: URLService,private http: HttpService) { }

  ngOnInit(): void {
    this.getSalesReportList();
  }
  getSalesReportList() {
    this.userInfo = this.AuthService.getUserDetail();
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
    }
    this.http.postnew(this.url.getSalesReportList, data).then(
      (res:any)=>{
        console.log("response",res);
        this.periodList=res.periodlist;
        this.underEmployeeList = res.underemployee;
        this.keyFigureList = res.keyfigure;
        this.underEmployee=res.underemployee[0]
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  onViewReport(){
    this.SalesReportList=[]
    this.DownloadSalesReportList();
  }
  DownloadSalesReportList() {
    this.userInfo = this.AuthService.getUserDetail();
    console.log("this.this.QTY_VALUE.NAME:-",this.QTY_VALUE.NAME);
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
      FromMonth : (+this.fromDate.PERIOD_ID),
      ToMonth : (+this.toDate.PERIOD_ID),
      UnderEmpCode : (+this.underEmployee.USER_ID),
    }
    this.isLoaded = false;
    this.http.postnew(this.url.getExpenseReportList, data).then(
      (res:any)=>{
        console.log("response",res);
        res.forEach((element:any) => {
          if(element.Parent_Code == ""){
            this.SalesReportList.push(element)
          }
          
        });
        // this.SalesReportList = res;
        this.counter = 0;
        this.SalesCommonList = res;
        this.isLoaded = true;
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  FilterList(data:any){
    this.SalesReportList = [];
    this.SalesCommonList.forEach((element:any) => {
      if(this.counter == 0 && element.Parent_Code == data){
        this.SalesList1.push(element);
        this.SalesReportList.push(element);
      }
      if(this.counter == 1 && element.Parent_Code == data){
        this.SalesList2.push(element);
        this.SalesReportList.push(element);
      }
      if(this.counter == 2 && element.Parent_Code == data){
        this.SalesList3.push(element);
        this.SalesReportList.push(element);
      }
      if(this.counter == 3 && element.Parent_Code == data){
        this.SalesList4.push(element);
        this.SalesReportList.push(element);
      }
      if(this.counter == 4 && element.Parent_Code == data){
        this.SalesList5.push(element);
        this.SalesReportList.push(element);
      }
      if(this.counter == 5 && element.Parent_Code == data){
        this.SalesList6.push(element);
        this.SalesReportList.push(element);
      }
      if(this.counter == 6 && element.Parent_Code == data){
        this.SalesList7.push(element);
        this.SalesReportList.push(element);
      }
    });
    this.counter = this.counter +1;
  }
  OnBackClick(){
    this.SalesReportList = [];
      if(this.counter == 1){
        this.SalesCommonList.forEach((element:any) => {
          if(element.Parent_Code == ""){
            this.SalesReportList.push(element);
          }
        })
        this.counter = this.counter - 1;
      }
      if(this.counter == 2){
        this.SalesList1.forEach((element:any) => {
          this.SalesReportList.push(element)
        })
        this.SalesList1 = [];
        // this.SalesReportList = this.SalesList1;
        this.counter = this.counter - 1;
      }
      if(this.counter == 3){
        this.SalesList2.forEach((element:any) => {
          this.SalesReportList.push(element)
        })
        this.SalesList2 = [];
        // this.SalesReportList = this.SalesList2;
        this.counter = this.counter - 1;
      }
      if(this.counter == 4){
        this.SalesList3.forEach((element:any) => {
          this.SalesReportList.push(element)
        })
        this.SalesList3 = [];
        // this.SalesReportList = this.SalesList3;
        this.counter = this.counter - 1;
      }
      if(this.counter == 5){
        this.SalesList4.forEach((element:any) => {
          this.SalesReportList.push(element)
        })
        this.SalesList4 = [];
        // this.SalesReportList = this.SalesList4;
        this.counter = this.counter - 1;
      }
      if(this.counter == 6){
        this.SalesList5.forEach((element:any) => {
          this.SalesReportList.push(element)
        })
        this.SalesList5 = [];
        // this.SalesReportList = this.SalesList5;
        this.counter = this.counter - 1;
      }
      if(this.counter == 7){
        this.SalesList6.forEach((element:any) => {
          this.SalesReportList.push(element)
        })
        this.SalesList6 = [];
        // this.SalesReportList = this.SalesList6;
        this.counter = this.counter - 1;
      }
      if(this.counter == 8){
        this.SalesList7.forEach((element:any) => {
          this.SalesReportList.push(element)
        })
        this.SalesList7 = [];
        // this.SalesReportList = this.SalesList7;
        this.counter = this.counter - 1;
      }
  }
  renameKey ( obj:any, oldKey:any, newKey:any ) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
  exportExcel(){
  var exportableObj = JSON.parse(JSON.stringify(this.SalesReportList));
  exportableObj.forEach( (obj:any) => {
      this.renameKey( obj, 'Keyfigure_Name', 'Key Figure' ) 
      this.renameKey( obj, 'NET_SALES', 'NET SALES' ) 
      this.renameKey( obj, 'COGS', 'COGS' ) 
      this.renameKey( obj, 'HQ_SALARY', 'HQ SALARY' ) 
      this.renameKey( obj, 'FM_SALARY', 'FM SALARY' ) 
      this.renameKey( obj, 'RSM_SALARY','RSM SALARY')
      this.renameKey( obj, 'SM_SALARY', 'SM SALARY' ) 
      this.renameKey( obj, 'GSM_SALARY', 'GSM SALARY' ) 
      this.renameKey( obj, 'VP_SALARY', 'VP SALARY' ) 
      this.renameKey( obj, 'TOTAL_EXPENSE','TOTAL EXPENSE')
      this.renameKey( obj, 'SAMPLE_EXPENSE','SAMPLE EXPENSE')
      this.renameKey( obj, 'MARGIN', 'MARGIN' ) 
      this.renameKey( obj, 'MARGIN_PER', 'MARGIN PER' ) 
      delete obj['Keyfigure_Code'];delete obj['Parent_Code'];
      // delete obj['SAMPLE_EXPENSE']
  })

  import("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(exportableObj);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "Expense Report");
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


filterFromDate:any=[];
filteredFromDate(event: any) {
  let filtered: any[] = [];
  let query = event.query;
  for (let i = 0; i < this.periodList.length; i++) {
    let periodList = this.periodList[i];
    if (periodList.PERIOD_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
      filtered.push(periodList);
    }
  }

  this.filterFromDate = filtered;
}

setFromDate(fileterlist, code: any) {
  code = "";
    this.filterFromDate.forEach((element: any, index: number) => {
      if (element.PERIOD_DESC != this.periodList[0].PERIOD_DESC && this.periodList[0].PERIOD_DESC == undefined) {
        if (index == 0) {
          code = element;
          this.periodList = code;
          this.filterFromDate = [];
        }
        else {
          this.periodList = element;
          return;
        }
      }
    });
}

filterToDate:any=[];
filteredToDate(event: any) {
  let filtered: any[] = [];
  let query = event.query;
  for (let i = 0; i < this.periodList.length; i++) {
    let periodList = this.periodList[i];
    if (periodList.PERIOD_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
      filtered.push(periodList);
    }
  }

  this.filterToDate = filtered;
}

setToDate(fileterlist, code: any) {
  code = "";
    this.filterToDate.forEach((element: any, index: number) => {
      if (element.PERIOD_DESC != this.periodList[0].PERIOD_DESC && this.periodList[0].PERIOD_DESC == undefined) {
        if (index == 0) {
          code = element;
          this.periodList = code;
          this.filterToDate = [];
        }
        else {
          this.periodList = element;
          return;
        }
      }
    });
}

filterUnderEmployee:any=[];
filteredUnderEmployee(event: any) {
  let filtered: any[] = [];
  let query = event.query;
  for (let i = 0; i < this.underEmployeeList.length; i++) {
    let underEmployeeList = this.underEmployeeList[i];
    if (underEmployeeList.USER_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
      filtered.push(underEmployeeList);
    }
  }

  this.filterUnderEmployee = filtered;
}

setUnderEmployee(fileterlist, code: any) {
  code = "";
    this.filterUnderEmployee.forEach((element: any, index: number) => {
      if (element.USER_NAME != this.underEmployeeList[0].USER_NAME && this.underEmployeeList[0].USER_NAME == undefined) {
        if (index == 0) {
          code = element;
          this.underEmployeeList = code;
          this.filterUnderEmployee = [];
        }
        else {
          this.underEmployeeList = element;
          return;
        }
      }
    });
}
}
