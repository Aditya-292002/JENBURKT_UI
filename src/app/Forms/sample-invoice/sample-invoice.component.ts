import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-sample-invoice',
  templateUrl: './sample-invoice.component.html',
  styleUrls: ['./sample-invoice.component.css']
})
export class SampleInvoiceComponent implements OnInit {
  sampleInvoiceList:any=[];
  finalData:any =[];
  userInfo:any = {};
  isLoaded:boolean;
  date1:any;
  hideShowCalendar:boolean;
  constructor(private authService: AuthService, private url: URLService, private http: HttpService,
     private toastrService: ToastrService,private datepipe:DatePipe) { }

  ngOnInit(): void {
    this.GETSAMPLEINVOICEDETAILSBYUSERID();
  }

  GETSAMPLEINVOICEDETAILSBYUSERID(){
    this.userInfo = this.authService.getUserDetail();
     var userId=JSON.parse(this.userInfo).USER_ID
    let data={
      USER_ID:userId
    }
    this.isLoaded = true;
    this.http.postnew(this.url.GETSAMPLEINVOICEDETAILSBYUSERID, data).then(
      (res: any) => {
        this.isLoaded = false;
        this.sampleInvoiceList=res.INVOICE_DETAILS
      },
      error => {
        this.isLoaded = false;
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  onSaveReceiptDetaisls(){
    this.finalData = [];
    var j = 0;
    for(let i = 0;i<this.sampleInvoiceList.length;i++){
      if(this.sampleInvoiceList[i].SELECTED == true){
        this.sampleInvoiceList[i].RECEIVED_ON = this.datepipe.transform(this.sampleInvoiceList[i].RECEIVED_ON, "yyyy-MM-dd");
        this.finalData[j] = this.sampleInvoiceList[i];
        j++
      }
    }

    if(this.finalData.length == 0){
      this.toastrService.error("Atleast select one value");
      return;
    }
    this.userInfo = this.authService.getUserDetail();
    var userId=JSON.parse(this.userInfo).USER_ID

    let data={
      USER_ID:userId,
      INVOICE_DETAILS:this.finalData,
    }

    this.isLoaded = true;

    this.http.postnew(this.url.UPDATESAMPLEINVOICEDISPATCHEDSTATUS, data).then(
      (res:any)=>{
        if(res.FLAG == 1){
          this.isLoaded = false;
          this.toastrService.success(res.MSG);
          this.finalData = [];
          this.GETSAMPLEINVOICEDETAILSBYUSERID();

        } else{
          this.toastrService.error(res.MSG);
        }

      },
      error =>{

        this.toastrService.error("Oops, Something went wrong.");
         this.isLoaded = false;
      }
    );
  }
  hideShowCalendarIcon(){
    this.hideShowCalendar=true
  }
}
