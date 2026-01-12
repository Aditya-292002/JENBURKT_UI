import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-my-claim-request-details',
  templateUrl: './my-claim-request-details.component.html',
  styleUrls: ['./my-claim-request-details.component.css']
})
export class MyClaimRequestDetailsComponent implements OnInit {
    myClaimRequst:any=[];
    OnFMShowHide:boolean;
    OnRSMShowHide:boolean;
    OnSMShowHide:boolean;
    OnPMTShowHide:boolean;
    isLoaded:boolean;
    INVOICE_DATE:any;
    imageData:any='';
    myclaimrequestImage:boolean;
  constructor(private router: Router,private authService: AuthService,private url: URLService,private http: HttpService,
    private toastrService:ToastrService,public datepipe: DatePipe,private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
   this.myClaimRequst= JSON.parse(localStorage.getItem("MY_CLAIM_REQUEST"));
   console.log(' this.myClaimRequst', this.myClaimRequst)
 if (this.myClaimRequst?.INVOICE_DATE) {
    this.myClaimRequst.INVOICE_DATE =
      new Date(this.myClaimRequst.INVOICE_DATE);
  }
   if(this.myClaimRequst.FMSTATUS!=null){
    this.OnFMShowHide=true;

   }else{
    this.OnFMShowHide=false;
   }
   if(this.myClaimRequst.RSMSTATUS!=null){
    this.OnRSMShowHide=true;

   }else{
    this.OnRSMShowHide=false;
   }
   if(this.myClaimRequst.SMSTATUS !=null){
    this.OnSMShowHide=true;

   }else{

    this.OnSMShowHide=false;
   }
   if(this.myClaimRequst.PMT_STATUS!=null){
    this.OnPMTShowHide=true;

   }else{

    this.OnPMTShowHide=false;
   }
  }

  GETINVOICEIMAGEBYCLAIMNO(){
    let data={
      CLAIM_NO:this.myClaimRequst.CLAIM_NO
    }
    this.isLoaded= true;
    this.http.postnew(this.url.GETINVOICEIMAGEBYCLAIMNO,data).then(
      (res:any)=>{
        this.isLoaded= false;
      console.log('res',res)
         this.imageData=res.data
         if(this.imageData==""){
          this.toastrService.error("No Image Found");
          return;
         }
         this.imageData = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                 + res.data);
                 this.myclaimrequestImage=true;

      },
      error =>{
        console.log(error);
        this.isLoaded= false;
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  onBackClick(){
    this.router.navigate(['/myclaimrequest'])
  }

    updateInvoiceDate(){
    let data={
      CLAIM_NO:this.myClaimRequst.CLAIM_NO,
      CLAIM_ID:this.myClaimRequst.CLAIM_ID,
      INVOICE_DATE:this.myClaimRequst.INVOICE_DATE
    }
    console.log('data',data);

    this.isLoaded= true;
    this.http.postnew(this.url.UPDATEiNVOICEDATE,data).then(
      (res:any)=>{
        this.isLoaded= false;
      console.log('res',res)
      // this.onBackClick();
      this.toastrService.success("Invoice Date Updated Successfully");
      },
      error =>{
        console.log(error);
        this.isLoaded= false;
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

}
