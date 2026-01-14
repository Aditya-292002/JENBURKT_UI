import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { SharedService } from 'src/app/Service/shared.service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-cycle-superstockist',
  templateUrl: './cycle-superstockist.component.html',
  styleUrls: ['./cycle-superstockist.component.css']
})
export class CycleSuperstockistComponent implements OnInit {
isHighLightSample: any = "NO";
  PERIOD_LIST: any = [];
  PERIOD_ID: any;
  isLoaded: boolean = false;
  UserDetail: any = {};
  USER_ID: any;
  superStockistList: any = [];
  SUPERSTOCKIST_CODE:any
  userInfo: any;
  constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService, private SharedService: SharedService, private router: Router) { }


  ngOnInit(): void {
    this.UserDetail = this.authService.getUserDetail();
    this.USER_ID = JSON.parse(this.UserDetail).USER_ID;
    this.GETSAMPLEREQUISITIONMASTERLIST();
  }

  GETSAMPLEREQUISITIONMASTERLIST() {
    this.userInfo = this.authService.getUserDetail();
    let data = {
      "USER_ID": this.USER_ID,
      "FYEAR": "2025",
      "LOGIN_ID": JSON.parse(this.userInfo).USER_NAME,
      "TYPE": 'All'
    }
    this.http.postnew(this.url.GETGENERATEORDERMASTERLIST, data).then(
      (res: any) => {
        this.PERIOD_LIST = res.PERIOD_LIST;
        this.superStockistList = res.DATA_LIST;
      });
  }

  SAVESAMPLEREQUISITIONCYCLEDATA() {
     if (!this.SharedService.isValid(this.PERIOD_ID)) {
      this.toastrService.error('Select a Period');
      return
    }
  let data = {
      "USER_ID": this.USER_ID,
      "PERIOD_ID": this.PERIOD_ID,
      "SUPERSTOCKIST_CODE":this.SUPERSTOCKIST_CODE,
    }
    console.log('DATA',data);
    
   // return
    this.http.postnew(this.url.SAVESUPERSTOCKISTCYCLEDATA, data).then(
      (res: any) => {
        if (res.data[0].FLAG == 1) {
        this.toastrService.success(res.data[0].MSG);
      } else if (res.data[0].FLAG == 0) {
        this.toastrService.error(res.data[0].MSG);
      }
      });
  }

  clearForm(){

  }

}
