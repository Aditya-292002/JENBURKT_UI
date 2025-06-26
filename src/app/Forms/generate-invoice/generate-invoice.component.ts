import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.css']
})
export class GenerateInvoiceComponent implements OnInit {

  UNIT_LIST: any = [];
  HQ_LIST: any = [];
  SALES_ROLE_LIST: any = [];
  SAMPLE_PRODUCT_LIST: any = [];
  TRANSPORT_LIST: any = [];
  INVOICE_DATA: any = []
  UNIT_CODE: any;
  HQ_CODE: any;
  SALES_ROLE_CODE: any;
  MOBILE_NO: any;
  DC_DATE :any;
  maxDate: any;
  minDate: any;
  TOTAL_CASE: any;
  TOTAL_GROSS_WT: any;
  DISPATCH: any;
  STATE: any;
  userInfo: any;
  BILLING_ADDRESS: any;
  USER_NAME: any;
  USER_ID: any;
  EMAIL_ID: any;
  isLoaded: boolean = false;
  DOCKET_NO: any;
  INVOICE_DETAILS: any = [];
  INVOICE_HEADERS: any = [];
  DOCKET_DT:any;
  isShowGenerateInvoiceList: boolean = false;
  SAMPLE_PRODUCT_DETAILS: any = [];
  PRODUCT_DETALS_COUNT: any = 0;
  isHighLightUnit: string = "No";
  isHighLightHQ: string = "No";
  isHighLightSalesRoleList: string = "No";
  isHighLightUserName: string = "No";
  isHighLightEmail: string = "No";
  isHighLightMobileNo: string = "No";
  isHighLightState: string = "No";
  isHighLightTotalCase: string = "No";
  isHighLightTotalGrossWt: string = "No";
  isHighLightDispatch: string = "No";
  InvoiceData: any = {};
  InvoiceNonSampleDetails:any = [];
  ID:any;
  finalDetails:any = [];
  CYCLE_CODE:any;
  INVOICE_NO:any;
  disableAllInput:boolean=true;
  STATE_NAME:any;
  ADDRESS:any;
  IS_CHECK:any = 0;
  isHideButtons:boolean = false;

  REF_INVOICE_NO:any;
  constructor(private authService: AuthService, private url: URLService, private http: HttpService, private toastrService: ToastrService,
    private datepipe: DatePipe,private router: Router,private SharedService: SharedService) { }

  ngOnInit(): void {
    //  this.DC_DATE=new Date();
    //  this.DOCKET_DT=new Date();
    this.GetSampleInvoiceMasterList();
    this.InvoiceData = localStorage.getItem("InvoiceDetail")
    console.log('InvoiceData', this.InvoiceData)
    this.getInvoiceData();

  }

