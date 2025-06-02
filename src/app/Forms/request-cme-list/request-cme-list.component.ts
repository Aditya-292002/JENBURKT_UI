import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/Service/auth.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-request-cme-list',
  templateUrl: './request-cme-list.component.html',
  styleUrls: ['./request-cme-list.component.css']
})
export class RequestCmeListComponent implements OnInit {
  @ViewChild('dt1') dt1: Table| undefined;

  REQUEST_APPROVAL_CME_LIST:any = [];
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
    this.GETCMEREQUESTLIST();
  }
  
   
  loadDataLazily(e: any) {  
  }

  async GETCMEREQUESTLIST(){
    let data = {  
      "USER_ID": this.userInfo.USER_ID,
      "SALES_ROLE_ID": this.userInfo.SALESROLE_ID
    }
      this.isLoaded = true;
    await this.http.postnew(this.url.GETCMEREQUESTLIST, data).then(
      (res: any) => {
         console.log('res ->' , res)
        this.REQUEST_APPROVAL_CME_LIST = res.GET_CME_APPROVAL_REQUEST;
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

  GetPreviewCmeReqFromCmeNo(data:any){
    this.CME_ID = data.CME_ID;
    this.IS_APPROVED = data.IS_APPROVED;
    localStorage.setItem("CME_ID",this.CME_ID);
    localStorage.setItem("IS_VIEW",this.IS_VIEW);
    localStorage.setItem("IS_APPROVAL",this.IS_APPROVAL);
    localStorage.setItem("IS_APPROVED",this.IS_APPROVED);
    this.router.navigate(["/requestcme"]);
  }

  History(){}
  Postpone(){}
  Cancel(){}

  
}
