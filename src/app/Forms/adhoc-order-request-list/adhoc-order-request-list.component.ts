import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { SharedService } from 'src/app/Service/shared.service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-adhoc-order-request-list',
  templateUrl: './adhoc-order-request-list.component.html',
  styleUrls: ['./adhoc-order-request-list.component.css']
})
export class AdhocOrderRequestListComponent {
  toggleToList: boolean = false;
  PRODUCT_LIST: any = [];
  ADHOC_ORDER_REQUEST_LIST: any = [];
 constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService, private SharedService: SharedService,private router: Router) { }

  ngOnInit(): void {}
}
