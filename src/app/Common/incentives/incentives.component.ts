import { Component, OnInit } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { ToastrService } from 'ngx-toastr';
import { URLService } from 'src/app/Service/url.service';
import * as FileSaver from 'file-saver';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-incentives',
  templateUrl: './incentives.component.html',
  styleUrls: ['./incentives.component.css']
})
export class IncentivesComponent implements OnInit, PipeTransform {
  @Pipe({ name: 'formatValue' })
  userInfo: any;
  isLoaded: boolean;
  INCENTIVE_LIST: any = [];
  // CURR_INCENTIVE_MONTH: any;
  dataObject: any = [];
  CURR_INCENTIVE_MONTH: { field: string, value: any, format: any }[] = [];

  constructor(private router: Router, private SharedService: SharedService, private AuthService: AuthService,
    private ToastrService: ToastrService, private url: URLService, private http: HttpService) { }

  ngOnInit(): void {
    localStorage.removeItem('CME_ID')
    this.userInfo = JSON.parse(this.AuthService.getUserDetail());
    this.GETCMEAPPROVEDLISTUSERID();
  }
  async GETCMEAPPROVEDLISTUSERID() {
    let data = {
      "USER_ID": this.userInfo.USER_ID,
      "SALES_ROLE_ID": this.userInfo.SALESROLE_ID
    }
    this.isLoaded = true;
    await this.http.postnew(this.url.getIncentiveList, data).then(
      (res: any) => {
        console.log('res ->', res)
        if (res.INCENTIVE_LIST)
          this.INCENTIVE_LIST = res.INCENTIVE_LIST;



        if (this.INCENTIVE_LIST.length > 0) {
          this.INCENTIVE_LIST.forEach(element => {
            if (element.CM == 1) {
              this.dataObject.push(element);
              console.log('this.dataObject', this.dataObject);

              this.INCENTIVE_LIST.splice(0, 1);
            }
          });
          //  this.dataObject=res.INCENTIVE_LIST[0];
          //this.INCENTIVE_LIST.splice(0, 1);
          
          if (this.dataObject[0].CM_INC > 0) {
            console.log('inside if');
            
            this.CURR_INCENTIVE_MONTH = [
              { field: 'CURRENT MONTH', value: this.dataObject[0].PERIOD_DESC, format: 'S' },
              { field: 'CURRENT MONTH SALE', value: this.dataObject[0].PERIOD_SALES, format: 'N' },
              { field: 'TARGET VALUE', value: this.dataObject[0].TARGET_MONTH, format: 'N' },
              { field: 'ELIGIBLE INCENTIVE', value: this.dataObject[0].CM_INC, format: 'N' },
              { field: 'BALANCE TO ACHIEVE THE TARGET', value: this.dataObject[0].PEND_FORNEXT, format: 'N' },
              // { field: 'PENDING FOR NEXT SLAB', value: this.dataObject[0].PEND_FORNEXT,format: 'N'},
              // { field: 'INCENTIVE ON TARGET ACHIEVMENT', value: this.dataObject[0].INC_IFACHIEV, format: 'N' },
              { field: 'SALE REQUIRED TO ACHIEVE PREVIOUS MONTH INCENTIVE ', value: this.dataObject[0].PEND_FOR_PM_INC, format: 'N' },


            ];
          }else{
               console.log('inside else');
             this.CURR_INCENTIVE_MONTH = [
              { field: 'CURRENT MONTH', value: this.dataObject[0].PERIOD_DESC, format: 'S' },
              { field: 'CURRENT MONTH SALE', value: this.dataObject[0].PERIOD_SALES, format: 'N' },
              { field: 'TARGET VALUE', value: this.dataObject[0].TARGET_MONTH, format: 'N' },
              // { field: 'ELIGIBLE INCENTIVE', value: this.dataObject[0].CM_INC, format: 'N' },
              { field: 'BALANCE TO ACHIEVE THE TARGET', value: this.dataObject[0].PEND_FORNEXT, format: 'N' },
              // { field: 'PENDING FOR NEXT SLAB', value: this.dataObject[0].PEND_FORNEXT,format: 'N'},
              { field: 'INCENTIVE ON TARGET ACHIEVMENT', value: this.dataObject[0].INC_IFACHIEV, format: 'N' },
              { field: 'SALE REQUIRED TO ACHIEVE PREVIOUS MONTH INCENTIVE ', value: this.dataObject[0].PEND_FOR_PM_INC, format: 'N' },


            ];
          }

        }

        //  console.log('123',this.CURR_INCENTIVE_MONTH);


        //       this.CURR_INCENTIVE_MONTH = Object.entries(this.dataObject).map(([key, value]) => ({
        //   field: key,
        //   value: value
        // }));
        //console.log('test',this.CURR_INCENTIVE_MONTH);

        this.isLoaded = false;
      },
      error => {
        console.log(error);
        this.isLoaded = false;
        this.ToastrService.error("Oops, Something went wrong.");
      }
    );
  }
  transform(value: any): string {
    const num = Number(value);
    if (!isNaN(num) && value !== null && value !== '') {
      return num.toLocaleString('en-US');
    }
    return value;
  }
}
