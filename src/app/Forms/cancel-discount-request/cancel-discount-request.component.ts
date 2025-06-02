import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-cancel-discount-request',
  templateUrl: './cancel-discount-request.component.html',
  styleUrls: ['./cancel-discount-request.component.css']
})
export class CancelDiscountRequestComponent implements OnInit {

  CANCEL_DISCOUNT_REQUEST_LIST:any = [];
  isLoaded:boolean = false;
  selectedApprovalData:any = [];
  selectAll:any;
  CancelData:any = [];
  userInfo:any = {};

   constructor(private authService:AuthService,private url:URLService,private http:HttpService,
    private toastrService:ToastrService,private common:CommonService,private router:Router) { }


  ngOnInit(): void {
    this.userInfo = JSON.parse(this.authService.getUserDetail());
    // console.log('userInfo -' , this.userInfo)
  }

  loadDataLazily(e: any) {
  }

  toggleCheckboxAll(event: any) {
    if(event.target.checked){
      this.selectAll = true;
      for(let i = 0;i<this.CANCEL_DISCOUNT_REQUEST_LIST.length;i++){
        this.CANCEL_DISCOUNT_REQUEST_LIST[i].SELECTED = true

      }

    }
    else{
      this.selectAll = false;
      for(let i = 0;i<this.CANCEL_DISCOUNT_REQUEST_LIST.length;i++){
        this.CANCEL_DISCOUNT_REQUEST_LIST[i].SELECTED = false
      }
    }
  }

  CANCELDISCOUNTREQUEST(){

    this.CancelData=[];
    var j=0;
    for(let i=0; i<this.selectedApprovalData.length;i++){
     
        this.CancelData[j]={
          "REQUEST_ID": this.selectedApprovalData[i].REQUEST_ID,
          "USER_ID": this.userInfo.USER_ID,
          "SALES_ROLE_ID": this.userInfo.SALESROLE_ID,
          "STATUS": 1,
          "SALE_QTY": this.selectedApprovalData[i].UPDATED_SALE_QTY,
          "FREE_QTY": this.selectedApprovalData[i].UPDATED_FREE_QTY,
          "LAST_VISIT_DATE": this.selectedApprovalData[i].LAST_VISIT_DATE,
          "REMARKS": ""
        }
        j++;
      
    }
    // console.log(this.CancelData,"CancelData")

    if(this.CancelData.length == 0){
      this.toastrService.error("Please Select Atleast One Request");
      return;
    }
    let data={
      CANCEL_DETAILS:this.CancelData
    }

  }

}
