import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { ToastrService } from 'ngx-toastr';
import { URLService } from 'src/app/Service/url.service';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-pool-to-pool',
  templateUrl: './pool-to-pool.component.html',
  styleUrls: ['./pool-to-pool.component.css']
})
export class PoolToPoolComponent implements OnInit {
  PERIOD=[];
  FORM_POOL=[];
  TO_POOL=[]; 
  toPool:any; 
  fromPool:any;
  period:any;
  poolMasterList:any=[];
  periodList:any=[];
  userInfo:any={};
  isHighLightPeriod:string="No";
  isHighLightFromPool:string="No";
  isHighLightToPool:string="No";
  constructor(private router: Router,private SharedService: SharedService,private AuthService: AuthService,
    private ToastrService: ToastrService,private url: URLService,private http: HttpService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getPoolMasterList();
  }
  getPoolMasterList() {
    this.userInfo = this.AuthService.getUserDetail();
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
      ReqType: "M"
    }
    this.http.postnew(this.url.getPoolMasterList, data).then(
      (res:any)=>{
        console.log("response",res);
        this.poolMasterList = res.poollist;
        this.poolMasterList.forEach((value:any)=>{
          value.DisplayName = (value.POOL_CODE == '' ? '-' : (value.POOL_CODE+ "-" +value.POOL_DESC));
        })
        this.periodList=res.periodlist;
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  OnSavePoolMasterClick(){
    this.isHighLightPeriod = "No";
    this.isHighLightFromPool = "No";
    this.isHighLightToPool = "No";
    if(this.period == undefined || this.period == ""){
      this.isHighLightPeriod = "Yes";
    }else{
      this.isHighLightPeriod = "No";
    }
    if(this.fromPool == undefined || this.fromPool == ""){
      this.isHighLightFromPool = "Yes";
    }else{
      this.isHighLightFromPool = "No";
    }
    if(this.toPool == undefined || this.toPool == ""){
      this.isHighLightToPool = "Yes";
    }else{
      this.isHighLightToPool = "No";
    }

    if(this.isHighLightPeriod == "Yes"){
      this.ToastrService.error("Please select a value in period");
    } 
    if(this.isHighLightFromPool == "Yes"){
      this.ToastrService.error("Please select a value in from pool");
    }
    if(this.isHighLightToPool == "Yes"){
      this.ToastrService.error("Please select a value in to pool");
    }
    if(this.isHighLightPeriod != "Yes" && this.isHighLightFromPool != "Yes" && this.isHighLightToPool != "Yes"){
      this.SavePoolMaster();
    }
  }
  SavePoolMaster() {
    this.userInfo = this.AuthService.getUserDetail();
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
      PERIOD_ID:(+this.period.PERIOD_ID),
      FROM_POOL:this.fromPool.POOL_CODE,
      TO_POOL:this.toPool.POOL_CODE,
    }
    console.log("save pool data",data)
    // this.http.postnew(this.url.savePoolMasterList, data).then(
    //   (res:any)=>{
    //     console.log("response",res);
    //   },
    //   error =>{
    //     console.log(error);
    //     this.ToastrService.error("Oops, Something went wrong.");
    //   }
    // );
  }


  filterPeriod:any=[];
  filteredPeriod(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.periodList.length; i++) {
      let periodList = this.periodList[i];
      if (periodList.PERIOD_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(periodList);
      }
    }
  
    this.filterPeriod = filtered;
  }
  
  setPeriod(fileterlist, code: any) {
    code = "";
      this.filterPeriod.forEach((element: any, index: number) => {
        if (element.PERIOD_DESC != this.periodList[0].PERIOD_DESC && this.periodList[0].PERIOD_DESC == undefined) {
          if (index == 0) {
            code = element;
            this.periodList = code;
            this.filterPeriod = [];
          }
          else {
            this.periodList = element;
            return;
          }
        }
      });
  }
  
  filterFromPool:any=[];
  filteredFromPool(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.poolMasterList.length; i++) {
      let poolMasterList = this.poolMasterList[i];
      if (poolMasterList.DisplayName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(poolMasterList);
      }
    }
  
    this.filterFromPool = filtered;
  }
  
  setFromPool(fileterlist, code: any) {
    code = "";
      this.filterFromPool.forEach((element: any, index: number) => {
        if (element.DisplayName != this.poolMasterList[0].DisplayName && this.poolMasterList[0].DisplayName == undefined) {
          if (index == 0) {
            code = element;
            this.poolMasterList = code;
            this.filterFromPool = [];
          }
          else {
            this.poolMasterList = element;
            return;
          }
        }
      });
  }

  filterToPool:any=[];
  filteredToPool(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.poolMasterList.length; i++) {
      let poolMasterList = this.poolMasterList[i];
      if (poolMasterList.DisplayName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(poolMasterList);
      }
    }
  
    this.filterToPool = filtered;
  }
  
  setToPool(fileterlist, code: any) {
    code = "";
      this.filterToPool.forEach((element: any, index: number) => {
        if (element.DisplayName != this.poolMasterList[0].DisplayName && this.poolMasterList[0].DisplayName == undefined) {
          if (index == 0) {
            code = element;
            this.poolMasterList = code;
            this.filterToPool = [];
          }
          else {
            this.poolMasterList = element;
            return;
          }
        }
      });
  }
}
