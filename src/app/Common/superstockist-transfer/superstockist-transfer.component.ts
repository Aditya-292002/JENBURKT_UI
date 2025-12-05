import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Service/api.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
import { AuthService } from 'src/app/Service/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-superstockist-transfer',
  templateUrl: './superstockist-transfer.component.html',
  styleUrls: ['./superstockist-transfer.component.css']
})
export class SuperstockistTransferComponent {
period:any;
   userInfo:any = {};
   periodList:any = [];
   isLoaded:boolean=false;
   roleList: any=[];
   AREA_CODE:any='';
   roleListData: any=[];
   pdfSrc: any="";
   pdfSrcflag: boolean=false;
  PRODUCT_LIST: any=[];
  IS_DISABLED:boolean;
  isHighLightSample:any
  SAMPLE_PRODUCT_LIST: any=[];
  ORDER_DATE:any=new Date();
  ORDER_STATUS:boolean=false;
  superStockistList: any=[];
  superStockistCode: any;
  SUPERSTOCKIST_CODE:any;
  FROM_SUPERSTOCKIST_CODE:any;
  TO_SUPERSTOCKIST_CODE:any;
  TRF_NO:any;
  REMARK:any;
  DATE:any=new Date();
  STATUSFLAG:boolean=false
  TO_superStockistList: any;
  FROM_superStockistList: any;
  toggleToList: boolean=false;
  REQUEST_LIST: any;
  HEADER_LIST: any;
  PRODUCT_CODE;any;
  PRODUCT_TABLE_LIST=[{TRF_ID:0,"PRODUCT_CODE":"","TO_POOL":"","SALE_QTY":0,"FREE_QTY":0,"TOTAL_QTY":0,"PRODUCT_DESC":""}];
   constructor(private AuthService:AuthService,private url:URLService,private http:HttpService,private toastrService:ToastrService,private fileDownloadService: ApiService,private sanitizer: DomSanitizer) { }
    ngOnInit(): void {
     this.getMasterList();
   }
     getMasterList(){
     this.userInfo = this.AuthService.getUserDetail();
     let data={
       USER_ID : JSON.parse(this.userInfo).USER_ID,
       LOGIN_ID:JSON.parse(this.userInfo).USER_NAME,
       SALES_ROLE_ID:JSON.parse(this.userInfo).SALESROLE_ID
     }
      
     this.http.postnew(this.url.GETSUPERSTOCKISTTRANSFERMASTERLIST, data).then(
       (res:any)=>{
         this.FROM_superStockistList = res.FROM_LIST;
         this.TO_superStockistList = res.TO_LIST;
         this.PRODUCT_LIST = res.PRODUCT_LIST;
         
          // const productlist = [...new Set(res.PRODUCT_LIST.map((item: any) => item.PRODUCT_DESC))];
          //   productlist.forEach((element: any) => {
          //     this.SAMPLE_PRODUCT_LIST.push({ label: element, value: element })
          //   })
           this.PRODUCT_LIST.forEach((element:any) => {
          this.SAMPLE_PRODUCT_LIST.push({label:element.PRODUCT_DESC,value:element.PRODUCT_CODE});
        });
       //console.log('periodList',this.periodList);
      
       },
       error =>{
         //console.log(error);
         this.toastrService.error("Oops, Something went wrong.");
       }
     );
   }

 
   generatedata(){
   //  console.log('this.AREA_CODE',this.AREA_CODE);
     if(this.period==undefined || this.period==null){
       this.toastrService.error("Please Select Period");
       return;
     }
    //  if(this.AREA_CODE==undefined || this.AREA_CODE==null){
    //    this.toastrService.error("Please Select Area Code");
    //    return;
    //  }
     let data={
       USER_ID : JSON.parse(this.userInfo).USER_ID,
       LOGIN_ID:JSON.parse(this.userInfo).USER_NAME,
      //  SALES_ROLE_ID:JSON.parse(this.userInfo).SALESROLE_ID,
       PERIOD_ID:this.period,
      //  AREA_CODE:this.AREA_CODE.AREA_CODE,
       ROLE_NAME:this.AREA_CODE.ROLE_NAME,
       PERIOD_DESC:this.AREA_CODE.PERIOD_DESC,
      //  SALESROLE_ID:JSON.parse(this.userInfo).SALESROLE_ID,
       SUPERSTOCKIST_CODE:this.SUPERSTOCKIST_CODE
     }
     console.log(data,'data');
     this.isLoaded=true;
     return
         this.http.postnew(this.url.GETSUPERSTOCKISTDATABYPERIODID, data).then(
       (res:any)=>{
          this.SAMPLE_PRODUCT_LIST=[];
         this.isLoaded=false;
        this.PRODUCT_LIST=res.PRODUCT_DETAILS
        this.ORDER_STATUS=res.ORDER_STATUS[0].STATUS==1? true:false;
        
        this.ORDER_DATE=new Date(res.ORDER_STATUS[0].ORDER_DATE);
        console.log('123',this.ORDER_STATUS,this.ORDER_DATE);
        
        const productlist = [...new Set(res.PRODUCT_DETAILS.map((item: any) => item.PRODUCT_DESC))];
            productlist.forEach((element: any) => {
              this.SAMPLE_PRODUCT_LIST.push({ label: element, value: element }) 
            })

      console.log('PRODUCT_LIST',this.SAMPLE_PRODUCT_LIST);
      
      // const productlist = [...new Set(this.SAMPLE_PRODUCT_LIST.map((item: any) => item.PRODUCT_DESC))];
      // productlist.forEach((element: any) => {
      //   this.DROPDOWN_PRODUCT_LIST.push({ label: element, value: element })
      // })
         console.log('GETSUPERSTOCKISTDATABYPERIODID',res);
         
       },
       error =>{
          this.isLoaded=false;
         //console.log(error);
         this.toastrService.error("Oops, Something went wrong.");
       }
     );
   }
 

