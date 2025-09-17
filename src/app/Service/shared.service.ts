import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
//import * as zlib from 'zlib'
import { DatePipe } from '@angular/common';
//import * as FileSaver from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  getCustomerData(): any {
    throw new Error('Method not implemented.');
  }
  isValidateDate: any;
  ValidateDateMessage: any;

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
    private date: DatePipe) { }

  branding: any = ''
  tbl_branding: any = "#ddd"
  topLogoFile: any = '';
  isForceToChange= new BehaviorSubject(false);
  isMenu = new BehaviorSubject([]);
  isAddEditUser = new BehaviorSubject(false);
  isloginpage = true;

  ROLE_ID = new BehaviorSubject(0);
  //isMenu : boolean = false;
  UserName = new BehaviorSubject("");
  ShowGlobalCost= new BehaviorSubject(false);
  showExportGlobalCost = new BehaviorSubject(false);
  isMenuValue:any="";
  isToggleMenu : string="";
  isMainContainer: boolean = false;
  commonArray: Array<any> = [];
  message: any = [];
  role_rights_data: any = {};
  assetData: any = [];
  escalationData: any = [];
  workorderDisplay: any = [];
  ppm_asset: any = {};
  matRequest: any = [];
  servRpt: any = [];
  assetreport_display: any = [];
  report_no: any = '';
  appConfig: any = '';
  report_type: string = '';
  ViewBy: string = '';
  redirect_to:string='';
  //ApiUrl= "http://89.163.149.137:5000";
  // ApiUrl="http://localhost:26493";
