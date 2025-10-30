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
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  GROUPCODE_LIST=[];
  DIV_LIST=[];
  BRAND_LIST=[];
  MOERATE_LIST=[];
  WEF_LIST=[];
  ProductMasterList:any=[];
  userInfo:any;
  ProductCode:any;
  ProductName:any;
  groupCode:any;
  divCode:any;
  brandCode:any;
  wefCode:any;
  moeRate:any;
  isProductPopUp:boolean=false;
  isLoaded:boolean=false;
  isAddProductMaster:boolean=false;
  productMasterMode:string="";
  isHighLightProductCode:string="No";
  isHighLightProductName:string="No";
  isHighLightGroupCode:string="No";
  isHighLightDiv:string="No";
  isHighLightBrand:string="No";
  isHighLightMOERate:string="No";
  isHighLightWEF:string="No";
  isHighLightshipper:string="No";
  //added by hemant 02 sep 2025
  Shipper:any
  v_save_data:any={};
  constructor(private router: Router,private SharedService: SharedService,private AuthService: AuthService,
    private ToastrService: ToastrService,private url: URLService,private http: HttpService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.productMasterMode = "Add Product Master";
    this.GetProductList();
    this.GetProductMasterList();
  }
  GetProductList() {
    this.userInfo = this.AuthService.getUserDetail();
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
      ReqType: "M"
    }
    this.http.postnew(this.url.getProductList, data).then(
      (res:any)=>{
        console.log("response",res);//PRODUCTLIST
        this.isLoaded= false;
        this.ProductMasterList = res.PRODUCTLIST;

      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  GetProductMasterList() {
    this.userInfo = this.AuthService.getUserDetail();
    let data={}
    this.isLoaded = true;
    this.http.postnew(this.url.getProductMasterList, data).then(
      (res:any)=>{
        this.isLoaded= false;
        console.log("data",res);
        this.BRAND_LIST = res.BRANDLIST;
        this.DIV_LIST = res.DIVLIST;
        this.GROUPCODE_LIST = res.GROUPCODELIST;
        this.WEF_LIST=res.periodlist
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
        // this.isLoaded = false;
      }
    );
  }
  onEditListClick(){
    this.isAddProductMaster = true;
    this.isProductPopUp = true;
  }
  OnCancelClick(){
    this.ClearFormData();
  }
  ClosePopUp(){
    this.isProductPopUp = false;
    this.isAddProductMaster = false;
  }
  onProductSelected(data:any){
    this.ProductCode = data.PRODUCT_CODE;
    this.ProductName = data.PRODUCT_DESC;
    this.moeRate=data.MOE_RATE;
    this.brandCode = {"BRAND_CODE":data.BRAND_CODE,"BRAND_NAME":data.BRAND_NAME};
    this.divCode = {"DIVISION_CODE":data.DIVISION_CODE,"DIVISION_NAME":data.DIVISION_NAME};
    this.groupCode = {"GROUP_CODE":data.GROUP_CODE,"GROUP_DESC":data.GROUP_DESC};
   // this.wefCode = {"PERIOD_":data.WFM_CODE,"PERIOD_DESC":data.PERIOD_DESC};
    this.ProductMasterList.forEach((element:any) => {
      if(+element.WFM_CODE == +data.WFM_CODE){
        this.wefCode=element.WFM_CODE
       // this.WEFCode = {"PERIOD_ID":element.PERIOD_ID,"PERIOD_DESC":element.PERIOD_DESC};

        console.log( this.wefCode,"code")
      }
    });
   // this.wefCode=data.WFM_CODE
    console.log('wefCode',this.wefCode)
    console.log("product edit data:-",data);
    this.productMasterMode = "Edit Product Master";
    this.isProductPopUp = false;
  }
  OnSaveProductMasterClick(){
    this.isHighLightProductCode ="No";
    this.isHighLightProductName ="No";
    if(this.ProductCode == "" || this.ProductCode == undefined){
      this.isHighLightProductCode ="Yes";
      this.ToastrService.error("Please enter a value in product code.");
      return;
    }else{
      this.isHighLightProductCode ="No";
    }
    if(this.ProductName == "" || this.ProductName == undefined){
      this.isHighLightProductName ="Yes";
      this.ToastrService.error("Please enter a value in product name.");
      return;
    }else{
      this.isHighLightProductName ="No";
    }

    if(this.isHighLightProductName != "Yes" && this.isHighLightProductCode != "Yes"){
      // if(this.groupCode == "" || this.groupCode == undefined){
      //   this.isHighLightGroupCode ="Yes";

      // }else{
      //   this.isHighLightGroupCode ="No";
      // }
      // if(this.divCode == "" || this.divCode == undefined){
      //   this.isHighLightDiv ="Yes";
      // }else{
      //   this.isHighLightDiv ="No";
      // }
      // if(this.brandCode == "" || this.brandCode == undefined){
      //   this.isHighLightBrand ="Yes";
      // }else{
      //   this.isHighLightBrand ="No";
      // }
      if(this.moeRate == "" || this.moeRate == undefined){
        this.isHighLightMOERate ="Yes";
      }else{
        this.isHighLightMOERate ="No";
      }
      if(this.wefCode == "" || this.wefCode == undefined){
        this.isHighLightWEF ="Yes";
      }else{
        this.isHighLightWEF ="No";
      }

      // if(this.isHighLightGroupCode == "Yes"){
      //   this.ToastrService.error("Please enter a value in group code.");
      //   return;
      // }
      // if(this.isHighLightDiv == "Yes"){
      //   this.ToastrService.error("Please enter a value in div");
      //   return;
      // }
      // if(this.isHighLightBrand == "Yes"){
      //   this.ToastrService.error("Please enter a value in brand.");
      //   return;
      // }
      if(this.isHighLightMOERate == "Yes"){
        this.ToastrService.error("Please enter a value in moe rate.");
        return;
      }
      if(this.isHighLightWEF == "Yes"){
        this.ToastrService.error("Please enter a value in wef.");
        return;
      }

      if( this.isHighLightMOERate != "Yes" && this.isHighLightWEF != "Yes"){
        this.SaveProductMaster();
      }
    }
  }

  SaveProductMaster() {
    this.userInfo = this.AuthService.getUserDetail();
    if(this.productMasterMode == "Add Product Master"){
      this.v_save_data.MODE = "A";
    }else{
      this.v_save_data.MODE = "E";
    }
    this.v_save_data={
    "LOGIN_USER_ID":JSON.parse(this.userInfo).USER_ID,
    "PRODUCT_CODE":this.ProductCode,
    "PRODUCT_DESC":this.ProductName,
    "GROUP_CODE":this.groupCode.GROUP_CODE,
    "DIVISION_CODE":this.divCode.DIV_CODE,
    "BRAND_CODE":this.brandCode.BRAND_CODE,
    "MOE_RATE":this.moeRate,
    "WFM_CODE":this.wefCode.PERIOD_NO,
    "SHIPPER":this.Shipper
  }
    this.isLoaded = true;
    this.http.postnew(this.url.saveProductData, this.v_save_data).then(
      (res:any)=>{
        if(res.data[0].FLAG==1){
          this.isLoaded= false;
          this.ToastrService.success(res.data[0].MSG);
          this.ClearFormData();
        } else{
          this.ToastrService.error(res.data[0].MSG);
        }

      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
        // this.isLoaded = false;
      }
    );
  }
  ClearFormData(){
    this.ProductCode = "";
    this.ProductName = "";
    this.wefCode ="";
    this.brandCode = "";
    this.divCode = "";
    this.groupCode = "";
    this.moeRate = "";
    this.productMasterMode = "Add Product Master";
    this.isAddProductMaster = false;
    this.isProductPopUp = false;
    this.Shipper=''
  }

  filterGroupCode:any=[];
  filteredGroupCode(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.GROUPCODE_LIST.length; i++) {
      let GROUPCODE_LIST = this.GROUPCODE_LIST[i];
      if (GROUPCODE_LIST.GROUP_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(GROUPCODE_LIST);
      }
    }

    this.filterGroupCode = filtered;
  }

  setGroupCode(fileterlist, code: any) {
    code = "";
      this.filterGroupCode.forEach((element: any, index: number) => {
        if (element.GROUP_DESC != this.GROUPCODE_LIST[0].GROUP_DESC && this.GROUPCODE_LIST[0].GROUP_DESC == undefined) {
          if (index == 0) {
            code = element;
            this.GROUPCODE_LIST = code;
            this.filterGroupCode = [];
          }
          else {
            this.GROUPCODE_LIST = element;
            return;
          }
        }
      });
  }

  filterDivCode:any=[];
  filteredDivCode(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.DIV_LIST.length; i++) {
      let DIV_LIST = this.DIV_LIST[i];
      if (DIV_LIST.DIV_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(DIV_LIST);
      }
    }

    this.filterDivCode = filtered;
  }

  setDivCode(fileterlist, code: any) {
    code = "";
      this.filterDivCode.forEach((element: any, index: number) => {
        if (element.DIV_DESC != this.DIV_LIST[0].DIV_DESC && this.DIV_LIST[0].DIV_DESC == undefined) {
          if (index == 0) {
            code = element;
            this.DIV_LIST = code;
            this.filterDivCode = [];
          }
          else {
            this.DIV_LIST = element;
            return;
          }
        }
      });
  }

  filterWefCode:any=[];
  filteredWefCode(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.WEF_LIST.length; i++) {
      let WEF_LIST = this.WEF_LIST[i];
      if (WEF_LIST.PERIOD_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(WEF_LIST);
      }
    }

    this.filterWefCode = filtered;
  }

  setWefCode(fileterlist, code: any) {
    code = "";
      this.filterWefCode.forEach((element: any, index: number) => {
        if (element.PERIOD_DESC != this.WEF_LIST[0].PERIOD_DESC && this.WEF_LIST[0].PERIOD_DESC == undefined) {
          if (index == 0) {
            code = element;
            this.WEF_LIST = code;
            this.filterWefCode = [];
          }
          else {
            this.WEF_LIST = element;
            return;
          }
        }
      });
  }
  filterBrandCode:any=[];
  filteredBrandCode(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.BRAND_LIST.length; i++) {
      let BRAND_LIST = this.BRAND_LIST[i];
      if (BRAND_LIST.BRAND_CODE_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(BRAND_LIST);
      }
    }

    this.filterBrandCode = filtered;
  }

  setBrandCode(fileterlist, code: any) {
    code = "";
      this.filterBrandCode.forEach((element: any, index: number) => {
        if (element.BRAND_CODE_DESC != this.BRAND_LIST[0].BRAND_CODE_DESC && this.BRAND_LIST[0].BRAND_CODE_DESC == undefined) {
          if (index == 0) {
            code = element;
            this.BRAND_LIST = code;
            this.filterBrandCode = [];
          }
          else {
            this.BRAND_LIST = element;
            return;
          }
        }
      });
  }
}
