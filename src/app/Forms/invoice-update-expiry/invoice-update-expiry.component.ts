import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { ToastrService } from 'ngx-toastr';
import { URLService } from 'src/app/Service/url.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-invoice-update-expiry',
  templateUrl: './invoice-update-expiry.component.html',
  styleUrls: ['./invoice-update-expiry.component.css']
})
export class InvoiceUpdateExpiryComponent implements OnInit {
  BANK_DATE = new Date();
  INVOICE_NO=[];
  NEW_POOL=[];
  invoiceNumber:any;
  newPool:any;
  customerPool:any;
  oldPool:any;
  invoiceList:any=[];
  poolMasterList:any=[];
  userInfo:any={};
  isDisabled:boolean = false;
  isHighLightInvoice:string="No";
  isHighLightNewPool:string="No";
  isUpdateInvoiceDetails:boolean = false;
  constructor(private router: Router,private SharedService: SharedService,private AuthService: AuthService,
    private ToastrService: ToastrService,private url: URLService,private http: HttpService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getInvoiceList();
  }

  getInvoiceList() {
    this.userInfo = this.AuthService.getUserDetail();
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
      ReqType: "M"
    }
    this.http.postnew(this.url.getInvoiceList, data).then(
      (res:any)=>{
        this.invoiceList=res.data;

      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  
  onInvoiceChange(){
    console.log(this.invoiceNumber,"num")
    if(this.invoiceNumber != undefined){
      this.customerPool = (this.invoiceNumber.CUSTOMER_CODE +"-"+ this.invoiceNumber.CUSTOMER_NAME);
      this.oldPool = (this.invoiceNumber.POOL_CODE +"-"+ this.invoiceNumber.POOL_DESC);
        this.BANK_DATE=this.invoiceNumber.BILLING_DATE
       
    }
  }
  onSaveInvoiceClick(){
    this.isHighLightInvoice = "No";
    this.isHighLightNewPool = "No";
    if(this.invoiceNumber == undefined || this.invoiceNumber == ""){
      this.isHighLightInvoice = "Yes";
    }else{
      this.isHighLightInvoice = "No";
    }
  

    if(this.isHighLightInvoice == "Yes"){
      this.ToastrService.error("Please select value in Invoice No.");
    }

    if(this.isHighLightInvoice != "Yes"){
      this.isUpdateInvoiceDetails = true;
      //this.SaveInvoiceMatser();
    }
  }
  SaveInvoiceMatser() {
    let date = this.datepipe.transform(this.BANK_DATE, "dd-MM-yyyy");
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
      BILL_DOC_NO:this.invoiceNumber.BILL_DOC_NO
      
    }
    console.log("save pool data",data)
    
    //this.http.postnew(this.url.saveInvoiceMaster, data).then(
    this.http.postnew(this.url.UPDATEINVOICETOYS2EXPIRY, data).then(
      (res:any)=>{
        if(res.FLAG==1){
          this.ToastrService.success(res.MSG);
          this.getInvoiceList();
          this.onClearData();
        } else{
          this.ToastrService.error(res.MSG);
        }
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }



  onClearData(){
    this.invoiceNumber="";
    this.isUpdateInvoiceDetails = false;
    this.BANK_DATE = new Date();
    this.customerPool=undefined;
    this.oldPool=undefined;
  }

  closePopup(){
    this.isUpdateInvoiceDetails = false;
  }
}
