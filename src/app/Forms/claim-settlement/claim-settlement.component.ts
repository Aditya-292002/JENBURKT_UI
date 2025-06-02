import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-claim-settlement',
  templateUrl: './claim-settlement.component.html',
  styleUrls: ['./claim-settlement.component.css']
})
export class ClaimSettlementComponent implements OnInit {
  SUPERSTOCKIST_CODE:any;
  STOCKIST_LIST:any=[];
  isLoaded:any;
  userInfo:any;
  IsShowGrid:boolean;
  totalMRP:any=0;
  Total:any;
  SELECTED:any;
  AMOUNT:any;
  REMARK:any;
  PRODUCT_LIST:any=[];
  PRODUCT_CODE:any;
  FINAL_FREE_QTY:any;
  INVOICE_IMG_UPLOAD:any;
  SETTLEMENT_LIST:any=[];
  testImage:any
  selectedFiles: any;
  MRP:any;
  SELECT_LIST:any=[];
  imageSrc:string="";
  imageSrc1:string="";
  fileData: any=[];
  isHighLightSuperStockist:String="No";
  isHighLightSelected:string="No";
  isHighLightFinalFreeQty:string="No";
  isHighLightProduct:string="No";
  isHighLightInvoiceImgUpload:string="No";
  isHighLightRemark:string="No";
  MRP_LIST:any=[];
  TOTAL_AMOUNT:any;
  constructor(private authService: AuthService,private url: URLService,private http: HttpService,
    private toastrService:ToastrService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getMasterList();
  }

