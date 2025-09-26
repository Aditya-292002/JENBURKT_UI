import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-payement-excel-upload',
  templateUrl: './payement-excel-upload.component.html',
  styleUrls: ['./payement-excel-upload.component.css']
})
export class PayementExcelUploadComponent implements OnInit {
  FileName: any;
  userInfo: any;
  jsonData: unknown[];
  isLoaded: boolean;
  IncentiveReportList: any = {};
  showGridData: any = {};
  incentiveReportList: any = {};
  setValue: any;
  gridDataSetValue: any;
  first: number = 0;
  totalRecords: number = 0;
  rows: number = 10;
  last: number;
  PAYMENT_LIST: any;
  TEMPLATE: any = [{
    BENIFICIARY_NAME: "",
    PAYMENT_DATE: "",
    PAY_AMOUNT: "",
    BANK_IFSC: "",
    ACCOUNT_NUMBER: "",
    UTR_NO: "",
    // PAYMENT_MODE: "",
    TRANSACTION_STATUS:"",
    REMARKS: "",
    // BANK_NAME:"",
    TRANSACTION_REF_NO:""
  }]
  constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService, private common: CommonService, public datePipe: DatePipe, private router: Router, public httpclient: HttpClient) {
  }
  ngOnInit(): void {
    this.userInfo = JSON.parse(this.authService.getUserDetail());
  }
  // onFileSelected(event: any): void {
  //   this.FileName = ""
  //   const file: File = event.target.files[0];
  //   this.FileName = file.name
  //   if (file) {
  //     const reader: FileReader = new FileReader();

  //     reader.onload = (e: any) => {
  //       const data: Uint8Array = new Uint8Array(e.target.result);
  //       const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });

  //       // Get first sheet
  //       const sheetName: string = workbook.SheetNames[0];
  //       const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

  //       // Convert to JSON
  //       this.jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: null });

  //       console.log('Excel JSON:', this.jsonData);

  //       // Do whatever you want with jsonData (store, send to API, etc.)
  //     };

  //     reader.readAsArrayBuffer(file);
  //     // Further logic to read or upload the Excel file goes here
  //     // e.g., pass it to a service or read it with XLSX library
  //   }

  // }

  onFileSelected(event: any): void {
  this.FileName = "";
  const file: File = event.target.files[0];
  this.FileName = file.name;

  if (file) {
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data: Uint8Array = new Uint8Array(e.target.result);
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });

      const sheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

      const rawData: Record<string, any>[] = XLSX.utils.sheet_to_json(worksheet, { defval: null });

      const excelDateToJSDate = (serial: number): string => {
        const utc_days = Math.floor(serial - 25569);
        const utc_value = utc_days * 86400;
        const date_info = new Date(utc_value * 1000);
        return date_info.toISOString().split('T')[0]; // 'YYYY-MM-DD'
      };

      this.jsonData = rawData.map((row: Record<string, any>) => {
        const fixedRow = { ...row }; // ✅ Now `row` is known to be an object

        if (
          fixedRow['PAYMENT_DATE'] &&
          typeof fixedRow['PAYMENT_DATE'] === 'number'
        ) {
          fixedRow['PAYMENT_DATE'] = excelDateToJSDate(fixedRow['PAYMENT_DATE']);
        }

        return fixedRow;
      });

   //   console.log('Excel JSON with fixed date:', this.jsonData);
    };

    reader.readAsArrayBuffer(file);
  }
}


  savePayement() {
    // this.jsonData.forEach((element: any) => {
    //   element.PAYMENT_DATE = new Date(element.PAYMENT_DATE);
    // })
    let data = {
      "USER_ID": this.userInfo.USER_ID,
      "CME_PAYMENT_DATA": this.jsonData
    }
     //console.log('data',data);
    // return
    // this.saveValidationPayement();
    // console.log('DATA ->'  , JSON.stringify(data))
    //return
    this.isLoaded = true;
    this.http.postnew(this.url.SAVECMEPAYMENT, data).then(
      (res: any) => {
        if (res.FLAG == true) {
          this.isLoaded = false;
          this.toastrService.success(res.MSG);
          //   this.ViewPamentData = false;
          //   this.ViewPamentDataList = false;
          //   this.ViewCmeData = true;
          //   this.CANCELCMEPAYMENT();
          //  this.GETCMEREQUESTPAYMENTLISTBYUSERID();
        } else if (res?.FLAG == false) {
          this.toastrService.error(res.MSG);
           this.isLoaded = false;
        }
      })
    
  }

  saveValidationPayement() {
    let data = {
      "USER_ID": this.userInfo.USER_ID,
      "CME_PAYMENT_DATA": this.jsonData
    }

    // console.log('DATA ->', JSON.stringify(data))
    // return
    this.isLoaded = true;
    this.http.postnew(this.url.PAYMENTSAVEVALIDATION, data).then(
      (res: any) => {
        if (res.FLAG == 1) {
          console.log('123', res);
          this.isLoaded = false;
          this.PAYMENT_LIST = res.PAYMENT_LIST;
          if (this.PAYMENT_LIST?.length > 0) {
            this.showGridData["GridList"] = this.PAYMENT_LIST;
            this.setValue = this.gridDataSetValue;

            // Clear headers & keys
            this.showGridData["GridHeadersList"] = [];
            this.showGridData["SearchKey"] = [];

            // Extract headers from first row
            if (this.showGridData.GridList.length > 0) {
              const keys = Object.keys(this.showGridData.GridList[0]);
              console.log('sinside2');

              keys.forEach(key => {
                const header = {
                  Headers: key,
                  Field: key
                };
                this.showGridData["SearchKey"].push(key);
                this.showGridData["GridHeadersList"].push(header);
                console.log('sinside3');
              });
            }
          }
           else {
          this.showGridData = []
          console.log('inside else validation');

           this.savePayement()
        }

        }else{
          this.toastrService.error("something went wrong");
        }
       



      });
  }


  onPageChange(event: any) {
    console.log(event.first);

    console.log('this.totalRecords', this.totalRecords);
    this.last = this.first;
    this.first = event.first;
    this.rows = event.rows;
  }


  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  exportAsXLSX(): void {
    
    this.exportAsExcelFile(this.TEMPLATE, 'PAYMENT_DETAILS');
  }

}
