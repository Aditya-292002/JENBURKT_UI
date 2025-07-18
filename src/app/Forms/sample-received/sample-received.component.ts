import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
@Component({
  selector: 'app-sample-received',
  templateUrl: './sample-received.component.html',
  styleUrls: ['./sample-received.component.css']
})
export class SampleReceivedComponent implements OnInit {
  setValue: any;
  gridDataSetValue: any;
  first: number = 0;
  totalRecords: number = 0;
  rows: number = 10;
  last: number;
  userInfo:any;
    showGridData: any = {};
  isLoaded: boolean=false;
  INVOICE_DETAILS: any;
  TO_DATE=new Date();
  FROM_DATE=new Date();
  salesRoleId: any;
  HQ_CODE_LIST: any;
  HQ_CODE: any;
  receivedModelFlag: boolean=false;
  DOCKET_NO: any;
  INVOICE_NO: any;
  RECEIVEDFLAG: boolean=false;
  PENDINGFLAG: boolean=true;
  STATUS: string="P";
  PRODUCT_DETAILS: any;
  productDetailFlag: boolean;
  showGridData1: any={};
  constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService, private common: CommonService, public datePipe: DatePipe, private router: Router, public httpclient: HttpClient) {
  }
  ngOnInit(): void {
    this.userInfo = JSON.parse(this.authService.getUserDetail());
    this.GETSAMPLERECEIVEDETAILSBYUSERID();
    this.GETHQLIST();
    this.FROM_DATE=new Date(this.getOneMonthAgo())
  }
    onPageChange(event: any) {
    console.log(event.first);

    console.log('this.totalRecords', this.totalRecords);
    this.last = this.first;
    this.first = event.first;
    this.rows = event.rows;
  }
  GETSAMPLERECEIVEDETAILSBYUSERID() {
    let data = {
      "USER_ID": this.userInfo.USER_ID,
      "SALES_ROLE_ID":this.userInfo.SALESROLE_ID,
      "FROM_DATE":this.FROM_DATE,
      "TO_DATE":this.TO_DATE,
      "HQ_CODE":this.HQ_CODE,
      "STATUS":this.STATUS
    }

   // console.log('DATA ->', JSON.stringify(data))
    // return
    this.isLoaded = true;
    this.http.postnew(this.url.GETSAMPLERECEIVEDETAILSBYUSERID, data).then(
      (res: any) => {
        console.log('123', res);
        this.isLoaded = false;
        this.INVOICE_DETAILS = res.INVOICE_DETAILS;
     
        if(this.INVOICE_DETAILS.length>0){
        this.showGridData["GridList"] = this.INVOICE_DETAILS;
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
        }else{
          this.showGridData=[]
        }
      
console.log('this.showGridData',this.showGridData);


      });
  }
  openModel(data:any){
    console.log(data);
    
    this.receivedModelFlag=true;
    this.DOCKET_NO=data.DOCKET_NO
    this.INVOICE_NO=data.INVOICE_NO
  }
  
  UPDATERECEIVESTATUS(){
    let data = {
          "USER_ID": this.userInfo.USER_ID,
          "INVOICE_NO":this.INVOICE_NO,
        }
    this.isLoaded = true;
    this.http.postnew(this.url.UPDATESAMPLEINVOICERECEIVESTATUS, data).then(
      (res: any) => {
          if(res.data[0].FLAG == true){
          this.isLoaded = false;
          this.toastrService.success(res.data[0].MSG);
          this.GETSAMPLERECEIVEDETAILSBYUSERID();
        this.receivedModelFlag=false;
        } else{
          this.toastrService.error(res.data[0].MSG);
        }

      },
      error =>{
        this.toastrService.error("Oops, Something went wrong.");
         this.isLoaded = false;
      }
    );
      
  }
  closeModel(){
    this.receivedModelFlag=false;
  }
  ClickPaymentMode(val:any)
{
   if(val == 1){
      this.RECEIVEDFLAG = false;
     this.PENDINGFLAG = true;
     this.STATUS='P'
     this.GETSAMPLERECEIVEDETAILSBYUSERID()
   }else if(val == 0){
      this.PENDINGFLAG = false;
      this.RECEIVEDFLAG = true;
       this.STATUS='R'
      this.GETSAMPLERECEIVEDETAILSBYUSERID()
   }
}

GETHQLIST(){
      let data = {
      "USER_ID": this.userInfo.USER_ID
       }
      this.http.postnew(this.url.GETHQFORSAMPLERECEIVELIST, data).then(
      (res: any) => {
        console.log('res',res);
        
          // if(res.data[0].FLAG == true){
             this.HQ_CODE_LIST=res.HQ_LIST
          this.isLoaded = false;
          
       
     
        // } else{
          // this.toastrService.error(res.data[0].MSG);
        // }

      },
      error =>{
        this.toastrService.error("Oops, Something went wrong.");
         this.isLoaded = false;
      }
    );
}


  GETSAMPLEPRODUCTDETAILS(DATA:any){
    console.log('details',DATA);
    
    let data = {
          "USER_ID": this.userInfo.USER_ID,
          "INVOICE_NO":DATA.INVOICE_NO
         
        }
    this.isLoaded = true;
    this.http.postnew(this.url.GETSAMPLERECEIVEPRODUCTDETAILSBYINVOICENO, data).then(
      (res: any) => {
        
      this.PRODUCT_DETAILS=res.PRODUCT_DETAILS
        if(this.PRODUCT_DETAILS.length>0){
        this.showGridData1["GridList"] = this.PRODUCT_DETAILS;
        this.setValue = this.gridDataSetValue;

        // Clear headers & keys
        this.showGridData1["GridHeadersList"] = [];
        this.showGridData1["SearchKey"] = [];

        // Extract headers from first row
        if (this.showGridData1.GridList.length > 0) {
          const keys = Object.keys(this.showGridData1.GridList[0]);
          console.log('sinside2');

          keys.forEach(key => {
            const header = {
              Headers: key,
              Field: key
            };
            this.showGridData1["SearchKey"].push(key);
            this.showGridData1["GridHeadersList"].push(header);
            console.log('sinside3');
          });
        }
        }else{
          this.showGridData=[]
        }




      this.productDetailFlag=true;
        this.isLoaded = false;
      },
      error =>{
         this.productDetailFlag=false;
        this.toastrService.error("Oops, Something went wrong.");
         this.isLoaded = false;
      }
    );
      
  }
   getOneMonthAgo(): string {
    const today = new Date();
    today.setMonth(today.getMonth() - 1); // Subtract 1 month
    return today.toISOString().split('T')[0]; // Return as YYYY-MM-DD
  }
}
