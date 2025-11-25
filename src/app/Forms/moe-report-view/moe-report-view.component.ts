import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Service/api.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
import { AuthService } from 'src/app/Service/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-moe-report-view',
  templateUrl: './moe-report-view.component.html',
  styleUrls: ['./moe-report-view.component.css']
})
export class MoeReportViewComponent implements OnInit {
  //code by hemant 21 aug 2025
  period:any;
  userInfo:any = {};
  periodList:any = [];
  isLoaded:boolean=false;
  roleList: any=[];
  AREA_CODE:any='';
  roleListData: any=[];
  pdfSrc: any="";
  pdfSrcflag: boolean=false;
  constructor(private AuthService:AuthService,private url:URLService,private http:HttpService,private toastrService:ToastrService,private fileDownloadService: ApiService,private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.getPeriodListData();
  }
    getPeriodListData(){
    this.userInfo = this.AuthService.getUserDetail();
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
      LOGIN_ID:JSON.parse(this.userInfo).USER_NAME,
      SALES_ROLE_ID:JSON.parse(this.userInfo).SALESROLE_ID
    }
    this.http.postnew(this.url.GetMOEMASTERLIST, data).then(
      (res:any)=>{
        this.periodList = res.periodlist;
      //console.log('periodList',this.periodList);
     
      },
      error =>{
        //console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

   getRoleList(){
    this.roleListData=[]
    this.userInfo = this.AuthService.getUserDetail();
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
      LOGIN_ID:JSON.parse(this.userInfo).USER_NAME,
      SALES_ROLE_ID:JSON.parse(this.userInfo).SALESROLE_ID,
      PERIOD_ID:this.period
    }
    this.roleList=[]
    this.http.postnew(this.url.GetROLEWISELISTBYPERIODID, data).then(
      (res:any)=>{
        this.roleListData = res.ROLElist;
        console.log(res,'res');
         this.roleList = res.ROLElist;
        this.roleListData.unshift(this.roleListData.pop()!);
        this.roleList = this.roleListData.map(item => ({  ...item,
        combinedLabel: `${item.ROLE_NAME} -${item.AREA_CODE} - ${item.AREA_DESC}`,
        // combinedValue: `${item.AREA_CODE}|${item.AREA_NAME}`
        }));

      console.log('roleList',this.roleList);
     
      },
      error =>{
        //console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  generatePDFdata(){
    console.log('this.AREA_CODE',this.AREA_CODE);
    if(this.period==undefined || this.period==null){
      this.toastrService.error("Please Select Period");
      return;
    }
    if(this.AREA_CODE==undefined || this.AREA_CODE==null){
      this.toastrService.error("Please Select Area Code");
      return;
    }
    let data={
       USER_ID : JSON.parse(this.userInfo).USER_ID,
      LOGIN_ID:JSON.parse(this.userInfo).USER_NAME,
      SALES_ROLE_ID:JSON.parse(this.userInfo).SALESROLE_ID,
      PERIOD_ID:this.period,
      AREA_CODE:this.AREA_CODE.AREA_CODE,
      ROLE_NAME:this.AREA_CODE.ROLE_NAME,
      PERIOD_DESC:this.AREA_CODE.PERIOD_DESC,
      SALESROLE_ID:JSON.parse(this.userInfo).SALESROLE_ID
    }
    console.log(data,'data');
    this.isLoaded=true;
        this.http.postnew(this.url.ConvertPdfToBase64, data).then(
      (res:any)=>{
        // if(res.flag==true){
          this.isLoaded=false;
         this.pdfSrcflag=true;
          this.AREA_CODE=''         
           this.pdfSrc=`data:application/pdf;base64,${res.Base64Pdf}`
           const base64Data =this.pdfSrc
           console.log('periodList',this.pdfSrc);
           const fileName = res.FileName;
           const link = document.createElement('a');
           link.href = this.pdfSrc;
          // link.download = fileName; // 👈 custom file name here
           //link.click();
           this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
         //  this.toastrService.success(res.Message);
        // }
        // else if(res.flag==false){
            this.isLoaded=false;
            // this.toastrService.error(res.Message);
        // }
       // console.log('RES',res);
      },
      error =>{
         this.isLoaded=false;
        //console.log(error);
        this.toastrService.error("File Not Found!");
      }
    );
  }

}
