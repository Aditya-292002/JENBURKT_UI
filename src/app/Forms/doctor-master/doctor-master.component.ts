import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { AuthService } from 'src/app/Service/auth.service';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-doctor-master',
  templateUrl: './doctor-master.component.html',
  styleUrls: ['./doctor-master.component.css'],
})
export class DoctorMasterComponent implements OnInit {
  HQ_CODE: any;
  DOCTOR_CODE: any;
  DOCTOR_NAME: any;
  DOCTOR_QUALIFICATION: any;
  MDL_NUMBER: any;
  isShowEditPopup:boolean = false;
  DOCTOR_SPECIALIZATION: any;
  convertedJson: any = [];
  inputfileltext: any = '';
  Specialization_list: any[];
  HQ_codes_list: any[];
  userInfo: any;
  DOCTOR_LIST:any[];
  Excel: number = 0;
  Tags: string[];
  Keys: string[];
  Flag: number = 0;
  first:number=0;
  rows:number=10;
  totalRecords:any = 0;
  enabler:boolean=true;
  isShowdropdown:boolean = false;
  Template_Headers: any[] = [
    {
      "HQ_CODE":'',
      "Doctor_Name": '',
      "Customer_Code": '',
      "spl_name": '',
      "Qualification": '',
      "MDL Number": '',
    },
  ];
  UPLOAD: any;
  isAddDoctorMaster: boolean;
  isLoaded: boolean = false;
  paginator: Paginator;

  constructor(
    private authService: AuthService,
    private url: URLService,
    private http: HttpService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.onDoctorMaster();
  }

  onPrevPage(dt: any) {
    dt.first -= dt.rows;
  }

  onNextPage(dt: any) {
    dt.first += dt.rows;
  }

