import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';


@Component({
  selector: 'app-claim-approve-details',
  templateUrl: './claim-approve-details.component.html',
  styleUrls: ['./claim-approve-details.component.css']
})
export class ClaimApproveDetailsComponent implements OnInit {
  INVOICE_NO:any;
  DATE:any;
  SALE_QTY:any;
  SCHEME_FREE_QTY:any = 0;
  CLAIM_FREE_QTY:any;
  SUPER_STOCKIST_NAME:any;
  MRP:any;
  UPLOAD:any;
  isLoaded:boolean;
  claimapprovedetails:any=[];
  imageData:any;
  myclaimrequestImage:boolean;
  userInfo:any;
  userData:any;
  OnRSMShowHide:boolean
  OnSMShowHide:boolean
  OnPMTShowHide:boolean
  OnFMShowHide:boolean;
  isHighLightClaimSaleQty:string="No";
  isHighLightSchemeFreeQty:string="No";
  isHighLightInvoiceNo:string="No";
  isHighLightReason:string="No";
  isHighLightDate:string="No";
  isHighLightClaimInvoiceSaleQty:string="No";

  REQ_SALE_REQ_FREE_PERC:any=0;
  VALID_CLAIM_FREE_QTY:any=0;

  
  visible:boolean;
  rejectlist:boolean;
  REMARK:any;
  REASON:any;
  DOCTOR_CODE:any;
  PRODUCT_CODE:any;
  HISTORY_LIST:any = [];
  isShowHistoryList:boolean = false;
  doctorHistoryDetails:any;
  isShowHistoryDetails:boolean = false;
  isEdit:boolean = false;
  INVOICE_SALE_QTY:any = 0;
  REQUEST_ID:any = 0
  constructor(private router: Router,private authService: AuthService,private url: URLService,private http: HttpService,
    private toastrService:ToastrService,public datepipe: DatePipe,private _sanitizer: DomSanitizer) { }
    dateTime = new Date();
  
  ngOnInit(): void {
    this.claimapprovedetails=JSON.parse(localStorage.getItem("CLAIM_APPROVE_LIST"));
    // this.INVOICE_NO=this.claimapprovedetails.INVOICE_NO
    // this.DATE=this.claimapprovedetails.INVOICE_DATE
    // this.SALE_QTY=this.claimapprovedetails.INVOICE_SALE_QTY
    // this.SCHEME_FREE_QTY=this.claimapprovedetails.SCHEME_FREE_QTY
    // this.CLAIM_FREE_QTY=this.claimapprovedetails.CLAIM_FREE_QTY
    // this.SUPER_STOCKIST_NAME=this.claimapprovedetails.SUPERSTOCKIST_NAME
    // this.MRP=this.claimapprovedetails.MRP
this.INVOICE_NO=this.claimapprovedetails.INVOICE_NO
let date = new Date(this.claimapprovedetails.INVOICE_DATE) 
this.DATE=date
    if(this.claimapprovedetails.FMSTATUS!=null){
      this.OnFMShowHide=true;

     }else{
      this.OnFMShowHide=false;
     }
     if(this.claimapprovedetails.RSMSTATUS!=null){
      this.OnRSMShowHide=true;

     }else{
      this.OnRSMShowHide=false;
     }
     if(this.claimapprovedetails.SMSTATUS !=null){
      this.OnSMShowHide=true;

     }else{

      this.OnSMShowHide=false;
     }
     if(this.claimapprovedetails.PMTSTATUS!=null){
      this.OnPMTShowHide=true;

     }else{

      this.OnPMTShowHide=false;
     }

  //   this.CLAIM_FREE_QTY = this.claimapprovedetails.CLAIM_FREE_QTY;
     this.CLAIM_FREE_QTY = this.claimapprovedetails.LAST_UPDATED_CLAIM_FREE_QTY;

    // this.SCHEME_FREE_QTY = this.claimapprovedetails.SCHEME_FREE_QTY;
     this.INVOICE_SALE_QTY = this.claimapprovedetails.INVOICE_SALE_QTY;
     this.REQUEST_ID = this.claimapprovedetails.REQUEST_ID;
   //  this.SCHEME_FREE_QTY = this.claimapprovedetails.LAST_UPDATED_SCHEME_FREE_QTY;
     this.SCHEME_FREE_QTY = 0;

     
     this.DOCTOR_CODE = this.claimapprovedetails.DOCTOR_ID;
     this.PRODUCT_CODE = this.claimapprovedetails.PRODUCT_CODE;
  }