  getInvoiceData() {
  //  var toDate = this.datepipe.transform(new Date(this.DOCKET_DT), 'yyyy-MM-dd')
  //  let DC_DATE = this.datepipe.transform(new Date(this.INVOICE_HEADERS[0].DC_DATE),'dd-MM-yyyy');
  // let DOCKET_DT = this.datepipe.transform(new Date(this.INVOICE_HEADERS[0].DOCKET_DT),'dd-MM-yyyy');
    this.http.postnew(this.url.GETINVOICEDETAILSBYINVOICEID, JSON.parse(this.InvoiceData)).then(
      (res: any) => {
        console.log("response edit", res);//PRODUCTLIST
        this.isLoaded = false;
        this.INVOICE_DETAILS = res.INVOICE_DETAILS;
        this.INVOICE_HEADERS = res.INVOICE_HEADERS;
        //   let DC_DATE = this.datepipe.transform(new Date(this.INVOICE_HEADERS[0].DC_DATE),'dd-mm-yy');
        //  let DOCKET_DT = this.datepipe.transform(new Date(this.INVOICE_HEADERS[0].DOCKET_DT),'dd-mm-yy');
        this.PRODUCT_DETALS_COUNT = this.INVOICE_DETAILS.length;
        if (this.INVOICE_HEADERS.length > 0) {
          this.ID = this.INVOICE_HEADERS[0].ID
          this.INVOICE_NO = this.INVOICE_HEADERS[0].INVOICE_NO
          this.CYCLE_CODE = this.INVOICE_HEADERS[0].CYCLE_CODE
          this.TOTAL_CASE = this.INVOICE_HEADERS[0].TOTAL_CASE
          this.TOTAL_GROSS_WT = this.INVOICE_HEADERS[0].GROSS_WT
          this.DOCKET_NO = this.INVOICE_HEADERS[0].DOCKET_NO
          this.DOCKET_DT = new Date(this.INVOICE_HEADERS[0].DOCKET_DT)
          this.DISPATCH = this.INVOICE_HEADERS[0].DISPATCHED_THROUGH
          this.SALES_ROLE_CODE = this.INVOICE_HEADERS[0].SALESROLE_ID
          this.USER_NAME = this.INVOICE_HEADERS[0].USER_NAME
          this.UNIT_CODE = this.INVOICE_HEADERS[0].UNIT_CODE
           // console.log('this.UNIT_CODE1',this.UNIT_CODE);
           // this.UNIT_CODE=this.UNIT_LIST.filter((word) => word.UNIT_CODE == this.UNIT_CODE )
           // console.log('this.UNIT_CODE2',this.UNIT_CODE);
          
          this.HQ_CODE = this.INVOICE_HEADERS[0].HQ_CODE
          this.EMAIL_ID = this.INVOICE_HEADERS[0].EMAIL_ID
          this.MOBILE_NO = this.INVOICE_HEADERS[0].MOBILE_NO
          this.DC_DATE = new Date(this.INVOICE_HEADERS[0].DC_DATE)
          this.IS_CHECK = this.INVOICE_HEADERS[0].IS_EDIT
          this.USER_ID = this.INVOICE_HEADERS[0].USER_ID
          this.ADDRESS =  this.INVOICE_HEADERS[0].ADDRESS
          this.REF_INVOICE_NO =  this.INVOICE_HEADERS[0].REF_INVOICE_NO
  
          //  console.log("this.DC_DATE",this.DC_DATE)
          //  console.log("this.DOCKET_DT",this.DOCKET_DT)

          //  if(this.INVOICE_HEADERS[0].IS_EDIT==1){
          //     this.disableAllInput=true;
          //     this.isHideButtons = false;
          //  }else{
          //   this.disableAllInput=false;
          //   this.isHideButtons = true;
          //  }

        }

        for (let i = 0; i < this.INVOICE_DETAILS.length; i++) {
          this.INVOICE_DETAILS[i].PRODUCTLIST = this.SAMPLE_PRODUCT_LIST;
          this.INVOICE_DETAILS[i].isDisabled = true;
          this.INVOICE_DETAILS[i].IS_ADD = 0;
        }



      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );

  }
  GetSampleInvoiceMasterList() {
    this.userInfo = this.authService.getUserDetail();
    let data = {}
    //  this.isLoaded = true;
    this.http.postnew(this.url.GETSAMPLEINVOICEMASTERLIST, data).then(
      (res: any) => {
        console.log("response", res);//PRODUCTLIST
        this.isLoaded = false;
        this.SAMPLE_PRODUCT_LIST = res.SAMPLE_PRODUCT_LIST;
        this.HQ_LIST = res.HQ_LIST;
        this.SALES_ROLE_LIST = res.SALES_ROLE_LIST;
        this.TRANSPORT_LIST = res.TRANSPORT_LIST;
        this.UNIT_LIST = res.UNIT_LIST;


      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }



  // showGenerateInvoiceData() {

  //   let data = {
  //     "HQ_CODE": this.HQ_CODE,
  //   }

  //   console.log("data",data)
  //   //  this.isLoaded = true;
  //   this.http.postnew(this.url.GETSAMPLEALLOCDETAILSFORINVOICE, data).then(
  //     (res: any) => {


  //       this.isLoaded = false;
  //       this.isShowGenerateInvoiceList = true;
  //       this.SAMPLE_PRODUCT_DETAILS  = res.SAMPLE_PRODUCT_DETAILS;
  //       this.PRODUCT_DETALS_COUNT = this.SAMPLE_PRODUCT_DETAILS.length;
  //       for(let i=0;i<this.SAMPLE_PRODUCT_DETAILS.length;i++){
  //         this.SAMPLE_PRODUCT_DETAILS[i].SR_NO = (+i + 1);
  //         this.SAMPLE_PRODUCT_DETAILS[i].PRODUCTLIST = this.SAMPLE_PRODUCT_LIST;
  //         this.SAMPLE_PRODUCT_DETAILS[i].isDisabled = true;
  //       }
  //       console.log("test",  this.SAMPLE_PRODUCT_DETAILS);//PRODUCTLIST


  //     },
  //     error => {
  //       console.log(error);
  //       this.toastrService.error("Oops, Something went wrong.");
  //     }
  //   );

  // }



  GetSampleInvoiceDataById() {
    this.USER_NAME = "";
    this.EMAIL_ID = "";
    this.MOBILE_NO = "";
    this.userInfo = this.authService.getUserDetail();
    let data = {
      "UNIT_CODE": this.UNIT_CODE,
      "HQ_CODE": this.HQ_CODE,
      "SALES_ROLE_CODE": this.SALES_ROLE_CODE
    }
    console.log('123454444 he,',data);
    
    // this.isLoaded = true;
    this.http.postnew(this.url.GETSAMPLEINVOICEDATABYID, data).then(
      (res: any) => {
        console.log("response", res);
        this.isLoaded = false;

        this.INVOICE_DATA = res.INVOICE_DATA
        if (this.INVOICE_DATA.length > 0) {
          this.USER_NAME = this.INVOICE_DATA[0].USER_NAME;
          this.EMAIL_ID = this.INVOICE_DATA[0].EMAIL_ID;
          this.MOBILE_NO = this.INVOICE_DATA[0].MOBILE_NO;
          this.USER_ID = this.INVOICE_DATA[0].USER_ID
          this.ADDRESS = this.INVOICE_DATA[0].ADDRESS
        }

      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  addGenerateList(data: any) {
    console.log(data, "data")
    var ProductList: any = [];
    var j = 0;
    for (let i = 0; i < data.PRODUCTLIST.length; i++) {
      if (data.PRODUCTLIST[i].SAMPLE_CODE == false ) {
        ProductList[j] = data.PRODUCTLIST[i];
        j++;
      }
    }

    this.INVOICE_DETAILS.push({
      "SR_NO": +(data.SR_NO) + 1, "SAMPLE_PRODUCT_CODE": "", "ALLOC_OTY": "", "DC_QTY": "","IS_ADD": 1,
      "PRODUCTLIST": ProductList
    });


  }

  deleteRowList(i) {
    if (this.INVOICE_DETAILS.length > 1) {
      const index = this.INVOICE_DETAILS.indexOf(this.INVOICE_DETAILS[i]);
      if (index > -1) {
        this.INVOICE_DETAILS.splice(index, 1);
      }
    }
  }


  onSaveGenerateInvoiceClick() {
    this.userInfo = JSON.parse(this.authService.getUserDetail());

    // var j = 0;
    // for(let i=0;i<this.INVOICE_DETAILS.length;i++){
    //   if(this.INVOICE_DETAILS[i].IS_ADD == 1){
    //     this.finalDetails[j] = this.INVOICE_DETAILS[i];
    //     j++;
    //   }
    // }

    let data = {
      "ID":this.ID,
      "INVOICE_NO":this.INVOICE_NO,
      "UNIT_CODE": this.UNIT_CODE,
      "HQ_CODE": this.HQ_CODE,
      "CYCLE_CODE": this.CYCLE_CODE,
      "SALES_ROLE_CODE": this.SALES_ROLE_CODE,
      "USER_ID": this.USER_ID,
      "USER_NAME": this.USER_NAME,
      "EMAIL_ID": this.EMAIL_ID,
      "MOBILE_NO": this.MOBILE_NO,
      "DC_DATE": this.DC_DATE,
      "DETAILS": this.INVOICE_DETAILS,
      "TOTAL_CASE": this.TOTAL_CASE,
      "TOTAL_GROSS_WT": this.TOTAL_GROSS_WT,
      "DOCKET_NO": this.DOCKET_NO,
      "DOCKET_DT": this.DOCKET_DT,
      "DISPATCHED_THROUGH": this.DISPATCH,
      "CREATED_BY": +this.userInfo.USER_ID,
      "IS_EDIT":this.IS_CHECK,
      "REF_INVOICE_NO":this.REF_INVOICE_NO,
      "ADDRESS":this.ADDRESS
    }
    console.log(JSON.stringify(data));
    //this.isLoaded = true;

    this.http.postnew(this.url.SAVESAMPLEPRODUCTINVOICEDATA, data).then(
      (res: any) => {
        this.isLoaded = false;
        console.log("data",res)
        if (res.data[0].FLAG == true) {
          this.toastrService.success(res.data[0].MSG)
          this.GetSampleInvoiceMasterList();
          this.clearFormData();
        }
        if (res.data[0].FLAG == false) {
          this.toastrService.error(res.data[0].MSG)
        }
      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  Checked(event){
    if(event.target.checked){
      this.IS_CHECK = 1
    }
    else{
      this.IS_CHECK = 0
    }
    console.log(this.IS_CHECK)

  }

  clearFormData() {
    this.UNIT_CODE = "";
    this.HQ_CODE = "";
    this.SALES_ROLE_CODE = "";
    this.USER_NAME = "";
    this.EMAIL_ID = "";
    this.MOBILE_NO = "";
    this.STATE = "";
    this.DC_DATE = new Date();
    this.BILLING_ADDRESS = "";
    this.isShowGenerateInvoiceList = false;
    this.SAMPLE_PRODUCT_DETAILS = [];
    this.TOTAL_CASE = "";
    this.TOTAL_GROSS_WT = "";
    this.DISPATCH = "";
     this.router.navigate(['/editInvoice'])

  }

  formValidated() {
    this.isHighLightUnit = "No";
    this.isHighLightHQ = "No";
    this.isHighLightSalesRoleList = "No";
    this.isHighLightUserName = "No";
    this.isHighLightEmail = "No";
    this.isHighLightMobileNo = "No";
    this.isHighLightState = "No";
    this.isHighLightTotalCase = "No";
    this.isHighLightTotalGrossWt = "No";
    this.isHighLightDispatch = "No";

    if (this.UNIT_CODE == undefined || this.UNIT_CODE == "") {
      this.isHighLightUnit = "Yes";
      this.toastrService.error("Please Select a Unit");
      return;
    } else {
      this.isHighLightUnit = "No";
    }

    if (this.HQ_CODE == undefined || this.HQ_CODE == "") {
      this.isHighLightHQ = "Yes";
      this.toastrService.error("Please Select a HQ Code ");
      return;
    } else {
      this.isHighLightHQ = "No";
    }

    if (this.SALES_ROLE_CODE == undefined || this.SALES_ROLE_CODE == "") {
      this.isHighLightSalesRoleList = "Yes";
      this.toastrService.error("Please Select a Send To");
      return;
    } else {
      this.isHighLightSalesRoleList = "No";
    }

    if (this.USER_NAME == undefined || this.USER_NAME == "") {
      this.isHighLightUserName = "Yes";
      this.toastrService.error("Please Enter a User Name");
      return;
    } else {
      this.isHighLightUserName = "No";
    }

    if (this.EMAIL_ID == undefined || this.EMAIL_ID == "") {
      this.isHighLightEmail = "Yes";
      this.toastrService.error("Please Enter a Email");
      return;
    }

    if (this.MOBILE_NO == undefined || this.MOBILE_NO == "") {
      this.isHighLightMobileNo = "Yes";
      this.toastrService.error("Please Enter a Mobile No");
      return;
    } else {
      this.isHighLightMobileNo = "No";
    }

    if (this.STATE == undefined || this.STATE == "") {
      this.isHighLightState = "Yes";
      this.toastrService.error("Please Enter a State");
      return;
    } else {
      this.isHighLightState = "No";
    }

    if (this.TOTAL_CASE == undefined || this.TOTAL_CASE == "") {
      this.isHighLightTotalCase = "Yes";
      this.toastrService.error("Please Enter a Total Case");
      return;
    } else {
      this.isHighLightTotalCase = "No";
    }

    if (this.TOTAL_GROSS_WT == undefined || this.TOTAL_GROSS_WT == "") {
      this.isHighLightTotalGrossWt = "Yes";
      this.toastrService.error("Please Enter a Total Gross Wt..");
      return;
    } else {
      this.isHighLightTotalGrossWt = "No";
    }

    if (this.DISPATCH == undefined || this.DISPATCH == "") {
      this.isHighLightDispatch = "Yes";
      this.toastrService.error("Please Select a Dispatch Thru");
      return;
    } else {
      this.isHighLightDispatch = "No";
    }

    if (this.isHighLightUnit != "Yes" || this.isHighLightHQ != "Yes" || this.isHighLightSalesRoleList != "Yes" || this.isHighLightUserName != "Yes" || this.isHighLightEmail != "Yes" || this.isHighLightMobileNo != "Yes" || this.isHighLightState != "Yes") {
      this.onSaveGenerateInvoiceClick();
      return
    }
  }

}
