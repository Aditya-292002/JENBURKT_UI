import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { ToastrService } from 'ngx-toastr';
import { URLService } from 'src/app/Service/url.service';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css']
})
export class UserMasterComponent implements OnInit {
  isEdit:boolean = true;
  ROLE_LIST=[];
  SALEROLE_LIST=[];
  WEF_LIST=[];
  HQ_AREA_LIST=[];
  _HQ_AREA_LIST:any=[];
  STATE_LIST=[];
  userList=[];
  USER_ID:any;
  userInfo:any;
  loginId:any;
  empCode:any;
  roleId:any;
  salesRoleId:any;
  hqAreaCode:any;
  wefId:any;
  stateCode:any;
  isShowdropdown:boolean = false;
  Address:any;
  MobileNo:any;
  Email:any;
  oldWEFUserList:any;
  isLoaded:boolean=false;
  isUserPopUp:boolean=false;
  Active:boolean=false;
  isAddUserMaster:boolean=false;
  isValidSalesRoleId:boolean=false;
  userMasterMode:string="";
  userName:string="";
  isHighLightLogin:string="No";
  isHighLightRole:string="No";
  isHighLightSalesRole:string="No";
  isHighLightHQArea:string="No";
  isHighLightWEF:string="No";
  DATE_OF_JOINING:any
  constructor(private router: Router,private SharedService: SharedService,private AuthService: AuthService,
    private ToastrService: ToastrService,private url: URLService,private http: HttpService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.userMasterMode = "Add User Master";
    this.GetUserList();
    this.GetUserMasterList();
  }
  GetUserList() {
    this.userInfo = this.AuthService.getUserDetail();
    let data={
    }
    this.http.postnew(this.url.getUserList, data).then(
      (res:any)=>{
        console.log("userList",res);//PRODUCTLIST
        this.isLoaded= false;
        this.userList=res.USERLIST;

      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  ClosePopUp(){
    this.isUserPopUp = false;
    this.isAddUserMaster = false;
  }
  GetUserMasterList() {
    this.userInfo = this.AuthService.getUserDetail();
    let data={"USER_ID":JSON.parse(this.userInfo).USER_ID
  }
    this.isLoaded = true;
    this.http.postnew(this.url.getUserMasterList, data).then(
      (res:any)=>{
        this.isLoaded= false;
        console.log("data",res);
        this.HQ_AREA_LIST = res.HQAREALIST;
        this._HQ_AREA_LIST = res.HQAREALIST;
        this.ROLE_LIST = res.ROLELIST;
        this.SALEROLE_LIST = res.SALESROLELIST;
        this.WEF_LIST=res.periodlist;
        this.STATE_LIST = res.Statelist;
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
        // this.isLoaded = false;
      }
    );
  }
  onEditListClick(){
    this.isAddUserMaster = true;
    this.isUserPopUp = true;
   this.isShowdropdown=true
  }
  OnCancelClick(){
    this.ClearFormData();
    this.isShowdropdown=false
  }
  onRoleChange(){
    if(this.roleId.SALES_ROLE == false){
      this.isValidSalesRoleId = true;
    }else{
      this.isValidSalesRoleId = false;
    }
  }
  onSalesRoleChange(data:any){
    this.HQ_AREA_LIST = [];
    this._HQ_AREA_LIST.forEach((element:any)=>{
      if(this.salesRoleId.SALESROLE_ID == element.SALESROLE_ID && (element.USER_ID == null || element.USER_ID == data.USER_ID)){
        this.HQ_AREA_LIST.push(element);
      }
    })
  }
  onUserSelected(data:any){
    this.ClearFormData();
    console.log('data',data)
    this.isEdit = false;
    this.loginId = data.LOGIN_ID;
    this.USER_ID = data.USER_ID;
    this.userName = data.USER_NAME;
    this.Active = data.ACTIVE;
    this.Address = data.ADDRESS;
    this.MobileNo = data.MOBILE_NO;
    this.Email = data.EMAIL;
    this.empCode = data.EMP_CODE;
    this.DATE_OF_JOINING=new Date(data.DATE_OF_JOINING)
    this.SALEROLE_LIST.forEach((element:any)=>{
      if(element.SALESROLE_ID == data.SALESROLE_ID){
        this.salesRoleId = element
       // this.salesRoleId = {"SALESROLE_ID":element.SALESROLE_ID,"SALESROLE_NAME":element.SALESROLE_NAME,"PARENTROLE_ID":element.PARENTROLE_ID,"ISPARENT":element.ISPARENT};
      }
    })
    this.onRoleChange();
    this.onSalesRoleChange(data);
    this.ROLE_LIST.forEach((element:any)=>{
      if(element.ROLE_ID == data.ROLE_ID){
        this.roleId = element
        //this.roleId = {"ROLE_ID":element.ROLE_ID,"ROLE_NAME":element.ROLE_NAME,"SALES_ROLE":element.SALES_ROLE};
      }
    })


    this.HQ_AREA_LIST.forEach((element:any)=>{
      if(element.AREA_CODE == data.AREA_CODE){
        this.hqAreaCode = element
       // this.hqAreaCode = {"AREA_CODE":element.AREA_CODE,"AREA_NAME":element.AREA_NAME,"SALESROLE_ID":element.SALESROLE_ID,"USER_ID":element.USER_ID};
      }
    })
    this.WEF_LIST.forEach((element:any)=>{
      if(element.PERIOD_ID == data.PERIOD_ID){
        this.wefId = element

       // this.wefId = {"PERIOD_ID":element.PERIOD_ID,"PERIOD_DESC":element.PERIOD_DESC};
      }
    })
    this.STATE_LIST.forEach((element:any)=>{
      if(element.STATE_CODE == data.STATE_CODE){
        this.stateCode = element
        //this.stateCode = {"STATE_CODE":element.STATE_CODE,"STATE_DESC":element.STATE_DESC};
      }
    })

    this.userMasterMode = "Edit User Master";
    this.isUserPopUp=false;
    this.isValidSalesRoleId =true;
  }

  OnSaveUserMasterClick(){
    console.log(this.hqAreaCode,"hq",this.roleId,"role")
    this.isHighLightLogin = "No";
    this.isHighLightRole = "No";
    this.isHighLightSalesRole = "No";
    this.isHighLightHQArea = "No";
    this.isHighLightWEF = "No";
    if(this.loginId == "" || this.loginId == undefined){
      this.isHighLightLogin = "Yes";
    }else{
      this.isHighLightLogin = "No";
    }

    if(this.isHighLightLogin == "Yes"){
      this.ToastrService.error("Please enter value in Login Id.");
    }else{
      if(this.roleId == "" || this.roleId == undefined){
        this.isHighLightRole = "Yes";
      }else{
        this.isHighLightRole = "No";
      }
      if((this.salesRoleId == "" || this.salesRoleId == undefined) && this.roleId.SALES_ROLE == true){
        this.isHighLightSalesRole = "Yes";
      }else{
        this.isHighLightSalesRole = "No";
      }
      // if((this.hqAreaCode == "" || this.hqAreaCode == undefined) && this.roleId.SALES_ROLE == true){
      //   this.isHighLightHQArea = "Yes";
      // }
      // else{
      //   this.isHighLightHQArea = "No";
      // }
      if(this.wefId == "" || this.wefId == undefined){
        this.isHighLightWEF = "Yes";
      }else{
        this.isHighLightWEF = "No";
      }

      if(this.isHighLightRole == "Yes"){
        this.ToastrService.error("Please select a role.");
      }
      if(this.isHighLightSalesRole == "Yes"){
        this.ToastrService.error("Please select a sales role.");
      }
      // if(this.isHighLightHQArea == "Yes"){
      //   this.ToastrService.error("Please select a HQ Area.");
      // }
      if(this.isHighLightWEF == "Yes"){
        this.ToastrService.error("Please select a Wef.");
      }

      if(this.isHighLightRole != "Yes" && this.isHighLightSalesRole != "Yes" && this.isHighLightHQArea != "Yes" && this.isHighLightWEF != "Yes"){
        this.SaveUserMaster();
        this.isShowdropdown=false
      }
    }
  }
  SaveUserMaster() {
    this.userInfo = this.AuthService.getUserDetail();
    let date=this.datepipe.transform(this.DATE_OF_JOINING,'yyyy-MM-dd')
    console.log('date ',date);
    
    let data={
      "LOGIN_ID":this.loginId,
      "LOGIN_USER_ID":JSON.parse(this.userInfo).USER_ID,
      "USER_ID":(this.userMasterMode == "Add User Master" ? 0 :this.USER_ID),
      "USER_NAME":this.userName,
      "EMP_CODE":this.empCode,
      "ROLE_ID":this.roleId.ROLE_ID,
      "SALESROLE_ID":((this.salesRoleId == undefined || this.salesRoleId == "") ? "" : this.salesRoleId.SALESROLE_ID),
      "AREA_CODE":((this.hqAreaCode == undefined || this.hqAreaCode == "") ? "" : this.hqAreaCode.AREA_CODE),
      // "HQ_CODE":this.hqAreaCode.AREA_DESC,
      "PERIOD_ID":this.wefId.PERIOD_ID,
      "STATE_CODE":this.stateCode.STATE_CODE,
      "ADDRESS":this.Address,
      "MOBILE_NO":this.MobileNo,
      "EMAIL":this.Email,
      "ACTIVE":(this.Active==true?"1":"0"),
      "DATE_OF_JOINING":(this.SharedService.isValid(date)?date:null)
    }
    console.log('data',data);
    

   // return 
    this.isLoaded = true;
    this.http.postnew(this.url.saveUserMaster, data).then(
      (res:any)=>{
        if(res.data[0].FLAG==1){
          this.isLoaded= false;
          this.ToastrService.success(res.data[0].MSG);
          this.ClearFormData();
          this.loginId = "";
          this.isShowdropdown=false
          this.GetUserList();
        } else{
          this.ToastrService.error(res.data[0].MSG);
        }

      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
        // this.isLoaded = false;
      }
    );
  }
  ClearFormData(){
    this.loginId = "";
    this.Active= false;
    this.userName = "";
    this.Address ="";
    this.stateCode = "";
    this.empCode = "";
    this.roleId = "";
    this.hqAreaCode = "";
    this.salesRoleId = "";
    this.wefId= "";
    this.userMasterMode = "Add User Master";
    this.isAddUserMaster = false;
    this.isUserPopUp = false;
    this.DATE_OF_JOINING=""
  }

  filterRoleId:any=[];
  filteredRoleId(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.ROLE_LIST.length; i++) {
      let ROLE_LIST = this.ROLE_LIST[i];
      if (ROLE_LIST.ROLE_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(ROLE_LIST);
      }
    }

    this.filterRoleId = filtered;
  }

  setRoleId(fileterlist, code: any) {
    code = "";
      this.filterRoleId.forEach((element: any, index: number) => {
        if (element.ROLE_NAME != this.ROLE_LIST[0].ROLE_NAME && this.ROLE_LIST[0].ROLE_NAME == undefined) {
          if (index == 0) {
            code = element;
            this.ROLE_LIST = code;
            this.filterRoleId = [];
          }
          else {
            this.ROLE_LIST = element;
            return;
          }
        }
      });
  }

  filterSalesRoleId:any=[];
  filteredSalesRoleId(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.SALEROLE_LIST.length; i++) {
      let SALEROLE_LIST = this.SALEROLE_LIST[i];
      if (SALEROLE_LIST.SALESROLE_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(SALEROLE_LIST);
      }
    }

    this.filterSalesRoleId = filtered;
  }

  setSalesRoleId(fileterlist, code: any) {
    code = "";
      this.filterSalesRoleId.forEach((element: any, index: number) => {
        if (element.SALESROLE_NAME != this.SALEROLE_LIST[0].SALESROLE_NAME && this.SALEROLE_LIST[0].SALESROLE_NAME == undefined) {
          if (index == 0) {
            code = element;
            this.SALEROLE_LIST = code;
            this.filterSalesRoleId = [];
          }
          else {
            this.SALEROLE_LIST = element;
            return;
          }
        }
      });
  }

  filterHqAreaCode:any=[];
  filteredHqAreaCode(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.HQ_AREA_LIST.length; i++) {
      let HQ_AREA_LIST = this.HQ_AREA_LIST[i];
      if (HQ_AREA_LIST.AREA_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(HQ_AREA_LIST);
      }
    }

    this.filterHqAreaCode = filtered;
  }

