import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { ToastrService } from 'ngx-toastr';
import { URLService } from 'src/app/Service/url.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-division-wise-sales-report',
  templateUrl: './division-wise-sales-report.component.html',
  styleUrls: ['./division-wise-sales-report.component.css'],
  styles: [
    `:host ::ng-deep  .p-frozen-column {
        font-weight: bold;
    }
    :host ::ng-deep .p-datatable-frozen-tbody {
        font-weight: bold;
    }`
  ],
})
export class DivisionWiseSalesReportComponent implements OnInit {
  isDisabled: boolean = true;
  LAST_DATE_ON = new Date();
  fromDate: any;
  toDate: any;
  keyFigure: any;
  underEmployee: any;
  userInfo: any = {};
  periodList: any = [];
  keyFigureList: any = [];
  underEmployeeList: any = [];
  SalesReportList: any = [];
  SalesCommonList: any = [];
  SalesList1: any = [];
  SalesList2: any = [];
  SalesList3: any = [];
  SalesList4: any = [];
  SalesList5: any = [];
  SalesList6: any = [];
  SalesList7: any = [];
  counter: any;
  isEnabled = 0;
  QTY_VALUE: any = { "CODE": "001", "NAME": "Qty" };
  QTY_VALUE_LIST: any = [{ "CODE": "001", "NAME": "Qty" }, { "CODE": "002", "NAME": "Value" }];
  REPORT_LIST: any = [];
  isQualitySelected: boolean = true;
  isLoaded: boolean = true;
  figureIn: any = 1;
  first: number = 0;
  totalRecords: number = 0;
  rows: number = 10;
  last: number;
  ViewPopUp: boolean = false;
  ProductReportList: any = []
  isLoaded1: boolean;
  SalesReportListFOREXCEL: any = [];
  PRODUCT_KEYFIGURE: any;
  //   REPORT_LIST=[{"HQ_CODE":"BNBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
  //   "RSM_CODE":"ANRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",}
  // ,{"HQ_CODE":"BNBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
  // "RSM_CODE":"BNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
  // "RSM_CODE":"ANRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
  // "RSM_CODE":"ANRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
  // "RSM_CODE":"NNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
  // "RSM_CODE":"FNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
  // "RSM_CODE":"SNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
  // "RSM_CODE":"GNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
  // "RSM_CODE":"CNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
  // "RSM_CODE":"UNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
  // "RSM_CODE":"KNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
  // "RSM_CODE":"JNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
  // "RSM_CODE":"PNRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
  // "RSM_CODE":"ANRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",},{"HQ_CODE":"ANBRM001","HQ_DESC":"BEGUSARAI","POOL_CODE":"ANBRP003","FM_CODE":"ANFM0039","FM_NAME":"DARBHANGA FM",
  // "RSM_CODE":"ANRSM011","RSM_NAME":"JAMSHEDPUR RSM","SM_CODE":"ANSM0003","SM_NAME":"U P SINGH","NET_SALES":"63126",}]
  constructor(private router: Router, private SharedService: SharedService, private AuthService: AuthService,
    private ToastrService: ToastrService, private url: URLService, private http: HttpService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getSalesReportList();
  }
  changeQtyValue() {
    this.SalesReportList = [];
    console.log(this.QTY_VALUE, "value")
    this.isDisabled = true;
    if (this.QTY_VALUE.NAME == "Value") {
      this.isDisabled = false;
      this.isQualitySelected = false;
    } else {
      this.isQualitySelected = true;
    }
  }
  getSalesReportList() {
    this.userInfo = this.AuthService.getUserDetail();
    let data = {
      USER_ID: JSON.parse(this.userInfo).USER_ID,
    }
    this.http.postnew(this.url.getSalesReportList, data).then(
      (res: any) => {
        console.log("response", res);
        this.periodList = res.periodlist;
        this.underEmployeeList = res.underemployee;
        this.keyFigureList = res.keyfigure;
      },
      error => {
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  onViewReport() {
    this.SalesReportList = []
    this.DownloadSalesReportList();
  }
  DownloadSalesReportList() {
    this.userInfo = this.AuthService.getUserDetail();
    console.log("this.this.QTY_VALUE.NAME:-", this.QTY_VALUE.NAME);
    let data = {
      USER_ID: JSON.parse(this.userInfo).USER_ID,
      FromMonth: (+this.fromDate.PERIOD_ID),
      // ToMonth: (+this.toDate.PERIOD_ID),
      // UnderEmpCode : (+this.underEmployee.USER_ID),
      UnderEmpCode: 0,
      key_figure: 1,
      qty_val: "Value"
    }
    this.isLoaded = false;
    this.http.postnew(this.url.DivisionSalesReport, data).then(
      (res: any) => {
        // Commented by Gauresh
        // console.log("response",res);
        //ADDED BY HEMANT
        // this.SalesReportListFOREXCEL=res;
        // console.log(' this.SalesReportList', this.SalesReportList);

     res.forEach(element => {
      if (element.Keyfigure_para == 1 &&element.Parent_Code == "") {
           console.log('element',element)
          }
     });
        // Added by gauresh
        res.forEach((element: any) => {
          // element.Keyfigure_para == 1 &&
          if (element.Parent_Code == "") {
            this.SalesReportList.push(element)
          }

        });

        console.log(this.SalesReportList, "sales-report", this.counter, 'counter')
        if (this.SalesReportList.length > 0) {
          this.totalRecords = this.SalesReportList.length;
          this.LAST_DATE_ON = this.SalesReportList[0].LASTPULLDATAON;
        }

        this.counter = 0;
        this.SalesCommonList = res;
        this.isLoaded = true;





        // res.forEach((element:any) => {
        //   if(element.Keyfigure_para == this.keyFigure.CODE && element.Parent_Code == ""){
        //     this.SalesReportList.push(element)
        //   }

        // });
        // console.log(this.SalesReportList,"sales-report")
        // if(this.SalesReportList.length > 0){
        //   this.totalRecords = this.SalesReportList.length;
        //   this.LAST_DATE_ON = this.SalesReportList[0].LASTPULLDATAON;
        // }




        // this.SalesReportList = res;

        // Commented by Gauresh
        // this.counter = 0;
        // this.SalesCommonList = res;
        // this.isLoaded = true;
      },
      error => {
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );

    console.log('this.totalRecords', this.totalRecords, this.SalesReportList);

  }

  getFigureIn(figure: any) {
    //this.SalesReportList = [];
    if (figure == 1) {
      this.figureIn = figure;
    }
    if (figure == 2) {
      this.figureIn = figure;
    }
    if (figure == 3) {
      this.figureIn = figure;
    }


  }
  FilterList(data: any) {
    this.SalesReportList = [];
    // for(let i= 0; i<this.SalesCommonList.length; i++){
    //   this.counter = this.counter +1;
    //   if(this.counter == 0 && this.SalesCommonList[i].Parent_Code == data){
    //     this.SalesList1.push(this.SalesCommonList[i]);
    //     this.SalesCommonList.push(this.SalesCommonList[i]);
    //   }
    // }
    this.SalesCommonList.forEach((element: any) => {
      if (this.counter == 0 && element.Parent_Code == data) {
        this.SalesList1.push(element);
        this.SalesReportList.push(element);
      }
      if (this.counter == 1 && element.Parent_Code == data) {
        this.SalesList2.push(element);
        this.SalesReportList.push(element);
      }
      if (this.counter == 2 && element.Parent_Code == data) {
        this.SalesList3.push(element);
        this.SalesReportList.push(element);
      }
      if (this.counter == 3 && element.Parent_Code == data) {
        this.SalesList4.push(element);
        this.SalesReportList.push(element);
      }
      if (this.counter == 4 && element.Parent_Code == data) {
        this.SalesList5.push(element);
        this.SalesReportList.push(element);
      }
      if (this.counter == 5 && element.Parent_Code == data) {
        this.SalesList6.push(element);
        this.SalesReportList.push(element);
      }
      if (this.counter == 6 && element.Parent_Code == data) {
        this.SalesList7.push(element);
        this.SalesReportList.push(element);
      }
    });
    // if(this.counter == 1){
    //   this.SalesReportList = this.SalesList1;
    // }
    // if(this.counter == 2){
    //   this.SalesReportList = this.SalesList2;
    // }
    // if(this.counter == 3){
    //   this.SalesReportList = this.SalesList3;
    // }
    // if(this.counter == 4){
    //   this.SalesReportList = this.SalesList4;
    // }
    // if(this.counter == 5){
    //   this.SalesReportList = this.SalesList5;
    // }
    // if(this.counter == 6){
    //   this.SalesReportList = this.SalesList6;
    // }
    // if(this.counter == 7){
    //   this.SalesReportList = this.SalesList7;
    // }
    console.log(this.SalesReportList, "list")
    this.counter = this.counter + 1;
    console.log("SalesList1", this.SalesList1, 'this.counter', this.counter);
    console.log("SalesList2", this.SalesList2, 'this.counter', this.counter);
    console.log("SalesList3", this.SalesList3, 'this.counter', this.counter);
    console.log("SalesList4", this.SalesList4, 'this.counter', this.counter);
  }
  OnBackClick() {
    this.SalesReportList = [];
    console.log(this.counter, 'this.counter');

    if (this.counter == 1) {
      this.SalesCommonList.forEach((element: any) => {
        // element.Keyfigure_para == 1 &&
        if (element.Parent_Code == "") {
          this.SalesReportList.push(element);
        }
      })
      this.counter = this.counter - 1;
    }
    if (this.counter == 2) {
      this.SalesList1.forEach((element: any) => {
        this.SalesReportList.push(element)
      })
      this.SalesList1 = [];
      // this.SalesReportList = this.SalesList1;
      this.counter = this.counter - 1;
    }
    if (this.counter == 3) {
      this.SalesList2.forEach((element: any) => {
        this.SalesReportList.push(element)
      })
      this.SalesList2 = [];
      // this.SalesReportList = this.SalesList2;
      this.counter = this.counter - 1;
    }
    if (this.counter == 4) {
      this.SalesList3.forEach((element: any) => {
        this.SalesReportList.push(element)
      })
      this.SalesList3 = [];
      // this.SalesReportList = this.SalesList3;
      this.counter = this.counter - 1;
    }
    if (this.counter == 5) {
      this.SalesList4.forEach((element: any) => {
        this.SalesReportList.push(element)
      })
      this.SalesList4 = [];
      // this.SalesReportList = this.SalesList4;
      this.counter = this.counter - 1;
    }
    if (this.counter == 6) {
      this.SalesList5.forEach((element: any) => {
        this.SalesReportList.push(element)
      })
      this.SalesList5 = [];
      // this.SalesReportList = this.SalesList5;
      this.counter = this.counter - 1;
    }
    if (this.counter == 7) {
      this.SalesList6.forEach((element: any) => {
        this.SalesReportList.push(element)
      })
      this.SalesList6 = [];
      // this.SalesReportList = this.SalesList6;
      this.counter = this.counter - 1;
    }
    if (this.counter == 8) {
      this.SalesList7.forEach((element: any) => {
        this.SalesReportList.push(element)
      })
      this.SalesList7 = [];
      // this.SalesReportList = this.SalesList7;
      this.counter = this.counter - 1;
    }


  }
  renameKey(obj: any, oldKey: any, newKey: any) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
  exportExcel() {
    this.userInfo = this.AuthService.getUserDetail();
    console.log("this.this.QTY_VALUE.NAME:-", this.QTY_VALUE.NAME);
    let data = {
      USER_ID: JSON.parse(this.userInfo).USER_ID,
      FromMonth: (+this.fromDate.PERIOD_ID),
      //ToMonth: (+this.toDate.PERIOD_ID),
      // UnderEmpCode : (+this.underEmployee.USER_ID),
      UnderEmpCode: 0,
      key_figure: 1,
      qty_val: "Value"
    }
   // this.isLoaded = false;
    this.http.postnew(this.url.DivisionSalesReportExcelDownload, data).then(
      (res: any) => {
        // Commented by Gauresh
        // console.log("response",res);
        //ADDED BY HEMANT
        this.SalesReportListFOREXCEL = res;
        // console.log(' this.SalesReportList', this.SalesReportList);
        var exportableObj = JSON.parse(JSON.stringify(this.SalesReportListFOREXCEL));
        import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(exportableObj);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "Sales Report");
        });
      })
    //  exportableObj.forEach( (obj:any) => {
    //    this.renameKey( obj, 'Keyfigure_Name', 'Key Figure' )
    //  //  if(this.isQualitySelected == false){
    //      this.renameKey( obj, 'HB-NET', 'HYBRID_NET' )
    //      this.renameKey( obj, 'HB-TARGET', 'HYBRID_TARGET' )
    //      this.renameKey( obj, 'HB-ACHV', 'HYBRID_ACHV' )
    //      this.renameKey( obj, 'NV-NET','NOVA_NET')
    //      this.renameKey( obj, 'NV-TARGET', 'NOVA_TARGET' )
    //      this.renameKey( obj, 'NV-ACHV', 'NOVA_ACHV' )
    //     // delete obj['Net_Qty'];delete obj['Expiry_Val'];delete obj['Return_Qty'];delete obj['Sales_Qty'];
    //    //  delete obj['Target_Qty'];
    //   // }else{
    //      this.renameKey( obj, 'ZR-NET', 'ZORA_NET' )
    //      this.renameKey( obj, 'ZR-TARGET', 'ZORA_TARGET' )
    //      this.renameKey( obj, 'ZR-ACHV', 'ZORA_ACHV' )
    //     // this.renameKey( obj, 'Expiry_Per','Expiry %')
    //      this.renameKey( obj, 'TOTAL-NET', 'TOTAL_NET' )
    //      this.renameKey( obj, 'TOTAL-TARGET', 'TOTAL_TARGET' )
    //       this.renameKey( obj, 'TOTAL ↵-ACHV', 'TOTAL_ACHV' )
    //   //   delete obj['Keyfigure_Code'];delete obj['Parent_Code'];delete obj['Return_Val'];delete obj['Net_Val'];
    //    //  delete obj['Target_Val'];
    //   // }
    //   // this.renameKey( obj, 'Pending_Val','Pending')
    //  //  this.renameKey( obj, 'ACHIEVE_PER','Achievement %')

    //    delete obj['Keyfigure_Code'];
    //    delete obj['Keyfigure_para'];
    //    delete obj['LASTPULLDATAON'];
    //   delete obj['Parent_Code'];
    //  // delete obj['Expiry_Qty'];delete obj['Pending_Qty'];
    //  })
    //  const columnOrder = [
    //    'Key Figure',
    //    'HYBRID_NET', 'HYBRID_TARGET', 'HYBRID_ACHV',
    //    'ZORA_NET', 'ZORA_TARGET', 'ZORA_ACHV',
    //    'NOVA_NET', 'NOVA_TARGET', 'NOVA_ACHV',
    //    'TOTAL_NET', 'TOTAL_TARGET', 'TOTAL_ACHV'
    //   ]
    //   const reordered = exportableObj.map((obj: any) => {
    //     const newObj: any = {};
    //     columnOrder.forEach(col => {
    //       // Fix wrong key "TOTAL ↵-ACHV"
    //       if (col === 'TOTAL_ACHV' && obj['TOTAL ↵-ACHV'] !== undefined) {
    //         newObj[col] = obj['TOTAL ↵-ACHV'];
    //       } else {
    //         newObj[col] = obj[col] ?? '';
    //       }
    //     });
    //     return newObj;
    //   });
    // console.log('exportableObj',reordered);

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


  filterFromDate: any = [];
  filteredFromDate(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.periodList.length; i++) {
      let periodList = this.periodList[i];
      if (periodList.PERIOD_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(periodList);
      }
    }

    this.filterFromDate = filtered;
  }

  setFromDate(fileterlist, code: any) {
    code = "";
    this.filterFromDate.forEach((element: any, index: number) => {
      if (element.PERIOD_DESC != this.periodList[0].PERIOD_DESC && this.periodList[0].PERIOD_DESC == undefined) {
        if (index == 0) {
          code = element;
          this.periodList = code;
          this.filterFromDate = [];
        }
        else {
          this.periodList = element;
          return;
        }
      }
    });
  }

  filterToDate: any = [];
  filteredToDate(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.periodList.length; i++) {
      let periodList = this.periodList[i];
      if (periodList.PERIOD_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(periodList);
      }
    }

    this.filterToDate = filtered;
  }

