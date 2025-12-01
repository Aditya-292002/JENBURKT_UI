import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Service/api.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { ToastrNotificationService } from 'src/app/Service/toastr-notification.service';
import { URLService  } from 'src/app/Service/url.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  NEW_PASSWORD: any;
  CONFIRM_PASSWORD: string;
  OTP: string;
  MOBILE_NUMBER:any
  isNumberVerfied: boolean=false;
  isLoaded:boolean=false;

  constructor(private router: Router, private urlService: URLService, public commonservice: CommonService,
    private toastrService: ToastrService, private apiService: ApiService,private http:HttpService) { }

  ngOnInit(): void {
  }
  onSomeAction(e: any) {
    console.log("event", e.code);
    if(e.code == "Enter"){
      this.logInClick();
    }
  }
  logInClick(){
    this.router.navigate(["/login"]);
  }
    forgotInClick(){
    this.router.navigate(["/forgotpassword"]);
    this.isNumberVerfied=false;
  }
  validate(){
   
    // if(this.OLD_PASSWORD==undefined || this.OLD_PASSWORD==''  ){
    //     this.toastrService.error("Please set Old Password");
    // }
     if(this.NEW_PASSWORD==undefined || this.NEW_PASSWORD==''  ){
        this.toastrService.error("Please set New Password");
        return
    }
    else if(this.CONFIRM_PASSWORD==undefined || this.CONFIRM_PASSWORD==''  ){
        this.toastrService.error("Please set Confirm Password");
        return
    }
    else if(this.NEW_PASSWORD!=this.CONFIRM_PASSWORD){
        this.toastrService.error("New Password and Confirm Password should be same");
        return
    }
        else if(this.OTP==undefined || this.OTP=='' ){
        this.toastrService.error("New Password and Confirm Password should be same");
        return
    }else{
      this.forgotPasswordClick()
    }
  }
  sendOtpClick(){
    if(this.MOBILE_NUMBER==='' ||this.MOBILE_NUMBER == undefined ){
         this.toastrService.error("Please Enter mobile Number");
        return
      }
    let data ={
      "MOBILE_NUMBER":this.MOBILE_NUMBER
    }
        this.isLoaded=true
  this.http.postnew(this.urlService.VERIFYUSERNUMBER, data).then(
        (res: any) => {
this.isLoaded=false
          if (res.FLAG == true) {
            this.isNumberVerfied=true;
          this.toastrService.success(res.MSG);
        } else if (res.FLAG == false) {
          this.toastrService.error(res.MSG);
        }
        });
    
  }
forgotPasswordClick(){

    let data ={
      "MOBILE_NUMBER":this.MOBILE_NUMBER,
      "OTP":this.OTP,
      "NEW_PASSWORD":this.hashPassword(this.NEW_PASSWORD)
    }
    this.isLoaded=true
  this.http.postnew(this.urlService.VERIFYOTP, data).then(
        (res: any) => {
          this.isLoaded=false
          if (res.FLAG == true) {
             this.logInClick()
            // this.isNumberVerfied=true;
          this.toastrService.success(res.MSG);
          
        } else if (res.FLAG == false) {
          this.toastrService.error(res.MSG);
         // this.forgotInClick();
        }
        });
    
}
hashPassword(password: string): string {
    return CryptoJS.MD5(password).toString();
  }

}
