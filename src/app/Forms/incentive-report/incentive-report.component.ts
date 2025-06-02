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
  userInfo:any={};
  incentiveReportList:any=[];
  showGridData: any={};
  v_data:any = {};
  x_data:any = {};
  gridDataSetValue:string="";
  setValue:any;
  isExport:boolean= false;
  isIncentivePopUp:boolean = false;
  isLoaded:boolean = false;
  constructor(private router: Router,private SharedService: SharedService,private AuthService: AuthService,
    private ToastrService: ToastrService,private url: URLService,private http: HttpService) { }

  ngOnInit(): void {
  }
  GetIncentiveReportList(){
    this.userInfo = this.AuthService.getUserDetail();
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
    }
    this.http.postnew(this.url.getIncentiveReportList, data).then(
      (res:any)=>{
        this.isLoaded = false;
        this.isExport = true;
        //console.log("response",res);
        this.incentiveReportList=res;
        this.showGridData["GridList"] = [];
        this.showGridData["GridList"] = this.incentiveReportList;
        this.setValue = this.gridDataSetValue;
        //console.log("showGridData",this.showGridData);
        this.v_data["Headers"] = [];
        this.v_data["Field"] = [];
        this.showGridData["GridHeadersList"] =[];
        this.showGridData["SearchKey"] =[];
        this.showGridData.GridList.forEach((currentValue: any, index: any) => {
          let k = Object.keys(currentValue)[index];
          if(k != undefined){
            console.log("Data", k);
            this.v_data["Headers"] = k;
            this.v_data["Field"] = k;
            this.showGridData["SearchKey"].push(k);
            this.x_data = this.v_data
            this.showGridData["GridHeadersList"].push(this.x_data);
            this.x_data ={};
            this.v_data ={};
          } 
      });
     // console.log("this.showGridData Headers", this.showGridData);
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  ClosePopUp(){
    this.isIncentivePopUp = false;
  }
  onViewClick(){
    this.GetIncentiveReportList();
    this.isLoaded = true;
  }
  renameKey ( obj:any, oldKey:any, newKey:any ) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
  exportExcel(){
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

    this.showGridData.GridList.forEach((element:any) => {
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

}
