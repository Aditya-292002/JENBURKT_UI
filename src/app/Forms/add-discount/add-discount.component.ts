import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit {
  REQ_BY:any;
  HQ_CODE:any;
  POOL_CODE:any;
  STOCKLIST:any;
  DOCTOR_CODE:any;
  SPL_ID:any;
  CHEMIST_CODE:any;
  PRODUCT_CODE:any;
  SALE_QTY:any;
  FREE_QTY:any;
  REMARK:any;
  LAST_VISIT=new Date();
  visible:boolean=false;
  isShowEditPopup:boolean = false;
  isLoaded:boolean = false;
  userInfo:any;
  HQ_LIST:any=[];
  DOCTOR_MASTER_LIST:any=[];
  PRODUCT_MASTER_LIST:any=[];
  SPECIAL_LIST:any=[];
  CHEMIST_LIST:any=[];
  STOCKIST_LIST:any=[];
  visible_Doctor:boolean=false;
  SPL_CODE:any;
  DoctorName:any;
  DoctorHQ:any
  ChemistName:any;
  ChemistHQ:any;
  CHEMIST_ID:any;
  isHighLightDoctorName:string="No";
  isHighLightSpecializationName:string="No";
  isHighLightDoctorHq:string="No";
  isHighLightChemistName:string="No";
  isHighLightHqChemist:string="No";
  isHighLightHQ:string="No";
  isHighLightStockist:string="No";
  isHighLightDoctor:string="No";
  isHighLightSpecialization:string="No";
  isHighLightChemist:string="No";
  isHighLightProduct:string="No";
  isHighLightSaleqty:string="No";
  isHighLightFreeqty:string="No";
  isHighLightLastVist:string="No";
  isHighLightRemark:string="No";
  SALES_ROLE_ID:any;
  STOCKIST_CODE:any;
  HISTORY_LIST:any=[];
  REQUESTNO:any
  AddDiscountList:any=[{"SRNO":1,
  "PRODUCT_CODE":"",
  "SALE_QTY":"",
  "FREE_QTY":"",
  "isHighLightProduct":"No",
  "isHighLightSaleqty":"No",
  "isHighLightFreeqty":"No"
}]
REQUEST_DATE:any = new Date();
  constructor(private authService: AuthService,private url: URLService,private http: HttpService,
    private toastrService:ToastrService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.GETHQLISTBYLOGINID();
  }

  GETHQLISTBYLOGINID(){
    this.userInfo = this.authService.getUserDetail();
    let data={
     USER_ID : JSON.parse(this.userInfo).USER_ID,
    }
    this.http.postnew(this.url.GETHQLISTBYLOGINID,data).then(
      (res:any)=>{
        this.isLoaded= false;
        this.HQ_LIST=res.HQ_LIST
        console.log(this.HQ_LIST);
        this.GETDISCOUNTSPECIALLIST();
        this.REQ_BY=JSON.parse(this.userInfo).USER_NAME

        // this.ChemistHQ=this.HQ_LIST[0].HQ_DESC
        // this.DoctorHQ=this.HQ_LIST[0].HQ_DESC

       this.HQ_LIST.forEach(element => {
          this.ChemistHQ=element.HQ_CODE
          this.DoctorHQ=element.HQ_CODE

        });



      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  GETDISCOUNTSPECIALLIST(){
    let data={

    }
    this.http.postnew(this.url.GETDISCOUNTSPECIALLIST,data).then(
      (res:any)=>{
        this.isLoaded= false;
        this.SPECIAL_LIST=res.SPECIAL_LIST


      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  GETDISCOUNTMASTERLIST(){
    let data={
      HQ_CODE:this.HQ_CODE
    }
    this.http.postnew(this.url.GETDISCOUNTMASTERLIST,data).then(
      (res:any)=>{
        this.isLoaded= false;
        this.DOCTOR_MASTER_LIST=res.DOCTOR_MASTER_LIST
       this.PRODUCT_MASTER_LIST=res.PRODUCT_MASTER_LIST

      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  GETDISCOUNTCHEMISTLIST(){
    let data={
      HQ_CODE:this.HQ_CODE
    }
    this.http.postnew(this.url.GETDISCOUNTCHEMISTLIST,data).then(
      (res:any)=>{
        this.isLoaded= false;
         this.CHEMIST_LIST=res.CHEMIST_LIST

      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  GETSTOCKISTLISTBYHQCODE(){
    console.log(this.HQ_CODE,"hq")
    for(let i = 0;i<this.HQ_LIST.length;i++){
      if(this.HQ_LIST[i].HQ_CODE == this.HQ_CODE){
        var POOL_CODE = this.HQ_LIST[i].POOL_CODE
      }
    }

    let data={
      POOL_CODE:POOL_CODE
    }

    this.http.postnew(this.url.GETSTOCKISTLISTBYHQCODE,data).then(
      (res:any)=>{
        this.isLoaded= false;
        this.STOCKIST_LIST = [];
        this.STOCKIST_LIST = res.STOCKIST_LIST

      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
    getHqList(event){
    this.GETDISCOUNTMASTERLIST();
    this.GETDISCOUNTCHEMISTLIST();
    this.GETSTOCKISTLISTBYHQCODE();
  }
  saveAddDiscountData(){
    if(this.HQ_CODE==undefined || this.HQ_CODE==""){
      this.isHighLightHQ="Yes";
      this.toastrService.error("Please Select Hq");
      return;
    }else{
      this.isHighLightHQ="No";
    }
    if(this.STOCKIST_CODE==undefined || this.STOCKIST_CODE==""){
      this.isHighLightStockist="Yes";
      this.toastrService.error("Please Select Stockist");
      return;
    }else{
      this.isHighLightStockist="No";
    }
    if(this.CHEMIST_CODE==undefined || this.CHEMIST_CODE ==""){
      this.isHighLightChemist="Yes";
      this.toastrService.error("Please Select Chemist");
      return;
    }
    else{
      this.isHighLightChemist="No";
    }

    if(this.DOCTOR_CODE==undefined || this.DOCTOR_CODE==""){
      this.isHighLightDoctor="Yes";
      this.toastrService.error("Please Select Doctor");
      return;
    }else{
      this.isHighLightDoctor="No";
    }
    if(this.SPL_ID==undefined || this.SPL_ID==""){
      this.isHighLightSpecialization="Yes";
      this.toastrService.error("Please Select Specialization");
      return;
    }else{
      this.isHighLightSpecialization="No";
    }

    this.userInfo = this.authService.getUserDetail();
    let date = this.datepipe.transform(this.LAST_VISIT, "yyyy-MM-dd");
    let Reqdate = this.datepipe.transform(this.REQUEST_DATE, "yyyy-MM-dd");

    // var saleRoleId=JSON.parse(this.userData).SALESROLE_ID
    this.AddDiscountList.forEach(element => {
      if(element.PRODUCT_CODE!=""){
        element.PRODUCT_CODE=element.PRODUCT_CODE;
      }else{
        element.PRODUCT_CODE="";
      }
      element.SALE_QTY= element.SALE_QTY;
      element.FREE_QTY=element.FREE_QTY;
      delete element.isHighLightProduct;
      delete element.isHighLightSaleqty;
      delete element.isHighLightFreeqty
    });
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
      SALES_ROLE_ID:JSON.parse(this.userInfo).SALESROLE_ID,
      REQ_BY:JSON.parse(this.userInfo).USER_ID,
      HQ_CODE:this.HQ_CODE,
      STOCKIST_CODE:this.STOCKIST_CODE,
      DOCTOR_CODE:this.DOCTOR_CODE,
      SPL_CODE:this.SPL_ID,
      CHEMIST_CODE:this.CHEMIST_CODE,
      // PRODUCT_CODE:this.PRODUCT_CODE,
      // SALE_QTY:this.SALE_QTY,
      // FREE_QTY:this.FREE_QTY,
      LAST_VISIT:date,
      REMARKS:this.REMARK,
      PRODUCT_DETAILS:this.AddDiscountList,
      REQUEST_DATE:Reqdate,

    }

    console.log('data',JSON.stringify(data))

    this.isLoaded= true;
   

    this.http.postnew(this.url.SAVEDISCOUNTDATA, data).then(
      (res:any)=>{
        if(res.data[0].FLAG == true){
          this.isLoaded= false;
          this.onClearData();
          this.toastrService.success(res.data[0].MSG);
        }else{
          this.toastrService.error(res.data[0].MSG);
        }
      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

onClearData(){
  this.HQ_CODE="";
  this.POOL_CODE="";
  this.DOCTOR_CODE="";
  this.SPL_ID="";
  this.CHEMIST_CODE="";
  this.STOCKIST_CODE="";
  this.PRODUCT_CODE="";
  this.SALE_QTY="";
  this.FREE_QTY="";
  this.LAST_VISIT=new Date();
  this.REMARK="";
  this.DoctorName="";
  this.SPL_CODE="";
  this.ChemistName="";
  this.AddDiscountList = [];
  this.AddDiscountList.push({"SRNO":1,
  "PRODUCT_CODE":"",
  "SALE_QTY":"",
  "FREE_QTY":"",
  "isHighLightProduct":"No",
  "isHighLightSaleqty":"No",
  "isHighLightFreeqty":"No"
})
}
getDoctorList(){
   if(this.DOCTOR_CODE !=undefined || this.DOCTOR_CODE !=""){
    this.DOCTOR_MASTER_LIST.forEach(element => {
      if(this.DOCTOR_CODE==element.DOCTOR_ID){
        this.SPL_ID=element.SPL_ID
      }
   });
    

  }
  }

  addSaveDoctorList(){
    this.userInfo = this.authService.getUserDetail();
    let data={
      DOCTOR_NAME:this.DoctorName,
      SPL_CODE:this.SPL_CODE,
      HQ_CODE:this.HQ_CODE,
      CHEMIST_ID:this.CHEMIST_ID,
      USER_ID:JSON.parse(this.userInfo).USER_ID
    }
    this.http.postnew(this.url.SAVEDOCTORMASTERDATA,data).then(
      (res:any)=>{
        if(res.data[0].FLAG == true){
          this.isLoaded= false;
          this.GETHQLISTBYLOGINID();
          this.visible_Doctor=false;
          this.toastrService.success(res.data[0].MSG);

        }else{
          this.toastrService.error(res.data[0].MSG);
        }


      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  addSaveChemistData(){
    this.isHighLightChemistName="No";
    this.isHighLightHqChemist="No";
     if(this.ChemistName==undefined || this.ChemistName==""){
      this.isHighLightChemistName="Yes";
      this.toastrService.error("Please Enter Chemist Name ?");
      return;
     }else{
      this.isHighLightChemistName="No";
     }
     if(this.ChemistHQ==undefined || this.ChemistHQ==""){
      this.isHighLightHqChemist="Yes";
      this.toastrService.error("Please Enter HQ ?");
       return
     }else{
      this.isHighLightHqChemist="No";
     }

    let data={
      CHEMIST_NAME:this.ChemistName,
       HQ_CODE:this.HQ_CODE
     }
     this.http.postnew(this.url.SAVECHEMISTMASTERDATA,data).then(
      (res:any)=>{

        if(res.data[0].FLAG== true){

          this.isLoaded= false;
          this.GETHQLISTBYLOGINID();
          this.visible=false;
          this.toastrService.success(res.data[0].MSG);
        }else{
          this.toastrService.error(res.data[0].MSG);
        }


      },
       error =>{
         console.log(error);
         this.toastrService.error("Oops, Something went wrong.");
       }
     );
}

  onMyReqListClick(){
    this.visible=true;
  }
  onDoctorListClick(){
    this.visible_Doctor=true;
  }
  showDialog(list){
    let data={
    DOCTOR_ID:this.DOCTOR_CODE,
    PRODUCT_CODE:this.PRODUCT_CODE
    }

    this.http.postnew(this.url.GETDOCTORHISTORYBYDOCTORID,data).then(
      (res:any)=>{
        this.isLoaded= false;
        this.HISTORY_LIST=res.HISTORY_LIST
        this.HISTORY_LIST.forEach(rowData => {
          rowData.REQUESTNO=rowData.REQUEST_NO;
          rowData.REQUESTDATE=rowData.REQUEST_DATE;
          rowData.PRODUCTDESC=rowData.PRODUCT_DESC;
          rowData.SALEQTY=rowData.SALE_QTY;
          rowData.FREEQTY=rowData.FREE_QTY;
          rowData.STATUS=rowData.STATUS;

        });

      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
    this.isShowEditPopup = true;
  }

  ClosePopUp(){
    this.isShowEditPopup =false;
  }
  formValidateDoctorList(){
    this.isHighLightDoctorName="No";
    this.isHighLightSpecializationName="No";
    this.isHighLightDoctorHq="No";
    if(this.DoctorName==undefined || this.DoctorName==""){
      this.isHighLightDoctorName="Yes";
      this.toastrService.error("Please Enter  Doctor Name ?")
      return;
    }else{
      this.isHighLightDoctorName="No";
    }
    if(this.SPL_CODE==undefined || this.SPL_CODE==""){
      this.isHighLightSpecializationName="Yes";
      this.toastrService.error("Please Select Specialization Name ?")
      return;
    }else{
      this.isHighLightSpecializationName="No";
    }
    if(this.DoctorHQ==undefined || this.DoctorHQ==""){
      this.isHighLightDoctorHq="Yes";
      this.toastrService.error("Please Enter HQ ?");
      return;
    }else{
      this.isHighLightDoctorHq="No";
    }

    if(this.isHighLightDoctorName !="Yes" || this.isHighLightSpecializationName !="Yes" || this.isHighLightDoctorHq !="Yes"){
        this.addSaveDoctorList();

    }else{
      this.toastrService.error("Please Fill the all value ?");
    }
  }

  addList(){
    for(let i=0; i<this.AddDiscountList.length;i++){
      if(this.AddDiscountList[i].PRODUCT_CODE==undefined ||this.AddDiscountList[i].PRODUCT_CODE==""){
        this.toastrService.error("Please Select Product");
        this.AddDiscountList[i].isHighLightProduct="Yes";
        this.isHighLightProduct="Yes";
        return;
      }else{
        this.AddDiscountList[i].isHighLightProduct="No";
        this.isHighLightProduct="No";
      }
      if(this.AddDiscountList[i].SALE_QTY==undefined||this.AddDiscountList[i].SALE_QTY==""){
        this.toastrService.error("Please Enter Sale Qty");
        this.AddDiscountList[i].isHighLightSaleqty="Yes";
        this.isHighLightSaleqty="Yes";
        return;
      }else{
        this.AddDiscountList[i].isHighLightSaleqty="No";
        this.isHighLightSaleqty="No";
      }
      if(this.AddDiscountList[i].FREE_QTY==undefined || this.AddDiscountList[i].FREE_QTY==""){
        this.toastrService.error("Please Enter Free Qty");
        this.AddDiscountList[i].isHighLightFreeqty="Yes";
        this.isHighLightFreeqty="Yes";
        return;
      }else{
        this.AddDiscountList[i].isHighLightFreeqty="No";
        this.isHighLightFreeqty="No";
      }
    }
    if(this.isHighLightProduct!="Yes" && this.isHighLightSaleqty!="Yes" && this.isHighLightFreeqty!="Yes"){
      this.AddDiscountList.push({
        "SRNO":this.AddDiscountList.length + 1,
        "PRODUCT_CODE":"",
        "SALE_QTY":"",
        "FREE_QTY":"",
        "isHighLightProduct":"No",
        "isHighLightSaleqty":"No",
        "isHighLightFreeqty":"No"
      })
    }

  }
 deleteList(index:any){
  if (this.AddDiscountList.length > 1) {
    this.AddDiscountList.splice(index, 1);
  }
 }
}
