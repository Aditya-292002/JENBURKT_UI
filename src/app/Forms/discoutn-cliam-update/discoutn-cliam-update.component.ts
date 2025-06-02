
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-discoutn-cliam-update',
  templateUrl: './discoutn-cliam-update.component.html',
  styleUrls: ['./discoutn-cliam-update.component.css']
})
export class DiscoutnCliamUpdateComponent implements OnInit {
  [x: string]: any;
  isLoaded:boolean = false;
  requestId:any;
  productCode:any;
  requestList:any = [];
  productGroupList:any = [];
  requestdata:any = [];
  userInfo:any = {};
  cleardata:boolean=false;
  fromDate=new Date();
  toDate=new Date();
  STATUS:any;
  USER_ROLE:any;
  // isLoaded:boolean=true;
  exportableObj:any=[];
  isQualitySelected:boolean=true;
  reportType:any;
  onShowGrid:boolean=false;

  selectAll:boolean=false;
  reportGrid:any = {};
  REPORT_DATA:any=[];
  USERROLE_LIST:any=[];
  Header:any=[];
  Values:any=[];
  ROLE:any;
  ROLE_USERLIST:any=[];
  CLAIMREQLIST:any=[];
  REPORT_HEADERS:any=[];
  DISCOUNTREQLIST:any=[];
  HQ_LIST:any=[];
  reportTypeList:any = [{
    "REPORT_ID":1,
    "REPORT_NAME":"CLAIM Request",
    "SP_NAME":"SP_GET_CLAIM_REQUEST_DATA"
  },
  {
    "REPORT_ID":2,
    "REPORT_NAME":"DISCOUNT Request",
    "SP_NAME":"SP_GET_DISCOUNT_REQUEST_DATA"
  }
];
DATA_LIST=[{"LIST":"HQ","ROLE_ID":"0"}, {"LIST":"FM","ROLE_ID":2},{"LIST":"RSM","ROLE_ID":3},{"LIST":"SM","ROLE_ID":4}];
HQ_CODE:any;
StatusList:any=[
{
  "STATUS_ID":2,
  "STATUS_NAME":"REJECT"
}

]

// userInfo: any;
  constructor(private authService:AuthService,private url:URLService,private http:HttpService,private toastrService:ToastrService,public datepipe: DatePipe,) { }

