import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-discount-approve-details',
  templateUrl: './discount-approve-details.component.html',
  styleUrls: ['./discount-approve-details.component.css']
})
export class DiscountApproveDetailsComponent implements OnInit {
  SALE_QTY:any;
  FREE_QTY:any;
  REMARK:any;
  LAST_VISIT=new Date();
  OnFMShowHide:boolean;
  OnRSMShowHide:boolean;
  OnSMShowHide:boolean;
  OnPMTShowHide:boolean;
  isShowEditPopup:boolean = false;
  visible:boolean=false;
  rejectlist:boolean=false;
  userInfo:any;
  userData:any;
  APPROVAL_LIST:any=[];
  isLoaded:boolean;
  REQUESTBY:any;
  HQDESC:any;
  STOCKISTNAME:any;
  DOCTORNAME:any;
  SPLDESCRIPTION:any;
  CHEMISTNAME:any;
  PRODUCTDESC:any;
  SALEQTY:any;
  FREEQTY:any;
  LASTVISIT:any;
  CREATEDON:any;
  UPDATEDFREEQTY:any;
  UPDATEDSALEQTY:any;
  FMFREEQTY:any;
  FMSALEQTY:any;
  FMUPDATEDON:any;
  REMARKS:any
  RSMSALEQTY:any;
  RSMFREEQTY:any;
  RSMUPDATEDON:any;
  SMSALEQTY:any;
  SMFREEQTY:any;
  SMPDATEDON:any;
  PMTUPDATEDON:any;
  FINALSALEQTY:any;
  FINALFREEQTY:any;
  data:any;
  ApproveStatus:any=1;
  RejectStatus:any=2;
  REASON:any;
  discountApproveDetails:any = [];
  isHighLightSaleQty:string="No";
  isHighLightFreeQty:string="No";
  isHighLightLastVistDate:string="No";
  isHighLightRemark:string="No";
  isHighLightReason:string="No";
  DOCTOR_CODE:any;
  PRODUCT_CODE:any;
  HISTORY_LIST:any = [];
  isShowHistoryList:boolean = false;
  isShowHistoryDetails:boolean = false;
  doctorHistoryDetails:any;
  constructor(private router: Router,private authService: AuthService,private url: URLService,private http: HttpService,
    private toastrService:ToastrService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.discountApproveDetails =JSON.parse(localStorage.getItem("DISCOUNT_APPROVE_DETAILS"));

          if(this.discountApproveDetails.FMSTATUS!=null){
            this.OnFMShowHide=true;

           }else{
            this.OnFMShowHide=false;
           }
           if(this.discountApproveDetails.RSMSTATUS!=null){
            this.OnRSMShowHide=true;

           }else{
            this.OnRSMShowHide=false;
           }
           if(this.discountApproveDetails.SMSTATUS !=null){
            this.OnSMShowHide=true;

           }else{

            this.OnSMShowHide=false;
           }
           if(this.discountApproveDetails.PMTSTATUS!=null){
            this.OnPMTShowHide=true;

           }else{

            this.OnPMTShowHide=false;
           }

           this.SALE_QTY = this.discountApproveDetails.UPDATED_SALE_QTY;
           this.FREE_QTY = this.discountApproveDetails.UPDATED_FREE_QTY;

           
           this.DOCTOR_CODE = this.discountApproveDetails.DOCTOR_ID;
           this.PRODUCT_CODE = this.discountApproveDetails.PRODUCT_CODE;
  }