  getMasterList(){
    this.userInfo = this.authService.getUserDetail();
    let data={
    //  USER_ID : JSON.parse(this.userInfo).USER_ID,
    }
    this.http.postnew(this.url.GETMASTERLISTFORCLAIMSETTLEMENT,data).then(
      (res:any)=>{
        this.isLoaded= false;
        this.STOCKIST_LIST=res.STOCKIST_LIST;
        this.PRODUCT_LIST=res.PRODUCT_LIST
        this.onSuperstockistList();
      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  onSuperstockistList(){
    if(this.SUPERSTOCKIST_CODE == undefined ||this.SUPERSTOCKIST_CODE ==""){
         this.IsShowGrid=false;
     }else{
      this.IsShowGrid=true;
     }

    let data={
      SUPERSTOCKIST_CODE:this.SUPERSTOCKIST_CODE
      }
      this.http.postnew(this.url.GETCLAIMSETTLEMENTLISTDATA,data).then(
        (res:any)=>{
          this.isLoaded= false;
          this.SETTLEMENT_LIST=res.SETTLEMENT_LIST

          this.totalMRP=0
          for(let i=0; i<this.SETTLEMENT_LIST.length;i++){
            this.SETTLEMENT_LIST[i].Total= (+this.SETTLEMENT_LIST[i].CLAIM_FREE_QTY) * (+this.SETTLEMENT_LIST[i].MRP)

            this.totalMRP= (+this.SETTLEMENT_LIST[i].Total) + (+this.totalMRP)


            this.SETTLEMENT_LIST[i].MRP=(+this.SETTLEMENT_LIST[i].MRP).toFixed(2)
            this.SETTLEMENT_LIST[i].Total=(+this.SETTLEMENT_LIST[i].Total).toFixed(2)
            this.totalMRP=(+this.totalMRP).toFixed(2)
          }
        },
        error =>{
          console.log(error);
          this.toastrService.error("Oops, Something went wrong.");
        }
      );

  }

  onClickProduct(){
    var userData=JSON.parse(this.userInfo).USER_ID;
    let data={
      USER_ID: userData,
      REQUEST_ID:"0",
      PRODUCT_CODE:this.PRODUCT_CODE,

    }
    console.log('data',data)
    this.http.postnew(this.url.GETCLAIMMASTERDATA,data).then(
      (res:any)=>{
        console.log("res",res)
        this.isLoaded= false;
       this.MRP_LIST=res.MRP_LIST
      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  onChangeCalc(){
    this.TOTAL_AMOUNT = 0;
    this.TOTAL_AMOUNT=(+this.MRP.MRP_RATE) * (+this.FINAL_FREE_QTY);
    this.TOTAL_AMOUNT=(+this.TOTAL_AMOUNT).toFixed(2)
  }


  saveClaimSettlementData(){
    var j = 0;
    for(let i=0; i<this.SETTLEMENT_LIST.length;i++){
     if(this.SETTLEMENT_LIST[i].IS_SELECTED==true){
      this.SELECT_LIST[j] = this.SETTLEMENT_LIST[i];
      j++;
     }
    }

  if(this.SUPERSTOCKIST_CODE==undefined || this.SUPERSTOCKIST_CODE==""){
    this.isHighLightSuperStockist="Yes";
    this.toastrService.error("Please Select Superstockist");
    return;
  }else{
    this.isHighLightSuperStockist="No";
  }
  if(this.FINAL_FREE_QTY==undefined || this.FINAL_FREE_QTY==""){
    this.isHighLightFinalFreeQty="Yes";
    this.toastrService.error("Please Enter Value");
    return;
  }else{
    this.isHighLightFinalFreeQty="No";
  }
  if(this.PRODUCT_CODE==undefined || this.PRODUCT_CODE==""){
    this.isHighLightProduct="Yes";
    this.toastrService.error("Please Select Product");
    return;
  }else{
    this.isHighLightProduct="No";
  }
  if(this.INVOICE_IMG_UPLOAD==undefined || this.INVOICE_IMG_UPLOAD==""){
    this.isHighLightInvoiceImgUpload="Yes";
    this.toastrService.error("Please Select Image");
    return;
  }else{
    this.isHighLightInvoiceImgUpload="No";
  }

  // if(this.REMARK==undefined || this.REMARK==""){
  //   this.isHighLightRemark="Yes";
  //   this.toastrService.error("Please Enter Remark");
  //   return
  // }else{
  //   this.isHighLightRemark="No";
  // }
  if(this.SELECT_LIST.length==0){
    this.isHighLightSelected="Yes";
    this.toastrService.error("Choose at least one checkbox");
   return;
  }else{
    this.isHighLightSelected="No";
  }

    this.userInfo = this.authService.getUserDetail();
    let data={
    "SUPER_STOCKIST_CODE":this.SUPERSTOCKIST_CODE,
    "CLAIM_LIST":this.SELECT_LIST,
    "FINAL_FREE_QTY":this.FINAL_FREE_QTY,
    "PRODUCT_CODE":this.PRODUCT_CODE,
    "SETTLE_REMARKS":this.REMARK,
    "MRP_ID":this.MRP.MRP_ID,
    "TOTAL_AMOUNT":this.TOTAL_AMOUNT,
    "SETTLE_BY":JSON.parse(this.userInfo).USER_ID,
    "IMAGE_BASE64":this.imageSrc1
    }
    console.log(JSON.stringify(data));

    this.http.postnew(this.url.SAVECLAIMSETTLEMENTDATA,data).then(
      (res:any)=>{
        console.log('res',res)

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

  handleInputChange(e) {

    this.selectedFiles = e.target.files;

    if (this.selectedFiles.length > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFiles[i]);
        reader.onload = () => {
          this.imageSrc1 = reader.result!.toString();
          this.imageSrc1 = this.imageSrc1.replace(/^.+?;base64,/, '');
        };
      }
    }

    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    // this.addFiles(e)
    console.log('imageSrc',this.imageSrc)
  }

//  formValidate(){
//   this.isHighLightSuperStockist="No";
//   this.isHighLightSelected="No";
//   this.isHighLightFinalFreeQty="No";
//   this.isHighLightProduct="No";
//   this.isHighLightInvoiceImgUpload="No";
//   this.isHighLightRemark="No";

//   if(this.SUPERSTOCKIST_CODE==undefined || this.SUPERSTOCKIST_CODE==""){
//     this.isHighLightSuperStockist="Yes";
//     this.toastrService.error("Please Select Superstockist");
//     return;
//   }else{
//     this.isHighLightSuperStockist="No";
//   }
//   if(this.FINAL_FREE_QTY==undefined || this.FINAL_FREE_QTY==""){
//     this.isHighLightFinalFreeQty="Yes";
//     this.toastrService.error("Please Enter Value");
//     return;
//   }else{
//     this.isHighLightFinalFreeQty="No";
//   }
//   if(this.PRODUCT_CODE==undefined || this.PRODUCT_CODE==""){
//     this.isHighLightProduct="Yes";
//     this.toastrService.error("Please Select Product");
//     return;
//   }else{
//     this.isHighLightProduct="No";
//   }
//   if(this.INVOICE_IMG_UPLOAD==undefined || this.INVOICE_IMG_UPLOAD==""){
//     this.isHighLightInvoiceImgUpload="Yes";
//     this.toastrService.error("Please Select Image");
//     return;
//   }else{
//     this.isHighLightInvoiceImgUpload="No";
//   }

//   if(this.REMARK==undefined || this.REMARK==""){
//     this.isHighLightRemark="Yes";
//     this.toastrService.error("Please Enter Remark");
//     return
//   }else{
//     this.isHighLightRemark="No";
//   }
//   if(this.SELECT_LIST.length==0){
//     this.isHighLightSelected="Yes";
//     this.toastrService.error("Please Checked..");

//   }else{
//     this.isHighLightSelected="No";
//   }
//  }
 onClearData(){
  this.SUPERSTOCKIST_CODE="";
  this.IsShowGrid=false;
  this.FINAL_FREE_QTY="";
  this.PRODUCT_CODE="";
  this.imageSrc="";
  this.REMARK="";
  this.SELECT_LIST = [];
  this.SETTLEMENT_LIST = [];
}
}
