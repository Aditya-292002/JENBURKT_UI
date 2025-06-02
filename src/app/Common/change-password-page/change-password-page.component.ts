import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.css']
})
export class ChangePasswordPageComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  submit(){
    this.router.navigate(["/login"]);
  }
  cancel(){
    this.router.navigate(["/login"]);
  }

}