  setToDate(fileterlist, code: any) {
    code = "";
    this.filterToDate.forEach((element: any, index: number) => {
      if (element.PERIOD_DESC != this.periodList[0].PERIOD_DESC && this.periodList[0].PERIOD_DESC == undefined) {
        if (index == 0) {
          code = element;
          this.periodList = code;
          this.filterToDate = [];
        }
        else {
          this.periodList = element;
          return;
        }
      }
    });
  }

  filterKeyFigure: any = [];
  filteredKeyFigure(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.keyFigureList.length; i++) {
      let keyFigureList = this.keyFigureList[i];
      if (keyFigureList.NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(keyFigureList);
      }
    }

    this.filterKeyFigure = filtered;
  }

  setKeyFigure(fileterlist, code: any) {
    code = "";
    this.filterKeyFigure.forEach((element: any, index: number) => {
      if (element.NAME != this.keyFigureList[0].NAME && this.keyFigureList[0].NAME == undefined) {
        if (index == 0) {
          code = element;
          this.keyFigureList = code;
          this.filterKeyFigure = [];
        }
        else {
          this.keyFigureList = element;
          return;
        }
      }
    });
  }

  filterUnderEmployee: any = [];
  filteredUnderEmployee(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.underEmployeeList.length; i++) {
      let underEmployeeList = this.underEmployeeList[i];
      if (underEmployeeList.USER_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(underEmployeeList);
      }
    }

    this.filterUnderEmployee = filtered;
  }

  setUnderEmployee(fileterlist, code: any) {
    code = "";
    this.filterUnderEmployee.forEach((element: any, index: number) => {
      if (element.USER_NAME != this.underEmployeeList[0].USER_NAME && this.underEmployeeList[0].USER_NAME == undefined) {
        if (index == 0) {
          code = element;
          this.underEmployeeList = code;
          this.filterUnderEmployee = [];
        }
        else {
          this.underEmployeeList = element;
          return;
        }
      }
    });
  }


  filterQTYVALUE: any = [];
  filteredQTYVALUE(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.QTY_VALUE_LIST.length; i++) {
      let QTY_VALUE_LIST = this.QTY_VALUE_LIST[i];
      if (QTY_VALUE_LIST.NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(QTY_VALUE_LIST);
      }
    }

    this.filterQTYVALUE = filtered;
  }

  setQTYVALUE(fileterlist, code: any) {
    code = "";
    this.filterQTYVALUE.forEach((element: any, index: number) => {
      if (element.NAME != this.QTY_VALUE_LIST[0].NAME && this.QTY_VALUE_LIST[0].NAME == undefined) {
        if (index == 0) {
          code = element;
          this.QTY_VALUE_LIST = code;
          this.filterQTYVALUE = [];
        }
        else {
          this.QTY_VALUE_LIST = element;
          return;
        }
      }
    });
  }


  getValue(value: any) {
    //console.log('inside getvalue',value,this.figureIn);

    if (this.figureIn == 1) {
      return value;
    }
    if (this.figureIn == 2) {
      //   console.log('inside ',this.figureIn,value/1000);

      return value / 1000;
    }
    if (this.figureIn == 3) {
      return value / 100000;
    }

  }
  onPageChange(event: any) {
    console.log('this.totalRecords', this.totalRecords);
    this.last = this.first;
    this.first = event.first;
    this.rows = event.rows;
  }

  getTotal(key: string): number {
    return this.SalesReportList
      .map(item => Number(item[key]) || 0)
      .reduce((a, b) => a + b, 0);
  }
  getProductDetails(val) {
    this.userInfo = this.AuthService.getUserDetail();
    this.PRODUCT_KEYFIGURE = val;
    // this.ViewPopUp=true;
    //console.log("this.this.QTY_VALUE.NAME:-",this.QTY_VALUE.NAME);
    let data = {
      USER_ID: JSON.parse(this.userInfo).USER_ID,
      FromMonth: (+this.fromDate.PERIOD_ID),
      // ToMonth: (+this.toDate.PERIOD_ID),
      Keyfigure_Code: (val),
      // UnderEmpCode : (+this.underEmployee.USER_ID),
      UnderEmpCode: 0,
      key_figure: 1,
      qty_val: "Value"
    }
    console.log('data', data);
    //return
    this.isLoaded1 = true;
    this.ProductReportList = []
    this.http.postnew(this.url.ProductSalesReport, data).then(
      (res: any) => {
        // Commented by Gaure
        this.isLoaded1 = false;
        if (!this.isLoaded1) {
          this.ViewPopUp = true;
        }

        // console.log("response",res);
        this.ProductReportList = res;
       
        // console.log(' this.SalesReportList', this.SalesReportList);
        // Added by gauresh
        // res.forEach((element:any) => {
        //   if(element.Keyfigure_para == 1 && element.Parent_Code == ""){
        //     this.SalesReportList.push(element)
        //   }

        // });

        console.log(this.ProductReportList, "sales-report", this.counter, 'counter')
        // if(this.SalesReportList.length > 0){
        //   this.totalRecords = this.SalesReportList.length;
        //   this.LAST_DATE_ON = this.SalesReportList[0].LASTPULLDATAON;
        // }

        // this.counter = 0;
        // this.SalesCommonList = res;
        // this.isLoaded = true;
      },
      error => {
        this.isLoaded1 = false;
        if (!this.isLoaded1) {
          this.ViewPopUp = true;
          // this.ToastrService.error("Oops, Something went wrong.");
        }
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }

exportPRODUCTToExcel(){
 import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.ProductReportList);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
       this.saveAsExcelFile(excelBuffer,this.PRODUCT_KEYFIGURE);
    });
       
}
}  
