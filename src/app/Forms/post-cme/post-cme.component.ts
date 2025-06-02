import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
import { CommonService } from 'src/app/Service/common.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-post-cme',
  templateUrl: './post-cme.component.html',
  styleUrls: ['./post-cme.component.css']
})
export class PostCmeComponent implements OnInit {
  // @ViewChild('dt1') dt1!: Table;
  UploadDocumentdetails:any = [];
  CME_NO:any;
  DATE:any;
  REQ_BY:any;
  HQ_CODE:any;
  INST_NAME:any;
  TOPIC:any;
  NAME:any;
  QUAL:any;
  SPECIALIZATION:any;
  VENUE:any;
  DT_FROM:any;
  TO_DATE:any;
  TO:any;
  TIME_FROM:any;
  ATTENDING_DOCTOR_LIST = [{ DOCTOR_NAME: '',DOCTOR_QUALIFICATION: '',DOCTOR_SPECIALIZATION:null,EMAIL_ID: '', MOBILE_NO: 0}]
  AttendingDoctorList = [{ ID: 1, DOCTOR_NAME: '',DOCTOR_QUALIFICATION: '',DOCTOR_SPECIALIZATION: null,EMAIL_ID: '', MOBILE_NO: 0}]
  AttendenceDoctorsList: any[] = [];
  BILL_DETAILS_LIST:any=[{ BILL_NO: '',PARTICULARS: '',AMOUNT: 0}]
  BillDetailsList: Array<{ BILL_NO: string; PARTICULARS: string; AMOUNT: number }> = [
    { BILL_NO: '', PARTICULARS: '', AMOUNT: 0 }
  ];
  convertedJson:any = [];
  inputfileltext:any = "";
  UPLOAD:any;
  InstName:boolean = false;
  VENDOR:any;
  UploadDocumentPopUp:boolean = false;
  userInfo:any = {};
  CME_ID:any=0 ;
  NO_OF_PATIENTS:any;
  DOCTOR_NAME:any;
  EMAIL_ID:any;
  MOBILE_NO:any;
  BILL_NO:any;
  POST_CME_DOC_TYPE_CODE:any;
  FileData: string | ArrayBuffer | null = null;
  FILE_NAME:any;
  FILE_EXTENSION:any;
  DOCUMENT_TYPE_LIST:any = [];
  DOCUMENT_DESC:any;
  UPLOAD_DOCUMENT_LIST:any = [];
  selectedFilesData:any = [];
  isLoaded:boolean= false;
  SpeakerViewPopUp:boolean = false;
  FILTERED_DOCTORS_LIST:any =  []
  isLoading = false;
  cmeList: any[] = [];
  IS_VIEW:any;
  REQ_BY_USER_ID:any;
  REQ_BY_USER_NAME:any;
  TO_TIME:any;
  CME_TYPE_LIST:any = [];
  CAMP_TYPE_LIST:any =[];
  VENDOR_LIST:any=[];
  isAdd:boolean =false;
  selectedApprovalData:any = [];
  CmeApproveData:any = [];
  ClaimApproveData:any = [];
  selectAll:boolean = false;

  REQUEST_APPROVAL_CME_LIST: any=[];
  POST_CME_LIST: any=[];
  cmeService: any;
  HQ_DESC: any;
  CME_DATE: any;
  USER_NAME: any;
  AttendingDoctors: any;
  DOCTOR: any;
  PHONE: string;
  SearchInput: any;
  SPECIALIZATION_DESC:any;
  SPECIALIZATION_ID:any;
  QUALIFICATION: any;
  USER_LIST: any;
  DOCTOR_SPECIALIZATION_LIST: any = [];
  Bill_No: any;
  Particulars: any;
  Amount: any;
  PARTICULARS: any;
  AMOUNT: any;
  TIME_TO: any;
  CAMP_TYPE_ID: any;
  CME_TYPE_ID: any;
  isCampTypeView: boolean = false;
  INSTITUTION: boolean = false;
  base64Data: any;
  CANCELCMEREQUEST: any;
  NON_INSTITUTION: boolean;
  isDisabled = true;
  CME_TYPE: any;
  CAMP_TYPE: any;
  DOCTOR_QUALIFICATION: any;
  DOCTOR_SPECIALIZATION: any;
  item: any ={ DOCTOR_SPECIALIZATION: null };
  form: any;
  SR_NO: any;
  isViewDoctorReq: boolean = false;
  errorMessage: string | null = null;
  Cme_new1: any;
  selectedOption: number = 0;
  Pending_List:Array<any> = [];
  isPending: boolean = true; 
  isCompleted: boolean = false;
  Pending_payment_list: Array<any> = [];
  ATTENDING_DOCTORS_DETAILS: any;
  BILL_DETAILS: any;
  DOCUMENT_DETAILS: any;
  postDetailsList: any[] = [];
   pendingList: any[] = [];  
   completedList: any[] = []; 
   isViewClicked: boolean = false;
  STATUS: any;
  selectedData: any = null;  
  isEditMode = false; 
   formFieldsDisabled: boolean = false;
  UPLOAD_DOCUMENT_LIST1:any =[];
  SAMPEL_UPLOAD_DOCUMENT_LIST:any=[];
  areButtonsDisabled: boolean = true;
  selectedInstitutionType: number = 0; 
  Pendingflag:boolean=false
  isCompletedList: boolean = false;  
  IsView:any = 'P';
  IsAction: boolean = false;  
  IsDraft: boolean = false; 
  DOCTORS_LIST:any = [];
  SPEAKER_SPECIALIZATION_ID:any;
  BILL_DETAILS_TOTAL_AMOUNT:any = 0;
  GST:any;
  RECEIVED_AMOUNT:any;
  ACTUAL_OUTSTANDING:any;
  ACTUAL_AMOUNT:any;

