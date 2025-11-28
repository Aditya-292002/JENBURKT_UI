import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { SharedService } from 'src/app/Service/shared.service';
import { URLService } from 'src/app/Service/url.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.css']
})
export class ChangePasswordPageComponent implements OnInit {
  OLD_PASSWORD:any;
  NEW_PASSWORD:any;
  CONFIRM_PASSWORD:any;
  userInfo: any;
  isLoaded: boolean;
  constructor(private router: Router,private authService: AuthService, private url: URLService, private http: HttpService,
      private toastrService: ToastrService, private SharedService: SharedService) { }

  ngOnInit(): void {
      this.userInfo = JSON.parse(this.authService.getUserDetail());
  }
  submit(){
    this.changePassword();
    this.router.navigate(["/login"]);
  }
  cancel(){
    this.router.navigate(["/login"]);
  }
  validate(){

    if(this.OLD_PASSWORD==undefined || this.OLD_PASSWORD==''  ){
        this.toastrService.error("Please set Old Password");
    }
    else if(this.NEW_PASSWORD==undefined || this.NEW_PASSWORD==''  ){
        this.toastrService.error("Please set New Password");
    }
    else if(this.CONFIRM_PASSWORD==undefined || this.CONFIRM_PASSWORD==''  ){
        this.toastrService.error("Please set Confirm Password");
    }
    else if(this.NEW_PASSWORD!=this.CONFIRM_PASSWORD){
        this.toastrService.error("New Password and Confirm Password should be same");
    }
  }

  changePassword() {
    if(this.OLD_PASSWORD==undefined || this.OLD_PASSWORD==''  ){
        this.toastrService.error("Please set Old Password");
        return;
    }
    else if(this.NEW_PASSWORD==undefined || this.NEW_PASSWORD==''  ){
        this.toastrService.error("Please set New Password");
        return;
    }
    else if(this.CONFIRM_PASSWORD==undefined || this.CONFIRM_PASSWORD==''  ){
        this.toastrService.error("Please set Confirm Password");
        return;
    }
    else if(this.NEW_PASSWORD!=this.CONFIRM_PASSWORD){
        this.toastrService.error("New Password and Confirm Password should be same");
        return;
    }
    let data = {
      "USER_ID": this.userInfo.USER_ID,
      "OLD_PASSWORD":this.OLD_PASSWORD,
      "NEW_PASSWORD":this.CONFIRM_PASSWORD
    }
    console.log('this.data',data);

      // "HQ_CODE": this.HQ_CODE

     this.isLoaded=true
    this.http.postnew(this.url.SAVECHANGEPASSWORD, data).then(
      (res: any) => {
        if(res.FLAG=='TRUE'){
          this.toastrService.success(res.MSG);
             this.router.navigate(["/login"]);
        }
        else{
          this.toastrService.error(res.MSG);    
        }
      this.isLoaded=false
      
      //  this.REQ_NO=this.PRODUCT_LIST[0]?.REQUEST_NO  
      //  this.REMARK=this.PRODUCT_LIST[0]?.REMARKS
     })
  }

}
