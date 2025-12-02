import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/Service/auth.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { SharedService } from 'src/app/Service/shared.service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-adobe-requisition',
  templateUrl: './adobe-requisition.component.html',
  styleUrls: ['./adobe-requisition.component.css']
})
export class AdobeRequisitionComponent implements OnInit {
  UserDetail: any = {};
  USER_ID: any;
  USER_NAME: any;
  isLoaded: boolean = false;
  ADOBE_REQUISITION_LIST: any = [];
  PERIOD_LIST: any = [];
  REQ_VALUE: any;
  MAX_SAMPEL_VALUE: any;
  TOTAL_TARGET: any;
  CYCLE_ID: any;
  totalRecords: any;
  first: any;
  rowsPerPage: any;
  DROPDOWN_PRODUCT_LIST: any = [];
  PRODUCT_LIST: any = [];
  SAMPLE_PRODUCT_LIST: any = [];
  MASTER_LIST: any = [];

  //added by hemant 
    REQ_BY:any;
  HQ_CODE:any;
  POOL_CODE:any;
  STOCKLIST:any;
  DOCTOR_CODE:any;
  SPL_ID:any;
  CHEMIST_CODE:any;
  PRODUCT_CODE:any;
  SALE_QTY:any;
  FREE_QTY:any;
  REMARK:any;
  LAST_VISIT=new Date();
  visible:boolean=false;
  isShowEditPopup:boolean = false;
  REQUEST_DATE:any=new Date();
  //isLoaded:boolean = false;
  userInfo:any;
  HQ_LIST:any=[];
  DOCTOR_MASTER_LIST:any=[];
  PRODUCT_MASTER_LIST:any=[];
  SPECIAL_LIST:any=[];
  CHEMIST_LIST:any=[];
  STOCKIST_LIST:any=[];
  visible_Doctor:boolean=false;
  SPL_CODE:any;
  DoctorName:any;
  DoctorHQ:any
  ChemistName:any;
  ChemistHQ:any;
  CHEMIST_ID:any;
  isHighLightDoctorName:string="No";
  isHighLightSpecializationName:string="No";
  isHighLightDoctorHq:string="No";
  isHighLightChemistName:string="No";
  isHighLightHqChemist:string="No";
  isHighLightHQ:string="No";
  isHighLightStockist:string="No";
  isHighLightDoctor:string="No";
  isHighLightSpecialization:string="No";
  isHighLightChemist:string="No";
  isHighLightProduct:string="No";
  isHighLightSaleqty:string="No";
  isHighLightFreeqty:string="No";
  isHighLightLastVist:string="No";
  isHighLightRemark:string="No";
  SALES_ROLE_ID:any;
  STOCKIST_CODE:any;
  HISTORY_LIST:any=[];
  REQUESTNO:any
  HQ_CODE_LIST: any;
  VALUE:any
  REQ_NO:any;
  toggleToList: boolean=false;
  ADHOC_REQUEST_LIST: any;
  STATUSFLAG: boolean=false;
  UploadDocumentPopUp: boolean;
  UPLOAD:any;
  UPLOAD_DOCUMENT_LIST: any=[];
  DOC_TYPE_CODE: string;
  FILE_NAME: string;
  FileData: string;
  DOCUMENT_DESC: string;
  FILE_EXTENSION: string;
  selectedFilesData: any[];
  DOCUMENT_TYPE_LIST: any=[];
  UploadDocumentListPopUp: boolean=false;
  constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService, private SharedService: SharedService,private common: CommonService) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(this.authService.getUserDetail());
    // this.USER_ID = JSON.parse(this.userInfo).USER_ID;
    // this.USER_NAME = JSON.parse(this.userInfo).USER_NAME;
    this.GETHQLIST();
    this.GETSAMPLEREQUISITIONMASTERLIST();
  }

  GETSAMPLEREQUISITIONMASTERLIST() {
    let data = {
      "USER_ID": this.USER_ID,
      "FYEAR": "2025"
    }
    this.http.postnew(this.url.GETSAMPLEREQUISITIONMASTERLIST, data).then(
      (res: any) => {
        this.PERIOD_LIST = res.PERIOD_LIST;
        this.CYCLE_ID = res.DATA_LIST[0].CYCLE_ID;
        this.GETPRODUCTLISTBYCYCLEID(this.CYCLE_ID)
      });
  }

  GETPRODUCTLISTBYCYCLEID(CYCLE_ID: any) {
    let data1 = {
      "USER_ID": this.USER_ID,
      
    }
    this.http.postnew(this.url.GETPRODUCTLISTBYCYCLEID, data1).then((res: any) => {
      this.PRODUCT_LIST = res.PRODUCT_LIST;
      this.MASTER_LIST = res.MASTER_LIST;
      this.DROPDOWN_PRODUCT_LIST = [];
      this.SAMPLE_PRODUCT_LIST = this.PRODUCT_LIST.map((item: any) => ({
        SAMPLE_PRODUCT_CODE: item.SAMPLE_PRODUCT_CODE,
        PRODUCT_DESC: item.PRODUCT_DESC,
      }));
      const productlist = [...new Set(this.SAMPLE_PRODUCT_LIST.map((item: any) => item.PRODUCT_DESC))];
      productlist.forEach((element: any) => {
        this.DROPDOWN_PRODUCT_LIST.push({ label: element, value: element })
      })
      this.fetchData();
    });
  }

  GETCALCULATEPACKQTYBYPOOLCODE(data: any,index) {

    console.log('data',data,index);
    
    let POOL_CODE = data.POOL_CODE;
    let SAMPLE_PRODUCT_CODE = data.SAMPLE_PRODUCT_CODE;
    this.PRODUCT_LIST.forEach((element: any,i:number) => {
      if (POOL_CODE == element.POOL_CODE && SAMPLE_PRODUCT_CODE == element.SAMPLE_PRODUCT_CODE && index===i ) {
        let packQty = Number(element.REQ_HQ_QTY) || 0;
        let innerpack = Number(element.INNER_PACK) || 0;
        let poolcount = Number(element.POOL_HQCOUNT) || 0;
        // let sampleCost = Number(element.SAMPLE_COST) || 0;
        element.REQUESTED_PACK_QTY = packQty * innerpack;
        element.TOTAL_REQUESTED_QTY = element.REQUESTED_HQ_QTY * poolcount;
        // let REQ_VALUE = element.TOTAL_REQUESTED_QTY * sampleCost;
        // element.REQ_VALUE = Number(REQ_VALUE.toFixed(1));
      }
    });

     let data1 = {
      USER_ID: data.USER_ID,
      TRXN_ID: data.TRXN_ID,
      POOL_CODE: data.POOL_CODE,
      SAMPLE_PRODUCT_CODE: data.SAMPLE_PRODUCT_CODE,
      SM_REQUESTED_PACK_QTY: data.REQUESTED_PACK_QTY,
      HQ_QTY: data.REQUESTED_HQ_QTY,
      TOTAL_REQ: data.TOTAL_REQUESTED_QTY,
      REQ_VALUE: data.REQ_VALUE
    }
    // console.log(' data1 ->' , data1)
    // return
    this.http.postnew(this.url.GETSMCALCULATEPACKQTYBYPOOLCODE, data1).then((res: any) => {
      // this.DATA_LIST = res.DATA_LIST;
      // this.REQ_VALUE = Number(this.DATA_LIST[0].TOTAL_VALUE.toFixed(2));
    });

  }

  fetchData() {
    this.totalRecords = this.PRODUCT_LIST.length;
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rowsPerPage = event.rows;
    this.fetchData();
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
GETADHOCSAMPLEREQUISITIONLIST() {
    let data = {
      "USER_ID": this.userInfo.USER_ID,
      "HQ_CODE": this.HQ_CODE
    }
    this.http.postnew(this.url.GETADHOCSAMPLEREQUISITIONLIST, data).then(
      (res: any) => {
        this.SAMPLE_PRODUCT_LIST=[];
        this.PRODUCT_LIST = res.ADHOC_REQUISITION_LIST;
        this.REQ_NO=this.PRODUCT_LIST[0]?.REQUEST_NO
        this.REMARK=this.PRODUCT_LIST[0]?.REMARKS 
        this.UPLOAD_DOCUMENT_LIST = res.DOCUMENT_DETAILS;
       // this.STATUSFLAG=this.PRODUCT_LIST[0]?.PMT_APPROVAL 
     //   this.SAMPLE_PRODUCT_LIST=res.PRODUCT_LIST
        console.log('RES', this.SAMPLE_PRODUCT_LIST);
    
        const productlist = [...new Set(res.PRODUCT_LIST.map((item: any) => item.DESCRIPTION))];
            productlist.forEach((element: any) => {
              this.SAMPLE_PRODUCT_LIST.push({ label: element, value: element }) 
            })
       // console.log();
        

      //  this.DROPDOWN_PRODUCT_LIST = res.PRODUCT_LIST.map((item: any) => ({
      //         POOL_CODE: item.SAMPLE_PRODUCT_CODE,
      //         POOL_DESC: item.DESCRIPTION
      //       }));
      // });
      //     const productlist = [...new Set(this.SAMPLE_PRODUCT_LIST.map((item: any) => item.DESCRIPTION))];
      //       productlist.forEach((element: any) => {
      //         this.DROPDOWN_PRODUCT_LIST.push({ label: element, value: element })
      //       })
  })}

// GETADHOCSAMPLEREQUISITIONLIST() {
//     let data = {
//       "USER_ID": this.USER_ID,
//       "HQ_CODE": this.HQ_CODE
//     }
//     this.http.postnew(this.url.GETADHOCSAMPLEREQUISITIONLIST, data).then(
//       (res: any) => {
//         this.PRODUCT_LIST = res.ADHOC_REQUISITION_LIST;
//         this.REQ_NO=this.PRODUCT_LIST[0]?.REQUEST_NO
//         this.REMARK=this.PRODUCT_LIST[0]?.REMARKS
//        this.PRODUCT_LIST = res.PRODUCT_LIST
//       });

      
//           // const productlist = [...new Set(this.SAMPLE_PRODUCT_LIST.map((item: any) => item.DESCRIPTION))];
//           //   productlist.forEach((element: any) => {
//           //     this.DROPDOWN_PRODUCT_LIST.push({ label: element, value: element })
//           //   })
//   }



  saveAdhocRequisition(){
    console.log(this.HQ_CODE,'data');
     console.log(this.PRODUCT_LIST,'this.PRODUCT_LIST');
    if(this.HQ_CODE==='' ||this.HQ_CODE == undefined ){
       this.toastrService.error("Please select HQ code");
      return
    }
    let data={
        "USER_ID":this.userInfo.USER_ID,
        "REQ_NO":(this.SharedService.isValid(this.REQ_NO)?this.REQ_NO:0),
        "REQUEST_DATE":(this.SharedService.isValid(this.REQUEST_DATE)?this.REQUEST_DATE:null),
        "HQ_CODE": this.HQ_CODE,
        "REMARKS":(this.SharedService.isValid(this.REMARK)?this.REMARK:''),
        "PRODUCT_LIST":this.PRODUCT_LIST.filter((e:any)=> e.REQUESTED_PACK_QTY!=null && e.REQUESTED_PACK_QTY!=0),
        "UPLOAD_DOCUMENT_LIST":this.UPLOAD_DOCUMENT_LIST
    }
    console.log('data',data);

    //return 
      this.http.postnew(this.url.SAVEADHOCSAMPLEREQUISITION, data).then(
      (res: any) => {
        if (res.data[0].FLAG == 1) {
        this.toastrService.success(res.data[0].MSG);
        this.GETADHOREQUESTLIST();
        this.toggleToList=true;
      } else if (res.data[0].FLAG == 0) {
        this.toastrService.error(res.data[0].MSG);
      }
      });
    
  }
  goToList(){
    console.log('insdide list');
    
    this.toggleToList= true
    this.GETADHOREQUESTLIST()
  }
  goToCreate(){
  this.toggleToList= false
  this.HQ_CODE=null
  this.STATUSFLAG=false;
   this.GETADHOCSAMPLEREQUISITIONLIST() 
  }
  
  GETADHOREQUESTLIST() {
    let data = {
      "USER_ID": this.userInfo.USER_ID,
      "HQ_CODE": this.HQ_CODE
    }
    this.http.postnew(this.url.GETADHOREQUESTLIST, data).then(
      (res: any) => {
        this.ADHOC_REQUEST_LIST = res.ADHOC_REQUEST_LIST;
      //  this.REQ_NO=this.PRODUCT_LIST[0]?.REQUEST_NO  
      //  this.REMARK=this.PRODUCT_LIST[0]?.REMARKS
     })
  }
  

GETREQUESTDETAILS(D){
  console.log('d',D);
  
  this.HQ_CODE=D.HQ_CODE
   if(D.STATUS==='Approved') {
    console.log('inside if',  this.STATUSFLAG);
    
    this.STATUSFLAG=true;
  }
  else if(D.STATUS_DESC==='R' ){
     this.STATUSFLAG=true;
  }
  else if(D.STATUS==='Pending for PMT Approval'){
      this.STATUSFLAG=false;
      console.log('inside else',  this.STATUSFLAG);
      
  }
  else if(D.STATUS==='Pending for SM Approval'){
      this.STATUSFLAG=false;
      console.log('inside else',  this.STATUSFLAG);
      
  }
  else{
       this.STATUSFLAG=false;
  }

  this.REQUEST_DATE=new Date(D.REQUEST_DATE)
//  const inputDate=D.REQUEST_DATE;
  
//   // Parse the date
//   const date = new Date(inputDate);
  
//   // Format parts
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
//   const year = String(date.getFullYear()).slice(-2); // Get last two digits
  
//   // Format as dd.mm.yy
//   const formattedDate = `${day}.${month}.${year}`;
//   console.log('formattedDate',formattedDate);
  
//   this.REQUEST_DATE=formattedDate
//   console.log('this.REQUEST_DATE',this.REQUEST_DATE);
  
  this.toggleToList= false;
 this.GETADHOCSAMPLEREQUISITIONLIST() 

}
  OpenUploadDocumentPopUp() {
    // console.log('test')
    this.UploadDocumentPopUp = true;
  }
  SaveAttachDocument() {
    // if (!this.common.isValid(this.DOC_TYPE_CODE)) {
    //   this.toastrService.error('Select a document type')
    //   return
    // }
    if (!this.common.isValid(this.UPLOAD)) {
      this.toastrService.error('Upload a document');
      return;
    }

    // this.DOCUMENT_TYPE_LIST.forEach((element: any) => {
    //   // console.log('element ->' , element)
    //   if (element.DOCUMENT_TYPE_ID == this.DOC_TYPE_CODE) {
    //     this.DOCUMENT_DESC = element.DOCUMENT_DESC
    //   }
    // });

    this.UPLOAD_DOCUMENT_LIST.push(
      {
         
        "FILE_BASE64": this.FileData, "FILE_NAME": this.FILE_NAME, "FILE_EXTENSION": this.FILE_EXTENSION, "DOCUMENT_DESC": this.DOCUMENT_DESC,SR_NO:this.UPLOAD_DOCUMENT_LIST.length + 1
        // "FILES":this.selectedFilesData
      }
    );
console.log('UPLOAD_DOCUMENT_LIST',this.UPLOAD_DOCUMENT_LIST);

    this.toastrService.success('Attach document sucessfully')
    // this.CME_DOC_TYPE_CODE = '';
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
    // this.DOC_TYPE_CODE = '';
    this.UPLOAD = '';
    this.FILE_NAME = '';
    this.FileData = '';
    this.DOCUMENT_DESC = '';
    this.FILE_EXTENSION = '';
  }
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
          this.DOCUMENT_DESC = fileExtension;  
          // console.log(' this.FileData', this.FileData,'this.FILE_NAME',this.FILE_NAME,'this.FILE_EXTENSION',this.FILE_EXTENSION);
          
        };
      } else {
        console.log('Unsupported file type');
      }
    }
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

}
