import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilterPipe } from 'src/app/directive/filter.pipe';
import { AuthService } from 'src/app/Service/auth.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { PipeService } from 'src/app/Service/pipe.service';
import { URLService } from 'src/app/Service/url.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-payment-cme',
  templateUrl: './payment-cme.component.html',
  styleUrls: ['./payment-cme.component.css']
})
export class PaymentCmeComponent implements OnInit {

  CME_NO:any;
  DATE:any;
  REQ_BY:any;
  HQ_CODE:any;
  CME_TYPE_ID:any;
  CAMP_TYPE:any;
  AMOUNT:any;
  GST:any;
  OLD_PAID:any;
  OLD_TDS:any;
  OUT_STANDING:any;
  PAY_AMOUNT:any;
  PAY_MODE:any;
  PAYMENT_REF:any;
  EXCESS:any;
  RECOVERY:any;
  TDS_AMOUNT:any;
  ViewPamentData:boolean = false;
  PAYMENT_DATE:any;
  CME_DATE:any;
  isLoaded:boolean = false;
  REQUEST_CME_LIST:any = [];
  SAMPEL_REQUEST_CME_LIST:any = [];
  userInfo:any = {};
  HQ_CODE_LIST:any = [];
  CAMP_TYPE_LIST:any = [];
  CME_TYPE_LIST:any = [];
  PAYMENT_TYPE_LIST:any = [];
  PAYMENT_CME_LIST:any = [];
  SAMPEL_PAYMENT_CME_LIST:any = [];
  USER_LIST:any = [];
  req_by:any;
  hq_code:any;
  camp_type:any;
  cme_type:any;
  PAYMENT_TYPE_ID:any = '2';
  ERP_REF:any;
  CME_ID:any;
  isCampTypeView:boolean = false;
  ViewCmeData:boolean = true;
  ViewPamentDataList:boolean = false;
  ispaymentlistview:boolean = false;
  RECEIVED_PAYMENT:boolean = false;
  PENDING_PAYMENT:boolean = true;
  isPayemntDataView:boolean = false;
  PAYMENT_NO:any;
  CME_DOCUMENT_LIST:any = [];
  PAYMENT_FROM_DATE:any;
  PAYMENT_TO_DATE:any;
    BANK_NAME: any
  ACCOUNT_NUMBER: any
  BANK_IFSC: any
  PAN_NO: any;
  UTR_NO: any;

  constructor(private authService:AuthService,private   url:URLService,private http:HttpService,
    private toastrService:ToastrService,private common:CommonService,public datePipe: DatePipe,private router:Router) { 
    }


  ngOnInit(): void {
    this.userInfo = JSON.parse(this.authService.getUserDetail());
    this.GETCMEREQUESTPAYMENTLISTBYUSERID();
  }