  constructor(private   url:URLService,private http:HttpService,private common:CommonService,
    private toastrService:ToastrService,private authService:AuthService,private router:Router,
    public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(this.authService.getUserDetail());
    // console.log('this.userInfo',this.userInfo);
    this.CME_ID = localStorage.getItem("CME_ID");
    this.IS_VIEW = localStorage.getItem("IS_VIEW");
    this.REQ_BY_USER_ID = this.userInfo.USER_ID;
     this.REQ_BY_USER_NAME = this.userInfo.USER_NAME;

     this.GETPOSTCMELISTBYUSERID('P');
     this.disableFormIfCompleted();
     this.isCompletedList = status === 'C';
    //  this.dt1.filterGlobal('', 'contains');
    //  this.dt1.reset();
  }
  
  GETPOSTCMEMASTERLIST(){
    let data = {  
      "USER_ID": this.userInfo.USER_ID,
    }
      this.isLoaded = true;
      this.http.postnew(this.url.GETPOSTCMEMASTERLIST, data).then(
      (res: any) => {
        // console.log('res ->' , res)
       
        this.CME_TYPE_LIST = res.CME_TYPE_LIST;
        this.CAMP_TYPE_LIST = res.CAMP_TYPE_LIST;
        this.DOCUMENT_TYPE_LIST = res.DOCUMENT_TYPE_LIST;
        // this.BILL_DETAILS_LIST = res.BillDetailsList;
        this.VENDOR_LIST=res.USER_LIST
        this.UPLOAD_DOCUMENT_LIST=res.UPLOAD_DOCUMENT_LIST
        this.REQUEST_APPROVAL_CME_LIST = res.GET_CME_APPROVAL_REQUEST;
        this.FILTERED_DOCTORS_LIST = res.CME_DOCTOR_LIST;
        this.DOCTOR_SPECIALIZATION_LIST=res.DOCTOR_SPECIALIZATION_LIST;
        this.isLoaded = false;
      },
      error => {
        console.log(error);
        this.isLoaded = false;
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  
  CheckInstitution(val:any){
    if(val == '1'){
      this.INSTITUTION = true;
      this.NON_INSTITUTION = false;
      this.InstName = true;
      this.INST_NAME = '';
    }else if(val == '0'){
      this.INSTITUTION = false;
      this.NON_INSTITUTION = true;
      this.InstName = false;
      this.INST_NAME = '';
    }
  }


  selectFile(event: any) {
    this.convertedJson = [];
    this.exceltojson(event)
  }

  public exceltojson(event: any) {
    const selectedfile = event.files[0];
    this.inputfileltext = event.files[0].name;
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedfile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result
      let workbook = XLSX.read(binaryData, { type: 'binary' })
      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        this.convertedJson = data;
      });
    }
  }

