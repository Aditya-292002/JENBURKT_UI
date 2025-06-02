import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-update-claim-report',
  templateUrl: './update-claim-report.component.html',
  styleUrls: ['./update-claim-report.component.css']
})
export class UpdateClaimReportComponent implements OnInit {
  onShowGrid:boolean = false;
  reportGrid:any = [];
  fromDate:any = new Date();;
  toDate:any = new Date();
  userInfo:any = {};
  superStockist:any;
  superStockistList:any = [];
  FM_LIST:any = [];
  FM:any;
  reportType:any = '';
  Values:any = [];
  Header:any = [];
  REPORT_HEADERS:any = [];
  REPORT_DATA:any = [];
  superStockistName:any = "";
  userDetails:any = {}
  UpdateClaimPopUp:boolean = false;
  NEGOTIATED_DISCOUNT_QUANTITY:any;
  TRADE_DISCOUNT_QUANTITY:any;
  APPROVED_SALE_QUANTITY:any;
  PRODUCT_NAME:any;
  MRP_RATE:any;
  MRP_ID:any;
  UPDATED_MRP_ID:any;
  MRP_LIST:any =[];
  CLIAM_ID:any;
  CLIAM_NO:any;
  UPDATED_REMARKS:any;
  INVOICE_NO:any;
  INVOICE_DATE:any ;
  ToDate:any =  new Date();
  selectedDownloadData:any = [];
  selectAll:boolean = false;
  EDIT_MRP_ID:any;

  constructor(private commonService:CommonService,private authService:AuthService,private datepipe:DatePipe,private url:URLService,
    private http:HttpService,private toastrService:ToastrService) { }

