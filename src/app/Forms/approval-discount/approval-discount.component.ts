import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
import { Table } from 'primeng/table'


@Component({
  selector: 'app-approval-discount',
  templateUrl: './approval-discount.component.html',
  styleUrls: ['./approval-discount.component.css']
})
export class ApprovalDiscountComponent implements OnInit {
  @ViewChild('dt11') dt11: Table | undefined;

  SALE_QTY:any;
  FREE_QTY:any;
  LAST_VISIT:any=new Date();
  REMARK:any;
  SALE:any;
  FREE:any;
  REQ_BY:any;
  APP_BY:any;
  isShowEditPopup:boolean = false;
  visible:boolean=false;
  rejectlist:boolean=false;
  tracklist:boolean=false;
  userInfo:any;
  userData:any;
  isLoaded:boolean;
  APPROVAL_LIST:any=[];
  ApproveData:any=[];
  SELECTED:any;
  selectAll:any;
  state:any = [{value:'Pending',label:'Pending'},{value:'Approved',label:'Approved'},{value:'Rejected',label:'Rejected'}]
  statuses:any = [];
  HQ_LIST:any = [];
  FM_LIST:any = [];
  RSM_LIST:any = [];
  SM_LIST:any = [];
  DOC_LIST:any = [];
  FREE_QTY_LIST:any = [];
  HQ_DATA:any;
  cachedTableEvent:any;
  PROC_LIST:any = [];
  selectedApprovalData:any = [];
  ClaimApprovalListLength:any;

  constructor(private router: Router,private authService: AuthService,private url: URLService,private http: HttpService,
    private toastrService:ToastrService,public datepipe: DatePipe,private comman:CommonService,) { }

  ngOnInit(): void {
    //console.log(isNaN(0.00/0.00))
  
    this.selectedApprovalData = [];
    localStorage.removeItem("DISCOUNT_APPROVE_DETAILS");


    this.GETCLAIMAPPROVALLISTBYUSERID(0)
    
    this.statuses = [
      {label: 'Pending', value: 'Pending'},
      {label: 'Approved', value: 'Approved'},
      {label: 'Rejected', value: 'Rejected'}
  ]
  }

  checkNaN(value: any){
    return isNaN(value);
  }

