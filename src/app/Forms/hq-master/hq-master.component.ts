import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { ToastrService } from 'ngx-toastr';
import { URLService } from 'src/app/Service/url.service';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/Service/common.service';

@Component({
  selector: 'app-hq-master',
  templateUrl: './hq-master.component.html',
  styleUrls: ['./hq-master.component.css']
})
export class HqMasterComponent implements OnInit {
  poolHQList:any=[];
  FMHQList:any=[];
  WEFHQList:any=[];
  MRHQList:any=[];

oldWEFHQList:any=[];
  userInfo:any;
  HQCode:any;
  HQDescription:any;
  poolHQCode:any;
  underFMCode:any;
  WEFCode:any;
  oldWEFCode:any;
  MRCode:any;
  HQMasterList:any=[];
  active:boolean=false;
  isHQPopUp:boolean=false;
  isLoaded:boolean=false;
  isAddHQMaster:boolean = false;
  isShowdropdown:boolean = false;
  HQMasterMode:string="";
  ConfirmationModal:boolean=false;
  isHighLightHQCode:string="No";
  isHighLightHQDescription:string="No";
  isHighLightPoolHQ:string="No";
  isHighLightUnderFM:string="No";
  isHighLightWEF:string="No";
  isHighLightDiv:string="No";
  MODE:any;
  isHighLightMR:string="No";
  isHighLightActive:string="No";
  isValidateDate:boolean=true;
  ValidateDateMessage:any;
  v_post_data:any={};
  DIV_LIST: any=[];
  divCode: any;
  disableDropdown: boolean=false;
  constructor(private router: Router,private SharedService: SharedService,private AuthService: AuthService,
    private ToastrService: ToastrService,private Common:CommonService,private url: URLService,private http: HttpService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.HQMasterMode = "Add HQ Master";
    this.GetHQList();
    this.GetHQMasterList();


  }
  GetHQList() {
    this.userInfo = this.AuthService.getUserDetail();
    let data={
    }
    this.isLoaded = true;
    this.http.postnew(this.url.getHQList, data).then(
      (res:any)=>{
        this.isLoaded= false;
        this.HQMasterList = res.poolhqlist;
        console.log(this.HQMasterList)
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
        // this.isLoaded = false;
      }
    );
  }

