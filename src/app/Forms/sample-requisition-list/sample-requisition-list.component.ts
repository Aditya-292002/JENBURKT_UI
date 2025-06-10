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
UserDetail:any = {};
USER_ID:any;
USER_NAME:any;
 
  constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService, private SharedService: SharedService,private router:Router) { }

  ngOnInit(): void {
    this.UserDetail = this.authService.getUserDetail();
    this.USER_ID = JSON.parse(this.UserDetail).USER_ID;
    this.USER_NAME = JSON.parse(this.UserDetail).USER_NAME;
    this.GETSAMPLEREQUISITIONLISTBYUSERID();
  }

  GETSAMPLEREQUISITIONLISTBYUSERID(){
    let data = {
      "USER_ID": this.USER_ID
    }
    this.http.postnew(this.url.GETSAMPLEREQUISITIONLISTBYUSERID, data).then(
      (res: any) => {
        this.SAMPLE_REQUISITION_LIST = res.SAMPLE_REQUISITION_LIST;
      });
  }

    loadDataLazily(e: any) {
    // sessionStorage.setItem("filter",JSON.stringify(e));
    // if(this.cachedTableEvent){
    //     e = this.cachedTableEvent;
    //   this.cachedTableEvent = null;
    // }
    // console.log( this.cachedTableEvent,"cache")
  }

  Back(){
    this.router.navigate(["/samplerequisition"]);
  }

}
