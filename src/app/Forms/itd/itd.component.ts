import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { ToastrService } from 'ngx-toastr';
import { URLService } from 'src/app/Service/url.service';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
interface period {
  label: string,
  value: string
}
@Component({
  selector: 'app-itd',
  templateUrl: './itd.component.html',
  styleUrls: ['./itd.component.css']
})
export class ItdComponent implements OnInit {
  BANK_DATE = new Date();
  FORM_POOL = [];
  PRODUCT= [];
  TO_POOL=[];
  fromPool:any;
  toPool:any;
  totalValue:any;
  poolMasterList:any=[];
  periodList:period[]=[];
  poolList:any=[];
  productPoolMasterList:any=[];
  dummyPeriodList:any=[];
  userInfo:any={};
  isShowPoolTable:boolean = false;
  isHighLightFromPool:string="No";
  isHighLightToPool:string="No";
  isHighLightProduct:string="No";
  isHighLightQuantity:string="No";
  isHighLightRate:string="No";
  PRODUCT_TABLE_LIST=[{"PRODUCT_CODE":"","TO_POOL":"","QTY":0,"RATE":0,"VALUE":0,}]
  constructor(private router: Router,private SharedService: SharedService,private AuthService: AuthService,
    private ToastrService: ToastrService,private url: URLService,private http: HttpService, public datepipe: DatePipe,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getPoolMasterList();
  }
  ShowPoolTable(){
    this.getProductFromPoolList();
  }
  addProductList(value:any,index:number){
    this.PRODUCT_TABLE_LIST.push({"PRODUCT_CODE":"","TO_POOL":value.TO_POOL,"QTY":0,"RATE":0,"VALUE":0});
  }
  deleteProductList(index:any){
    // const index = this.PRODUCT_TABLE_LIST.indexOf(data);
    this.PRODUCT_TABLE_LIST.splice(index, 1);
    this.calculateTotalValue();
  }
  getPoolMasterList() {
    this.userInfo = this.AuthService.getUserDetail();
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
      ReqType: "M"
    }
    this.http.postnew(this.url.getPoolList, data).then(
      (res:any)=>{
        console.log("response",res);
        this.poolMasterList=res.data;
        this.poolMasterList.forEach((value:any)=>{
          value.DisplayName = (value.POOL_CODE == '' ? '' : (value.POOL_CODE+ "-" +value.POOL_DESC));
        })
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  getProductFromPoolList() {
    let date = this.datepipe.transform(this.BANK_DATE, "dd-MMM-yyyy");
    this.userInfo = this.AuthService.getUserDetail();
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
      ReqType: "M",
      FROM_POOL:this.fromPool.POOL_CODE,
      ITD_DATE:date
    }
    this.http.postnew(this.url.getProductFromPoolList, data).then(
      (res:any)=>{
        this.productPoolMasterList=res.data;
        this.isShowPoolTable = true;
        // this.poolMasterList.forEach((value:any)=>{
        //   value.DisplayName = (value.POOL_CODE == '' ? '' : (value.POOL_CODE+ "-" +value.POOL_DESC));
        // })
       //this.dummyPeriodList = res.data.map((item:any) => item.PRODUCT_DESC).filter((value:any, index:any, self:any) => self.indexOf(value) === index);
      this.dummyPeriodList = res.data;
        let v_period:period[]=[];
        this.dummyPeriodList.forEach((element:any) => {
          v_period.push({label:element.PRODUCT_DESC,value:element.PRODUCT_CODE});
        });
        this.periodList = v_period;
console.log(this.periodList)
        this.poolList = this.poolMasterList;
        this.poolMasterList.forEach((value:any)=>{
          value.DisplayName = (value.POOL_CODE == '' ? '' : (value.POOL_CODE+ "-" +value.POOL_DESC));
        })
   
       
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  onPoolChange(index:number,PRODUCT_CODE:any){
    console.log("Index",index);
    this.productPoolMasterList.forEach((element:any) => {
      // this.PRODUCT_TABLE_LIST.forEach((value:any)=>{

      // })
      if(PRODUCT_CODE == element.PRODUCT_CODE){
        this.PRODUCT_TABLE_LIST[index].RATE = element.MOE_RATE;
      }
    });
  }
  onQuantityChange(e:any,i:number){
    this.PRODUCT_TABLE_LIST[i].VALUE = (this.PRODUCT_TABLE_LIST[i].RATE * this.PRODUCT_TABLE_LIST[i].QTY);
    this.calculateTotalValue();
  }

  calculateTotalValue(){
    this.totalValue = 0;
    for(let i=0; i<this.PRODUCT_TABLE_LIST.length; i++){
      this.totalValue = this.totalValue + (this.PRODUCT_TABLE_LIST[i].VALUE);
    }
  }
  OnSaveITDClick(){
    this.isHighLightFromPool = "No";
    this.isHighLightToPool = "No";
    this.isHighLightProduct = "No";
    this.isHighLightRate = "No";
    this.isHighLightQuantity = "No";
    if(this.fromPool == undefined || this.fromPool == ""){
      this.isHighLightFromPool = "Yes";
    }else{
      this.isHighLightFromPool = "No";
    }

    if(this.isHighLightFromPool == "Yes"){
      this.ToastrService.error("Please select a value in from pool.");
    }
    else {
      console.log(this.PRODUCT_TABLE_LIST)
      for(let i=0; i<this.PRODUCT_TABLE_LIST.length;i++){
        if(this.PRODUCT_TABLE_LIST[i].PRODUCT_CODE == "" || this.PRODUCT_TABLE_LIST[i].PRODUCT_CODE == undefined){
          this.isHighLightProduct = "Yes";
        }else{
          this.isHighLightProduct = "No";
        }
        if(this.PRODUCT_TABLE_LIST[i].QTY == 0 || this.PRODUCT_TABLE_LIST[i].QTY == undefined){
          this.isHighLightQuantity = "Yes";
        }else{
          this.isHighLightQuantity = "No";
        }
        if(this.PRODUCT_TABLE_LIST[i].RATE == 0 || this.PRODUCT_TABLE_LIST[i].RATE == undefined){
          this.isHighLightRate = "Yes";
        }else{
          this.isHighLightRate = "No";
        }
        if(this.PRODUCT_TABLE_LIST[i].TO_POOL == "" || this.PRODUCT_TABLE_LIST[i].TO_POOL == undefined){
          this.isHighLightToPool = "Yes";
        }else{
          this.isHighLightToPool = "No";
        }
      }
      if(this.isHighLightToPool == "Yes"){
        this.ToastrService.error("Please select a value in to pool.");
      }
      if(this.isHighLightProduct == "Yes"){
        this.ToastrService.error("Please select a value in product.");
      }
      if(this.isHighLightQuantity == "Yes"){
        this.ToastrService.error("Please enter value in quantity.");
      }
      if(this.isHighLightRate == "Yes"){
        this.ToastrService.error("Please enter value in Rate.");
      }
  
      if(this.isHighLightFromPool != "Yes" && this.isHighLightToPool != "Yes" && this.isHighLightProduct != "Yes" && this.isHighLightQuantity != "Yes" &&
      this.isHighLightRate != "Yes"){
        this.SaveITDMatser();
      }
    }
  }
  SaveITDMatser() {
    let date = this.datepipe.transform(this.BANK_DATE, "dd-MMM-yyyy");
    this.userInfo = this.AuthService.getUserDetail();
    for(let i=0; i<this.PRODUCT_TABLE_LIST.length;i++){
        let v_data:any;
        v_data = this.PRODUCT_TABLE_LIST[i].TO_POOL;
        let v_object 
        v_object = v_data.POOL_CODE;
        this.PRODUCT_TABLE_LIST[i].TO_POOL = v_object;
    }
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
      ITD_DATE:date,
      FROM_POOL:this.fromPool.POOL_CODE,
      TRXN_ITD_T:this.PRODUCT_TABLE_LIST
    }
    console.log("save pool data",data)
    console.log("save pool data",this.PRODUCT_TABLE_LIST)
    this.http.postnew(this.url.SaveITDTransaction, data).then(
      (res:any)=>{
        if (res.data[0].FLAG == 1) {
          this.toastrService.success(res.data[0].MSG)
          this.PRODUCT_TABLE_LIST=[{"PRODUCT_CODE":"","TO_POOL":"","QTY":0,"RATE":0,"VALUE":0,}]
          this.fromPool=""
        }
        if (res.data[0].FLAG == 0) {
          this.toastrService.error(res.data[0].MSG)
        }
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
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

}
