import { Component, OnInit,Input, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { CommonService } from 'src/app/Service/common.service';
@Component({
  selector: 'app-popup-page-container',
  templateUrl: './popup-page-container.component.html',
  styleUrls: ['./popup-page-container.component.css']
})
export class PopupPageContainerComponent implements OnInit {
  role:any;
  active:any;
  description:any;
  moduleList:any=[];
  newFunctionList:any=[];
  userLogin:any;
  userName:any;
  userEmail:any;
  mobileNumber:any;
  isPopUp:boolean=false;
  v_post_user:any={};
  // U_data:any;
  isClearData:string="";
  page_name:string="";
  showForm:string="";
  showFormUrl:string="";
  formUrl:string="";
  @Input() showData: any = new EventEmitter();
  // @Input() showPopUp: any;
  @Input() tabList: any=[];
  constructor(private router: Router,private CommonService:CommonService) {
    this.CommonService.isPopUp.subscribe(state => this.isPopUp = state);
    this.CommonService.showForm.subscribe(state => this.showForm = state);
    this.CommonService.showFormUrl.subscribe(state => this.showFormUrl = state);
    this.CommonService.formUrl.subscribe(state => this.formUrl = state);
  }

  ngOnInit(): void {
    this.page_name = this.router.url;
    console.log("page_name :-", this.page_name);

    console.log("page_name :-", this.showForm);
  }
  showModuleListData(code:any,name:any){

  }
  ClosePopUp(){
    this.showForm = "";

  }

}