   getcalculatetotalqty(data: any,index){
    console.log('INSIDE',index);
    
        this.PRODUCT_LIST.forEach((element: any,i:number) => {
      if (index===i ) {
        let SALE_QTY = Number(element.SALE_QTY) || 0;
        let FREE_QTY = Number(element.FREE_QTY) || 0;
      
        // let sampleCost = Number(element.SAMPLE_COST) || 0;
        element.TOTAL_QTY = SALE_QTY + FREE_QTY;
     
        // let REQ_VALUE = element.TOTAL_REQUESTED_QTY * sampleCost;
        // element.REQ_VALUE = Number(REQ_VALUE.toFixed(1));
      }
    });
   }
   SAVESUPERSTOCKIST(VALUE:any){
    if(this.DATE==null || this.DATE==undefined){
        this.toastrService.error("Please select date");
        return;
    }
        if(this.FROM_SUPERSTOCKIST_CODE==null || this.FROM_SUPERSTOCKIST_CODE==undefined){
        this.toastrService.error("Please select From SuperStockist");
        return;
    }
    if(this.TO_SUPERSTOCKIST_CODE==null || this.TO_SUPERSTOCKIST_CODE==undefined){
        this.toastrService.error("Please select To SuperStockist");
        return;
    }
        if(this.TO_SUPERSTOCKIST_CODE==this.FROM_SUPERSTOCKIST_CODE){
        this.toastrService.error("To SuperStockist cannot be the same as From SuperStockist");
        return;
    }

    if((this.PRODUCT_LIST.filter((item: any) => item.TOTAL_QTY > 0)).length==0){
        this.toastrService.error("Please enter quantity for at least one product");
        return;
    }
   let data={
        USER_ID : JSON.parse(this.userInfo).USER_ID,
        LOGIN_ID:JSON.parse(this.userInfo).USER_NAME,
        DATE:this.DATE,
        FROM_SUPERSTOCKIST_CODE:this.FROM_SUPERSTOCKIST_CODE,
        TO_SUPERSTOCKIST_CODE:this.TO_SUPERSTOCKIST_CODE,
        TRF_NO:this.TRF_NO==null || this.TRF_NO==undefined?0:this.TRF_NO,
        REMARK:this.REMARK ? this.REMARK :'',
        PRODUCT_LIST: this.PRODUCT_LIST.filter((item: any) => item.TOTAL_QTY > 0),
     }  
     console.log(data,'data');
     //return
     this.isLoaded=true;
         this.http.postnew(this.url.SAVESUPERSTOCKISTRANSFER, data).then(
       (res:any)=>{
         console.log('RES SAVESUPERSTOCKISTRANSFER',res);
         
        this.toastrService.success(res);
      // const productlist = [...new Set(this.SAMPLE_PRODUCT_LIST.map((item: any) => item.PRODUCT_DESC))];
      // productlist.forEach((element: any) => {
      //   this.DROPDOWN_PRODUCT_LIST.push({ label: element, value: element })
      // })
         console.log('SAVEGENERATEORDER',res);
        this.isLoaded=false;
       },
       error =>{
          this.isLoaded=false;
         //console.log(error);
         this.toastrService.error("Oops, Something went wrong.");
       }
     );
   }
   goToList(){
    this.toggleToList=true;
    this.getSuperStockistTransferList();
   }
goToCreate(){
    this.toggleToList=false;
    this.clearData();
}

