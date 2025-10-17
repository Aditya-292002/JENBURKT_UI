import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Service/api.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
import { AuthService } from 'src/app/Service/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from 'src/app/Service/common.service';

@Component({
  selector: 'app-trade-offer-diff-report',
  templateUrl: './trade-offer-diff-report.component.html',
  styleUrls: ['./trade-offer-diff-report.component.css']
})
export class TradeOfferDiffReportComponent {

   period:any;
   userInfo:any = {};
   periodList:any = [];
   isLoaded:boolean=false;
   roleList: any=[];
   AREA_CODE:any='';
   roleListData: any=[];
   pdfSrc: any="";
   pdfSrcflag: boolean=false;
  PRODUCT_LIST: any;
  IS_DISABLED:boolean;
  isHighLightSample:any
  SAMPLE_PRODUCT_LIST: any=[];
  ORDER_DATE:any=new Date();
  ORDER_STATUS:boolean=false;
  superStockistList: any=[];
  superStockistCode: any;
  SUPERSTOCKIST_CODE:any
   constructor(private AuthService:AuthService,private url:URLService,private http:HttpService,private toastrService:ToastrService,private fileDownloadService: ApiService,private sanitizer: DomSanitizer
    ,private comman:CommonService,
   ) { }
    ngOnInit(): void {
     this.getPeriodListData();
   }
     getPeriodListData(){
     this.userInfo = this.AuthService.getUserDetail();
     let data={
       USER_ID : JSON.parse(this.userInfo).USER_ID,
       LOGIN_ID:JSON.parse(this.userInfo).USER_NAME,
       SALES_ROLE_ID:JSON.parse(this.userInfo).SALESROLE_ID
     }
     this.http.postnew(this.url.GETGENERATEORDERMASTERLIST, data).then(
       (res:any)=>{
         this.periodList = res.PERIOD_LIST;
         this.superStockistList = res.DATA_LIST;
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
         this.http.postnew(this.url.GETRADEDIFFREPORTBYPERIODID, data).then(
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
        let FIRST_DISPATCH = Number(element.FIRST_DISPATCH_QTY) || 0;
        let SECOND_DISPATCH = Number(element.SECOND_DISPATCH_QTY) || 0;
      
        // let sampleCost = Number(element.SAMPLE_COST) || 0;
        element.TOTAL_QTY = FIRST_DISPATCH + SECOND_DISPATCH;
     
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
        if(this.period==null || this.period==undefined){
        this.toastrService.error("Please select order date");
        return;
    }
   let data={
        USER_ID : JSON.parse(this.userInfo).USER_ID,
        LOGIN_ID:JSON.parse(this.userInfo).USER_NAME,
        PERIOD_ID:this.period,
        STATUS:(VALUE==1?'1':'0'),
        ORDER_DATE:this.ORDER_DATE,
        SUPERSTOCKIST_CODE:this.SUPERSTOCKIST_CODE,
        PRODUCT_LIST: this.PRODUCT_LIST
     }  
     console.log(data,'data');
    // return
     this.isLoaded=true;
         this.http.postnew(this.url.SAVEGENERATEORDER, data).then(
       (res:any)=>{
      
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

  exportExcel(){
    this.comman.exportExcel(this.PRODUCT_LIST)
    //this.comman.exportFormatedAsExcel(this.reportGrid.v_detail,'_report_',[],'Test','')
  }

}
