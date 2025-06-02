import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-approval-cme',
  templateUrl: './approval-cme.component.html',
  styleUrls: ['./approval-cme.component.css']
})
export class ApprovalCmeComponent implements OnInit {

  isLoaded:boolean = false;
  REQUEST_APPROVED_CME_LIST:any = [];
  selectedApprovalData:any = [];
  userInfo:any = {};
  CME_ID:any;
  ViewApprovedData:boolean = false;
  
  CME_NO:any;
  CME_DATE:any = new Date();
  REQ_BY:any;
  HQ_CODE:any;
  CME_TYPE_ID:any;
  CAMP_TYPE_ID:any;
  INST_NAME:any;
  TOPIC:any;
  SPEAKER_NAME:any;
  SPEAKER_QUALIFICATION:any;
  SPEAKER_SPECIALIZATION:any;
  VENUE:any;
  CME_DATE_FROM:any = new Date();
  CME_TO_DATE:any = new Date();
  CME_TO_TIME:any;
  CME_TIME_FROM:any;
  AMOUNT:any;
  GST:any;
  PAY_BY_DATE:any = new Date();
  Today:any = new Date();
  ADVANCE_CODE:any;
  ADVANCE:any;
  ATTENDING_TEAM_LIST:any = [];
  EXPECTED_DOCTORS:any;
  BRAND_LIST:any = [];
  UPLOAD:any;
  PROMOTION_MATERIAL_REQUEST:any = [{ ID: 1, REMARKS: '', QUANTITY: 0 }];
  DOCUMENT_TYPE_LIST:any = [];
  CME_DOC_TYPE_CODE:any;
  DOCTORS_LIST:any = [];
  InstName:boolean = false;
  SpeakerViewPopUp:boolean = false;
  isAddvanceView:boolean = false;
  UPLOAD_DOCUMENT_LIST:any = [];
  HQ_CODE_LIST:any = [];
  CME_TYPE_LIST:any = [];
  CAMP_TYPE_LIST:any = [];
  USER_ID:any;
  PRODUCT_CODE:any;
  WHOM_TO_PAY_LIST:any = [];
  NON_INSTITUTION:boolean = true;
  INSTITUTION:boolean = false;
  isSlideDeckReqd:boolean = false;
  isArtWorkReqd:boolean = false;
  PROM_MAT_REQ_ITEM_LIST:any = [];
  SPEAKER_SPECIALIZATION_LIST:any = [];
  SPEAKER_SPECIALIZATION_ID:any;
  NewDate:any;
  cme_date:any;
  cme_date_from:any;
  cme_to_date:any;
  pay_by_date:any;
  Today_cme_to_date:any;
  REQUEST_REJECT_REMARKS:any;
  RejectCMERequestPopUp:boolean = false;
  CmeApproveData:any = [];
  ClaimApproveData:any = [];
  IS_ADVANCE_YES:boolean = false;
  IS_ADVANCE_NO:boolean = true;
  IS_SLIDE_DECK_REQD_YES:boolean = false;
  IS_SLIDE_DECK_REQD_NO:boolean = true;
  IS_ART_WORK_REQD_YES:boolean = false;
  IS_ART_WORK_REQD_NO:boolean = true;
  FILES_DATA:any;
  REQ_BY_USER_NAME:any;
  FILTERED_DOCTORS_LIST:any = [];
  WHOM_TO_PAY_USER_ID:any;
  AttendingDropdowns = [{ ID: 1, USER_ID: "" }];
  BrandDropdowns = [{ ID: 1, PRODUCT_CODE: "" }];
  PromotionalMaterialReq = [{ ID: 1,ITEM_ID: 1, REMARKS: '', QUANTITY: 0 }];
  ATTENDING_TEAM_DROPDOWN = [{ ID: 1, USER_ID: "" }];
  BRANDS_DROPDOWN = [{ ID: 1, PRODUCT_CODE: "" }];
  CME_REQ_UPDATED_USER_DETAILS:any =[];
  DIV_LIST:any = [];
  DIVISION_CODE:any;
  
  constructor(private authService:AuthService,private url:URLService,private http:HttpService,
    private toastrService:ToastrService,private common:CommonService,private router:Router,public datePipe: DatePipe) { }

  ngOnInit(): void {
    localStorage.removeItem('CME_ID')
    this.userInfo = JSON.parse(this.authService.getUserDetail());
    this.GETCMEAPPROVEDLISTUSERID();
  }