     getSuperStockistTransferList(){
     this.userInfo = this.AuthService.getUserDetail();
     let data={
       USER_ID : JSON.parse(this.userInfo).USER_ID,
       LOGIN_ID:JSON.parse(this.userInfo).USER_NAME,
       SALES_ROLE_ID:JSON.parse(this.userInfo).SALESROLE_ID
     }
      this.isLoaded=true;
     this.http.postnew(this.url.GETSUPERSTOCKISTTRANSFERLISTBYROLEID, data).then(
       (res:any)=>{
         this.REQUEST_LIST = res.SUPERSTOCKIST_LIST;
        
         this.isLoaded=false;
          // const productlist = [...new Set(res.PRODUCT_LIST.map((item: any) => item.PRODUCT_DESC))];
          //   productlist.forEach((element: any) => {
          //     this.SAMPLE_PRODUCT_LIST.push({ label: element, value: element })
          //   })
       //console.log('periodList',this.periodList);
      
       },
       error =>{
        this.isLoaded=false;
         //console.log(error);
         this.toastrService.error("Oops, Something went wrong.");
       }
     );
   }


   getTrfdetails(DATA:any){
    let data={
      "USER_ID" : JSON.parse(this.userInfo).USER_ID,
      "LOGIN_ID":JSON.parse(this.userInfo).USER_NAME,
      "TRF_NO":DATA.TRF_NO==null || DATA.TRF_NO==undefined?0:DATA.TRF_NO,
      "TRF_ID" :DATA.TRF_ID==null || DATA.TRF_ID==undefined?0:DATA.TRF_ID
    }
         this.http.postnew(this.url.GETSUPERSTOCKISTTRANSFERDETAILS, data).then(
       (res:any)=>{
         this.HEADER_LIST = res.HEADER_LIST;
         this.TRF_NO=this.HEADER_LIST[0]?.TRF_NO;
         this.DATE=new Date(this.HEADER_LIST[0]?.TRF_DATE);
         this.FROM_SUPERSTOCKIST_CODE=this.HEADER_LIST[0]?.FROM_SUPERSTOCKIST_CODE;
         this.TO_SUPERSTOCKIST_CODE=this.HEADER_LIST[0]?.TO_SUPERSTOCKIST_CODE;
         this.REMARK=this.HEADER_LIST[0]?.REMARK;
         this.PRODUCT_LIST=res.DETAIL_LIST;
         this.toggleToList=false;
         this.STATUSFLAG=true;
         
          // const productlist = [...new Set(res.PRODUCT_LIST.map((item: any) => item.PRODUCT_DESC))];
          //   productlist.forEach((element: any) => {
          //     this.SAMPLE_PRODUCT_LIST.push({ label: element, value: element })
          //   })
       //console.log('periodList',this.periodList);
      
       },
       error =>{
         //console.log(error);
         this.toastrService.error("Oops, Something went wrong.");
       }
     );
   }
   clearData(){
    
    this.TRF_NO=null;
    this.DATE=new Date();
    this.FROM_SUPERSTOCKIST_CODE=null;
    this.TO_SUPERSTOCKIST_CODE=null;
    this.REMARK=null;
    this.STATUSFLAG=false;
    this.PRODUCT_LIST=[];
    this.getMasterList();
   }
  addProductList(value:any,index:number){
    
    this.PRODUCT_TABLE_LIST.push({TRF_ID:0,"PRODUCT_CODE":"","TO_POOL":"","SALE_QTY":0,"FREE_QTY":0,"TOTAL_QTY":0,"PRODUCT_DESC":""});
  }
  deleteProductList(index:any){
    // const index = this.PRODUCT_TABLE_LIST.indexOf(data);
    this.PRODUCT_TABLE_LIST.splice(index, 1);
    // this.calculateTotalValue();
  //  this.getcalculatetotalqty();
  }
}