  GETINVOICEIMAGEBYCLAIMNO(){


    let data={
      CLAIM_NO:this.claimapprovedetails.CLAIM_NO
    }
    this.http.postnew(this.url.GETINVOICEIMAGEBYCLAIMNO,data).then(
      (res:any)=>{
        this.isLoaded= false;
      // console.log('res',res)
         this.imageData=res.data
         if(this.imageData==""){
          this.toastrService.error("No Image Found");
          return;
         }

         this.imageData = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                 + res.data);
                 this.myclaimrequestImage=true;

      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  onClickApprove(){
    this.visible=true;
  }
  onClickReject(){
  this.rejectlist=true;
  }
 async onClaimApproveReject(status:any){
   console.log('status',status)
   if(status == 2){
    this.CLAIM_FREE_QTY = 0;
    this.SCHEME_FREE_QTY = 0;

    if(this.REASON==undefined || this.REASON==""){
      this.REASON = ""
      // this.isHighLightReason="Yes";
      // this.toastrService.error("Please Enter Reason..");
      // return;
      }
    // else{ this.isHighLightReason="No";}
  }

 if(status == 1){

  if(this.CLAIM_FREE_QTY==undefined || this.CLAIM_FREE_QTY=="" ){
    this.isHighLightClaimSaleQty="Yes";
    this.toastrService.error("Please Enter Claim Free Qty..")
    return;
  }else{ this.isHighLightClaimSaleQty="No";}

  if(this.INVOICE_SALE_QTY == undefined || this.INVOICE_SALE_QTY == "" ){
    this.isHighLightClaimInvoiceSaleQty="Yes";
    this.toastrService.error("Please Enter Invoice Sale Qty..")
    return;
  }else{ 
    this.isHighLightClaimSaleQty="No";
  }

  if(this.SCHEME_FREE_QTY==undefined||this.SCHEME_FREE_QTY=="" ){
    this.SCHEME_FREE_QTY = 0;
  }

  let data_valid = {
    "REQUEST_ID":+this.REQUEST_ID,
    "CLAIM_ID":0,
    "INVOICE_SALE_QTY":+this.INVOICE_SALE_QTY,
    "CLAIM_FREE_QTY":+this.CLAIM_FREE_QTY,
    "SCHEME_FREE_QTY":0,
  }

  const isCheck: any = await this.validSaveRequest(data_valid);
  console.log(isCheck);
  if (isCheck.FLAG === false) {
    this.toastrService.error(isCheck.MSG);
    return; // Terminate the loop if FLAG is false
  }

  // this.REQ_SALE_REQ_FREE_PERC = ((+this.claimapprovedetails.FINAL_FREE_QTY) / (+this.claimapprovedetails.FINAL_SALE_QTY))*100
  // this.VALID_CLAIM_FREE_QTY=((+this.REQ_SALE_REQ_FREE_PERC) * (+this.claimapprovedetails.INVOICE_SALE_QTY))/100

  // if(this.VALID_CLAIM_FREE_QTY < this.CLAIM_FREE_QTY ){
  //     this.toastrService.error("Claim Free Qty should not be greater total Percentage of Request Sale Qty and Req Free Qty");
  //     this.isHighLightClaimSaleQty="Yes";
  //     return;
  //  }
  //  else{
  //     this.isHighLightClaimSaleQty="No";

  //  }

  // if(this.CLAIM_FREE_QTY>this.claimapprovedetails.CLAIM_FREE_QTY ){
  //   console.log('this.discountApproveDetails.UPDATED_SALE_QTY',this.claimapprovedetails.UPDATED_SALE_QTY)
  //   this.isHighLightClaimSaleQty="Yes";
  //   this.toastrService.error("Claim Free Qty should not be greater than requested Claim Free Qty");
  //   return;
  // }else{
  //   this.isHighLightClaimSaleQty="No";
  // }

  // if( this.SCHEME_FREE_QTY>this.claimapprovedetails.SCHEME_FREE_QTY){

  //   this.isHighLightSchemeFreeQty="Yes";
  //   this.toastrService.error("Scheme Free Qty should not be greater than requested Scheme Free Qty");
  //   return
  // }else{
  //   this.isHighLightSchemeFreeQty="No";
  // }

  }

  this.userInfo = this.authService.getUserDetail();
  this.userData = this.authService.getUserDetail();
  var userid=JSON.parse(this.userInfo).USER_ID
  var saleRoleId=JSON.parse(this.userData).SALESROLE_ID
  let date = this.datepipe.transform(this.DATE, "yyyy-MM-dd");
  let data={
    "APPROVAL_DETAILS":[{CLAIM_ID:this.claimapprovedetails.CLAIM_ID,
      SALES_ROLE_ID:saleRoleId,
      STATUS:status,
      USER_ID:userid,
      FREE_QTY:+this.CLAIM_FREE_QTY,
      SCHEME_FREE_QTY:+this.SCHEME_FREE_QTY,
      INVOICE_SALE_QTY:+this.INVOICE_SALE_QTY,
      REMARKS: status == 1 ? this.REMARK : this.REASON,
      INVOICE_NO:this.INVOICE_NO,
      INVOICE_DATE:date
    }]
  }
  // console.log('save data',JSON.stringify(data))
  this.http.postnew(this.url.APPROVECLAIMREQUESTBYROLEID, data).then(
    (res: any) => {

      if(res.FLAG == true){
         this.isLoaded = false;
         this.visible=false;
         this.rejectlist=false;
         this.router.navigate(['/claimapprove'])
         this.onClearFormData();
          this.toastrService.success(res.MSG)
        }
      else{
        this.toastrService.error(res.MSG)
      }

    },
    error => {
      console.log(error);
      this.toastrService.error("Oops, Something went wrong.");
    }
  );

  }

  validSaveRequest(data_valid: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.isLoaded = true;
      this.http.postnew(this.url.VALIDATE_CLAIM_REQUEST, data_valid).then(
        (res: any) => {
          this.isLoaded = false;
          if (res.data.FLAG === true) {
            resolve(res.data); // Resolve with the response data
          } else {
            const invalid = { Flag: false, Msg: res.data.MSG };
            this.toastrService.error(res.data.MSG); // Display toastr message
            reject(invalid); // Reject with the error data
          }
        },
        error => {
          this.isLoaded = false;
          this.toastrService.error("Oops, Something went wrong.");
          reject(error); // Reject with the error
        }
      );
    });
  }

