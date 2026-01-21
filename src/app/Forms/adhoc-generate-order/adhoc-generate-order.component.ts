import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Service/api.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
import { AuthService } from 'src/app/Service/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-adhoc-generate-order',
  templateUrl: './adhoc-generate-order.component.html',
  styleUrls: ['./adhoc-generate-order.component.css']
})
export class AdhocGenerateOrderComponent {
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
  ORDER_STATUS:any;
  superStockistList: any=[];
  superStockistCode: any;
  SUPERSTOCKIST_CODE:any
  toListFlag: boolean=false;
  ADHOC_ORDER_REQUEST_LIST: any;
  headerlist: any;
  detailslist: any;
  detailviewFlag: boolean=false;
  ORDER_PURCHASE_ID: any;
  ORDER_PURCHASE_NO: any;
  SUPERSTOKIST_DROPDOWN_FLAG: boolean=false;
   constructor(private AuthService:AuthService,private url:URLService,private http:HttpService,private toastrService:ToastrService,private fileDownloadService: ApiService,private sanitizer: DomSanitizer) { }
    ngOnInit(): void {
     this.getPeriodListData();
   }
     getPeriodListData(){
     this.userInfo = this.AuthService.getUserDetail();
     let data={
       USER_ID : JSON.parse(this.userInfo).USER_ID,
       LOGIN_ID:JSON.parse(this.userInfo).USER_NAME,
       SALES_ROLE_ID:JSON.parse(this.userInfo).SALESROLE_ID,
       TYPE:'GENERATE'
     }
     this.http.postnew(this.url.GETGENERATEORDERMASTERLIST, data).then(
       (res:any)=>{
         this.periodList = res.PERIOD_LIST;
         this.superStockistList = res.DATA_LIST;

         if(this.superStockistList.length==1){
           this.SUPERSTOCKIST_CODE=this.superStockistList[0].SUPERSTOCKIST_CODE;
         }
        // this.SUPERSTOKIST_DROPDOWN_FLAG=this.superStockistList.length==1?true:false;
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
    //  if(this.period==undefined || this.period==null){
    //    this.toastrService.error("Please Select Period");
    //    return;
    //  }
    //  if(this.AREA_CODE==undefined || this.AREA_CODE==null){
    //    this.toastrService.error("Please Select Area Code");
    //    return;
    //  }
     let data={
       USER_ID : JSON.parse(this.userInfo).USER_ID,
       LOGIN_ID:JSON.parse(this.userInfo).USER_NAME,
      //  SALES_ROLE_ID:JSON.parse(this.userInfo).SALESROLE_ID,
       PERIOD_ID:this.period?this.period:'',
      //  AREA_CODE:this.AREA_CODE.AREA_CODE,
       ROLE_NAME:this.AREA_CODE.ROLE_NAME,
       PERIOD_DESC:this.AREA_CODE.PERIOD_DESC,
      //  SALESROLE_ID:JSON.parse(this.userInfo).SALESROLE_ID,
       SUPERSTOCKIST_CODE:this.SUPERSTOCKIST_CODE,
      //  TYPE :'GENERATE'
     }
     console.log(data,'data');
     this.isLoaded=true;
         this.http.postnew(this.url.GETAHOCSUPERSTOCKISTDATABYPERIODID, data).then(
       (res:any)=>{
          this.SAMPLE_PRODUCT_LIST=[];
         this.isLoaded=false;
        this.PRODUCT_LIST=res.PRODUCT_DETAILS
       // this.ORDER_STATUS=res.ORDER_STATUS[0].STATUS==1? true:false;
        
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
        console.log('inside ',i);
        
        let FIRST_DISPATCH = Number(element.FIRST_DISPATCH_QTY) || 0;
        let SECOND_DISPATCH = Number(element.SECOND_DISPATCH_QTY) || 0;
      
        // let sampleCost = Number(element.SAMPLE_COST) || 0;
        // element.TOTAL_QTY = (element.SHIPPER *FIRST_DISPATCH) + (element.SHIPPER * SECOND_DISPATCH);
        // if( SECOND_DISPATCH==0 || SECOND_DISPATCH==null || SECOND_DISPATCH==undefined || SECOND_DISPATCH >0){
        //   element.SECOND_DISPATCH_QTY=element.RECOMMENDED_QTY - FIRST_DISPATCH;
        //     element.TOTAL_QTY = ( FIRST_DISPATCH) + (  element.SECOND_DISPATCH_QTY);
        // }else{
        //   element.FIRST_DISPATCH_QTY=element.RECOMMENDED_QTY - element.SECOND_DISPATCH_QTY;
        //     element.TOTAL_QTY = (  element.FIRST_DISPATCH_QTY) + ( SECOND_DISPATCH);
        // }
      // element.TOTAL_QTY = (  element.FIRST_DISPATCH_QTY) + ( element.SECOND_DISPATCH_QTY);
        element.TOTAL_QTY = ( Number(element.FIRST_DISPATCH_QTY) ) + ( Number(element.SECOND_DISPATCH_QTY) );
        if(element.TOTAL_QTY>element.RECOMMENDED_QTY){
          this.toastrService.warning("Total Qty should not be greater than Recommended Qty");
        element.SHORT_FALL=element.TOTAL_QTY - element.RECOMMENDED_QTY;
        }
      // if(element.TOTAL_QTY<element.RECOMMENDED_QTY){
      //     this.toastrService.warning("Total Qty should not be less than Recommended Qty");
      //     element.FIRST_DISPATCH=0;
      //     element.SECOND_DISPATCH=0;
      //     element.TOTAL_QTY=0;
      //     element.SHORT_FALL=0;
      //   }
        // let REQ_VALUE = element.TOTAL_REQUESTED_QTY * sampleCost;
        // element.REQ_VALUE = Number(REQ_VALUE.toFixed(1));
      }
    });
   }
   SAVESUPERSTOCKIST(VALUE:any){
    if(this.ORDER_DATE==null || this.ORDER_DATE==undefined){
        this.toastrService.error("Please select order date");
        return;
    }
    //     if(this.period==null || this.period==undefined){
    //     this.toastrService.error("Please select order date");
    //     return;
    // }
   let data={
        USER_ID : JSON.parse(this.userInfo).USER_ID,
        LOGIN_ID:JSON.parse(this.userInfo).USER_NAME,
        ORDER_DATE:this.ORDER_DATE,
        SUPERSTOCKIST_CODE:this.SUPERSTOCKIST_CODE,
        STATUS:VALUE,
        ORDER_PURCHASE_ID:this.ORDER_PURCHASE_ID?this.ORDER_PURCHASE_ID:0,
        ORDER_PURCHASE_NO:this.ORDER_PURCHASE_NO?this.ORDER_PURCHASE_NO:0,
        PRODUCT_LIST: this.PRODUCT_LIST
     }  
     console.log(data,'data');
     // return
     this.isLoaded=true;
         this.http.postnew(this.url.SAVEADHOCGENERATEORDER, data).then(
       (res:any)=>{
         if(res.FLAG==true){
          this.toastrService.success(res.MSG);
          this.toListFlag=true;
          this.GETADHOCORDERREQUESTLIST();
           this.isLoaded=false;
        }else{
          this.toastrService.error(res.MSG);
           this.isLoaded=false;
        }
        // this.toastrService.success(res);
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

   this.toListFlag=!this.toListFlag;
   this.detailviewFlag=false;
      this.ORDER_STATUS='';
   if(this.toListFlag){

     this.GETADHOCORDERREQUESTLIST();
   }
  }
    addnew(){

   this.toListFlag=!this.toListFlag;
   this.detailviewFlag=false;
   this.PRODUCT_LIST=[];
   this.superStockistList='';
     this.getPeriodListData()

this.ORDER_DATE=new Date();
  }
  GETADHOCORDERREQUESTLIST(){
   let data={
        USER_ID : JSON.parse(this.userInfo).USER_ID,
        LOGIN_ID:JSON.parse(this.userInfo).USER_NAME,
        SUPERSTOCKIST_CODE:this.SUPERSTOCKIST_CODE
     } 
          this.isLoaded=true;
         this.http.postnew(this.url.GETAHOCORDEREQUESTLIST, data).then(
       (res:any)=>{
           this.ADHOC_ORDER_REQUEST_LIST=res.PRODUCT_DETAILS;
        // this.toastrService.success(res);
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
  GETREQUESTDETAILS(DATA:any){
    this.ORDER_PURCHASE_ID=DATA.ORDER_PURCHASE_ID;
    this.ORDER_PURCHASE_NO=DATA.ORDER_PURCHASE_NO;
    let data ={
        USER_ID : JSON.parse(this.userInfo).USER_ID,
        LOGIN_ID:JSON.parse(this.userInfo).USER_NAME,
        ORDER_PURCHASE_NO:DATA.ORDER_PURCHASE_NO,
        SUPERSTOCKIST_CODE:this.SUPERSTOCKIST_CODE,
        ORDER_PURCHASE_ID:DATA.ORDER_PURCHASE_ID
     } 
          this.isLoaded=true;
         this.isLoaded=true;
         this.http.postnew(this.url.GETAHOCORDEREQUESTDETAILS, data).then(
       (res:any)=>{
        this.headerlist=res.HEADER_LIST;
        this.SUPERSTOCKIST_CODE=res.HEADER_LIST[0].SUPERSTOCKIST_CODE;
        this.ORDER_DATE=new Date(res.HEADER_LIST[0].ORDER_DATE);
         this.ORDER_STATUS=res.HEADER_LIST[0].STATUS;
        this.PRODUCT_LIST=res.DETAIL_LIST;
        this.detailviewFlag=true;
        this.toListFlag=false;
        //  if(res.FLAG==true){
        //   this.toastrService.success(res.MSG);
        //    this.isLoaded=false;
        // }else{
        //   this.toastrService.error(res.MSG);
        //    this.isLoaded=false;
        // }
        // this.toastrService.success(res);
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

}
