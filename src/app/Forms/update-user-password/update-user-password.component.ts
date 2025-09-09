import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-update-user-password',
  templateUrl: './update-user-password.component.html',
  styleUrls: ['./update-user-password.component.css']
})
export class UpdateUserPasswordComponent implements OnInit {
  userList:any=[];
  userInfo:any;
  isLoaded:boolean;
  updateuserPasswordHideShow:boolean;
  USERNAME:any;
  NEW_PASSWORD:any;
  PASSWORD:any;
  CONFIRM_PASSWORD:any;
  CURRENT_PASSWORD:any;
  isHighLightUsername:string="No";
  isHighLightNewpassword:string="No";
  userData:any;
  isPasswordVisible:boolean = false;
  isConfirmPasswordVisible:boolean=false;
  constructor(private router: Router,private authService: AuthService,private url: URLService,private http: HttpService,
    private toastrService:ToastrService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.GetUserList();
  }
  GetUserList() {
    this.userInfo = this.authService.getUserDetail();
    let data={
    }
    this.http.postnew(this.url.getUserList, data).then(
      (res:any)=>{
        console.log("userList",res);//PRODUCTLIST
        this.isLoaded= false;
        this.userList=res.USERLIST;

      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  onUpdateUserPassword(data){
    console.log(data)
    this.USERNAME=data.USER_NAME
    this.userData=data.USER_ID
    this.updateuserPasswordHideShow=true;
    this.CURRENT_PASSWORD = data.PASSWORD;
  }
  onSaveUpadtePasswordClick(){
    this.isHighLightUsername="No";
    this.isHighLightNewpassword="No";

    if(this.USERNAME==undefined || this.USERNAME==""){
      this.isHighLightUsername="Yes";
      this.toastrService.error("Please Enter Username..");
      return;
    }else{
      this.isHighLightUsername="No";
    }
    // if(this.NEW_PASSWORD==undefined || this.NEW_PASSWORD==""){
    //   this.isHighLightNewpassword="Yes";
    //   this.toastrService.error("Please Enter New Password..");
    //   return;
    // }else{
    //   this.isHighLightNewpassword="No";
    // }
      if(this.PASSWORD==undefined || this.PASSWORD==""){
      this.isHighLightNewpassword="Yes";
      this.toastrService.error("Please Enter new Password..");
      return;
    }else{
      this.isHighLightNewpassword="No";
    }
          if(this.CONFIRM_PASSWORD==undefined || this.CONFIRM_PASSWORD==""){
      this.isHighLightNewpassword="Yes";
      this.toastrService.error("Please Enter Confirm Password..");
      return;
    }else{
      this.isHighLightNewpassword="No";
    }
     if(this.PASSWORD!=this.CONFIRM_PASSWORD || this.PASSWORD==""){
    //  this.isHighLightNewpassword="Yes";
      this.toastrService.error("Password and confirm password doent matches ");
      return;
    }else{
      this.isHighLightNewpassword="No";
    }

    this.userInfo = this.authService.getUserDetail();

    console.log(' this.userData', this.userData)
    let data={
      USER_ID:this.userData,
      UPDATED_PASSWORD:this.hashPassword( this.CONFIRM_PASSWORD)

    }
console.log('data',data)
//return
    this.http.postnew(this.url.UPDATEUSERPASSWORDBYUSERID, data).then(
      (res: any) => {

        if(res.data[0].FLAG == true){
            this.toastrService.success(res.data[0].MSG)
              this.isLoaded = false;
               this.updateuserPasswordHideShow=false;
                this.onClearFormData();
            }
        else{
          this.toastrService.error(res.data[0].MSG)
        }

      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  onClearFormData(){
    this.USERNAME="";
    this.NEW_PASSWORD="";
    this.PASSWORD='';
    this.CONFIRM_PASSWORD='';
  }
  hashPassword(password: string): string {
      return CryptoJS.MD5(password).toString();
    }

    
    clear(){
      this.PASSWORD='';
      this.CONFIRM_PASSWORD='';
    }


  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  toggleConfirmPassword(){
     this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

}
