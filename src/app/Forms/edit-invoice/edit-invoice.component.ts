import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
declare var $: any;
@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {
  @Output() showTemplateView = new EventEmitter<string>();
  isShowEditInvoiceDetailsList: boolean = false
  isShowConfig: boolean = false;
  DataList: any = [];
  serviceTypeId: any = 'test'
  isHide: boolean = true;
  INVOICE_LIST: any = [];
  isLoaded: boolean = false;
  id: any;
  DOCKET_NO: any;
  DOCKET_DT: any = new Date();
  invoice_no: any
  // list:any;
  userInfo: any;
  DC_DATE = new Date();
  IncvoiceHeader: any = [];
  InvoiceDetail: any = [];
  InvoiceCycleDetail: any = [];
  CON_EMAIL_ID: any;
  CON_MOBILE_NO: any = "";
  CON_STATE_CODE: any = "";
  CON_STATE_NAME: any = "";
  CON_USER_ADDRESS: any = "";
  CON_USER_ID: any = "";
  CON_USER_NAME: any = "";
  DISTRICT: any = "";
  DRUG_LIC_NO: any = "";
  FOOD_LIC_NO: any = "";
  GST_IN_NO: any = "";
  PLANT_ADDRESS: any = "";
  STATE_CODE: any = "";
  STATE_NAME: any = "";
  TEL_NO: any = "";
  UNIT_CODE: any = "";
  MR_MOBILE_NO: any = "";
  RSM_MOBILE_NO: any = "";
  RSM_NAME: any = "";
  TOTAL_CASE: any = "";
  GROSS_WT: any = "";
  DOCKET_NO_PRINT: any = "";
  DOCKET_DT_PRINT: any = "";
  isShowPrintInvoiceList: boolean = false;
  DISPATCHED_NAME: any = "";
  IS_EDIT:number;
  // DC_QTY:any = "";
  // HSM_CODE:any = "";
  // RATE_TAX:any = "";
  // RATE_UNIT:any = "";
  // SAMPLE_PRODUCT_COGROSS_WTDE:any = "";
  // SAMPLE_PRODUCT_DESC:any = "";
  // SR_NO:any = "";
  // TAXABLE_VALUE:any = "";
  // TAX_AMT:any = "";
  // TYPE_TAX:any = "";
  // UNIT:any = "";
  UNIT_LIST: any = [];
  CYCLE_LIST: any = [];
  INVOICE_DETAILS:any=[];
  CYCLE_CODE: any;
  isHighLightUnit: string = "No";
  isHighLightCycle: String = "No";
  CALYEAR: any = "";
  FROM_DATE: any = "";
  TO_DATE: any = "";
  TODAY_DATE: any;
  INVOICE_NO_PRINT: any;
  INVOICE_ID:any;
  HQ_CODE:any;
  STATUS_CODE:any;
  STATUS_LIST: any = [
    {
      "STATUS_CODE": 0,
      "STATUS_DESC": "All"
    },
    {
      "STATUS_CODE": 1,
      "STATUS_DESC": "Pending"
    },
    {
      "STATUS_CODE": 2,
      "STATUS_DESC": "Dispatched"
    }
  ]
filterInvoiceDetails:any = [];
  constructor(private router: Router, private authService: AuthService, private url: URLService, private http: HttpService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    for (let i = 0; i < 42; i++) {
      if (this.DataList.length < i) {
        this.DataList.push({
          "SR_NO": i,
          "HSN_CODE": 3004,
          "Product": "METMIN A TABLET",
          "Quantity": 40,
          "Unit": " 2 TAB",
          "Rate": "0.00",
          "Taxable_Value": "0.00",
          "Rate_of_Tax": "",
          "Type_of_Tax": "",
          "Tax_Amt": "0.00"
        });
      }

    }

    this.getEditInvoiceMasterList();

    this.TODAY_DATE = new Date();
  }


  onPrintInvoiceChange() {
    this.isShowPrintInvoiceList = true;
    let data = {
    "CYCLE_CODE":this.CYCLE_CODE,
     "UNIT_CODE":this.UNIT_CODE
    }

    this.http.postnew(this.url.SHOWINVOICEDATABYCYCLECODEANDUNITCODE, data).then(
      (res: any) => {
        console.log("response print", res);//PRODUCTLIST
        this.isLoaded = false;
        this.INVOICE_DETAILS=res.INVOICE_DETAILS
        this.filterInvoiceDetails =  res.INVOICE_DETAILS

      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  getEditInvoiceMasterList() {
    this.userInfo = JSON.parse(this.authService.getUserDetail());
    let data = {

    }
    this.http.postnew(this.url.GETINVOICEMASTERLIST, data).then(
      (res: any) => {
        this.isLoaded = false;
        // this.INVOICE_LIST = res.INVOICE_LIST,
          this.CYCLE_LIST = res.CYCLE_LIST,
          this.UNIT_LIST = res.UNIT_LIST

      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  getEditInvoiceUpdateList() {
    this.userInfo = JSON.parse(this.authService.getUserDetail());
    let data = {
      "ID": this.id,
      "INVOICE_NO": this.invoice_no,
      "DOCKET_NO": this.DOCKET_NO,
      "DOCKET_DT": this.DOCKET_DT,
      "USER_ID": (+this.userInfo.USER_ID)

    }

    this.http.postnew(this.url.UPDATESAMPLEINVOICEDATA, data).then(
      (res: any) => {
        console.log("response", res);//PRODUCTLIST
        this.isLoaded = false;

        if (res.data[0].FLAG == true) {
          this.toastrService.success(res.data[0].MSG)
          this.clearData();
          this.getEditInvoiceMasterList();
          this.isShowEditInvoiceDetailsList = false;
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
  onEditClick(list:any) {
    console.log(list,"data")
    let data={
     "INVOICE_ID":list.INVOICE_NO,
     "CYCLE_CODE":this.CYCLE_CODE,
      "UNIT_CODE":this.UNIT_CODE,
      "HQ_CODE":list.HQ_CODE
    }

    localStorage.setItem("InvoiceDetail",JSON.stringify(data));
    this.router.navigate(["/generateinvoice"]);


  }
  clearData() {
    this.DOCKET_DT = "";
    this.DOCKET_NO = "";
  }
  onPrintClick() {
    // this.isShowConfig = true
    this.showTemplateView.emit('test');
    this.serviceTypeId = 'test'
    console.log("service-type")
  }

  closePopup() {
    this.isShowEditInvoiceDetailsList = false;
  }

  onCancel() {
    this.isShowEditInvoiceDetailsList = false;
  }
  onEmitConfig(event: any) {
    this.isShowConfig = false
  }

  getInvoiceData(invoiceData: any) {
    console.log("invoiceData", invoiceData)

    this.isLoaded = true
    this.userInfo = JSON.parse(this.authService.getUserDetail());
    this.id = invoiceData.ID;
    this.invoice_no = invoiceData.INVOICE_NO;
    let data = {
      "ID": this.id,
      "INVOICE_NO": this.invoice_no,
      "USER_ID": (+this.userInfo.USER_ID)

    }

    this.http.postnew(this.url.GETINVOICEDATAFORPRINT, data).then(
      (res: any) => {


        //  if (res.data[0].FLAG == true) {
        this.IncvoiceHeader = res.INVOICE_HEADER;
        this.InvoiceDetail = res.INVOICE_DETAIL;
        this.InvoiceCycleDetail = res.INVOICE_CYCLE_DETAIL;

        if (this.IncvoiceHeader.length > 0) {
          this.CON_EMAIL_ID = this.IncvoiceHeader[0].CON_EMAIL_ID;
          this.CON_MOBILE_NO = this.IncvoiceHeader[0].CON_MOBILE_NO;
          this.CON_STATE_CODE = this.IncvoiceHeader[0].CON_STATE_CODE;
          this.CON_STATE_NAME = this.IncvoiceHeader[0].CON_STATE_NAME;
          this.CON_USER_ADDRESS = this.IncvoiceHeader[0].CON_USER_ADDRESS;
          this.CON_USER_ID = this.IncvoiceHeader[0].CON_USER_ID;
          this.CON_USER_NAME = this.IncvoiceHeader[0].CON_USER_NAME;
          this.DISTRICT = this.IncvoiceHeader[0].DISTRICT;
          this.DRUG_LIC_NO = this.IncvoiceHeader[0].DRUG_LIC_NO;
          this.FOOD_LIC_NO = this.IncvoiceHeader[0].FOOD_LIC_NO;
          this.GST_IN_NO = this.IncvoiceHeader[0].GST_IN_NO;
          this.PLANT_ADDRESS = this.IncvoiceHeader[0].PLANT_ADDRESS;
          this.STATE_CODE = this.IncvoiceHeader[0].STATE_CODE;
          this.STATE_NAME = this.IncvoiceHeader[0].STATE_NAME;
          this.TEL_NO = this.IncvoiceHeader[0].TEL_NO;
          this.UNIT_CODE = this.IncvoiceHeader[0].UNIT_CODE;
          this.MR_MOBILE_NO = this.IncvoiceHeader[0].MR_MOBILE_NO;
          this.RSM_NAME = this.IncvoiceHeader[0].RSM_NAME;
          this.RSM_MOBILE_NO = this.IncvoiceHeader[0].RSM_MOBILE_NO;
          this.TOTAL_CASE = this.IncvoiceHeader[0].TOTAL_CASE;
          this.GROSS_WT = this.IncvoiceHeader[0].GROSS_WT;
          this.DOCKET_NO_PRINT = this.IncvoiceHeader[0].DOCKET_NO;
          this.DOCKET_DT_PRINT = this.IncvoiceHeader[0].DOCKET_DT;
          this.DISPATCHED_NAME = this.IncvoiceHeader[0].DISPATCHED_NAME;
          this.INVOICE_NO_PRINT = this.IncvoiceHeader[0].INVOICE_NO;

        }

        if (this.InvoiceDetail.length > 0) {

          // this.DC_QTY = res.DC_QTY;
          // this.HSM_CODE = res.HSM_CODE;
          // this.RATE_TAX = res.RATE_TAX;
          // this.RATE_UNIT = res.RATE_UNIT;
          // this.SAMPLE_PRODUCT_CODE = res.SAMPLE_PRODUCT_CODE;
          // this.SAMPLE_PRODUCT_DESC = res.SAMPLE_PRODUCT_DESC;
          // this.SR_NO = res.SR_NO;
          // this.TAXABLE_VALUE = res.TAXABLE_VALUE;
          // this.TAX_AMT = res.TAX_AMT;
          // this.TYPE_TAX = res.TYPE_TAX;
          // this.UNIT = res.UNIT;
        }

        if (this.InvoiceCycleDetail.length > 0) {
          this.CALYEAR = this.InvoiceCycleDetail[0].CALYEAR;
          this.FROM_DATE = this.InvoiceCycleDetail[0].FROM_DATE;
          this.TO_DATE = this.InvoiceCycleDetail[0].TO_DATE;

        }

        // for (let i = 0; i < 70; i++) {

        //   this.InvoiceDetail.push({
        //     "SR_NO": this.InvoiceDetail.length + 1,
        //     "HSN_CODE": "",
        //     "Product": "",
        //     "Quantity": "",
        //     "Unit": "",
        //     "Rate": "",
        //     "Taxable_Value": "",
        //     "Rate_of_Tax": "",
        //     "Type_of_Tax": "",
        //     "Tax_Amt": ""
        //   });
        // }


        var invoiceCount = this.InvoiceDetail.length;
        var page = 1;
        var pageSize = 35;
        var totalpage = (invoiceCount / pageSize) + 1;

        console.log(invoiceCount,pageSize,totalpage,"test")
        if (invoiceCount < pageSize) {
          for (let i = 0; i < pageSize - invoiceCount; i++) {
            this.InvoiceDetail.push({
              "SR_NO": this.InvoiceDetail.length + 1,
              "HSN_CODE": "",
              "Product": "",
              "Quantity": "",
              "Unit": "",
              "Rate": "",
              "Taxable_Value": "",
              "Rate_of_Tax": "",
              "Type_of_Tax": "",
              "Tax_Amt": ""
            });
          }
        }
        else{
          // var count = 53;
          // var testcount =   invoiceCount - count;
          // console.log(testcount,"testcount")
          // for (let i = 0; i < testcount; i++) {

          //   this.InvoiceDetail.push({
          //     "SR_NO": this.InvoiceDetail.length + 1,
          //     "HSN_CODE": "",
          //     "Product": "",
          //     "Quantity": "",
          //     "Unit": "",
          //     "Rate": "",
          //     "Taxable_Value": "",
          //     "Rate_of_Tax": "",
          //     "Type_of_Tax": "",
          //     "Tax_Amt": ""
          //   });
          // }
        }









        // console.log(pageSize-invoiceCount,this.InvoiceDetail,"detail")
        this.isLoaded = true;
        setTimeout(() => {                           // <<<---using ()=> syntax
          this.printDiv('print-new')
        }, 4000);

        // }
        // if (res.data[0].FLAG == false) {
        //   this.toastrService.error(res.data[0].MSG)
        //   return;
        // }

      },
      error => {
        this.isLoaded = false;
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );

  }

  printDiv(divName) {
    console.log(divName)
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    this.isLoaded = false;
    // window.focus();
    window.print();
    window.location.reload();
    // window.close();

    // this.isHide=false
    document.body.innerHTML = originalContents;
    // window.onafterprint = function(){
    //   console.log("Printing completed...");
    //   window.close()
    // }

    // var winPrint = window.open('', '', 'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
    // winPrint.document.write('print-new');
    // winPrint.document.close();
    // winPrint.focus();
    // winPrint.print();
    // winPrint.close();
  }


  filterCycle:any=[];
  filteredCycle(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.CYCLE_LIST.length; i++) {
      let CYCLE_LIST = this.CYCLE_LIST[i];
      if (CYCLE_LIST.CYCLE_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(CYCLE_LIST);
      }
    }

    this.filterCycle = filtered;
  }

  setCycle(fileterlist, code: any) {
    code = "";
      this.filterCycle.forEach((element: any, index: number) => {
        if (element.CYCLE_DESC != this.CYCLE_LIST.CYCLE_DESC && this.CYCLE_LIST.CYCLE_DESC == undefined) {
          if (index == 0) {
            code = element;
            this.CYCLE_LIST = code;
            this.filterCycle = [];
          }
          else {
            this.CYCLE_LIST = element;
            return;
          }
        }
      });
  }

  filterUnitCode:any=[];
  filteredUnitCode(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.UNIT_LIST.length; i++) {
      let UNIT_LIST = this.UNIT_LIST[i];
      if (UNIT_LIST.UNIT_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(UNIT_LIST);
      }
    }

    this.filterUnitCode = filtered;
  }

  setUnitCode(fileterlist, code: any) {
    code = "";
      this.filterUnitCode.forEach((element: any, index: number) => {
        if (element.UNIT_DESC != this.UNIT_LIST.UNIT_DESC && this.UNIT_LIST.UNIT_DESC == undefined) {
          if (index == 0) {
            code = element;
            this.UNIT_LIST = code;
            this.filterUnitCode = [];
          }
          else {
            this.UNIT_LIST = element;
            return;
          }
        }
      });
  }

  getFilterStatus() {
    this.filterInvoiceDetails = [];
    console.log(this.STATUS_CODE, "test")
    if (this.STATUS_CODE == 1) {
      console.log('Pending')
      var j = 0;
      for (let i = 0; i < this.INVOICE_DETAILS.length; i++) {
        if (this.INVOICE_DETAILS[i].STATUS == 'Pending') {
          this.filterInvoiceDetails[j] = this.INVOICE_DETAILS[i];
          j++
        }
      }
    }
    if (this.STATUS_CODE == 2) {
      console.log('Dispatched')
      var j = 0;
      for (let i = 0; i < this.INVOICE_DETAILS.length; i++) {
        if (this.INVOICE_DETAILS[i].STATUS == 'Dispatched') {
          this.filterInvoiceDetails[j] = this.INVOICE_DETAILS[i];
          j++;
        }
      }
    }
    if (this.STATUS_CODE == 0) {
      console.log('All')
      this.filterInvoiceDetails = this.INVOICE_DETAILS;
    }
  }

}
