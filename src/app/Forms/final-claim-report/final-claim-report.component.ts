import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-final-claim-report',
  templateUrl: './final-claim-report.component.html',
  styleUrls: ['./final-claim-report.component.css']
})
export class FinalClaimReportComponent implements OnInit {
  onShowGrid:boolean = false;
  reportGrid:any = [];
  fromDate:any = new Date();;
  toDate:any = new Date();
  userInfo:any = {};
  superStockist:any;
  superStockistList:any = [];
  FM_LIST:any = [];
  FM:any;
  reportType:any = '';
  Values:any = [];
  Header:any = [];
  REPORT_HEADERS:any = [];
  REPORT_DATA:any = [];
  superStockistName:any = "";
  userDetails:any = {}
  constructor(private commonService:CommonService,private authService:AuthService,private datepipe:DatePipe,private url:URLService,
    private http:HttpService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getMasterData();
    this.userDetails = JSON.parse(this.authService.getUserDetail());
  }

  getMasterData(){
    this.userInfo = this.authService.getUserDetail();

    let data={
      "USER_ID": JSON.parse(this.userInfo).USER_ID,
    }

  
    this.http.postnew(this.url.GETCLAIMMASTERDATAFORREPORT,data).then(
      (res:any)=>{

        this.superStockistList = res.SUPER_STOCKIST_LIST
        this.FM_LIST = res.FM_LIST

      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  exportExcel(){
   // this.commonService.exportExcel(this.reportGrid.v_detail)
   this.superStockistName  = '';
   for(let i =0 ;i<this.superStockistList.length;i++){
    if(this.superStockistList[i].SUPERSTOCKIST_CODE == this.superStockist){
      this.superStockistName = this.superStockistList[i].SUPERSTOCKIST_NAME
    }
   }

   if(this.REPORT_DATA.length == 0){
    this.toastrService.error("No Records Found")
    return;
   }

   let fromDate = this.datepipe.transform(this.fromDate, "dd-MM-yyyy");
   let toDate = this.datepipe.transform(this.toDate, "dd-MM-yyyy");
    this.commonService.exportFormatedAsExcel(this.REPORT_DATA,'_report_',this.FM,this.superStockistName,fromDate,toDate)
  }

  onViewReport(){
    if(this.superStockist == undefined || this.superStockist == ''){
      this.toastrService.error("Please select Super Stockist")
      return;
    }
    if(this.FM == undefined || this.FM == ''){
      this.toastrService.error("Please select FM")
      return;
    }

    this.userInfo = this.authService.getUserDetail();
    let fromDate = this.datepipe.transform(this.fromDate, "yyyy-MM-dd");
    let toDate = this.datepipe.transform(this.toDate, "yyyy-MM-dd");
    let data={
      "FROM_DATE":fromDate,
      "TO_DATE":toDate,
      "SUPER_STOCKIST_CODE":this.superStockist,
      "FM":this.FM.FM_CODE,
      "USER_ID": JSON.parse(this.userInfo).USER_ID,
    }

    this.http.postnew(this.url.GETFINALCLAIMREPORT,data).then(
      (res:any)=>{
        this.Values=[];
        this.Header = [];
       // this.isLoaded= false;
       this.REPORT_DATA = [];
       this.REPORT_DATA = res.REPORT_DATA
       this.REPORT_HEADERS = res.REPORT_HEADERS
       this.reportGrid = [];
       this.reportGrid.v_header = res.REPORT_HEADERS
       this.reportGrid.v_detail = res.REPORT_DATA

       if(this.REPORT_DATA.length == 0){
        this.toastrService.error("No Records Found")
       }

       this.REPORT_DATA.forEach((element:any)=> {
        this.Header=Object.keys(element)
        // element.CLAIM_DATE = this.datepipe.transform(element.CLAIM_DATE, "dd-MM-yyyy")
        // element.INVOICE_DATE = this.datepipe.transform(element.INVOICE_DATE, "dd-MM-yyyy")
        
        element["Claim Date"] = (this.datepipe.transform(element["Claim Date"], "dd-MM-yyyy")).toString()
        element["Invoice Date"] = (this.datepipe.transform(element["Invoice Date"], "dd-MM-yyyy")).toString()
        this.Values.push(Object.values(element))

        for(let i =0 ;i<this.superStockistList.length;i++){
          if(this.superStockistList[i].SUPERSTOCKIST_CODE == this.superStockist){
            this.superStockistName = this.superStockistList[i].SUPERSTOCKIST_NAME
          }
         }
      
       });
      this.onShowGrid=true;
      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  printReport(divName:any){
    this.superStockistName  = '';
   
    if(this.REPORT_DATA.length == 0){
     this.toastrService.error("No Records Found")
     return;
    }
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();
    window.location.reload();

    document.body.innerHTML = originalContents;
  }
}
