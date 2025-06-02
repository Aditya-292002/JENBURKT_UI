import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-my-claim-request',
  templateUrl: './my-claim-request.component.html',
  styleUrls: ['./my-claim-request.component.css']
})
export class MyClaimRequestComponent implements OnInit {
  @ViewChild('dt1') dt1: Table | undefined;
  CLAIM_LIST:any=[];
  userInfo:any;
  userData:any;
  isLoaded:boolean;
  HQ_LIST:any = [];
  DOC_LIST:any = [];
  PROD_LIST:any = [];
  STOC_LIST:any = [];
  CHEM_LIST:any = [];
  PROC_LIST:any = [];
  cachedTableEvent:any;
  
  constructor(private router: Router,private authService: AuthService,private url: URLService,private http: HttpService,
    private toastrService:ToastrService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    localStorage.removeItem("MY_CLAIM_REQUEST")

    this.GETCLAIMTRACKLIST();
    this.cachedTableEvent = JSON.parse(sessionStorage.getItem("filter"));

  }
  GETCLAIMTRACKLIST(){
    this.userInfo = this.authService.getUserDetail();
    this.userData = this.authService.getUserDetail();
    var userid=JSON.parse(this.userInfo).USER_ID
    var saleRoleId=JSON.parse(this.userData).SALESROLE_ID
    let data={
      USER_ID:userid,
      SALES_ROLE_ID:saleRoleId
    }
    this.http.postnew(this.url.GETCLAIMTRACKLIST,data).then(
      (res:any)=>{
        this.isLoaded= false;
         this.CLAIM_LIST=res.CLAIM_LIST

        this.HQ_LIST = [];
        this.DOC_LIST = [];
        this.PROD_LIST = [];
        this.STOC_LIST = [];
        this.CHEM_LIST = [];
        this.PROC_LIST = [];

        if(this.CLAIM_LIST.length > 0){
          const hq = [...new Set(this.CLAIM_LIST.map(item => item.HQ_DESC))];
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

        }
      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  onDiscountDitails(data){
    console.log('data',data)
    localStorage.setItem("MY_CLAIM_REQUEST",JSON.stringify(data))
    this.router.navigate(['/myclaimrequestdetails']);

  }
  onBackClick(){
    this.router.navigate(['/claimrequest']);
  }

  clear(table: Table) {
    sessionStorage.removeItem("statedemo-session4")
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
