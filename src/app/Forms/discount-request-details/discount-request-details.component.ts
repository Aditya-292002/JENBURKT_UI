import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-discount-request-details',
  templateUrl: './discount-request-details.component.html',
  styleUrls: ['./discount-request-details.component.css']
})
export class DiscountRequestDetailsComponent implements OnInit {
  discountrequestdetails:any=[];
  OnFMShowHide:boolean;
  OnRSMShowHide:boolean;
  OnSMShowHide:boolean;
  OnPMTShowHide:boolean;
  isLoaded:boolean;
  constructor(private router: Router,private authService: AuthService,private url: URLService,private http: HttpService,
    private toastrService:ToastrService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.discountrequestdetails=JSON.parse(localStorage.getItem("DISCOUNT_REQUEST_DETAILS"));
    // console.log(" this.discountrequestdetails", this.discountrequestdetails)


   if(this.discountrequestdetails.FMSTATUS!=null){
    this.OnFMShowHide=true;

   }
   else{
    this.OnFMShowHide=false;
   }
   if(this.discountrequestdetails.RSMSTATUS!=null){
    this.OnRSMShowHide=true;

   }else{
    this.OnRSMShowHide=false;
   }
   if(this.discountrequestdetails.SMSTATUS !=null){
    this.OnSMShowHide=true;

   }else{

    this.OnSMShowHide=false;
   }
   if(this.discountrequestdetails.PMTSTATUS!=null){
    this.OnPMTShowHide=true;

   }else{

    this.OnPMTShowHide=false;
   }
  }


  onBackClick(){
  this.router.navigate(['/requestdiscountlist'])
  }

}