  SAVEREPORTFILE(val:number){
    if(!this.common.isValid(this.DATE)){
      this.toastrService.error('Select a Date')
      return
    }
    if(!this.common.isValid(this.REQ_BY)){
      this.toastrService.error('Select a Req By')
      return
    }
    if(!this.common.isValid(this.HQ_CODE)){
      this.toastrService.error('Select a HQ Code')
      return
    }
    if(this.isCampTypeView == true)
       if(!this.common.isValid(this.CAMP_TYPE_ID)){
         this.toastrService.error('Select a CAMP Type')
      this.isCampTypeView = false;
        return
       }
    
    if(this.INSTITUTION == true){
      if(!this.common.isValid(this.INST_NAME)){
        this.toastrService.error('Enter a Inst Name')
        return
      }
    }
    if(!this.common.isValid(this.TOPIC)){
      this.toastrService.error('Enter a Topic')
      return
    }
   
    if(!this.common.isValid(this.VENUE)){
      this.toastrService.error('Enter a Venue')
      return
    }
    if(!this.common.isValid(this.DT_FROM)){
      this.toastrService.error('Select a Dt From')
      return
    }
    if(!this.common.isValid(this.TO_DATE)){
      this.toastrService.error('Select a Dt From To')
      return
    }
    if(!this.common.isValid(this.TIME_FROM)){
      this.toastrService.error('Select a Time From')
      return
    }
    if(!this.common.isValid(this.TIME_TO)){
      this.toastrService.error('Select a Time To')
      return
    }

    for(const  data of this.AttendingDoctorList){
      if(!this.common.isValid(data.DOCTOR_NAME)){
          this.toastrService.error('Enter a Doctor Name')
          return
      }
      if(!this.common.isValid(data.DOCTOR_QUALIFICATION)){
        this.toastrService.error('Enter a Qualification')
        return
      }
      if(!this.common.isValid(data.DOCTOR_SPECIALIZATION)){
        this.toastrService.error('Select a Specialization')
        return
      }
      if(!this.common.isValid(data.EMAIL_ID)){
        this.toastrService.error('Enter a Email ID')
        return
      }
      if(!this.common.isValid(data.MOBILE_NO)){
        this.toastrService.error('Enter a Mobile No ')
        return
      }
    }
    for(const  data of this.BillDetailsList){
      if(!this.common.isValid(data.BILL_NO)){
          this.toastrService.error('Enter a  Bill No')
          return
      }
      if(!this.common.isValid(data.PARTICULARS)){
        this.toastrService.error('Enter a Particulars')
        return
      }
      if(!this.common.isValid(data.AMOUNT)){
        this.toastrService.error('Enter a Amount')
        return
      }
   
    }
    
    this.UploadDocumentdetails.forEach((element:any)=>{
      this.removeMimeTypePrefix(element.FILE_BASE64);
      element.FILE_BASE64 = this.base64Data;
   })
   this.UploadDocumentdetails = this.UploadDocumentdetails.map((item , index) => ({  ...item, SR_NO: index + 1,}));
  // if (!this.UploadDocumentdetails || this.UploadDocumentdetails.length === 0) {
  //   this.toastrService.error('Upload a Document');
  //   return;
  // }

  if(val == 0){
var IS_UPDATE = 1
  }else if(val == 1){
    var IS_UPDATE = 0
  }

    let data={
     "USER_ID": this.userInfo.USER_ID,
	   "CME_NO": this.common.isValid(this.CME_NO) ? this.CME_NO : 0,
	   "CME_ID": this.common.isValid(this.CME_ID) ? this.CME_ID : 0,
      "IS_UPDATE":IS_UPDATE,
      "IS_DRAFT": val ,
      "IS_INSITUTION_NAME": this.INSTITUTION ? 1 : 0, 
      "INST_NAME": this.common.isValid(this.INST_NAME) ? this.INST_NAME : "",
	    "NO_OF_PATIENTS": this.common.isValid(this.NO_OF_PATIENTS) ? this.NO_OF_PATIENTS : "0",
	    "VENDER":this.VENDOR,
	    "ATTENDING_DOCTORS_DETAILS":this.AttendingDoctorList ,
	    "BILL_DETAILS": this.BillDetailsList,
	    "DOCUMENT_DETAILS" :this.UploadDocumentdetails
	
    }
    // console.log('val-->',val)
    // console.log('data -> ', JSON.stringify(data) )
    // return
    this.http.postnew(this.url.SAVEPOSTCMEREQUEST, data).then(
      
      (res: any) => {
       
        if (res.FLAG) {
            if (val === 0) {
                this.toastrService.success('Data saved as draft successfully.');
            } else if (val === 1) {
                this.toastrService.success('Save Data Successfully');
                this.isCompleted = true;
            }
            this.isAdd = false;
            this.GETPOSTCMELISTBYUSERID('P');
            this.isLoaded = false;
            this.clearForm();
        } else {
            this.toastrService.error(res.MSG);
        }
    },
    error => {
        console.error(error);
        this.toastrService.error("Oops, Something went wrong.");
    }
);
    this.GETCMEDOCTORLIST(this.HQ_CODE);
 //   this.UPLOAD_DOCUMENT_LIST = this.UPLOAD_DOCUMENT_LIST.map((item , index) => ({  ...item, SR_NO: index + 1,}));
  }

  disableFormIfCompleted() {
    if (this.isCompleted) {
       
        this.formFieldsDisabled = true;
    }
}

