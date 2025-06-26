import { Component, OnInit } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { ToastrService } from 'ngx-toastr';
import { URLService } from 'src/app/Service/url.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-incentive-report',
  templateUrl: './incentive-report.component.html',
  styleUrls: ['./incentive-report.component.css']
})
export class IncentiveReportComponent implements OnInit {
  userInfo: any = {};
  incentiveReportList: any = [];
  showGridData: any = {};
  v_data: any = {};
  x_data: any = {};
  gridDataSetValue: string = "";
  setValue: any;
  isExport: boolean = false;
  isIncentivePopUp: boolean = false;
  isLoaded: boolean = false;
  periodList: any = [];
  rolelist: any = [];
  PERIOD_ID: any;
  ROLE_ID: any;
  SalesReportList: any = []
   first: number = 0;
   totalRecords: number = 0;
   rows: number = 10;
   last: number;
  IncentiveReportList: any;
  FROM_PERIOD:any;
  TO_PERIOD:any
  periodList1: any;
  periodList2: any;
  filteredPeriodList: any;
  constructor(private router: Router, private SharedService: SharedService, private AuthService: AuthService,
    private ToastrService: ToastrService, private url: URLService, private http: HttpService) { }

  ngOnInit(): void {
    this.getReportList();
  }
  GetIncentiveReportList() {
    this.userInfo = this.AuthService.getUserDetail();
    let data = {
      USER_ID: JSON.parse(this.userInfo).USER_ID,
    }
    this.http.postnew(this.url.getIncentiveReportList, data).then(
      (res: any) => {
        this.isLoaded = false;
        this.isExport = true;
        //console.log("response",res);
        // this.incentiveReportList = res;
        // this.showGridData["GridList"] = [];
        // this.showGridData["GridList"] = this.incentiveReportList;
        // this.setValue = this.gridDataSetValue;
        // //console.log("showGridData",this.showGridData);
        // this.v_data["Headers"] = [];
        // this.v_data["Field"] = [];
        // this.showGridData["GridHeadersList"] = [];
        // this.showGridData["SearchKey"] = [];
        // this.showGridData.GridList.forEach((currentValue: any, index: any) => {
        //   let k = Object.keys(currentValue)[index];
        //   if (k != undefined) {
        //     console.log("Data", k);
        //     this.v_data["Headers"] = k;
        //     this.v_data["Field"] = k;
        //     this.showGridData["SearchKey"].push(k);
        //     this.x_data = this.v_data
        //     this.showGridData["GridHeadersList"].push(this.x_data);
        //     this.x_data = {};
        //     this.v_data = {};
        //   }
        // });
        // console.log("this.showGridData Headers", this.showGridData);
      },
      error => {
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  ClosePopUp() {
    this.isIncentivePopUp = false;
  }
  onViewClick() {
    this.GetIncentiveReportList();
    this.isLoaded = true;
  }
  renameKey(obj: any, oldKey: any, newKey: any) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
  exportExcel() {
    let data = [];
    // for(let i =0; i< this.showGridData.GridHeadersList.length; i++){
    //   data.push(this.showGridData.GridHeadersList[i].Headers);
    // }
    // var exporKeyObj = JSON.parse(JSON.stringify(this.showGridData.GridHeadersList));
    // let exporValueObj = [];
    // exporValueObj = exporValueObj.concat(JSON.parse(JSON.stringify(this.showGridData.GridList)));
    // console.log("exporKeyObj",exporValueObj);  
    // exporKeyObj.forEach( (obj:any) => {
    //   exporValueObj.forEach((element:any) => {
    //     this.renameKey(element, obj.Headers, element[obj.Headers] )
    //   });
    // })

    this.showGridData.GridList.forEach((element: any) => {
      data.push(element);
    });

    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
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

  getReportList() {
    this.userInfo = this.AuthService.getUserDetail();
    let data = {
      USER_ID: JSON.parse(this.userInfo).USER_ID,
    }

   // this.isLoaded = false
    this.http.postnew(this.url.getIncentiveReportListFilter, data).then(
      (res: any) => {
      //  this.isLoaded = true
        console.log("response", res);
        this.periodList1 = res.periodlist;
         this.periodList2 = res.periodlist;
        this.rolelist = res.rolelist;
        // this.keyFigureList = res.keyfigure;
      },
      error => {
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  onPageChange(event: any) {
    console.log(event.first);
    
    console.log('this.totalRecords', this.totalRecords);
    this.last = this.first;
    this.first = event.first;
    this.rows = event.rows;
  }
  onViewReport() {
    this.userInfo = this.AuthService.getUserDetail();
    let data = {
      USER_ID: JSON.parse(this.userInfo).USER_ID,
      FROM:this.FROM_PERIOD.PERIOD_ID,
      TO:this.TO_PERIOD.PERIOD_ID,
      ROLE_TYPE:this.ROLE_ID.SALESROLE_ID
    }
console.log('qtwtw',data);

    this.isLoaded = true
    this.IncentiveReportList=[]
    this.http.postnew(this.url.getIncentiveReport, data).then(
      (res: any) => {
        this.isLoaded = false
        this.IncentiveReportList=res.reportList


    this.isLoaded = false;
    this.isExport = true;

    this.incentiveReportList = res;
    this.showGridData["GridList"] = this.incentiveReportList.reportList
;
    console.log('this.showGridData',this.showGridData,'1',this.incentiveReportList);
    
    this.setValue = this.gridDataSetValue;

    // Clear headers & keys
    this.showGridData["GridHeadersList"] = [];
    this.showGridData["SearchKey"] = [];

    // Extract headers from first row
    if (this.showGridData.GridList.length > 0) {
      const keys = Object.keys(this.showGridData.GridList[0]);
        console.log('sinside2');
        
      keys.forEach(key => {
        const header = {
          Headers: key,
          Field: key
        };
        this.showGridData["SearchKey"].push(key);
        this.showGridData["GridHeadersList"].push(header);
         console.log('sinside3');
      });
    }
        console.log("showGridData",this.showGridData.GridHeadersList,this.showGridData);
     ///   this.periodList = res.periodlist;
     //   this.rolelist = res.rolelist;
        // this.keyFigureList = res.keyfigure;
      },
      error => {
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }

onPeriodChange(e:any){
  this.periodList2=this.periodList1
  console.log('inside',this.FROM_PERIOD);
const fromPeriodId = this.FROM_PERIOD?.PERIOD_ID;
this.filteredPeriodList = this.periodList2.filter(
  (element: any) => element.PERIOD_ID >= fromPeriodId
);

}


//  exportExcel(){
//     this.comman.exportExcel(this.reportGrid.v_detail)
//     //this.comman.exportFormatedAsExcel(this.reportGrid.v_detail,'_report_',[],'Test','')
//   }
}
