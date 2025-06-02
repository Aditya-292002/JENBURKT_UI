import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/Service/auth.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-discount-details-list',
  templateUrl: './discount-details-list.component.html',
  styleUrls: ['./discount-details-list.component.css']
})
export class DiscountDetailsListComponent implements OnInit {
  @ViewChild('dt1') dt1: Table | undefined;
  cachedTableEvent:any;
  DISCOUNT_DETAILS_LIST:any = [];
  isLoaded:boolean;
  DISCOUNT_DETAILS_FROM_DATE:any = new Date();
  DISCOUNT_DETAILS_TO_DATE:any = new Date();
  HQ_LIST:any = [];
  HQ_CODE:any = ""
  userInfo:any = {};
  Today:any = new Date();
  REQUEST_ID:any;

  constructor(private router: Router,private authService: AuthService,private url: URLService,
    private http: HttpService,private toastrService:ToastrService,public datepipe: DatePipe,private Common:CommonService) { }

  ngOnInit(): void {
    localStorage.removeItem('REQUEST_ID')
    this.userInfo = JSON.parse(this.authService.getUserDetail());
    this.cachedTableEvent = JSON.parse(sessionStorage.getItem("filter"));
    let HQ_CODE = JSON.parse(localStorage.getItem('HQ_CODE'));
    let DISCOUNT_DETAILS_FROM_DATE = localStorage.getItem('DISCOUNT_DETAILS_FROM_DATE');
    let DISCOUNT_DETAILS_TO_DATE = localStorage.getItem('DISCOUNT_DETAILS_TO_DATE');
    this.GETHQLISTBYLOGINID();
    if(HQ_CODE == null || DISCOUNT_DETAILS_FROM_DATE == null || DISCOUNT_DETAILS_TO_DATE == null){
      const pastMonth = new Date();
      pastMonth.setMonth(pastMonth.getMonth() - 1); 
      this.DISCOUNT_DETAILS_FROM_DATE = pastMonth;
    }else {
      this.HQ_CODE = HQ_CODE;
      this.DISCOUNT_DETAILS_FROM_DATE = DISCOUNT_DETAILS_FROM_DATE;
      this.DISCOUNT_DETAILS_TO_DATE = DISCOUNT_DETAILS_TO_DATE;
      console.log( this.DISCOUNT_DETAILS_TO_DATE,"this.DISCOUNT_DETAILS_TO_DATE" )
      // let SAMPEL_DISCOUNT_DETAILS_FROM_DATE =  this.datepipe.transform(DISCOUNT_DETAILS_FROM_DATE, 'dd-MM-yy');
      // let SAMPEL_DISCOUNT_DETAILS_TO_DATE = this.datepipe.transform(DISCOUNT_DETAILS_TO_DATE, 'dd-MM-yy'); 
      this.DISCOUNT_DETAILS_FROM_DATE =  new Date(DISCOUNT_DETAILS_FROM_DATE);
      this.DISCOUNT_DETAILS_TO_DATE= new Date(DISCOUNT_DETAILS_TO_DATE); 
      console.log(  this.DISCOUNT_DETAILS_FROM_DATE, this.DISCOUNT_DETAILS_TO_DATE,"dates" )
      this.GETDISCOUNTDETAILSLIST();
      // this.DISCOUNT_DETAILS_FROM_DATE = SAMPEL_DISCOUNT_DETAILS_FROM_DATE;
      // this.DISCOUNT_DETAILS_TO_DATE = SAMPEL_DISCOUNT_DETAILS_TO_DATE;
      
    }
  
  }

  GETHQLISTBYLOGINID() {
    let data={
      "USER_ID": this.userInfo.USER_ID
    }
    this.isLoaded = true;
    this.http.postnew(this.url.GETHQLISTBYLOGINID, data).then(
      (res:any)=>{
        this.HQ_LIST = res.HQ_LIST;
        this.isLoaded= false;
      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
        this.isLoaded = false;
      }
    );
  }

  ViewDiscountList(){
    this.GETDISCOUNTDETAILSLIST();
  }

  GETDISCOUNTDETAILSLIST(){

      if(!this.Common.isValid(this.HQ_CODE)){
         this.toastrService.error('Please select a HQ code');
         return;
      }

    let data = {  
      "USER_ID": this.userInfo.USER_ID,
      "HQ_CODE": this.HQ_CODE.HQ_CODE ? this.HQ_CODE.HQ_CODE : "",
      "DISCOUNT_DETAILS_FROM_DATE": this.datepipe.transform(this.DISCOUNT_DETAILS_FROM_DATE, 'yyyy-MM-dd'),
      "DISCOUNT_DETAILS_TO_DATE": this.datepipe.transform(this.DISCOUNT_DETAILS_TO_DATE, 'yyyy-MM-dd')
    }
      this.isLoaded = true;
      // console.log('data ->' , JSON.stringify(data))
      // return
    this.http.postnew(this.url.GETDISCOUNTDETAILSLIST, data).then(
      (res: any) => {
        this.DISCOUNT_DETAILS_LIST = res.DISCOUNT_DETAILS_LIST;
        this.isLoaded = false;
      },
      error => {
        console.log(error);
        this.isLoaded = false;
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  onDiscountDitails(data:any){
  this.REQUEST_ID = data.REQUEST_ID;
localStorage.setItem('REQUEST_ID',this.REQUEST_ID)
localStorage.setItem('HQ_CODE',JSON.stringify(this.HQ_CODE))
localStorage.setItem('DISCOUNT_DETAILS_FROM_DATE',this.DISCOUNT_DETAILS_FROM_DATE)
localStorage.setItem('DISCOUNT_DETAILS_TO_DATE',this.DISCOUNT_DETAILS_TO_DATE)
this.router.navigate(['discountdetails'])
  }

  localstorageclear(){
    localStorage.removeItem('HQ_CODE')
    localStorage.removeItem('DISCOUNT_DETAILS_FROM_DATE')
    localStorage.removeItem('DISCOUNT_DETAILS_TO_DATE')
    window.location.reload();
  }
  
  loadDataLazily(e: any) {
    sessionStorage.setItem("filter",JSON.stringify(e));
    if(this.cachedTableEvent){
        e = this.cachedTableEvent;
      this.cachedTableEvent = null;
    }
    // console.log( this.cachedTableEvent,"cache")
  }
}
