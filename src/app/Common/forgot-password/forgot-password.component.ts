import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';
import { CommonService } from 'src/app/Service/common.service';
import { ToastrNotificationService } from 'src/app/Service/toastr-notification.service';
import { UrlService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private router: Router, private urlService: UrlService, public commonservice: CommonService,
    private toastrService: ToastrNotificationService, private apiService: ApiService,) { }

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

}