  GETCLAIMAPPROVALLISTBYUSERID(val:any){
    this.userInfo = this.authService.getUserDetail();
    this.userData = this.authService.getUserDetail();
    var userid=JSON.parse(this.userInfo).USER_ID
    var saleRoleId=JSON.parse(this.userData).SALESROLE_ID
    let data={
        USER_ID:userid,
        SALES_ROLE_ID:saleRoleId,

    }

    this.http.postnew(this.url.GETCLAIMAPPROVALLISTBYUSERID,data).then(
      (res:any)=>{
        this.isLoaded= false;
        this.APPROVAL_LIST=res.APPROVAL_LIST
        this.HQ_LIST = [];
        this.FM_LIST = [];
        this.RSM_LIST = [];
        this.SM_LIST = [];
        this.DOC_LIST = [];
        this.FREE_QTY_LIST = [];
        this.PROC_LIST = [];

        for(let i=0;i<this.APPROVAL_LIST.length;i++){
          this.APPROVAL_LIST[i].FREE_QTY_DATA = this.checkNaN(((this.APPROVAL_LIST[i].UPDATED_FREE_QTY/this.APPROVAL_LIST[i].UPDATED_SALE_QTY)*100).toFixed(2)) ? 0 : ((this.APPROVAL_LIST[i].UPDATED_FREE_QTY/this.APPROVAL_LIST[i].UPDATED_SALE_QTY)*100).toFixed(2)
        }

        if(this.APPROVAL_LIST.length > 0){
          const hq = [...new Set(this.APPROVAL_LIST.map(item => item.HQ_CODE))];
          hq.forEach((element:any) => {
            this.HQ_LIST.push({label:element,value:element})
          })

          const fm = [...new Set(this.APPROVAL_LIST.map(item => item.FM))];
          fm.forEach((element:any) => {
            this.FM_LIST.push({label:element,value:element})
          })

          const rsm = [...new Set(this.APPROVAL_LIST.map(item => item.RSM))];
          rsm.forEach((element:any) => {
            this.RSM_LIST.push({label:element,value:element})
          })

          const sm = [...new Set(this.APPROVAL_LIST.map(item => item.SM))];
          sm.forEach((element:any) => {
            this.SM_LIST.push({label:element,value:element})
          })

          const doc = [...new Set(this.APPROVAL_LIST.map(item => item.DOCTOR_NAME))];
          doc.forEach((element:any) => {
            this.DOC_LIST.push({label:element,value:element})
          })

          const freeqty = [...new Set(this.APPROVAL_LIST.map(item => item.FREE_QTY_DATA))];
          freeqty.forEach((element:any) => {
            this.FREE_QTY_LIST.push({label:element,value:element})
          })

          const prod = [...new Set(this.APPROVAL_LIST.map(item => item.PRODUCT_DESC))];
          prod.forEach((element:any) => {
            this.PROC_LIST.push({label:element,value:element})
          })


        }
        if(val == 1){
          if(this.ClaimApprovalListLength == 1){
            this.dt11.clear();  
            }
        }
      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  
  toggleCheckboxAll(event: any) {
    if(event.target.checked){
      this.selectAll = true;
      for(let i = 0;i<this.APPROVAL_LIST.length;i++){
        this.APPROVAL_LIST[i].SELECTED = true

      }

    }
    else{
      this.selectAll = false;
      for(let i = 0;i<this.APPROVAL_LIST.length;i++){
        this.APPROVAL_LIST[i].SELECTED = false
      }
    }
  }

  singleCheckbox(event: any,data:any,selectedRow:number) {
    console.log(this.selectedApprovalData,"selectedApprovalData")
    if (event.target.checked == false){
      this.selectAll = false;
    }
  }
  onDiscountDitails(data:any){
    localStorage.setItem("DISCOUNT_APPROVE_DETAILS",JSON.stringify(data))
    this.router.navigate(['/discountapprovedetails'])

  }
  onClickApproveList(){
    this.userInfo = this.authService.getUserDetail();
    this.userData = this.authService.getUserDetail();
    var userid=JSON.parse(this.userInfo).USER_ID
    var saleRoleId=JSON.parse(this.userData).SALESROLE_ID

    // this.ApproveData=[];
    // var j=0;
    // for(let i=0; i<this.APPROVAL_LIST.length;i++){
    //   if(this.APPROVAL_LIST[i].SELECTED == true){
    //     this.ApproveData[j]={
    //       "REQUEST_ID":this.APPROVAL_LIST[i].REQUEST_ID,
    //       "USER_ID":userid,
    //       "SALES_ROLE_ID":saleRoleId,
    //       "STATUS":1,
    //       "SALE_QTY":this.APPROVAL_LIST[i].UPDATED_SALE_QTY,
    //       "FREE_QTY":this.APPROVAL_LIST[i].UPDATED_FREE_QTY,
    //       "LAST_VISIT_DATE":this.APPROVAL_LIST[i].LAST_VISIT_DATE,
    //       "REMARKS":""
    //     }
    //     j++;
    //   }
    // }

    this.ApproveData=[];
    var j=0;
    for(let i=0; i<this.selectedApprovalData.length;i++){
     
        this.ApproveData[j]={
          "REQUEST_ID":this.selectedApprovalData[i].REQUEST_ID,
          "USER_ID":userid,
          "SALES_ROLE_ID":saleRoleId,
          "STATUS":1,
          "SALE_QTY":this.selectedApprovalData[i].UPDATED_SALE_QTY,
          "FREE_QTY":this.selectedApprovalData[i].UPDATED_FREE_QTY,
          "LAST_VISIT_DATE":this.selectedApprovalData[i].LAST_VISIT_DATE,
          "REMARKS":""
        }
        j++;
      
    }
    // console.log(this.ApproveData,"ApproveData")

    if(this.ApproveData.length == 0){
      this.toastrService.error("Please Select Atleast One Request");
      return;
    }
    let data={
      APPROVAL_DETAILS:this.ApproveData
    }

    this.http.postnew(this.url.APPROVECLAIMREQUEST,data).then(
      (res:any)=>{
        this.isLoaded= false;

        if(res.FLAG == true){
          this.toastrService.success(res.MSG);
          this.ApproveData=[];
          this.selectAll = false;
          //this.clear(this.dt11)
          this.getDisplayedRowCount()
          sessionStorage.removeItem("statedemo-session2");
          // console.log('ClaimApprovalListLength -> ' , this.ClaimApprovalListLength)
          // this.dt11.clear();
          this.dt11.selection = [];
          this.GETCLAIMAPPROVALLISTBYUSERID(1)
        }
        else{
          this.toastrService.error(res.MSG);
        }

      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  clear(table: Table) {
    sessionStorage.removeItem("statedemo-session2")
    this.dt11.clear()
  }
  filterGlobal(event:any,val:any){
    console.log(event,val,"events")
  }

  loadDataLazily(e: any) {
    sessionStorage.setItem("filter",JSON.stringify(e));
    if(this.cachedTableEvent){
        e = this.cachedTableEvent;
      //   for (var key in this.cachedTableEvent['filters']) {
      //     if (this.cachedTableEvent['filters'].hasOwnProperty(key)) {
      //        switch(key){
      //           // @ts-ignore
      //             case "HQ":
      //                   this.HQ = this.cachedTableEvent['filters'][key].value;
      //              // @ts-ignore
      //             case "DOCTOR_NAME":
      //                   this.DOCTOR_NAME = this.cachedTableEvent['filters'][key].value;
      //             case "CHEMIST_NAME":
      //                   this.CHEMIST_NAME = this.cachedTableEvent['filters'][key].value;       
      //        }
      //     }
      //  }
      this.cachedTableEvent = null;
    }
    console.log( this.cachedTableEvent,"cache")
    //fetchRecordFromBackend(e);
  }

  getDisplayedRowCount(): number {
    if (this.dt11.filteredValue) {
      return this.ClaimApprovalListLength = this.dt11.filteredValue.length;
    } else {
      return this.ClaimApprovalListLength = this.dt11.value ? this.dt11.value.length : 0;
    }
  }
}
