import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-request-discount-list',
  templateUrl: './request-discount-list.component.html',
  styleUrls: ['./request-discount-list.component.css']
})
export class RequestDiscountListComponent implements OnInit {
  @ViewChild('dt1') dt1: Table | undefined;

  Req_Discount:any;
  Req_Discount_LIST:any=[];
Header:any=[];
Values:any=[];
userInfo:any;
CLAIM_LIST:any=[];
isLoaded:boolean
HQ_LIST:any =[];
DOC_LIST:any = [];
RSM_LIST:any = [];
PROD_LIST:any = [];

color:any='bg-warning'
cachedTableEvent:any;
  constructor(private router: Router,private authService: AuthService,private url: URLService,private http: HttpService,
    private toastrService:ToastrService,public datepipe: DatePipe) { }

  ngOnInit(): void {
     localStorage.removeItem("DISCOUNT_REQUEST_DETAILS")
     this.cachedTableEvent = JSON.parse(sessionStorage.getItem("filter"));

    this.GETDISCOUNTCLAIMLIST();
  }

  GETDISCOUNTCLAIMLIST(){
    this.userInfo = this.authService.getUserDetail();
    var userid=JSON.parse(this.userInfo).USER_ID
    let data={
      USER_ID:userid,
    }
    this.http.postnew(this.url.GETDISCOUNTCLAIMLIST,data).then(
      (res:any)=>{
        this.isLoaded= false;
        this.CLAIM_LIST=res.CLAIM_LIST

        this.HQ_LIST = [];
        this.DOC_LIST = [];
        this.PROD_LIST = [];

        if(this.CLAIM_LIST.length > 0){
          const hq = [...new Set(this.CLAIM_LIST.map(item => item.HQ_DESC))];
          hq.forEach((element:any) => {
            this.HQ_LIST.push({label:element,value:element})
          })

          const doc = [...new Set(this.CLAIM_LIST.map(item => item.DOCTOR_NAME))];
          doc.forEach((element:any) => {
            this.DOC_LIST.push({label:element,value:element})
          })

          const prod = [...new Set(this.CLAIM_LIST.map(item => item.PRODUCT_DESC))];
          prod.forEach((element:any) => {
            this.PROD_LIST.push({label:element,value:element})
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
     localStorage.setItem("DISCOUNT_REQUEST_DETAILS",JSON.stringify(data));
     this.router.navigate(['/discountrequestdetails']);

  }

  onBackClick(){
    this.router.navigate(["/adddiscount"])
  }

  clear(table: Table) {
    sessionStorage.removeItem("statedemo-session1")
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