  async GETCMEPAYMENTLISTBYUSERID(){
    let data = {  
      "USER_ID": this.userInfo.USER_ID
    }
      this.isLoaded = true;
    await this.http.postnew(this.url.GETCMEPAYMENTLISTBYUSERID, data).then(
      (res: any) => {
        // console.log('res ->' , res)
        this.SAMPEL_PAYMENT_CME_LIST = [];
        this.SAMPEL_PAYMENT_CME_LIST = res.PAYMENT_CME_LIST;
        this.SAMPEL_PAYMENT_CME_LIST.forEach((element: any) => {
          element.PAY_AMOUNT = (+element.PAY_AMOUNT).toFixed(2); 
          element.TDS_AMOUNT = (+element.TDS_AMOUNT).toFixed(2);
        })
        this.PAYMENT_CME_LIST = this.SAMPEL_PAYMENT_CME_LIST;
        this.isLoaded = false;
      },
      error => {
        console.log(error);
        this.isLoaded = false;
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  ViewCmeDataList(){
    this.GETCMEPAYMENTLISTBYUSERID();
    this.ViewPamentDataList = true;
  }

    async GETCMEREQUESTPAYMENTLISTBYUSERID(){
      let data = {  
        "USER_ID": this.userInfo.USER_ID
      }
        this.isLoaded = true;
      await this.http.postnew(this.url.GETCMEREQUESTPAYMENTLISTBYUSERID, data).then(
        (res: any) => {
          // console.log('res ->' , res)
          this.SAMPEL_REQUEST_CME_LIST = [];
          this.SAMPEL_REQUEST_CME_LIST = res.REQUEST_CME_LIST;
          this.SAMPEL_REQUEST_CME_LIST.forEach((element: any) => {
            element.AMOUNT = (+element.AMOUNT).toFixed(2); 
            element.GST = (+element.GST).toFixed(2);
            element.OUT_STANDING = (+element.OUT_STANDING).toFixed(2); 
          })
          this.REQUEST_CME_LIST = this.SAMPEL_REQUEST_CME_LIST;
          this.isLoaded = false;
        },
        error => {
          console.log(error);
          this.isLoaded = false;
          this.toastrService.error("Oops, Something went wrong.");
        }
      );
    }
    
  GetPayemntCmeForCmeNo(data:any){
     //console.log('data ->' , data)
   this.CME_NO = data.CME_NO;
   this.CME_ID = data.CME_ID;
   this.CME_DATE = this.datePipe.transform(data.CME_DATE, 'dd-MM-yyyy'); 
   this.req_by = data.REQ_BY;
   this.hq_code = data.HQ_CODE;
   this.AMOUNT = data.AMOUNT;
   this.GST = data.GST;
   this.camp_type = data.CAMP_TYPE;
   this.cme_type = data.CME_TYPE;
   this.OLD_PAID = data.OLD_PAID.toFixed(2);
   this.OLD_TDS = data.OLD_TDS.toFixed(2);
   this.OUT_STANDING = data.OUT_STANDING;
   this.PAYMENT_DATE = new Date();
   this.ViewPamentDataList = false;
   this.ViewCmeData = false;
   this.isPayemntDataView = false;
   this.ViewPamentData = true;
   this.BANK_NAME=data.BANK_NAME;
   this.ACCOUNT_NUMBER=data.ACCOUNT_NUMBER;
   this.BANK_IFSC=data.BANK_IFSC;
   this.PAN_NO=data.PAN_NO
   this.PAY_AMOUNT=data.PAY_AMOUNT
      this.UTR_NO=data.UTR_NO
   this.GETPAYMENTMASTERLIST();
  }

   
  GetPayemntDataCmeForPaymentNo(data:any){
    //  console.log('data ->' , data)
   this.PAYMENT_NO = data.PAYMENT_NO;
   this.CME_NO = data.CME_NO;
   this.CME_ID = data.CME_ID;
   this.CME_DATE = '';
   this.CME_DATE = this.datePipe.transform(data.CME_DATE, 'dd-MM-yyyy');
   this.req_by = data.REQ_BY;
   this.hq_code = data.HQ_CODE;
   this.AMOUNT = data.AMOUNT.toFixed(2);;
   this.GST = data.GST.toFixed(2);
   this.PAY_AMOUNT = data.PAY_AMOUNT;
   this.TDS_AMOUNT = data.TDS_AMOUNT;
   this.PAYMENT_TYPE_ID = data.PAYMENT_MODE;
   this.PAYMENT_REF = data.PAYMENT_REF_NO;
   this.ERP_REF = data.ERP_REF_NO;
   this.BANK_NAME=data.BANK_NAME;
   this.BANK_IFSC=data.BANK_IFSC;
   this.ACCOUNT_NUMBER=data.ACCOUNT_NUMBER
   this.PAYMENT_DATE = this.datePipe.transform(data.PAYMENT_DATE, 'dd-MM-yyyy');
   this.camp_type = data.CAMP_TYPE;
   this.cme_type = data.CME_TYPE;
   this.ViewPamentDataList = false;
   this.ViewPamentData = true;
   this.ViewCmeData = false;
   this.isPayemntDataView = true;
   this.UTR_NO=data.UTR_NO
   this.GETPAYMENTMASTERLIST();
  }

  async GETPAYMENTMASTERLIST(){
    let data = {  
      "USER_ID": this.userInfo.USER_ID,
      "CME_ID": this.CME_ID
    }
      this.isLoaded = true;
    await this.http.postnew(this.url.GETPAYMENTMASTERLIST, data).then(
      (res: any) => {
        this.HQ_CODE_LIST = res.HQ_CODE_LIST;
        this.CAMP_TYPE_LIST = res.CAMP_TYPE_LIST;
        this.CME_TYPE_LIST = res.CME_TYPE_LIST;
        this.PAYMENT_TYPE_LIST = res.PAYMENT_TYPE_LIST;
        this.CME_DOCUMENT_LIST = res.CME_DOCUMENT_LIST;
        this.USER_LIST = res.USER_LIST;
        this.HQ_CODE_LIST.forEach((element:any) => {
          if(element.HQ_CODE == this.hq_code){
             this.HQ_CODE = element.HQ_DESC
          }
        });
        this.CAMP_TYPE_LIST.forEach((element:any) => {
          if(element.CAMP_TYPE_ID == this.camp_type){
             this.CAMP_TYPE = element.CAMP_TYPE_ID
          }
        });
        this.CME_TYPE_LIST.forEach((element:any) => {
          if(element.CME_TYPE_ID == this.cme_type){
             this.CME_TYPE_ID = element.CME_TYPE_ID
             if(this.CME_TYPE_ID == 5){
              this.isCampTypeView = true;
            }else{
             this.isCampTypeView = false;
            }
          }
        });
        this.USER_LIST.forEach((element:any) => {
          if(element.USER_ID == this.req_by){
             this.REQ_BY = element.USER_NAME
          }
        });
        this.isLoaded = false;
      },
      error => {
        console.log(error);
        this.isLoaded = false;
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

   SAVECMEPAYMENT(){

    // if(!this.common.isValid(this.OLD_PAID)){
    //    this.toastrService.error('Enter a Old Paid');
    //    return
    // }
    // if(!this.common.isValid(this.OLD_TDS)){
    //   this.toastrService.error('Enter a Old Tds');
    //   return
    // }
    // if(!this.common.isValid(this.OUT_STANDING)){
    //   this.toastrService.error('Enter a O/s');
    //   return
    // }

    if(!this.common.isValid(this.PAY_AMOUNT)){
      this.toastrService.error('Enter a Pay Amount');
      return
    }

    if(+this.AMOUNT  < +this.PAY_AMOUNT ){
      this.toastrService.error('Pay amount should not be greater than Amt');
      return
    } 
    
    // if(+this.OLD_PAID < +this.PAY_AMOUNT ){
    //   this.toastrService.error('Pay amount should not be  greater than Old Paid');
    //   return
    // }

    if(+this.OUT_STANDING  < +this.PAY_AMOUNT ){
      this.toastrService.error('Pay amount should not be  greater than Out Standing');
      return
    } 
    if(!this.common.isValid(this.TDS_AMOUNT)){
      this.toastrService.error('Enter a Tds Amount');
      return
    }
    
    var sum = (+this.PAY_AMOUNT) + (+this.TDS_AMOUNT);
    var Value = sum.toString();

    if(+Value > +this.OUT_STANDING  ){
      this.toastrService.error('TDS + Pay amount should not be greater than Outstanding');
      return
    }

    if(!this.common.isValid(this.PAYMENT_TYPE_ID)){
      this.toastrService.error('Select a Pay mode');
      return
    }
    if(!this.common.isValid(this.PAYMENT_DATE)){
      this.toastrService.error('Select a Payment date');
      return
    }
    if(!this.common.isValid(this.PAYMENT_REF)){
      this.toastrService.error('Enter a Payment Ref');
      return
    }

    
      if (!this.common.isValid(this.BANK_IFSC)) {
        this.toastrService.error('Enter a Bank IFSC Code')
        return
      }
 
  
      if (!this.common.isValid(this.BANK_NAME)) {
        this.toastrService.error('Enter a Bank Name')
        return
      }
   

        if (!this.common.isValid(this.PAN_NO)) {
        this.toastrService.error('Enter a Pan Number')
        return
      }
  

   
      if (!this.common.isValid(this.ACCOUNT_NUMBER)) {
        this.toastrService.error('Enter a Bank Account Number')
        return
      }

          if (!this.common.isValid(this.UTR_NO)) {
        this.toastrService.error('Enter a UTR Number')
        return
      }
   

    let data = {  
      "USER_ID": this.userInfo.USER_ID,
      "CME_PAYMENT_DATA": {
        "CME_ID": this.CME_ID,
        "PAYMENT_DATE": this.PAYMENT_DATE,
        "PAYMENT_REF_NO": this.PAYMENT_REF,
        "ERP_REF_NO": this.ERP_REF,
        "PAYMENT_MODE": this.PAYMENT_TYPE_ID,
        "PAY_AMOUNT": this.PAY_AMOUNT,
        "TDS_AMOUNT": this.TDS_AMOUNT,
        "BANK_NAME": this.common.isValid(this.BANK_NAME) ? this.BANK_NAME : "",
        "ACCOUNT_NUMBER": this.common.isValid(this.ACCOUNT_NUMBER) ? this.ACCOUNT_NUMBER : "",
        "BANK_IFSC": this.common.isValid(this.BANK_IFSC) ? this.BANK_IFSC : "",
        "PAN_NO": this.common.isValid(this.PAN_NO) ? this.PAN_NO : "",
        "UTR_NO":this.common.isValid(this.UTR_NO) ? this.UTR_NO : "",
      }
    }

    // console.log('DATA ->'  , JSON.stringify(data))
    // return
      this.isLoaded = true;
    this.http.postnew(this.url.SAVECMEPAYMENT, data).then(
      (res: any) => {
      if(res.FLAG == true){
        this.isLoaded = false;
        this.toastrService.success(res.MSG);
        this.ViewPamentData = false;
        this.ViewPamentDataList = false;
        this.ViewCmeData = true;
        this.CANCELCMEPAYMENT();
        this.GETCMEREQUESTPAYMENTLISTBYUSERID();
      }else if(res.FLAG == false){
        this.toastrService.error(res.MSG);
      }
      });
  }

  ClickPaymentMode(val:any){
   if(val == 1){
      this.RECEIVED_PAYMENT = false;
      this.ViewPamentDataList = false;
      this.PENDING_PAYMENT = true;
      this.ViewCmeData = true;
   }else if(val == 0){
      this.PENDING_PAYMENT = false;
      this.ViewCmeData = false;
      this.RECEIVED_PAYMENT = true;
      this.ViewPamentDataList = true;
      this.ViewCmeDataList();
   }
  }

  BackToList(){
   this.ViewPamentData = false;
   this.ViewPamentDataList = false;
   this.RECEIVED_PAYMENT = false;
   this.ViewCmeData = true;
   this.PENDING_PAYMENT = true;
   this.CANCELCMEPAYMENT();
   this.GETCMEREQUESTPAYMENTLISTBYUSERID();
  }

  CANCELCMEPAYMENT(){
   this.PAY_AMOUNT = '';
   this.TDS_AMOUNT = '';
   this.PAYMENT_TYPE_ID = '';
   this.PAY_AMOUNT = '';
   this.PAYMENT_DATE = new Date();
   this.PAYMENT_REF = '';
   this.ERP_REF = '';
  }

  
  DownloadDocument(value:any,extension:any,filename:any){
    let base64 = this.cleanBase64(value);
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    if(extension == '.png'){
      var fileBlob = new Blob([byteArray], { type: 'image/png' }); // Change type for different image formats
    }else if(extension == '.jpg'){
      var fileBlob = new Blob([byteArray], { type: 'image/jpg' }); // Change type for different image formats
    }else if(extension == '.jpeg'){
      var fileBlob = new Blob([byteArray], { type: 'image/jpeg' }); // Change type for different image formats
    }else if(extension == '.pdf'){
      var fileBlob = new Blob([byteArray], { type: 'application/pdf' }); // Change type for different image formats
    }

    const fileURL = URL.createObjectURL(fileBlob);

    const a = document.createElement('a');
    a.href = fileURL;
    a.download = filename; // Change filename for different image formats
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  
  cleanBase64(base64String: string): string {
    // Remove data URI scheme and other unnecessary parts (e.g., data:image/png;base64,)
    const parts = base64String.split(',');
    if (parts.length > 1) {
      base64String = parts[1];
    } else {
      base64String = parts[0];
    }
  
    // Remove whitespace characters
    base64String = base64String.trim().replace(/\s+/g, '');
  
    // Add padding if necessary
    const missingPadding = base64String.length % 4;
    if (missingPadding !== 0) {
      base64String += '='.repeat(4 - missingPadding);
    }
  
    return base64String;
  }

  filterByDateRange() {
    if (this.PAYMENT_FROM_DATE && this.PAYMENT_TO_DATE) {
      this.PAYMENT_CME_LIST = this.SAMPEL_PAYMENT_CME_LIST.filter(item => {
        const date = new Date(item.PAYMENT_DATE);
        return date >= this.PAYMENT_FROM_DATE && date <= this.PAYMENT_TO_DATE;
      });
    } else {
      // Reset filter if no date range is selected
      this.PAYMENT_CME_LIST = [...this.SAMPEL_PAYMENT_CME_LIST];
    }
  }
    exportAsXLSX(): void {
    
    this.exportAsExcelFile(this.REQUEST_CME_LIST, 'PAYMENT_PENDING_LIST');
  }

    public exportAsExcelFile(json: any[], excelFileName: string): void {
  
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
      console.log('worksheet', worksheet);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
      this.saveAsExcelFile(excelBuffer, excelFileName);
    }
  
    private saveAsExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }


       PANFlag:boolean=false
isValidPanCardNo() {
  console.log('Inside PAN validation');

  // PAN format: 5 uppercase letters, 4 digits, 1 uppercase letter
  // let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  // return panRegex.test(pan.toUpperCase());
  // Check if the PAN number is valid
   if(this.PAN_NO=='' || this.PAN_NO==null){
     this.PANFlag = false;
     return false;
   }


  if (panRegex.test(this.PAN_NO)) {
    this.PANFlag = false;
    console.log('Valid PAN');
    return true;
  } else {
    this.PANFlag = true;
    console.log('Invalid PAN');
    return false;
  }
}

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
 ifscFlag: boolean = false
    isValid_IFSC_Code() {
    console.log('insdie');
    if(this.BANK_IFSC==null || this.BANK_IFSC==''){
     this.ifscFlag=false;
     return false
    }
   
    let regex = new RegExp(/^[A-Z]{4}0[A-Z0-9]{6}$/);
    this.ifscFlag = false
 
    if (regex.test(this.BANK_IFSC) == true) {
      this.ifscFlag = false
      console.log(' this.ifscFlag1')
      return true;
    }
    else {
      this.ifscFlag = true
      console.log(' this.ifscFlag2')
      return false;

    }



  }
  
}
