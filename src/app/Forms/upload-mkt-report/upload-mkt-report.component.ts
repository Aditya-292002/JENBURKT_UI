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
  selector: 'app-upload-mkt-report',
  templateUrl: './upload-mkt-report.component.html',
  styleUrls: ['./upload-mkt-report.component.css']
})
export class UploadMktReportComponent implements OnInit {
  uploadDocument:any
  isHighLightDocument:string = "No";
  isHighLightPeriod:string = "No";
  isHighLightUploadDocument:string = "No";
  validExtensions = ['xlsx','XLSX','xlsm','xlam'];
  exceldata:any = [];
  errorext: boolean;
  uploadFile: string;
  errorsize: boolean;
  selectedFile: any;
  editmode: boolean;
  isFileChanged_cw: boolean;
  periodList: any[];
  period:any
  selectedValue: string = 'Overwrite';
  data:any;
  TYPE:any;
  userData: any;
  userid: any;

  constructor(private router: Router,private SharedService: SharedService ,private AuthService: AuthService,
    private ToastrService: ToastrService,private url: URLService,private http: HttpService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.periodList=[{"PERIOD_DESC":'rrr'},{"PERIOD_DESC":'uu'}]
    this.data = [
      { ITEM_CODE: '', HQ: "", TGT_MOERT: '', TGT_YEAR: "",
        APR_QTY:"",APR_PERC:"",
        MAY_QTY:"",MAY_PERC:"",
        JUN_QTY:"",JUN_PERC:"",
        JUL_QTY:"",JUL_PERC:"",
        AUG_QTY:"",AUG_PERC:"",
        SEP_QTY:"",SEP_PERC:"",
        OCT_QTY:"",OCT_PERC:"",
        NOV_QTY:"",NOV_PERC:"",
        DEC_QTY:"",DEC_PERC:"",
        JAN_QTY:"",JAN_PERC:"",
        FEB_QTY:"",FEB_PERC:"",
        MAR_QTY:"",MAR_PERC:"",
       },
     
    ];
    

    this.userData = this.AuthService.getUserDetail();
    this.userid=JSON.parse(this.userData).USER_ID;
    this.getTargetyear()
  }
  
  onChangeUploadDocument(files:any){
    console.log(files)
    this.exceldata = [];
    this.exceltojson(files);
    this.selectDocument(files.target.files[0]);
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
  selectDocument(event: any){
    this.errorsize = false;
    this.errorext = false;

    // if ((event.size / 1024 / 1024) > this.validFileSize) {
    //   this.errorsize = true;
    //   this.uploadFile = "";
    //   this.uploadDocument = "";
    //   this.ToastrService.warning('Please select file size less than 2 MB.');
    //   return;
    // }
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

  exportToExcel(): void {
    // Step 1: Create a worksheet from your data
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);

    // Step 2: Create a new workbook and add the worksheet to it
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Step 3: Export and download the Excel file
    XLSX.writeFile(wb, 'MKTGtemplate.xlsx');
  }

  getTargetyear(){
    let data={
      "USER_ID":this.userid
    }
    console.log('inside getTargetyear');
    
    this.http.postnew(this.url.getTargetList, data).then(
      (res:any)=>{
       // this.isLoaded= false;
        console.log("getTargetyear data",res);
        this.periodList=res.v_TARGET_YEAR_List;
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
        // this.isLoaded = false;
      }
    );
  }

  OnSaveUpdateClick(){
   
  // if(this.selectedValue=="Overwrite"){
  //   this.TYPE=1;
  // }else{
  //   this.TYPE=2;
  // }
   let data={
    "USER_ID":this.userid,
    "TARGET_YEAR":this.period.FYEAR,  
   // "TYPE":this.TYPE,
    "MKG_REPORT":this.exceldata 
   }
   console.log('MKG data',data);
   
   this.http.postnew(this.url.saveUploadMktReport, data).then(
    (res:any)=>{
     // this.isLoaded= false;
      console.log("OnSaveUpdateClick data",res);
     // this.periodList=res.v_TARGET_YEAR_List;
    },
    error =>{
      console.log(error);
      this.ToastrService.error("Oops, Something went wrong.");
      // this.isLoaded = false;
    }
  );
   }
}
