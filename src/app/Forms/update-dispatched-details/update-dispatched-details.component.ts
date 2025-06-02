import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-update-dispatched-details',
  templateUrl: './update-dispatched-details.component.html',
  styleUrls: ['./update-dispatched-details.component.css']
})
export class UpdateDispatchedDetailsComponent implements OnInit {
  isLoaded:boolean = false;
  userInfo:any = {};
  userList:any = [];
  userId:any;
  userName:any;
  stateName:any;
  stateCode:any;
  address:any;
  empCode:any;
  loginId:any;
  STATE_LIST:any=[];
  STATE:any;
  EMP_CODE:any;
  USERNAME:any;
  LOGIN_ID:any;
  MOBILE_NO:any;
  ADDRESS:any;
  EMAIL_ID:any;
  userDetailID:any;
  updateDispatchedDetailsHideShow:boolean;
  constructor(private authService:AuthService,private http:HttpService,private url:URLService,
   private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.GetUserList();
  }


  GetUserList() {
    this.userInfo = this.authService.getUserDetail();
    let data={
    }
    this.http.postnew(this.url.getUserList, data).then(
      (res:any)=>{

        this.isLoaded= false;
        this.userList=res.USERLIST;

      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  onUpdateUserDetails(data:any){
    this.updateDispatchedDetailsHideShow=true;
     this.userDetailID = data.USER_ID


    this.LOGIN_ID=data.LOGIN_ID;
    this.USERNAME=data.USER_NAME;
    this.EMP_CODE=data.EMP_CODE;

    let data1={}
    this.http.postnew(this.url.getUserMasterList, data1).then(
      (res:any)=>{
        this.STATE_LIST = res.Statelist;

      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  onSaveUpadteDispatchedClick(){
    this.userInfo = this.authService.getUserDetail();
    this.userId=JSON.parse(this.userInfo).USER_ID

    let data={
      USER_ID: this.userDetailID,
      STATE_CODE:this.STATE,
      EMAIL_ID:this.EMAIL_ID,
      MOBILE_NO:this.MOBILE_NO,
      ADDRESS:this.ADDRESS,
      UPDATED_BY:this.userId
    }
   console.log('update ',JSON.stringify(data))
   this.isLoaded = true;
   this.http.postnew(this.url.UPDATEUSERDETAILSFORDISPATCHED, data).then(
    (res:any)=>{
      if(res.FLAG==1){
        this.isLoaded= false;
        this.toastrService.success(res.MSG);
        this.onClearData();
      } else{
        this.toastrService.error(res.MSG);
      }

    },
    error =>{

      this.toastrService.error("Oops, Something went wrong.");
       this.isLoaded = false;
    }
  );

  }

  onClearData(){
    this.LOGIN_ID="";
    this.USERNAME="";
    this.EMP_CODE="";
    this.STATE="";
    this.MOBILE_NO="";
    this.EMAIL_ID="";
    this.ADDRESS="";
    this.updateDispatchedDetailsHideShow=false;

  }


}
