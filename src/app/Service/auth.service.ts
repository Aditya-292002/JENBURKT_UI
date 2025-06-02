import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ToastrService } from "ngx-toastr";
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private myRoute: Router,
    private http: HttpClient,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private router: Router) { }

  private isValidate: boolean = false;
  public subs: Subject<any> = new Subject();

  sendToken(token: string) {
    localStorage.setItem("validKey", token)
    this.sharedService.validationKey = token;
  }
  getUserDetail() {
    return localStorage.getItem("UserID")
  }
  setUserDetail(val:any){
    localStorage.setItem("UserID",val);
  }
  getMenuList() {
    return localStorage.getItem("Menu_List")
  }
  setMenuList(val:any){
    localStorage.setItem("Menu_List",val);
  }
  getUser() {
    return localStorage.getItem("LoginUser")
  }
  getToken() {
    return localStorage.getItem("validKey")
  }
  getlocalId = () => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo") ?? '{}');
    return userInfo.localAccountId;
  }
  // getSideBarValue() {
  //   return localStorage.getItem("sideBarValue")
  // }

  isLoggedIn() {
    // console.log('this.checkUserInfo()',this.checkUserInfo())
    //console.log('Parse this.getUserInfo()',JSON.parse(this.checkUserInfo()))
    if(this.checkUserInfo() === null){
      //console.log('if(this.getUserInfo() == null){')
      return false;
    }
    if(this.checkUserInfo() === '{}'){
      //console.log('2nd if(this.getUserInfo() == {}){')
      return false;
    }
    else{

      //console.log('last else')
      return true; //this.getUserInfo()
    }
    // return this.getUserInfo() !== {}
    //return this.getToken() !== null;
  }

  getUserInfo = () => {
    let UserInfo = JSON.parse(localStorage.getItem("userdetail") ?? '{}');
    return UserInfo;
  }

  checkUserInfo() {
    return localStorage.getItem("userdetail")
  }
  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  callerror = (error : any) => {
    if (error.status == "401") {

      //this.toastr.error("Session expired...")
      this.sessionexpired();
    }
  }
  callerror_ = (error : any) => {
    if (error.status == "401") {
      this.sessionexpired();
    }
  }

  sessionexpired() { // Add log out function here
    localStorage.clear();
    this.router.navigate([`/login`]);
  }

}
