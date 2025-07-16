
import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { LoginComponent } from 'src/app/Common/login/login.component';
import { ApiService } from 'src/app/Service/api.service';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';


@Component({
  selector: 'app-moetargetreport',
  templateUrl: './moetargetreport.component.html',
  styleUrls: ['./moetargetreport.component.css']
})
export class MoetargetreportComponent implements OnInit {
  period:any;
  userInfo:any = {};
  periodList:any = [];
  moeHeaderList:any = [];
  moeDetailList:any = [];
  Values:any = [];
  Headers:any = [];
  currDate:any = new Date();
  periodForDetails:any
  detailListToDownload:any ;
  //isExpanded: boolean = false;
  expandedNodes: { [key: string]: boolean } = {};
  flag:boolean=false;
  PROGRESSflag:boolean=false;
  STATUS:any
  PROGRESS: number=0;
  IS_PROCESS:boolean=false;
  PeriodHeading: any='';
  instru='(Please click on refresh button to track processing *)'
  instruFlag: boolean;
  track:boolean=false
  private intervalId: any;
  isLoaded:boolean= false;
  headingForcomplete: any;
  FROM_DATE:Date=new Date();
  filename: any;
  file: any="MOE_TARGET_DOCS";
  constructor(private AuthService:AuthService,private url:URLService,private http:HttpService,private toastrService:ToastrService,private fileDownloadService: ApiService) { }

  ngOnInit(): void {
    this.getPeriodListData();
  //  this.getStatus();
    //this.startStatusCheck();
    
  }

  ngOnDestroy() {
    this.stopStatusCheck(); // Clear the interval when component is destroyed
  }

