import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { CommonService } from 'src/app/Service/common.service';
@Component({
  selector: 'app-grid-popup-container',
  templateUrl: './grid-popup-container.component.html',
  styleUrls: ['./grid-popup-container.component.css']
})
export class GridPopupContainerComponent implements OnInit {
  v_data:any = {};
  x_data:any = {};
  gridDataSetValue:string="";
  setValue:any;
  totalRecords:any;
  cols:any;
  books:any;
  search:any
  isGridPopUp:boolean=false;
  @Input() showGridData: any={};
  constructor(private router: Router,private CommonService:CommonService) {
    this.CommonService.isGridPopUp.subscribe(state => this.isGridPopUp = state);
    this.CommonService.gridDataSetValue.subscribe(state => this.gridDataSetValue = state);
   }

  ngOnInit(): void {

  }
  ngDoCheck(){
    this.setValue = this.gridDataSetValue;
    console.log("showGridData",this.showGridData);
    this.v_data["Headers"] = [];
    this.v_data["Field"] = [];
    this.showGridData["GridHeadersList"] =[];
    this.showGridData["SearchKey"] =[];
    this.showGridData.GridList.forEach((currentValue: any, index: any) => {
      let k = Object.keys(currentValue)[index];
      if(k != undefined){
        console.log("Data", k);
        this.v_data["Headers"] = k;
        this.v_data["Field"] = k;
        this.showGridData["SearchKey"].push(k);
        this.x_data = this.v_data
        this.showGridData["GridHeadersList"].push(this.x_data);
        this.x_data ={};
        this.v_data ={};
      } 
  });
  console.log("this.showGridData Headers", this.showGridData);
  }
  ClosePopUp(){
    this.isGridPopUp= false;
  }
  routeList(data:any){
    console.log("this.routeList", data);
    this.isGridPopUp= false;
    this.CommonService.gridDataUserSetValue.next(this.setValue);
    this.CommonService.setGridListData(JSON.stringify(data))
    this.router.navigate([`${this.router.url}`])
  }

}
