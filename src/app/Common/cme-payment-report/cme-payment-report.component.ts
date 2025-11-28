import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/Service/auth.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';


@Component({
  selector: 'app-cme-payment-report',
  templateUrl: './cme-payment-report.component.html',
  styleUrls: ['./cme-payment-report.component.css']
})
export class CmePaymentReportComponent {
 @ViewChild('dt1') dt1: Table| undefined;

  CME_PAYMENT_LIST:any = [];
  isLoaded:boolean;
  selectedApprovalData:any = [];
  userInfo:any = {};
  CME_ID:any;
  CmeApproveData:any = [];
  ClaimApproveData:any = [];
  selectAll:boolean = false;
  IS_VIEW:any = 1;
  IS_APPROVAL:any= 0;
  IS_APPROVED:any;

  constructor(private authService:AuthService,private url:URLService,private http:HttpService,
    private toastrService:ToastrService,private common:CommonService,private router:Router) { }


  ngOnInit(): void {
    localStorage.removeItem('CME_ID');
    localStorage.removeItem('IS_VIEW');
    localStorage.removeItem('IS_APPROVAL');
    localStorage.removeItem('IS_APPROVED');
    this.userInfo = JSON.parse(this.authService.getUserDetail());
    this.GETCMEPAYMENTTLIST();
  }
  
   
  loadDataLazily(e: any) {  
  }

  async GETCMEPAYMENTTLIST(){
    let data = {  
      "USER_ID": this.userInfo.USER_ID,
      "SALES_ROLE_ID": this.userInfo.SALESROLE_ID
    }
      this.isLoaded = true;
    await this.http.postnew(this.url.GETTPAYMENTLISTBYUSERID, data).then(
      (res: any) => {
         console.log('res ->' , res)
        this.CME_PAYMENT_LIST = res.CME_PAYMENT_LIST;
        this.isLoaded = false;
      },
      error => {
        console.log(error);
        this.isLoaded = false;
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  BACKTOLIST(){
    this.router.navigate(["/requestcme"]);
  }



  History(){}
  Postpone(){}
  Cancel(){}

}