  ngOnInit(): void {
    this.STATUS=this.StatusList[0]['STATUS_ID']
    // this.GETHQLISTBYLOGINID();
    // this.getMasterListData();
  }
  GETHQLISTBYLOGINID(){
    this.userInfo = this.authService.getUserDetail();
    let data={
      "USER_ID": JSON.parse(this.userInfo).USER_ID,
    }
    this.isLoaded = true;
    this.http.postnew(this.url.GET_HQ_LIST_BY_LOGIN_ID_REJECTREVESAL,data).then(
      (res:any)=>{
        this.isLoaded = false;
        this.HQ_LIST=res.HQ_LIST
   
      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  GETHQROLEUSERLIST(){
    this.USERROLE_LIST=[];
    this.userInfo = this.authService.getUserDetail();
    let data={
      "USER_ID": JSON.parse(this.userInfo).USER_ID,
      "ROLE_ID":this.ROLE,
    
    }
    console.log(data)
    this.isLoaded = true;
    this.http.postnew(this.url.GET_USER_LIST_BY_HQROLE,data).then(
      (res:any)=>{
        this.isLoaded = false;
        this.USERROLE_LIST=res.USERROLE_LIST
   
      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  getHqList(hQcode:any){}
  onViewReport(){
    console.log(this.fromDate,this.toDate)
    this.userInfo = this.authService.getUserDetail();
    let fromDate = this.datepipe.transform(this.fromDate, "yyyy-MM-dd");
    let toDate = this.datepipe.transform(this.toDate, "yyyy-MM-dd");
    let data={
      "FROM_DATE":fromDate,
      "TO_DATE":toDate,
      "SP_NAME":this.reportType,
      "STATUS":this.STATUS,
      "ROLE_ID": this.USER_ROLE,
      "USER_ID":JSON.parse(this.userInfo).USER_ID,
      "ISHQ_CODE":this.ROLE==0?1:0

    }

    console.log('save data',JSON.stringify(data))

    this.http.postnew(this.url.GETDISCOUNTCLAIMREQUESTDATA,data).then(
      (res:any)=>{
        this.Values=[];
        this.Header = [];
       // this.isLoaded= false;
       this.REPORT_DATA=res.REPORT_DATA
       this.REPORT_HEADERS=res.REPORT_HEADERS

       this.reportGrid.v_header = res.REPORT_HEADERS
       this.reportGrid.v_detail = res.REPORT_DATA

       this.REPORT_DATA.forEach((element:any)=> {
        this.Header=Object.keys(element)
        element.CLAIM_DATE = this.datepipe.transform(element.CLAIM_DATE, "dd-MM-yyyy")
        element.REQUEST_DATE = this.datepipe.transform(element.REQUEST_DATE, "dd-MM-yyyy")
        element.INVOICE_DATE = this.datepipe.transform(element.INVOICE_DATE, "dd-MM-yyyy")
        this.Values.push(Object.values(element))  
       });

      this.onShowGrid=true;
      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  changelist(){
    this.DISCOUNTREQLIST=[];
    this.CLAIMREQLIST=[]
  }

  toggleCheckboxAll(event: any,index:any) {

    if(event.target.checked){
    
       if(this.reportType=="SP_GET_DISCOUNT_REQUEST_DATA"){
        this.DISCOUNTREQLIST.push({"REQUEST_ID":index[2]})
       }
         else{
      this.CLAIMREQLIST.push({"CLAIM_ID":index[2]})
        }}
    else{
      if(this.reportType=="SP_GET_DISCOUNT_REQUEST_DATA"){
        const  index1= this.DISCOUNTREQLIST.indexOf({"REQUEST_ID":index[2]});
        if (index !== -1) {
          this.DISCOUNTREQLIST.splice(index1, 1);
        }
  
      }else{
        const  index1= this.CLAIMREQLIST.indexOf({"CLAIM_ID":index[2]});
        if (index !== -1) {
          this.CLAIMREQLIST.splice(index1, 1);
        }
      }
   
    }
  }


  onrolechange(){
    
    // const hq = [...new Set(this.REPORT_DATA.map(item => item.HQ_CODE))];
    // hq.forEach((element:any) => {
    //   this.HQ_LIST.push({label:element,value:element})
    // })
    this.ROLE_USERLIST=[];
   if(this.ROLE=="FM"){

    const fm = [...new Set(this.REPORT_DATA.map(item => item.FM_NAME))];
    console.log(fm)
    fm.forEach((element:any) => {
      this.ROLE_USERLIST.push({label:element,value:element})
    })
   }else if(this.ROLE=="RSM"){
    const fm = [...new Set(this.REPORT_DATA.map(item => item.RSM_NAME))];
    console.log(fm)
    fm.forEach((element:any) => {
      this.ROLE_USERLIST.push({label:element,value:element})
    })
   }else{
    const fm = [...new Set(this.REPORT_DATA.map(item => item.SM_NAME))];
    console.log(fm)
    fm.forEach((element:any) => {
      this.ROLE_USERLIST.push({label:element,value:element})
    })
   }

  }
  singleCheckbox(event: any,data:any,selectedRow:number) {
    if (event.target.checked == false){
      this.selectAll = false;
    }
  }
  onuserrolechange(){
    this.Values = [];
 console.log(this.REPORT_DATA)

 for(let i=0;i<this.REPORT_DATA.length;i++){
      if(this.REPORT_DATA[i][this.ROLE +'_NAME'] == this.USER_ROLE){
        this.Values.push(Object.values(this.REPORT_DATA[i]));
      }
    }
//  if(this.ROLE=="FM"){
//   for(let i=0;i<this.REPORT_DATA.length;i++){
//     if(this.REPORT_DATA[i]['FM_NAME'] == this.USER_ROLE){
//       this.Values.push(Object.values(this.REPORT_DATA[i]));
//     }
//   }
//  }else if(this.ROLE=="RSM"){
//   for(let i=0;i<this.REPORT_DATA.length;i++){
//     if(this.REPORT_DATA[i]['RSM_NAME'] == this.USER_ROLE){
//       this.Values.push(Object.values(this.REPORT_DATA[i]));
//     }
//   }
//  }else{
//   for(let i=0;i<this.REPORT_DATA.length;i++){
//     if(this.REPORT_DATA[i]['SM_NAME'] == this.USER_ROLE){
//       this.Values.push(Object.values(this.REPORT_DATA[i]));
//     }
//   }
//  }
   
    console.log(this.Values)
  }
updateclaimdiscount(){
  console.log(this.fromDate,this.toDate)
  this.userInfo = this.authService.getUserDetail();
  let fromDate = this.datepipe.transform(this.fromDate, "yyyy-MM-dd");
  let toDate = this.datepipe.transform(this.toDate, "yyyy-MM-dd");
  let data={
   
    "USER_ID": JSON.parse(this.userInfo).USER_ID,
    "CLAIMREQLIST":this.CLAIMREQLIST,
    "DISCOUNTREQLIST":this.DISCOUNTREQLIST,
    "LIST":this.DISCOUNTREQLIST.length==0?2:1
  }
  this.isLoaded = true;
  console.log('save data',JSON.stringify(data))

  this.http.postnew(this.url.ClAIMDISCOUNTUPDATE,data).then(
    (res:any)=>{
 
      if (res.data.FLAG == true) {
        this.isLoaded = false;
        this.toastrService.success(res.data.MSG)
        this.Header=[];
  this.Values=[];
  this.reportType="";
  this.ROLE="";
  this.USER_ROLE="";
  this.DISCOUNTREQLIST=[];
  this.CLAIMREQLIST=[];

      }
      if (res.data.FLAG == false) {
        this.toastrService.error(res.data.MSG)
      }
    },
    error =>{
      console.log(error);
      this.toastrService.error("Oops, Something went wrong.");
    }
  );
}
  

 
}

