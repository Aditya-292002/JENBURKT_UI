import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Service/api.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
import { AuthService } from 'src/app/Service/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-generate-order',
  templateUrl: './generate-order.component.html',
  styleUrls: ['./generate-order.component.css']
})
export class GenerateOrderComponent implements OnInit {

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
  IS_DISABLED:boolean
   constructor(private AuthService:AuthService,private url:URLService,private http:HttpService,private toastrService:ToastrService,private fileDownloadService: ApiService,private sanitizer: DomSanitizer) { }
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
         this.periodList = res.periodlist;
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
       SALES_ROLE_ID:JSON.parse(this.userInfo).SALESROLE_ID,
       PERIOD_ID:this.period,
       AREA_CODE:this.AREA_CODE.AREA_CODE,
       ROLE_NAME:this.AREA_CODE.ROLE_NAME,
       PERIOD_DESC:this.AREA_CODE.PERIOD_DESC,
       SALESROLE_ID:JSON.parse(this.userInfo).SALESROLE_ID
     }
     console.log(data,'data');
     this.isLoaded=true;
         this.http.postnew(this.url.GETSUPERSTOCKISTDATABYPERIODID, data).then(
       (res:any)=>{
         this.isLoaded=false;
        this.PRODUCT_LIST=res.PRODUCT_DETAILS

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
        let FIRST_DISPATCH = Number(element.FIRST_DISPATCH) || 0;
        let SECOND_DISPATCH = Number(element.SECOND_DISPATCH) || 0;
      
        // let sampleCost = Number(element.SAMPLE_COST) || 0;
        element.TOTAL_QTY = FIRST_DISPATCH + SECOND_DISPATCH;
     
        // let REQ_VALUE = element.TOTAL_REQUESTED_QTY * sampleCost;
        // element.REQ_VALUE = Number(REQ_VALUE.toFixed(1));
      }
    });
   }
   SAVESUPERSTOCKIST(){

   }

}
