import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-claim-approve',
  templateUrl: './claim-approve.component.html',
  styleUrls: ['./claim-approve.component.css']
})
export class ClaimApproveComponent implements OnInit {
  @ViewChild('dt1') dt1: Table | undefined;
  CLAIM_APPROVAL_LIST:any=[];
  userInfo:any;
  userData:any;
  isLoaded:boolean;
  selectAll:any;
  ClaimApproveData:any=[];
  HQ_LIST:any = [];
  FM_LIST:any = [];
  RSM_LIST:any = [];
  SM_LIST:any = [];
  DOC_LIST:any = [];
  FREE_QTY_LIST:any = [];
  PROC_LIST:any = [];
  cachedTableEvent:any;
  selectedApprovalData:any = [];
  ClaimApprovalListLength:any;

  constructor(private router: Router,private authService: AuthService,private url: URLService,private http: HttpService,
    private toastrService:ToastrService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    localStorage.removeItem("CLAIM_APPROVE_LIST")
    this.selectedApprovalData = [];
    this.GETCLAIMREQUESTFORAPPROVAL(0);
  }

  checkNaN(value: any){
    return isNaN(value);
  }

  GETCLAIMREQUESTFORAPPROVAL(val:any){
    this.userInfo = this.authService.getUserDetail();
    this.userData = this.authService.getUserDetail();
    var userid=JSON.parse(this.userInfo).USER_ID
    var saleRoleId=JSON.parse(this.userData).SALESROLE_ID
    let data={
      USER_ID:userid,
      SALES_ROLE_ID:saleRoleId

    }
    this.http.postnew(this.url.GETCLAIMREQUESTFORAPPROVAL,data).then(
      (res:any)=>{
        this.isLoaded= false;
        this.CLAIM_APPROVAL_LIST=res.APPROVAL_LIST

        this.HQ_LIST = [];
        this.FM_LIST = [];
        this.RSM_LIST = [];
        this.SM_LIST = [];
        this.DOC_LIST = [];
        this.FREE_QTY_LIST = [];
        this.PROC_LIST = [];
        for(let i=0;i<this.CLAIM_APPROVAL_LIST.length;i++){
          this.CLAIM_APPROVAL_LIST[i].FREE_QTY_DATA = this.checkNaN((( this.CLAIM_APPROVAL_LIST[i].CLAIM_FREE_QTY/ this.CLAIM_APPROVAL_LIST[i].INVOICE_SALE_QTY)*100).toFixed(2)) ? 0 :
          (( this.CLAIM_APPROVAL_LIST[i].CLAIM_FREE_QTY/ this.CLAIM_APPROVAL_LIST[i].INVOICE_SALE_QTY)*100).toFixed(2)
        }

        if(this.CLAIM_APPROVAL_LIST.length > 0){
          const hq = [...new Set(this.CLAIM_APPROVAL_LIST.map(item => item.HQ_CODE))];
          hq.forEach((element:any) => {
            this.HQ_LIST.push({label:element,value:element})
          })

          const fm = [...new Set(this.CLAIM_APPROVAL_LIST.map(item => item.FM))];
          fm.forEach((element:any) => {
            this.FM_LIST.push({label:element,value:element})
          })

          const rsm = [...new Set(this.CLAIM_APPROVAL_LIST.map(item => item.RSM))];
          rsm.forEach((element:any) => {
            this.RSM_LIST.push({label:element,value:element})
          })

          const sm = [...new Set(this.CLAIM_APPROVAL_LIST.map(item => item.SM))];
          sm.forEach((element:any) => {
            this.SM_LIST.push({label:element,value:element})
          })

          const doc = [...new Set(this.CLAIM_APPROVAL_LIST.map(item => item.DOCTOR_NAME))];
          doc.forEach((element:any) => {
            this.DOC_LIST.push({label:element,value:element})
          })

          const freeqty = [...new Set(this.CLAIM_APPROVAL_LIST.map(item => item.FREE_QTY_DATA))];
          freeqty.forEach((element:any) => {
            this.FREE_QTY_LIST.push({label:element,value:element})
          })

          const prod = [...new Set(this.CLAIM_APPROVAL_LIST.map(item => item.PRODUCT_DESC))];
          prod.forEach((element:any) => {
            this.PROC_LIST.push({label:element,value:element})
          })

          if(val == 1){
            if(this.ClaimApprovalListLength == 1){
              this.dt1.clear();  
              }
          }
        }
      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  onDiscountDitails(data){
    localStorage.setItem("CLAIM_APPROVE_LIST",JSON.stringify(data))
    this.router.navigate(['/claimapprovedetails'])
  }

  toggleCheckboxAll(event: any) {
    // console.log(event.target.checked,"event")
    // console.log(this.selectedApprovalData,"selectedApprovalData")
    if(event.target.checked){
      // console.log("true")
      this.selectAll = true;
      for(let i = 0;i<this.CLAIM_APPROVAL_LIST.length;i++){
        this.CLAIM_APPROVAL_LIST[i].SELECTED = true

      }

    }
    else{
      this.selectAll = false;
      for(let i = 0;i<this.CLAIM_APPROVAL_LIST.length;i++){
        this.CLAIM_APPROVAL_LIST[i].SELECTED = false
      }
    }
    // console.log(this.CLAIM_APPROVAL_LIST,"clainm-list-new")
  }
  singleCheckbox(event: any,data:any,selectedRow:number) {
    // console.log(event,"eventsdes")
    // console.log(this.selectedApprovalData,"selectedApprovalData")
    if (event.target.checked == false){
      this.selectAll = false;
    }
  }

  onClickClaimApproveList(){
    this.userInfo = this.authService.getUserDetail();
    this.userData = this.authService.getUserDetail();
    var userid=JSON.parse(this.userInfo).USER_ID
    var saleRoleId=JSON.parse(this.userData).SALESROLE_ID
    // this.ClaimApproveData=[];
    // var j=0;
    // for(let i=0; i<this.CLAIM_APPROVAL_LIST.length;i++){
    //   if(this.CLAIM_APPROVAL_LIST[i].SELECTED == true){
    //     this.ClaimApproveData[j]={
    //       "CLAIM_ID":this.CLAIM_APPROVAL_LIST[i].CLAIM_ID,
    //       "USER_ID":userid,
    //       "SALES_ROLE_ID":saleRoleId,
    //       "STATUS":1,
    //       "FREE_QTY":this.CLAIM_APPROVAL_LIST[i].CLAIM_FREE_QTY,
    //       "SCHEME_FREE_QTY": (this.CLAIM_APPROVAL_LIST[i].SCHEME_FREE_QTY == null || this.CLAIM_APPROVAL_LIST[i].SCHEME_FREE_QTY == undefined) ? 0 : this.CLAIM_APPROVAL_LIST[i].SCHEME_FREE_QTY,
    //       "REMARKS":""
    //     }
    //     j++;
    //   }
    // }

    this.ClaimApproveData=[];
    var j=0;
    for(let i=0; i<this.selectedApprovalData.length;i++){
      
        this.ClaimApproveData[j]={
          "CLAIM_ID":this.selectedApprovalData[i].CLAIM_ID,
          "USER_ID":userid,
          "SALES_ROLE_ID":saleRoleId,
          "STATUS":1,
          "FREE_QTY":this.selectedApprovalData[i].CLAIM_FREE_QTY,
          "SCHEME_FREE_QTY": (this.selectedApprovalData[i].SCHEME_FREE_QTY == null || this.selectedApprovalData[i].SCHEME_FREE_QTY == undefined) ? 0 : this.selectedApprovalData[i].SCHEME_FREE_QTY,
          "REMARKS":""
        }
        j++;
    }

    // console.log(this.ClaimApproveData,"ClaimApproveData")

    if(this.ClaimApproveData.length == 0){
      this.toastrService.error("Please Select Atleast One Request");
      return;
    }
    let data={
      APPROVAL_DETAILS:this.ClaimApproveData
    }
  
    this.isLoaded =true;
    this.http.postnew(this.url.APPROVECLAIMREQUESTBYROLEID, data).then(
      (res: any) => {
        if(res.FLAG == true){
           this.isLoaded = false;
            this.toastrService.success(res.MSG)
            this.ClaimApproveData=[];
            this.selectedApprovalData = [];
            this.selectAll = false;
            //this.clear(this.dt1)
            // const storedFilter = sessionStorage.getItem('statedemo-session5');
            // if (storedFilter) {
            //   this.dt1.filters['global'] = { value: null, matchMode: 'equals' };
            // }
            this.getDisplayedRowCount()
            // console.log('ClaimApprovalListLength ->' , this.ClaimApprovalListLength)
            sessionStorage.removeItem("statedemo-session5");
            this.dt1.selection = [];
            // this.dt1.clear();  
            this.GETCLAIMREQUESTFORAPPROVAL(1);
            }
        else{
          this.isLoaded = false;
          this.toastrService.error(res.MSG)
        }

      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  clear(table: Table) {
    sessionStorage.removeItem("statedemo-session5")
    this.dt1.clear()
    // console.log('CLAIM_APPROVAL_LIST ->' , this.CLAIM_APPROVAL_LIST)
    // this.CLAIM_APPROVAL_LIST.forEach((element:any)=>{
    //   if(element.SELECTED == true){
    //     console.log('SELECTED CLAIM_NO ->' , element)
    //     element.SELECTED = false
    //   }
    // })
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
    if (this.dt1.filteredValue) {
      return this.ClaimApprovalListLength = this.dt1.filteredValue.length;
    } else {
      return this.ClaimApprovalListLength = this.dt1.value ? this.dt1.value.length : 0;
    }
  }

 
}
