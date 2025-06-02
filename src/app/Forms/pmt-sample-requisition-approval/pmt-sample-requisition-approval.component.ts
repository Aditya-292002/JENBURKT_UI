import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-pmt-sample-requisition-approval',
  templateUrl: './pmt-sample-requisition-approval.component.html',
  styleUrls: ['./pmt-sample-requisition-approval.component.css']
})
export class PMTSampleRequisitionApprovalComponent implements OnInit {
  isLoaded: boolean = false;
  isHighLightInnerPack: any = "No";
  isHighLightProduct: any = "No";
  isHighLightPeriod: any = "No";
  isHighLightStockAvail: any = "No";
  PREDEFINE_LIST_RANGE: any = [];
  INNER_PACK: any;
  PRODUCT: any;
  PERIOD: any;
  STOCK_AVAILABLE: any;

  constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  Approved() {

  }

}
