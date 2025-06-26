import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
@Component({
  selector: 'app-approved-payement-list',
  templateUrl: './approved-payement-list.component.html',
  styleUrls: ['./approved-payement-list.component.css']
})
export class ApprovedPayementListComponent implements OnInit {

  FileName: string;
  userInfo: any;
  jsonData: unknown[];
  isLoaded: boolean;
  IncentiveReportList: any = {};
  showGridData: any = {};
  incentiveReportList: any = {};
  setValue: any;
  gridDataSetValue: any;
  first: number = 0;
  totalRecords: number = 0;
  rows: number = 10;
  last: number;
  PAYMENT_LIST: any;
  TO_DATE=new Date();
  FROM_DATE=new Date();
  salesRoleId: any;

  constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService, private common: CommonService, public datePipe: DatePipe, private router: Router, public httpclient: HttpClient) {
  }
  ngOnInit(): void {
      this.userInfo = JSON.parse(this.authService.getUserDetail());
         this.salesRoleId = this.userInfo?.SALESROLE_ID;
      this.approvedPayementList();
  }

    approvedPayementList() {
    let data = {
      "USER_ID": this.userInfo.USER_ID,
      "FROM_DATE":this.FROM_DATE,
      "TO_DATE":this.TO_DATE,
      "SALES_ROLE_ID":this.salesRoleId
    }

   // console.log('DATA ->', JSON.stringify(data))
    // return
    this.isLoaded = true;
    this.http.postnew(this.url.GETAPPROVEDPAYMENTLIST, data).then(
      (res: any) => {
        console.log('123', res);
        this.isLoaded = false;
        this.PAYMENT_LIST = res.PAYMENT_LIST;
        if(this.PAYMENT_LIST.length>0){
        this.showGridData["GridList"] = this.PAYMENT_LIST;
        this.setValue = this.gridDataSetValue;

        // Clear headers & keys
        this.showGridData["GridHeadersList"] = [];
        this.showGridData["SearchKey"] = [];

        // Extract headers from first row
        if (this.showGridData.GridList.length > 0) {
          const keys = Object.keys(this.showGridData.GridList[0]);
          console.log('sinside2');

          keys.forEach(key => {
            const header = {
              Headers: key,
              Field: key
            };
            this.showGridData["SearchKey"].push(key);
            this.showGridData["GridHeadersList"].push(header);
            console.log('sinside3');
          });
        }
        }
      
console.log('this.showGridData',this.showGridData);


      });
  }
    onPageChange(event: any) {
    console.log(event.first);

    console.log('this.totalRecords', this.totalRecords);
    this.last = this.first;
    this.first = event.first;
    this.rows = event.rows;
  }
  BACKTOLIST(){
    this.router.navigate(["/requestcme"]);
  }
formatDateToDDMMYYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

onDateChange(event: any): void {
  const selectedDate = new Date(event.target.value); // or event.value if using Angular Material
  const formatted = this.formatDateToDDMMYYYY(selectedDate);
  console.log('Formatted Date:', formatted);
}
}
