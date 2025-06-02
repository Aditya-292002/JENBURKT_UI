import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  CYCLE: any;
  STOCK: any;
  PRODUCT_CODE: any;
  isShowProductDetailList: boolean = false;
  RANGE: any;
  MRS: any;
  ALLOCATION: any;
  PRODUCT_DEATAIL_LIST: any = [{ "DESC_FROM_TO": "", "MR": 0, "ALLOC_OF_MRS": "", "PREV_CYCLE": "", "YTD": "", "totalMrs": "", "totalAllocation": "", "totalRequiredStock": "" }]
  isShowEditPopup: boolean = false;
  PREVCYCLE: any;
  LTDALLOCATION: any;
  totalMrs: any;
  UNIT_CODE:any;
  totalAllocation: any
  totalRequiredStock: any
  STOCK_COUNT: any
  isHighLightProductCode: string = "No";
  isHighLightCycle: string = "No";
  isHighLightStock: string = "No";
  isLoaded: boolean = false;
  isHighLightTotalRequiredStock: string = "No";
  userInfo: any = {};
  PRODUCT_LIST: any = [];
  CYCLE_LIST: any = [];
  UNIT_LIST:any=[];
  SAMPLE_PRODUCT_DETAIL_LIST: any = []
  SAMPLE_PRODUCT_HEADER: any = []

  constructor(private authService: AuthService, private url: URLService, private http: HttpService, private toastrService: ToastrService,) { }

  ngOnInit(): void {
    this.GetSampleProductMasterList();
  }

  showProductDetailsData() {
    if (this.PRODUCT_CODE == undefined || this.PRODUCT_CODE == "" || this.CYCLE == undefined || this.CYCLE == "") {

      this.toastrService.error("Please select a Product code & Cycle");

    } else {
      this.sampleProductChange()
      this.isShowProductDetailList = true;
      this.getSampleProductDetail()


    }
  }
  onSaveProductDetailsClick() {
    this.userInfo = JSON.parse(this.authService.getUserDetail());
    let data = {
      "SAMPLE_PRODUCT_CODE": this.PRODUCT_CODE,
      "CYCLE_CODE": this.CYCLE,
      "STOCK": this.STOCK,
      "UNIT_CODE":this.UNIT_CODE,
      "TOTAL_ALLOCATION": this.totalAllocation,
      "TOTAL_MRS_COUNT": this.totalMrs,
      "TOTAL_STOCK_REQUIRED_COUNT": this.totalRequiredStock,
      "DETAILS": this.PRODUCT_DEATAIL_LIST,
      "USER_ID": +this.userInfo.USER_ID
    }
    // this.isLoaded = true;

    //console.log(JSON.stringify(data), "data");
    //    console.log('save data', JSON.stringify(data))
    this.http.postnew(this.url.SAVESAMPLEPRODUCTDATADETAILS, data).then(
      (res: any) => {
        // this.isLoaded = false;
        console.log
        if (res.data[0].FLAG == true) {
          this.toastrService.success(res.data[0].MSG)
          this.GetSampleProductMasterList();
          this.clearForm();
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

  clearForm() {
    this.PRODUCT_CODE = "";
    this.CYCLE = "";
    this.STOCK = "";
    this.PRODUCT_DEATAIL_LIST = []
    this.totalMrs = "";
    this.totalAllocation = ""
    this.isShowProductDetailList = false;

  }

  formValidate() {
    this.isHighLightProductCode = "No";
    this.isHighLightCycle = "No";
    this.isHighLightStock = "No";
    this.isHighLightTotalRequiredStock = "No";

    if (this.PRODUCT_CODE == undefined || this.PRODUCT_CODE == "") {
      this.isHighLightProductCode = "Yes";
      this.toastrService.error("Please select a Product");
      return;
    } else {
      this.isHighLightProductCode = "No";
    }

    if (this.CYCLE == undefined || this.CYCLE == "") {
      this.isHighLightCycle = "Yes";
      this.toastrService.error("Please select a Cycle");
      return;
    } else {
      this.isHighLightCycle = "No";
    }

    if (this.STOCK == undefined || this.STOCK == "") {
      this.isHighLightStock = "Yes";
      this.toastrService.error("Please select a Stock");
      return;
    } else {
      this.isHighLightStock = "No";
    }

    if (this.STOCK <= this.totalRequiredStock) {
      this.isHighLightTotalRequiredStock = "Yes"
      this.toastrService.error("total Required Stock should be less then stock value")
      return;
    }
    else {
      this.isHighLightTotalRequiredStock = "No";
    }


    if (this.isHighLightProductCode != "Yes" && this.isHighLightCycle != "Yes" && this.isHighLightStock != "Yes" && this.isHighLightTotalRequiredStock != "Yes") {

      this.onSaveProductDetailsClick();
      return;
    }

  }


  onEditListClick() {
    this.isShowEditPopup = true;

  }
  ClosePopUp() {
    this.isShowEditPopup = false;
  }


  sampleProductChange() {
    console.log('CYCLE', this.PRODUCT_CODE)
    console.log('SAMPLE_PRODUCT_CODE', this.CYCLE)
    if (this.PRODUCT_CODE == undefined || this.PRODUCT_CODE == "") {
      this.toastrService.error("Please select the product code");
      return;
    }

    this.userInfo = this.authService.getUserDetail();
    console.log("userinfio", this.userInfo)
    console.log("userinfio", this.userInfo.MSG)
    let data = {
      "SAMPLE_PRODUCT_CODE": this.PRODUCT_CODE,
      "CYCLE_CODE": this.CYCLE,
      "UNIT_CODE":this.UNIT_CODE

    }
    // this.isLoaded = true;
    this.http.postnew(this.url.GETSTOCKBYPRODUCTCODE, data).then(
      (res: any) => {
        console.log("response", res);//PRODUCTLIST
        // this.isLoaded = false;
        this.STOCK = res.STOCK_COUNT;

      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  GetSampleProductMasterList() {
    this.userInfo = this.authService.getUserDetail();
    let data = {

    }
    // this.isLoaded = true;
   // console.log('data', data)
    this.http.postnew(this.url.getSAMPLEPRODUCTDETAILSMASTERLIST, data).then(
      (res: any) => {
        console.log("response", res);//PRODUCTLIST
        // this.isLoaded = false;
        this.PRODUCT_LIST = res.SAMPLE_PRODUCT_LIST;
        this.CYCLE_LIST = res.CYCLE_LIST;
        this.SAMPLE_PRODUCT_DETAIL_LIST = res.SAMPLE_PRODUCT_DETAIL_LIST;
        this.UNIT_LIST=res.UNIT_LIST
        //this.userList=res.USERLIST;
        console.log('SAMPLE_PRODUCT_DETAIL_LIST',this.SAMPLE_PRODUCT_DETAIL_LIST)

      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }


  calculateAllocation(list: any) {
    console.log(list, "list")
    list.TOTAL_ALLOC = (+list.ALLOC_OF_MRS) * (+list.MR)

    let val = 0
    let val1 = 0
    this.PRODUCT_DEATAIL_LIST.forEach((element: any) => {
      if (element.ALLOC_OF_MRS != undefined) {
        val = (+element.ALLOC_OF_MRS) + (+val)
        val1 = (+element.TOTAL_ALLOC) + (+val1)
      }

    })
    this.totalAllocation = val
    this.totalRequiredStock = val1;


  }

  getSampleProductDetail() {
    this.userInfo = this.authService.getUserDetail();
    let data = {
      "SAMPLE_PRODUCT_CODE": this.PRODUCT_CODE,
      "CYCLE_CODE": this.CYCLE
    }
    // this.isLoaded = true;
    this.http.postnew(this.url.GETSAMPLEPRODUCTDETAILSBYID, data).then(
      (res: any) => {
        console.log("response", res);//PRODUCTLIST
        // this.isLoaded = false;
        this.PRODUCT_DEATAIL_LIST = res.SAMPLE_PRODUCT_DETAILS;
        let val1 = 0;
        this.PRODUCT_DEATAIL_LIST.forEach((element: any) => {

          if (element.MR != undefined) {
            val1 = (+val1) + (+element.MR)
          }
        })
        this.totalMrs = val1

        let val = 0
        let val2 = 0
        this.PRODUCT_DEATAIL_LIST.forEach((element: any) => {
          if (element.ALLOC_OF_MRS != undefined) {
            val = (+element.ALLOC_OF_MRS) + (+val)
            val2 = (+element.TOTAL_ALLOC) + (+val2)
          }

        })
        this.totalAllocation = val
        this.totalRequiredStock = val2;


      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  onProductSelected(rowData: any) {
    this.CYCLE = rowData.CYCLE_CODE
    this.PRODUCT_CODE = rowData.SAMPLE_PRODUCT_CODE

    this.showProductDetailsData()
    this.isShowEditPopup = false;
  }

  filterProductCode:any=[];
  filteredProductCode(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.PRODUCT_LIST.length; i++) {
      let PRODUCT_LIST = this.PRODUCT_LIST[i];
      if (PRODUCT_LIST.DESCRIPTION.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(PRODUCT_LIST);
      }
    }

    this.filterProductCode = filtered;
  }

  setProductCode(fileterlist, code: any) {
    code = "";
      this.filterProductCode.forEach((element: any, index: number) => {
        if (element.DESCRIPTION != this.PRODUCT_LIST.DESCRIPTION && this.PRODUCT_LIST.DESCRIPTION == undefined) {
          if (index == 0) {
            code = element;
            this.PRODUCT_LIST = code;
            this.filterProductCode = [];
          }
          else {
            this.PRODUCT_LIST = element;
            return;
          }
        }
      });
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

}