  async GETCMEAPPROVEDLISTUSERID(){
    let data = {  
      "USER_ID": this.userInfo.USER_ID,
      "SALES_ROLE_ID" : this.userInfo.SALESROLE_ID
    }
      this.isLoaded = true;
    await this.http.postnew(this.url.GETCMEAPPROVEDLISTUSERID, data).then(
      (res: any) => {
        // console.log('res ->' , res)
        this.REQUEST_APPROVED_CME_LIST = res.REQUEST_APPROVED_CME_LIST;
        this.isLoaded = false;
      },
      error => {
        console.log(error);
        this.isLoaded = false;
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }


  GetPreviewCmeReqForCmeNo(data:any){
    // console.log('data ->' , data)
    this.CME_ID = data.CME_ID;
    this.GETCMEMASTERLIST();
    this.ViewApprovedData = true;
  }

  BACKTOLIST(){
    this.ViewApprovedData = false;
    this.GETCMEAPPROVEDLISTUSERID();
  }
  
  GETCMEMASTERLIST(){
    let data = {  
      "USER_ID": this.userInfo.USER_ID
    }
      this.isLoaded = true;
    this.http.postnew(this.url.GETCMEMASTERLIST, data).then(
      (res: any) => {
        this.HQ_CODE_LIST = res.HQ_CODE_LIST;
        this.CME_TYPE_LIST = res.CME_TYPE_LIST;
        this.CAMP_TYPE_LIST = res.CAMP_TYPE_LIST;
        this.DOCUMENT_TYPE_LIST = res.DOCUMENT_TYPE_LIST;
        this.ATTENDING_TEAM_LIST = res.CME_ATTENDING_LIST;
        this.BRAND_LIST = res.CME_BRANDS_LIST;
        this.WHOM_TO_PAY_LIST = res.WHOM_TO_PAY_LIST;
        this.PROM_MAT_REQ_ITEM_LIST = res.ITEM_LIST;
        this.SPEAKER_SPECIALIZATION_LIST = res.DOCTOR_SPECIALIZATION_LIST;
        this.DIV_LIST = res.DIV_LIST;
        this.isLoaded = false;
        this.GETCMEREQUESTDATABYCMENO();
      },
      error => {
        console.log(error);
        this.isLoaded = false;
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  
  async GETCMEREQUESTDATABYCMENO(){
    let data = {
        "USER_ID": this.userInfo.USER_ID,
        "CME_ID": this.CME_ID,
    }
this.isLoaded = true;
this.http.postnew(this.url.GETCMEREQUESTDATABYCMENO,data).then((res:any)=>{
  // console.log('res ->' , res )
  this.CME_DATE = this.datePipe.transform(res.CME_REQ_DETAILS[0].CME_DATE, 'dd-MM-yyyy'); 
  this.cme_date = this.datePipe.transform(res.CME_REQ_DETAILS[0].CME_DATE, 'dd-MM-yyyy'); 
  this.CME_ID = res.CME_REQ_DETAILS[0].CME_ID;
  this.CME_NO = res.CME_REQ_DETAILS[0].CME_NO;
  this.HQ_CODE = res.CME_REQ_DETAILS[0].HQ_CODE;
  this.DIVISION_CODE = res.CME_REQ_DETAILS[0].DIVISION_CODE;
  this.CME_TYPE_ID = res.CME_REQ_DETAILS[0].CME_TYPE;
  this.CAMP_TYPE_ID = res.CME_REQ_DETAILS[0].CAMP_TYPE;
  this.InstName = res.CME_REQ_DETAILS[0].IS_INSITUTION_NAME; 
  this.REQ_BY_USER_NAME = res.CME_REQ_DETAILS[0].REQ_BY_USER_NAME; 
  this.INST_NAME = res.CME_REQ_DETAILS[0].INST_NAME; 
  this.TOPIC = res.CME_REQ_DETAILS[0].TOPIC; 
  this.SPEAKER_NAME = res.CME_REQ_DETAILS[0].SPK_NAME; 
  this.SPEAKER_QUALIFICATION = res.CME_REQ_DETAILS[0].SPK_QUALIFICATION; 
  this.SPEAKER_SPECIALIZATION_ID = res.CME_REQ_DETAILS[0].SPK_SPECIALIZATION; 
  this.VENUE = res.CME_REQ_DETAILS[0].VENUE; 
  this.EXPECTED_DOCTORS = res.CME_REQ_DETAILS[0].EXPECTED_DOCTORS; 
  this.CME_DATE_FROM =  this.datePipe.transform(res.CME_REQ_DETAILS[0].DATE_FROM, 'dd-MM-yyyy');  
  this.cme_date_from =  this.datePipe.transform(res.CME_REQ_DETAILS[0].DATE_FROM, 'dd-MM-yyyy');  
  this.CME_TO_DATE =  this.datePipe.transform(res.CME_REQ_DETAILS[0].DATE_TO, 'dd-MM-yyyy');  
  this.cme_to_date =  this.datePipe.transform(res.CME_REQ_DETAILS[0].DATE_TO, 'dd-MM-yyyy');  
  this.formatDateBasedOnCmeTimeFrom(res.CME_REQ_DETAILS[0].TIME_FROM);
  this.formatDateBasedOnCmeToTimeFrom(res.CME_REQ_DETAILS[0].TIME_TO);
  this.AMOUNT = res.CME_REQ_DETAILS[0].AMOUNT; 
  this.GST = res.CME_REQ_DETAILS[0].GST; 
  this.WHOM_TO_PAY_USER_ID = res.CME_REQ_DETAILS[0].WHOM_TO_PAY; 
  this.PAY_BY_DATE = this.datePipe.transform(res.CME_REQ_DETAILS[0].PAY_BY_DATE, 'dd-MM-yyyy'); 
  this.pay_by_date = this.datePipe.transform(res.CME_REQ_DETAILS[0].PAY_BY_DATE, 'dd-MM-yyyy'); 
  this.isSlideDeckReqd = res.CME_REQ_DETAILS[0].SLIDE_DECK_REQD; 
  this.isArtWorkReqd = res.CME_REQ_DETAILS[0].ART_WORK_REQD; 
  this.isAddvanceView = res.CME_REQ_DETAILS[0].IS_ADVANCE; 
  this.ADVANCE = res.CME_REQ_DETAILS[0].ADVANCE; 
  this.AttendingDropdowns = res.CME_ATTENDING_DETAILS;
  this.BrandDropdowns = res.CME_BRANDS_DETAILS;
  this.PromotionalMaterialReq = res.CME_PROM_MATERIAL_REQ_DETAILS;
  this.UPLOAD_DOCUMENT_LIST = res.CME_DOCUMENT_DETAILS;
  let SAMPEL_CME_REQ_UPDATED_USER_DETAILS = res.CME_REQ_UPDATED_USER_DETAILS;
  this.CME_REQ_UPDATED_USER_DETAILS = this.transformData(SAMPEL_CME_REQ_UPDATED_USER_DETAILS)
  if(this.InstName == true){
    this.INSTITUTION = true;
    this.NON_INSTITUTION = false;
  }else if(this.InstName == false){
    this.NON_INSTITUTION = true;
    this.INSTITUTION = false;
  }
  if(this.isSlideDeckReqd == true){
   this.IS_SLIDE_DECK_REQD_YES = true;
   this.IS_SLIDE_DECK_REQD_NO = false;
  }else if(this.isSlideDeckReqd == false){
   this.IS_SLIDE_DECK_REQD_YES = false;
   this.IS_SLIDE_DECK_REQD_NO = true;
  }
  if(this.isArtWorkReqd == true){
    this.IS_ART_WORK_REQD_YES = true;
    this.IS_ART_WORK_REQD_NO = false;
   }else if(this.isArtWorkReqd == false){
    this.IS_ART_WORK_REQD_YES = false;
    this.IS_ART_WORK_REQD_NO = true;
   }
   if(this.isAddvanceView == true){
    this.IS_ADVANCE_YES = true;
    this.IS_ADVANCE_NO = false;
   }else if(this.isAddvanceView == false){
    this.IS_ADVANCE_YES = false;
    this.IS_ADVANCE_NO = true;
   }
  this.GETCMEDOCTORLIST(this.HQ_CODE);
  this.isLoaded = false;
});
}


GETCMEDOCTORLIST(code:any){
  let data = {
      "HQ_CODE": code
  }
  this.isLoaded = true;
  this.http.postnew(this.url.GETCMEDOCTORLIST,data).then((res:any)=>{
  this.isLoaded = false;
  this.DOCTORS_LIST = res.CME_DOCTOR_LIST;   
  this.FILTERED_DOCTORS_LIST = res.CME_DOCTOR_LIST;  
    // console.log('res doctor ->' , res)
  },
  (error) => {
    console.log(error);
    this.isLoaded = false;
    this.toastrService.error("Oops, Something went wrong.");
  });
}

  formatDateBasedOnCmeTimeFrom(time:any){
    if(time.length <= 8){
      this.CME_TIME_FROM = time;
    }else if(time.length > 8){
      this.CME_TIME_FROM = this.datePipe.transform(time, 'hh:mm a');
    }
  }

  formatDateBasedOnCmeToTimeFrom(time:any){
    if(time.length <= 8){
      this.CME_TO_TIME = time;
    }else if(time.length > 8){
      this.CME_TO_TIME = this.datePipe.transform(time, 'hh:mm a');
    }
  }
  
  OPENWINDOWPREVIEW(data:any){
    // var printContents = document.getElementById('PreviewPDF').innerHTML;
    // var originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    // window.print();
    // window.location.reload();
    // document.body.innerHTML = originalContents;
    this.CME_ID = data.CME_ID;
   localStorage.setItem('CME_ID',this.CME_ID)
   this.router.navigate(['printcme']);
  }

  loadDataLazily(e: any) {
  }

  
  DownloadDocument(value:any,extension:any,filename:any){
    this.isLoaded = true;
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
    this.isLoaded = false;
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


  transformData(data: any): any[] {
    return [
      {
        role: 'RSM',
        userName: data[0].RSM_USER_NAME,
        updatedBy: data[0].RSM_UPDATED_BY,
        updatedOn: data[0].RSM_UPDATED_ON
      },
      {
        role: 'SM',
        userName: data[0].SM_USER_NAME,
        updatedBy: data[0].SM_UPDATED_BY,
        updatedOn: data[0].SM_UPDATED_ON
      },
      {
        role: 'PMT',
        userName: data[0].PMT_USER_NAME,
        updatedBy: data[0].PMT_UPDATED_BY,
        updatedOn: data[0].PMT_UPDATED_ON
      },
      {
        role: 'VP',
        userName: data[0].VP_USER_NAME,
        updatedBy: data[0].VP_UPDATED_BY,
        updatedOn: data[0].VP_UPDATED_ON
      }
    ];
  }

}
