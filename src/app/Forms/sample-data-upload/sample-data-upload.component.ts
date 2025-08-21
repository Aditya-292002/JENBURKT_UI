import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
declare var $: any;
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ExcelExportService } from 'src/app/Service/excel-export-service.service';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
//import * as ExcelJS from 'exceljs';
//import { Workbook } from 'exceljs';

@Component({
  selector: 'app-sample-data-upload',
  templateUrl: './sample-data-upload.component.html',
  styleUrls: ['./sample-data-upload.component.css']
})
export class SampleDataUploadComponent implements OnInit {

 isHighLightUnit: string = "No";
  isHighLightCycle: string = "No";
  isLoaded: boolean = false;
  userInfo: any
  CME_LIST: any = []
  USER_LIST: any = []
  CME_CODE: any;
  SUBMITTED_ON = new Date();
  USER_NAME: any;
    TEMPLATE: any = {};
      jsonData: any = [];
  FileName: string;
  PERIOD_LIST: any;
  CYCLE_NO:any;
  constructor(private authService: AuthService, private url: URLService, private http: HttpService, private toastrService: ToastrService,private excel:ExcelExportService) { }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserDetail();
    this.GETSAMPLEDATAMASTERLIST();
  }
  getDocumentMasterList() {
    this.userInfo = this.authService.getUserDetail();

    let data = {}
    this.isLoaded = true;
    this.http.postnew(this.url.GETDOCUMENTAPPROVALMASTERLIST, data).then(
      (res: any) => {
        console.log(res, 'res master list');

        this.isLoaded = false;
        this.CME_LIST = res.CME_LIST;
        this.USER_LIST = res.USER_LIST;

      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

 

    exportAsXLSX(): void {
        const excludedCols = ['SAMPLE_PRODUCT_CODE','POOL_CODE','POOL_DESC','HQ_CODE','HQ_DESC','DESCRIPTION','INNER_PACK','UNIT_PACK','FM_CODE','FM_NAME','RSM_CODE','RSM_NAME','SM_CODE','SM_NAME']; // 👈 disable 'name'
      if(this.CYCLE_NO==undefined || this.CYCLE_NO==null){
           this.toastrService.error("Please Select Cycle");
      }

       let data = {
       "USER_ID": JSON.parse(this.userInfo).USER_ID,
      "CYCLE_ID": this.CYCLE_NO
    }
    this.isLoaded=true;
   // console.log('CYCLE_NO',this.CYCLE_NO);
    this.http.postnew(this.url.DOWNLOADSAMPLEDATALIST, data).then(
      (res: any) => {
        this.TEMPLATE = res.TEMPLATE_LIST;
        // this.CYCLE_ID = res.DATA_LIST[0].CYCLE_ID;
        // this.GETPRODUCTLISTBYCYCLEID(this.CYCLE_ID)
       this.excel.exportAsExcelFile(this.TEMPLATE,'SAMPLE_REQUISITION_DATA',excludedCols)
        this.isLoaded=false;
       // this.exportAsExcelFile(this.TEMPLATE, 'SAMPLE_DATA',excludedCols);
      });
      

  }

    public exportAsExcelFile(json: any[], excelFileName: string, excludedColumns: string[]): void {
      const filteredData = json.map(row => {
      const newRow: any = {};
      Object.keys(row).forEach(key => {
        if (!excludedColumns.includes(key)) {
          newRow[key] = row[key];
        }
      });
      return newRow;
    });
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
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


      async onFileSelected(event: any): Promise<void> {
        this.FileName = "";
        const file: File = event.target.files[0];
        this.FileName = file.name;
    
        if (file) {
          const reader: FileReader = new FileReader();
    
          reader.onload = async (e: any) => {
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
    
            const JSONData = rawData.map((row: Record<string, any>) => {
              const fixedRow = { ...row }; // ✅ Now `row` is known to be an object
    
              if (
                fixedRow['DOCKET_DT'] &&
                typeof fixedRow['DOCKET_DT'] === 'number'
              ) {
                fixedRow['DOCKET_DT'] = excelDateToJSDate(fixedRow['DOCKET_DT']);
              }
    
              return fixedRow;
            });
    
            await this.updateDetails(JSONData)
    
            console.log('Excel JSON with fixed date:', this.jsonData);
          };
          //console.log('this.jsonData',this.jsonData);
    
          reader.readAsArrayBuffer(file);
    
          // await   this.updateDetails()
    
        }
      }
      async updateDetails(JSONData: {
    [x: string]: any;
  }[]) {
    if (JSONData.length < 0) {
      this.toastrService.success('Please select excel ')
      return
    }
    this.userInfo = JSON.parse(this.authService.getUserDetail());
    let data = {

      "USER_ID": (+this.userInfo.USER_ID),
      "JSON_DATA": JSONData

    }

    console.log(data);
    this.isLoaded=true;
   //return
    await this.http.postnew(this.url.UPDATESAMPLEREQUISITIONDATA, data).then(
      (res: any) => {
        console.log("response", res);//PRODUCTLIST
        this.isLoaded = false;

        if (res.data[0].FLAG == true) {
          this.toastrService.success(res.data[0].MSG);
       //   this.onPrintInvoiceChange();

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

    GETSAMPLEDATAMASTERLIST() {
      console.log('this.userInfo.USER_ID',this.userInfo);
      
    let data = {
     "USER_ID": JSON.parse(this.userInfo).USER_ID,
      "FYEAR": "2025"
    }
    this.isLoaded=true;
    this.http.postnew(this.url.GETSAMPLEDATAMASTERLIST, data).then(
      (res: any) => {
        this.PERIOD_LIST = res.PERIOD_LIST;
        this.isLoaded=false
        // this.CYCLE_ID = res.DATA_LIST[0].CYCLE_ID;
        // this.GETPRODUCTLISTBYCYCLEID(this.CYCLE_ID)
      });
  }


}
