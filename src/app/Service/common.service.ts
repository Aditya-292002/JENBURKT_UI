import { Injectable,Output,EventEmitter,ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';
import * as ExcelProper from 'exceljs/dist/exceljs.min.js'

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userid: any;
  tabList:any = []
  index = 0;
  activeId:any = 0;
  customerData:any = [];
  userData:any = [];
  roleData:any = [];
  isClearData= new BehaviorSubject("");
  isClearCustomerData= new BehaviorSubject("");
  isGridPopUp= new BehaviorSubject(false);
  isPopUp= new BehaviorSubject(false);
  showForm= new BehaviorSubject("");
  showFormUrl= new BehaviorSubject("");
  formUrl= new BehaviorSubject("");
  gridDataSetValue= new BehaviorSubject("");
  gridDataUserSetValue = new BehaviorSubject("");

  constructor(private router:Router) {
  }

  addTabs(path:any,index:any,selector:any,URL:any){
    for(let i=0;i<this.tabList.length;i++){
      if(this.tabList[i].path == path){
        return [];
      }
    }
    console.log(this.tabList.length,"this.tabList.length")
    if(this.tabList.length <= 1){
      this.activeId = index
      this.tabList.push({ title: path, fragment: index, path:  path,show: true,Selector : selector, URL:URL})
    }
    console.log(this.tabList,"list")
    return this.tabList;
  }

  deleteTab(path:any,index:any,data:any){
    console.log("Data of Tab",data)
    if(data.fragment == "4"){
      this.isClearData.next("C")
    }
    else if(data.fragment == "3"){
      this.isClearData.next("U")
    }
    else if(data.fragment == "2"){
      this.isClearData.next("R")
    }
    this.tabList.splice(index,1)
  }

  getActiveItem(){
    if(this.tabList.length <= 2){
      console.log(this.activeId,'this.activeId')
      this.tabList.forEach((element:any) => {
        if(element.fragment == this.activeId ){
          this.isClearCustomerData.next(element.Selector)
        }
      });
    }
    return this.activeId;
  }

  
isValid(inputValue: any): boolean {
  if (inputValue == '' || inputValue == undefined || inputValue == 'undefined')   
  {
    return false;
  } else {
    return true;
  }
}

  sendData(data:any){
    // console.log(data,"send")
    this.customerData = data
  }
  getData(){
    return this.customerData;
  }

  sendUserData(data:any){
    // console.log(data,"send")
    this.userData = data
  }
  getUserData(){
    return this.userData;
  }

  sendRoleData(data:any){
    // console.log(data,"send")
    this.roleData = data
  }
  getRoleData(){
    return this.roleData;
  }
  getGridListData() {
    return localStorage.getItem("GridListData");
  }
  setGridListData(val:any){
    localStorage.setItem("GridListData", val)
  }

  isLoggedIn() {
    // this.userid = localStorage.getItem("UserID")
 //  this.userid = 1;
   var userDetails:any = {}
   userDetails = JSON.parse(localStorage.getItem("UserID"));
   this.userid = userDetails?.USER_ID;



    //console.log('this.getUserInfo()',this.checkUserInfo())
    //console.log('Parse this.getUserInfo()',JSON.parse(this.checkUserInfo()))
    if(this.userid === null){
      //console.log('if(this.getUserInfo() == null){')
      return false;
    }
    if(this.userid === ''){
      //console.log('2nd if(this.getUserInfo() == {}){')
      return false;
    }
    if(this.userid == undefined){
      //console.log('2nd if(this.getUserInfo() == {}){')
      return false;
    }
    else{

      //console.log('last else')
      return true; //this.getUserInfo()
    }

    //return this.getToken() !== null;
  }


  exportExcel(exportableObj:any){
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(exportableObj);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Sales Report");
    });


  }
  saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  let EXCEL_EXTENSION = ".xlsx";
  const data: Blob = new Blob([buffer], {
    type: EXCEL_TYPE
  });
  FileSaver.saveAs(
    data,
    fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
  );
}



