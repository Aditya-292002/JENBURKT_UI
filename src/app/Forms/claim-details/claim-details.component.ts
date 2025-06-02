import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';


@Component({
  selector: 'app-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.css']
})
export class ClaimDetailsComponent implements OnInit {
  ClaimDetails:any=[];
  INVOICE_NO:any;
  DATE=new Date();
  SALE_QTY:any;
  SCHEME_FREE_QTY:any;
  CLAIM_FREE_QTY:any;
  SUPERSTOCKIST_CODE:any;
  MRP:any
  UPLOAD:any;
  userInfo:any;
  isLoaded:boolean;
  SUPERSTOCKIST_LIST:any=[];
  MRP_LIST:any=[];
  userData:any;
  imageSrc:string="";
  imageSrc1:string="";
  selectedFiles: any;
  isHighLightInvoiceNo:string="No";
  isHighLightDate:string="No";
  isHighLightSaleQty:string="No";
  isHighLightSchemeFreeqty:string="No";
  isHighLightClaimFreeqty:string="No";
  isHighLightSuperStockistName:string="No";
  isHighLightMRP:string="No";
  isHighLightImageSrc:string="No";
  isHighLightInvoiceClaimSale:any="No";
  isHighLightClaimFree:any="No";
  isHighLightSchemeFree:any="No";
  STOCKIST_CODE:any;
  CHEMIST_CODE:any;
  SelectCheckboxData:any=[];
  ToDate:any = new Date();

  constructor(private router: Router,private authService: AuthService,private url: URLService,private http: HttpService,
    private toastrService:ToastrService,public datepipe: DatePipe,private ng2ImgMaxService: Ng2ImgMaxService) { }

  ngOnInit(): void {
    // this.ClaimDetails=JSON.parse(localStorage.getItem("CLAIM_DETAILS"));
    // console.log(' this.ClaimDetails', this.ClaimDetails)
    this.SelectCheckboxData=JSON.parse(localStorage.getItem("SELECTED_DATA"));
    // console.log('SelectCheckboxData',this.SelectCheckboxData)
        this.GETCLAIMMASTERDATA();
  }

  GETCLAIMMASTERDATA(){
    this.userInfo = this.authService.getUserDetail();
    var userid=JSON.parse(this.userInfo).USER_ID
    this.STOCKIST_CODE=this.SelectCheckboxData[0].STOCKIST_NAME;
    this.CHEMIST_CODE=this.SelectCheckboxData[0].CHEMIST_NAME;
    for(let i=0;i<this.SelectCheckboxData.length;i++){
      let data={
        USER_ID:userid,
        REQUEST_ID:this.SelectCheckboxData[i].REQUEST_ID,
        PRODUCT_CODE:this.SelectCheckboxData[i].PRODUCT_CODE
      }
      // console.log('get data',data)
      this.http.postnew(this.url.GETCLAIMMASTERDATA,data).then(
        (res:any)=>{
          this.isLoaded= false;
          this.SelectCheckboxData[i].MRP_LIST = res.MRP_LIST
          // this.MRP_LIST=res.MRP_LIST
          this.SUPERSTOCKIST_LIST=res.SUPERSTOCKIST_LIST
        },
        error =>{
          console.log(error);
          this.toastrService.error("Oops, Something went wrong.");
        }
      );
    }


  }