  ClosePopUp(){
    this.isShowEditPopup = false;
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  onDoctorMaster() {
    let data = {};
    this.isLoaded = true;
    this.http.postnew(this.url.GETMASTERLISTFORDOCTOR, data).then(
      (res: any) => {
        this.isLoaded = false;
        this.DOCTOR_LIST=res.DOCTOR_LIST
        this.Specialization_list = res.SPECIALIZATION_LIST;
        this.HQ_codes_list = res.HQ_LIST;
        this.totalRecords = this.DOCTOR_LIST.length;
      },
      (error) => {
        this.isLoaded = false;

        console.log(error);
        this.toastrService.error('Oops, Something went wrong.');
        // this.isLoaded = false;
      }
    );
  }

  onDownlodTemplate() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.Template_Headers);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'Doctor Master');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
  clearing_rest(){
    this.DOCTOR_NAME=""
    this.DOCTOR_CODE=""
    this.DOCTOR_QUALIFICATION=""
    this.MDL_NUMBER=""
    this.DOCTOR_SPECIALIZATION=""
    this.HQ_CODE="";
    this.convertedJson = [];
    this.Excel = 0;
    this.Enabler();
    this.UPLOAD="";

  }

  validateDoctorData(){
    

    if(this.Excel == 0){
      
      if (this.HQ_CODE == undefined || this.HQ_CODE == '') {
        this.toastrService.error('Please Select HQ code');
        return;
      }
      if (this.DOCTOR_CODE == undefined || this.DOCTOR_CODE == '') {
        this.toastrService.error('Doctor Code is required');
        return;
      }
      if (this.DOCTOR_NAME == undefined || this.DOCTOR_NAME == '') {
        this.toastrService.error('Doctor Name is required');
        return;
      }
      if (this.DOCTOR_SPECIALIZATION == undefined || this.DOCTOR_SPECIALIZATION == '') { 
        this.toastrService.error('Doctor Specialization is required');
        return;
      }
      if (this.DOCTOR_QUALIFICATION == undefined || this.DOCTOR_QUALIFICATION == '') { 
        this.toastrService.error('Doctor Qualification is required');
        return;
      }
      if (this.MDL_NUMBER == undefined || this.MDL_NUMBER == '') {
        this.toastrService.error('MDL No. is required');
        return;
      }
      
      this.convertedJson = 
      [{
        DOCTOR_NAME: this.DOCTOR_NAME,
        DOCTOR_CODE: this.DOCTOR_CODE,
        QUALIFICATION: this.DOCTOR_QUALIFICATION,
        MDL_NUMBER: this.MDL_NUMBER,
        SPL_NAME: this.DOCTOR_SPECIALIZATION,
        HQ_CODE: this.HQ_CODE
      }]
      this.uploadDoctorData();
    }

    if(this.Excel == 1){
      for(let i =0;i<this.convertedJson.length;i++){
        if(this.convertedJson[i].HQ_CODE == undefined || this.convertedJson[i].HQ_CODE == null){
          this.convertedJson[i].HQ_CODE = '';
        }
          if(this.convertedJson[i].Customer_Code == undefined || this.convertedJson[i].Customer_Code == null){
            this.convertedJson[i].Customer_Code = '';
          }
          if(this.convertedJson[i].Doctor_Name == undefined || this.convertedJson[i].Doctor_Name == null){
            this.convertedJson[i].Doctor_Name = '';
          }
          if(this.convertedJson[i].spl_name == undefined || this.convertedJson[i].spl_name == null){
            this.convertedJson[i].spl_name = '';
          }
          if(this.convertedJson[i].Qualification == undefined || this.convertedJson[i].Qualification == null){
            this.convertedJson[i].Qualification = '';
          }
         
      }
      this.uploadDoctorData();

    }

    
  }

  formValidate() {
    if (this.HQ_CODE != undefined && this.HQ_CODE!="") {
      if (this.UPLOAD != undefined  ) {
        this.Flag=0;
        this.template_checking();
        this.uploadDoctorData();
      }
      else {
        if (this.DOCTOR_NAME == undefined || this.DOCTOR_NAME == '') {
          this.toastrService.error('Please Fill out  Doctor Name ');
          this.Flag=1;
          return;
        }
        if (this.DOCTOR_CODE == undefined || this.DOCTOR_CODE == '') {
          this.toastrService.error('Please Fill out  DOCTOR_CODE');
          this.Flag=1;
          return;
        }
        if (this.DOCTOR_QUALIFICATION == undefined || this.DOCTOR_QUALIFICATION == '')
        {
          this.toastrService.error('Please Fill out DOCTOR_QUALIFICATION ');
          this.Flag=1;
          return;
        }
        if (
          this.DOCTOR_SPECIALIZATION == undefined ||
          this.DOCTOR_SPECIALIZATION == '')
        {  this.Flag=1;
          this.toastrService.error('Please Fill out all DOCTOR_SPECIALIZATION ');
          return;
        }
        if (this.MDL_NUMBER == undefined || this.MDL_NUMBER == '') {
          this.toastrService.error('Please Fill out all MDL_NUMBER ');
          this.Flag=1;
          return;
        }
        else {
          this.convertedJson=[{DOCTOR_NAME: this.DOCTOR_NAME,
            DOCTOR_CODE: this.DOCTOR_CODE,
            QUALIFICATION: this.DOCTOR_QUALIFICATION,
            MDL_NUMBER: this.MDL_NUMBER,
            SPL_NAME: this.DOCTOR_SPECIALIZATION,
            HQ_CODE: this.HQ_CODE,}]
            this.uploadDoctorData();
            this.Flag=0;

        }
      }
    } else {
      this.toastrService.error('Please Select HQ code ');
      this.Flag = 1;
      return;

    }
  }
  template_checking() {
    this.Flag = 0;
    this.Tags = Object.values(this.convertedJson);
    this.Keys = Object.keys(this.convertedJson[0]);
    if(this.HQ_CODE != undefined) {
      for (let i = 0; i < Object.values(this.convertedJson[0]).length; i++) {
        if (this.Keys[i] != Object.keys(this.Template_Headers[0])[i]) {
          this.toastrService.error('Please Use Provided Template');
          this.Flag = 1;
          break;
        }
        if (Object.values(this.Tags[0])[i]== '' || Object.values(this.Tags[0])[i] == undefined) {
          this.toastrService.error('Please Fill out 1st row of Template');
          this.Flag = 1;
          break;
        }
      }
      for (let t = 1; t < this.convertedJson.length; t++) {
        if (Object.values(this.Tags[t]).length != 5) {
          this.toastrService.error('Please Fill out Entire Template');
          this.Flag = 1;
          break;
        }
      }


    } else {
      this.toastrService.error('Please Select HQ code ');
      this.Flag = 1;
    }
  }
  uploadDoctorData() {
    this.userInfo = this.authService.getUserDetail();

    let data = {
      DOC_LIST: this.convertedJson,
      USER_ID: JSON.parse(this.userInfo).USER_ID,
      IS_CHECK: this.Excel,
    };
    console.log(JSON.stringify(data),"dat")
    // return;
    this.http.postnew(this.url.SAVEDOCTORMASTERDATA, data).then(
      (res: any) => {
        this.isLoaded = false;
        try {
          if (res.data[0].FLAG == true) {
            this.toastrService.success(res.data[0].MSG);
            this.clearing_rest()
          }
        } catch {
          this.toastrService.error("Data Wasn't Saved");
        }
      },
      (error) => {
        console.log(error);
        this.toastrService.error('Oops, Something went wrong.');
        // this.isLoaded = false;
      }
    );

  }

 disabler(){
    this.enabler=false;
    this.UPLOAD=undefined;
  }
  Enabler(){
    this.enabler=true;
  }
  onEditListClick(){
    this.isShowEditPopup = true;
    this.isShowdropdown=true;
   }

  onSaveDoctorMaster() {
    this.formValidate();
    this.onDoctorMaster();
    this.Enabler();
  }

  OnCancelClick() {
     this.isShowEditPopup = false;
     this.isShowdropdown=false;
     this.Enabler();
  }

  selectFile(event: any) {

    this.Excel = 0;
    if (event.files.length > 0) {
      this.Excel = 1;
      this.isLoaded = true;
      this.exceltojson(event);
    }

    if(this.Excel == 0){
      this.convertedJson = [];
      this.clearing_rest();
    }
  }
  onAreaSelected(rowData:any){
    this.DOCTOR_CODE = rowData.DOCTOR_CODE;
    this.DOCTOR_QUALIFICATION = rowData.QUALIFICATION;
    this.DOCTOR_NAME = rowData.DOCTOR_NAME;
    this.DOCTOR_SPECIALIZATION = rowData.SPL_DESCRIPTION;
    this.HQ_CODE=rowData.HQ_CODE
    this.MDL_NUMBER=rowData.MDL_NUMBER
    this.isShowEditPopup = false;
    this.isShowdropdown=false;
    this.disabler();

    // this.parentRoleId = rowData.parent_role;
    // this.underId = rowData.parent_code;
  }

  public exceltojson(event: any) {
    const selectedfile = event.files[0];
    this.inputfileltext = event.files[0].name;
    this.UPLOAD = event.files[0].name;

    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedfile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      // workbook.SheetNames.forEach((sheet) => {
      //   const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
      //   this.convertedJson = data;
      //   console.log(this.convertedJson,"data=convert")
      //  // this.template_checking();
      // });

      // workbook.SheetNames.forEach((sheet) => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets['data']);
        this.convertedJson = data;
        console.log(this.convertedJson,"data=convert")
        this.isLoaded = false;

       // this.template_checking();
      // });
    };
  }

}
