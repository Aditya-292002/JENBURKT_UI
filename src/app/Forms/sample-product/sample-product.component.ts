import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sample-product',
  templateUrl: './sample-product.component.html',
  styleUrls: ['./sample-product.component.css']
})
export class SampleProductComponent implements OnInit {
  LINKFG_LIST = [];
  SAMPLE_LIST = [{ "SAMPLE_CODE": 1, "SAMPLE_DESC": "Yes" }, { "SAMPLE_CODE": 0, "SAMPLE_DESC": "No" }];
  SAMPLE_PRODUCT_LIST = [{ "FROM": 0, "TO": 0 }]
  SAMPLE_CODE:any = 1;
  LINKFG_CODE: any;
  PRODUCT_CODE: any;
  DESCRIPTION: any;
  HSM_CODE:any;
  isShowSampleProductRangeList:boolean=false;
  PREDEFINE_LIST_RANGE: any = []
  UNIT_INFO: any;
  PRODUCT_LIST: any = [];
  Sample_Product_Header: any = []
  RANGE_CODE: any;
  isShowEditPopup: boolean = false;
  isLoaded: boolean = false;
  linkFg: boolean = false;
  userInfo: any;
  PREDEFINE_RANGE: any;
  FROM_RANGE: any;
  TO_RANGE: any;
  isHighLightHsnCode:string="No";
  isHighLightProductCode: string = "No";
  isHighLightDescription: string = "No";
  isHighLightPackInfo: string = "No";
  isHighLightSample: string = "No";
  isHighLightLinkFG: string = "No";
  isHighLightPriDefineRange: string = "No";
  isHighLightFrom: string = "No";
  isHighLightTo: string = "No";
  constructor(private authService: AuthService, private url: URLService, private http: HttpService, private toastrService: ToastrService,) { }

  ngOnInit(): void {

    if (this.SAMPLE_CODE == "Yes" || this.SAMPLE_CODE == 1) {
      this.linkFg = true;
    }
    this.GetSampleProductMasterList();

  }
  addSampleProduct() {
    this.PREDEFINE_LIST_RANGE.push({ "FROM_RANGE": 0, "TO_RANGE": 0 });
  }

