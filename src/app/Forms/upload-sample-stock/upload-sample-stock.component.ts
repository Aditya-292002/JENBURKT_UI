import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { __await } from 'tslib';
@Component({
  selector: 'app-upload-sample-stock',
  templateUrl: './upload-sample-stock.component.html',
  styleUrls: ['./upload-sample-stock.component.css']
})
export class UploadSampleStockComponent implements OnInit {
  CYCLE_LIST:any=[]
  UNIT_LIST:any=[]
  CYCLE_CODE:any;
  UNIT_CODE:any;
  userInfo: any;
  isLoaded: boolean = false;
  SAMPLE_PRODUCT_LIST:any = [];
  convertedJson:any = [];
  inputfileltext:any = "";
  isHighLightCycle:string = "No";
  UPLOAD:any;
  isHighLightUnit:string="No";
  SAMPLE_STOCK: any=[];
  showGridData: any=[];
    setValue: any=[];
  gridDataSetValue: any;
  first: number = 0;
  totalRecords: number = 0;
  rows: number = 10;
  last: number;
  validateflag: boolean=false;

  constructor(private authService: AuthService, private url: URLService, private http: HttpService, private toastrService: ToastrService,) { }

  ngOnInit(): void {
    this.getUploadSampleStockMasterList();
  }

 getUploadSampleStockMasterList(){
  this.userInfo = this.authService.getUserDetail();

    let data = {}
    // this.isLoaded = true;
    this.http.postnew(this.url.GETMASTERDATAFORSAMPLESTOCK, data).then(
      (res: any) => {
        // this.isLoaded = false;
        this.CYCLE_LIST = res.CYCLE_LIST;
        this.UNIT_LIST = res.UNIT_LIST;
        this.SAMPLE_PRODUCT_LIST = res.SAMPLE_PRODUCT_LIST;
      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
 }
  downloadTemplate(){

    this.isHighLightCycle="No";
    this.isHighLightUnit="No";

    if(this.CYCLE_CODE==undefined || this.CYCLE_CODE == ""){
      this.isHighLightCycle="Yes";
      this.toastrService.error("Please select a Cycle");
      return;
    }else{
      this.isHighLightCycle="No";
    }

    if(this.UNIT_CODE==undefined || this.UNIT_CODE == ""){
      this.isHighLightUnit="Yes";
      this.toastrService.error("Please select a unit");
      return;
    }else{
      this.isHighLightUnit="No";
    }

    if(this.isHighLightCycle !="Yes" || this.isHighLightUnit!="Yes"){
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.SAMPLE_PRODUCT_LIST);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Download Report");
      });

    }


  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }


  selectFile(event: any) {
    this.convertedJson = [];
    this.exceltojson(event)
  }

  public exceltojson(event: any) {
    const selectedfile = event.files[0];
    this.inputfileltext = event.files[0].name;
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedfile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result
      let workbook = XLSX.read(binaryData, { type: 'binary' })
      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        this.convertedJson = data;
      });
    }
  }

  uploadSampleStockData(){
    this.userInfo = this.authService.getUserDetail();
    let data = {
      "CYCLE_CODE":this.CYCLE_CODE,
      "UNIT_CODE":this.UNIT_CODE,
      "DETAILS":this.convertedJson
    }
   // console.log(data,"data");
    // this.isLoaded = true;

    this.http.postnew(this.url.SAVESAMPLESTOCKDATA, data).then(
      (res: any) => {
    
        // this.isLoaded = false;
        if(res.data[0].FLAG == true){
            this.toastrService.success(res.data[0].MSG)
            this.getUploadSampleStockMasterList()
            this.clearData();
                  }
        else{
          this.toastrService.error(res.data[0].MSG)
        }

      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  formValidate(){
    this.isHighLightCycle="No";
    this.isHighLightUnit="No";

    if(this.CYCLE_CODE==undefined || this.CYCLE_CODE == ""){
      this.isHighLightCycle="Yes";
      this.toastrService.error("Please select a Cycle");
      return;
    }else{
      this.isHighLightCycle="No";
    }

    if(this.UNIT_CODE==undefined || this.UNIT_CODE == ""){
      this.isHighLightUnit="Yes";
      this.toastrService.error("Please select a unit");
      return;
    }else{
      this.isHighLightUnit="No";
    }

    if(this.isHighLightCycle !="Yes" || this.isHighLightUnit!="Yes"){
      this.saveValidation();
      // if(!this.validateflag){ 
      //   //console.log('isnide if');
      //   this.uploadSampleStockData();
      // }
      //   console.log('isnide else');
      //   this.saveValidation();
       
    //  }

    }
  }

  clearData(){
    this.CYCLE_CODE="";
    this.UNIT_CODE="";
    this.UPLOAD="";
    this.showGridData=[];
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

    async saveValidation() {
   this.userInfo = this.authService.getUserDetail();
    let data = {
      "CYCLE_CODE":this.CYCLE_CODE,
      "UNIT_CODE":this.UNIT_CODE,
      "DETAILS":this.convertedJson
    }

    // console.log('DATA ->', JSON.stringify(data))
    // return
    this.isLoaded = true;
         
    await this.http.postnew(this.url.STOCKSAVEVALIDATION, data).then(
      (res: any) => {
   
        if (res.FLAG == 1) {
          
          console.log('123', res);
          this.isLoaded = false;
          this.SAMPLE_STOCK = res.SAMPLE_STOCK;
          if (this.SAMPLE_STOCK?.length > 0) {
            this.validateflag=true;
            this.showGridData["GridList"] = this.SAMPLE_STOCK;
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
          this.uploadSampleStockData();
           this.validateflag=false;
          this.showGridData = []
          console.log('inside else validation');

          //  this.savePayement()
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
  CLOSEREJECTCMEREQUESTPOPUP(){
    this.validateflag=false;
  }

  saveOverrridernData(){
    this.uploadSampleStockData();
    this.validateflag=false;
  }


}