  OpenUploadDocumentPopUp(){
    this.UploadDocumentPopUp = true;
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

  RemoveDocument(index:any){
    this.UploadDocumentdetails.splice(index,1);
    this.POST_CME_DOC_TYPE_CODE = '';
    this.UPLOAD = '';
    this.FILE_NAME = '';
    this.FileData = '';
    this.DOCUMENT_DESC = '';
    this.FILE_EXTENSION = '';
  }

  cleanBase64(base64String: string): string {
    // Remove data URI scheme and other unnecessary parts (e.g., data:image/png;base64,)
    const parts = base64String.split(',');
    if (parts.length > 1) {
      base64String = parts[1];
    } else {
      base64String = parts[0];
    }

    base64String = base64String.trim().replace(/\s+/g, '');

    const missingPadding = base64String.length % 4;
    if (missingPadding !== 0) {
      base64String += '='.repeat(4 - missingPadding);
    }
  
    return base64String;
  }

  SpeakerView() {
    if (!this.common.isValid(this.HQ_CODE)) {
        this.toastrService.error('Please Select a HQ Code');
        return;
    }
    this.GETCMEDOCTORLIST(this.HQ_CODE);
    
    this.isLoaded = true;
    this.SpeakerViewPopUp = true;
    this.isLoaded = false;
}

  GETPOSTCMELISTBYUSERID(value: string){

    let data = {
      "USER_ID": this.userInfo.USER_ID,
      "TYPE":value
    }
    // this.isAdd = true;
    this.http.postnew(this.url.GETPOSTCMELISTBYUSERID, data).then(
      (res: any) => {
        // console.log('res ->' , res)
        this.POST_CME_LIST = res.POST_CME_LIST;
        this.IsView = value;
        this.pendingList = [];
        this.completedList = [];
        if (value === 'P') {
          this.pendingList = this.POST_CME_LIST;
          this.Pendingflag=false;
          this.isPending = true;
          this.isCompleted = false;
          this.formFieldsDisabled = false;
          this.isCompletedList=false;
        } else if (value === 'C') {
          this.pendingList = this.POST_CME_LIST;
          this.Pendingflag=true;
          this.isPending = false;
          this.isCompleted = true;
          this.formFieldsDisabled = true;
          this.isCompletedList=true;
        }
      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  GETCMEREQUESTLISTUSERID(){
    let data = {  
      "USER_ID": this.userInfo.USER_ID,
      "SALES_ROLE_ID" : this.userInfo.SALESROLE_ID,
    }

    this.http.postnew(this.url.GETPOSTCMEMASTERLIST, data).then(
      (res: any) => {
        this.REQUEST_APPROVAL_CME_LIST = res.POST_CME_LIST;
      },
      (error:any) => {
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  GetPreviewCmeReqFromCmeNo(data:any){
    // console.log('data ->' , data)
    let todate = this.datePipe.transform(data.CME_DATE,"dd-MM-yyyy")
    let fromdate = this.datePipe.transform(data.DATE_FROM,"dd-MM-yyyy")
    let to_date = this.datePipe.transform(data.DATE_TO,"dd-MM-yyyy")
    this.CME_ID=data.CME_ID;
    this.IS_VIEW=data.IS_VIEW;
    this.CME_NO = data.CME_NO;
    this.CME_TYPE_ID=data.CME_TYPE; 
    this.GetCampView(this.CME_TYPE_ID);
    this.CAMP_TYPE_ID=data.CAMP_TYPE;
    this.AMOUNT = (Math.round(data.AMOUNT * 100) / 100).toFixed(2);
    let received_amount = (data.OLD_PAID + data.OLD_TDS);
    this.RECEIVED_AMOUNT = (Math.round(received_amount * 100) / 100).toFixed(2);
    this.GST = (Math.round(data.GST * 100) / 100).toFixed(2);
    this.ACTUAL_OUTSTANDING = (Math.round(data.OUT_STANDING * 100) / 100).toFixed(2);
    this.InstName=data.IS_INSITUTION_NAME;
    // console.log(this.InstName,'this.InstName')
    if(this.InstName == true){
      this.INSTITUTION = true;
      this.NON_INSTITUTION = false;
    }else if(this.InstName == false){
      this.NON_INSTITUTION = true;
      this.INSTITUTION = false;
    }

    this.INST_NAME=data.INST_NAME
    this.DATE = todate
    this.HQ_DESC = data.HQ_DESC
    this.HQ_CODE = data.HQ_CODE
    this.REQ_BY=data.USER_NAME
    this.TOPIC =data.TOPIC
    this.VENUE=data.VENUE
    this.DT_FROM=fromdate
    this.TO_DATE=to_date
    this.TIME_FROM=data.TIME_FROM
    this.TIME_TO=data.TIME_TO
    this.STATUS = data.POST_CMESTATUS ;
    this.isAdd=true;
    this.IsAction = true;
    this.IsDraft = true;
    this.GETCMEDOCTORLIST(this.HQ_CODE);
    this.GETPOSTCMEMASTERLIST();
  }

    loadDataLazily(e: any) {
    }
 
    clear(dt1: any): void {
      dt1.clear();
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
    
    OnBackClick(){
      this.isAdd=false;
      this.isPending = true;
      if(this.STATUS)
    this.GETPOSTCMELISTBYUSERID('P')
     this.AttendingDoctorList=[{
      ID:1,
      DOCTOR_NAME:"",
      DOCTOR_QUALIFICATION:"",
      DOCTOR_SPECIALIZATION:"",
      EMAIL_ID:"",
      MOBILE_NO:0,
    }
  ];
      this.BillDetailsList=[{
      BILL_NO:"",
      PARTICULARS:"",
      AMOUNT:0,

      }
    ];
    this.UploadDocumentdetails = [];
    }

    GetDoctorInfo(data:any){
      // console.log('data ->' , data)
      // return
      // console.log('AttendingDoctorList ->' , this.AttendingDoctorList.length)
      if(this.AttendingDoctorList.length == 1){
         this.AttendingDoctorList[0].ID = 1;
         this.AttendingDoctorList[0].DOCTOR_NAME = data.DOCTOR_NAME;
         this.AttendingDoctorList[0].DOCTOR_QUALIFICATION = data.QUALIFICATION;
         this.AttendingDoctorList[0].DOCTOR_SPECIALIZATION = data.SPL_ID;
         this.AttendingDoctorList[0].MOBILE_NO = 0;
         this.AttendingDoctorList[0].EMAIL_ID = '';
      }else {
        this.AttendingDoctorList.push(
          {
            "ID": this.AttendingDoctorList.length + 1,
            "DOCTOR_NAME":data.DOCTOR_NAME,
            "DOCTOR_QUALIFICATION":data.QUALIFICATION,
            "DOCTOR_SPECIALIZATION":data.SPL_ID,
            "MOBILE_NO":0,
            "EMAIL_ID":''
          }
        )
      }
      this.SpeakerViewPopUp = false;
    }

    SearchFilterDoctorList(){
      this.FILTERED_DOCTORS_LIST = this.DOCTORS_LIST.filter((item:any) => 
        item.DOCTOR_NAME.toLowerCase().includes(this.SearchInput.toLowerCase())
      );
    }

    addAttendingDoctor() {
      for (let  value of this.AttendingDoctorList) {
        if(!this.common.isValid(value.DOCTOR_NAME)){
         this.toastrService.error('Enter a Doctor Name')
         return  
        }
        if(!this.common.isValid(value.DOCTOR_QUALIFICATION)){
          this.toastrService.error('Enter a Doctor Qualification')
          return  
         }
         if(!this.common.isValid(value.DOCTOR_SPECIALIZATION)){
          this.toastrService.error('Select a Specialization')
          return  
         }
         if(!this.common.isValid(value.EMAIL_ID)){
          this.toastrService.error('Enter a Email Id')
          return  
         }
         if(!this.common.isValid(value.MOBILE_NO)){
          this.toastrService.error('Enter a Phone No')
          return  
         }
       }
        const newDoctorRow = {"ID": this.AttendingDoctorList.length + 1,  "DOCTOR_NAME": "","DOCTOR_QUALIFICATION": "","DOCTOR_SPECIALIZATION": null,"EMAIL_ID": "", "MOBILE_NO": 0};
      this.AttendingDoctorList.push(newDoctorRow);
    }
  
    removeAttendingDoctor(index: number) {
      if (this.AttendingDoctorList.length > 1) {
        this.AttendingDoctorList.splice(index, 1);
      }
    }
  
    // GetfileUpload(event: any) {
    //   if (window.FileReader) {
    //     let file = event.target.files[0];
    //     let reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //       let image = new Image();
    //       image.src = reader.result as string;
    //       image.onload = () => {
    //         let canvas = document.createElement('canvas');
    //         let ctx = canvas.getContext('2d');
    
            
    //         let maxWidth = 1024; 
    //         let maxHeight = 1024;
    
    //         let width = image.width;
    //         let height = image.height;
    
    
    //         if (width > height) {
    //           if (width > maxWidth) {
    //             height = Math.floor((height * maxWidth) / width);
    //             width = maxWidth;
    //           }
    //         } else {
    //           if (height > maxHeight) {
    //             width = Math.floor((width * maxHeight) / height);
    //             height = maxHeight;
    //           }
    //         }
    
    //         canvas.width = width;
    //         canvas.height = height;
    
    //         ctx!.drawImage(image, 0, 0, width, height);
    
           
    //         this.FileData = canvas.toDataURL('image/jpeg', 0.7);
    
            
    //         let base64Length = this.FileData.length - 'data:image/jpeg;base64,'.length;
    //         let sizeInBytes = 4 * Math.ceil(base64Length / 3) * 0.5624896334383812;
    //         let sizeInMB = sizeInBytes / (1024 * 1024);
    
    //         while (sizeInMB > 1) {
    //           this.FileData = canvas.toDataURL('image/jpeg', 0.6); 
    //           base64Length = this.FileData.length - 'data:image/jpeg;base64,'.length;
    //           sizeInBytes = 4 * Math.ceil(base64Length / 3) * 0.5624896334383812;
    //           sizeInMB = sizeInBytes / (1024 * 1024);
    //         }
    
    //         this.FILE_NAME = file.name;
    //         let parts = file.name.split(".");
    //         this.FILE_EXTENSION = '.' + parts[parts.length - 1];
    //       };
    //     };
    //   }
    // }

    GetfileUpload(event: any) {
      if (window.FileReader) {
        let file = event.target.files[0];
        let fileSizeMB = file.size / (1024 * 1024); // Convert bytes to megabytes
      if (fileSizeMB > 4) {
        this.toastrService.error('File size exceeds 4 MB limit'); // Show error toaster message
        return; // Stop further processing
      }
        let fileType = file.type;
        let fileName = file.name;
        let fileExtension = fileName.split('.').pop()?.toLowerCase();
    
        if (fileType.startsWith('image/')) {
          // Handle image files
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            let image = new Image();
            image.src = reader.result as string;
            image.onload = () => {
              let canvas = document.createElement('canvas');
              let ctx = canvas.getContext('2d');
      
              let maxWidth = 1024;
              let maxHeight = 1024;
      
              let width = image.width;
              let height = image.height;
      
              if (width > height) {
                if (width > maxWidth) {
                  height = Math.floor((height * maxWidth) / width);
                  width = maxWidth;
                }
              } else {
                if (height > maxHeight) {
                  width = Math.floor((width * maxHeight) / height);
                  height = maxHeight;
                }
              }
      
              canvas.width = width;
              canvas.height = height;
      
              ctx!.drawImage(image, 0, 0, width, height);
      
              this.FileData = canvas.toDataURL('image/jpeg', 0.7);
      
              let base64Length = this.FileData.length - 'data:image/jpeg;base64,'.length;
              let sizeInBytes = 4 * Math.ceil(base64Length / 3) * 0.5624896334383812;
              let sizeInMB = sizeInBytes / (1024 * 1024);
      
              while (sizeInMB > 1) {
                this.FileData = canvas.toDataURL('image/jpeg', 0.6);
                base64Length = this.FileData.length - 'data:image/jpeg;base64,'.length;
                sizeInBytes = 4 * Math.ceil(base64Length / 3) * 0.5624896334383812;
                sizeInMB = sizeInBytes / (1024 * 1024);
              }
      
              this.FILE_NAME = file.name;
              this.FILE_EXTENSION = '.' + fileExtension;
            };
          };
        } else if (fileType === 'application/pdf') {
          // Handle PDF files
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.FileData = reader.result as string;
            this.FILE_NAME = file.name;
            this.FILE_EXTENSION = '.' + fileExtension;
          };
        } else {
          console.log('Unsupported file type');
        }
      }
    }
    SaveAttachDocument() {
      if (!this.common.isValid(this.POST_CME_DOC_TYPE_CODE)) {
        this.toastrService.error('Select a document type');
        return;
      }
      if (!this.common.isValid(this.UPLOAD)) {
        this.toastrService.error('Upload a document');
        return;
      }
      
      this.DOCUMENT_TYPE_LIST.forEach((element: any) => {
        if (element.DOCUMENT_TYPE_ID == this.POST_CME_DOC_TYPE_CODE) {
          this.DOCUMENT_DESC = element.DOCUMENT_DESC;
        }
      });
    
      if (!this.UploadDocumentdetails) {
        this.UploadDocumentdetails = [];
      }
    
      this.UploadDocumentdetails.push({
        "POST_CME_DOC_TYPE_CODE": this.POST_CME_DOC_TYPE_CODE,
        "DOCUMENT_DESC": this.DOCUMENT_DESC,
        "FILE_BASE64": this.FileData,
        "FILE_NAME": this.FILE_NAME,
        "FILE_EXTENSION": this.FILE_EXTENSION,
        "SR_NO":this.UploadDocumentdetails.length + 1
        // "FILES": this.selectedFilesData
      });
    
      // console.log('After push:', this.UPLOAD_DOCUMENT_LIST);
    
      this.toastrService.success('Attach document successfully');
      this.POST_CME_DOC_TYPE_CODE = '';
      this.UPLOAD = '';
      this.FILE_NAME = '';
      this.FileData = '';
      this.DOCUMENT_DESC = '';
      this.FILE_EXTENSION = '';
      this.selectedFilesData = [];
    }

  //   SAVE_DRAFT(val:number) {
     
  //   for(const  data of this.AttendingDoctorList){
  //     if(!this.common.isValid(data.DOCTOR_NAME)){
  //         this.toastrService.error('Enter a Doctor Name')
  //         return
  //     }
  //     if(!this.common.isValid(data.DOCTOR_QUALIFICATION)){
  //       this.toastrService.error('Enter a Qualification')
  //       return
  //     }
  //     if(!this.common.isValid(data.DOCTOR_SPECIALIZATION)){
  //       this.toastrService.error('Select a Specialization')
  //       return
  //     }
  //     if(!this.common.isValid(data.EMAIL_ID)){
  //       this.toastrService.error('Enter a Email ID')
  //       return
  //     }
  //     if(!this.common.isValid(data.MOBILE_NO)){
  //       this.toastrService.error('Enter a Mobile No ')
  //       return
  //     }
  //   }
  //   for(const  data of this.BillDetailsList){
  //     if(!this.common.isValid(data.BILL_NO)){
  //         this.toastrService.error('Enter a  Bill No')
  //         return
  //     }
  //     if(!this.common.isValid(data.PARTICULARS)){
  //       this.toastrService.error('Enter a Particulars')
  //       return
  //     }
  //     if(!this.common.isValid(data.AMOUNT)){
  //       this.toastrService.error('Enter a Amount')
  //       return
  //     }
   
  //   }
  // // if (!this.UploadDocumentdetails || this.UploadDocumentdetails.length === 0) {
  // //   this.toastrService.error('Upload a Document');
  // //   return;
  // // }
  //     this.AttendingDoctorList.forEach(element => {
  //     if(element.MOBILE_NO==0){
  //       element.MOBILE_NO=0
  //     }
  //   });
  //     this.BillDetailsList.forEach(element => {
  //       if(element.AMOUNT==0){
  //         element.AMOUNT=0
  //       }
  //    });
  //    this.UploadDocumentdetails.forEach((element:any)=>{
  //     this.removeMimeTypePrefix(element.FILE_BASE64);
  //     element.FILE_BASE64 = this.base64Data;
  //  })
  //  this.UploadDocumentdetails = this.UploadDocumentdetails.map((item , index) => ({  ...item, SR_NO: index + 1,}));
 
  //      let data = {
  //        "USER_ID": this.userInfo.USER_ID,
  //        "CME_NO": this.common.isValid(this.CME_NO) ? this.CME_NO : 0,
  //        "CME_ID": this.common.isValid(this.CME_ID) ? this.CME_ID : 0,
  //        "IS_UPDATE": 1,
  //        "IS_DRAFT": val ,
  //        "NO_OF_PATIENTS": this.common.isValid(this.NO_OF_PATIENTS) ? this.NO_OF_PATIENTS : "0",
	//        "VENDER":this.VENDOR,
  //        "ATTENDING_DOCTORS_DETAILS": this.AttendingDoctorList ,
  //        "BILL_DETAILS": this.BillDetailsList,
  //       "DOCUMENT_DETAILS": this.UploadDocumentdetails

  //      };
      
  //     //  console.log('Data to be sent -> ', JSON.stringify(data));
  //     //  return;
  //     this.http.postnew(this.url.SAVEPOSTCMEREQUEST, data)
  //        .then((res: any) => {
          
  //         if (res.FLAG === true) {
  //       if (val === 1) {
  //         this.toastrService.success('Form saved successfully!');
  //       } else {
  //         this.toastrService.success('Draft saved successfully!');
  //       }
  //    this.isAdd = false;
  //    this.GETPOSTCMELISTBYUSERID('P');
  //     } else {
  //       this.toastrService.error('Failed to save. Please try again.');
  //     }
  //   })
  //   .catch((error: any) => {
  //     this.toastrService.error('An error occurred while saving.');
  //   });
  //   }
 
 
 GetCampView(id:any){
  if(id == "5"){
    this.isCampTypeView = true;
  }else{
   this.isCampTypeView = false;
  }
 }

 isMobileNoInvalid(): boolean {
  const mobileNo = this.item.MOBILE_NO;
  return !/^[0-9]{10}$/.test(mobileNo);
}

validateNumber(event: Event) {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^0-9]/g, '');
  // this.form.controls['mobileNo'].setValue(input.value); // Update form control value
}

addBillDetail() {
//  console.log(this.BillDetailsList);
for (let  value of this.BillDetailsList) {
  if(!this.common.isValid(value.BILL_NO)){
   this.toastrService.error('Enter a Bill No')
   return  
  }
  if(!this.common.isValid(value.PARTICULARS)){
    this.toastrService.error('Enter a Particulars')
    return  
   }
   if(!this.common.isValid(value.AMOUNT)){
    this.toastrService.error('Enter a Amount')
    return  
   }
   if(value.AMOUNT <= 0 ){
    this.toastrService.error('Enter a amount is greater than 0')
    return  
   }
 }
const newDropdown1 = { ID: this.BillDetailsList.length + 1, BILL_NO: '',PARTICULARS:'',AMOUNT:0 };
this.BillDetailsList.push(newDropdown1);
this.GetCalculateBillDetailsAmount();
}


removeBillDetail(index: number) {
  if (this.BillDetailsList.length > 1) {
    this.BillDetailsList.splice(index, 1);
  }
  this.GetCalculateBillDetailsAmount();
}




isValidEntry(item: any): boolean {
  return !!item.BILL_NO && !!item.PARTICULARS && !!item.AMOUNT;
}

ViewPostList(data1:any) {
  // console.log('data ->' , data1)
  let todate = this.datePipe.transform(data1.CME_DATE,"dd-MM-yyyy")
    let fromdate = this.datePipe.transform(data1.DATE_FROM,"dd-MM-yyyy")
    let to_date = this.datePipe.transform(data1.DATE_TO,"dd-MM-yyyy")
    this.CME_ID=data1.CME_ID;
    this.IS_VIEW=data1.IS_VIEW;
    this.CME_NO = data1.CME_NO;
    this.CME_TYPE_ID=data1.CME_TYPE
    this.GetCampView(this.CME_TYPE_ID);
    this.CAMP_TYPE_ID=data1.CAMP_TYPE
   
    this.InstName=data1.IS_INSITUTION_NAME
    if(this.InstName == true){
      this.INSTITUTION = true;
      this.NON_INSTITUTION = false;
    }else if(this.InstName == false){
      this.NON_INSTITUTION = true;
      this.INSTITUTION = false;
    }

    this.INST_NAME=data1.INST_NAME
    this.DATE = todate
    this.HQ_DESC = data1.HQ_DESC
    this.HQ_CODE = data1.HQ_CODE
    this.REQ_BY=data1.USER_NAME
    this.TOPIC =data1.TOPIC
    this.VENUE=data1.VENUE
    this.DT_FROM=fromdate
    this.TO_DATE=to_date
    this.TIME_FROM=data1.TIME_FROM
    this.TIME_TO=data1.TIME_TO
    this.STATUS = data1.POST_CMESTATUS ;
    this.GETCMEDOCTORLIST(this.HQ_CODE)
    this.GETPOSTCMEMASTERLIST()

  const data = {  
    "USER_ID": this.userInfo.USER_ID,  
    "CME_NO": this.common.isValid(data1.CME_NO) ? data1.CME_NO : 0,  
    "CME_ID": this.common.isValid(data1.CME_ID) ? data1.CME_ID : 0,  
  };  
  
  this.http.postnew(this.url.GETDETAILSPOSTCMEREQUEST, data)  
    .then((res: any) => {  
      if(data1.POST_CMESTATUS=="Draft"){
        this.IsAction =  true;
        this.IsDraft = false;
        this.isAdd = true;
        this.formFieldsDisabled=false;
      }else{
        this.IsAction =  false;
        this.IsDraft = false;
        this.isAdd = true;
        this.formFieldsDisabled=true;
        this.isViewClicked = true;
      }
      if (res && res.POST_CME_REQ_DETAILS && res.POST_CME_REQ_DETAILS.length > 0) {  
        this.postDetailsList = res.POST_CME_REQ_DETAILS; 
        const firstDetail = this.postDetailsList[0];  
        if (firstDetail) {  
          this.CME_ID = firstDetail.CME_ID; 
        }  
        this.AttendingDoctorList = [];
        this.BillDetailsList = [];
        let POST_CME_ATTENDING_DOCTORS_DETAILS = [];
        // POST_CME_ATTENDING_DOCTORS_DETAILS = res.POST_CME_ATTENDING_DOCTORS_DETAILS; 
        this.AttendingDoctorList = res.POST_CME_ATTENDING_DOCTORS_DETAILS; 

        // POST_CME_ATTENDING_DOCTORS_DETAILS.forEach((element:any,index:any)=>{
        //   this.AttendingDoctorList.push(
        //     {
        //       "ID":index + 1,
        //       "DOCTOR_NAME":element.DOCTOR_NAME,
        //       "QUALIFICATION": element.DOCTOR_QUALIFICATION,
        //       "EMAIL_ID":element.EMAIL_ID,
        //       "MOBILE_NO": element.MOBILE_NO,
        //       "SPEAKER_SPECIALIZATION_ID" :element.DOCTOR_SPECIALIZATION
        //     });
        // })
        this.BillDetailsList=res.POST_CME_BILL_DETAILS;
         
      this.UPLOAD_DOCUMENT_LIST= [];
      this.SAMPEL_UPLOAD_DOCUMENT_LIST = [];
      this.NO_OF_PATIENTS = res.POST_CME_REQ_DETAILS[0].NO_OF_PATIENTS
      this.VENDOR=res.POST_CME_REQ_DETAILS[0].VENDER
      this.SAMPEL_UPLOAD_DOCUMENT_LIST = res.POST_CME_DOCUMENT_DETAILS;
      this.UploadDocumentdetails = [];
      this.SAMPEL_UPLOAD_DOCUMENT_LIST.forEach((element:any)=>{
      this.UploadDocumentdetails.push({
          "FILE_NAME":element.POST_CME_SYS_FILENAME,
          "FILE_BASE64":element.FILE_BASE64,
          "SR_NO":element.SR_NO,
          "DOCUMENT_DESC":element.DOCUMENT_DESC,
          "FILE_EXTENSION":element.POST_CME_FILE_EXTENSION,
          "CME_ID":element.CME_ID,
         });
      });
      } else {  
        console.error('Invalid response structure:', res);  
      }  
    })  
    .catch((error) => {  
      console.error('Error during API call:', error);  
    });  
}  

GetCalculateBillDetailsAmount(){
  this.BILL_DETAILS_TOTAL_AMOUNT = this.BillDetailsList.reduce((sum:any, item:any) => sum + Number(item.AMOUNT), 0); 
}

clearForm() {
  this.DATE = null;
  this.REQ_BY = null;
  this.HQ_CODE = null;
  this.CAMP_TYPE_ID = null;
  this.INST_NAME = '';
  this.TOPIC = '';
  this.VENUE = '';
  this.DT_FROM = null;
  this.TO_DATE = null;
  this.TIME_FROM = null;
  this.TIME_TO = null;
  this.AttendingDoctorList = [{
      ID:1,
      DOCTOR_NAME: "",
      DOCTOR_QUALIFICATION: "",
      DOCTOR_SPECIALIZATION: "",
      EMAIL_ID: "",
      MOBILE_NO: 0
  }];
  this.BillDetailsList = [{
      BILL_NO: "",
      PARTICULARS: "",
      AMOUNT: 0
  }];
  this.UPLOAD_DOCUMENT_LIST = [];
  this.UploadDocumentdetails = [];
}


removeMimeTypePrefix(base64:any): void {
  this.base64Data = '';
const mimeTypePrefixes = ['data:image/png;base64,', 'data:image/jpeg;base64,', 'data:image/jpg;base64,',
                          'data:application/pdf;base64,','data:image/JPG;base64,','data:image/JPEG;base64,',
                          'data:image/PNG;base64,','data:image/PDF;base64,']; // Add more MIME types as needed

// Loop through MIME type prefixes and remove the first one found in base64Data
for (const prefix of mimeTypePrefixes) {
  if(base64 == null){
     return
  }
  if (base64.startsWith(prefix)) {
     this.base64Data = base64.slice(prefix.length);
    return; // Exit the loop once a prefix is removed
  }
}

// If no matching prefix is found, set decodedData to base64Data (no change)
this.base64Data = base64;
}

clearGlobalFilter(input: HTMLInputElement) {
  input.value = '';
  // this.dt1.clear(); // clears all filters including global
}


}
