import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-area-master',
  templateUrl: './area-master.component.html',
  styleUrls: ['./area-master.component.css']
})
export class AreaMasterComponent implements OnInit {
  isShowEditPopup:boolean = false;
  isLoaded:boolean = false;
  isHQPopUp:boolean = false;
  isShowAreaList:boolean = false;
  isShowAreadesc:boolean = false;
  isShowAreacode:boolean = false;
  isShowdropdown:boolean = false;
  isEdit:boolean = false;
  isDisabled:boolean = false;

  active:any;
  areaCode:any = "";
  description:any = "";
  salesRoleId:any;
  periodId:any;
  oldperiodId:any;
  Old_periodId:any;
  isHighLightAreaCode:any = "";
  isHighLightSalesRole:any = "";
  isHighLightRole:any = "";
  userInfo:any;
  salesRoleList:any = [];
  periodList:any = [];
  Old_periodList:any = [];
  areaList:any = [];
  selectedlist:any = [];
  AREA_CODE:any;
  AREA_DESC:any
  parent_role:any;
  SELECTED:any
  oldWEF:any;
  areaDa:any = [];
  underList:any = [];
  underId:any;
  parentRoleId:any;
  constructor(private authService: AuthService,private url: URLService,private http: HttpService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.isEdit=true;
    this.getAreaMasterDataList();
    this.getAreaListData();

  }

