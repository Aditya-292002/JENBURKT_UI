import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sample-allocation-approval',
  templateUrl: './sample-allocation-approval.component.html',
  styleUrls: ['./sample-allocation-approval.component.css']
})
export class SampleAllocationApprovalComponent implements OnInit {
  CYCLE_CODE:any;
  UNIT_CODE:any;
  CYCLE_LIST:any=[]
  UNIT_LIST:any=[]
  userInfo: any;
  isLoaded: boolean = false;
  SAMPLE_ALLOC_DETAILS_LIST=[{}]
  isShowSampleAllocDetailsList:boolean=false
  isShowSampleAllocationApprovalList:boolean=false;
  ProductName:any;
  heading:String="Sample Product Details "
  isHighLightCycle:String="No";
  isHighLightUnit:string="No";
  SAMPLE_ALLOCATION_APPROVAL_LIST=[{"SAMPLE_PRODUCT_CODE":"","SAMPLE_ALLOCATER_QTY":"","SAMPLE_STOCK":""}]

  constructor(private authService: AuthService, private url: URLService, private http: HttpService, private toastrService: ToastrService,) { }




  ngOnInit(): void {
    this.getSampleAllocationApprovalMasterList();
  }


  getSampleAllocationApprovalMasterList(){
    this.userInfo = this.authService.getUserDetail();

      let data = {}
      // this.isLoaded = true;
      this.http.postnew(this.url.GETSAMPLEAPPROVALMASTERDATA, data).then(
        (res: any) => {
          // this.isLoaded = false;
          this.CYCLE_LIST = res.CYCLE_LIST;
          this.UNIT_LIST=res.UNIT_LIST

        },
        error => {
          console.log(error);
          this.toastrService.error("Oops, Something went wrong.");
        }
      );
   }


   onSaveSampleAllocationApprovalClick() {
    this.userInfo = JSON.parse(this.authService.getUserDetail());
    let data = {
     "CYCLE_CODE":this.CYCLE_CODE,
     "UNIT_CODE":this.UNIT_CODE,
     "USER_ID":+this.userInfo.USER_ID,
     "DETAILS": this.SAMPLE_ALLOCATION_APPROVAL_LIST
    }
  console.log(' save data',JSON.stringify(data))

    // this.isLoaded = true;

    this.http.postnew(this.url.SAVESAMPLEAPPROVALDETAILS, data).then(
      (res: any) => {
        // this.isLoaded = false;
        console.log
        if (res.data[0].FLAG == true) {
          this.toastrService.success(res.data[0].MSG)
          this.getSampleAllocationApprovalMasterList();
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

  formValidate(){
  this.isHighLightCycle="No";
  this.isHighLightUnit="No";
  if(this.CYCLE_CODE==undefined || this.CYCLE_CODE == ""){
    this.isHighLightCycle="Yes";
    this.toastrService.error("Please select a Cycle")
  }else{
    this.isHighLightCycle="No"
  }
  if(this.UNIT_CODE==undefined || this.UNIT_CODE == ""){
    this.isHighLightUnit="Yes";
    this.toastrService.error("Please select a Cycle")
  }else{
    this.isHighLightUnit="No"
  }
  if(this.isHighLightCycle != "Yes" || this.isHighLightUnit !="Yes"){
    this.onSaveSampleAllocationApprovalClick();
  }
  }
  clearForm(){
    this.CYCLE_CODE="";
    this.UNIT_CODE="";
    this.isShowSampleAllocationApprovalList=false
    this.SAMPLE_ALLOCATION_APPROVAL_LIST=[];
    this.SAMPLE_ALLOC_DETAILS_LIST=[];
    this.isShowSampleAllocDetailsList=false
  }

   onCycleChange(){
    this.isShowSampleAllocationApprovalList=true;
    this.isShowSampleAllocDetailsList=false;
    this.SAMPLE_ALLOC_DETAILS_LIST=[]
    this.userInfo = this.authService.getUserDetail();
    let data ={
     "CYCLE_CODE":this.CYCLE_CODE,
      "UNIT_CODE":this.UNIT_CODE
    }
    // this.isLoaded = true;
    console.log("data",data)
    this.http.postnew(this.url.GETSAMPLEALLOCDETAILFORAPPROVAL, data).then(
      (res: any) => {
        console.log("response", res);
        // this.isLoaded = false;
       this.SAMPLE_ALLOCATION_APPROVAL_LIST= res.SAMPLE_PRODUCT_DETAILS
      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );

   }

   onSampleProductcode(Product:any){
    this.isShowSampleAllocDetailsList=true;
    this.ProductName=Product
    console.log("product",Product)
    let data={
      "SAMPLE_PRODUCT_CODE": Product,
      "CYCLE_CODE":this.CYCLE_CODE
    }

    // this.isLoaded = true;
    this.http.postnew(this.url.GETSAMPLEAPPROVALDETAILSBYSAMPLECODE, data).then(
      (res: any) => {
        console.log("response", res);
        // this.isLoaded = false;

       this.SAMPLE_ALLOC_DETAILS_LIST= res.SAMPLE_ALLOC_DETAILS
      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
   }

   ClosePopUp() {
    this.isShowSampleAllocDetailsList = false;
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
