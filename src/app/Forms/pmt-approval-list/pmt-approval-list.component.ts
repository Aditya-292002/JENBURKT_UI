import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { SharedService } from 'src/app/Service/shared.service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-pmt-approval-list',
  templateUrl: './pmt-approval-list.component.html',
  styleUrls: ['./pmt-approval-list.component.css']
})
export class PmtApprovalListComponent implements OnInit {
ADHOC_REQUEST_LIST:any=[]
  userInfo: any;
 toggleToList:boolean=false
  HQ_CODE: any;
  PRODUCT_LIST: any;
  REQ_NO: any;
  REMARK: any;
  DROPDOWN_PRODUCT_LIST: any;
  SAMPLE_PRODUCT_LIST: any=[];
  HQ_DESC: any;
  REQUEST_DATE:any
  isConformationPopup: boolean=false;
  RSM_NAME: any;
  STATUSFLAG: boolean=false;
  APPROVEDFLAG: boolean=false;
  PENDINGFLAG: boolean=true;
  LISTSTATUS: string='P';
  isLoaded:Boolean=false;
  isRejectConformationPopup:Boolean=false
 constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService, private SharedService: SharedService) { }

  ngOnInit(): void {
     this.userInfo = JSON.parse(this.authService.getUserDetail());
     this.GETADHOCSAMPLEREQUISITIONLISTBYUSERID()
  }


    GETADHOCSAMPLEREQUISITIONLISTBYUSERID() {
    let data = {
      "USER_ID": this.userInfo.USER_ID,
      "LISTSTATUS":this.LISTSTATUS
     // "HQ_CODE": this.HQ_CODE
    }
    console.log('this.data',data);
    
    this.isLoaded=true
    this.http.postnew(this.url.GETPMTDHOCSAMPLEREQUISITIONLISTBYUSERID, data).then(
      (res: any) => {
        this.ADHOC_REQUEST_LIST = res.ADHOC_REQUISITION_LIST;
         this.isLoaded=false
      //  this.REQ_NO=this.PRODUCT_LIST[0]?.REQUEST_NO  
      //  this.REMARK=this.PRODUCT_LIST[0]?.REMARKS
     })
  }

  GETREQUESTDETAILS(D){
  console.log('d',D);
  this.HQ_CODE=D.HQ_CODE
  this.HQ_DESC=D.HQ_DESC
  this.RSM_NAME=D.RSM_NAME
  const inputDate=D.REQUEST_DATE;

    if(D.STATUS==='Approved') {
    console.log('inside if',  this.STATUSFLAG);
    this.STATUSFLAG=true;
  }else if(D.STATUS_DESC='R'){
      this.STATUSFLAG=true;
  }
  else{
     this.STATUSFLAG=false;
  } 
  
  // Parse the date
  const date = new Date(inputDate);
  
  // Format parts
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = String(date.getFullYear()).slice(-2); // Get last two digits
  
  // Format as dd.mm.yy
  const formattedDate = `${day}.${month}.${year}`;
  this.REQUEST_DATE=formattedDate
  this.GETADHOCSAMPLEREQUISITIONLIST() 
  this.toggleToList= true;
  
}

