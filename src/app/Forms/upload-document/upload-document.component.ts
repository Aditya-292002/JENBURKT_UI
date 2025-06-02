import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { ToastrService } from 'ngx-toastr';
import { URLService } from 'src/app/Service/url.service';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {
  documentTypeList:any=[];
  periodList:any=[];
  documentType:any;
  period:any;
  uploadDocument:any="";
  userInfo:any={};
  errorsize: boolean = false;
  errorext: boolean = false;
  isLoaded:boolean=false;
  // selectedFileName: string = "";
  selectedFile: File | undefined;
  isFileChanged_cw: boolean = false;
  editmode: boolean = false;
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';
  exceldata:any = [];
  uploadFile: string = "";
  isHighLightDocument:string = "No";
  isHighLightPeriod:string = "No";
  isHighLightUploadDocument:string = "No";
  validExtensions = ['xlsx','XLSX','xlsm','xlam'];
  validFileSize = 2;
  // inputTextFile:any = "";
  constructor(private router: Router,private SharedService: SharedService,private AuthService: AuthService,
    private ToastrService: ToastrService,private url: URLService,private http: HttpService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.GetUploadDocumentMasterList();
  }
  GetUploadDocumentMasterList() {
    this.userInfo = this.AuthService.getUserDetail();
    let data={}
    this.isLoaded = true;
    this.http.postnew(this.url.getUploadDocumentMasterList, data).then(
      (res:any)=>{
        this.isLoaded= false;
        console.log("data",res);
        this.documentTypeList = res.DOCUMENTTYPELIST;
        this.periodList = res.PEROIDLIST;
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
        // this.isLoaded = false;
      }
    );
  }
  getMimeType(ext) {
    var extToMimes = {
      // 'jpeg': 'image/jpeg',
      // 'jpg': 'image/jpeg',
      // 'png': 'image/png',
      // 'gif': 'image/gif',
      // 'tiff': 'image/tiff',
      // 'svg': 'image/svg+xml',
      // 'doc': 'application/msword',
      // 'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      // 'rtf': 'application/rtf',
      // 'odt': 'application/vnd.oasis.opendocument.text',
      // 'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      // 'csv': 'text/csv',
      // 'ods': 'application/vnd.oasis.opendocument.spreadsheet',
      // 'pdf': 'application/pdf',
      // 'txt': 'text/plain',
      // 'ppt': 'application/vnd.ms-powerpoint',
      // 'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      // 'xlsm' : 'application/vnd.ms-excel.sheet.macroEnabled.12'
    }


    if (extToMimes.hasOwnProperty(ext)) {
      return extToMimes[ext];
    }
    return false;

  }
  onChangeUploadDocument(files:any){
    console.log(files)
    this.exceldata = [];
    this.exceltojson(files);
    this.selectDocument(files.target.files[0]);

  }
  selectDocument(event: any){
    this.errorsize = false;
    this.errorext = false;

    if ((event.size / 1024 / 1024) > this.validFileSize) {
      this.errorsize = true;
      this.uploadFile = "";
      this.uploadDocument = "";
      this.ToastrService.warning('Please select file size less than 2 MB.');
      return;
    }
    var fileNameArr = event.name.split('.');
    var extension = fileNameArr[fileNameArr.length - 1];

    // If no valid file extension is found then return an error
    if (this.validExtensions.indexOf(extension.toString().toLowerCase()) === -1) {
      this.errorext = true;
      this.uploadFile = "";
      this.uploadDocument = "";
      this.ToastrService.warning('Please select file with a valid extension');
      return;
    }
    this.selectedFile = event;
    // this.selectedFileName = "cw_file" + event.name;
    this.uploadDocument = event.name;
    if (this.editmode == true) {
      this.isFileChanged_cw = true;
    }
  }
  OnSaveUploadClick(){
    this.isHighLightDocument = "No";
    this.isHighLightPeriod = "No";
    this.isHighLightUploadDocument = "No";
    if(this.documentType =="" || this.documentType == undefined){
      this.isHighLightDocument = "Yes";
      this.ToastrService.error("Please select a value in Document Code.");
      return;
    }else{
      this.isHighLightDocument = "No";
    }
    if(this.period =="" || this.period == undefined){
      this.isHighLightPeriod = "Yes";
      this.ToastrService.error("Please select a value in Period.");
      return;
    }else{
      this.isHighLightPeriod = "No";
    }
    if(this.uploadDocument =="" || this.uploadDocument == undefined){
      this.isHighLightUploadDocument = "Yes";
      this.ToastrService.error("Please select a file to upload.");
      return;
    }else{
      this.isHighLightUploadDocument = "No";
    }

    if(this.isHighLightDocument != "Yes" && this.isHighLightPeriod != "Yes" && this.isHighLightUploadDocument != "Yes"){
      this.SaveUploadDocument();
    }

  }
  SaveUploadDocument() {
    let UserInfo = this.AuthService.getUserInfo();
    let data = {
      DOCUMENT_CODE: this.documentType.DOCUMENT_CODE,
      PERIOD_ID: this.period.PERIOD_ID,
      FILENAME: (this.uploadDocument == undefined ? "" : this.uploadDocument),
      FILEDATA: (this.exceldata == undefined ? "" : this.exceldata),
      // FILEDATA: "",
    }

    this.isLoaded = true;

    this.http.postnew(this.url.saveUploadDocument, data).then(
      (res:any)=>{
        this.isLoaded = false;
        if (res.data[0].FLAG) {
          this.ToastrService.success(res.data[0].MSG);
          this.clearFormData();
        }
        else {
          this.ToastrService.warning("Oops, Something went wrong while saving.");
        }
      },
      error =>{
        this.isLoaded = false;
      }
    );
  }
  clearFormData(){
    this.documentType = "";
    this.period = "";
    this.uploadDocument = "";
    this.exceldata = [];
    // this.inputTextFile = "";
  }
  public exceltojson(event: any) {
    const selectedfile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedfile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result
      let workbook = XLSX.read(binaryData, { type: 'binary' })
      workbook.SheetNames.forEach((sheet,index:any) => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        for(let i=0;i<data.length;i++){
          this.exceldata[i] = data[i];
        }
        return;
      });
    }
  }

  filterDocumentType:any=[];
  filteredDocumentType(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.documentTypeList.length; i++) {
      let documentTypeList = this.documentTypeList[i];
      if (documentTypeList.DOCUMENT_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(documentTypeList);
      }
    }

    this.filterDocumentType = filtered;
  }

  setDocumentType(fileterlist, code: any) {
    code = "";
      this.filterDocumentType.forEach((element: any, index: number) => {
        if (element.DOCUMENT_NAME != this.documentTypeList[0].DOCUMENT_NAME && this.documentTypeList[0].DOCUMENT_NAME == undefined) {
          if (index == 0) {
            code = element;
            this.documentTypeList = code;
            this.filterDocumentType = [];
          }
          else {
            this.documentTypeList = element;
            return;
          }
        }
      });
  }

  filterPeriod:any=[];
  filteredPeriod(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.periodList.length; i++) {
      let periodList = this.periodList[i];
      if (periodList.PERIOD_DESC.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(periodList);
      }
    }

    this.filterPeriod = filtered;
  }

  setPeriod(fileterlist, code: any) {
    code = "";
      this.filterPeriod.forEach((element: any, index: number) => {
        if (element.PERIOD_DESC != this.periodList[0].PERIOD_DESC && this.periodList[0].PERIOD_DESC == undefined) {
          if (index == 0) {
            code = element;
            this.periodList = code;
            this.filterPeriod = [];
          }
          else {
            this.periodList = element;
            return;
          }
        }
      });
  }
  inputfilelength:any;
  // fileCount() {
  //   this.inputfilelength = 0;
  //   this.fileList.forEach((element: any) => {

  //     if (element.deleted == false) {
  //       this.inputfilelength = this.inputfilelength + 1;
  //     }
  //   });

  // }

}