  onClearFormData(){
    this.CLAIM_FREE_QTY="";
    this.SCHEME_FREE_QTY="";
    this.REMARK="";
    this.REASON="";

  }
  onBackClick(){
    this.router.navigate(['/claimapprove'])
  }
  onEditclick(){
    this.isEdit=true
  }

  showDoctorHistory(){
    this.isLoaded = true;

      let data={
      DOCTOR_ID:this.DOCTOR_CODE,
      PRODUCT_CODE:this.PRODUCT_CODE
      }
    this.http.postnew(this.url.GETDOCTORHISTORYBYDOCTORID,data).then(
      (res:any)=>{
        this.isLoaded= false;
        this.HISTORY_LIST=res.HISTORY_LIST
        this.HISTORY_LIST.forEach(rowData => {
          rowData.REQUESTNO=rowData.REQUEST_NO;
          rowData.REQUESTDATE=rowData.REQUEST_DATE;
          rowData.PRODUCTDESC=rowData.PRODUCT_DESC;
          rowData.SALEQTY=rowData.SALE_QTY;
          rowData.FREEQTY=rowData.FREE_QTY;
          rowData.STATUS=rowData.STATUS;

        });

        this.isShowHistoryList = true
        this.isLoaded = false;

      },
      error =>{
        this.isLoaded= false;
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  getHistoryDetails(data:any){
    console.log(data,"Data")
    this.doctorHistoryDetails = data;
    this.isShowHistoryDetails = true;
  }

  closeDoctorHistoryDetails(){
    this.isShowHistoryDetails = false;
  }
  
  closeDoctorPopup(){
    this.isShowHistoryList = false;
 }
}