GETADHOCSAMPLEREQUISITIONLIST() {
    let data = {
      "USER_ID": this.userInfo.USER_ID,
      "HQ_CODE": this.HQ_CODE
    }
    this.http.postnew(this.url.GETADHOCSAMPLEREQUISITIONLISTBYROLE, data).then(
      (res: any) => {
        this.SAMPLE_PRODUCT_LIST=[];
        this.PRODUCT_LIST = res.ADHOC_REQUISITION_LIST;
        this.REQ_NO=this.PRODUCT_LIST[0]?.REQUEST_NO
        this.REMARK=this.PRODUCT_LIST[0]?.REMARKS


        // this.SAMPLE_PRODUCT_LIST=res.PRODUCT_LIST


            const productlist = [...new Set(res.PRODUCT_LIST.map((item: any) => item.DESCRIPTION))];
            productlist.forEach((element: any) => {
              this.SAMPLE_PRODUCT_LIST.push({ label: element, value: element })
            })
       // this.PRODUCT_LIST=res.PRODUCT_LIST
      //  this.DROPDOWN_PRODUCT_LIST = res.PRODUCT_LIST.map((item: any) => ({
      //         POOL_CODE: item.SAMPLE_PRODUCT_CODE,
      //         POOL_DESC: item.DESCRIPTION
      //       }));
      // });
          // const productlist = [...new Set(this.SAMPLE_PRODUCT_LIST.map((item: any) => item.DESCRIPTION))];
          //   productlist.forEach((element: any) => {
          //     this.DROPDOWN_PRODUCT_LIST.push({ label: element, value: element })
          //   })
         
  })}
    goToList(){
    console.log('insdide list');
    
    this.toggleToList= false
    this.GETADHOCSAMPLEREQUISITIONLISTBYUSERID()
  }

  
  saveAdhocRequisition(){
    console.log(this.HQ_CODE,'data');
    
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
        "PRODUCT_LIST":this.PRODUCT_LIST
    }

      this.http.postnew(this.url.SAVEADHOCSAMPLEREQUISITION, data).then(
      (res: any) => {
        if (res.data[0].FLAG == 1) {
        this.toastrService.success(res.data[0].MSG);
      } else if (res.data[0].FLAG == 0) {
        this.toastrService.error(res.data[0].MSG);
      }
      });
    
  }

  GETPMTCALCULATEPACKQTYBYPOOLCODE(data,index){
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
      USER_ID: this.userInfo.USER_ID,
      REQUEST_NO: data.REQUEST_NO,
      POOL_CODE: data.POOL_CODE,
      SAMPLE_PRODUCT_CODE: data.SAMPLE_PRODUCT_CODE,
      SM_REQUESTED_PACK_QTY: data.REQUESTED_PACK_QTY,
      REQUESTED_PACK_QTY:data.REQUESTED_PACK_QTY,
      REQ_HQ_QTY: data.REQ_HQ_QTY,
      TOTAL_REQ: data.TOTAL_REQUESTED_QTY,
      REQ_VALUE: data.REQ_VALUE
    }
    console.log(' data1 ->' , data1)

    this.http.postnew(this.url.GETADHOCPMTCALCULATEPACKQTYBYPOOLCODE, data1).then((res: any) => {
      console.log('inside update API');
      
      //this.DATA_LIST = res.DATA_LIST;
     // this.REQ_VALUE = Number(this.DATA_LIST[0].TOTAL_VALUE.toFixed(2));
    });
  }

     OpenConformationPopup() {
      console.log('INSIDE CLICK');
      
    this.isConformationPopup = true;
  }
  CancelConformationPopup(){
       this.isConformationPopup = false;
  }
  
    APPROVEDSAMPLEREQUISITION() {
    let data = {
      "USER_ID": this.userInfo.USER_ID,
      "HQ_CODE":this.HQ_CODE,
      "REQUEST_NO":this.REQ_NO,
    }
    console.log('data',data);
    
    //return
    this.http.postnew(this.url.APPROVEADHOCSAMPLEREQUISITION, data).then((res: any) => {
      console.log('res',res);
      
      if (res.DATA_LIST[0].FLAG == 1) {
        this.toastrService.success(res.DATA_LIST[0].MSG);
        this.isConformationPopup = false;
        this.toggleToList= false
         this.GETADHOCSAMPLEREQUISITIONLISTBYUSERID()
        // this.cccc.navigate(["/samplerequisitionlist"]);
      } else if (res.DATA_LIST[0].FLAG == 0) {
        this.toastrService.error(res.DATA_LIST[0].MSG);
        this.isConformationPopup = false;
        // this.router.navigate(["/samplerequisitionlist"]);
      }
    });
  }

    ClickPaymentMode(val:any)
{
   if(val == 1){
      this.APPROVEDFLAG = false;
     this.PENDINGFLAG = true;
     this.LISTSTATUS='P'
     this.GETADHOCSAMPLEREQUISITIONLISTBYUSERID()
   }else if(val == 0){
      this.PENDINGFLAG = false;
      this.APPROVEDFLAG = true;
       this.LISTSTATUS='R'
     this.GETADHOCSAMPLEREQUISITIONLISTBYUSERID()
   }
}

CancelRejectConformationPopup(){
  this.isRejectConformationPopup = false;
}
OpenRejectConformationPopup() {
      console.log('INSIDE CLICK');
    this.isRejectConformationPopup = true;
  }

      REJECTSAMPLEREQUISITION() {
    let data = {
      "USER_ID": this.userInfo.USER_ID,
      "HQ_CODE":this.HQ_CODE,
      "REQUEST_NO":this.REQ_NO,
    }
    console.log('data',data);
    
   // return
    this.http.postnew(this.url.REJECTADHOCSAMPLEREQUISITION, data).then((res: any) => {
      console.log('res',res);
      
      if (res.DATA_LIST[0].FLAG == 1) {
        this.toastrService.success(res.DATA_LIST[0].MSG);
        this.isRejectConformationPopup = false;
        this.toggleToList= false
         this.GETADHOCSAMPLEREQUISITIONLISTBYUSERID()
        // this.cccc.navigate(["/samplerequisitionlist"]);
      } else if (res.DATA_LIST[0].FLAG == 0) {
        this.toastrService.error(res.DATA_LIST[0].MSG);
        this.isRejectConformationPopup = false;
        // this.router.navigate(["/samplerequisitionlist"]);
      }
    });
  }


}