    ngOnInit(): void {
      this.getMasterData();
      this.userDetails = JSON.parse(this.authService.getUserDetail());
    }

    
  getMasterData(){
    this.userInfo = this.authService.getUserDetail();

    let data={
      "USER_ID": JSON.parse(this.userInfo).USER_ID,
    }

  
    this.http.postnew(this.url.GETCLAIMMASTERDATAFORREPORT,data).then(
      (res:any)=>{

        this.superStockistList = res.SUPER_STOCKIST_LIST
        this.FM_LIST = res.FM_LIST

      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  
  onViewReport(val:any){

    this.userInfo = this.authService.getUserDetail();
    let fromDate = this.datepipe.transform(this.fromDate, "yyyy-MM-dd");
    let toDate = this.datepipe.transform(this.toDate, "yyyy-MM-dd");
    let data={
      "FROM_DATE":fromDate,
      "TO_DATE":toDate,
      "SUPER_STOCKIST_CODE":this.superStockist,
      "FM":this.FM.FM_CODE,
      "USER_ID": JSON.parse(this.userInfo).USER_ID,
    }

    this.http.postnew(this.url.GETUPDATECLAIMREPORT,data).then(
      (res:any)=>{
        this.Values=[];
        this.Header = [];
       // this.isLoaded= false;
       this.REPORT_DATA = [];
       this.REPORT_DATA = res.REPORT_DATA
       if(val == 0){
        this.REPORT_DATA.forEach((element:any)=>{
          this.selectedDownloadData.forEach((data:any)=>{
          if(data.Claim_Id == element.Claim_Id && data.SELECTED == true){
              element.SELECTED = true;
          }
          })
         })
       }else {
        this.selectedDownloadData = [];
       }
      //  console.log('selectedDownloadData ->' , this.selectedDownloadData)
      //  console.log('REPORT_DATA ->' , this.REPORT_DATA)
       this.REPORT_HEADERS = res.REPORT_HEADERS
       this.reportGrid = [];
       this.reportGrid.v_header = res.REPORT_HEADERS
       this.reportGrid.v_detail = res.REPORT_DATA

       if(this.REPORT_DATA.length == 0){
        this.toastrService.error("No Records Found")
       }

       this.REPORT_DATA.forEach((element:any)=> {
        this.Header=Object.keys(element)
        // console.log('element ->' , element)
        // return
        // console.log('header ->' , this.Header)
        // element.CLAIM_DATE = this.datepipe.transform(element.CLAIM_DATE, "dd-MM-yyyy")
        // element.INVOICE_DATE = this.datepipe.transform(element.INVOICE_DATE, "dd-MM-yyyy")
        
        element["Claim_Date"] = (this.datepipe.transform(element["Claim_Date"], "dd-MM-yyyy")).toString();
        element["Invoice_Date"] = (this.datepipe.transform(element["Invoice_Date"], "dd-MM-yyyy")).toString();
        element.MRP_VALUE = (element.Negotiated_Discount_Quantity * element.MRP);
        if(element.PRODUCT_CODE == "FG0000061" || element.PRODUCT_CODE == "FG0000062" || element.PRODUCT_CODE == "FG0000063" ){
          let MRP_VALUE = (element.Negotiated_Discount_Quantity * element.MRP);
          element.PTR_VALUE = (MRP_VALUE * 0.67796);
          element.PTS_VALUE = (MRP_VALUE * 0.61016);
          element.PTSS_VALUE = (MRP_VALUE * 0.58881);
        }else {
          let MRP_VALUE = (element.Negotiated_Discount_Quantity * element.MRP);
          element.PTR_VALUE = (MRP_VALUE * 0.71428);
          element.PTS_VALUE = (MRP_VALUE * 0.64285);
          element.PTSS_VALUE = (MRP_VALUE * 0.62036);
        }
      //  element.Trade_Discount_Qty = Math.trunc(element.Trade_Discount_Qty);
        this.Values.push(Object.values(element));

        for(let i =0 ;i<this.superStockistList.length;i++){
          if(this.superStockistList[i].SUPERSTOCKIST_CODE == this.superStockist){
            this.superStockistName = this.superStockistList[i].SUPERSTOCKIST_NAME;
          }
         }
      
       });
      this.onShowGrid=true;
      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  async OpenUpdateClaimPopUp(value:any){
// console.log('value ->' , value)

   this.CLIAM_ID = value.Claim_Id;
   this.CLIAM_NO = value.Claim_No;
   this.PRODUCT_NAME = value.Product_Name;
   this.APPROVED_SALE_QUANTITY = value.Approved_Sale_Quantity;
   this.TRADE_DISCOUNT_QUANTITY = value.Trade_Discount_Qty;
   this.NEGOTIATED_DISCOUNT_QUANTITY = value.Negotiated_Discount_Quantity;
   this.INVOICE_NO = value.Invoice_No;
   this.INVOICE_DATE = value.Invoice_Date;
  //  this.INVOICE_DATE =  (this.datepipe.transform(value.Invoice_Date, "dd.MM.yyyy")).toString() ;
  //  this.MRP_ID = value.UPDATED_MRP_ID != 0 ? value.UPDATED_MRP_ID : value.MRP;
   this.UPDATED_REMARKS = value.UPDATED_REMARKS;
   let PRODUCT_CODE = value.PRODUCT_CODE;
   this.EDIT_MRP_ID = value.MRP_ID;
   let data ={
    "MRP_ID": this.EDIT_MRP_ID,
    "PRODUCT_CODE": PRODUCT_CODE
   }
   this.MRP_LIST = [];
   this.MRP_LIST  = await this.getMrpData(data,this.EDIT_MRP_ID);
   this.MRP_ID = this.EDIT_MRP_ID;
   
// console.log('MRP_ID ->' , this.MRP_ID)
// console.log('MRP_LIST ->' , this.MRP_LIST)
   this.UpdateClaimPopUp = true;
  }
  
  getMrpData(data: any,id:any): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.postnew(this.url.GETPRODUCTCODEMRPLIST, data).then(
      (res: any) => {
        if (res.MRP_LIST.length > 0 ) {
          resolve(res.MRP_LIST); // Resolve with the response data
        } else {
          const invalid = { Flag: false, Msg: "Oops, Something went wrong." };
          this.toastrService.error("Oops, Something went wrong."); // Display toastr message
          reject(invalid); // Reject with the error data
        }
      },
      error => {
        this.toastrService.error("Oops, Something went wrong.");
        reject(error); // Reject with the error
      }
    );
  });
}


  onUpdateReport(){
     
    if(!this.commonService.isValid(this.INVOICE_NO)){
      this.toastrService.error('Enter the Invoice No')
      return;
  }
  if(!this.commonService.isValid(this.INVOICE_DATE)){
    this.toastrService.error('Select a Invoice Date')
    return;
}
    if(!this.commonService.isValid(this.APPROVED_SALE_QUANTITY)){
        this.toastrService.error('Enter the Approved sale quantity')
        return;
    }
    if(this.APPROVED_SALE_QUANTITY < 0){
      this.toastrService.error('Approved sale quantity should be zero or greater than zero')
      return;
    }
    if(this.TRADE_DISCOUNT_QUANTITY === '' || this.TRADE_DISCOUNT_QUANTITY === undefined || this.TRADE_DISCOUNT_QUANTITY === 'undefined'){
      this.toastrService.error('Enter the Trade discount quantity')
      return;
    }
    if(this.TRADE_DISCOUNT_QUANTITY < 0){
      this.toastrService.error('Trade discount quantity should be zero or greater than zero')
      return;
    }
    if(!this.commonService.isValid(this.NEGOTIATED_DISCOUNT_QUANTITY)){
     this.toastrService.error('Enter the Negotiated discount quantity')
     return;
    }
    if(this.NEGOTIATED_DISCOUNT_QUANTITY < 0){
      this.toastrService.error('Negotiated discount quantity should be zero or greater than zero')
      return;
    }
    if(!this.commonService.isValid(this.MRP_ID)){
      this.toastrService.error('Select the Mrp Rate')
      return;
    }
    // let date = this.datepipe.transform(this.INVOICE_DATE, "yyyy-MM-dd");
    let date = this.convertDate(this.INVOICE_DATE);
    let data ={
      "CLIAM_ID": this.CLIAM_ID,
      "CLIAM_NO": this.CLIAM_NO,
      "APPROVED_SALE_QUANTITY": this.APPROVED_SALE_QUANTITY,
      "TRADE_DISCOUNT_QUANTITY": this.TRADE_DISCOUNT_QUANTITY,
      "NEGOTIATED_DISCOUNT_QUANTITY": this.NEGOTIATED_DISCOUNT_QUANTITY,
      "UPDATED_MRP_ID": this.MRP_ID,
      "UPDATED_REMARKS": this.UPDATED_REMARKS,
      "INVOICE_NO": this.INVOICE_NO,
      "INVOICE_DATE": date
     }  
    //  console.log('data ->' , JSON.stringify(data))
     this.http.postnew(this.url.SAVEUPDATECLAIMREPORT,data).then(
      (res:any)=>{
        // console.log('res ->' , res)
        if(res.data.FLAG == true){
          this.UpdateClaimPopUp = false;
          this.UPDATED_REMARKS = '';
          this.toastrService.success(res.data.MSG)
          this.onViewReport(0);
        }else if(res.data.FLAG == false){
          this.toastrService.error(res.data.MSG)
        }
      });
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
  }

  CloseUpdateClaimPopUp(){
    this.UpdateClaimPopUp = false;
    this.APPROVED_SALE_QUANTITY = '';
    this.TRADE_DISCOUNT_QUANTITY = '';
    this.NEGOTIATED_DISCOUNT_QUANTITY = '';
    this.MRP_ID = 0;
    this.UPDATED_REMARKS = '';
    this.INVOICE_NO = '';
  }


  toggleCheckboxAll(event: any) {
  this.selectedDownloadData = [];
    if(event.target.checked){
      this.selectAll = true;
      for(let i = 0;i<this.REPORT_DATA.length;i++){
        this.REPORT_DATA[i].SELECTED = true
      }

    }
    else{
      this.selectAll = false;
      for(let i = 0;i<this.REPORT_DATA.length;i++){
        this.REPORT_DATA[i].SELECTED = false
      }
    }
    this.REPORT_DATA.forEach((element:any)=>{
      if(element.SELECTED === true){
      this.selectedDownloadData.push(element);
      }
    });

  }

  singleCheckbox(event: any,data:any) {
    // if(this.selectedDownloadData.length === 0){
    //   this.selectedDownloadData.push(data);
    // }else if(this.selectedDownloadData.length > 0){
    //   this.selectedDownloadData.forEach((element:any)=>{
    //     if(element.SrNo === data.SrNo){
    //        this.selectedDownloadData.splice(element,1);
    //     }else {
    //        this.selectedDownloadData.push(data);
    //     }
    //   })
    // }

    // if (event.target.checked == false){
    //   this.selectAll = false;
    // }
   // console.log(event.target.checked,data,"checked");
 
    if(event.target.checked == true){
      this.selectedDownloadData.push(data);
    }else{
      let ind = this.selectedDownloadData.findIndex(obj => obj === data);
      if (ind !== -1) {
       // console.log(ind,"success");
        this.selectedDownloadData.splice(ind,1);
      }


    }
  //  console.log(this.selectedDownloadData,"this.selectedDownloadData");
     if (event.target.checked == false){
        this.selectAll = false;
      }
  }


  DowloadInExcel(){
    if(this.selectedDownloadData.length === 0){
       this.toastrService.error('Select a at least one claim');
       return
    }
    let fromDate = this.datepipe.transform(this.fromDate, "yyyy-MM-dd");
    let toDate = this.datepipe.transform(this.toDate, "yyyy-MM-dd");
    let SAMPEL_CLAIM_DATA = [];
    this.selectedDownloadData.forEach((element:any) => {
      SAMPEL_CLAIM_DATA.push({
          "SrNo": element.SrNo,
          "Claim No": element.Claim_No,
          "Claim Date": element.Claim_Date,
          "Head Quarter Code": element.Head_Quarter_Code,
          "Head Quarter Name": element.Head_Quarter_Name,
          "Stockist Name": element.Stockist_Name,
          "Invoice No": element.Invoice_No,
          "Invoice Date": element.Invoice_Date,
          "Chemist And Hospital Name": element.Chemist_And_Hospital_Name,
          "Doctor Name": element.Doctor_Name,
          "Product Name": element.Product_Name,
          "Approved Sale Quantity": element.Approved_Sale_Quantity,
          "Trade Discount Qty": element.Trade_Discount_Qty,
          "Negotiated Discount Quantity": element.Negotiated_Discount_Quantity,
          "MRP": element.MRP,
          "DISC": element.DISC,
          "Remarks": element.UPDATED_REMARKS,
          "MRP Value": element.MRP_VALUE,
          "PTR Value": element.PTR_VALUE,
          "PTS Value": element.PTS_VALUE,
          "PTSS Value": element.PTSS_VALUE}
      )
    });
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(SAMPEL_CLAIM_DATA);
      const workbook = { Sheets: { 'data': worksheet },  Props: {}, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Claim_Report" + "_" + "fromDate_" + fromDate + "_" + "toDate_" + toDate);
    });
  }
  
    saveAsExcelFile(buffer: any, xl_file_name: string): void {
    try {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        xl_file_name + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    } catch (error) { 
      console.error('Error saving Excel file:', error);
    }
    } 

    convertDate(inputDate: string): string | null {
      let date: Date;

    // Check if the input date is in dd-MM-yyyy format
    const ddMMyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (ddMMyyyyRegex.test(inputDate)) {
      const [day, month, year] = inputDate.split('-').map(Number);
      date = new Date(year, month - 1, day); // Create a date object
    } else {
      // Assume input is a valid JavaScript date string
      date = new Date(inputDate);
    }

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return null; // Invalid date
    }

    // Format to 'yyyy-MM-dd'
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
    }

}

