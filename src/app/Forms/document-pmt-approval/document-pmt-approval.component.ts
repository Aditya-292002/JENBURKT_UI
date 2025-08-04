import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-document-pmt-approval',
  templateUrl: './document-pmt-approval.component.html',
  styleUrls: ['./document-pmt-approval.component.css']
})
export class DocumentPmtApprovalComponent implements OnInit {
  isHighLightUnit:string="No";
  isHighLightCycle:string="No";
  isLoaded:boolean=false;
  userInfo:any
  CME_LIST:any=[]
  USER_LIST:any=[]
  CME_CODE:any;
  SUBMITTED_ON=new Date();
  USER_NAME:any;
   constructor(private authService: AuthService, private url: URLService, private http: HttpService, private toastrService: ToastrService,) { }
 
  ngOnInit(): void {
     this.userInfo = this.authService.getUserDetail();
      this.getDocumentMasterList();
  }
   getDocumentMasterList(){
   this.userInfo = this.authService.getUserDetail();

    let data = {}
     this.isLoaded = true;
    this.http.postnew(this.url.GETDOCUMENTAPPROVALMASTERLIST, data).then(
      (res: any) => {
        console.log(res,'res master list');
        
       this.isLoaded = false;
        this.CME_LIST = res.CME_LIST;
        this.USER_LIST = res.USER_LIST;
        
      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
 }

 saveDocumentApproval(){
  let data={
    "CME_NO":this.CME_CODE,
    "DOC_SUBMITTED_ON":this.SUBMITTED_ON,
    "USER_ID":this.USER_NAME
  }

  console.log('USER_ID',data);
   this.isLoaded = true;
    this.http.postnew(this.url.SAVEDOCUMENTAPPROVAL, data).then(
      (res: any) => { 
       
                if (res.FLAG == true) {

         
          this.isLoaded = false;
          this.toastrService.success(res.MSG);
        } else if (res.FLAG == false) {
          this.toastrService.error(res.MSG);
        }
      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
 }

}