  async onSaveClaimRequest(){
  if(this.INVOICE_NO==undefined ||this.INVOICE_NO==""){
    this.isHighLightInvoiceNo="Yes";
    this.toastrService.error("Please Enter Invoice Number..");
    return;
  }else{
    this.isHighLightInvoiceNo="No";
  }

  if(this.SUPERSTOCKIST_CODE==undefined || this.SUPERSTOCKIST_CODE==""){
    this.isHighLightSuperStockistName="Yes";
    this.toastrService.error("Please Select SuperStokist..")
    return;
    }
    else{
         this.isHighLightSuperStockistName="No";
     }

     
    for(let i =0;i<this.SelectCheckboxData.length;i++){
       if(this.SelectCheckboxData[i].INVOICE_SALE_QTY==undefined ||this.SelectCheckboxData[i].INVOICE_SALE_QTY==""){
        this.toastrService.error("Please Enter Invoice Sale Qty");
        this.SelectCheckboxData[i].isHighLightInvoiceClaimSale="Yes";
        this.isHighLightInvoiceClaimSale="Yes";
        return;
       }
       else{
        this.SelectCheckboxData[i].isHighLightInvoiceClaimSale="No";
        this.isHighLightInvoiceClaimSale="No";
       }
       if(this.SelectCheckboxData[i].CLAIM_FREE_QTY==undefined ||this.SelectCheckboxData[i].CLAIM_FREE_QTY==""){
        this.toastrService.error("Please Enter Claim Free Qty");
        this.SelectCheckboxData[i].isHighLightClaimFree="Yes";
        this.isHighLightClaimFree="Yes";
        return;
       }
       else{
        this.SelectCheckboxData[i].isHighLightClaimFree="No";
        this.isHighLightClaimFree="No";
       }


        if(this.SelectCheckboxData[i].MRP==undefined || this.SelectCheckboxData[i].MRP==""){
          this.toastrService.error("Please Select MRP..");
          this.SelectCheckboxData[i].isHighLightMRP="Yes";
          this.isHighLightMRP="Yes";
           return;
          }
          else{
          this.SelectCheckboxData[i].isHighLightMRP="No";
          this.isHighLightMRP="No";
        }
        // if(this.SelectCheckboxData[i].isHighLightInvoiceClaimSale!="Yes" && this.SelectCheckboxData[i].isHighLightClaimFree!="Yes" && this.SelectCheckboxData[i].isHighLightMRP!="Yes"){
        //   this.SelectCheckboxData[i].MRP_LIST = [];
        // }
        }

        for(let i =0;i<this.SelectCheckboxData.length;i++){
            // console.log('SelectCheckboxData ->', this.SelectCheckboxData)
          let data_valid = {
            "REQUEST_ID":+this.SelectCheckboxData[i].REQUEST_ID,
            "CLAIM_ID":0,
            "INVOICE_SALE_QTY":+this.SelectCheckboxData[i].INVOICE_SALE_QTY,
            "CLAIM_FREE_QTY":+this.SelectCheckboxData[i].CLAIM_FREE_QTY,
            "SCHEME_FREE_QTY":0,
            "PRODUCT_CODE":this.SelectCheckboxData[i].PRODUCT_CODE,
            "STOCKIST_CODE":this.SelectCheckboxData[i].STOCKIST_CODE,
            "INVOICE_NO":this.INVOICE_NO
        }
// console.log('data_valid ->' , JSON.stringify(data_valid))
// return
          const isCheck: any = await this.validSaveRequest(data_valid);
          // console.log(isCheck);
          if (isCheck.FLAG === false) {
            this.toastrService.error(isCheck.MSG);
            return; // Terminate the loop if FLAG is false
          }
    
        // catch (error) {
        //   console.error(error);
        //   this.toastrService.error("Oops, Something went wrong.");
        //   return; // Terminate the loop on error
        // }
          // if( this.SelectCheckboxData[i].FINAL_SALE_QTY < this.SelectCheckboxData[i].INVOICE_SALE_QTY ){
          //   this.toastrService.error("Invoice Sale Qty should not be greater then Request Sale Qty");
          //   this.SelectCheckboxData[i].isHighLightInvoiceClaimSale="Yes";
          //   this.isHighLightInvoiceClaimSale="Yes";
          //   return;
          //  }
          //  else{
          //      this.SelectCheckboxData[i].isHighLightInvoiceClaimSale="No";
          //      this.isHighLightInvoiceClaimSale="No"
          //  }

          // //  this.SelectCheckboxData[i].REQ_SALE_REQ_FREE_PERC = ((((this.SelectCheckboxData[i].FINAL_SALE_QTY - (+this.SelectCheckboxData[i].INVOICE_SALE_QTY))/this.SelectCheckboxData[i].FINAL_SALE_QTY))*100)
          //  this.SelectCheckboxData[i].REQ_SALE_REQ_FREE_PERC = ((+this.SelectCheckboxData[i].FINAL_FREE_QTY) / (+this.SelectCheckboxData[i].FINAL_SALE_QTY))*100
          //  this.SelectCheckboxData[i].VALID_CLAIM_FREE_QTY=((+this.SelectCheckboxData[i].REQ_SALE_REQ_FREE_PERC) * (+this.SelectCheckboxData[i].INVOICE_SALE_QTY))/100

          //  if(this.SelectCheckboxData[i].VALID_CLAIM_FREE_QTY < this.SelectCheckboxData[i].CLAIM_FREE_QTY ){
          //     this.toastrService.error("Claim Free Qty should not be greater total Percentage of Request Sale Qty and Req Free Qty");
          //       this.SelectCheckboxData[i].isHighLightClaimFree="Yes";
          //       this.isHighLightClaimFree="Yes";
          //       return;
          //    }
          //    else{
          //      this.SelectCheckboxData[i].isHighLightClaimFree="No";
          //      this.isHighLightClaimFree="No";
          //    }
          

           // Comment Start By Gauresh

          //  if( this.SelectCheckboxData[i].FINAL_FREE_QTY < this.SelectCheckboxData[i].CLAIM_FREE_QTY ){
          //   this.toastrService.error("Claim Free Qty should not be greater then Request Free Qty");
          //     this.SelectCheckboxData[i].isHighLightClaimFree="Yes";
          //     this.isHighLightClaimFree="Yes";
          //     return;
          //  }
          //  else{
          //    this.SelectCheckboxData[i].isHighLightClaimFree="No";
          //    this.isHighLightClaimFree="No";
          //  }

          //  if(this.SelectCheckboxData[i].FINAL_FREE_QTY < this.SelectCheckboxData[i].SCHEME_FREE_QTY ){
          //   this.toastrService.error("Scheme Free Qty should not be greater then Request Free Qty");
          //     this.SelectCheckboxData[i].isHighLightSchemeFree="Yes";
          //     this.isHighLightSchemeFree="Yes";
          //     return;
          //  }
          //  else{
          //    this.SelectCheckboxData[i].isHighLightSchemeFree="No";
          //    this.isHighLightSchemeFree="No";
          //  }

        // Comment End By Gauresh

        }

        this.SelectCheckboxData.forEach(element => {
          // delete element.isHighLightInvoiceClaimSale;
          // delete element.isHighLightClaimFree;
          // delete element.isHighLightMRP
          // delete element.isHighLightSchemeFree
          // delete element.MRP_LIST
          // delete element.PRODUCT_CODE
          // delete element.PRODUCT_DESC
          // delete element.DOCTOR_NAME
          // delete element.STOCKIST_CODE
          // delete element.STOCKIST_NAME
          // delete element.CHEMIST_NAME
          // delete element.REQUEST_NO
          // delete element.FINAL_SALE_QTY
          // delete element.FINAL_FREE_QTY

          if(element.SCHEME_FREE_QTY == undefined || element.SCHEME_FREE_QTY == null){
            element.SCHEME_FREE_QTY = 0;
          }

        });

    // console.log(this.SelectCheckboxData,"this.SelectCheckboxData")
    this.userInfo = this.authService.getUserDetail();
    this.userData = this.authService.getUserDetail();
    var userid=JSON.parse(this.userInfo).USER_ID
    var saleRoleId=JSON.parse(this.userData).SALESROLE_ID
    let date = this.datepipe.transform(this.DATE, "yyyy-MM-dd");
    let data={
      SALES_ROLE_ID:saleRoleId,
      SUPERSTOCKIST_CODE:this.SUPERSTOCKIST_CODE,
      INVOICE_NO:this.INVOICE_NO,
      INVOICE_DATE:date,
      CREATEDBY:userid,
      CLAIM_REMARKS:"",
      Image_Base64:this.imageSrc1,
      CLAIM_DETAILS:this.SelectCheckboxData
    }
    // console.log(JSON.stringify(data),"dat")
    this.isLoaded = true;
    this.http.postnew(this.url.SAVECLAIMREQUEST, data).then(
      (res: any) => {
         this.isLoaded = false;
        if(res.FLAG == true){
            this.toastrService.success(res.MSG)

            this.onClearFormData();
            this.router.navigate(['/claimrequest'])

            }
        else{
          this.toastrService.error(res.MSG)
        }

      },
      error => {
        console.log(error);
        this.isLoaded = false;
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

//  validSaveRequest(data_valid:any){
//       this.isLoaded = true;
//       this.http.postnew(this.url.VALIDATE_CLAIM_REQUEST, data_valid).then(
//       (res: any) => {
//         this.isLoaded = false;
//         if(res.data.FLAG == true){

//         }else{
//           var Invalid = {Flag: 0,Msg: res.data.MSG};
//           console.log(Invalid,"")
//           return Invalid;
//         }

//       },
//       error => {
//         console.log(error);
//         this.isLoaded = false;
//         this.toastrService.error("Oops, Something went wrong.");
//         return;
//       }
//    
//   }

validSaveRequest(data_valid: any): Promise<any> {
  return new Promise((resolve, reject) => {
    this.isLoaded = true;
    this.http.postnew(this.url.VALIDATE_CLAIM_REQUEST, data_valid).then(
      (res: any) => {
        this.isLoaded = false;
        if (res.data.FLAG === true) {
          resolve(res.data); // Resolve with the response data
        } else {
          const invalid = { Flag: false, Msg: res.data.MSG };
          this.toastrService.error(res.data.MSG); // Display toastr message
          reject(invalid); // Reject with the error data
        }
      },
      error => {
        this.isLoaded = false;
        this.toastrService.error("Oops, Something went wrong.");
        reject(error); // Reject with the error
      }
    );
  });
}


handleInputChange(e: Event) {  
  const target = e.target as HTMLInputElement;  

  
  if (!target || !target.files) {  
      console.error('The target or files are undefined.');  
      return; 
  }  

  this.selectedFiles = target.files;  

  if (this.selectedFiles.length > 0) {  
      for (let i = 0; i < this.selectedFiles.length; i++) {  
          const file = this.selectedFiles[i];  
          const pattern = /image-*/;  

          if (!file.type.match(pattern)) {  
              alert('Invalid format');  
              continue;   
          }  

         
          // console.log(`Original file size of "${file.name}": ${file.size} bytes`);  

          const reader = new FileReader();  
          reader.onload = (event) => {  
            
              const img = new Image();  
              img.src = event.target?.result as string; 

              img.onload = () => {  
                
                  const canvas = document.createElement('canvas');  
                  const ctx = canvas.getContext('2d');  
                  const MAX_WIDTH = 1024; 
                  const MAX_HEIGHT = 1024; 
                  let width = img.width;  
                  let height = img.height;  

                 
                  if (width > height) {  
                      if (width > MAX_WIDTH) {  
                          height *= MAX_WIDTH / width;  
                          width = MAX_WIDTH;  
                      }  
                  } else {  
                      if (height > MAX_HEIGHT) {  
                          width *= MAX_HEIGHT / height;  
                          height = MAX_HEIGHT;  
                      }  
                  }  

                 
                  canvas.width = width;  
                  canvas.height = height;  

                  ctx.drawImage(img, 0, 0, width, height);  

                  
                  const quality = 0.8;  
                  const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);  
                  
                  
                  const compressedSize = Math.round((compressedDataUrl.length * 3) / 4);  

                 
                  this.imageSrc1 = compressedDataUrl.replace(/^.+?;base64,/, ''); 
                  console.log(`  this.imageSrc1 "${  this.imageSrc1}": ${compressedSize} bytes`);  

              };  
          };  
          reader.readAsDataURL(file);  
      }  
  }  
}
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    // this.addFiles(e)
    console.log('imageSrc',this.imageSrc)
  }
  onClearFormData(){
    this.SUPERSTOCKIST_CODE  = "";
    this.INVOICE_NO = "";
    this.DATE = new Date();
    this.MRP = "";
    this.SALE_QTY = "";
    this.SCHEME_FREE_QTY = "";
    this.CLAIM_FREE_QTY = "";
    this.imageSrc1 = "";
  }
  onBackClick(){
    this.router.navigate(['/claimrequest'])
  }


}
