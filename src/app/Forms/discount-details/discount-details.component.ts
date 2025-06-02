import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.css']
})
export class DiscountDetailsComponent implements OnInit {
  isLoaded:boolean;
  REQUEST_ID:any;
  OnFMShowHide:boolean;
  OnRSMShowHide:boolean;
  OnSMShowHide:boolean;
  OnPMTShowHide:boolean;
  OnClaimFMShowHide:boolean;
  OnClaimRSMShowHide:boolean;
  OnClaimSMShowHide:boolean;
  OnClaimPMTShowHide:boolean;
  REQUEST_DETAILS:any = [];
  CLAIM_DETAILS:any = [];
  isCollapsed: boolean[] = [];
  isCollapsed1: boolean[] = [];
  
  constructor(private router: Router,private authService: AuthService,private url: URLService,
    private http: HttpService,private toastrService:ToastrService,public datepipe: DatePipe,private Common:CommonService) { }

  ngOnInit(): void {
    this.REQUEST_ID = localStorage.getItem('REQUEST_ID');
    this.GETREQUESTDETAILSBYREQUESTID();
  }

  GETREQUESTDETAILSBYREQUESTID(){
    let data={
      "REQUEST_ID": this.REQUEST_ID
    }
    this.isLoaded = true;
    this.http.postnew(this.url.GETREQUESTDETAILSBYREQUESTID, data).then(
      (res:any)=>{
        this.REQUEST_DETAILS = res.REQUEST_DETAILS;
        this.CLAIM_DETAILS = res.CLAIM_DETAILS;
        
   if(this.REQUEST_DETAILS[0]?.FMSTATUS!=null){
    this.OnFMShowHide=true;
   }
   else{
    this.OnFMShowHide=false;
   }
   if(this.REQUEST_DETAILS[0]?.RSMSTATUS!=null){
    this.OnRSMShowHide=true;

   }else{
    this.OnRSMShowHide=false;
   }
   if(this.REQUEST_DETAILS[0]?.SMSTATUS !=null){
    this.OnSMShowHide=true;

   }else{
    this.OnSMShowHide=false;
   }
   if(this.REQUEST_DETAILS[0]?.PMTSTATUS!=null){
    this.OnPMTShowHide=true;
   }else{
    this.OnPMTShowHide=false;
   }
   if(this.REQUEST_DETAILS[0]?.CLAIM_FMSTATUS!=null){
    this.OnClaimFMShowHide=true;
   }else{this.OnClaimFMShowHide=false;
   }
   this.CLAIM_DETAILS.forEach((element:any)=>{
    if(element?.CLAIM_RSMSTATUS!=null){
    this.OnClaimRSMShowHide=true;
   }else{this.OnClaimRSMShowHide=false;
   }
   if(element?.CLAIM_SMSTATUS!=null){
    this.OnClaimSMShowHide=true;
   }else{this.OnClaimSMShowHide=false;
   }
   if(element?.CLAIM_PMT_STATUS!=null){
    this.OnClaimPMTShowHide=true;
   }else{this.OnClaimPMTShowHide=false;
   }
    });
        this.isLoaded= false;
      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
        this.isLoaded = false;
      }
    );
  }

  BackToDiscountDetailsList(){
    this.router.navigate(['discountdetailslist'])
  }

  toggleCollapse(index: number) {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }

toggleCollapse2(index: number) {
  this.isCollapsed1[index] = !this.isCollapsed1[index];
}

}
