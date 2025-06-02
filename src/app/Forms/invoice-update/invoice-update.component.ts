import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { ToastrService } from 'ngx-toastr';
import { URLService } from 'src/app/Service/url.service';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-invoice-update',
  templateUrl: './invoice-update.component.html',
  styleUrls: ['./invoice-update.component.css']
})
export class InvoiceUpdateComponent implements OnInit {
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
        console.log("response",res);
        this.invoiceList=res.data;
        console.log(' this.invoiceList', this.invoiceList);
        
        // this.invoiceList.forEach((value:any)=>{
        //   value.DisplayName = (value.BILL_DOC_NO == '' ? '' : (value.BILL_DOC_NO+ "-" +value.POOL_CODE));
        // })
        this.getPoolMasterList();
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  getPoolMasterList() {
    this.userInfo = this.AuthService.getUserDetail();
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
      ReqType: "M"
    }
    this.http.postnew(this.url.getPoolList, data).then(
      (res:any)=>{
        console.log("response",res);
        this.poolMasterList=res.data;
        this.poolMasterList.forEach((value:any)=>{
          value.DisplayName = (value.POOL_CODE == '' ? '' : (value.POOL_CODE+ "-" +value.POOL_DESC));
        })
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  onInvoiceChange(){
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
    if(this.newPool == undefined || this.newPool == ""){
      this.isHighLightNewPool = "Yes";
    }else{
      this.isHighLightNewPool = "No";
    }

    if(this.isHighLightInvoice == "Yes"){
      this.ToastrService.error("Please select value in Invoice No.");
    }
    if(this.isHighLightNewPool == "Yes"){
      this.ToastrService.error("Please select value in New Pool.");
    }
    if(this.isHighLightInvoice != "Yes" && this.isHighLightNewPool != "Yes"){
      this.SaveInvoiceMatser();
    }
  }
  SaveInvoiceMatser() {
    let date = this.datepipe.transform(this.BANK_DATE, "dd-MM-yyyy");
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
      TO_POOL:this.newPool.POOL_CODE,
      FROM_POOL:this.invoiceNumber.POOL_CODE,
      BILL_DOC_NO:this.invoiceNumber.BILL_DOC_NO
      
    }
    console.log("save pool data",data)
    
    
    //this.http.postnew(this.url.saveInvoiceMaster, data).then(
    this.http.postnew(this.url.SaveInvoiceTransaction, data).then(
      (res:any)=>{
        if(res.data[0].FLAG==1){
          this.ToastrService.success(res.data[0].MSG);
          this.getInvoiceList();
          this.onClearData();
        } else{
          this.ToastrService.error(res.data[0].MSG);
        }
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }

  filterInvoiceNumber:any=[];
  filteredInvoiceNumber(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.invoiceList.length; i++) {
      let invoiceList = this.invoiceList[i];
      if (invoiceList.BILL_DOC_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(invoiceList);
      }
    }

    this.filterInvoiceNumber = filtered;
  }

  setInvoiceNumber(fileterlist, code: any) {
    code = "";
      this.filterInvoiceNumber.forEach((element: any, index: number) => {
        if (element.BILL_DOC_NAME != this.invoiceList.BILL_DOC_NAME && this.invoiceList.BILL_DOC_NAME == undefined) {
          if (index == 0) {
            code = element;
            this.invoiceList = code;
            this.filterInvoiceNumber = [];
          }
          else {
            this.invoiceList = element;
            return;
          }
        }
      });
  }

  filterNewPool:any=[];
  filteredNewPool(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.poolMasterList.length; i++) {
      let poolMasterList = this.poolMasterList[i];
      if (poolMasterList.DisplayName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(poolMasterList);
      }
    }

    this.filterNewPool = filtered;
  }

  setNewPool(fileterlist, code: any) {
    code = "";
      this.filterNewPool.forEach((element: any, index: number) => {
        if (element.DisplayName != this.poolMasterList.DisplayName && this.poolMasterList.DisplayName == undefined) {
          if (index == 0) {
            code = element;
            this.poolMasterList = code;
            this.filterNewPool = [];
          }
          else {
            this.poolMasterList = element;
            return;
          }
        }
      });
  }


  onClearData(){
    this.invoiceNumber="";
    this.BANK_DATE = new Date();
    this.newPool="";
    this.customerPool=undefined;
    this.oldPool=undefined;
  }
}
