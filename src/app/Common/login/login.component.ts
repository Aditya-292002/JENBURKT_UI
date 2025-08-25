import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/Service/http.Service';
import { ToastrService } from 'ngx-toastr';
import { URLService } from 'src/app/Service/url.service';
import { AuthService } from 'src/app/Service/auth.service';
import { SharedService } from 'src/app/Service/shared.service';
import { CommonService } from 'src/app/Service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Password:any;
  UserName:any;
  userInfo:any;
  v_post_data:any={};
  isAgree:boolean=false;
  isTermsPopUp:boolean=false;
  IS_LIVE: string;
  intervalId: any;
  EXPIRES_IN: any;
  timeoutId: any;

  constructor(private router: Router,private http: HttpService,private SharedService: SharedService,
    private ToastrService: ToastrService,private url: URLService,private AuthService: AuthService,private coommon:CommonService) { 
    }

  ngOnInit(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  logInClick() {
    this.v_post_data.USER_NAME = this.UserName;
    this.v_post_data.PASSWORD = this.Password;
    this.http.postnewlogin(this.url.userLogin, this.v_post_data).then(
      (res:any)=>{
        // console.log("response",res);
        if (res.FLAG) {
           this.ToastrService.success(res.MSG);
          this.AuthService.setUserDetail(JSON.stringify(res));
         ;
            localStorage.setItem("TOKEN",res.TOKEN);
            localStorage.setItem('refresh_token', res.REFRESH_TOKEN);
            
            this.EXPIRES_IN=res.EXPIRES_IN
            const bufferTime = 30 * 1000;
            console.log('token',res);
            this.router.navigate(["/dashboard"]);
            console.log("⏳ Scheduling refresh in", this.EXPIRES_IN / 1000, "seconds");
            this.EXPIRES_IN = (this.EXPIRES_IN * 1000) - bufferTime;
       this.startTokenRefresh(this.EXPIRES_IN)
        }
        else {
          // this.ToastrService.warning("Oops, Something went wrong while saving.");
          this.ToastrService.warning(res.MSG);
        }
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  userRoleRights() {
    this.userInfo = this.AuthService.getUserDetail();
    this.v_post_data ={};
    this.v_post_data.USER_ID = JSON.parse(this.userInfo).USER_ID;
    this.v_post_data.ReqType = "W";
    this.http.postnew(this.url.UserRoleRights, this.v_post_data).then(
      (res:any)=>{
        // console.log("response",res);
        this.SharedService.isMenu.next(res);
        this.AuthService.setMenuList(JSON.stringify(res))
        // this.SAMPLEREQUISITIONISLIVE()
        this.router.navigate(["/dashboard"]);
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  showTermModel(){
    this.isTermsPopUp = true;
  }
  ClosePopUp(){
    this.isTermsPopUp = false;
  }

 getRefreshToken(){
  let data={
    "REFRESH_TOKEN": localStorage.getItem('refresh_token')
  }
    this.http.postnew(this.url.getrefreshtokrn, data).then(
      (res:any)=>{
          localStorage.setItem("TOKEN",res.TOKEN);
            localStorage.setItem('refresh_token', res.REFRESH_TOKEN);
     
           const bufferTime = 30 * 1000;
          this.EXPIRES_IN = (res.expires_in * 1000) - bufferTime;
   //  this.startTokenRefresh(this.EXPIRES_IN)
    // this.timeoutId = setTimeout(() => {
    //   console.log('refresh token started generating');
      
    //   this.getRefreshToken();
    // }, this.EXPIRES_IN);
      },
      error =>{
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );

 }
startTokenRefresh(expiryMs: number) {
  if (this.timeoutId) {
    clearTimeout(this.timeoutId);
    console.log("🛑 Cleared previous timeout:", this.timeoutId);
  }

  this.timeoutId = setTimeout(() => {
    console.log("🚀 Timeout triggered → calling getRefreshToken()");
    this.getRefreshToken();
  }, expiryMs);

  console.log("⏳ New timeout scheduled:", this.timeoutId);
}
}
