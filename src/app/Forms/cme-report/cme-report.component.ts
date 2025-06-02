
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
import * as FileSaver from 'file-saver';
import { CommonService } from 'src/app/Service/common.service';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-cme-report',
  templateUrl: './cme-report.component.html',
  styleUrls: ['./cme-report.component.css']
})
export class CmeReportComponent implements OnInit {

fromDate=new Date();
  toDate=new Date();
  STATUS:any;
  USER_ROLE:any;
  isLoaded:boolean=true;
  exportableObj:any=[];
  isQualitySelected:boolean=true;
  reportType:any;
  onShowGrid:boolean=false;
  reportGrid:any = {}; 
  REPORT_DATA:any=[];
  Header:any=[];
  Values:any=[];
  ROLE:any;
  ROLE_USERLIST:any=[];
  REPORT_HEADERS:any=[];
  reportTypeList:any = [
    {
    "REPORT_ID":1,
    "REPORT_NAME":"Cme REPORT",
    "SP_NAME":"SP_GET_CME_REPORT"
   },
   {
    "REPORT_ID":2,
    "REPORT_NAME":"DISCOUNT REPORT",
    "SP_NAME":"SP_GET_DISCOUNT_REPORT"
  }
];
DATA_LIST=[ {"LIST":"FM"},{"LIST":"RSM"},{"LIST":"SM"}];

StatusList:any=[{
  "STATUS_ID":1,
  "STATUS_NAME":"APPROVE"
},
{
  "STATUS_ID":2,
  "STATUS_NAME":"REJECT"
},
{
  "STATUS_ID":3,
  "STATUS_NAME":"PENDING"
}

]
userInfo: any;
  MASTER_LIST: any;

  constructor(private url: URLService,private http: HttpService, private comman:CommonService,
    private toastrService:ToastrService,public datepipe: DatePipe,private authService: AuthService) { }

  ngOnInit(): void {
    this.reportType='SP_GET_CME_REPORT';
    this.GetMasterData();
  }


  onViewReport(){
   // console.log(this.fromDate,this.toDate)
    this.userInfo = this.authService.getUserDetail();
    let fromDate = this.datepipe.transform(this.fromDate, "yyyy-MM-dd");
    let toDate = this.datepipe.transform(this.toDate, "yyyy-MM-dd");
    let data={
      "FROM_DATE":fromDate,
      "TO_DATE":toDate,
      "SP_NAME":this.reportType,
      "STATUS":this.STATUS,
      "USER_ID": JSON.parse(this.userInfo).USER_ID,
      "AREA_CODE":this.USER_ROLE
    }

  //  console.log('save data',JSON.stringify(data))

    this.http.postnew(this.url.GETCLAIMTREPORT,data).then(
      (res:any)=>{
       // console.log('HEADER',res);
        this.REPORT_DATA=[]
        this.REPORT_HEADERS=[]
        this.Values=[];
        this.Header = [];
       // this.isLoaded= false;
       this.REPORT_DATA=res.REPORT_DATA
       this.REPORT_HEADERS=res.REPORT_HEADERS

      //  this.reportGrid.v_header = res.REPORT_HEADERS
      //  this.reportGrid.v_detail = res.REPORT_DATA

       this.REPORT_DATA.forEach((element:any)=> {
       //  this.Header=Object.keys(element)
        element.DATE_FROM = this.datepipe.transform(element.DATE_FROM, "dd-MM-yyyy")
       element.DATE_TO = this.datepipe.transform(element.DATE_TO, "dd-MM-yyyy")
        element.CME_DATE = this.datepipe.transform(element.CME_DATE, "dd-MM-yyyy")
       // this.Values.push(Object.values(element))
       });

      this.onShowGrid=true;
      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }


  renameKey( obj:any, oldKey:any, newKey:any ) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
  exportExcel(){
    this.comman.exportExcel(this.REPORT_DATA)
    //this.comman.exportFormatedAsExcel(this.reportGrid.v_detail,'_report_',[],'Test','')
  }
  onrolechange(){
    
    // const hq = [...new Set(this.REPORT_DATA.map(item => item.HQ_CODE))];
    // hq.forEach((element:any) => {
    //   this.HQ_LIST.push({label:element,value:element})
    // })
    this.ROLE_USERLIST=[];
   if(this.ROLE=="FM"){

    const fm = [...new Set(this.REPORT_DATA.map(item => item.FM_NAME))];
   // console.log(fm)
    fm.forEach((element:any) => {
      this.ROLE_USERLIST.push({label:element,value:element})
    })
   }else if(this.ROLE=="RSM"){
    const fm = [...new Set(this.REPORT_DATA.map(item => item.RSM_NAME))];
 //   console.log(fm)
    fm.forEach((element:any) => {
      this.ROLE_USERLIST.push({label:element,value:element})
    })
   }else{
    const fm = [...new Set(this.REPORT_DATA.map(item => item.SM_NAME))];
    console.log(fm)
    fm.forEach((element:any) => {
      this.ROLE_USERLIST.push({label:element,value:element})
    })
   }

  }

  onuserrolechange(){
    this.Values = [];
 //console.log(this.REPORT_DATA)

//  for(let i=0;i<this.REPORT_DATA.length;i++){
//       if(this.REPORT_DATA[i][this.ROLE +'_NAME'] == this.USER_ROLE){
//         this.Values.push(Object.values(this.REPORT_DATA[i]));
//       }
//     }
//  if(this.ROLE=="FM"){
//   for(let i=0;i<this.REPORT_DATA.length;i++){
//     if(this.REPORT_DATA[i]['FM_NAME'] == this.USER_ROLE){
//       this.Values.push(Object.values(this.REPORT_DATA[i]));
//     }
//   }
//  }else if(this.ROLE=="RSM"){
//   for(let i=0;i<this.REPORT_DATA.length;i++){
//     if(this.REPORT_DATA[i]['RSM_NAME'] == this.USER_ROLE){
//       this.Values.push(Object.values(this.REPORT_DATA[i]));
//     }
//   }
//  }else{
//   for(let i=0;i<this.REPORT_DATA.length;i++){
//     if(this.REPORT_DATA[i]['SM_NAME'] == this.USER_ROLE){
//       this.Values.push(Object.values(this.REPORT_DATA[i]));
//     }
//   }
//  }
   
    //console.log(this.Values)
  }


  GetMasterData(){
  
   
    let data={
      
    }

  

    this.http.postnew(this.url.GETMASTERLISTFORCMEREPORT,data).then(
      (res:any)=>{
    //  console.log('res',res);
      
       this.MASTER_LIST=res.MASTER_LIST

     
      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }


}