  setHqAreaCode(fileterlist, code: any) {
    code = "";
      this.filterHqAreaCode.forEach((element: any, index: number) => {
        if (element.AREA_NAME != this.HQ_AREA_LIST[0].AREA_NAME && this.HQ_AREA_LIST[0].AREA_NAME == undefined) {
          if (index == 0) {
            code = element;
            this.HQ_AREA_LIST = code;
            this.filterHqAreaCode = [];
          }
          else {
            this.HQ_AREA_LIST = element;
            return;
          }
        }
      });
  }

  filterWefId:any=[];
  filteredWefId(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.WEF_LIST.length; i++) {
      let WEF_LIST = this.WEF_LIST[i];
      if (WEF_LIST.PERIOD_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(WEF_LIST);
      }
    }

    this.filterWefId = filtered;
  }

  setWefId(fileterlist, code: any) {
    code = "";
      this.filterWefId.forEach((element: any, index: number) => {
        if (element.PERIOD_DESC != this.WEF_LIST[0].PERIOD_DESC && this.WEF_LIST[0].PERIOD_DESC == undefined) {
          if (index == 0) {
            code = element;
            this.WEF_LIST = code;
            this.filterWefId = [];
          }
          else {
            this.WEF_LIST = element;
            return;
          }
        }
      });
  }
  filterStateCode:any=[];
  filteredStateCode(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.STATE_LIST.length; i++) {
      let STATE_LIST = this.STATE_LIST[i];
      if (STATE_LIST.STATE_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(STATE_LIST);
      }
    }

    this.filterStateCode = filtered;
  }

  setStateCode(fileterlist, code: any) {
    code = "";
      this.filterStateCode.forEach((element: any, index: number) => {
        if (element.STATE_DESC != this.STATE_LIST[0].STATE_DESC && this.STATE_LIST[0].STATE_DESC == undefined) {
          if (index == 0) {
            code = element;
            this.STATE_LIST = code;
            this.filterStateCode = [];
          }
          else {
            this.STATE_LIST = element;
            return;
          }
        }
      });
  }

}