  getAreaMasterDataList(){
    this.userInfo = this.authService.getUserDetail();
    let data={
    }
    this.http.postnew(this.url.getAreaMasterList, data).then(
      (res:any)=>{
        this.isLoaded= false;
        this.salesRoleList=res.SalesRoleList;
        this.periodList=res.PeriodList;

      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  getAreaListData(){
    this.userInfo = this.authService.getUserDetail();
    let data={
    }
    this.http.postnew(this.url.getAreaList,data).then(
      (res:any)=>{
        this.isLoaded= false;
        this.areaList = res.AreaList;
      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  showAreaMasterData(){
    this.userInfo = this.authService.getUserDetail();
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
      AREA_CODE:this.areaCode,
      AREA_DESC:this.description,
      SALES_ROLE:this.salesRoleId,
      WEF:this.periodId.PERIOD_ID
    }
    this.isLoaded= true;
    this.http.postnew(this.url.showaredata, data).then(
      (res:any)=>{

        this.isLoaded= false;

        this.selectedlist=res;
        this.isShowAreaList = true;
        console.log( this.selectedlist,"data")
        // this.isShowAreadesc = true;
        this.isShowAreacode = true;

      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  saveAreaMasterData(){
    this.userInfo = this.authService.getUserDetail();
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
      AREA_CODE:this.areaCode,
      AREA_DESC:this.description,
      SALES_ROLE:this.salesRoleId,
      WEF:this.periodId,
      ACTIVE:this.active,
      UNDER:this.underId
     // AREA_LIST:this.selectedlist
    }
  console.log('save data',JSON.stringify(data))

    this.isLoaded= true;
    this.http.postnew(this.url.SAVEAREAMASTER, data).then(
      (res:any)=>{

        this.isLoaded= false;
        this.isShowdropdown=false
        if(res.FLAG == true){
          this.toastrService.success(res.MSG);
        }
        // this.selectedlist=res;
        // this.isShowAreaList = true;
        // this.isShowAreadesc = true;
        // this.isShowAreacode = true;

      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  cancelAreaMasterData(){
    // this.isShowEditPopup = true;
    this.areaCode = "";
    this.description = "";
    this.salesRoleId = 0;
    this.active = false;
    this.selectedlist = [];
    this.isDisabled = false;
    this.isShowAreacode = false;
    this.isShowAreadesc = false;
    this.isShowAreaList = false;
    this.isShowdropdown=false;
  }

  showGrid(){
    this.isShowAreaList = true;
  }

  onEditListClick(){
     this.isShowEditPopup = true;
    this.isShowdropdown=true;
  }

  onAreaSelected(rowData:any){
    console.log(rowData,"rowData");
    this.areaCode = rowData.AREA_CODE;
    this.salesRoleId = rowData.SALESROLE_ID;
    this.description = rowData.AREA_NAME;
    this.active = rowData.ACTIVE;
    this.parentRoleId = rowData.parent_role;
    this.underId = rowData.parent_code;
  // console.log(this.salesRoleId,this.filterSalesRoleId,"sales ")
    // this.salesRoleList.forEach((element:any) => {
    //   if(this.salesRoleId==element.SALESROLE_ID){
    //     this.salesRoleId=element
    //   }
    // });

    // this.periodList.forEach((element:any) => {
    //   if(this.oldperiodId==element.PERIOD_ID){
    //     this.oldperiodId=element
    //   }
    // });



   // console.log(this.salesRoleId,"role");
    // this.periodId = this.pe
    // this.showAreaMasterData()

    this.userInfo = this.authService.getUserDetail();
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
      AREA_CODE:this.areaCode,
      AREA_DESC:this.description,
      SALES_ROLE: this.salesRoleId,
      WEF:''
    }
    this.isLoaded= true;
    this.http.postnew(this.url.showaredata, data).then(
      (res:any)=>{

        this.isLoaded= false;
        console.log(res)
        this.selectedlist=res;

        this.isShowEditPopup = false;
        this.isShowAreaList = true;
        // this.isShowAreadesc = true;
        this.isShowAreacode = true;
        this.isDisabled = true;
        this.getEditUnderAreaList();
      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
    this.http.postnew(this.url.GETAREAWEFLIST, data).then(
      (res:any)=>{

        this.isLoaded= false;
        console.log(res)
        this.Old_periodList = res.periodlist;
        this.isDisabled=true;

       // console.log('periodList',this.periodList,this.Old_periodList,rowData.wef_period)
        this.periodList.forEach((element:any) => {
          if(element.PERIOD_ID == rowData.wef_period){
            this.periodId = element.PERIOD_ID
            // commented by gauresh
           // this.periodId = {"PERIOD_ID":element.PERIOD_ID,"PERIOD_DESC":element.PERIOD_DESC,"FROM_DATE":element.FROM_DATE};
           // this.oldperiodId = {"PERIOD_ID":element.PERIOD_ID,"PERIOD_DESC":element.PERIOD_DESC,"FROM_DATE":element.FROM_DATE};
          }

        });
        this.Old_periodList.forEach((element:any) => {
          if(element.PERIOD_ID == rowData.wef_period){
           // this.periodId = {"PERIOD_ID":element.PERIOD_ID,"PERIOD_DESC":element.PERIOD_DESC,"FROM_DATE":element.FROM_DATE};

            // commented by gauresh
           // this.oldperiodId = {"PERIOD_ID":element.PERIOD_ID,"PERIOD_DESC":element.PERIOD_DESC,"FROM_DATE":element.FROM_DATE};
           this.oldperiodId = element.PERIOD_ID
          }

        });
        console.log('Old_periodList',this.Old_periodList.PERIOD_ID)
      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  getEditUnderAreaList(){
  let data={
    "SALEROLE_ID":this.parentRoleId
  }

    this.http.postnew(this.url.GETAREAUNDERLIST, data).then(
      (res:any)=>{

        this.isLoaded= false;
        console.log(res)
        this.underList = res.UnderList;

      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  ClosePopUp(){
    this.isShowEditPopup = false;
  }

  filterUnderId:any=[];
  filteredUnderId(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.underList.length; i++) {
      let underList = this.underList[i];
      if (underList.AREA_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(underList);
      }
    }

    this.filterUnderId = filtered;
  }

  setUnderId(fileterlist, code: any) {
    code = "";
      this.filterUnderId.forEach((element: any, index: number) => {
        if (element.AREA_NAME != this.underList.AREA_NAME && this.underList.AREA_NAME == undefined) {
          if (index == 0) {
            code = element;
            this.underList = code;
            this.filterUnderId = [];
          }
          else {
            this.underList = element;
            return;
          }
        }
      });
  }

  filterSalesRoleId:any=[];
  filteredSalesRoleId(event: any) {
    console.log(this.salesRoleId,"s")
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.salesRoleList.length; i++) {
      let salesRoleList = this.salesRoleList[i];
      if (salesRoleList.SALESROLE_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(salesRoleList);
      }
    }

    this.filterSalesRoleId = filtered;
  }

  setSalesRoleId(fileterlist, code: any) {
    console.log(this.salesRoleId,"ro;e")
    code = "";
      this.filterSalesRoleId.forEach((element: any, index: number) => {
        if (element.SALESROLE_NAME != this.salesRoleList.SALESROLE_NAME && this.salesRoleList.SALESROLE_NAME == undefined) {
          if (index == 0) {
            code = element;
            this.salesRoleList = code;
            this.filterSalesRoleId = [];
          }
          else {
            this.salesRoleList = element;
            return;
          }
        }
      });
  }


  filterPeriodId:any=[];
  filteredPeriodId(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.periodList.length; i++) {
      let periodList = this.periodList[i];
      if (periodList.PERIOD_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(periodList);
      }
    }

    this.filterPeriodId = filtered;
  }


  Old_filterPeriodId:any=[];
  Old_filteredPeriodId(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.Old_periodList.length; i++) {
      let Old_periodList = this.Old_periodList[i];
      if (Old_periodList.PERIOD_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(Old_periodList);
      }
    }

    this.filterPeriodId = filtered;
  }

  setPeriodId(fileterlist, code: any) {
    code = "";
      this.filterPeriodId.forEach((element: any, index: number) => {
        if (element.PERIOD_DESC != this.periodList.PERIOD_DESC && this.periodList.PERIOD_DESC == undefined) {
          if (index == 0) {
            code = element;
            this.periodList = code;
            this.filterPeriodId = [];
          }
          else {
            this.periodList = element;
            return;
          }
        }
      });
  }

  getsalesChanges(){
    console.log(this.periodId,"periodId")

  }

  getUnderList(event){
    console.log('salesRoleId',this.salesRoleId)
    this.parentRoleId= this.salesRoleId +1;
    console.log('parentRoleId',this.parentRoleId)
    // for(let i=0;i<this.salesRoleList.length;i++){
    //   if(event.value == this.salesRoleList[i].SALESROLE_ID){
    //     this.parentRoleId = this.salesRoleList[i].PARENTROLE_ID
    //   }
    // }
   // console.log(this.parentRoleId,"parentRoles")
    this.getEditUnderAreaList();
  }

}
