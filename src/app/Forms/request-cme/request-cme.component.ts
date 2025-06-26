
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
  selector: 'app-request-cme',
  templateUrl: './request-cme.component.html',
  styleUrls: ['./request-cme.component.css']
})
export class RequestCmeComponent implements OnInit {
  @ViewChild('PreviewPDF', { static: true }) PreviewPDF!: ElementRef;
  @ViewChild('DownloadPDF', { static: false }) DownloadPDF!: ElementRef;

  CME_NO: any;
  CME_DATE: any = new Date();
  REQ_BY: any;
  CME_REQUEST_BY: any;
  HQ_CODE: any;
  CME_TYPE_ID: any;
  CAMP_TYPE_ID: any;
  INST_NAME: any;
  TOPIC: any;
  SPEAKER_NAME: any;
  SPEAKER_QUALIFICATION: any;
  SPEAKER_SPECIALIZATION: any;
  VENUE: any;
  CME_DATE_FROM: any = new Date();
  CME_TO_DATE: any = new Date();
  CME_TO_TIME: any;
  CME_TIME_FROM: any;
  AMOUNT: any;
  GST: any;
  PAY_BY_DATE: any = new Date();
  Today: any = new Date();
  ADVANCE_CODE: any;
  ADVANCE: any;
  ATTENDING_TEAM_LIST: any = [];
  EXPECTED_DOCTORS: any;
  BRAND_LIST: any = [];
  UPLOAD: any;
  PROMOTION_MATERIAL_REQUEST: any = [{ ID: 1, REMARKS: '', QUANTITY: 0 }];
  DOCUMENT_TYPE_LIST: any = [];
  CME_DOC_TYPE_CODE: any;
  DOCTORS_LIST: any = [];
  InstName: boolean = false;
  SpeakerViewPopUp: boolean = false;
  isAddvanceView: boolean = false;
  UPLOAD_DOCUMENT_LIST: any = [];
  userInfo: any = {};
  HQ_CODE_LIST: any[] = [];
  CME_TYPE_LIST: any = [];
  CAMP_TYPE_LIST: any = [];
  USER_ID: any;
  PRODUCT_CODE: any;
  WHOM_TO_PAY_LIST: any = [];
  NON_INSTITUTION: boolean = true;
  INSTITUTION: boolean = false;
  isSlideDeckReqd: boolean = false;
  isArtWorkReqd: boolean = false;
  AttendingDropdowns = [{ ID: 1, USER_ID: null }];
  ATTENDING_TEAM_DROPDOWN = [{ ID: 1, USER_ID: null }];
  BrandDropdowns = [{ ID: 1, PRODUCT_CODE: null }];
  BRANDS_DROPDOWN = [{ ID: 1, PRODUCT_CODE: null }];
  PromotionalMaterialReq = [{ ID: 1, REMARKS: '', QUANTITY: 0 }];
  isViewAddBrand: boolean = false;
  isViewAddAttending: boolean = false;
  UploadDocumentPopUp: boolean = false;
  isViewPromMAterialReq: boolean = false;
  isLoaded: boolean = false;
  SearchInput: string = '';
  FileData: string | ArrayBuffer | null = null;
  DOCUMENT_DESC: any;
  FILE_NAME: any;
  PROM_MAT_REQ_ITEM_LIST: any = [];
  FILE_EXTENSION: any;
  FILTERED_DOCTORS_LIST: any = [];
  REQ_BY_USER_ID: any = 0;
  WHOM_TO_PAY_USER_ID: any;
  isCampTypeView: boolean = false;
  REQ_BY_USER_NAME: any;
  SPEAKER_SPECIALIZATION_LIST: any = [];
  SPEAKER_SPECIALIZATION_ID: any;
  CME_ID: any = 0;
  NewDate: any;
  cme_date: any;
  cme_date_from: any;
  cme_to_date: any;
  pay_by_date: any;
  Today_cme_to_date: any;
  REQUEST_REJECT_REMARKS: any;
  RejectCMERequestPopUp: boolean = false;
  CmeApproveData: any = [];
  ClaimApproveData: any = [];
  IS_ADVANCE_YES: boolean = false;
  IS_ADVANCE_NO: boolean = true;
  IS_SLIDE_DECK_REQD_YES: boolean = false;
  IS_SLIDE_DECK_REQD_NO: boolean = true;
  IS_ART_WORK_REQD_YES: boolean = false;
  IS_ART_WORK_REQD_NO: boolean = true;
  FILES_DATA: any;
  selectedFilesData: any = [];
  additionalData = {
    someProperty: ''
  };
  base64Data: string = '';
  IS_VIEW: any;
  IS_APPROVAL: any;
  DIV_LIST: any = [];
  DIVISION_CODE: any;
  IS_APPROVED: any;
  isDocumentMandatory: boolean = false;
  SAMPEL_DOCUMENT_TYPE_LIST: any = [];
  WHOM_TO_PAY_USER_NAME: any;
  IS_WHOM_TO_PAY_USER: boolean = true;
  IS_WHOM_TO_PAY_OTHERS: boolean = false;
  isWhomToPayView: any = 'U';
  datalist: any = []
  CME_DESC: any;
  SPEAKER_SPECIALIZATION_NAME: any;
  IS_ADVANCE_DESC: string;
  SLIDE_DEC_REQD_DESC: string;
  ART_WORK_REQD_DESC: string;
  ATTENDING_TEAM: any[];
  BRANDS: any[];
  PROM_MAT_REQ_ITEM: any[];
  HQ_DESC: any;
  DIVISION_NAME: any;
  REQ_UPDATED_USER_DETAILS: any = [];
  TOPIC_LIST: any[];
  DROPDOWNFLAG: boolean;
  TOPIC_ID: any;
  visible: boolean = false;
  CME_REQ_PAYMENT_DETAILS: any;
  vissiblepostpone: Boolean = false;
  dataForBackup: { VENUE: any; FROM_DATE: any; TO_DATE: any; TIME_FROM: any; TIME_TO: any; };
  vissibleCancel: boolean = false;
  POST_CMESTATUS: any = '0';
  IS_CANCELLED: any = '0'
  Doctor_Name_To_pay_TO: boolean = false;
  BANK_NAME: any
  ACCOUNT_NUMBER: any
  BANK_IFSC: any
  PAN_NO: any;


  constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService, private common: CommonService, public datePipe: DatePipe, private router: Router, public httpclient: HttpClient) {
  }

  ngOnInit(): void {
    this.userInfo = JSON.parse(this.authService.getUserDetail());
    this.CME_ID = localStorage.getItem("CME_ID");
    this.IS_VIEW = localStorage.getItem("IS_VIEW");
    this.IS_APPROVAL = localStorage.getItem("IS_APPROVAL");
    this.IS_APPROVED = localStorage.getItem("IS_APPROVED");
    this.REQ_BY_USER_ID = this.userInfo.USER_ID;
    this.REQ_BY_USER_NAME = this.userInfo.USER_NAME;
    this.Today = new Date('04/01/2025');
    if (this.CME_ID == null) {
      this.GETCMEMASTERLIST();
      this.CME_TIME_FROM = new Date();
      this.CME_TIME_FROM.setHours(9);
      this.CME_TIME_FROM.setMinutes(0);
      this.CME_TO_TIME = new Date();
      this.CME_TO_TIME.setHours(9);
      this.CME_TO_TIME.setMinutes(0);
    } else {
      this.GETCMEMASTERLIST();
      this.GETCMEREQUESTDATABYCMENO();
    }
    // this.TOPIC_LIST=[
    //   {
    //     "TOPIC_ID": 1,
    //     "TOPIC_DESC": "Role of Vitamin B12 & Vit D3 in Neuropathy"
    //   },
    //   {
    //     "TOPIC_ID": 2,
    //     "TOPIC_DESC": "Micro Nutrient Deficiency in Children"
    //   },
    //   {
    //     "TOPIC_ID": 3,
    //     "TOPIC_DESC": "Role of ALA & Metformin in PCOS"
    //   },
    //   {
    //     "TOPIC_ID": 4,
    //     "TOPIC_DESC": "Cough Management"
    //   },
    //   {
    //     "TOPIC_ID": 5,
    //     "TOPIC_DESC": "Fever Management"
    //   },
    //   {
    //     "TOPIC_ID": 6,
    //     "TOPIC_DESC": "Mixed Pain"
    //   },
    //   {
    //     "TOPIC_ID": 7,
    //     "TOPIC_DESC": "Osteoarthritis Management"
    //   },
    //   {
    //     "TOPIC_ID": 8,
    //     "TOPIC_DESC": "Role of Pregabalin and Nortriptyline in Neuropathic Pain"
    //   },
    //   {
    //     "TOPIC_ID": 9,
    //     "TOPIC_DESC": "Role of Methylcobalamin in Peripheral Neuropathy"
    //   },
    //   {
    //     "TOPIC_ID": 10,
    //     "TOPIC_DESC": "Diclofenac Transdermal Patch"
    //   },
    //   {
    //     "TOPIC_ID": 11,
    //     "TOPIC_DESC": "Atopic Dermatitis"
    //   },
    //   {
    //     "TOPIC_ID": 12,
    //     "TOPIC_DESC": "Pregabaline SR + Methylcobalamin in Neuropathic Pain"
    //   },
    //   {
    //     "TOPIC_ID": 13,
    //     "TOPIC_DESC": "Management of LBP with Muscle Relaxant"
    //   },
    //   {
    //     "TOPIC_ID": 0,
    //     "TOPIC_DESC": "Other"
    //   }
    // ]

  }
  showDialog() {
    // this.GETCMEREQUESTDATABYCMENO();
    // let SAMPEL_CME_REQ_UPDATED_USER_DETAILS = this.REQ_UPDATED_USER_DETAILS;
    // this.REQ_UPDATED_USER_DETAILS = this.transformData1(SAMPEL_CME_REQ_UPDATED_USER_DETAILS)
    console.log(' this.REQ_UPDATED_USER_DETAILS;', this.REQ_UPDATED_USER_DETAILS);

    this.visible = true;
  }

  GETCMEMASTERLIST() {
    let data = {
      "USER_ID": this.userInfo.USER_ID
    }
    this.isLoaded = true;
    this.http.postnew(this.url.GETCMEMASTERLIST, data).then(
      (res: any) => {
        //   console.log('GETCMEMASTERLIST res ->' , res)
        this.HQ_CODE_LIST = res.HQ_CODE_LIST;
        this.CME_TYPE_LIST = res.CME_TYPE_LIST;
        this.CAMP_TYPE_LIST = res.CAMP_TYPE_LIST;
        this.DOCUMENT_TYPE_LIST = res.DOCUMENT_TYPE_LIST;
        this.SAMPEL_DOCUMENT_TYPE_LIST = res.DOCUMENT_TYPE_LIST;
        this.ATTENDING_TEAM_LIST = res.CME_ATTENDING_LIST;
        this.BRAND_LIST = res.CME_BRANDS_LIST;
        this.WHOM_TO_PAY_LIST = res.WHOM_TO_PAY_LIST;
        this.PROM_MAT_REQ_ITEM_LIST = res.ITEM_LIST;
        this.SPEAKER_SPECIALIZATION_LIST = res.DOCTOR_SPECIALIZATION_LIST;
        this.DIV_LIST = res.DIV_LIST;
        this.TOPIC_LIST = res.TOPIC_LIST
        this.isLoaded = false;
      },
      error => {
        console.log(error);
        this.isLoaded = false;
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  SpeakerView() {
    if (!this.common.isValid(this.HQ_CODE)) {
      this.toastrService.error('Please Select a HQ Code');
      return
    }
    this.isLoaded = true;
    this.SpeakerViewPopUp = true;
    this.isLoaded = false;
  }

  CheckisAddvance(val: any) {
    if (val == '1') {
      this.IS_ADVANCE_YES = true;
      this.IS_ADVANCE_NO = false;
      this.ADVANCE = '';
      this.isAddvanceView = true;
    } else if (val == '0') {
      this.IS_ADVANCE_YES = false;
      this.IS_ADVANCE_NO = true;
      this.ADVANCE = '';
      this.isAddvanceView = false;
    }
  }


  CheckisWhomToPay(val: any) {
    if (val == '1') {
      this.Doctor_Name_To_pay_TO = false
      this.IS_WHOM_TO_PAY_USER = true;
      this.IS_WHOM_TO_PAY_OTHERS = false;
      this.isWhomToPayView = 'U';
      this.WHOM_TO_PAY_USER_NAME = '';
    } else if (val == '0') {
      this.Doctor_Name_To_pay_TO = true
      this.IS_WHOM_TO_PAY_USER = false;
      this.IS_WHOM_TO_PAY_OTHERS = true;
      this.isWhomToPayView = 'O';
      this.WHOM_TO_PAY_USER_ID = 0;
    }
  }

  CheckisSlideDeckReqd(val: any) {
    if (val == '1') {
      this.isSlideDeckReqd = true;
      this.IS_SLIDE_DECK_REQD_YES = true;
      this.IS_SLIDE_DECK_REQD_NO = false;
    } else if (val == '0') {
      this.isSlideDeckReqd = false;
      this.IS_SLIDE_DECK_REQD_YES = false;
      this.IS_SLIDE_DECK_REQD_NO = true;
    }
  }

  CheckisArtWorkReqd(val: any) {
    if (val == '1') {
      this.isArtWorkReqd = true;
      this.IS_ART_WORK_REQD_YES = true;
      this.IS_ART_WORK_REQD_NO = false;
    } else if (val == '0') {
      this.isArtWorkReqd = false;
      this.IS_ART_WORK_REQD_YES = false;
      this.IS_ART_WORK_REQD_NO = true;
    }
  }

  CheckInstitution(val: any) {
    if (val == '1') {
      this.INSTITUTION = true;
      this.NON_INSTITUTION = false;
      this.InstName = true;
      this.INST_NAME = '';
      this.WHOM_TO_PAY_USER_ID = 0;
      this.WHOM_TO_PAY_USER_NAME = '';
      if (this.CME_TYPE_ID == 3 || this.CME_TYPE_ID == 1) {
        this.isDocumentMandatory = true;
      } else {
        this.isDocumentMandatory = false;
      }
      this.DOCUMENT_TYPE_LIST = [];
      this.DOCUMENT_TYPE_LIST = this.SAMPEL_DOCUMENT_TYPE_LIST;
    } else if (val == '0') {
      this.INSTITUTION = false;
      this.NON_INSTITUTION = true;
      this.InstName = false;
      this.INST_NAME = '';
      this.WHOM_TO_PAY_USER_ID = 0;
      this.WHOM_TO_PAY_USER_NAME = '';
      this.isDocumentMandatory = true;
      this.DOCUMENT_TYPE_LIST = [];
      this.DOCUMENT_TYPE_LIST = [{
        "DOCUMENT_DESC": "Letter",
        "DOCUMENT_TYPE_ID": "3"
      }];
    }
  }

  addAttendingTeamList() {
    for (let value of this.AttendingDropdowns) {
      if (!this.common.isValid(value.USER_ID)) {
        this.toastrService.error('Select a Attending User ')
        return
      }
    }
    const newDropdown = { ID: this.AttendingDropdowns.length + 1, USER_ID: null };
    this.AttendingDropdowns.push(newDropdown);
    // if(this.AttendingDropdowns.length == 4){
    //     this.isViewAddAttending = true;
    // }
  }

  removeAttendingTeamList(index: any) {
    this.AttendingDropdowns.splice(index, 1)
    // if(this.AttendingDropdowns.length < 4){
    //   this.isViewAddAttending = false;
    // }
  }

  addBrandList() {
    for (let value of this.BrandDropdowns) {
      if (!this.common.isValid(value.PRODUCT_CODE)) {
        this.toastrService.error('Select a Brand')
        return
      }
    }
    const newDropdown1 = { ID: this.BrandDropdowns.length + 1, PRODUCT_CODE: null };
    this.BrandDropdowns.push(newDropdown1);
    // if(this.BrandDropdowns.length == 4){
    //     this.isViewAddBrand = true;
    // }
  }

  removeBrandList(index: any) {
    this.BrandDropdowns.splice(index, 1)
    // if(this.BrandDropdowns.length < 4){
    //   this.isViewAddBrand = false;
    // }
  }

  GetDoctorInfo(data: any) {
    //  console.log('data ->' , data)
    this.SPEAKER_NAME = '';
    this.SPEAKER_QUALIFICATION = '';
    this.SPEAKER_SPECIALIZATION = '';
    this.SPEAKER_NAME = data.DOCTOR_NAME;
    this.SPEAKER_QUALIFICATION = data.QUALIFICATION;
    this.SPEAKER_SPECIALIZATION_LIST.forEach((element: any) => {
      if (element.SPL_DESCRIPTION == data.SPL_DESCRIPTION) {
        this.SPEAKER_SPECIALIZATION_ID = element.SPL_ID;
      }
    });
    this.SpeakerViewPopUp = false;
  }

  // GetfileUpload(event: any){
  //   if (window.FileReader) {
  //     let file = event.target.files[0];
  //     let reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.FileData = reader.result;
  //       this.FILE_NAME = file.name;
  //       let parts = file.name.split(".");
  //       this.FILE_EXTENSION = '.' + parts[parts.length - 1] 
  //       // console.log(' FILE_EXTENSION ->' , this.FILE_EXTENSION )
  //       // console.log(' ImageData ->' , this.FileData )
  //       // console.log(' Custom_FileName ->' , this.FILE_NAME )
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

  OpenUploadDocumentPopUp() {
    // console.log('test')
    this.UploadDocumentPopUp = true;
  }

  NewUpload(event: any) {
    this.selectedFilesData = [];
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.selectedFilesData.push(event.target.files[i]);
        this.FILE_NAME = event.target.files[i].name;
        let parts = event.target.files[i].name.split(".");
        this.FILE_EXTENSION = '.' + parts[parts.length - 1]
      }
    }
  }

  SaveAttachDocument() {
    if (!this.common.isValid(this.CME_DOC_TYPE_CODE)) {
      this.toastrService.error('Select a document type')
      return
    }
    if (!this.common.isValid(this.UPLOAD)) {
      this.toastrService.error('Upload a document')
      return
    }

    this.DOCUMENT_TYPE_LIST.forEach((element: any) => {
      // console.log('element ->' , element)
      if (element.DOCUMENT_TYPE_ID == this.CME_DOC_TYPE_CODE) {
        this.DOCUMENT_DESC = element.DOCUMENT_DESC
      }
    });

    this.UPLOAD_DOCUMENT_LIST.push(
      {
        "CME_DOC_TYPE_CODE": this.CME_DOC_TYPE_CODE, "DOCUMENT_DESC": this.DOCUMENT_DESC,
        "FILE_BASE64": this.FileData, "FILE_NAME": this.FILE_NAME, "FILE_EXTENSION": this.FILE_EXTENSION,
        // "FILES":this.selectedFilesData
      }
    );

    this.toastrService.success('Attach document sucessfully')
    this.CME_DOC_TYPE_CODE = '';
    this.UPLOAD = '';
    this.FILE_NAME = '';
    this.FileData = '';
    this.DOCUMENT_DESC = '';
    this.FILE_EXTENSION = '';
    this.selectedFilesData = [];
    // console.log('FileData ->' , this.FileData)
    // console.log('UPLOAD ->' , this.UPLOAD)
    // console.log('UPLOAD_DOCUMENT_LIST ->' , this.UPLOAD_DOCUMENT_LIST)
  }

  RemoveDocument(index: any) {
    this.UPLOAD_DOCUMENT_LIST.splice(index, 1);
    this.CME_DOC_TYPE_CODE = '';
    this.UPLOAD = '';
    this.FILE_NAME = '';
    this.FileData = '';
    this.DOCUMENT_DESC = '';
    this.FILE_EXTENSION = '';
  }

  addPromMaterialReq() {
    for (let value of this.PromotionalMaterialReq) {
      if (value.QUANTITY < 1) {
        this.toastrService.error('Enter a Item Quantity is grater than 0')
        return
      }
    }
    const newDropdown1 = { ID: this.PromotionalMaterialReq.length + 1, REMARKS: '', QUANTITY: 0 };
    this.PromotionalMaterialReq.push(newDropdown1);
    // if(this.PromotionalMaterialReq.length == 4){
    //     this.isViewPromMAterialReq = true;
    // }
  }

  removePromMaterialReq(index: any) {
    this.PromotionalMaterialReq.splice(index, 1)
    // if(this.PromotionalMaterialReq.length < 4){
    //   this.isViewPromMAterialReq = false;
    // }
  }

  SearchFilterDoctorList() {
    // console.log('SearchInput ->' , this.SearchInput)
    this.FILTERED_DOCTORS_LIST = this.DOCTORS_LIST.filter((item: any) =>
      item.DOCTOR_NAME.toLowerCase().includes(this.SearchInput.toLowerCase())
    );
  }

  GetCampView(id: any) {
    if (id == 5) {
      this.isCampTypeView = true;
    } else {
      this.isCampTypeView = false;
    }
    if (id == 3 || id == 1) {
      this.isDocumentMandatory = true;
    } else {
      this.isDocumentMandatory = false;
    }
    if (id == 6 || id == 7 || id == 8) {
      this.Doctor_Name_To_pay_TO = true
      console.log('inside', this.Doctor_Name_To_pay_TO);
      this.CheckisWhomToPay('0')
      //  this.IS_WHOM_TO_PAY_USER=false
      // this.IS_WHOM_TO_PAY_OTHERS=true
    } else {
      this.Doctor_Name_To_pay_TO = false
      console.log('outside', this.Doctor_Name_To_pay_TO);
      this.CheckisWhomToPay('1')
      //  this.IS_WHOM_TO_PAY_OTHERS=false
      //  this.IS_WHOM_TO_PAY_USER=true
    }
  }

  getValidDate() {
    this.Today_cme_to_date = new Date(this.CME_DATE_FROM);

  }

  GETCMEDOCTORLIST(event: any) {
    let data = {
      "HQ_CODE": event
    }
    this.isLoaded = true;
    this.http.postnew(this.url.GETCMEDOCTORLIST, data).then((res: any) => {
      this.isLoaded = false;
      this.DOCTORS_LIST = [];
      this.FILTERED_DOCTORS_LIST = [];
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

  SAVECMEREQUEST(val: any) {
    // if(!this.common.isValid(this.CME_NO)){
    //   this.toastrService.error('Enter a CME No')
    //   return
    // }
    if (this.isWhomToPayView == 'O' && this.Doctor_Name_To_pay_TO) {

      this.WHOM_TO_PAY_USER_NAME = this.SPEAKER_NAME
    }
    if (this.InstName == true) {
      this.WHOM_TO_PAY_USER_NAME = this.INST_NAME
    }

    if (!this.common.isValid(this.CME_DATE)) {
      this.toastrService.error('Select a Date')
      return
    }
    if (!this.common.isValid(this.REQ_BY_USER_ID)) {
      this.toastrService.error('Select a Req By')
      return
    }
    // if(!this.common.isValid(this.HQ_CODE)){
    //   this.toastrService.error('Select a HQ Code')
    //   return
    // }
    if (!this.common.isValid(this.CME_TYPE_ID)) {
      this.toastrService.error('Select a CME Type')
      return
    }
    if (this.isCampTypeView == true) {
      if (!this.common.isValid(this.CAMP_TYPE_ID)) {
        this.toastrService.error('Select a CAMP Type')
        return
      }
    }
    if (this.INSTITUTION == true) {
      if (!this.common.isValid(this.INST_NAME)) {
        this.toastrService.error('Enter a Inst Name')
        return
      }
    }
    // if(this.TOPIC_ID==0 ){
    console.log('this.TOPIC', this.TOPIC);

    if (this.TOPIC_ID == 0 && !this.common.isValid(this.TOPIC)) {
      this.toastrService.error('Enter a Topic')
      return
    }
    //  }
    if (this.TOPIC_ID != 0 && !this.common.isValid(this.TOPIC_ID)) {
      this.toastrService.error('Please select a Topic')
      return
    }
    if (!this.common.isValid(this.SPEAKER_NAME)) {
      this.toastrService.error('Enter a Speaker Name')
      return
    }
    if (!this.common.isValid(this.SPEAKER_QUALIFICATION)) {
      this.toastrService.error('Enter a Speaker Qual')
      return
    }
    if (!this.common.isValid(this.SPEAKER_SPECIALIZATION_ID)) {
      this.toastrService.error('Enter a Speaker Specialization')
      return
    }
    if (!this.common.isValid(this.VENUE)) {
      this.toastrService.error('Enter a Venue')
      return
    }
    if (!this.common.isValid(this.CME_DATE_FROM)) {
      this.toastrService.error('Select a Dt From')
      return
    }
    if (!this.common.isValid(this.CME_TO_DATE)) {
      this.toastrService.error('Select a Dt From To')
      return
    }
    if (!this.common.isValid(this.CME_TIME_FROM)) {
      this.toastrService.error('Select a Time From')
      return
    }
    if (!this.common.isValid(this.CME_TO_TIME)) {
      this.toastrService.error('Select a Time From To')
      return
    }
    if (!this.common.isValid(this.AMOUNT)) {
      this.toastrService.error('Enter a Amount')
      return
    }
    // if(!this.common.isValid(this.GST)){
    //   this.toastrService.error('Enter a Gst')
    //   return
    // }
    if (!this.common.isValid(this.PAY_BY_DATE)) {
      this.toastrService.error('Select a Pay By')
      return
    }
    if (this.IS_WHOM_TO_PAY_OTHERS == true) {
      if (!this.common.isValid(this.BANK_IFSC)) {
        this.toastrService.error('Enter a Bank IFSC Code')
        return
      }
    }
    if (this.IS_WHOM_TO_PAY_OTHERS == true) {
      if (!this.common.isValid(this.BANK_NAME)) {
        this.toastrService.error('Enter a Bank Name')
        return
      }
    }

    if (this.IS_WHOM_TO_PAY_OTHERS == true) {
      if (!this.common.isValid(this.PAN_NO)) {
        this.toastrService.error('Enter a Pan Number')
        return
      }
    }

    if (this.IS_WHOM_TO_PAY_OTHERS == true) {
      if (!this.common.isValid(this.ACCOUNT_NUMBER)) {
        this.toastrService.error('Enter a Bank Account Number')
        return
      }
    }
    if (this.IS_WHOM_TO_PAY_OTHERS == true) {
      if (!this.common.isValid(this.PAN_NO)) {
        this.toastrService.error('Enter a PAN Number')
        return
      }
    }

    if (this.InstName == false) {
      if (this.IS_WHOM_TO_PAY_USER == true) {
        if (!this.common.isValid(this.WHOM_TO_PAY_USER_ID)) {
          this.toastrService.error('Select a Whom to Pay user')
          return
        }
      }
      if (this.IS_WHOM_TO_PAY_OTHERS == true) {
        if (!this.common.isValid(this.WHOM_TO_PAY_USER_NAME)) {
          this.toastrService.error('Please Enter Whom to Pay')
          return
        }
      }
    }
    if (!this.common.isValid(this.DIVISION_CODE)) {
      this.toastrService.error('Select a Division')
      return
    }
    if (this.isAddvanceView == true) {
      if (!this.common.isValid(this.ADVANCE)) {
        this.toastrService.error('Enter a Advance Amount')
        return
      }
    }
    // if(this.AttendingDropdowns.length == 0){
    //   this.toastrService.error('Select a Attending Team')
    //   return
    // }
    for (let value of this.AttendingDropdowns) {
      if (!this.common.isValid(value.USER_ID)) {
        this.toastrService.error('Select a Attending Team')
        return
      }
    }
    if (!this.common.isValid(this.EXPECTED_DOCTORS)) {
      this.toastrService.error('Enter a Expected Doctors')
      return
    }
    // if(this.BrandDropdowns.length == 0){
    //   this.toastrService.error('Select a Brands')
    //   return
    // }
    //  for (let  value of this.PromotionalMaterialReq) {
    //   if(!this.common.isValid(value.QUANTITY)){
    //    this.toastrService.error('Enter a Promotional Material Req')
    //    return  
    //   }
    //  }
    for (let value of this.BrandDropdowns) {
      if (!this.common.isValid(value.PRODUCT_CODE)) {
        this.toastrService.error('Select a Brand')
        return
      }
    }
    // if(this.PromotionalMaterialReq.length == 0){
    //   this.toastrService.error('Enter a Promotional Material Req')
    //   return
    // }
    if (this.isDocumentMandatory == true) {
      if (this.UPLOAD_DOCUMENT_LIST.length == 0) {
        this.toastrService.error('Upload a Document')
        return
      }
    }


    if (val == 1 && this.CME_DATE == this.cme_date) {
      this.parseDateString(this.CME_DATE);
      this.CME_DATE = this.NewDate;
    }


    if (val == 1 && this.CME_DATE_FROM == this.cme_date_from) {
      this.parseDateString(this.CME_DATE_FROM);
      this.CME_DATE_FROM = this.NewDate;
    }

    if (val == 1 && this.CME_TO_DATE == this.cme_to_date) {
      this.parseDateString(this.CME_TO_DATE);
      this.CME_TO_DATE = this.NewDate;
    }

    if (val == 1 && this.PAY_BY_DATE == this.pay_by_date) {
      this.parseDateString(this.PAY_BY_DATE);
      this.PAY_BY_DATE = this.NewDate;
    }

    this.UPLOAD_DOCUMENT_LIST.forEach((element: any) => {
      this.removeMimeTypePrefix(element.FILE_BASE64);
      element.FILE_BASE64 = this.base64Data;
    })


    this.UPLOAD_DOCUMENT_LIST = this.UPLOAD_DOCUMENT_LIST.map((item, index) => ({ ...item, SR_NO: index + 1, }));
    let cme_date_from = this.datePipe.transform(this.CME_DATE_FROM, "yyyy-MM-dd");
    let cme_date_to = this.datePipe.transform(this.CME_TO_DATE, "yyyy-MM-dd");
    // let cme_date = this.datePipe.transform(this.CME_DATE, "yyyy-MM-dd");
    let data = {

      "USER_ID": this.userInfo.USER_ID,
      "CME_NO": this.common.isValid(this.CME_NO) ? this.CME_NO : 0,
      "CME_ID": this.common.isValid(this.CME_ID) ? this.CME_ID : 0,
      "IS_UPDATE": val,
      "SALES_ROLE_ID": this.userInfo.SALESROLE_ID,
      CME_REQUEST_LIST: [{
        "USER_ID": this.userInfo.USER_ID,
        "CME_DATE": this.CME_DATE,
        "REQ_BY": this.common.isValid(this.REQ_BY_USER_ID) ? this.REQ_BY_USER_ID : "",
        "HQ_CODE": this.common.isValid(this.HQ_CODE) ? this.HQ_CODE : 0,
        "CME_TYPE": this.common.isValid(this.CME_TYPE_ID) ? this.CME_TYPE_ID : 0,
        "CAMP_TYPE": this.common.isValid(this.CAMP_TYPE_ID) ? this.CAMP_TYPE_ID : 0,
        "IS_INSITUTION_NAME": this.INSTITUTION ? 1 : 0,
        "INST_NAME": this.common.isValid(this.INST_NAME) ? this.INST_NAME : "",
        "TOPIC": this.common.isValid(this.TOPIC) ? this.TOPIC : "",
        "TOPIC_ID": this.common.isValid(this.TOPIC_ID) ? this.TOPIC_ID : "",
        "SPEAKER_NAME": this.common.isValid(this.SPEAKER_NAME) ? this.SPEAKER_NAME : "",
        "SPEAKER_QUALIFICATION": this.common.isValid(this.SPEAKER_QUALIFICATION) ? this.SPEAKER_QUALIFICATION : "",
        "SPEAKER_SPECIALIZATION": this.common.isValid(this.SPEAKER_SPECIALIZATION_ID) ? this.SPEAKER_SPECIALIZATION_ID : 0,
        "VENUE": this.common.isValid(this.VENUE) ? this.VENUE : "",
        "DATE_FROM": cme_date_from,
        "DATE_TO": cme_date_to,
        "TIME_FROM": this.CME_TIME_FROM,
        "TIME_TO": this.CME_TO_TIME,
        "AMOUNT": this.common.isValid(this.AMOUNT) ? this.AMOUNT : 0,
        "GST": this.common.isValid(this.GST) ? this.GST : 0,
        "WHOM_TO_PAY": this.common.isValid(this.WHOM_TO_PAY_USER_ID) ? this.WHOM_TO_PAY_USER_ID : 0,
        "WHOM_TO_PAY_USER_NAME": this.common.isValid(this.WHOM_TO_PAY_USER_NAME) ? this.WHOM_TO_PAY_USER_NAME : "",
        "DIVISION_CODE": this.common.isValid(this.DIVISION_CODE) ? this.DIVISION_CODE : "",
        "PAY_BY_DATE": this.common.isValid(this.PAY_BY_DATE) ? this.PAY_BY_DATE : "",
        "IS_ADVANCE": this.isAddvanceView ? 1 : 0,
        "IS_WHOM_TO_PAY": this.isWhomToPayView,
        "ADVANCE": this.common.isValid(this.ADVANCE) ? this.ADVANCE : 0,
        "EXPECTED_DOCTORS": this.common.isValid(this.EXPECTED_DOCTORS) ? this.EXPECTED_DOCTORS : 0,
        "SLIDE_DECK_REQD": this.isSlideDeckReqd ? 1 : 0,
        "ART_WORK_REQD": this.isArtWorkReqd ? 1 : 0,
        "BANK_NAME": this.common.isValid(this.BANK_NAME) ? this.BANK_NAME : "",
        "ACCOUNT_NUMBER": this.common.isValid(this.ACCOUNT_NUMBER) ? this.ACCOUNT_NUMBER : "",
        "BANK_IFSC": this.common.isValid(this.BANK_IFSC) ? this.BANK_IFSC : "",
        "PAN_NO": this.common.isValid(this.PAN_NO) ? this.PAN_NO : "",
      }],

      ATTENDING_TEAM_DETAILS: this.AttendingDropdowns,
      BRANDS_DETAILS: this.BrandDropdowns,
      PROMOTION_MATERIAL_REQUEST_DETAILS: this.PromotionalMaterialReq,
      DOCUMENT_DETAILS: this.UPLOAD_DOCUMENT_LIST

    }

    // const formData = new FormData();
    // var k = 1;
    // for(let i = 0 ;i < this.UPLOAD_DOCUMENT_LIST.length;i++){
    //   for(let j = 0 ;j < this.UPLOAD_DOCUMENT_LIST[i].FILES.length;j++){
    //     formData.append(`files[${k}]`, this.UPLOAD_DOCUMENT_LIST[i].FILES[j], this.UPLOAD_DOCUMENT_LIST[i].DOCUMENT_DESC +"_"+k+"_"+this.UPLOAD_DOCUMENT_LIST[i].FILE_EXTENSION);

    //   }
    //   k++;
    // }scrollTo
    // formData.append('data',JSON.stringify(data))

    // console.log('data ->' ,JSON.stringify(data))
    //  return
    //   this.isLoaded = true;

    console.log('this.CME_REQUEST_LIST', data);

    //return 
    this.http.postnew(this.url.SAVECMEREQUEST, data).then(
      (res: any) => {
        // console.log('res ->' , res)
        if (res.FLAG == true) {
          if (val == 0) {
            this.CANCElCMEREQUEST();
          } else if (val == 1) {
            this.GETCMEREQUESTDATABYCMENO();
          }
          this.isLoaded = false;
          this.toastrService.success(res.MSG);
        } else if (res.FLAG == false) {
          this.toastrService.error(res.MSG);
        }
      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }


  CANCElCMEREQUEST() {
    this.HQ_CODE = '';
    this.CME_TYPE_ID = '';
    this.CAMP_TYPE_ID = '';
    this.INST_NAME = '';
    this.TOPIC = '';
    this.TOPIC_ID = '';
    this.SPEAKER_NAME = '';
    this.SPEAKER_QUALIFICATION = '';
    this.SPEAKER_SPECIALIZATION_ID = '';
    this.VENUE = '';
    this.AMOUNT = '';
    this.GST = '';
    this.ADVANCE = '';
    this.WHOM_TO_PAY_USER_ID = '';
    this.EXPECTED_DOCTORS = '';
    this.AttendingDropdowns = [{ ID: 1, USER_ID: null }];
    this.BrandDropdowns = [{ ID: 1, PRODUCT_CODE: null }];
    this.PromotionalMaterialReq = [{ ID: 1, REMARKS: '', QUANTITY: 0 }];
    this.UPLOAD_DOCUMENT_LIST = [];
    this.isCampTypeView = false;
    this.InstName = false;
    this.isArtWorkReqd = false;
    this.isAddvanceView = false;
    this.isSlideDeckReqd = false;
    this.INSTITUTION = false;
    this.DROPDOWNFLAG = false;
  }

  async GETCMEREQUESTDATABYCMENO() {
    let data = {
      "USER_ID": this.userInfo.USER_ID,
      "CME_ID": this.CME_ID,
    }
    this.isLoaded = true;
    await this.http.postnew(this.url.GETCMEREQUESTDATABYCMENO, data).then((res: any) => {
      //  console.log('step-2 ')
      this.datalist[0] = res
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
      this.TOPIC_ID = res.CME_REQ_DETAILS[0].TOPIC_ID;
      this.SPEAKER_NAME = res.CME_REQ_DETAILS[0].SPK_NAME;
      this.SPEAKER_QUALIFICATION = res.CME_REQ_DETAILS[0].SPK_QUALIFICATION;
      this.SPEAKER_SPECIALIZATION_ID = res.CME_REQ_DETAILS[0].SPK_SPECIALIZATION;
      this.VENUE = res.CME_REQ_DETAILS[0].VENUE;
      this.EXPECTED_DOCTORS = res.CME_REQ_DETAILS[0].EXPECTED_DOCTORS;
      this.CME_DATE_FROM = this.datePipe.transform(res.CME_REQ_DETAILS[0].DATE_FROM, 'dd-MM-yyyy');
      this.cme_date_from = this.datePipe.transform(res.CME_REQ_DETAILS[0].DATE_FROM, 'dd-MM-yyyy');
      this.CME_TO_DATE = this.datePipe.transform(res.CME_REQ_DETAILS[0].DATE_TO, 'dd-MM-yyyy');
      this.cme_to_date = this.datePipe.transform(res.CME_REQ_DETAILS[0].DATE_TO, 'dd-MM-yyyy');
      this.formatDateBasedOnCmeTimeFrom(res.CME_REQ_DETAILS[0].TIME_FROM);
      this.formatDateBasedOnCmeToTimeFrom(res.CME_REQ_DETAILS[0].TIME_TO);
      this.AMOUNT = res.CME_REQ_DETAILS[0].AMOUNT;
      this.GST = res.CME_REQ_DETAILS[0].GST;
      this.WHOM_TO_PAY_USER_ID = res.CME_REQ_DETAILS[0].WHOM_TO_PAY;
      this.isWhomToPayView = res.CME_REQ_DETAILS[0].IS_WHOM_TO_PAY;
      this.WHOM_TO_PAY_USER_NAME = res.CME_REQ_DETAILS[0].WHOM_TO_PAY_USER_NAME;
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
      this.BANK_NAME = res.CME_REQ_DETAILS[0].BANK_NAME;
      this.BANK_IFSC = res.CME_REQ_DETAILS[0].BANK_IFSC;
      this.PAN_NO = res.CME_REQ_DETAILS[0].PAN_NO;
      this.ACCOUNT_NUMBER = res.CME_REQ_DETAILS[0].ACCOUNT_NUMBER;
      let SAMPEL_CME_REQ_UPDATED_USER_DETAILS = res.CME_REQ_UPDATED_USER_DETAILS;
      this.REQ_UPDATED_USER_DETAILS = this.transformData1(SAMPEL_CME_REQ_UPDATED_USER_DETAILS)
      console.log('REQ_UPDATED_USER_DETAILS', this.REQ_UPDATED_USER_DETAILS);

      this.REQ_UPDATED_USER_DETAILS = this.REQ_UPDATED_USER_DETAILS.filter(
        element => element.userName !== "" && element.userName !== null && element.status !== ""
      );

      this.CME_REQ_PAYMENT_DETAILS = res.CME_REQ_PAYMENT_DETAILS
      this.POST_CMESTATUS = res?.CME_REQ_DETAILS[0]?.POST_CMESTATUS;
      this.CME_REQUEST_BY = res?.CME_REQ_DETAILS[0]?.REQ_BY;
      this.IS_CANCELLED = res?.CME_REQ_DETAILS[0]?.IS_CANCELLED
      //  if( this.POST_CMESTATUS=='1'){
      //   if(this.REQ_BY_USER_ID== this.CME_REQ_PAYMENT_DETAILS.REQ_BY){
      //         this.POST_CMESTATUS=='0'
      //   }
      //  }
      //this.REQ_BY_USER_ID = JSON.parse(this.authService.getUserDetail());

      console.log(this.CME_REQUEST_BY == this.REQ_BY_USER_ID, this.POST_CMESTATUS, "this.POST_CMESTATUS")
      if (this.TOPIC_ID == 0) {
        this.DROPDOWNFLAG = true;
      } else {
        this.DROPDOWNFLAG = false;
      }
      if (this.InstName == true) {
        this.INSTITUTION = true;
        this.NON_INSTITUTION = false;
      } else if (this.InstName == false) {
        this.NON_INSTITUTION = true;
        this.INSTITUTION = false;
      }
      if (this.isSlideDeckReqd == true) {
        this.IS_SLIDE_DECK_REQD_YES = true;
        this.IS_SLIDE_DECK_REQD_NO = false;
      } else if (this.isSlideDeckReqd == false) {
        this.IS_SLIDE_DECK_REQD_YES = false;
        this.IS_SLIDE_DECK_REQD_NO = true;
      }
      if (this.isArtWorkReqd == true) {
        this.IS_ART_WORK_REQD_YES = true;
        this.IS_ART_WORK_REQD_NO = false;
      } else if (this.isArtWorkReqd == false) {
        this.IS_ART_WORK_REQD_YES = false;
        this.IS_ART_WORK_REQD_NO = true;
      }
      if (this.isAddvanceView == true) {
        this.IS_ADVANCE_YES = true;
        this.IS_ADVANCE_NO = false;
      } else if (this.isAddvanceView == false) {
        this.IS_ADVANCE_YES = false;
        this.IS_ADVANCE_NO = true;
      }
      if (this.isWhomToPayView == 'U') {
        this.IS_WHOM_TO_PAY_USER = true;
        this.IS_WHOM_TO_PAY_OTHERS = false;
      } else if (this.isWhomToPayView == 'O') {
        this.IS_WHOM_TO_PAY_OTHERS = true;
        this.IS_WHOM_TO_PAY_USER = false;
      }
      if (this.CME_TYPE_ID == "5") {
        this.isCampTypeView = true;
      } else {
        this.isCampTypeView = false;
      }
      this.GETCMEDOCTORLIST(this.HQ_CODE);
      this.isLoaded = false;
    });


  }


  async APPROVECMEREQUEST(val: any) {
    //   console.log('APProval for individual');

    if (val == 1) {
      var STATUS = 1
    } else if (val == 2) {
      var STATUS = 2
      if (!this.common.isValid(this.REQUEST_REJECT_REMARKS)) {
        this.toastrService.error('Enter a Remarks');
        return
      }
    }

    var SALES_ROLE_ID = this.userInfo.SALESROLE_ID

    this.CmeApproveData = [];
    this.CmeApproveData = {
      "CME_ID": this.CME_ID,
      "USER_ID": this.userInfo.USER_ID,
      "STATUS": STATUS,
      "REMARKS": this.REQUEST_REJECT_REMARKS,
      "CME_NO": this.CME_NO
    }

    let data = {
      USER_ID: this.userInfo.USER_ID,
      SALES_ROLE_ID: SALES_ROLE_ID,
      APPROVAL_DETAILS: this.CmeApproveData,
      datalist: this.datalist
    }
    //  console.log("data-->",this.CmeApproveData);


    //  console.log('data after click ->' ,JSON.stringify( this.datalist))


    //return
    this.isLoaded = true;
    //return
    await this.http.postnew(this.url.APPROVECMEREQUEST, data).then(async (res: any) => {

      if (res.FLAG == true) {
        if (this.userInfo.SALESROLE_ID == 6) {
          // console.log('step-1')
          await this.GETCMEREQUESTDATABYCMENO()
          //  console.log('step-3 ')

          await this.GetCreateBase64(this.datalist);
          // console.log('step-5 ')
          this.toastrService.success(res.MSG);
          this.CmeApproveData = [];
          this.router.navigate(["/requestapprovalcme"]);
        } else {
          this.toastrService.success(res.MSG);
          this.CmeApproveData = [];
          this.router.navigate(["/requestapprovalcme"]);
          this.isLoaded = false;
        }
        //  this.GetCreateBase64(this.datalist);

      } else if (res.FLAG == false) {
        this.toastrService.error(res.MSG);
      }
    },
      (error) => {
        console.log(error);
        this.isLoaded = false;
        this.toastrService.error("Oops, Something went wrong.");
      });
  }

  OPENREJECTCMEREQUESTPOPUP() {
    this.RejectCMERequestPopUp = true;
  }


  CLOSEREJECTCMEREQUESTPOPUP() {
    this.REQUEST_REJECT_REMARKS = '';
    this.RejectCMERequestPopUp = false;
  }

  GETCMECREATEDLIST() {
    this.router.navigate(["/requestcmelist"]);
  }

  DownloadDocument(value: any, extension: any, filename: any) {
    let base64 = this.cleanBase64(value);
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    if (extension == '.png') {
      var fileBlob = new Blob([byteArray], { type: 'image/png' }); // Change type for different image formats
    } else if (extension == '.jpg') {
      var fileBlob = new Blob([byteArray], { type: 'image/jpg' }); // Change type for different image formats
    } else if (extension == '.jpeg') {
      var fileBlob = new Blob([byteArray], { type: 'image/jpeg' }); // Change type for different image formats
    } else if (extension == '.pdf') {
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

  parseDateString(dateString: string): string {
    const [day, month, year] = dateString.split('-').map(part => parseInt(part, 10));
    // Set the specific time: hours, minutes, seconds, milliseconds
    const date = new Date(year, month - 1, day, 8, 21, 0, 969);
    this.NewDate = date.toISOString();
    return this.NewDate
  }

  removeMimeTypePrefix(base64: any): void {
    this.base64Data = '';
    const mimeTypePrefixes = ['data:image/png;base64,', 'data:image/jpeg;base64,', 'data:image/jpg;base64,',
      'data:application/pdf;base64,', 'data:image/JPG;base64,', 'data:image/JPEG;base64,',
      'data:image/PNG;base64,', 'data:image/PDF;base64,'];  // Add more MIME types as needed

    // Loop through MIME type prefixes and remove the first one found in base64Data
    for (const prefix of mimeTypePrefixes) {
      if (base64 == null) {
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

  formatDateBasedOnCmeTimeFrom(time: any) {
    if (time != null) {
      if (time.length <= 8) {
        this.CME_TIME_FROM = time;
      } else if (time.length > 8) {
        this.CME_TIME_FROM = this.datePipe.transform(time, 'hh:mm a');
      }
    }
  }

  formatDateBasedOnCmeToTimeFrom(time: any) {
    if (time != null) {
      if (time.length <= 8) {
        this.CME_TO_TIME = time;
      } else if (time.length > 8) {
        this.CME_TO_TIME = this.datePipe.transform(time, 'hh:mm a');
      }
    }
  }

  BACKTOAPPROVALLIST() {
    this.router.navigate(["/requestapprovalcme"]);
  }

  BACKTOREQUESTLIST() {
    this.router.navigate(["/requestcmelist"]);
  }

  async GetCreateBase64(data: any) {
    //console.log('data ->', data)
    //  console.log('step-4 ')
    this.GETCMEMASTERLIST();

    for (let index = 0; index < data.length; index++) {
      //  console.log('inside loop', index);

      // this.CME_DATE = this.datePipe.transform(data[index].CME_REQ_DETAILS[0].CME_DATE, 'dd-MM-yyyy');
      // this.CME_ID = data[index].CME_REQ_DETAILS[0].CME_ID;
      //   this.CME_NO =data[index].CME_REQ_DETAILS[0].CME_NO;
      //   this.HQ_CODE =data[index].CME_REQ_DETAILS[0].HQ_CODE;

      this.HQ_DESC = data[index].CME_REQ_DETAILS[0]?.HQ_DESC;
      this.DIVISION_NAME = data[index].CME_REQ_DETAILS[0]?.DIVISION_NAME;
      //console.log(this.HQ_DESC,"HQ_DESC");
      //   this.HQ_DESC =data[index].CME_REQ_DETAILS[0].HQ_DESC;
      //   this.DIVISION_CODE =data[index].CME_REQ_DETAILS[0].DIVISION_CODE;
      //   this.DIVISION_NAME =data[index].CME_REQ_DETAILS[0].DIVISION_NAME;
      //   this.CME_TYPE_ID =data[index].CME_REQ_DETAILS[0].CME_TYPE;
      //   this.CAMP_TYPE_ID =data[index].CME_REQ_DETAILS[0].CAMP_TYPE;
      //   this.InstName =data[index].CME_REQ_DETAILS[0].IS_INSITUTION_NAME;
      //   this.REQ_BY_USER_NAME =data[index].CME_REQ_DETAILS[0].REQ_BY_USER_NAME;
      //   this.INST_NAME =data[index].CME_REQ_DETAILS[0].INST_NAME;
      //   this.TOPIC =data[index].CME_REQ_DETAILS[0].TOPIC;
      //   this.SPEAKER_NAME =data[index].CME_REQ_DETAILS[0].SPK_NAME;
      //   this.SPEAKER_QUALIFICATION =data[index].CME_REQ_DETAILS[0].SPK_QUALIFICATION;
      //   this.SPEAKER_SPECIALIZATION_ID =data[index].CME_REQ_DETAILS[0].SPK_SPECIALIZATION;
      //   this.VENUE =data[index].CME_REQ_DETAILS[0].VENUE;
      //   this.EXPECTED_DOCTORS =data[index].CME_REQ_DETAILS[0].EXPECTED_DOCTORS;
      //   this.CME_DATE_FROM = this.datePipe.transform(data[index].CME_REQ_DETAILS[0].DATE_FROM, 'dd-MM-yyyy');
      //   this.CME_TO_DATE = this.datePipe.transform(data[index].CME_REQ_DETAILS[0].DATE_TO, 'dd-MM-yyyy');
      //   this.formatDateBasedOnCmeTimeFrom(data[index].CME_REQ_DETAILS[0].TIME_FROM);
      //   this.formatDateBasedOnCmeToTimeFrom(data[index].CME_REQ_DETAILS[0].TIME_TO);
      //   this.AMOUNT =data[index].CME_REQ_DETAILS[0].AMOUNT;
      //   this.GST =data[index].CME_REQ_DETAILS[0].GST;
      //   this.WHOM_TO_PAY_USER_ID =data[index].CME_REQ_DETAILS[0].WHOM_TO_PAY;
      //   this.isWhomToPayView =data[index].CME_REQ_DETAILS[0].IS_WHOM_TO_PAY;
      //   this.PAY_BY_DATE = this.datePipe.transform(data[index].CME_REQ_DETAILS[0].PAY_BY_DATE, 'dd-MM-yyyy');
      //   this.isSlideDeckReqd =data[index].CME_REQ_DETAILS[0].SLIDE_DECK_REQD;
      //   this.isArtWorkReqd =data[index].CME_REQ_DETAILS[0].ART_WORK_REQD;
      //   this.isAddvanceView =data[index].CME_REQ_DETAILS[0].IS_ADVANCE;
      //   this.ADVANCE = data[index].CME_REQ_DETAILS[0].ADVANCE;
      //    this.AttendingDropdowns = data[0].CME_ATTENDING_DETAILS;
      //    this.BrandDropdowns = data[0].CME_BRANDS_DETAILS;
      //   this.PromotionalMaterialReq = data[0].CME_PROM_MATERIAL_REQ_DETAILS;
      this.UPLOAD_DOCUMENT_LIST = data[index].CME_DOCUMENT_DETAILS;
      let SAMPEL_CME_REQ_UPDATED_USER_DETAILS = data[0].CME_REQ_UPDATED_USER_DETAILS;
      this.REQ_UPDATED_USER_DETAILS = this.transformData(SAMPEL_CME_REQ_UPDATED_USER_DETAILS);

      this.CME_TYPE_LIST.forEach((element: any) => {
        if (this.CME_TYPE_ID == element.CME_TYPE_ID) {
          this.CME_DESC = element.CME_DESC;
        }
      })
      this.SPEAKER_SPECIALIZATION_LIST.forEach((element: any) => {
        if (this.SPEAKER_SPECIALIZATION_ID == element.SPL_ID) {
          this.SPEAKER_SPECIALIZATION_NAME = element.SPL_DESCRIPTION;
        }
      })
      if (this.isWhomToPayView == 'U' || this.isWhomToPayView == '') {
        this.WHOM_TO_PAY_LIST.forEach((element: any) => {
          if (this.WHOM_TO_PAY_USER_ID == element.USER_ID) {
            this.WHOM_TO_PAY_USER_NAME = element.USER_NAME
          }
        })
      } else if (this.isWhomToPayView == 'O') {
        this.WHOM_TO_PAY_USER_NAME = data[0].CME_REQ_DETAILS[0].WHOM_TO_PAY_USER_NAME;
      }
      if (this.isAddvanceView == true) {
        this.IS_ADVANCE_DESC = 'Yes'
      } else if (this.isAddvanceView == false) {
        this.IS_ADVANCE_DESC = 'No'
      }
      if (this.isSlideDeckReqd == true) {
        this.SLIDE_DEC_REQD_DESC = 'Yes'
      } else if (this.isSlideDeckReqd == false) {
        this.SLIDE_DEC_REQD_DESC = 'No'
      }
      if (this.isArtWorkReqd == true) {
        this.ART_WORK_REQD_DESC = 'Yes'
      } else if (this.isArtWorkReqd == false) {
        this.ART_WORK_REQD_DESC = 'No'
      }
      this.AttendingDropdowns.forEach((element: any) => {
        this.ATTENDING_TEAM = [];
        this.ATTENDING_TEAM_LIST.forEach((user: any) => {
          if (element.USER_ID == user.USER_ID) {
            this.ATTENDING_TEAM.push(user);
          }
        })
      })
      //console.log('this.BrandDropdowns',this.BrandDropdowns);
      //  console.log('BRAND_LIST',this.BRAND_LIST);

      this.BrandDropdowns.forEach((element: any) => {
        this.BRANDS = [];
        this.BRAND_LIST.forEach((product: any) => {
          if (element.PRODUCT_CODE == product.PRODUCT_CODE) {
            this.BRANDS.push(product);
          }
        })
      })
      //  if(this.PromotionalMaterialReq.length>=0){
      this.PromotionalMaterialReq?.forEach((element: any) => {
        this.PROM_MAT_REQ_ITEM = [];
        this.PROM_MAT_REQ_ITEM_LIST.forEach((item: any) => {
          if (element.ITEM_ID == item.ITEM_ID) {
            const mergedObject = Object.assign({}, item, element);
            this.PROM_MAT_REQ_ITEM.push(mergedObject,);
          }
        })
      })
      //}

      // this.HQ_CODE_LIST.forEach((element: any) => {
      //   if (this.HQ_CODE == element.HQ_CODE) {
      //     this.HQ_DESC = element.HQ_DESC;
      //   }
      // });

      //  this.cd.markForCheck();
      //   this.convertToPdf(this.CME_NO)
      //  setTimeout(() => {
      //   //this.convertToPdf()
      //   this.convertToPdf(this.CME_NO)
      // }, 2000);
      await new Promise(resolve => setTimeout(resolve, 2000));  // Wait for 2 seconds before calling the function
      //  console.log('Converting to PDF for CME_NO:', this.CME_NO);
      await this.convertToPdf(this.CME_NO);  // Ensure this is awaited if it's async
    }
  }
  transformData(data: any): any[] {


    if (data != undefined) {
      // console.log('data transformData',data);
      return [
        // {
        //   role: 'RSM',
        //   userName: data[0].RSM_USER_NAME,
        //   updatedBy: data[0].RSM_UPDATED_BY,
        //   updatedOn: data[0].RSM_UPDATED_ON
        // },
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
    } else {
      return [];
    }

  }

  convertToPdf(id: any) {
    ///let id=1
    //console.log('inside convertToPdf ->', id)
    //  console.log('this.REQUEST_APPROVAL_CME_LIST  ->' ,      this.REQUEST_APPROVAL_CME_LIST)
    //const htmlContent = `<html><body><h1>welcome here </h1></body></html>`;
    // for (let index = 0; index < this.CmeApproveData.length; index++) {
    //   //   const element = this.CmeApproveData[index];
    //   //   CME_NO
    // }
    //  let htmlContent = `<html><body>${this.DownloadPDF.nativeElement.innerHTML}</body></html>`;
    //for (let index = 0; index < id.length; index++) {
    var html = this.DownloadPDF.nativeElement.innerHTML
    html = '<html>' + html + '</html>';
    //  console.log('html ->', JSON.stringify(html))
    //html = html.replace("{{CME_NO}}", this.CME_NO);
    //  html = html.replace("{{CME_DATE}}", this.CME_DATE);
    // html = html.replace("{{Message}}", message);

    // Preparing data to be sent to the server for conversion
    let post_data = {
      id: id,
      data: html
    };
    // const body = {
    //   base64: this.base64PdfString
    // };
    //   console.log('post_data ->', post_data)
    // return
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.httpclient.post(this.url.ConvertBase64ToPdf, post_data, { headers })
      .subscribe(response => {
        this.isLoaded = false;
        console.log('Response:', response);
      });

    //}
    //   this.http.postnew(this.url.ConvertBase64ToPdf, body).then(
    //     (res: any) => {
    //         // Extract Base64 string from server response

    //         // Decode the Base64 string and convert it to binary data
    //         // const byteCharacters = atob(this.base64PdfString);
    //         // const byteNumbers = new Array(byteCharacters.length);
    //         // for (let i = 0; i < byteCharacters.length; i++) {
    //         //     byteNumbers[i] = byteCharacters.charCodeAt(i);
    //         // }
    //         // const byteArray = new Uint8Array(byteNumbers);
    //         // const blob = new Blob([byteArray], { type: 'application/pdf' });

    //         // // Create a download link for the PDF file
    //         // const link = document.createElement('a');
    //         // const url = window.URL.createObjectURL(blob);
    //         // link.href = url;
    //         // link.download = `${this.CME_NO}.pdf`;

    //         // // Append link to body, click to download, then remove link
    //         // document.body.appendChild(link);
    //         // link.click();
    //         // document.body.removeChild(link);

    //         // // Revoke object URL to free up resources
    //         // window.URL.revokeObjectURL(url);

    //         // // Show success message
    //          this.toastrService.success(res.Message);
    //     },
    //     (error) => {
    //         console.error('Error during HTML to PDF conversion:', error);
    //         this.toastrService.error('Oops, something went wrong.');
    //     }
    // );

  }
  changeTOPIC(TOPIC_ID: any) {
    if (TOPIC_ID == 0) {
      this.DROPDOWNFLAG = true
      // this.TOPIC=''
    } else if (TOPIC_ID !== 0) {
      this.DROPDOWNFLAG = false
      this.TOPIC = ''
    }
    //   console.log('value',TOPIC_ID,this.DROPDOWNFLAG);

  }
  transformData1(data: any): any[] {
    return [
      {
        role: 'RSM',
        userName: data[0].RSM_USER_NAME,
        updatedBy: data[0].RSM_UPDATED_BY,
        updatedOn: data[0].RSM_UPDATED_ON,
        status: data[0].RSM_STATUS == 1 ? 'Approved' : 'Rejected'
      },
      {
        role: 'SM',
        userName: data[0].SM_USER_NAME,
        updatedBy: data[0].SM_UPDATED_BY,
        updatedOn: data[0].SM_UPDATED_ON,
        status: data[0].SM_STATUS == 1 ? 'Approved' : 'Rejected'
      },
      {
        role: 'PMT',
        userName: data[0].PMT_USER_NAME,
        updatedBy: data[0].PMT_UPDATED_BY,
        updatedOn: data[0].PMT_UPDATED_ON,
        status: data[0].PMT_STATUS == 1 ? 'Approved' : 'Rejected'
      },
      {
        role: 'VP',
        userName: data[0].VP_USER_NAME,
        updatedBy: data[0].VP_UPDATED_BY,
        updatedOn: data[0].VP_UPDATED_ON,
        status: data[0].VP_STATUS == 1 ? 'Approved' : 'Rejected'
      },
      {
        role: 'RSM',
        userName: data[0]?.CANCELLED_BY,
        updatedBy: data[0]?.CANCELLED_BY,
        updatedOn: data[0]?.CANCELLED_ON,
        status: data[0]?.CANCEL_STATUS == 1 ? 'Cancelled' : ''
      }
    ];
  }

  postpone() {
    this.vissiblepostpone = true;
    this.dataForBackup = {
      "VENUE": this.VENUE,
      "FROM_DATE": this.CME_DATE_FROM,
      "TO_DATE": this.CME_TO_DATE,
      "TIME_FROM": this.CME_TIME_FROM,
      "TIME_TO": this.CME_TO_TIME
    }
    console.log('this.dataForBackup', this.dataForBackup);

    //this.updatePostPoneCmeRequest()
  }

  cancelForPostpone() {
    this.VENUE = this.dataForBackup.VENUE
    this.CME_DATE_FROM = this.dataForBackup.FROM_DATE
    this.CME_TO_DATE = this.dataForBackup.TO_DATE
    this.CME_TIME_FROM = this.dataForBackup.TIME_FROM
    this.CME_TO_TIME = this.dataForBackup.TIME_TO
    this.vissiblepostpone = false;
  }
  updatePostPoneCmeRequest(num: any) {
    let datefrom = this.convertDate(this.CME_DATE_FROM);
    let dateto = this.convertDate(this.CME_TO_DATE);

    let data = {
      "CME_ID": this.CME_ID,
      "USER_ID": this.userInfo.USER_ID,
      "MODE": num == 1 ? 'POSTPONED' : 'CANCEL',
      "VENUE": this.VENUE,
      "FROM_DATE": datefrom,
      "TO_DATE": dateto,
      "TIME_FROM": this.CME_TIME_FROM,
      "TIME_TO": this.CME_TO_TIME
    }
    this.http.postnew(this.url.UPDATEPOSTPONECMEREQUEST, data).then(
      (res: any) => {
        // console.log('res ->' , res)
        if (res.FLAG == true) {
          this.toastrService.success(res.MSG);
          this.vissibleCancel = false;
          this.router.navigate(["/requestcmelist"]);
        } else if (res.FLAG == false) {
          this.toastrService.error(res.MSG);
          this.vissibleCancel = false;
        }
      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
        this.vissibleCancel = false;
      }
    );

  }
  convertDate(inputDate: string): string | null {
    let date: Date;

    // Check if the input date is in dd-MM-yyyy format
    const ddMMyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (ddMMyyyyRegex.test(inputDate)) {
      const [day, month, year] = inputDate.split('-').map(Number);
      date = new Date(year, month - 1, day); // Create a date object
    } else {
      // Assume input is a valid JavaScript date string
      date = new Date(inputDate);
    }

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return null; // Invalid date
    }

    // Format to 'yyyy-MM-dd'
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  cancel() {
    this.vissibleCancel = true;
  }
  cancelForCancel() {
    this.vissibleCancel = false;
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
  //added by hemant 9 jun 2025
  getpaymentList() {
    this.router.navigate(["/paymentapprovedlist"]);
  }

  keyPressIFSC(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    var charStr = String.fromCharCode(charCode);

    // Allow only uppercase letters (A-Z) and digits (0-9)
    var regex = /^[A-Z0-9]$/;
    console.log('charStr', charStr);

    if (!regex.test(charStr)) {
      //event.preventDefault();
      return false;
    }
    return true;
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






}
