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
import { Chart } from 'chart.js/auto';

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
// 
  // dataObject: any = [];
  // CURR_INCENTIVE_MONTH: { field: string, value: any, format: any }[] = [];
    // Current month data
  currentMonthData = {
    currentMonth: '',
    currentMonthSale: 0,
    targetValue: 0,
    balanceToAchieve: 0,
    incentiveOnTarget: 0,
    saleRequiredToAchieve: 0
  };

  // Historical data for charts
  historicalData = [
  ];

  // Charts
  salesChart: any;
  incentiveChart: any;
  progressChart: any;

  constructor(private router: Router, private SharedService: SharedService, private AuthService: AuthService,
    private ToastrService: ToastrService, private url: URLService, private http: HttpService) { }

  ngOnInit(): void {
    localStorage.removeItem('CME_ID')
    this.userInfo = JSON.parse(this.AuthService.getUserDetail());
    this.GETCMEAPPROVEDLISTUSERID();
        // this.createSalesChart();  
 
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

console.log(    this.INCENTIVE_LIST)

        if (this.INCENTIVE_LIST.length > 0) {
          this.INCENTIVE_LIST.forEach(element => {
            if (element.CM == 1) {
              this.currentMonthData.balanceToAchieve= element.PEND_FORNEXT
              this.currentMonthData.currentMonth= element.PERIOD_DESC
                this.currentMonthData.currentMonthSale= element.PERIOD_SALES
                  this.currentMonthData.incentiveOnTarget= element.CM_INC
                    this.currentMonthData.saleRequiredToAchieve= element.PEND_FOR_PM_INC
                      this.currentMonthData.targetValue= element.TARGET_MONTH
              // currentMonthData.
              // this.dataObject.push(element);
              // console.log('this.dataObject', this.dataObject);

              // this.INCENTIVE_LIST.splice(0, 1);
            }else{
                
            this.historicalData.push( { PERIOD_ID:element.PERIOD_ID,month: element.PERIOD_DESC, netSales: element.PERIOD_SALES, incentive: element.INC_IFACHIEV, nextMonthAchieved: element.NM_ACHV, achievedIncentive: element.ACHV_INC }   );
           //this.historicalData.reverse();
          // console.log(' his.historicalData',this.historicalData);
           
           for (let index = 0; index < this.historicalData.length-1; index++) {
            const element =  this.historicalData[index];
           // console.log('period Id',this.historicalData[index].PERIOD_ID,this.historicalData[index]);
            if(this.historicalData[index].PERIOD_ID >this.historicalData[index+1].PERIOD_ID){
              
              let temp=this.historicalData[index]
              this.historicalData[index]=this.historicalData[index+1]
              this.historicalData[index+1]=temp

              index = -1
            }
           }
          // console.log('sortd array',this.historicalData);
           
            
          }
          }
        );
        
          // if (this.dataObject[0].CM_INC > 0) {
          //   console.log('inside if');
            
          //   this.CURR_INCENTIVE_MONTH = [
          //     { field: 'CURRENT MONTH', value: this.dataObject[0].PERIOD_DESC, format: 'S' },
          //     { field: 'CURRENT MONTH SALE', value: this.dataObject[0].PERIOD_SALES, format: 'N' },
          //     { field: 'TARGET VALUE', value: this.dataObject[0].TARGET_MONTH, format: 'N' },
          //     { field: 'ELIGIBLE INCENTIVE', value: this.dataObject[0].CM_INC, format: 'N' },
          //     { field: 'BALANCE TO ACHIEVE THE TARGET', value: this.dataObject[0].PEND_FORNEXT, format: 'N' },
          //     { field: 'SALE REQUIRED TO ACHIEVE PREVIOUS MONTH INCENTIVE ', value: this.dataObject[0].PEND_FOR_PM_INC, format: 'N' },


          //   ];
          // }else{
          //      console.log('inside else');
          //    this.CURR_INCENTIVE_MONTH = [
          //     { field: 'CURRENT MONTH', value: this.dataObject[0].PERIOD_DESC, format: 'S' },
          //     { field: 'CURRENT MONTH SALE', value: this.dataObject[0].PERIOD_SALES, format: 'N' },
          //     { field: 'TARGET VALUE', value: this.dataObject[0].TARGET_MONTH, format: 'N' },
          //     { field: 'BALANCE TO ACHIEVE THE TARGET', value: this.dataObject[0].PEND_FORNEXT, format: 'N' },
          //     { field: 'INCENTIVE ON TARGET ACHIEVMENT', value: this.dataObject[0].INC_IFACHIEV, format: 'N' },
          //     { field: 'SALE REQUIRED TO ACHIEVE PREVIOUS MONTH INCENTIVE ', value: this.dataObject[0].PEND_FOR_PM_INC, format: 'N' },


          //   ];
          // }
              this.createSalesChart();
       this.createProgressChart();

        }

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




 createSalesChart() {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;

    if (!ctx) {
      console.error('Canvas element not found');
      return;
    }

    this.salesChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.historicalData.map(item => item.month),
        datasets: [{
          label: 'Net Sales',
          data: this.historicalData.map(item => item.netSales),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Sales Performance'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '₹' + value.toLocaleString();
              }
            }
          }
        }
      }
    });
  }

  createIncentiveChart() {
    const ctx = document.getElementById('incentiveChart') as HTMLCanvasElement;
    
    this.incentiveChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.historicalData.map(item => item.month),
        datasets: [{
          label: 'Incentive',
          data: this.historicalData.map(item => item.incentive),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.1
        }, {
          label: 'Achieved Incentive',
          data: this.historicalData.map(item => item.achievedIncentive),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Incentive Trends'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '₹' + value.toLocaleString();
              }
            }
          }
        }
      }
    });
  }

 createProgressChart() {
  const ctx = document.getElementById('progressChart') as HTMLCanvasElement;

  const achieved = this.currentMonthData.currentMonthSale;
  const target = this.currentMonthData.targetValue;
  const percentage = Math.min((achieved / target) * 100, 100); // Cap at 100%

  const chartData = achieved >= target
    ? [target, 0]  // Fully achieved, no remaining
    : [achieved, target - achieved];  // Normal case

  this.progressChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Achieved', 'Remaining'],
      datasets: [{
        data: chartData,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `Current Month Progress (${percentage.toFixed(1)}%)`
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}


  // Utility methods
  getProgressPercentage(): number {
    return (this.currentMonthData.currentMonthSale / this.currentMonthData.targetValue) * 100;
  }

  formatCurrency(amount: number): string {
    return '₹' + amount.toLocaleString();
  }

  ngOnDestroy() {
    if (this.salesChart) {
      this.salesChart.destroy();
    }
    if (this.incentiveChart) {
      this.incentiveChart.destroy();
    }
    if (this.progressChart) {
      this.progressChart.destroy();
    }
  }
}
