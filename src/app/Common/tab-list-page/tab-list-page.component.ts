import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Service/common.service';

@Component({
  selector: 'app-tab-list-page',
  templateUrl: './tab-list-page.component.html',
  styleUrls: ['./tab-list-page.component.css']
})
export class TabListPageComponent implements OnInit {
  active:any = 1;
  tabs_list:any = [];
  links = [
    { title: 'One', fragment: 'one' },
    { title: '/dashboard', fragment: '/dashboard' }
  ];
  constructor(private router: Router,public commonService:CommonService) { }

  ngOnInit(): void {
  }

  deleteTab(path:any,index:any){
    this.tabs_list.splice(index,1);

  }
  hide(data:any,index:any){
    data.show = false;
  }

}