public exportFormatedAsExcel(json: any[], excelFileName: String,fmdata:any, superStockistName:String , fromDate:String,toDate:String): void {    
    
  const data = json;
  let workbook: ExcelProper.Workbook = new ExcelProper.Workbook();
  let worksheet = workbook.addWorksheet(excelFileName.toString());

  //Add Image
  // let myLogoImage = workbook.addImage({
  //   base64: logo.logo_base64,
  //   extension: 'png',
  // });
 // worksheet.mergeCells('A1:B4');
//  const txt1 = [
//   { value: 'Merged Value 1' },
//   { value: 'Merged Value 2' },
//   { value: 'Merged Value 3' },
//   // Add more rows as needed
// ];
// worksheet.getCell('A1').value = txt1[0].value;
// worksheet.getCell('A2').value = txt1[1].value;
//worksheet.mergeCells('A1:A3');

//  for (let i = 0; i < txt1.length; i += 3) {
//   const row = worksheet.addRow([txt1[i].col1, txt1[i].col2, txt1[i].col3]);
//   if (i + 2 < txt1.length) {
//     worksheet.mergeCells(`A${row.number}:A${row.number + 2}`);
//     worksheet.mergeCells(`B${row.number}:B${row.number + 2}`);
//     worksheet.mergeCells(`C${row.number}:C${row.number + 2}`);
//   }
// }
  worksheet.mergeCells('A1:O1');
  worksheet.getCell('A1').value = 'Invoice Date '+fromDate+' To '+toDate+'';
  worksheet.getCell('A1').alignment = { horizontal:'center'} ;
  worksheet.getCell('A1').font = { bold: true }

  worksheet.mergeCells('A2:O2');
  worksheet.getCell('A2').value = 'Negotiated Discount Evaluation- '+superStockistName+'';
  worksheet.getCell('A2').alignment = { horizontal:'center'} ;
  worksheet.getCell('A2').font = { bold: true ,color: {argb: "FFFF0000"}}

  
  // worksheet.mergeCells('A3:B3');
  worksheet.getCell('A3').value = 'FM Headquarter:';
 // worksheet.getCell('A2').alignment = { horizontal:'center'} ;
  worksheet.getCell('A3').font = { bold: true }

 // worksheet.mergeCells('D3:E3');
  worksheet.getCell('B3').value = ''+fmdata.FM_CODE+'';
  worksheet.getCell('B3').alignment = { horizontal:'center'} ;
  worksheet.getCell('B3').font = { bold: true ,color: {argb: "FFFF0000"}}

  worksheet.getCell('C3').value = ''+fmdata.FM_NAME+'';
  worksheet.getCell('C3').alignment = { horizontal:'center'} ;
  worksheet.getCell('C3').font = { bold: true ,color: {argb: "FFFF0000"}}

  // worksheet.mergeCells('F3:G3');
  worksheet.getCell('F3').value = 'RSM Headquarter:';
 // worksheet.getCell('A2').alignment = { horizontal:'center'} ;
  worksheet.getCell('F3').font = { bold: true }

  // worksheet.mergeCells('H3:I3');
  worksheet.getCell('G3').value = ''+fmdata.RSM_CODE+'';
  worksheet.getCell('G3').alignment = { horizontal:'center'} ;
  worksheet.getCell('G3').font = { bold: true ,color: {argb: "FFFF0000"}}

  worksheet.getCell('H3').value = ''+fmdata.RSM_NAME+'';
  worksheet.getCell('H3').alignment = { horizontal:'center'} ;
  worksheet.getCell('H3').font = { bold: true ,color: {argb: "FFFF0000"}}


  // worksheet.mergeCells('J3');
  worksheet.getCell('J3').value = 'SM Headquarter:';
 // worksheet.getCell('A2').alignment = { horizontal:'center'} ;
  worksheet.getCell('J3').font = { bold: true }

 // worksheet.mergeCells('K3:O3');
  worksheet.getCell('K3').value =  ''+fmdata.SM_CODE+'';
  worksheet.getCell('K3').alignment = { horizontal:'center'} ;
  worksheet.getCell('K3').font = { bold: true ,color: {argb: "FFFF0000"}}

  worksheet.getCell('L3').value =  ''+fmdata.SM_NAME+'';
  worksheet.getCell('L3').alignment = { horizontal:'center'} ;
  worksheet.getCell('L3').font = { bold: true ,color: {argb: "FFFF0000"}}


  //  worksheet.mergeCells('A4:C4');
  worksheet.getCell('A4').value = 'FM Signature:';
 // worksheet.getCell('A4').alignment = { horizontal:'center'} ;
  worksheet.getCell('A4').font = { bold: true }

  
  worksheet.mergeCells('B4:C4');
  worksheet.getCell('B4').value = '';

  // worksheet.mergeCells('D4:E4');
  // worksheet.getCell('D4').value = '';

  // worksheet.mergeCells('F4:G4');
  worksheet.getCell('F4').value = 'RSM Signature:';
  // worksheet.getCell('F4').alignment = { horizontal:'center'} ;
  worksheet.getCell('F4').font = { bold: true }

  worksheet.mergeCells('G4:H4');
  worksheet.getCell('G4').value = '';

  
  // worksheet.mergeCells('J3');
  worksheet.getCell('J4').value = 'SM Signature:';
 // worksheet.getCell('A2').alignment = { horizontal:'center'} ;
  worksheet.getCell('J4').font = { bold: true }

  worksheet.mergeCells('K4:L4');
  worksheet.getCell('K4').value = '';

  
  worksheet.mergeCells('A5:O5');
  worksheet.getCell('A5').value = 'Remarks: ';
  worksheet.getCell('A5').font = { bold: true ,color: {argb: "FFFF0000"}}



//   worksheet.mergeCells('A5:O5');
//   worksheet.getCell('A5').value = 'Remarks: <Please keep this row blank>';
  // worksheet.getCell('A2').value = 'Financials for the year 2023';
  // worksheet.getCell('A3').value = 'Combined Trial Balance upto May 2023';
  // worksheet.getCell('A2').font = { bold: true }
  // worksheet.getCell('A3').font = { bold: true }

  // worksheet.addImage(myLogoImage, 'A1:B4');

  // Set font, size and style in title row.
  //titleRow.font = { name: 'Roboto', family: 4, size: 16, underline: 'double', bold: true };

  // worksheet.mergeCells('C2:G4');
  // worksheet.getCell('C2').value = title.toString();
  // worksheet.getCell('C2').alignment = { horizontal:'center'} ;
  // worksheet.getCell('C2').font = { name: 'Roboto', family: 4, size: 16, underline: 'double', bold: true };
   //Add row with current date
  //  if(ReportDate != "")
  //  {
  //    let subTitleRow = worksheet.addRow(['Date : ' + ReportDate]);
  //  }

  // Blank Row
  worksheet.addRow([]);

  const header = Object.keys(data[0])
   let headerRow = worksheet.addRow(header);
   // Cell Style : Fill and Border

   headerRow.eachCell((cell:any, number:any) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'c8ced3' },
      // bgColor: { argb: 'c8ced3' },
    }

    cell.font = { name: 'Calibri', bold: true }
    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    cell.alignment = { vertical: 'middle',horizontal:'center', wrapText: true };
    
  });


  for (let i = 1; i <= header.length; i++) {
    const col = worksheet.getColumn(i)
    const width = 20;
    if (width) {
      col.width = width +1;
    }
  }
   // Add Json to row
  data.forEach(d => {
    let row = worksheet.addRow(Object.values(d))      
    row.font = { name: 'Calibri' }    
    
    row.eachCell((cell:any,number:any) =>{
      let cell_num = (number*1)-1;
      // if(header[cell_num].indexOf("Date") >=0 && cell.value)
      // {         
      //   cell.value = this.convertUTCDateToLocalDate(cell.value.toLocaleString());
      //   //cell.numFmt = 'm/d/yyyy\\ h:mm:ss\\ AM/PM';
      // }
       if(cell.value && this.isNumber(cell.value) )
      {
        cell.value = Number(cell.value);
      }
     

      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    })
      
  });

// worksheet.mergeCells('A1:D2');
  workbook.xlsx.writeBuffer().then((data:any) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob,  excelFileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });

}



convertUTCDateToLocalDate(date:any) {
    
  try{
    date = new Date(date);
    var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
  }
  catch(error)
  {
    newDate = date;
  }
 

  return newDate;   
}

isInt(n:any){
  return Number(n) === n && n % 1 === 0;
}
isFloat(n:any){
    return Number(n) === n && n % 1 !== 0;
}
isNumber(n:any){
  if (!(isNaN(Number(n)))){
      return true
  }
  return false;
}









 }



