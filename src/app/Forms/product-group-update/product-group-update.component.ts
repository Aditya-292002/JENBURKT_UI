import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-product-group-update',
  templateUrl: './product-group-update.component.html',
  styleUrls: ['./product-group-update.component.css']
})
export class ProductGroupUpdateComponent implements OnInit {
  isLoaded:boolean = false;
  requestId:any;
  productCode:any;
  requestList:any = [];
  productGroupList:any = [];
  requestdata:any = [];
  userInfo:any = {};
  cleardata:boolean=false;
  constructor(private authService:AuthService,private url:URLService,private http:HttpService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getMasterListData();
  }

  getMasterListData(){
    this.userInfo = JSON.parse(this.authService.getUserDetail());
    let data = {  
      "USER_ID":+this.userInfo.USER_ID
    }
    this.isLoaded = true;
    this.http.postnew(this.url.GET_MASTER_LIST_FOR_PRODUCT_GROUPLIST, data).then(
      (res: any) => {
        this.isLoaded = false;
        this.requestList = res.REQUEST_LIST;
        this.productGroupList = res.PRODUCT_LIST;
   
      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
onreqestchange(){

  for(let i =0;i<this.requestList.length;i++){
    if(+this.requestId==this.requestList[i]['REQUEST_ID']){
this.requestdata=this.requestList[i]
    }
  }
  this.cleardata=true;
}


  UpdateData(){
    if(this.requestId==""|| this.requestId==undefined){
      this.toastrService.error("Please select Request No.");
      return;
    }
    if(this.productCode==""|| this.productCode==undefined){
      this.toastrService.error("Please select Product Code");
      return;
    }
    this.userInfo = JSON.parse(this.authService.getUserDetail());
    let data = {
      "USER_ID":+this.userInfo.USER_ID,
      "REQUEST_ID":this.requestId,
      "PRODUCT_GROUP_CODE":this.productCode
    }
    this.isLoaded = true;
    this.http.postnew(this.url.UPDATE_PRODUCT_GROUP_CODE, data).then(
      (res: any) => {
        this.isLoaded = false;  
       if (res.data.FLAG == true) {
          this.toastrService.success(res.data.MSG)
          this.cleardata=false;
          this.requestId="";
          this.productCode="";
          this.getMasterListData();
        }
        if (res.data.FLAG == false) {
          this.toastrService.error(res.data.MSG)
        }
      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  clearData(){
    this.cleardata=false;
    this.requestId="";
    this.productCode="";
  }
}