  GetHQEditList(PERIOD_ID) {
    this.userInfo = this.AuthService.getUserDetail();
    let data={
      "HQ_CODE":this.HQCode
    }
    this.isLoaded = true;
    this.disableDropdown = false;
    this.http.postnew(this.url.GETHQWEFLIST, data).then(
      (res:any)=>{
       // this.oldWEFHQList=[];
        //this.oldWEFCode = PERIOD_ID;
        this.isLoaded= false;
        this.oldWEFHQList = res.periodlist;
setTimeout(() => {
         res?.periodlist.forEach((element:any) => {
          if(+element.PERIOD_ID == +PERIOD_ID){
              this.oldWEFCode = Number(element.PERIOD_ID);
            console.log('oldWEFCode', this.oldWEFCode,element);
            
           // this.oldWEFCode  = {"PERIOD_ID":element.PERIOD_ID,"PERIOD_DESC":element.PERIOD_DESC,"FROM_DATE":element.FROM_DATE};
           // this.oldperiodId = {"PERIOD_ID":element.PERIOD_ID,"PERIOD_DESC":element.PERIOD_DESC,"FROM_DATE":element.FROM_DATE};
          }

        });
        this.WEFHQList.forEach((element:any) => {
          if(+element.PERIOD_ID == +PERIOD_ID){
            // this.WEFCode = element.PERIOD_ID
              this.WEFCode    = Number(element.PERIOD_ID);
           // this.WEFCode = {"PERIOD_ID":element.PERIOD_ID,"PERIOD_DESC":element.PERIOD_DESC};
            console.log( this.WEFCode,"code")
          }
        });
}, 1000);

      this.disableDropdown = true; 
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
        // this.isLoaded = false;
      }
    );
    console.log('oldWEFCode',this.oldWEFCode);
    
  }
  onEditListClick(){
    this.isHQPopUp = true;
    this.isShowdropdown=true
  }
  ClosePopUp(){
    this.isHQPopUp = false;
    this.isAddHQMaster = false;
  }
  OnCancelClick(){
    this.clearFormData();
    this.isShowdropdown=false
  }
  onHQSelected(data:any){
    console.log('datat',data);
    this.WEFCode=""
    this.HQCode = data.HQ_CODE;
    this.HQDescription = data.HQ_DESC;
    this.active=data.ACTIVE;
    // console.log("edit data",data,this.WEFHQList);
    // this.poolHQCode = {"POOL_CODE":data.POOL_CODE,"POOL_DESC":data.POOL_DESC};
    // this.underFMCode = {"FM_CODE":data.FM_CODE,"FM_NAME":data.FM_NAME};
    this.poolHQCode=data.POOL_CODE;
    this.underFMCode=data.FM_CODE
    this.divCode=data.DIVISION_CODE//{"DIVISION_CODE":data.DIVISION_CODE,"DIV_DESC":data.DIVISION_NAME};
    this.MRCode = {"MR_CODE":data.MR_CODE,"MR_NAME":data.MR_NAME};
    this.HQMasterMode = "Edit HQ Master";
    this.isAddHQMaster = true;
    this.isHQPopUp = false;
    this.GetHQEditList(data.PERIOD_ID);
  }
  GetHQMasterList() {
    this.userInfo = this.AuthService.getUserDetail();
    this.v_post_data.HQ_CO0DE = 0
    this.isLoaded = true;
    this.http.postnew(this.url.getHQMasterList, this.v_post_data).then(
      (res:any)=>{
        this.isLoaded= false;
        // console.log("data",res);
        this.poolHQList = res.poolhqlist;
        this.FMHQList = res.FMLIST;
        this.WEFHQList = res.periodlist;
        this.MRHQList = res.MRLIST;
        this.DIV_LIST = res.DIV_LIST;

        this.poolHQList.forEach((value:any)=>{
          value.DisplayName = (value.POOL_CODE == '' ? '' : (value.POOL_CODE+ "-" +value.POOL_DESC));
        })
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
        // this.isLoaded = false;
      }
    );
  }
  OnFormValidateHQMasterClick(){
    this.isHighLightHQCode = "No";
    this.isHighLightHQDescription = "No";
    this.isHighLightPoolHQ = "No";
    this.isHighLightUnderFM = "No";
    this.isHighLightDiv = "No";
    this.isHighLightWEF = "No";
    this.isHighLightMR = "No";
    this.isHighLightActive = "No";
    if(this.HQCode =="" || this.HQCode == undefined){
      this.isHighLightHQCode = "Yes";
      this.ToastrService.error("Please enter a value in HQ Code.");
      return;
    }else{
      this.isHighLightHQCode = "No";
    }
    if(this.HQDescription =="" || this.HQDescription == undefined){
      this.isHighLightHQDescription = "Yes";
      this.ToastrService.error("Please enter a value in HQ Description.");
      return
    }else{
      this.isHighLightHQDescription = "No";
    }
    // if(this.active == false){
    //   this.isHighLightActive = "Yes";
    // }else{
    //   this.isHighLightActive = "No";
    // }

    if(this.isHighLightHQCode == "Yes"){

    }
    if(this.HQDescription != "Yes" && this.isHighLightHQCode != "Yes"){
      if(this.poolHQCode =="" || this.poolHQCode == undefined){
        this.isHighLightPoolHQ = "Yes";
      }else{
        this.isHighLightPoolHQ = "No";
      }
      if(this.underFMCode =="" || this.underFMCode == undefined){
        this.isHighLightUnderFM = "Yes";
      }else{
        this.isHighLightUnderFM = "No";
      }
            if(this.divCode =="" || this.divCode == undefined){
        this.isHighLightDiv = "Yes";
      }else{
        this.isHighLightDiv = "No";
      }
      if(this.WEFCode =="" || this.WEFCode == undefined){
        this.isHighLightWEF = "Yes";
      }else{
        this.isHighLightWEF = "No";
      }

      if(this.MRCode === "" || this.MRCode === undefined){
        this.isHighLightMR = "Yes";
      }else{
        this.isHighLightMR = "No";
      }

      if(this.isHighLightPoolHQ == "Yes"){
        this.ToastrService.error("Please select a value in Pool HQ.");
      }
      if(this.isHighLightUnderFM == "Yes"){
        this.ToastrService.error("Please select a value in Under FM.");
      }
      if(this.isHighLightWEF == "Yes"){
        this.ToastrService.error("Please select a value in WEF.");
      }
      // if(this.isHighLightMR== "Yes"){
      //   this.ToastrService.error("Please select a value in MR.");
      // }
      if(this.isHighLightPoolHQ != "Yes" && this.isHighLightUnderFM != "Yes" && this.isHighLightWEF != "Yes"  ){
        this.onSaveHQMasterClick();
      }
    }
  }
  SaveHQMasterList() {
    this.userInfo = this.AuthService.getUserDetail();
    let data={"HQ_CODE":this.HQCode,
    "LOGIN_ID":JSON.parse(this.userInfo).USER_ID,
    "HQ_DESC":this.HQDescription,
    "POOL_CODE":this.poolHQCode,
    "MR_CODE": this.Common.isValid(this.MRCode) ? this.MRCode : "",
    "FM_CODE":this.underFMCode,
    "WFM_CODE":this.WEFCode,
    "DIV_CODE":this.divCode.DIVISION_CODE,
    "ACTIVE":(this.active == true ? "1": "0")
  }
    this.isLoaded = true;
    // console.log('data ->' , data)
    // return
    this.http.postnew(this.url.saveHQMaster, data).then(
      (res:any)=>{
        if(res.data[0].FLAG==1){
          this.isLoaded= false;
          this.isShowdropdown=false
          this.ToastrService.success(res.data[0].MSG);
          this.GetHQMasterList();
          this.GetHQList();
          this.clearFormData();
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
  clearFormData(){
    this.HQCode = "";
    this.HQDescription = "";
    this.underFMCode ="";
    this.WEFCode = "";
    this.poolHQCode = "";
    this.MRCode ="";
    this.HQMasterMode = "Add HQ Master";
    this.isAddHQMaster = false;
    this.active = false;
  }

  filterPoolHQCode:any=[];
  filteredPoolHQCode(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.poolHQList.length; i++) {
      let poolHQList = this.poolHQList[i];
      if (poolHQList.DisplayName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(poolHQList);
      }
    }

    this.filterPoolHQCode = filtered;
  }

  setPoolHQCode(fileterlist, code: any) {
    code = "";
      this.filterPoolHQCode.forEach((element: any, index: number) => {
        if (element.DisplayName != this.poolHQList.DisplayName && this.poolHQList.DisplayName == undefined) {
          if (index == 0) {
            code = element;
            this.poolHQList = code;
            this.filterPoolHQCode = [];
          }
          else {
            this.poolHQList = element;
            return;
          }
        }
      });
  }


  filterUnderFMCode:any=[];
  filteredUnderFMCode(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.FMHQList.length; i++) {
      let FMHQList = this.FMHQList[i];
      if (FMHQList.FM_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(FMHQList);
      }
    }

    this.filterUnderFMCode = filtered;
  }

  setUnderFMCode(fileterlist, code: any) {
    code = "";
      this.filterUnderFMCode.forEach((element: any, index: number) => {
        if (element.FM_NAME != this.poolHQList.FM_NAME && this.poolHQList.FM_NAME == undefined) {
          if (index == 0) {
            code = element;
            this.FMHQList = code;
            this.filterUnderFMCode = [];
          }
          else {
            this.FMHQList = element;
            return;
          }
        }
      });
  }



  filterUnderMRCode:any=[];
  filteredUnderMRCode(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.MRHQList.length; i++) {
      let MRHQList = this.MRHQList[i];
      if (MRHQList.MR_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(MRHQList);
      }
    }

    this.filterUnderMRCode = filtered;
  }

  setUnderMRCode(fileterlist, code: any) {
    code = "";
      this.filterUnderMRCode.forEach((element: any, index: number) => {
        if (element.MR_NAME != this.MRHQList.MR_NAME && this.MRHQList.MR_NAME == undefined) {
          if (index == 0) {
            code = element;
            this.MRHQList = code;
            this.filterUnderMRCode = [];
          }
          else {
            this.MRHQList = element;
            return;
          }
        }
      });
  }


  filterWEFCode:any=[];
  filteredWEFCode(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.WEFHQList.length; i++) {
      let WEFHQList = this.WEFHQList[i];
      if (WEFHQList.PERIOD_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(WEFHQList);
      }
    }

    this.filterWEFCode = filtered;
  }

  setWEFCode(fileterlist, code: any) {
    code = "";
      this.filterWEFCode.forEach((element: any, index: number) => {
        if (element.PERIOD_DESC != this.WEFHQList.PERIOD_DESC && this.WEFHQList.PERIOD_DESC == undefined) {
          if (index == 0) {
            code = element;
            this.WEFHQList = code;
            this.filterWEFCode = [];
          }
          else {
            this.WEFHQList = element;
            return;
          }
        }
      });
  }
  onSaveHQMasterClick(){
    if(this.isValidateDate == true){

      this.ConfirmationModal = true;
      this.isShowdropdown=false

    }else{
      this.ToastrService.error(this.ValidateDateMessage,"");
    }
  }
   OnYesClick(val:string){
    if(val== "Y"){
      this.ConfirmationModal = false;
      this.SaveHQMasterList();
    }
    else if(val == "N"){
      this.ConfirmationModal = false;
    }
  }
  getsalesChanges(){
    // console.log('underFMCode',this.underFMCode)
    console.log('poolHQCode',this.poolHQCode)
    console.log('underFMCode',this.underFMCode)
    console.log('WEFCode',this.WEFCode)
    console.log('oldWEFCode',this.oldWEFCode)
    // console.log();

  }
}
