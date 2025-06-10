import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ApexPlotOptions, ApexTooltip, ChartComponent } from 'ng-apexcharts';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { ToastrService } from 'ngx-toastr';
import { URLService } from 'src/app/Service/url.service';
import { DOCUMENT } from '@angular/common';
import { CommonService } from 'src/app/Service/common.service';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  fill: any;
  stroke: any

};
export type MonthChartOptions = {
  series: any;
  chart: any;
  labels: any;
  tooltip: any;
  plotOptions: any;
  fill: any;
  stroke: any;
};
export type CycleChartOptions = {
  series: any;
  chart: any;
  labels: any;
  plotOptions: any;
  fill: any;
  stroke: any;
};
export type YTDChartOptions = {
  series: any;
  chart: any;
  labels: any;
  plotOptions: any;
  fill: any;
  stroke: any;
};
export type IncentivechartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: any;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  @ViewChild("chart1") chart1: ChartComponent;
  public IncentivechartOptions: Partial<IncentivechartOptions>;
  @ViewChild("chart") chart: ChartComponent | any;
  @ViewChild("downloadMonth") downloadMonth: ElementRef;
  public chartOptions: Partial<ChartOptions>;
  public cycleChartOptions: Partial<CycleChartOptions>;
  public ytdChartOptions: Partial<YTDChartOptions>;
  userInfo: any;
  monthActualValue: any = 0;
  monthTargetValue: any = 0;
  cycleActualValue: any = 0;
  cycleTargetValue: any = 0;
  YTDActualValue: any = 0;
  YTDTargetValue: any = 0;
  lastUpdateDataOn: any;
  isLoaded: boolean = false;
  getDashBoardList: any = [];
  INCENTIVE_LIST: any;
  dataObject: any = [];
  CURR_INCENTIVE_MONTH: { field: string; value: any; format: string; }[];
  v_monthAvg: number;
  remainingAmount: any;
  PERIOD_DESC: any;
  YTD_DESC: any;
  INCENTIVE_DETAILS: any[];
  dataObject1: any;
  sparevalue = 100
  PIE_DATA: any;
  isYearSelected:boolean=false
  salesRoleId: any;
  userData: string;
  sortedarrayYTD: any[];
  sortedArrayCM: any[];
  sortAsc:boolean=false;
  constructor(private router: Router, private SharedService: SharedService, private AuthService: AuthService,
    private ToastrService: ToastrService, private url: URLService, private http: HttpService, private common: CommonService,
    @Inject(DOCUMENT) private coreDoc: Document) {




    // this.chartOptions = {
    //   series: [44, 55, 67, 83],
    //   chart: {
    //     height: 350,
    //     type: 'radialBar',
    //   },
    //   labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
    //   tooltip: {
    //     enabled: true,
    //     y: {
    //       formatter: function (value, { seriesIndex, w }) {
    //         const sum = w.config.series.reduce((a, b) => a + b, 0);
    //         const percentage = (value / sum) * 100;
    //         return percentage.toFixed(2) + '%';
    //       }
    //     }
    //   },
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: {
    //         chart: {
    //           width: 200
    //         },
    //         legend: {
    //           position: 'bottom'
    //         }
    //       }
    //     }
    //   ]
    // };



    // this.chartOptions = {
    //   series: [38],
    //   chart: {
    //     height: 270,
    //     type: "radialBar",
    //     toolbar: {
    //       show: true
    //     }
    //   },
    //   plotOptions: {
    //     radialBar: {
    //       hollow: {
    //         size: "70%"
    //       }
    //     }
    //   },
    //   labels: ["Cricket"],
    //   tooltip: {
    //     enabled: true,
    //     y: {
    //       formatter: function (val: number) {
    //         return `${val}% Remaining`;
    //       }
    //     }
    //   }

    // this.chartOptions = {
    //   series: [70],
    //   chart: {
    //     height: 350,
    //     type: "radialBar"
    //   },
    //   plotOptions: {
    //     radialBar: {
    //       hollow: {
    //         size: "70%"
    //       }
    //     }
    //   },
    //   labels: ["Cricket"],
    //         tooltip: {
    //     enabled: true,
    //     y: {
    //       formatter: function (val: number) {
    //         return `${val}% Remaining`;
    //       }
    //     }
    //   }
    // };





    this.cycleChartOptions = {
      series: [63],
      chart: {
        height: 270,
        type: "radialBar",
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function (val: any) {
                return parseInt(val.toString(), 10).toString() + "%";
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#5BB318"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Net Sales"]
    };

    this.ytdChartOptions = {
      series: [55],
      chart: {
        height: 270,
        type: "radialBar",
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function (val: any) {
                return `${val.toFixed(2).toLocaleString() + "%"} `
                // return parseInt(val.toString(), 10).toString() + "%";
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        },
        labels: {}
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#6F38C5"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Net Sales"]
    };
  }


  ngOnInit(): void {
        this.userData = this.AuthService.getUserDetail();
        this.salesRoleId = JSON.parse(this.userData).SALESROLE_ID;
    this.GetDashBoardList();

    // this.chartOptions = {
    //   series: [this.v_monthAvg],  // <-- fill level based on your calculated percentage
    //   chart: {
    //     height: 270,
    //     type: "radialBar",
    //     toolbar: {
    //       show: true
    //     }
    //   },
    //   labels: ['Balance to Achieve'],
    //   plotOptions: {
    //     radialBar: {
    //       dataLabels: {
    //         name: {
    //           show: true,
    //           color: "#888",
    //           fontSize: "17px"
    //         },
    //         value: {
    //           show: true,
    //           fontSize: "20px",
    //           formatter: (val) => val.toFixed(2) + "%"
    //         }
    //       }
    //     }
    //   },
    //   fill: {
    //     type: "gradient",
    //     gradient: {
    //       shade: "dark",
    //       type: "horizontal",
    //       shadeIntensity: 0.5,
    //       gradientToColors: ["#fa3267"],
    //       inverseColors: true,
    //       opacityFrom: 1,
    //       opacityTo: 1,
    //       stops: [0, 100]
    //     }
    //   },
    //   stroke: {
    //     lineCap: "round"
    //   },
    //   tooltip: {
    //     enabled: true,
    //     y: {
    //       formatter: (val) => val.toFixed(2) + "%",
    //       title: {
    //         formatter: () => "Progress"
    //       }
    //     }
    //   }
    // };
    this.chartOptions = {
      series: [38],
      chart: {
        height: 270,
        type: "radialBar",
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function (val: any) {
                return `${val.toFixed(2).toLocaleString() + "%"} `;
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#fa3267"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ['Net Sales'],
      // tooltip: {
      //   enabled: true,

      //   fillSeriesColor: false,
      //   y: {
      //     formatter: function (val: number) {
      //       return `${val}% Remaining`;
      //     }
      //   }
      // }
    };

    this.GETINCENTIVE();
    // this.IncentivechartOptions = {
    //   series: [44, 55, 13, 43, 22],
    //   chart: {
    //     width: 380,
    //     type: "pie"
    //   },
    //   labels: ["net sales", "PCPM", "target", "taget acheived", "sales Incentive"],
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: {
    //         chart: {
    //           width: 200
    //         },
    //         legend: {
    //           position: "bottom"
    //         }
    //       }
    //     }
    //   ]
    // };


  }

  GetDashBoardList() {
    this.userInfo = this.AuthService.getUserDetail();
    let data = {
      USER_ID: JSON.parse(this.userInfo).USER_ID,
    }
    this.isLoaded = true;
    this.http.postnew(this.url.getDashBoardListnew, data).then(
      (res: any) => {
        this.isLoaded = false;
        // console.log("response", res);
        this.getDashBoardList = res;
        this.monthActualValue = res.INCENTIVE_LIST[0].MONTH_ACT;
        this.monthTargetValue = res.INCENTIVE_LIST[0].MONTH_TARGET;
        this.cycleActualValue = res.INCENTIVE_LIST[0].CYCLE_ACT;
        this.cycleTargetValue = res.INCENTIVE_LIST[0].CYCLE_TARGET;
        this.YTDActualValue = res.INCENTIVE_LIST[0].YEAR_ACT;
        this.YTDTargetValue = res.INCENTIVE_LIST[0].YEAR_TARGET;
        this.lastUpdateDataOn = res.INCENTIVE_LIST[0].LASTPULLDATAON;
        this.PERIOD_DESC = res.INCENTIVE_LIST[0].PERIOD_DESC;
        this.YTD_DESC = res.INCENTIVE_LIST[0].YTD_DESC;
        this.dataObject1 = res.INCENTIVE_LIST[0]

        let v_monthAvg = ((+this.monthActualValue) / (+this.monthTargetValue) * 100)
        let v_cycleAvg = ((+this.cycleActualValue) / (+this.cycleTargetValue) * 100)
        let v_yearAvg = ((+this.YTDActualValue) / (+this.YTDTargetValue) * 100)
        let v_targetLeft = this.monthTargetValue - this.monthActualValue

        // this.chartOptions.plotOptions.labels = {
        //   name: {
        //     show: true,
        //     formatter: () => "Balance to Achieve"
        //   },
        //   value: {
        //     formatter: () => `$${this.monthTargetValue - this.monthActualValue}`
        //   }
        // }
        // this.chartOptions.fill = [this.v_monthAvg];
        // console.log('%456', v_monthAvg);
        this.remainingAmount =this.monthTargetValue - this.monthActualValue
        this.chartOptions.series = [v_monthAvg];
        // this.chartOptions.labels = [ "Balance to Achieve"]
        //  this.chartOptions.series = [v_targetLeft];
        this.cycleChartOptions.series = [v_cycleAvg];
        this.ytdChartOptions.series = [v_yearAvg];


        //code by hemant 
        const groupData = res.PIE_DATA // or replace with the actual variable
        this.PIE_DATA = res.PIE_DATA
        if(this.PIE_DATA.length>0){


        this.PIE_DATA.forEach(element => {
          const cmTarget = element.CM_TARGET || 0;
          const ytdTarget = element.YTD_TARGET || 0;

          element.CM_SALE_PER = cmTarget > 0 ? +(element.CM_SALE / cmTarget * 100).toFixed(2) : 0;
          element.YTD_SALE_PER = ytdTarget > 0 ? +(element.YTD_SALE / ytdTarget * 100).toFixed(2) : 0;
        });
        }
        // console.log('this.PIE_DATA', this.PIE_DATA);
         this.sortedarrayYTD = this.sortBySales(this.PIE_DATA, 'YTD_SALE');
         this.sortedArrayCM = this.sortBySales(this.PIE_DATA, 'CM_SALE');
      //  console.log(' this.sortedarrayYTD', this.sortedarrayYTD);
       
        const pieLabels = groupData.map(item => item.GROUP_DESC);
        const pieSeries = groupData.map(item => item.CM_SALE);
        this.IncentivechartOptions = {
          series: pieSeries,
          chart: {
            height: 270,
            //width: 500,
            type: "pie"
          },
          labels: pieLabels,
          legend: {
            show: true,              // ✅ Ensure it's explicitly shown
            position: "bottom",      // ✅ Position at bottom
            horizontalAlign: "center",  // 👈 this affects all screen sizes
            floating: false,
            clusterGroupedSeries: true,
            clusterGroupedSeriesOrientation: 'vertical',
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 400,// Set your desired height
                },
                legend: {
                  show: true,
                  position: "bottom"
                }
              }
            }
          ]
        };


        this.INCENTIVE_DETAILS = []
        this.INCENTIVE_DETAILS = [
          // { field: 'Current Month', value: this.dataObject.PERIOD_DESC,format:'S' },
          { field: this.dataObject1.INCENTIVE_DESC, value: this.dataObject1.INCENTIVE_AMT, format: 'N' },
          { field: this.dataObject1.INCENTIVE_DESC1, value: this.dataObject1.PREV_BALANCE, format: 'N' },
        ];
      },
      error => {
        console.log(error);
        this.ToastrService.error("Oops, Something went wrong.");
        // this.isLoaded = false;
      }
    );
  }

  async GETINCENTIVE() {
    let data = {
      "USER_ID": JSON.parse(this.userInfo).USER_ID,
      "SALES_ROLE_ID": JSON.parse(this.userInfo).SALESROLE_ID
    }
    this.isLoaded = true;
    await this.http.postnew(this.url.getIncentiveList, data).then(
      (res: any) => {
        // console.log('res ->', res)
        if (res.INCENTIVE_LIST)
          this.INCENTIVE_LIST = res.INCENTIVE_LIST;

        if (this.INCENTIVE_LIST.length > 0) {
          this.INCENTIVE_LIST.forEach((element:any) => {

            if (element.CM == 1) {
              this.dataObject.push(element);
              // console.log('this.dataObject', this.dataObject);

              this.INCENTIVE_LIST.splice(0, 1);
            }
          });
          this.dataObject = res.INCENTIVE_LIST[0];
          this.INCENTIVE_LIST.splice(0, 1);
          // console.log('123', this.dataObject);


          this.CURR_INCENTIVE_MONTH = [
            // { field: 'Current Month', value: this.dataObject.PERIOD_DESC,format:'S' },
            { field: 'PCPM', value: this.dataObject.PERIOD_SALES, format: 'N' },
            { field: 'TARGET', value: this.dataObject.TARGET_MONTH, format: 'N' },
            { field: 'CURRENT INCENTIVE', value: this.dataObject.CM_INC, format: 'N' },
            { field: 'BALANCE TO ACHIEVE THE TARGET/NEXT SLAB', value: this.dataObject.PEND_FORNEXT, format: 'N' },
            // { field: 'PENDING FOR NEXT SLAB', value: this.dataObject[0].PEND_FORNEXT,format: 'N'},
            { field: 'INCENTIVE ON TARGET/NEXT SLAB ACHIEVMENT', value: this.dataObject.INC_IFACHIEV, format: 'N' },
            { field: 'SALE REQUIRED TO ACHIEVE PREVIOUS MONTH INCENTIVE ', value: this.dataObject.PEND_FOR_PM_INC, format: 'N' },

            //  this.CURR_INCENTIVE_MONTH = [
            //   { field: 'Current Month Sale', value: this.dataObject[0].PERIOD_DESC,format:'S' },
            //   { field: 'Target Value', value: this.dataObject[0].PERIOD_SALES,format: 'N'},
            //   { field: 'Current Sales value', value: this.dataObject[0].CM_INC,format:'N' },
            //   { field: 'Balance to achieve the Target', value: this.dataObject[0].PEND_FORNEXT,format: 'N'},
            //   { field: 'Incentive on Target achievement', value: this.dataObject[0].INC_IFACHIEV,format: 'N'},
            //   { field: 'Sale required to achieve Previous month Incentive', value: this.dataObject[0].PEND_FOR_PM_INC ,format:'N'},
            //   // { field: 'Next Month Achieved', value: this.dataObject.NM_ACHV },
            // { field: 'Achieved Incentive', value: this.dataObject.ACHV_INC },
            // { field: 'CM Flag', value: this.dataObject.CM }
          ];
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
  toggle(){
    // console.log('this.isYearSelected',this.isYearSelected);
    
    this.isYearSelected!=this.isYearSelected
    this.sortAsc=false;
  }
 private sortBySales( data:any,key:any) {
    return [...data].sort((a, b) => b[key] - a[key]);
  }

  getSalesPercentage(option: any): string {
  if (option.YTD_TARGET === 0 || option.YTD_TARGET < option.YTD_SALE) {
    return '100.00%';
  }
  const sale = option.YTD_SALE > 0 ? option.YTD_SALE : 0;
  const percent = (sale / option.YTD_TARGET) * 100;
  return percent.toFixed(2) + '%';
}

 private sortBySalesASC( data:any,key:any) {
    return [...data].sort((a, b) => a[key] - b[key]);
 }
sortListAsc(){

  if(this.isYearSelected){
  console.log('inside 1',this.sortedArrayCM);
    this.sortedArrayCM=this.sortBySalesASC(this.PIE_DATA,'CM_SALE')
  }else{
     this.sortedarrayYTD=this.sortBySalesASC(this.PIE_DATA,'YTD_SALE')
 console.log('inside 2',this.sortedarrayYTD);
  }
}
sortListDsc(){
  if(!this.isYearSelected){
  console.log('inside 1',this.sortedarrayYTD);

    this.sortedarrayYTD=this.sortBySales(this.PIE_DATA,'YTD_SALE')
      console.log('inside 2',this.sortedarrayYTD);
  }else{
      console.log('inside 2',this.sortedarrayYTD);
     this.sortedArrayCM=this.sortBySales(this.PIE_DATA,'CM_SALE')
  }
}

}