  onDiscountApproveReject(status:any){
    if(status == 2){
      this.FREE_QTY = 0;
      this.SALE_QTY = 0;
      date = null;
      if(this.REASON==undefined || this.REASON==""){
        this.REASON = "";
        // this.isHighLightReason="Yes";
        // this.toastrService.error("Please Enter Reason..");
        // return;
      }

    }

   if(status == 1){
    this.isHighLightSaleQty="No";
    this.isHighLightFreeQty="No";
    this.isHighLightLastVistDate="No";
    this.isHighLightRemark="No";
    this.isHighLightReason="No";



    if(this.SALE_QTY==undefined || this.SALE_QTY=="" ){
      this.isHighLightSaleQty="Yes";
      this.toastrService.error("Please Enter Sale Qty..")
      return;
    }else{ this.isHighLightSaleQty="No";}

    if(this.FREE_QTY==undefined||this.FREE_QTY=="" ){
      this.isHighLightFreeQty="Yes";
      this.toastrService.error("Please Enter Free Qty..");
      return;
    }else{this.isHighLightFreeQty="No";}


    // if(this.LAST_VISIT==undefined || this.LAST_VISIT=="" ){
    //   this.isHighLightLastVistDate="Yes";
    //   this.toastrService.error("Please Select Last Vist Date..");
    //   return
    // }else{this.isHighLightLastVistDate="No";}

    if(this.REMARK==undefined || this.REMARK=="" ){
        this.REMARK = "";
      // this.isHighLightRemark="Yes";
      // this.toastrService.error("Please Enter Remark..");
      // return;
    }

    if(this.SALE_QTY>this.discountApproveDetails.UPDATED_SALE_QTY ){
      console.log('this.discountApproveDetails.UPDATED_SALE_QTY',this.discountApproveDetails.UPDATED_SALE_QTY)
      this.isHighLightSaleQty="Yes";
      this.toastrService.error("Sale Qty should be not grater then requested sale qty");
      return;
    }else{
      this.isHighLightSaleQty="No";
    }

    if( this.FREE_QTY>this.discountApproveDetails.UPDATED_FREE_QTY){

      this.isHighLightFreeQty="Yes";
      this.toastrService.error("Free Qty should be not grater then requested Free qty");
      return
    }else{
      this.isHighLightFreeQty="No";
    }
    console.log( this.FREE_QTY,' this.FREE_QTY')
    console.log( this.discountApproveDetails.UPDATED_FREE_QTY,' this.discountApproveDetails.UPDATED_FREE_QTY')

    }


    this.userInfo = this.authService.getUserDetail();
    this.userData = this.authService.getUserDetail();
    var userid=JSON.parse(this.userInfo).USER_ID
    var saleRoleId=JSON.parse(this.userData).SALESROLE_ID
    // console.log(this.LAST_VISIT)
    var date = this.datepipe.transform(this.LAST_VISIT, "yyyy-MM-dd");
    // console.log(date,status)


    let data={
      "APPROVAL_DETAILS":[{
        REQUEST_ID:this.discountApproveDetails.REQUEST_ID,
        SALES_ROLE_ID:saleRoleId,
        STATUS:status,
        USER_ID:userid,
        SALE_QTY:this.SALE_QTY,
        FREE_QTY:this.FREE_QTY,
        LAST_VISIT_DATE:date,
        REMARKS: status == 1 ? this.REMARK : this.REASON}]
    }
     this.isLoaded= true;
    this.http.postnew(this.url.APPROVECLAIMREQUEST,data).then(
      (res:any)=>{
      console.log('res',res)
      if(res.FLAG == true){
        this.isLoaded= false;
        this.visible=false;
        this.rejectlist=false;
        this.router.navigate(['/approvaldiscount'])
        this.OnClearForm();
        this.toastrService.success(res.MSG);
      }else{
        this.isLoaded= false;
        this.toastrService.error(res.MSG);
      }

      },
      error =>{
        console.log(error);
        this.isLoaded= false;
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

 showDialog(){
    this.isShowEditPopup = true;
  }
  ClosePopUp(){
    this.isShowEditPopup =false;
  }
  onApprovedList(){
    this.visible=true;
  }

  onRejectList(){
    this.rejectlist=true;
  }
  OnClearForm(){
    this.SALE_QTY="";
    this.FREE_QTY="";
    this.LAST_VISIT=new Date();
    this.REMARK="";
    this.REASON="";
  }
  onBackClick(){
    this.router.navigate(["/approvaldiscount"])
  }
  onClickSaleFreeQty(){

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
