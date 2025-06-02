import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-claim-request',
  templateUrl: './claim-request.component.html',
  styleUrls: ['./claim-request.component.css']
})
export class ClaimRequestComponent implements OnInit {
  @ViewChild('dt1') dt1: Table | undefined;
  selectedDataUpdated:any = [];
  selectedData:any = [];
  CLAIM_LIST:any=[];
  userInfo:any;
  userData:any;
  isLoaded:boolean;
  HQDESC:any;
  selectAll:any;
  HQ_LIST:any = [];
  DOC_LIST:any = [];
  STOC_LIST:any = [];
  CHEM_LIST:any = [];
  PROC_LIST:any = [];
  HQ_CODE:any = 'ASKLM014';
  hq:any ="ASTNM032";
  cachedTableEvent:any;
  HQ:any = "";
  DOCTOR_NAME:any = "";
  CHEMIST_NAME:any = "";
  constructor(private router: Router,private authService: AuthService,private url: URLService,private http: HttpService,
    private toastrService:ToastrService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    localStorage.removeItem("CLAIM_DETAILS");
    localStorage.removeItem("SELECTED_DATA");
    this.GETAPPROVEDCLAIMLIST()
    this.cachedTableEvent = JSON.parse(sessionStorage.getItem("filter"));
  }
  
  GETAPPROVEDCLAIMLIST(){
    this.userInfo = this.authService.getUserDetail();
    this.userData = this.authService.getUserDetail();
    var userid=JSON.parse(this.userInfo).USER_ID
    var saleRoleId=JSON.parse(this.userData).SALESROLE_ID
    let data={
      USER_ID:userid,
      SALES_ROLE_ID:saleRoleId
    }
    this.isLoaded= true;
    this.http.postnew(this.url.GETAPPROVEDCLAIMLIST,data).then(
      (res:any)=>{
        this.isLoaded= false;
        this.CLAIM_LIST=res.CLAIM_LIST
        this.HQ_LIST = [];
        this.DOC_LIST = [];
        this.STOC_LIST = [];
        
        const hq = [...new Set(this.CLAIM_LIST.map(item => item.HQ_CODE))];
        hq.forEach((element:any) => {
          this.HQ_LIST.push({label:element,value:element})
        })

        const doc = [...new Set(this.CLAIM_LIST.map(item => item.DOCTOR_NAME))];
        doc.forEach((element:any) => {
          this.DOC_LIST.push({label:element,value:element})
        })

        const stoc = [...new Set(this.CLAIM_LIST.map(item => item.STOCKIST_NAME))];
        stoc.forEach((element:any) => {
          this.STOC_LIST.push({label:element,value:element})
        })

        const chem = [...new Set(this.CLAIM_LIST.map(item => item.CHEMIST_NAME))];
        chem.forEach((element:any) => {
          this.CHEM_LIST.push({label:element,value:element})
        })

        const proc = [...new Set(this.CLAIM_LIST.map(item => item.PRODUCT_DESC))];
        proc.forEach((element:any) => {
          this.PROC_LIST.push({label:element,value:element})
        })

      },
      error =>{
        this.isLoaded= false;
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  onDiscountDitails(data){
    console.log(data,"data")
    this.selectedDataUpdated = [];
    this.selectedData = [];
    this.selectedData.push(data)
    for(let i=0;i<this.selectedData.length;i++){
        this.selectedDataUpdated[i] = {
          "REQUEST_ID" : this.selectedData[i].REQUEST_ID,
          "REQUEST_NO": this.selectedData[i].REQUEST_NO,
          "CHEMIST_NAME" : this.selectedData[i].CHEMIST_NAME,
          "STOCKIST_NAME": this.selectedData[i].STOCKIST_NAME,
          "FINAL_SALE_QTY" : this.selectedData[i].FINAL_SALE_QTY,
          "FINAL_FREE_QTY" : this.selectedData[i].FINAL_FREE_QTY,
          "PRODUCT_CODE" : this.selectedData[i].PRODUCT_CODE,
          "PRODUCT_DESC" : this.selectedData[i].PRODUCT_DESC,
          "STOCKIST_CODE" : this.selectedData[i].STOCKIST_CODE,
          "DOCTOR_NAME" : this.selectedData[i].DOCTOR_NAME

        }
      }

    // localStorage.setItem("CLAIM_DETAILS",JSON.stringify(data))
    localStorage.setItem("SELECTED_DATA",JSON.stringify(this.selectedDataUpdated))
   this.router.navigate(['/claimdetails'])
  }
  onMyClaimRequest(){
    this.router.navigate(['/myclaimrequest'])
  }
  toggleCheckboxAll(event: any) {
    if(event.target.checked){
      this.selectAll = true;
      for(let i = 0;i<this.CLAIM_LIST.length;i++){
        this.CLAIM_LIST[i].SELECTED = true

      }

    }
    else{
      this.selectAll = false;
      for(let i = 0;i<this.CLAIM_LIST.length;i++){
        this.CLAIM_LIST[i].SELECTED = false
      }
    }
  }

  singleCheckbox(event: any,data:any,selectedRow:number) {
    if(event.target.checked){
      this.selectedData.push(data)
      for(let i = 0;i<this.CLAIM_LIST.length;i++){
        if(this.CLAIM_LIST[i].STOCKIST_CODE ==  data.STOCKIST_CODE && this.CLAIM_LIST[i].CHEMIST_ID == data.CHEMIST_ID){
          // this.CLAIM_LIST[i].SELECTED = true;
          this.CLAIM_LIST[i].IS_DISABLED = false;

        }
        else{
          this.CLAIM_LIST[i].IS_DISABLED = true;
        }
      }
    }
    else{
      for(let i = 0;i<this.selectedData.length;i++){
        if(this.selectedData[i].REQUEST_ID == data.REQUEST_ID){
          this.selectedData.splice(i,1)
        }
      }

      if(this.selectedData.length == 0){
        for(let i = 0;i<this.CLAIM_LIST.length;i++){

            this.CLAIM_LIST[i].IS_DISABLED = false

        }

      }
    }


  }
  onAddRequestDetails(){

    if(this.selectedData.length == 0){
      this.toastrService.error("Please Select Atleast one checkbox");
      return;
    }else{
      this.selectedDataUpdated = [];
      for(let i=0;i<this.selectedData.length;i++){
        this.selectedDataUpdated[i] = {
          "REQUEST_ID" : this.selectedData[i].REQUEST_ID,
          "REQUEST_NO": this.selectedData[i].REQUEST_NO,
          "CHEMIST_NAME" : this.selectedData[i].CHEMIST_NAME,
          "STOCKIST_NAME": this.selectedData[i].STOCKIST_NAME,
          "FINAL_SALE_QTY" : this.selectedData[i].FINAL_SALE_QTY,
          "FINAL_FREE_QTY" : this.selectedData[i].FINAL_FREE_QTY,
          "PRODUCT_CODE" : this.selectedData[i].PRODUCT_CODE,
          "PRODUCT_DESC" : this.selectedData[i].PRODUCT_DESC,
          "STOCKIST_CODE" : this.selectedData[i].STOCKIST_CODE,
          "DOCTOR_NAME" : this.selectedData[i].DOCTOR_NAME

        }
      }

      localStorage.setItem("SELECTED_DATA",JSON.stringify(this.selectedDataUpdated))
      this.router.navigate(["/claimdetails"])
    }

  }

  clear(table: Table) {
    sessionStorage.removeItem("statedemo-session3")
    this.dt1.clear()
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
}
