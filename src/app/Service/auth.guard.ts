import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import { CommonService } from './common.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  currentUrl:string;

  constructor(private auth: CommonService,
    private myRoute: Router,private authservice:AuthService){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
   
      this.currentUrl = state.url;
      // console.log("currentUrl 1->" , this.currentUrl)
      // console.log("autguarad")
      if(this.auth.isLoggedIn()){
        // this.CanAcess()
        return true;
      }else{
        this.myRoute.navigate(['/login']);
        return false;
      }
  }

  CanAcess(){
      if(this.currentUrl != ''){
        this.myRoute.navigate(['/login']);
      }
  }



}
