import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { SharedService } from 'src/app/Service/shared.service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-sample-requisition-list',
  templateUrl: './sample-requisition-list.component.html',
  styleUrls: ['./sample-requisition-list.component.css']
})
export class SampleRequisitionListComponent implements OnInit {
  SAMPLE_REQUISITION_LIST: any = [];
  UserDetail: any = {};
  USER_ID: any;
  USER_NAME: any;
  TRXN_ID: any;
  CYCLE_ID: any;
  MASTER_LIST: any = [];
  TEMP_USER_ID: any;

  constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService, private SharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('TRXN_ID');
    localStorage.removeItem('CYCLE_ID');
    localStorage.removeItem('USER_ID');
    this.UserDetail = this.authService.getUserDetail();
    this.USER_ID = JSON.parse(this.UserDetail).USER_ID;
    this.USER_NAME = JSON.parse(this.UserDetail).USER_NAME;
    this.GETSAMPLEREQUISITIONLISTBYUSERID();
  }

  GETSAMPLEREQUISITIONLISTBYUSERID() {
    let data = {
      "USER_ID": this.USER_ID
    }
    this.http.postnew(this.url.GETSAMPLEREQUISITIONLISTBYUSERID, data).then(
      (res: any) => {
        this.SAMPLE_REQUISITION_LIST = res.SAMPLE_REQUISITION_LIST;
      });
  }

  GETSAMPLEREQUISITIONLISTBYTRXNID(data: any) {
    // if(data.STATUS == 'P'){
    //   return
    // }
    this.TRXN_ID = data.TRXN_ID;
    this.TEMP_USER_ID = data.USER_ID;
    this.CYCLE_ID = data.CYCLE_ID;
    localStorage.setItem('TRXN_ID', this.TRXN_ID)
    localStorage.setItem('CYCLE_ID', this.CYCLE_ID)
    localStorage.setItem('USER_ID', this.TEMP_USER_ID)
    this.router.navigate(["/samplerequisitionapproval"]);
  }

  loadDataLazily(e: any) {
    // sessionStorage.setItem("filter",JSON.stringify(e));
    // if(this.cachedTableEvent){
    //     e = this.cachedTableEvent;
    //   this.cachedTableEvent = null;
    // }
    // console.log( this.cachedTableEvent,"cache")
  }



}