  deleteSampleProduct(index: number) {
    if (this.PREDEFINE_LIST_RANGE.length > 1) {
      this.PREDEFINE_LIST_RANGE.splice(index, 1);
    }
  }
  sampleOnClick(event: any) {
    this.linkFg = false;
    if ( this.SAMPLE_CODE == 1) {
      this.linkFg = true;
    } else{
      this.isShowSampleProductRangeList=false
      this.RANGE_CODE="";
      this.LINKFG_CODE=""
      this.PREDEFINE_LIST_RANGE=[]
    }

  }
  onSaveSampleProductClick() {
    this.userInfo = this.authService.getUserDetail();
    let data = {
      "SAMPLE_PRODUCT_CODE": this.PRODUCT_CODE,
      "DESCRIPTION": this.DESCRIPTION,
      "PACK_INFO": this.UNIT_INFO,
      "HSM_CODE":this.HSM_CODE,
      "SAMPLE_CODE": this.SAMPLE_CODE,
      "LINK_FG_CODE": this.LINKFG_CODE,
      "RANGE_CODE": this.RANGE_CODE,
      "DETAILS": this.PREDEFINE_LIST_RANGE
    }
  

    // this.isLoaded = true;

    this.http.postnew(this.url.saveSampleProductData, data).then(
      (res: any) => {
        // this.isLoaded = false;
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

  formValidate() {
    this.isHighLightProductCode = "No";
    this.isHighLightDescription = "No";
    this.isHighLightPackInfo = "No";
    this.isHighLightSample = "No";
    this.isHighLightLinkFG = "No";
    this.isHighLightHsnCode="No";
    //this.isHighLightPriDefineRange="No";
    this.isHighLightFrom = "No";
    this.isHighLightTo = "No";
    if (this.PRODUCT_CODE == undefined || this.PRODUCT_CODE == "") {
      this.isHighLightProductCode = "Yes";
      this.toastrService.error("Please select a Product ");
      return;
    } else {
      this.isHighLightProductCode = "No";
    }

    if (this.DESCRIPTION == undefined || this.DESCRIPTION == "") {
      this.isHighLightDescription = "Yes";
      this.toastrService.error("Please select a Description ");
      return;
    } else {
      this.isHighLightDescription = "No";
    }

    if (this.UNIT_INFO == undefined || this.UNIT_INFO == "") {
      this.isHighLightPackInfo = "Yes";
      this.toastrService.error("Please select a Pack Info ");
      return;
    } else {
      this.isHighLightPackInfo = "No";
    }

    // if(this.HSM_CODE == undefined || this.HSM_CODE == ""){
    //   this.isHighLightHsnCode="Yes";
    //   this.toastrService.error("Please enter a HSN Code..")
    // }else{
    //   this.isHighLightHsnCode="No"
    // }
    // if (this.SAMPLE_ID == undefined || this.SAMPLE_ID == "") {
    //   this.isHighLightSample = "Yes";
    //   this.toastrService.error("Please select a Sample ");
    //   return;
    // } else {
    //   this.isHighLightSample = "No";
    // }

    if(this.SAMPLE_CODE==1){
      if (this.LINKFG_CODE == undefined || this.LINKFG_CODE == "") {
        this.isHighLightLinkFG = "Yes";
        this.toastrService.error("Please select a Link FG ");
        return;
      } else {
        this.isHighLightLinkFG = "No";
      }
    }


    // if(this.RANGE_CODE == undefined || this.RANGE_CODE == ""){
    //   this.isHighLightPriDefineRange="Yes";
    //   this.toastrService.error("Please select a Pri-define range ")
    //   return;
    // }else{
    //  this.isHighLightPriDefineRange="No";
    // }

    if (this.isHighLightProductCode != "Yes" && this.isHighLightDescription != "Yes" && this.isHighLightPackInfo != "Yes"  && this.isHighLightLinkFG != "Yes" && this.isHighLightFrom != "Yes" && this.isHighLightTo != "Yes") {

      this.onSaveSampleProductClick();
    }
  }


  // onFromRange(){

  //   this.PREDEFINE_LIST_RANGE.forEach(element => {
  //     if (element.FROM_RANGE == undefined || (+element.FROM_RANGE) == 0) {
  //       this.isHighLightFrom = "Yes";
  //       this.toastrService.error("Please enter From value ")
  //       return;
  //     } else {
  //       this.isHighLightFrom = "No";
  //     }

  //     if (element.TO_RANGE == undefined || (+element.TO_RANGE) == 0) {
  //       this.isHighLightTo = "Yes";
  //       this.toastrService.error("Please enter  To  Value  ")
  //       return;
  //     } else {
  //       this.isHighLightTo = "No";
  //     }

  //   });
  // }
  clearForm() {
    this.PRODUCT_CODE = "";
    this.DESCRIPTION = "";
    this.UNIT_INFO = "";
    this.RANGE_CODE = "";
    this.HSM_CODE="";
    //this.SAMPLE_LIST = [];
    this.SAMPLE_CODE="";
   // this.LINKFG_LIST = [];
   this.LINKFG_CODE="";
   this.isShowSampleProductRangeList=false;
    // this.PREDEFINE_LIST_RANGE = [];
  }

  GetSampleProductMasterList() {
    this.userInfo = this.authService.getUserDetail();
    let data = {
    }
    // this.isLoaded = true;
    this.http.postnew(this.url.getSampleProductMasterList, data).then(
      (res: any) => {
        // this.isLoaded = false;
        this.LINKFG_LIST = res.LINKFGLIST;
        this.PREDEFINE_RANGE = res.PREDEFINE_RANGE;
        this.PRODUCT_LIST = res.SAMPLE_PRODUCT_LIST;
        //this.userList=res.USERLIST;

      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }


  onRange() {

    if(this.RANGE_CODE != undefined || this.RANGE_CODE != ""){

      this.isShowSampleProductRangeList = true
    }else{
      this.isShowSampleProductRangeList = false
    }
    this.userInfo = this.authService.getUserDetail();
    let data = {
      "RANGE_CODE": this.RANGE_CODE

    }
    // this.isLoaded = true;
    this.http.postnew(this.url.getSamplePreDefineRangeList, data).then(
      (res: any) => {
        // this.isLoaded = false;
        this.PREDEFINE_LIST_RANGE = res.PREDEFINE_RANGE;
        //this.userList=res.USERLIST;
      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  onEditListClick() {
    this.isShowEditPopup = true;

  }
  ClosePopUp() {
    this.isShowEditPopup = false;
  }

  onProductSelected(rowData: any) {
    this.userInfo = this.authService.getUserDetail();
    let data = {
      "SAMPLE_PRODUCT_CODE": rowData.SAMPLE_PRODUCT_CODE
    }
    // this.isLoaded = true;
    this.http.postnew(this.url.GETSAMPLEPRODUCTDATABYID, data).then(
      (res: any) => {
        // this.isLoaded = false;

        this.Sample_Product_Header = res.SAMPLEPRODUCT_HEADER;
        this.PREDEFINE_LIST_RANGE = res.SAMPLEPRODUCT_DETAIL;

        if (this.Sample_Product_Header.length > 0) {
          this.PRODUCT_CODE = this.Sample_Product_Header[0].SAMPLE_PRODUCT_CODE;
           this.DESCRIPTION = this.Sample_Product_Header[0].DESCRIPTION;
           this.UNIT_INFO = this.Sample_Product_Header[0].PACK_INFO;
           this.HSM_CODE = this.Sample_Product_Header[0].HSM_CODE;
           this.RANGE_CODE = +this.Sample_Product_Header[0].RANGE_CODE;
           if(this.Sample_Product_Header[0].SAMPLE_CODE==true){
            this.SAMPLE_CODE = 1;
            this.linkFg = true;
           }else{
            this.SAMPLE_CODE = 0;
            this.linkFg = false;
           }

           this.LINKFG_CODE = this.Sample_Product_Header[0].LINK_FG_CODE;

        }
        this.isShowEditPopup = false;
        this.isShowSampleProductRangeList=true;
      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  filterSAMPLECODE:any=[];
  filteredSAMPLECODE(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.SAMPLE_LIST.length; i++) {
      let SAMPLE_LIST = this.SAMPLE_LIST[i];
      if (SAMPLE_LIST.SAMPLE_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(SAMPLE_LIST);
      }
    }

    this.filterSAMPLECODE = filtered;
  }

  setSAMPLECODE(fileterlist, code: any) {
    code = "";
      this.filterSAMPLECODE.forEach((element: any, index: number) => {
        if (element.SAMPLE_DESC != this.SAMPLE_LIST[0].SAMPLE_DESC && this.SAMPLE_LIST[0].SAMPLE_DESC == undefined) {
          if (index == 0) {
            code = element;
            this.SAMPLE_LIST = code;
            this.filterSAMPLECODE = [];
          }
          else {
            this.SAMPLE_LIST = element;
            return;
          }
        }
      });
  }

  filterRANGECODE:any=[];
  filteredRANGECODE(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.PREDEFINE_RANGE.length; i++) {
      let PREDEFINE_RANGE = this.PREDEFINE_RANGE[i];
      if (PREDEFINE_RANGE.DESCRIPTION.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(PREDEFINE_RANGE);
      }
    }

    this.filterRANGECODE = filtered;
  }

  setRANGECODE(fileterlist, code: any) {
    code = "";
      this.filterRANGECODE.forEach((element: any, index: number) => {
        if (element.DESCRIPTION != this.PREDEFINE_RANGE[0].DESCRIPTION && this.PREDEFINE_RANGE[0].DESCRIPTION == undefined) {
          if (index == 0) {
            code = element;
            this.PREDEFINE_RANGE = code;
            this.filterRANGECODE = [];
          }
          else {
            this.PREDEFINE_RANGE = element;
            return;
          }
        }
      });
  }
  filteredLinkFG: any = [];
  filterLinkFG(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.LINKFG_LIST.length; i++) {
      let LINKFG_LIST = this.LINKFG_LIST[i];
      if (LINKFG_LIST.PRODUCT_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(LINKFG_LIST);
      }
    }

    this.filteredLinkFG = filtered;
  }
  setLinkFG(fileterlist, code: any) {
    code = "";
      this.filteredLinkFG.forEach((element: any, index: number) => {
        if (element.PRODUCT_DESC != this.LINKFG_LIST[0].PRODUCT_DESC && this.LINKFG_LIST[0].PRODUCT_DESC == undefined) {
          if (index == 0) {
            code = element;
            this.LINKFG_LIST = code;
            this.filteredLinkFG = [];
          }
          else {
            this.LINKFG_LIST = element;
            return;
          }
        }
      });
  }
}