//  ApiUrl =  "http://localhost:45232/";
//  ApiUrl= "http://192.168.1.27:9323/";    
// ApiUrl= "http://103.74.54.212:4201/"; //Live Server Test APIKS
 ApiUrl= "http://103.74.54.212:5000/"; //Live Server Live API
  AuthenticatedUser:boolean = false;
  isPricing:boolean = true;
  LoginUser: string = '';
  LastLogin: any = '';
  validationKey: any = ""; 
  userName:any="";
  formView: boolean = false;
  buttonArray: Array<any> = [];
  c_data: any;
  data: any = {};
  policy: any = {
    Numeric: '(?=.  *[0-90])',                                                                                                
    Alpha: '^([a-zA-Z]+\s)*[a-zA-Z]+$',
    Upper: '(?=.*[A-Z])',
    Lower: '(?=.*[a-z])',
    Special: '(?=.*[$@$!%*?&])',
    Strong: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]'
  }
  private full_month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private short_month: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  ValidationMsg(messageId: number): string {
    let str: string = '';
    for (let i = 0; i < this.message.length; i++) {

      if (this.message[i].message_id == messageId) {
        str = this.message[i].message_text;
      }
    }
    return str;
  }

  dateFormat(format: string): string {
    let str: string = '';

    if (format == 'DD-MM-YYYY') {
      str = "dd-MM-yyyy";
    } else if (format == 'MM-DD-YYYY') {
      str = "MM-dd-yyyy";
    } else if (format == 'DD-MMM-YYYY') {
      str = "dd-MMM-yyyy";
    } else if (format == 'MMM-DD-YYYY') {
      str = "MMM-dd-yyyy";
    } else if (format == 'DD/MM/YYYY') {
      str = "dd/MM/yyyy";
    } else if (format == 'MM/DD/YYYY') {
      str = "MM/dd/yyyy";
    } else if (format == 'DD/MMM/YYYY') {
      str = "dd/MMM/yyyy";
    } else if (format == 'MMM/DD/YYYY') {
      str = "MMM/dd/yyyy";
    }
    return str;
  }

  CheckAuthenticateUser(){
    let UserInfo = this.getUserInfo();

    let ROLE_ID = UserInfo.ROLE_ID;

    this.AuthenticatedUser = ((ROLE_ID != undefined)?((ROLE_ID == 1 || ROLE_ID == 5)?true:false):false);
  }


  getUserInfo = () => {
    let UserInfo = JSON.parse(localStorage.getItem("userdetail") ?? '{}');
    return UserInfo;
  }

  convertFormattedDate(value:string,dateFormat:string):string{
    if(value == null || value == undefined)
      return "";

    let str:string = "";
    if (dateFormat == 'DD-MM-YYYY') {
      let splitArray = value.split("-");
      str = splitArray[1]+"-"+splitArray[0]+"-"+splitArray[2];
    }
    else if (dateFormat == 'MMM-DD-YYYY') {
      let splitArray = value.split("-");
      str = splitArray[1]+"-"+splitArray[0]+"-"+splitArray[2];
    }
    else if (dateFormat == 'DD/MM/YYYY'){
      let splitArray = value.split("/");
      str = splitArray[1]+"-"+splitArray[0]+"-"+splitArray[2];
    }
    else if(dateFormat == 'MMM/DD/YYYY'){
      let splitArray = value.split("/");
      str = splitArray[1]+"-"+splitArray[0]+"-"+splitArray[2];
    }
    else
      str = value;
    return str;
  }

  FileName_Date() {
    return this.date.transform(new Date(), 'dd-MMM-yyyy hh:mm:ss');
  }

  public d_stack: any = [];
  public day: any;
  public month: any;
  public year: any;

  invalid_file_types: Array<string> = ["exe", "bat", "ini", "bmp", "gif", "json", "js", "php", "css", "html", "mp4", "avi", "mkv"]
  public checkFile(fileArray: any): any {

    var UploadFiles: any = [];

    for (var i = 0; i < fileArray.length; i++) {

      var fname = fileArray[i].name;
      var size = fileArray[i].size / 1024 / 1024;

      var dotIndex = fileArray[i].name.lastIndexOf('.');

      var name = "";
      var ext = fileArray[i].name.substr(fileArray[i].name.lastIndexOf(".") + 1);

      if (this.invalid_file_types.includes(ext.toLowerCase())) {
        this.toastr.warning("Invalid Document Found.");
        return UploadFiles;
      } else if (size > 20) {
        this.toastr.warning(this.ValidationMsg(272));
      } else {
        name = fname.substring(0, dotIndex);
        ext = fileArray[i].name.substring(dotIndex);

        if (name.length >= 20) {
          name = name.substring(0, 12)
        }
        fileArray[i].f_name = name + ext;
        UploadFiles.push(fileArray[i]);
      }
    }
    return UploadFiles;
  }

  public checkLogoFile(fileArray: any): any {

    var UploadFiles: any = [];

    for (var i = 0; i < fileArray.length; i++) {

      var fname = fileArray[i].name;
      var size = fileArray[i].size / 1024 / 1024;

      var dotIndex = fileArray[i].name.lastIndexOf('.');

      var name = "";
      var ext = "";
      if (size > 1) {
        this.toastr.warning("Maximum Logo Size 1mb");
      } else {
        name = fname.substring(0, dotIndex);
        ext = fileArray[i].name.substring(dotIndex);

        if (name.length >= 20) {
          name = name.substring(0, 12)
        }
        fileArray[i].f_name = name + ext;
        UploadFiles.push(fileArray[i]);
      }
    }
    return UploadFiles;
  }
  get_error(err: any) {
    //console.log(err);
  //  this.spinner.hide();
  }

  public getUserName = (): string | null => {
    return JSON.parse(localStorage.getItem("userInfo") ?? '{}').name;
  }


  public getUserId = (): string | null => {
    return JSON.parse(localStorage.getItem("userdetail") ?? '{}').USER_ID;
  }

  public getRoleName = (): string | null => {
    return JSON.parse(localStorage.getItem("userdetail") ?? '{}').ROLE_NAME;
  }

  public getRegionCode = (): string | null => {
    return JSON.parse(localStorage.getItem("userdetail") ?? '{}').REGION_CODE;
  }

  public getRoleID = (): any | null => {
    return JSON.parse(localStorage.getItem("userdetail") ?? '{}').ROLE_ID;
  }

  isValid(InputValue:any){
    if(InputValue == "" || InputValue == null || InputValue == "undefined" || InputValue == undefined){
       return false;
    }else {
      return true;
    }
  }

}
