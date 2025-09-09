import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { ApiService } from 'src/app/Service/api.service';
import { CommonService } from 'src/app/Service/common.service';
import { ToastrNotificationService } from 'src/app/Service/toastr-notification.service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router, private urlService: URLService, public commonservice: CommonService,
    private toastrService: ToastrNotificationService, private apiService: ApiService,) { }
    LOGIN_ID: any;
    PASSWORD: any;
  ngOnInit(): void {
    localStorage.clear();
  }
  logInClick() {
    let data = {
      "LOGIN_ID": this.LOGIN_ID,
      "PASSWORD": this.PASSWORD,
    }
    this.apiService.post(this.urlService.userLogin, data).then((res: any) => {
      console.log("result", res.User_List)
      if (res.User_List.FLAG == true) {
        this.toastrService.showSucess(res.User_List.MSG, '');
        this.router.navigate(["/changecompany"]);
        localStorage.setItem("USER_ID",res.User_List.UserDetails[0].USER_ID );

      }
      else {
        this.toastrService.showError(res.User_List.MSG, '');
      }
    },
      error => {
      });
  }
  
  onSomeAction(e: any) {
    console.log("event", e.code);
    if(e.code == "Enter"){
      this.logInClick();
    }
  }
  forgotPassFun(){
    this.router.navigate(["/forgotpassword"]);
  }
  
}
    