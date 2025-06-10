import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/Service/api.service';
import { CommonService } from 'src/app/Service/common.service';
import { ToastrNotificationService } from 'src/app/Service/toastr-notification.service';
import { SharedService } from 'src/app/Service/shared.service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-change-company',
  templateUrl: './change-company.component.html',
  styleUrls: ['./change-company.component.css']
})
export class ChangeCompanyComponent implements OnInit {
  COMPANY_LIST=[];
  UNIT_LIST=[];
  FINANCIAL_YEAR_LIST=[];
  
  constructor(private router: Router, private urlService: URLService, public commonservice: CommonService,
    private toastrService: ToastrNotificationService, private apiService: ApiService,public SharedService:SharedService,) { }

UNIT_CODE:any;
USER_ID:any;
COMPANY_CODE:any;
PARTY_CODE:any;
FYEAR:any;
  ngOnInit(): void {

    this.USER_ID=localStorage.getItem("USER_ID")
    // this.getCompanyList();

   
  }
  continueBtnClick(){
    this.UNIT_LIST.forEach((element:any)=>{
      if(element.UNIT_CODE == this.UNIT_CODE.UNIT_CODE){
        localStorage.setItem("UNIT_CODE",element.UNIT_CODE);
        localStorage.setItem("UNIT_PREFIX",element.DOC_PREFIX);
        localStorage.setItem("UNIT_REGION_CODE",element.UNIT_REGION_CODE);
      }
    })
    this.COMPANY_LIST.forEach((element:any)=>{
      if(element.COMPANY_CODE == this.COMPANY_CODE.COMPANY_CODE){
        localStorage.setItem("COMPANY_PREFIX",element.DOC_PREFIX);
        localStorage.setItem("CURRENCY_CODE",element.CURRENCY_CODE);
        localStorage.setItem("COMPANY_NAME",element.COMPANY_NAME);
      }
    })
    this.FINANCIAL_YEAR_LIST.forEach((element:any)=>{
      if(element.FYEAR == this.FYEAR.FYEAR){
        localStorage.setItem("FYEAR",element.FYEAR);
        localStorage.setItem("FYEAR_PREFIX",element.DOC_PREFIX);
      }
    })
    if(this.COMPANY_CODE != "" && this.COMPANY_CODE != undefined && this.UNIT_CODE != "" && this.UNIT_CODE != undefined
    && this.FYEAR != "" && this.FYEAR != undefined){
      this.router.navigate(["/dashboard"]);
      localStorage.setItem("COMPANY_CODE",this.COMPANY_CODE.COMPANY_CODE)
    }else{
      this.toastrService.showError("","Please select values in required fields.");
    }
    
  }
  createCompany(){
    this.router.navigate(["/companymaster"]);
  }
  OnFinacialYearChange(){
    localStorage.setItem("START_YEAR",this.FYEAR.FYEAR)
    localStorage.setItem("NEXT_YEAR",this.FYEAR.NEXT_FYEAR)
  }


  // getCompanyList(){
  // let data = {
  //   "USER_ID": (+this.USER_ID),
  //   "COMPANY_CODE": (this.COMPANY_CODE == undefined ? '' : this.COMPANY_CODE.COMPANY_CODE),
  //   "PARTY_CODE": this.PARTY_CODE
  // }
  // this.apiService.post(this.urlService.CompanyList, data).then((res: any) => {
  //   this.COMPANY_LIST = res.Company_List.CompanyDetails;
  //   this.UNIT_LIST=res.Company_List.UnitDetails;
  //   this.FINANCIAL_YEAR_LIST=res.Company_List.FyearDetails;
  // },
  //   error => {
  //   });
  // }
  
  onSomeAction(e: any) {
    console.log("event", e.code);
    if(e.code == "Enter"){
      this.continueBtnClick();
    }
  }

}