  getPeriodListData(){
    this.userInfo = this.AuthService.getUserDetail();
    let data={
      USER_ID : JSON.parse(this.userInfo).USER_ID,
    }

    this.http.postnew(this.url.getSalesReportList, data).then(
      (res:any)=>{
        this.periodList = res.periodlist;
      //console.log('periodList',this.periodList);
     
      },
      error =>{
        //console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  generatePDFdata() {
    this.isLoaded=true;
    this.PROGRESSflag=false;
    this.userInfo = this.AuthService.getUserDetail();
    let data={ 
      "USER_ID" : JSON.parse(this.userInfo).USER_ID,
      "PERIOD_ID":this.period
    }
    console.log('data generatePDFdata',data);

  // this.startStatusCheck();
//   return;
   // this.toastrService.success("Pdf Generation Started");
    this.http.postnew(this.url.getMoeTargetReport, data).then(
      (res:any)=>{
        
        if(res.data.FLAG){
          console.log('data');
          
          this.toastrService.success(res.data.FLAG);
          this.isLoaded=false;
         // this.getStatus();
         this.getMoeMergeReport()
   
        }else{
          this.isLoaded=false;
          this.toastrService.error(res.data.MSG);
        }
       // this.toastrService.success("Pdf Generation Completed"); 

       
      },
      error =>{
      //console.log(error);
        this.isLoaded=false;
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  UploadPdf(){
    this.userInfo = this.AuthService.getUserDetail();

    for(let i = 0; i < this.moeHeaderList.length; i++){
        let data={
          "USER_ID": this.userInfo.USER_ID,
          "PERIOD_ID":37,
          "AREA_CODE":"ANBRM004",
          "AREA_DESC":"BIHARSHARIFF",
          "NAME":"RAMPRAVESH KUMAR",
          "PERIOD_DESC":"Apr-2024",
          "TO_DATE":"2024-04-30",
          "FROM_DATE":"2024-04-01",
          "EXPRATIO":"0.00",
          "CUMMEXPRATIO":"0.00",
          "FILE_NAME":"ANBRM004202401.PDF"
        }

    }


    let data={
      "USER_ID": "569",
      "PERIOD_ID":37,
      "AREA_CODE":"ANBRM004",
      "AREA_DESC":"BIHARSHARIFF",
      "NAME":"RAMPRAVESH KUMAR",
      "PERIOD_DESC":"Apr-2024",
      "TO_DATE":"2024-04-30",
      "FROM_DATE":"2024-04-01",
      "EXPRATIO":"0.00",
      "CUMMEXPRATIO":"0.00",
      "FILE_NAME":"ANBRM004202401.PDF"
    }
    this.http.postnew(this.url.GENERATEPDF, data).then(
      (res:any)=>{
        
     
       
    
       
      },
      error =>{
    //    console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  showDetails(){
    let data={
      "PATH":this.periodForDetails
    }

    // this.http.postnew(this.url.getfolder, data).then(
      
    //   (res:any)=>{
    //    // console.log('res moe reports',res);
    //     this.detailListToDownload=res;
    //     this.flag=true
    //   },
    //   error =>{
    //   //  console.log(error);
    //     this.toastrService.error( this.periodForDetails+" folder not found");
    //     this.flag=false;
    //     this.detailListToDownload=[]
    //   }
    // );
   // this.downloadAndDecryptZip(this.periodForDetails)
  }
  async downloadAndDecryptZip(folderPath: string) {
   await this.getFileName()
     let data = {
      "PATH": "MOE_TARGET_DOCS",
      "FOLDER":"MOE_TARGET_DOCS",
      "PERIOD_ID":this.periodForDetails
    };
  
    //this.isLoaded = true;
    console.log('dta',data);
   
  //return 
   await this.fileDownloadService.downloadZip(this.file, data).pipe(await
      catchError((error) => {
        // Handle error
        this.isLoaded = false;
        this.toastrService.error('Error downloading file for ' + this.file);
        console.error('Download failed for', folderPath, error); // You can log the error to the console for debugging
        return of(null); // Return a safe observable so that the stream continues
      })
    ).subscribe((blob) => {
      if (blob) {
        this.decryptAndSaveFile(blob, this.file + ".zip");
       this.toastrService.success("Downloaded successfully for " + this.file);
     }
      this.isLoaded = false;
    });
  }
  private async decryptAndSaveFile(encryptedBlob: Blob, fileName: string) {
    try {
      // Example decryption function - replace with your decryption logic
      const decryptedBlob = await this.decryptBlob(encryptedBlob);
      const url = window.URL.createObjectURL(decryptedBlob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = fileName;
      anchor.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Decryption failed', error);
    }
  }

  private async decryptBlob(blob: Blob): Promise<Blob> {
    // Implement your decryption logic here.
    // This is a placeholder for example purposes.
    return blob; // Replace with actual decryption logic
  }
async folder(){
    if(this.periodForDetails==undefined){
      this.toastrService.error("Please select Period");
    }else{
      console.log('inside else');

     await this.getFileName()
  
      await this.downloadAndDecryptZip(this.periodForDetails)
    }
   // console.log('this.periodForDetails',this.periodForDetails);
    
  }

   subFolder(val:any){
    let data=this.periodForDetails+"\\"+val.Name;
  let data1={
    "PERIOD_ID":this.periodForDetails
  }
    //console.log(data);
   //  this.getFileName()
     this.downloadAndDecryptZip(data)

  }
    async getFileName() {
    let data={
      "PERIOD_ID":this.periodForDetails
    }
    console.log('data 1',data);

   await this.http.postnew(this.url.getFileName, data).then(
     
     (res:any)=>{
      console.log('hemant',res);
       if(res !=null){

         this.file=res.File[0].PERIOD_DESC;
       }
    
     },
     error =>{
   
       this.toastrService.error( this.periodForDetails+" folder not found");
     
     }
     
   );
    
   }
 

  getStatus() {
   // this.userInfo = this.AuthService.getUserDetail();
    //let data={}
   // this.toastrService.success("Pdf Generation Started");
 
   //this.PeriodHeading=this.period
  this.http.postnew(this.url.getStatus, {}).then(
    
    (res:any)=>{
   //  console.log('werftgyhujiofghjkl;',res);
      
     this.STATUS=res.STATUS
     this.IS_PROCESS=this.STATUS[0].IS_PROCESS;
     this.track=this.STATUS[0].IS_PROCESS;
     if(this.track == true){
     // console.log('INSIDE IF');
  //   this.headingForcomplete=this.STATUS[0].PERIOD_DESC
      this.PeriodHeading="Processing started for period"+" "+this.STATUS[0].PERIOD_DESC
      this.startStatusCheck();
      //this.headingForcomplete=this.PeriodHeading
     }
     else if(!this.track){
     // console.log('INSIDE ELSE');
     //this.PeriodHeading=this.headingForcomplete
      this.PeriodHeading="Generated Succesfully for period"+" "+this.STATUS[0].PERIOD_DESC
     }
    
    //  if(this.IS_PROCESS==true){
    //   this.instruFlag=true;
    // }else{
    //   this.instruFlag= false
    // }
    // console.log('IS_PROCESS',this.IS_PROCESS);
     //this.PeriodHeading="Processing for period"+" "+this.STATUS[0].PERIOD_DESC 
     this.calculateProgress()
    },
    error =>{
   //   console.log(error);
      this.toastrService.error( this.periodForDetails+" folder not found");
     // this.ProgressFlag=false;
     // this.detailListToDownload=[]
    }
    
  );
   
  }

  calculateProgress(){
  //  console.log(' this.STATUS', this.STATUS,this.STATUS[0].GENERATED_COUNT,this.STATUS[0].TOTAL_PDF_COUNT);
    
    let GENERATED_COUNT=this.STATUS[0].GENERATED_COUNT;
    let TOTAL_PDF_COUNT=this.STATUS[0].TOTAL_PDF_COUNT;
    // let GENERATED_COUNT=1;
    // let TOTAL_PDF_COUNT=2;
     if(GENERATED_COUNT!=0 && TOTAL_PDF_COUNT!=0 ){
      this.IS_PROCESS=this.STATUS[0].IS_PROCESS;
       this.PROGRESS=(GENERATED_COUNT/TOTAL_PDF_COUNT)*100;

    //   console.log('this.PROGRESS 1 ',this.PROGRESS);
       
       this.PROGRESS=+(this.PROGRESS).toFixed()
     //  console.log('this.PROGRESS 2 ',this.PROGRESS);
     }else{
      this.PROGRESS=0;
     }

 // console.log(' this.PROGRESS', this.PROGRESS);
  

  }
  startStatusCheck() {
  //  console.log('this.IS_PROCESS',this.track);
    
    if(this.track==true){
     
      
      this.intervalId=setTimeout(() => {
     //   window.location.href ="/klikfmdev/login"
        // eventEmitter.emit('navigate', PATH.LOGIN);
      //  this.getStatus()
      }, 5000);
     // this.intervalId();
  //    console.log('inside this', this.intervalId);
    }
  }
  stopStatusCheck() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  }

  getMoeMergeReport() {
  //  console.log('inside getMoeMergeReport');
    
    this.PROGRESSflag=false;
    this.userInfo = this.AuthService.getUserDetail();
    let data={
      "USER_ID" : JSON.parse(this.userInfo).USER_ID,
      "PERIOD_ID":this.period
    }
    console.log('data',data);

   // this.startStatusCheck();
   //   return;
   // this.toastrService.success("Pdf Generation Started");
    this.http.postnew(this.url.GETMOETARGETMERGEDREPORT, data).then(
      (res:any)=>{
        //  this.PeriodHeading="Generated Succesfully for period"+" "+this.PeriodHeading
        // console.log("res getMoeMergeReport",res);
        
          this.toastrService.success('Done');

         // this.getStatus();
      
        //  this.toastrService.error(res.data.MSG);
       // this.toastrService.success("Pdf Generation Completed");
      },
      error =>{
      //console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  select(){
    console.log("periodForDetails",this.periodForDetails);
    
  }
}

