import { DatePipe } from '@angular/common';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/Service/auth.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-request-approval-cme',
  templateUrl: './request-approval-cme.component.html',
  styleUrls: ['./request-approval-cme.component.css']
})
export class RequestApprovalCmeComponent implements OnInit {
  @ViewChild('dt1') dt1: Table | undefined;
  //  @ViewChild('DownloadPDF') DownloadPDF: ElementRef;
  @ViewChild('DownloadPDF', { static: false }) DownloadPDF!: ElementRef;

  isContentLoaded = false; // Set this to true when content is ready
  CME_NO_LIST: any=[];
  SM_NAME_LIST: any=[];
  datalist: any=[];

  ngAfterViewInit(): void {

    if (!this.DownloadPDF) {
      //  console.error("Element with ID 'DownloadPDF' not found.");
      return;
    }

    //  console.log("Element with ID 'DownloadPDF' found:", this.DownloadPDF);
  }
  REQUEST_APPROVAL_CME_LIST: any = [];
  isLoaded: boolean;
  selectedApprovalData: any = [];
  userInfo: any = {};
  CME_ID: any;
  CmeApproveData: any = [];
  ClaimApproveData: any = [];
  selectAll: boolean = false;
  IS_VIEW: any = 0;
  IS_APPROVAL: any = 1;
  HQ_CODE_LIST: any = [];
  CME_TYPE_LIST: any = [];
  CAMP_TYPE_LIST: any = [];
  DOCUMENT_TYPE_LIST: any = [];
  ATTENDING_TEAM_LIST: any = [];
  BRAND_LIST: any = [];
  WHOM_TO_PAY_LIST: any = [];
  PROM_MAT_REQ_ITEM_LIST: any = [];
  SPEAKER_SPECIALIZATION_LIST: any = [];
  CME_DATE: any;
  CME_NO: any = '';
  HQ_CODE: any;
  CME_TYPE_ID: any;
  CAMP_TYPE_ID: any;
  InstName: boolean = false;
  INST_NAME: any;
  REQ_BY_USER_NAME: any;
  TOPIC: any;
  SPEAKER_NAME: any;
  SPEAKER_QUALIFICATION: any;
  SPEAKER_SPECIALIZATION_ID: any;
  VENUE: any;
  EXPECTED_DOCTORS: any;
  CME_DATE_FROM: any;
  CME_TO_DATE: any;
  CME_TIME_FROM: any;
  CME_TO_TIME: any;
  AMOUNT: any;
  GST: any;
  WHOM_TO_PAY_USER_ID: any;
  PAY_BY_DATE: any;
  isSlideDeckReqd: boolean = false;
  isArtWorkReqd: boolean = false;
  isAddvanceView: boolean = false;
  ADVANCE: any;
  AttendingDropdowns: any = [];
  BrandDropdowns: any = [];
  PromotionalMaterialReq: any = [];
  UPLOAD_DOCUMENT_LIST: any = [];
  HQ_DESC: any;
  CME_DESC: any;
  SPEAKER_SPECIALIZATION_NAME: any;
  WHOM_TO_PAY_USER_NAME: any;
  SLIDE_DEC_REQD_DESC: any;
  ART_WORK_REQD_DESC: any;
  ATTENDING_TEAM: any = [];
  BRANDS: any = [];
  PROM_MAT_REQ_ITEM: any = [];
  IS_ADVANCE_DESC: any;
  PROMOTION_MATERIAL_REQUEST: any = [{ ID: 1, REMARKS: '', QUANTITY: 0 }];
  ATTENDING_TEAM_DROPDOWN = [{ ID: 1, USER_ID: null }];
  BRANDS_DROPDOWN = [{ ID: 1, PRODUCT_CODE: null }];
  REQ_UPDATED_USER_DETAILS: any = [];
  base64PdfString: any = '';
  DIV_LIST: any = [];
  DIVISION_CODE: any;
  DIVISION_NAME: any;
  IsHide: boolean = false;
  isWhomToPayView: string;
  // DownloadPDF:any  = '';
  approvedPdf_LIST: any = []
  constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService, private common: CommonService, private router: Router, public datePipe: DatePipe, public httpclient: HttpClient,
    private cd: ChangeDetectorRef) { }


  async ngOnInit(): Promise<void> {
    localStorage.removeItem('CME_ID');
    localStorage.removeItem('IS_VIEW');
    localStorage.removeItem('IS_APPROVAL');
    this.userInfo = JSON.parse(this.authService.getUserDetail());
   await this.GETCMEREQUESTLISTUSERID();
    this.GETCMEMASTERLIST();
  }

  loadContent() {
    this.isContentLoaded = true;
  }
  loadDataLazily(e: any) {
  }


   async GETCMEREQUESTLISTUSERID() {
    let data = {
      "USER_ID": this.userInfo.USER_ID,
      "SALES_ROLE_ID": this.userInfo.SALESROLE_ID
    }
    this.isLoaded = true;
    await this.http.postnew(this.url.GETCMEREQUESTLISTUSERID, data).then(
      (res: any) => {
         console.log('res ->' , res)
        this.REQUEST_APPROVAL_CME_LIST = [];
        this.REQUEST_APPROVAL_CME_LIST = res.GET_CME_APPROVAL_REQUEST;
        this.isLoaded = false;
        if(this.REQUEST_APPROVAL_CME_LIST.length > 0){
          const CME_NO = [...new Set(this.REQUEST_APPROVAL_CME_LIST.map(item => item.CME_NO))];
          CME_NO.forEach((element:any,index:any)=> {
            console.log('element',element);
            
            this.CME_NO_LIST.push({label:element,value:element})
          })

          const SM_NAME = [...new Set(this.REQUEST_APPROVAL_CME_LIST.map(item => item.SM_NAME))];
          SM_NAME.forEach((element:any,index:any)=> {
           // console.log('element',element);
            
            this.SM_NAME_LIST.push({label:element,value:element})
          })
        }
        console.log('this.CME_NO_LIST',this.CME_NO_LIST);
        console.log('this.SM_LIST_LIST',this.SM_NAME_LIST);
        // console.log('res-------->',res);
        // this.CME_DATE = this.datePipe.transform(res.GET_CME_APPROVAL_REQUEST[0].CME_DATE, 'dd-MM-yyyy');

        // this.CME_ID = res.GET_CME_APPROVAL_REQUEST[0].CME_ID;
        // this.CME_NO = res.GET_CME_APPROVAL_REQUEST[0].CME_NO;
        // this.HQ_CODE = res.GET_CME_APPROVAL_REQUEST[0].HQ_CODE;
        // this.HQ_DESC = res.GET_CME_APPROVAL_REQUEST[0].HQ_DESC;
        // this.DIVISION_CODE = res.GET_CME_APPROVAL_REQUEST[0].DIVISION_CODE;  
        // this.DIVISION_NAME = res.GET_CME_APPROVAL_REQUEST[0].DIVISION_NAME;
         //this.CME_TYPE_ID = res.GET_CME_APPROVAL_REQUEST[0].CME_TYPE;
        // this.CAMP_TYPE_ID = res.CME_REQ_DETAILS[0].CAMP_TYPE;
        // this.InstName = res.GET_CME_APPROVAL_REQUEST[0].IS_INSITUTION_NAME;
        // this.REQ_BY_USER_NAME = res.GET_CME_APPROVAL_REQUEST[0].REQ_BY_USER_NAME;
        // this.INST_NAME = res.GET_CME_APPROVAL_REQUEST[0].INST_NAME;
        //  this.TOPIC = res.GET_CME_APPROVAL_REQUEST[0].TOPIC;
        //this.SPEAKER_NAME = res.GET_CME_APPROVAL_REQUEST[0].SPK_NAME;
        // this.SPEAKER_QUALIFICATION = res.GET_CME_APPROVAL_REQUEST[0].SPK_QUALIFICATION;
        //this.SPEAKER_SPECIALIZATION_ID = res.GET_CME_APPROVAL_REQUEST[0].SPK_SPECIALIZATION;
        // this.VENUE = res.GET_CME_APPROVAL_REQUEST[0].VENUE;
        // this.EXPECTED_DOCTORS = res.GET_CME_APPROVAL_REQUEST[0].EXPECTED_DOCTORS;
        // this.CME_DATE_FROM = this.datePipe.transform(res.CME_REQ_DETAILS[0].DATE_FROM, 'dd-MM-yyyy');
        // this.CME_TO_DATE = this.datePipe.transform(res.CME_REQ_DETAILS[0].DATE_TO, 'dd-MM-yyyy');
        // this.formatDateBasedOnCmeTimeFrom(res.CME_REQ_DETAILS[0].TIME_FROM);
        //  this.formatDateBasedOnCmeToTimeFrom(res.CME_REQ_DETAILS[0].TIME_TO);
        //  this.AMOUNT = res.CME_REQ_DETAILS[0].AMOUNT;
        //  this.GST = res.CME_REQ_DETAILS[0].GST;
        //  this.WHOM_TO_PAY_USER_ID = res.CME_REQ_DETAILS[0].WHOM_TO_PAY;
        //  this.isWhomToPayView = res.CME_REQ_DETAILS[0].IS_WHOM_TO_PAY; 
        //  this.PAY_BY_DATE = this.datePipe.transform(res.CME_REQ_DETAILS[0].PAY_BY_DATE, 'dd-MM-yyyy');
        //  this.isSlideDeckReqd = res.CME_REQ_DETAILS[0].SLIDE_DECK_REQD;
        //  this.isArtWorkReqd = res.CME_REQ_DETAILS[0].ART_WORK_REQD;
        //  this.isAddvanceView = res.CME_REQ_DETAILS[0].IS_ADVANCE;
        //  this.ADVANCE = res.CME_REQ_DETAILS[0].ADVANCE;
        //  this.AttendingDropdowns = res.CME_ATTENDING_DETAILS;
        //  this.BrandDropdowns = res.CME_BRANDS_DETAILS;
        //  this.PromotionalMaterialReq = res.CME_PROM_MATERIAL_REQ_DETAILS;
        //  this.UPLOAD_DOCUMENT_LIST = res.CME_DOCUMENT_DETAILS;
        //   let SAMPEL_CME_REQ_UPDATED_USER_DETAILS = res.CME_REQ_UPDATED_USER_DETAILS;
        //   this.REQ_UPDATED_USER_DETAILS = this.transformData(SAMPEL_CME_REQ_UPDATED_USER_DETAILS)
        //   this.CME_TYPE_LIST.forEach((element: any) => {
        //     if (this.CME_TYPE_ID == element.CME_TYPE_ID) {
        //       this.CME_DESC = element.CME_DESC;
        //     }
        //   })
        //   this.SPEAKER_SPECIALIZATION_LIST.forEach((element: any) => {
        //     if (this.SPEAKER_SPECIALIZATION_ID == element.SPL_ID) {
        //       this.SPEAKER_SPECIALIZATION_NAME = element.SPL_DESCRIPTION;
        //     }
        //   })
        //   if(this.isWhomToPayView == 'U' || this.isWhomToPayView == ''){
        //   this.WHOM_TO_PAY_LIST.forEach((element: any) => {
        //     if (this.WHOM_TO_PAY_USER_ID == element.USER_ID) {
        //       this.WHOM_TO_PAY_USER_NAME = element.USER_NAME
        //     }
        //   })
        //   }else if(this.isWhomToPayView == 'O'){
        //   this.WHOM_TO_PAY_USER_NAME = res.CME_REQ_DETAILS[0].WHOM_TO_PAY_USER_NAME; 
        //   }
        //   if (this.isAddvanceView == true) {
        //     this.IS_ADVANCE_DESC = 'Yes'
        //   } else if (this.isAddvanceView == false) {
        //     this.IS_ADVANCE_DESC = 'No'
        //   }
        //   if (this.isSlideDeckReqd == true) {
        //     this.SLIDE_DEC_REQD_DESC = 'Yes'
        //   } else if (this.isSlideDeckReqd == false) {
        //     this.SLIDE_DEC_REQD_DESC = 'No'
        //   }
        //   if (this.isArtWorkReqd == true) {
        //     this.ART_WORK_REQD_DESC = 'Yes'
        //   } else if (this.isArtWorkReqd == false) {
        //     this.ART_WORK_REQD_DESC = 'No'
        //   }
        //   this.AttendingDropdowns.forEach((element: any) => {
        //     this.ATTENDING_TEAM = [];
        //     this.ATTENDING_TEAM_LIST.forEach((user: any) => {
        //       if (element.USER_ID == user.USER_ID) {
        //         this.ATTENDING_TEAM.push(user);
        //       }
        //     })
        //   })
        //   this.BrandDropdowns.forEach((element: any) => {
        //     this.BRANDS = [];
        //     this.BRAND_LIST.forEach((product: any) => {
        //       if (element.PRODUCT_CODE == product.PRODUCT_CODE) {
        //         this.BRANDS.push(product);
        //       }
        //     })
        //   })
        //   this.PromotionalMaterialReq.forEach((element: any) => {
        //     this.PROM_MAT_REQ_ITEM = [];
        //     this.PROM_MAT_REQ_ITEM_LIST.forEach((item: any) => {
        //       if (element.ITEM_ID == item.ITEM_ID) {
        //         const mergedObject = Object.assign({}, item, element);
        //         this.PROM_MAT_REQ_ITEM.push(mergedObject,);
        //       }
        //     })
        //   })

        // this.HQ_CODE_LIST.forEach((element: any) => {
        //   if (this.HQ_CODE == element.HQ_CODE) {
        //     this.HQ_DESC = element.HQ_DESC;
        //   }
        // });

      }),
      error => {
        console.log(error);
        this.isLoaded = false;
        this.toastrService.error("Oops, Something went wrong.");
      }
  }

  GetPreviewCmeReqFromCmeNo(data: any) {
    // console.log('data ->' , data)
    this.CME_ID = data.CME_ID;
    localStorage.setItem("CME_ID", this.CME_ID);
    localStorage.setItem("IS_VIEW", this.IS_VIEW);
    localStorage.setItem("IS_APPROVAL", this.IS_APPROVAL);
    this.router.navigate(["/requestcme"]);
  }


  toggleCheckboxAll(event: any) {
    // console.log(event.target.checked,"event")
    // console.log(this.selectedApprovalData,"selectedApprovalData")
    //this.selectedApprovalData=[]
    if (event.target.checked) {
      // console.log("true")
      this.selectAll = true;
      for (let i = 0; i < this.REQUEST_APPROVAL_CME_LIST.length; i++) {
        this.REQUEST_APPROVAL_CME_LIST[i].SELECTED = true
        //    this.DownloadPdf1(this.REQUEST_APPROVAL_CME_LIST[i].CME_ID)
        // let temp=this.REQUEST_APPROVAL_CME_LIST[i].datalist[0]
        //       this.approvedPdf_LIST.push(temp)
      }
      //  console.log('this.approvedPdf_LIST------>',this.approvedPdf_LIST);

    }
    else {
      this.selectAll = false;
      for (let i = 0; i < this.REQUEST_APPROVAL_CME_LIST.length; i++) {
        this.REQUEST_APPROVAL_CME_LIST[i].SELECTED = false
        // this.approvedPdf_LIST.remove(i);
      }
    }
    // console.log(this.REQUEST_APPROVAL_CME_LIST,"clainm-list-new")
  }

  singleCheckbox(event, data, index) {
    // console.log('event ->' , event)
    // console.log('data ->' , data)
    // console.log('index ->' , index)
    if (event.target.checked == false) {
      this.selectAll = false;
    }
  }

  async APPROVECMEREQUEST() {
  console.log('approval for list');
  
    var SALES_ROLE_ID = this.userInfo.SALESROLE_ID

    this.CmeApproveData = [];

    var j = 0;
    //console.log('this.selectedApprovalData.length', this.selectedApprovalData);
  // console.log('1',this.selectedApprovalData);
   
    for (let i = 0; i < this.selectedApprovalData.length; i++) {
    
      //hemant

        //  let data= {
        //                     "USER_ID": this.userInfo.USER_ID,
        //                     "CME_ID": this.selectedApprovalData[i].CME_ID
        //                   }


      this.CmeApproveData[j]={
        "CME_ID":this.selectedApprovalData[i].CME_ID,
        "USER_ID":this.userInfo.USER_ID,
        "CME_NO":this.selectedApprovalData[i].CME_NO,
        "STATUS":1,
        "REMARKS":"",


       // "datalist":this.selectedApprovalData[i].datalist   // gaureshvcomment
      }
      // await  this.GETCMEREQUESTDATABYCMENO(data)
    //   await this.GetCreateBase64(this.datalist)
     
     // console.log('this.selectedApprovalData[i]',this.selectedApprovalData[i]);
     // console.log('  this.CmeApproveData[j]',  this.CmeApproveData[j]);
      
       //this.CmeApproveData[j] = this.selectedApprovalData[i]
       //this.CmeApproveData[j].push({ STATUS: 1 })
      //  this.DownloadPdf1(this.selectedApprovalData[i].CME_ID)
      j++;
    }
  //  console.log( " this.CmeApproveData[j]",this.CmeApproveData);
    
    // if(this.userInfo.SALESROLE_ID==6){

    //   this.GetCreateBase64(this.CmeApproveData)
    // }

    // gaureshvcomment
  //  this.selectedApprovalData = []

    if (this.CmeApproveData.length == 0) {
      this.toastrService.error("Please Select Atleast One Request");
      return;
    }




     console.log('CmeApproveData ->1' , this.CmeApproveData)
    let data = {
      USER_ID: this.userInfo.USER_ID,
      SALES_ROLE_ID: SALES_ROLE_ID,
      APPROVAL_DETAILS: this.CmeApproveData
    }
  
  //  console.log('data in list->' , JSON.stringify( this.CmeApproveData))
    //return
    this.isLoaded = true;
      
      // hemant  this.toastrService.success(res.MSG);
     
    //return
    await this.http.postnew(this.url.APPROVECMEREQUEST, data).then(async (res: any) => {
      //this.isLoaded = false;
      if (res.FLAG == true) {
       
        this.toastrService.success(res.MSG);
      

        //this.isLoaded=false;
       
       

        if(this.userInfo.SALESROLE_ID == 6){
          this.CmeApproveData = [];
        console.log('CmeApproveData ->2' , this.CmeApproveData)

          //added by hemant
          for (let i = 0; i < this.selectedApprovalData.length; i++) {
          
            //hemant

              let data= {
                                  "USER_ID": this.userInfo.USER_ID,
                                  "CME_ID": this.selectedApprovalData[i].CME_ID
                                }


            this.CmeApproveData[j]={
              "CME_ID":this.selectedApprovalData[i].CME_ID,
              "USER_ID":this.userInfo.USER_ID,
              "CME_NO":this.selectedApprovalData[i].CME_NO,
              "STATUS":1,
              "REMARKS":"",


            // "datalist":this.selectedApprovalData[i].datalist   // gaureshvcomment
            }
          
            await  this.GETCMEREQUESTDATABYCMENO(data)
            await this.GetCreateBase64(this.datalist)
          
          // console.log('this.selectedApprovalData[i]',this.selectedApprovalData[i]);
          // console.log('  this.CmeApproveData[j]',  this.CmeApproveData[j]);
            
            //this.CmeApproveData[j] = this.selectedApprovalData[i]
            //this.CmeApproveData[j].push({ STATUS: 1 })
            //  this.DownloadPdf1(this.selectedApprovalData[i].CME_ID)
            j++;
          }
           this.isLoaded=false;
          
          // let k = 0;
          // for (let i = 0; i < this.selectedApprovalData.length; i++) {
          //       let data= {
          //                   "USER_ID": this.userInfo.USER_ID,
          //                   "CME_ID": this.selectedApprovalData[i].CME_ID
          //                 }

            
          //   this.CmeApproveData[k]={
          //     "CME_ID":this.selectedApprovalData[i].CME_ID,
          //     "USER_ID":this.userInfo.USER_ID,
          //     "CME_NO":this.selectedApprovalData[i].CME_NO,
          //     "STATUS":1,
          //     "REMARKS":"",
          //     //"datalist":this.selectedApprovalData[i].datalist
          //   }
          //    await  this.GETCMEREQUESTDATABYCMENO(data)
          //   k++;
          // }
          
         // await this.GetCreateBase64(this.CmeApproveData)
       }else{
        console.log('inside else of sales roleid 6');
        
          this.isLoaded=false;

       }
        await this.GETCMEREQUESTLISTUSERID();
        this.CmeApproveData = [];
        this.selectedApprovalData = [];
        this.selectAll = false;
        sessionStorage.removeItem("statedemo-session5");
        this.dt1.selection = [];
      
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

   transformData(data: any): any[] {
 //   console.log('data',data);
    
    if(data!=undefined){
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
    }else{
      return[];
    }
 
  }
  formatDateBasedOnCmeTimeFrom(time: any) {
    if (time.length <= 8) {
      this.CME_TIME_FROM = time;
    } else if (time.length > 8) {
      this.CME_TIME_FROM = this.datePipe.transform(time, 'hh:mm a');
    }
  }

  formatDateBasedOnCmeToTimeFrom(time: any) {
    if (time.length <= 8) {
      this.CME_TO_TIME = time;
    } else if (time.length > 8) {
      this.CME_TO_TIME = this.datePipe.transform(time, 'hh:mm a');
    }
  }

  async GetCreateBase641(data: any) {
    console.log('inside base64');
    
   console.log('data ->', data[0].datalist)
   await this.GETCMEMASTERLIST();
    for (let index = 0; index < data.length; index++) {
     // console.log('inside loop',index);
      
      this.CME_DATE =  this.datePipe.transform(data[index].datalist[0].CME_REQ_DETAILS[0].CME_DATE, 'dd-MM-yyyy');
      this.CME_ID = data[index].datalist[0].CME_REQ_DETAILS[0].CME_ID;
      this.CME_NO = data[index].datalist[0].CME_REQ_DETAILS[0].CME_NO;
      this.HQ_CODE = data[index].datalist[0].CME_REQ_DETAILS[0].HQ_CODE;
      this.HQ_DESC = data[index].datalist[0].CME_REQ_DETAILS[0].HQ_DESC;
      this.DIVISION_CODE = data[index].datalist[0].CME_REQ_DETAILS[0].DIVISION_CODE;
      this.DIVISION_NAME = data[index].datalist[0].CME_REQ_DETAILS[0].DIVISION_NAME;
      this.CME_TYPE_ID = data[index].datalist[0].CME_REQ_DETAILS[0].CME_TYPE;
      this.CAMP_TYPE_ID = data[index].datalist[0].CME_REQ_DETAILS[0].CAMP_TYPE;
      this.InstName = data[index].datalist[0].CME_REQ_DETAILS[0].IS_INSITUTION_NAME;
      this.REQ_BY_USER_NAME = data[index].datalist[0].CME_REQ_DETAILS[0].REQ_BY_USER_NAME;
      this.INST_NAME = data[index].datalist[0].CME_REQ_DETAILS[0].INST_NAME;
      this.TOPIC = data[index].datalist[0].CME_REQ_DETAILS[0].TOPIC;
      this.SPEAKER_NAME = data[index].datalist[0].CME_REQ_DETAILS[0].SPK_NAME;
      this.SPEAKER_QUALIFICATION = data[index].datalist[0].CME_REQ_DETAILS[0].SPK_QUALIFICATION;
      this.SPEAKER_SPECIALIZATION_ID = data[index].datalist[0].CME_REQ_DETAILS[0].SPK_SPECIALIZATION;
      this.VENUE = data[index].datalist[0].CME_REQ_DETAILS[0].VENUE;
      this.EXPECTED_DOCTORS = data[index].datalist[0].CME_REQ_DETAILS[0].EXPECTED_DOCTORS;
      this.CME_DATE_FROM = this.datePipe.transform(data[index].datalist[0].CME_REQ_DETAILS[0].DATE_FROM, 'dd-MM-yyyy');
      this.CME_TO_DATE = this.datePipe.transform(data[index].datalist[0].CME_REQ_DETAILS[0].DATE_TO, 'dd-MM-yyyy');
      this.formatDateBasedOnCmeTimeFrom(data[index].datalist[0].CME_REQ_DETAILS[0].TIME_FROM);
      this.formatDateBasedOnCmeToTimeFrom(data[index].datalist[0].CME_REQ_DETAILS[0].TIME_TO);
      this.AMOUNT = data[index].datalist[0].CME_REQ_DETAILS[0].AMOUNT;
      this.GST = data[index].datalist[0].CME_REQ_DETAILS[0].GST;
      this.WHOM_TO_PAY_USER_ID = data[index].datalist[0].CME_REQ_DETAILS[0].WHOM_TO_PAY;
      this.isWhomToPayView = data[index].datalist[0].CME_REQ_DETAILS[0].IS_WHOM_TO_PAY;
      this.PAY_BY_DATE = this.datePipe.transform(data[index].datalist[0].CME_REQ_DETAILS[0].PAY_BY_DATE, 'dd-MM-yyyy');
      this.isSlideDeckReqd = data[index].datalist[0].CME_REQ_DETAILS[0].SLIDE_DECK_REQD;
      this.isArtWorkReqd = data[index].datalist[0].CME_REQ_DETAILS[0].ART_WORK_REQD;
      this.isAddvanceView = data[index].datalist[0].CME_REQ_DETAILS[0].IS_ADVANCE;
      this.ADVANCE = data[index].datalist[0].CME_REQ_DETAILS[0].ADVANCE;
      this.AttendingDropdowns = data[index].datalist[0].CME_ATTENDING_DETAILS;
      this.BrandDropdowns = data[index].datalist[0].CME_BRANDS_DETAILS;
      this.PromotionalMaterialReq = data[index].datalist[0].CME_PROM_MATERIAL_REQ_DETAILS;
      this.UPLOAD_DOCUMENT_LIST = data[index].datalist[0].CME_DOCUMENT_DETAILS;
      let SAMPEL_CME_REQ_UPDATED_USER_DETAILS = data[index]?.datalist[0]?.CME_REQ_UPDATED_USER_DETAILS;
      this.REQ_UPDATED_USER_DETAILS = this.transformData(SAMPEL_CME_REQ_UPDATED_USER_DETAILS)
      await this.CME_TYPE_LIST.forEach((element: any) => {
        if (this.CME_TYPE_ID == element.CME_TYPE_ID) {
           this.CME_DESC =  element.CME_DESC;
        }
      })
      await this.SPEAKER_SPECIALIZATION_LIST.forEach((element: any) => {
        if (this.SPEAKER_SPECIALIZATION_ID == element.SPL_ID) {
          this.SPEAKER_SPECIALIZATION_NAME = element.SPL_DESCRIPTION;
        }
      })
      if (this.isWhomToPayView == 'U' || this.isWhomToPayView == '') {
        await this.WHOM_TO_PAY_LIST.forEach((element: any) => {
          if (this.WHOM_TO_PAY_USER_ID == element.USER_ID) {
            this.WHOM_TO_PAY_USER_NAME = element.USER_NAME
          }
        })
      } else if (this.isWhomToPayView == 'O') {
        this.WHOM_TO_PAY_USER_NAME = data[0].datalist[0].CME_REQ_DETAILS[0].WHOM_TO_PAY_USER_NAME;
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
      await this.AttendingDropdowns.forEach((element: any) => {
        this.ATTENDING_TEAM = [];
         this.ATTENDING_TEAM_LIST.forEach((user: any) => {
          if (element.USER_ID == user.USER_ID) {
            this.ATTENDING_TEAM.push(user);
          }
        })
      })
     // console.log('this.BrandDropdowns',this.BrandDropdowns);
      //console.log('BRAND_LIST',this.BRAND_LIST);
      
      await this.BrandDropdowns.forEach((element: any) => {
        this.BRANDS = [];
        this.BRAND_LIST.forEach((product: any) => {
          if (element.PRODUCT_CODE == product.PRODUCT_CODE) {
            this.BRANDS.push(product);
          }
        })
      })
    //  if(this.PromotionalMaterialReq.length>=0){
      await this.PromotionalMaterialReq?.forEach((element: any) => {
          this.PROM_MAT_REQ_ITEM = [];
          this.PROM_MAT_REQ_ITEM_LIST.forEach((item: any) => {
            if (element.ITEM_ID == item.ITEM_ID) {
              const mergedObject = Object.assign({}, item, element);
              this.PROM_MAT_REQ_ITEM.push(mergedObject,);
            }
          })
        })
    //  }

    //   this.HQ_CODE_LIST.forEach((element: any) => {
    //     if (this.HQ_CODE == element.HQ_CODE) {
    //       this.HQ_DESC = element.HQ_DESC;
    //     }
    //   });

      //  this.cd.markForCheck();
   //   this.convertToPdf(this.CME_NO)
      //  setTimeout(() => {
      //   //this.convertToPdf()
      //   this.convertToPdf(this.CME_NO)
      // }, 2000);
//      console.log('this.BRANDS',this.BRANDS);
      
      await new Promise(resolve => setTimeout(resolve, 2000));  // Wait for 2 seconds before calling the function
     // console.log('Converting to PDF for CME_NO:', this.CME_NO);
      await this.convertToPdf(this.CME_NO);  // Ensure this is awaited if it's async
    }
  }


    async GetCreateBase64(data: any) {
   console.log('data ->', data[0].datalist)
   await this.GETCMEMASTERLIST();
    for (let index = 0; index < data.length; index++) {
     // console.log('inside loop',index);
      
      this.CME_DATE =  this.datePipe.transform(data[index].CME_REQ_DETAILS[0]?.CME_DATE, 'dd-MM-yyyy');
      this.CME_ID = data[index].CME_REQ_DETAILS[0]?.CME_ID;
      this.CME_NO = data[index].CME_REQ_DETAILS[0]?.CME_NO;
      this.HQ_CODE = data[index].CME_REQ_DETAILS[0]?.HQ_CODE;
      this.HQ_DESC = data[index].CME_REQ_DETAILS[0]?.HQ_DESC;
      this.DIVISION_CODE = data[index].CME_REQ_DETAILS[0]?.DIVISION_CODE;
      this.DIVISION_NAME = data[index].CME_REQ_DETAILS[0]?.DIVISION_NAME;
      this.CME_TYPE_ID = data[index].CME_REQ_DETAILS[0]?.CME_TYPE;
      this.CAMP_TYPE_ID = data[index].CME_REQ_DETAILS[0]?.CAMP_TYPE;
      this.InstName = data[index].CME_REQ_DETAILS[0]?.IS_INSITUTION_NAME;
      this.REQ_BY_USER_NAME = data[index].CME_REQ_DETAILS[0]?.REQ_BY_USER_NAME;
      this.INST_NAME = data[index].CME_REQ_DETAILS[0]?.INST_NAME;
      this.TOPIC = data[index].CME_REQ_DETAILS[0]?.TOPIC;
      this.SPEAKER_NAME = data[index] .CME_REQ_DETAILS[0]?.SPK_NAME;
      this.SPEAKER_QUALIFICATION = data[index] .CME_REQ_DETAILS[0]?.SPK_QUALIFICATION;
      this.SPEAKER_SPECIALIZATION_ID = data[index] .CME_REQ_DETAILS[0]?.SPK_SPECIALIZATION;
      this.VENUE = data[index] .CME_REQ_DETAILS[0]?.VENUE;
      this.EXPECTED_DOCTORS = data[index].CME_REQ_DETAILS[0]?.EXPECTED_DOCTORS;
      this.CME_DATE_FROM = this.datePipe.transform(data[index]?.CME_REQ_DETAILS[0]?.DATE_FROM, 'dd-MM-yyyy');
      this.CME_TO_DATE = this.datePipe.transform(data[index]?.CME_REQ_DETAILS[0]?.DATE_TO, 'dd-MM-yyyy');
      this.formatDateBasedOnCmeTimeFrom(data[index]?.CME_REQ_DETAILS[0]?.TIME_FROM);
      this.formatDateBasedOnCmeToTimeFrom(data[index]?.CME_REQ_DETAILS[0]?.TIME_TO);
      this.AMOUNT = data[index]?.CME_REQ_DETAILS[0]?.AMOUNT;
      this.GST = data[index]?.CME_REQ_DETAILS[0]?.GST;
      this.WHOM_TO_PAY_USER_ID = data[index]?.CME_REQ_DETAILS[0]?.WHOM_TO_PAY;
      this.isWhomToPayView = data[index]?.CME_REQ_DETAILS[0]?.IS_WHOM_TO_PAY;
      this.PAY_BY_DATE = this.datePipe.transform(data[index]?.CME_REQ_DETAILS[0]?.PAY_BY_DATE, 'dd-MM-yyyy');
      this.isSlideDeckReqd = data[index]?.CME_REQ_DETAILS[0]?.SLIDE_DECK_REQD;
      this.isArtWorkReqd = data[index]?.CME_REQ_DETAILS[0]?.ART_WORK_REQD;
      this.isAddvanceView = data[index]?.CME_REQ_DETAILS[0]?.IS_ADVANCE;
      this.ADVANCE = data[index]?.CME_REQ_DETAILS[0]?.ADVANCE;
      this.AttendingDropdowns = data[index]?.CME_ATTENDING_DETAILS;
      this.BrandDropdowns = data[index]?.CME_BRANDS_DETAILS;
      this.PromotionalMaterialReq = data[index]?.CME_PROM_MATERIAL_REQ_DETAILS;
      this.UPLOAD_DOCUMENT_LIST = data[index]?.CME_DOCUMENT_DETAILS;
      let SAMPEL_CME_REQ_UPDATED_USER_DETAILS = data[index]?.CME_REQ_UPDATED_USER_DETAILS;
      this.REQ_UPDATED_USER_DETAILS = this.transformData(SAMPEL_CME_REQ_UPDATED_USER_DETAILS)
      await this.CME_TYPE_LIST.forEach((element: any) => {
        if (this.CME_TYPE_ID == element.CME_TYPE_ID) {
           this.CME_DESC =  element.CME_DESC;
        }
      })
      await this.SPEAKER_SPECIALIZATION_LIST.forEach((element: any) => {
        if (this.SPEAKER_SPECIALIZATION_ID == element.SPL_ID) {
          this.SPEAKER_SPECIALIZATION_NAME = element.SPL_DESCRIPTION;
        }
      })
      if (this.isWhomToPayView == 'U' || this.isWhomToPayView == '') {
        await this.WHOM_TO_PAY_LIST.forEach((element: any) => {
          if (this.WHOM_TO_PAY_USER_ID == element.USER_ID) {
            this.WHOM_TO_PAY_USER_NAME = element.USER_NAME
          }
        })
      } else if (this.isWhomToPayView == 'O') {
        this.WHOM_TO_PAY_USER_NAME = data[0] .CME_REQ_DETAILS[0].WHOM_TO_PAY_USER_NAME;
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
      await this.AttendingDropdowns.forEach((element: any) => {
        this.ATTENDING_TEAM = [];
         this.ATTENDING_TEAM_LIST.forEach((user: any) => {
          if (element.USER_ID == user.USER_ID) {
            this.ATTENDING_TEAM.push(user);      
          }
        })
      })
     // console.log('this.BrandDropdowns',this.BrandDropdowns);
      //console.log('BRAND_LIST',this.BRAND_LIST);
       
      await this.BrandDropdowns.forEach((element: any) => {
        this.BRANDS = [];
        this.BRAND_LIST.forEach((product: any) => {
          if (element.PRODUCT_CODE == product.PRODUCT_CODE) { 
            this.BRANDS.push(product);
          }
        })
      })
    //  if(this.PromotionalMaterialReq.length>=0){
      await this.PromotionalMaterialReq?.forEach((element: any) => {
          this.PROM_MAT_REQ_ITEM = [];
          this.PROM_MAT_REQ_ITEM_LIST.forEach((item: any) => {
            if (element.ITEM_ID == item.ITEM_ID) {
              const mergedObject = Object.assign({}, item, element);
              this.PROM_MAT_REQ_ITEM.push(mergedObject,);
            }
          })
        })
    //  }

    //   this.HQ_CODE_LIST.forEach((element: any) => {
    //     if (this.HQ_CODE == element.HQ_CODE) {
    //       this.HQ_DESC = element.HQ_DESC;
    //     }
    //   });

      //  this.cd.markForCheck();
   //   this.convertToPdf(this.CME_NO)
      //  setTimeout(() => {
      //   //this.convertToPdf()
      //   this.convertToPdf(this.CME_NO)
      // }, 2000);
//      console.log('this.BRANDS',this.BRANDS);
      
      await new Promise(resolve => setTimeout(resolve, 2000));  // Wait for 2 seconds before calling the function
     // console.log('Converting to PDF for CME_NO:', this.CME_NO);
      await this.convertToPdf(this.CME_NO);  // Ensure this is awaited if it's async
    }
  }
  // //  console.log('this.REQUEST_APPROVAL_CME_LIST  ->' ,      this.REQUEST_APPROVAL_CME_LIST)
  //  let DOCUMENTBASE64 = [];
  //  this.REQUEST_APPROVAL_CME_LIST.forEach((element:any)=>{
  //   data.forEach((item:any)=>{
  //     if(element.CME_ID == item.CME_ID){
  //       DOCUMENTBASE64.push(element);
  //     }
  //   })
  //  })
  //  this.GETCMEMASTERLIST();
  //  //console.log('DOCUMENTBASE64 ->' , DOCUMENTBASE64)
  //  DOCUMENTBASE64.forEach((data:any)=>{
  //  })
  //  this.GETCMEREQUESTDATABYCME(data[0].CME_ID)


  GETCMEMASTERLIST() {
    let data = {
      "USER_ID": this.userInfo.USER_ID
    }
    //this.isLoaded = true;

    this.http.postnew(this.url.GETCMEMASTERLIST, data).then(
      async (res: any) => {
      //  console.log('GETCMEMASTERLIST res ->' , res)

        this.HQ_CODE_LIST = res.HQ_CODE_LIST;
        this.CME_TYPE_LIST = res.CME_TYPE_LIST;
        this.CAMP_TYPE_LIST = res.CAMP_TYPE_LIST;
        this.DOCUMENT_TYPE_LIST = res.DOCUMENT_TYPE_LIST;
        this.ATTENDING_TEAM_LIST = res.CME_ATTENDING_LIST;
        this.BRAND_LIST = await res.CME_BRANDS_LIST;
        this.WHOM_TO_PAY_LIST = res.WHOM_TO_PAY_LIST;
        this.PROM_MAT_REQ_ITEM_LIST = res.ITEM_LIST;
        this.SPEAKER_SPECIALIZATION_LIST = res.DOCTOR_SPECIALIZATION_LIST;
        this.DIV_LIST = res.DIV_LIST;
       // this.isLoaded = false;
      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  GETCMEREQUESTDATABYCME(id: any) {
   // console.log('GETCMEREQUESTDATABYCME id', id);

    let data = {
      "USER_ID": this.userInfo.USER_ID,
      "CME_ID": id,
    }


    // this.DownloadPdf1(id);
  }


  // DownloadPdf1(id:any) {
  //    var printContents = document.getElementById('DownloadPDF');
  //   var originalContents = document.body.innerHTML;
  //   // // document.body.innerHTML 
  //   // console.log('originalContents',originalContents);

  //   // window.print();
  //   // window.location.reload();
  //   // document.body.innerHTML = originalContents;
  //   // console.log('DownloadPDF ->' , this.DownloadPDF)

  //   var data = document.getElementById('DownloadPDF');
  //   console.log('data d ->' , originalContents)
  //   /// return
  //   const contentToConvert = this.DownloadPDF.nativeElement;
  //   var html = contentToConvert.innerHTML;
  //   html = '<html>' + html + '</html>';
  //   let post_data = {
  //     data: html,
  //   };
  //   console.log('pdf ->' ,JSON.stringify(post_data))
  //  return;
  //   this.http.postnew(this.url.ConvertHtmlToBase64, post_data).then(
  //     (res: any) => {
  //       this.base64PdfString = res.Base64EncodedHtml
  //       const byteCharacters = atob(this.base64PdfString);
  //       const byteNumbers = new Array(byteCharacters.length);
  //       for (let i = 0; i < byteCharacters.length; i++) {
  //         byteNumbers[i] = byteCharacters.charCodeAt(i);
  //       }
  //       const byteArray = new Uint8Array(byteNumbers);

  //       const blob = new Blob([byteArray], { type: 'application/pdf' });

  //       const link = document.createElement('a');
  //       const url = window.URL.createObjectURL(blob);
  //       link.href = url;
  //       link.download = this.CME_NO;

  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);

  //       window.URL.revokeObjectURL(url);
  //       this.toastrService.success(this.CME_NO + ' ' + 'Pdf Downloaded Successfully')
  //     },
  //     (error) => {
  //       console.log('Oops, Something went wrong.', error);
  //     }
  //   );
  // }

  DownloadPdf1(id: any) {
    // Get the HTML content you want to convert to PDF
    // const printContents = document.getElementById('DownloadPDF');
    if (!this.DownloadPDF) {
      console.error("Element with ID 'DownloadPDF' not found.");
      return;
    }

    // Wrapping HTML content within basic HTML structure
    const htmlContent = `<html><body>${this.DownloadPDF.nativeElement.innerHTML}</body></html>`;
    // const htmlContent = `<html><body><h1>welcome here </h1></body></html>`;
    // Preparing data to be sent to the server for conversion
    const post_data = {
      data: htmlContent,
    };
  //  console.log('HTML content to convert:', JSON.stringify(post_data));

    // Make POST request to server with the HTML content for Base64 conversion
    // return
    this.http.postnew(this.url.ConvertHtmlToBase64, post_data).then(
      (res: any) => {
        // Extract Base64 string from server response
        this.base64PdfString = res.Base64EncodedHtml;
        //this.convertToPdf(this.base64PdfString)
        // Decode the Base64 string and convert it to binary data
        // const byteCharacters = atob(this.base64PdfString);
        // const byteNumbers = new Array(byteCharacters.length);
        // for (let i = 0; i < byteCharacters.length; i++) {
        //     byteNumbers[i] = byteCharacters.charCodeAt(i);
        // }
        // const byteArray = new Uint8Array(byteNumbers);
        // const blob = new Blob([byteArray], { type: 'application/pdf' });

        // // Create a download link for the PDF file
        // const link = document.createElement('a');
        // const url = window.URL.createObjectURL(blob);
        // link.href = url;
        // link.download = `${this.CME_NO}.pdf`;

        // // Append link to body, click to download, then remove link
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);

        // // Revoke object URL to free up resources
        // window.URL.revokeObjectURL(url);

        // // Show success message
        // this.toastrService.success(`${this.CME_NO} Pdf Downloaded Successfully`);
      },
      (error) => {
        console.error('Error during HTML to PDF conversion:', error);
        this.toastrService.error('Oops, something went wrong.');
      }
    );
  }
  //   DownloadPdf1(id: any) {
  //     // Ensure the HTML element is available
  //     if (!this.DownloadPDF) {
  //         console.error("Element with ID 'DownloadPDF' not found.");
  //         return;
  //     }

  //     // Wrap HTML content within basic HTML structure
  //     const htmlContent = `<html><body>${this.DownloadPDF.nativeElement.innerHTML}</body></html>`;

  //     // Prepare data to send to the server for conversion
  //     const post_data = { data: htmlContent };
  //     console.log('HTML content to convert:', JSON.stringify(post_data));

  //     // Make POST request to server with the HTML content for Base64 conversion
  //     this.http.postnew(this.url.ConvertHtmlToBase64, post_data).then(
  //         (res: any) => {
  //             // Extract Base64 string from the server response
  //             this.base64PdfString = res.Base64EncodedHtml;
  //             console.log('this.base64PdfString',this.base64PdfString);

  //             // Convert the Base64 string to a PDF Blob and download it
  //             console.log('this.CME_NO',this.CME_NO);

  //             this.convertBase64ToPdfAndDownload(this.base64PdfString,'cme0003');
  //         },
  //         (error) => {
  //             console.error('Error during HTML to PDF conversion:', error);
  //             this.toastrService.error('Oops, something went wrong.');
  //         }
  //     );
  // }

  // // Helper function to convert Base64 to Uint8Array
  // base64ToUint8Array(base64: string): Uint8Array {
  //     const binaryString = window.atob(base64); // Decode Base64 string to binary string
  //     const binaryLength = binaryString.length;
  //     const bytes = new Uint8Array(binaryLength);
  //     for (let i = 0; i < binaryLength; i++) {
  //         bytes[i] = binaryString.charCodeAt(i);
  //     }
  //     return bytes;
  // }

  // // Function to create a PDF Blob from Base64 and trigger download
  // convertBase64ToPdfAndDownload(base64PdfString: string, fileName: string) {
  //     try {
  //         // Decode the Base64 string to binary data
  //         const byteArray = this.base64ToUint8Array(base64PdfString);
  //         const blob = new Blob([byteArray], { type: 'application/pdf' });

  //         // Create a temporary link element for the download
  //         const link = document.createElement('a');
  //         const url = window.URL.createObjectURL(blob);
  //         link.href = url;
  //         link.download = `${fileName}.pdf`;

  //         // Append link to body, trigger download, then remove the link
  //         document.body.appendChild(link);
  //         link.click();
  //         document.body.removeChild(link);

  //         // Revoke the object URL to free up memory
  //         window.URL.revokeObjectURL(url);

  //         // Display a success message
  //         this.toastrService.success(`${fileName} PDF downloaded successfully`);
  //     } catch (error) {
  //         console.error('Error converting Base64 to PDF:', error);
  //         this.toastrService.error('Could not convert Base64 to PDF.');
  //     }
  // }

   convertToPdf(id: any) {
    ///let id=1
    //console.log('inside convertToPdf ->' , id)
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
 // console.log('html ->', JSON.stringify(html))
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
 // console.log('post_data ->', post_data)
  // return
  const headers = new HttpHeaders().set('Content-Type', 'application/json');

  this.httpclient.post(this.url.ConvertBase64ToPdf, post_data, { headers })
    .subscribe(response => {
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

    async GETCMEREQUESTDATABYCMENO(data:any) {
    //  data = {
    //   "USER_ID": this.userInfo.USER_ID,
    //   "CME_ID": this.CME_ID,
    // }
    console.log('inside GETCMEREQUESTDATABYCMENO');
    
    this.isLoaded = true;
   await this.http.postnew(this.url.GETCMEREQUESTDATABYCMENO, data).then((res: any) => {
    this.datalist=[];
    this.datalist.push(res)
    console.log('this.datalist',this.datalist);
      console.log('API call  GETCMEREQUESTDATABYCMENO');
      //  console.log('step-2 ')
     //this.datalist[0] = res
    //  this.CME_DATE = this.datePipe.transform(res.CME_REQ_DETAILS[0].CME_DATE, 'dd-MM-yyyy');
      // this.cme_date = this.datePipe.transform(res.CME_REQ_DETAILS[0].CME_DATE, 'dd-MM-yyyy');
      // this.CME_ID = res.CME_REQ_DETAILS[0].CME_ID;
      // this.CME_NO = res.CME_REQ_DETAILS[0].CME_NO;
      // this.HQ_CODE = res.CME_REQ_DETAILS[0].HQ_CODE;
      // this.DIVISION_CODE = res.CME_REQ_DETAILS[0].DIVISION_CODE;
      // this.CME_TYPE_ID = res.CME_REQ_DETAILS[0].CME_TYPE;
      // this.CAMP_TYPE_ID = res.CME_REQ_DETAILS[0].CAMP_TYPE;
      // this.InstName = res.CME_REQ_DETAILS[0].IS_INSITUTION_NAME;
      // this.REQ_BY_USER_NAME = res.CME_REQ_DETAILS[0].REQ_BY_USER_NAME;
      // this.INST_NAME = res.CME_REQ_DETAILS[0].INST_NAME;
      // this.TOPIC = res.CME_REQ_DETAILS[0].TOPIC;
      // this.TOPIC_ID=res.CME_REQ_DETAILS[0].TOPIC_ID;
      // this.SPEAKER_NAME = res.CME_REQ_DETAILS[0].SPK_NAME;
      // this.SPEAKER_QUALIFICATION = res.CME_REQ_DETAILS[0].SPK_QUALIFICATION;
      // this.SPEAKER_SPECIALIZATION_ID = res.CME_REQ_DETAILS[0].SPK_SPECIALIZATION;
      // this.VENUE = res.CME_REQ_DETAILS[0].VENUE;
      // this.EXPECTED_DOCTORS = res.CME_REQ_DETAILS[0].EXPECTED_DOCTORS;
      // this.CME_DATE_FROM = this.datePipe.transform(res.CME_REQ_DETAILS[0].DATE_FROM, 'dd-MM-yyyy');
      // this.cme_date_from = this.datePipe.transform(res.CME_REQ_DETAILS[0].DATE_FROM, 'dd-MM-yyyy');
      // this.CME_TO_DATE = this.datePipe.transform(res.CME_REQ_DETAILS[0].DATE_TO, 'dd-MM-yyyy');
      // this.cme_to_date = this.datePipe.transform(res.CME_REQ_DETAILS[0].DATE_TO, 'dd-MM-yyyy');
      // this.formatDateBasedOnCmeTimeFrom(res.CME_REQ_DETAILS[0].TIME_FROM);
      // this.formatDateBasedOnCmeToTimeFrom(res.CME_REQ_DETAILS[0].TIME_TO);
      // this.AMOUNT = res.CME_REQ_DETAILS[0].AMOUNT;
      // this.GST = res.CME_REQ_DETAILS[0].GST;
      // this.WHOM_TO_PAY_USER_ID = res.CME_REQ_DETAILS[0].WHOM_TO_PAY;
      // this.isWhomToPayView = res.CME_REQ_DETAILS[0].IS_WHOM_TO_PAY;
      // this.WHOM_TO_PAY_USER_NAME = res.CME_REQ_DETAILS[0].WHOM_TO_PAY_USER_NAME;
      // this.PAY_BY_DATE = this.datePipe.transform(res.CME_REQ_DETAILS[0].PAY_BY_DATE, 'dd-MM-yyyy');
      // this.pay_by_date = this.datePipe.transform(res.CME_REQ_DETAILS[0].PAY_BY_DATE, 'dd-MM-yyyy');
      // this.isSlideDeckReqd = res.CME_REQ_DETAILS[0].SLIDE_DECK_REQD;
      // this.isArtWorkReqd = res.CME_REQ_DETAILS[0].ART_WORK_REQD;
      // this.isAddvanceView = res.CME_REQ_DETAILS[0].IS_ADVANCE;
      // this.ADVANCE = res.CME_REQ_DETAILS[0].ADVANCE;
      // this.AttendingDropdowns = res.CME_ATTENDING_DETAILS;
      // this.BrandDropdowns = res.CME_BRANDS_DETAILS;
      // this.PromotionalMaterialReq = res.CME_PROM_MATERIAL_REQ_DETAILS;
      // this.UPLOAD_DOCUMENT_LIST = res.CME_DOCUMENT_DETAILS;
      // let SAMPEL_CME_REQ_UPDATED_USER_DETAILS =res.CME_REQ_UPDATED_USER_DETAILS;
      // this.REQ_UPDATED_USER_DETAILS = this.transformData1(SAMPEL_CME_REQ_UPDATED_USER_DETAILS)
      // console.log('REQ_UPDATED_USER_DETAILS',this.REQ_UPDATED_USER_DETAILS);
   
      // this.REQ_UPDATED_USER_DETAILS = this.REQ_UPDATED_USER_DETAILS.filter(
      //   element => element.userName !== "" && element.userName !== null && element.status !==""
      // );
      
      // this.CME_REQ_PAYMENT_DETAILS=res.CME_REQ_PAYMENT_DETAILS
      // this.POST_CMESTATUS = res?.CME_REQ_DETAILS[0]?.POST_CMESTATUS;
      // this.CME_REQUEST_BY = res?.CME_REQ_DETAILS[0]?.REQ_BY;
      // this.IS_CANCELLED=res?.CME_REQ_DETAILS[0]?.IS_CANCELLED
    //  if( this.POST_CMESTATUS=='1'){
    //   if(this.REQ_BY_USER_ID== this.CME_REQ_PAYMENT_DETAILS.REQ_BY){
    //         this.POST_CMESTATUS=='0'
    //   }
    //  }
     //this.REQ_BY_USER_ID = JSON.parse(this.authService.getUserDetail());
     
    //  console.log(this.CME_REQUEST_BY == this.REQ_BY_USER_ID,this.POST_CMESTATUS,"this.POST_CMESTATUS")
    //   if(this.TOPIC_ID==0){
    //     this.DROPDOWNFLAG=true;
    //   }else{
    //     this.DROPDOWNFLAG=false;
    //   }
    //   if (this.InstName == true) {
    //     this.INSTITUTION = true;
    //     this.NON_INSTITUTION = false;
    //   } else if (this.InstName == false) {
    //     this.NON_INSTITUTION = true;
    //     this.INSTITUTION = false;
    //   }
    //   if (this.isSlideDeckReqd == true) {
    //     this.IS_SLIDE_DECK_REQD_YES = true;
    //     this.IS_SLIDE_DECK_REQD_NO = false;
    //   } else if (this.isSlideDeckReqd == false) {
    //     this.IS_SLIDE_DECK_REQD_YES = false;
    //     this.IS_SLIDE_DECK_REQD_NO = true;
    //   }
    //   if (this.isArtWorkReqd == true) {
    //     this.IS_ART_WORK_REQD_YES = true;
    //     this.IS_ART_WORK_REQD_NO = false;
    //   } else if (this.isArtWorkReqd == false) {
    //     this.IS_ART_WORK_REQD_YES = false;
    //     this.IS_ART_WORK_REQD_NO = true;
    //   }
    //   if (this.isAddvanceView == true) {
    //     this.IS_ADVANCE_YES = true;
    //     this.IS_ADVANCE_NO = false;
    //   } else if (this.isAddvanceView == false) {
    //     this.IS_ADVANCE_YES = false;
    //     this.IS_ADVANCE_NO = true;
    //   }
    //   if (this.isWhomToPayView == 'U') {
    //     this.IS_WHOM_TO_PAY_USER = true;
    //     this.IS_WHOM_TO_PAY_OTHERS = false;
    //   } else if (this.isWhomToPayView == 'O') {
    //     this.IS_WHOM_TO_PAY_OTHERS = true;
    //     this.IS_WHOM_TO_PAY_USER = false;
    //   }
    //   if (this.CME_TYPE_ID == "5") {
    //     this.isCampTypeView = true;
    //   } else {
    //     this.isCampTypeView = false;
    //   }
    //  this.GETCMEDOCTORLIST(this.HQ_CODE);
      this.isLoaded = false;
    });


     console.log('out GETCMEREQUESTDATABYCMENO');
   // await this.GetCreateBase64( this.datalist)
  }

// async getRequest(){
//   console.log('inside123');
// //  return
//                 let data= {
//                                   "USER_ID": this.userInfo.USER_ID,
//                                   "CME_ID": 3132
//                                 }

                                  
//             await  this.GETCMEREQUESTDATABYCMENO(data)
//             await this.GetCreateBase64(this.datalist)

// }


}
