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
  selector: 'app-chemist-master',
  templateUrl: './chemist-master.component.html',
  styleUrls: ['./chemist-master.component.css'],
})
export class ChemistMasterComponent implements OnInit {
  HQ_CODE: any;
  CHEMIST_CODE: any;
  CHEMIST_NAME: any;

  isShowEditPopup: boolean = false;

  convertedJson: any = [];
  HQ_codes_list: any[];
  userInfo: any;
  CHEMIST_LIST: any[];
  Excel: number = 0;
  Tags: string[];
  Keys: string[];
  Flag: number = 0;
  first: number = 0;
  rows: number = 10;
  totalRecords: any = 0;
  enabler: boolean = true;
  isShowdropdown: boolean = false;

  inputfileltext: any = '';

  isDisabled: boolean = false;

  UPLOAD: any;
  isAddChemistMaster: boolean;
  isLoaded: boolean = false;
  paginator: Paginator;

  constructor(
    private authService: AuthService,
    private url: URLService,
    private http: HttpService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.onChemistMaster();
  }

  onPrevPage(dt: any) {
    dt.first -= dt.rows;
  }

  onNextPage(dt: any) {
    dt.first += dt.rows;
  }

  ClosePopUp() {
    this.isShowEditPopup = false;
  }

  onPageChange(event: any) {
    console.log(event.first, event.rows);
    this.first = event.first;
    this.rows = event.rows;
  }

  onChemistMaster() {
    let data = {};
    this.isLoaded = true;
    this.http.postnew(this.url.GETMASTERCHEMISTLIST, data).then(
      (res: any) => {
        this.isLoaded = false;
        this.CHEMIST_LIST = res.CHEMIST_LIST;
        this.CHEMIST_NAME = res.CHEMIST_NAME;

        this.HQ_codes_list = res.HQ_LIST;
        this.totalRecords = this.CHEMIST_LIST.length;
      },
      (error) => {
        this.isLoaded = false;

        console.log(error);
        this.toastrService.error('Oops, Something went wrong.');
      }
    );
  }

  clearing_rest() {
    this.CHEMIST_NAME = '';
    this.CHEMIST_CODE = '';
    this.HQ_CODE = '';
    this.isDisabled = false;
  }
  validateChemistData(){
    

    if(this.Excel == 0){
      
      if (this.HQ_CODE == undefined || this.HQ_CODE == '') {
        this.toastrService.error('Please Select HQ code');
        return;
      }
      if (this.CHEMIST_NAME == undefined || this.CHEMIST_NAME == '') {
        this.toastrService.error('Chemist Name is required');
        return;
      }
      if (this.CHEMIST_CODE == undefined || this.CHEMIST_CODE == '') {
        this.toastrService.error('Chemist Code is required');
        return;
      }
    
      
      this.convertedJson = 
      [{
        CHEMIST_NAME: this.CHEMIST_NAME,
        CHEMIST_CODE: this.CHEMIST_CODE,
        HQ_CODE: this.HQ_CODE
      }]
      this.uploadChemistData();
    }

    if(this.Excel == 1){
      for(let i =0;i<this.convertedJson.length;i++){
        if(this.convertedJson[i].HQ_CODE == undefined || this.convertedJson[i].HQ_CODE == null){
          this.convertedJson[i].HQ_CODE = '';
        }
          if(this.convertedJson[i]['Chemist Code'] == undefined || this.convertedJson[i]['Chemist Code'] == null){
            this.convertedJson[i]['Chemist Code'] = '';
          }
          if(this.convertedJson[i]['Chemist Name'] == undefined || this.convertedJson[i]['Chemist Name'] == null){
            this.convertedJson[i]['Chemist Name'] = '';
          }
      
         
      }
      this.uploadChemistData();

    }

    
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
        const data = XLSX.utils.sheet_to_json(workbook.Sheets['CHEMIST']);


       this.convertedJson = data;
        
        console.log( this.convertedJson,"data=convert")

   

   
        this.isLoaded = false;

       // this.template_checking();
      // });
    };
  }
  formValidate() {
    console.log(this.UPLOAD, 'upload');

    if (this.HQ_CODE == undefined || this.HQ_CODE == '') {
      this.toastrService.error('Please Fill out HQ_CODE ');
      return;
    }

    if (this.CHEMIST_NAME == undefined || this.CHEMIST_NAME == '') {
      this.toastrService.error('Please Fill out  Chemist Name ');
      return;
    }
    if (this.CHEMIST_CODE == undefined || this.CHEMIST_CODE == '') {
      this.toastrService.error('Please Fill out  Chemist CODE');
      return;
    }

    this.uploadChemistData();
  }
  uploadChemistData() {
    this.userInfo = this.authService.getUserDetail();

    let data = {
      DOC_LIST: this.convertedJson,
      USER_ID: JSON.parse(this.userInfo).USER_ID,
      IS_CHECK: this.Excel,
    };
    console.log(JSON.stringify(data),"dat")
 
    this.http.postnew(this.url.SAVECHEMISTMASTERDATAWEB, data).then(
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

  // uploadChemistData() {
  //   this.userInfo = this.authService.getUserDetail();
  //   if (this.Flag == 1) {
  //     this.toastrService.error('Please enter correct Data.');
  //     return;
  //   }

  //   let data = {
  //     CHEMIST_CODE: this.CHEMIST_CODE,
  //     CHEMIST_NAME: this.CHEMIST_NAME,
  //     HQ_CODE: this.HQ_CODE,
  //     USER_ID: JSON.parse(this.userInfo).USER_ID,
  //   };
  //   this.http
  //     .postnew(this.url.SAVECHEMISTMASTERDATAWEB, data)
  //     .then((res: any) => {
  //       this.isLoaded = false;
  //       try {
  //         if (res.data[0].FLAG == true) {
  //           this.toastrService.success(res.data[0].MSG);
  //           this.clearing_rest();
  //           this.onChemistMaster();
  //         }
  //       } catch {
  //         this.toastrService.error("Data Wasn't Saved");
  //       }
  //     });
  // }

  disabler() {
    this.enabler = false;
    this.UPLOAD = undefined;
  }
  Enabler() {
    this.enabler = true;
    console.log(this.enabler, 'Enabler');
  }
  onEditListClick() {
    this.isShowEditPopup = true;
    this.isShowdropdown = true;
  }

  OnCancelClick() {
    this.isShowEditPopup = false;
    this.isShowdropdown = false;

    this.Enabler();
  }

  onAreaSelected(rowData: any) {
    console.log(rowData, 'rowData');
    this.CHEMIST_CODE = rowData.CHEMIST_CODE;
    this.CHEMIST_NAME = rowData.CHEMIST_NAME;
    this.HQ_CODE = rowData.HQ_CODE;
    this.isShowEditPopup = false;
    this.isShowdropdown = false;
    this.isDisabled = true;
  }
}
