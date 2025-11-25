import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


import html2canvas from 'html2canvas';
//declare var html2pdf: any;
 import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-final-claim-report',
  templateUrl: './final-claim-report.component.html',
  styleUrls: ['./final-claim-report.component.css']
})
export class FinalClaimReportComponent implements OnInit {
  
  onShowGrid:boolean = false;showTable = true;
  reportGrid:any = [];
  fromDate:any = new Date();isLoaded: boolean;
;
  toDate:any = new Date();
  userInfo:any = {};
  superStockist:any;
  superStockistList:any = [];
  FM_LIST:any = [];
  FM:any;
  reportType:any = '';
  Values:any = [];
  Header:any = [];
  REPORT_HEADERS:any = [];
  REPORT_DATA:any = [];
  superStockistName:any = "";
  userDetails:any = {}
  REPORT_HEADERS_save = [
    { Column_Header: 'SrNo' },
    { Column_Header: 'Claim No.' },
    { Column_Header: 'Claim Date' },
    { Column_Header: 'Head Quarter Code' },
    { Column_Header: 'Head Quarter Name' },
    { Column_Header: 'Stockist Name' },
    { Column_Header: 'Invoice No.' },
    { Column_Header: 'Invoice Date' },
    { Column_Header: 'Chemist/Hospital Name' },
    { Column_Header: 'Doctor Name' },
    { Column_Header: 'Product Name' },
    { Column_Header: 'Approved Sale Quantity' },
    { Column_Header: 'Trade Discount Qty' },
    { Column_Header: 'Negotiated Discount Quantity' },
    { Column_Header: 'MRP' },
    { Column_Header: 'DISC' }
  ];
  constructor(private commonService:CommonService,private authService:AuthService,private datepipe:DatePipe,private url:URLService,
    private http:HttpService,private toastrService:ToastrService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getMasterData();
    this.userDetails = JSON.parse(this.authService.getUserDetail());
  }

  getMasterData(){
    this.userInfo = this.authService.getUserDetail();

    let data={
      "USER_ID": JSON.parse(this.userInfo).USER_ID,
    }

  
    this.http.postnew(this.url.GETCLAIMMASTERDATAFORREPORT,data).then(
      (res:any)=>{

        this.superStockistList = res.SUPER_STOCKIST_LIST
        this.FM_LIST = res.FM_LIST

      },
      error =>{
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }
  exportExcel(){
   // this.commonService.exportExcel(this.reportGrid.v_detail)
   this.superStockistName  = '';
   for(let i =0 ;i<this.superStockistList.length;i++){
    if(this.superStockistList[i].SUPERSTOCKIST_CODE == this.superStockist){
      this.superStockistName = this.superStockistList[i].SUPERSTOCKIST_NAME
    }
   }

   if(this.REPORT_DATA.length == 0){
    this.toastrService.error("No Records Found")
    return;
   }

   let fromDate = this.datepipe.transform(this.fromDate, "dd-MM-yyyy");
   let toDate = this.datepipe.transform(this.toDate, "dd-MM-yyyy");
    this.commonService.exportFormatedAsExcel(this.REPORT_DATA,'_report_',this.FM,this.superStockistName,fromDate,toDate)
  }

  onViewReport(){
    if(this.superStockist == undefined || this.superStockist == ''){
      this.toastrService.error("Please select Super Stockist")
      return;
    }
    if(this.FM == undefined || this.FM == ''){
      this.toastrService.error("Please select FM")
      return;
    }

    this.userInfo = this.authService.getUserDetail();
    let fromDate = this.datepipe.transform(this.fromDate, "yyyy-MM-dd");
    let toDate = this.datepipe.transform(this.toDate, "yyyy-MM-dd");
    let data={
      "FROM_DATE":fromDate,
      "TO_DATE":toDate,
      "SUPER_STOCKIST_CODE":this.superStockist,
      "FM":this.FM.FM_CODE,
      "USER_ID": JSON.parse(this.userInfo).USER_ID,
    }
     this.isLoaded= true;
    this.http.postnew(this.url.GETFINALCLAIMREPORT,data).then(
      (res:any)=>{
        this.Values=[];
        this.Header = [];
        this.isLoaded= false;
       this.REPORT_DATA = [];
       this.REPORT_DATA = res.REPORT_DATA
       this.REPORT_HEADERS = res.REPORT_HEADERS
       this.reportGrid = [];
       this.reportGrid.v_header = res.REPORT_HEADERS
       this.reportGrid.v_detail = res.REPORT_DATA

       if(this.REPORT_DATA.length == 0){
        this.toastrService.error("No Records Found")
       }

       this.REPORT_DATA.forEach((element:any)=> {
        this.Header=Object.keys(element)
        // element.CLAIM_DATE = this.datepipe.transform(element.CLAIM_DATE, "dd-MM-yyyy")
        // element.INVOICE_DATE = this.datepipe.transform(element.INVOICE_DATE, "dd-MM-yyyy")
        
        element["Claim Date"] = (this.datepipe.transform(element["Claim Date"], "dd-MM-yyyy")).toString()
        element["Invoice Date"] = (this.datepipe.transform(element["Invoice Date"], "dd-MM-yyyy")).toString()
        this.Values.push(Object.values(element))

        for(let i =0 ;i<this.superStockistList.length;i++){
          if(this.superStockistList[i].SUPERSTOCKIST_CODE == this.superStockist){
            this.superStockistName = this.superStockistList[i].SUPERSTOCKIST_NAME
          }
         }
      
       });
      this.onShowGrid=true;
      },
      error =>{
        this.isLoaded= false;
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  printReport(divName:any){
    this.superStockistName  = '';
   
    if(this.REPORT_DATA.length == 0){
     this.toastrService.error("No Records Found")
     return;
    }
    var printContents = document.getElementById(divName).innerHTML;
    // var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();
    window.location.reload();

    // document.body.innerHTML = originalContents;
  }
splitIntoPages(data: any[], rowsPerPage: number) {
  const pages = [];
  for (let i = 0; i < data.length; i += rowsPerPage) {
    pages.push(data.slice(i, i + rowsPerPage));
  }
  return pages;
}

async printReport1(divName: string) {

  this.isLoaded = true;

  if (!this.REPORT_DATA || this.REPORT_DATA.length === 0) {
    this.isLoaded = false;
    this.toastrService.error('No Records Found');
    return;
  }

  const element = document.getElementById(divName);
  if (!element) {
    this.isLoaded = false;
    return;
  }

  // ---------------------------------------------------
  // FIX 1 — Force stable desktop layout (even in mobile mode)
  // ---------------------------------------------------
  const originalWidth = element.style.width;
  element.style.width = "1400px";       // Force desktop width

  // FIXED: TypeScript-safe zoom
  document.documentElement.style.setProperty("zoom", "1");
  document.body.style.setProperty("zoom", "1");

  // ---------------------------------------------------
  // FIX 2 — Fix devicePixelRatio issues in mobile emulation
  // ---------------------------------------------------
  const originalDPR = window.devicePixelRatio;
  Object.defineProperty(window, "devicePixelRatio", {
    get: () => 1
  });

  element.hidden = false;
  element.style.display = "block";

  // Wait DOM refresh
  this.cdr.detectChanges();
  await new Promise(res => setTimeout(res, 200));

  // ---------------------------------------------------
  // FIX 3 — Force html2canvas to capture at desktop width
  // ---------------------------------------------------
  const fullCanvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    windowWidth: 1400,
    windowHeight: element.scrollHeight,
  });

  // Restore DPR
  Object.defineProperty(window, "devicePixelRatio", {
    get: () => originalDPR
  });

  // ---------------------------------------------------
  // PDF GENERATION
  // ---------------------------------------------------
  const pdf = new jsPDF({
    unit: "mm",
    format: "a4",
    orientation: "landscape",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const topMargin = 10;
  const bottomMargin = 10;
  const sideMargin = 10;

  const usableWidth = pageWidth - sideMargin * 2;
  const usableHeight = pageHeight - topMargin - bottomMargin;

  const canvasWidth = fullCanvas.width;
  const canvasHeight = fullCanvas.height;

  const ratio = canvasWidth / usableWidth;
  const viewportHeightPx = usableHeight * ratio;

  let currentY = 0;

  while (currentY < canvasHeight) {

    const remainingPx = canvasHeight - currentY;
    const sliceHeightPx = Math.min(viewportHeightPx, remainingPx);

    const sliceCanvas = document.createElement("canvas");
    sliceCanvas.width = canvasWidth;
    sliceCanvas.height = sliceHeightPx;

    const sliceCtx = sliceCanvas.getContext("2d");
    sliceCtx.drawImage(
      fullCanvas,
      0,
      currentY,
      canvasWidth,
      sliceHeightPx,
      0,
      0,
      canvasWidth,
      sliceHeightPx
    );

    const imgData = sliceCanvas.toDataURL("image/jpeg", 1);
    const sliceHeightMM = sliceHeightPx / ratio;

    pdf.addImage(
      imgData,
      "JPEG",
      sideMargin,
      topMargin,
      usableWidth,
      sliceHeightMM
    );

    currentY += sliceHeightPx;

    if (currentY < canvasHeight) pdf.addPage();
  }

  pdf.save("Final_Claim_Report.pdf");

  // Restore original styles
  element.style.width = originalWidth;
  element.hidden = true;

  this.isLoaded = false;
}

// async printReport1(divName: string) {
//   this.isLoaded= true;
//   if (!this.REPORT_DATA || this.REPORT_DATA.length === 0) {
//       this.isLoaded= false;
//     this.toastrService.error('No Records Found');
//     return;
//   }

//   const element = document.getElementById(divName);
//   if (!element) {
//     this.isLoaded= false;
//     return;
//   }

//   element.hidden = false;
//   element.style.display = 'block';

//   const pdf = new jsPDF({
//     unit: 'mm',
//     format: 'a4',
//     orientation: 'landscape',
//   });

//   // Wait for DOM render
//   this.cdr.detectChanges();
//   await new Promise(res => setTimeout(res, 200));

//   const fullCanvas = await html2canvas(element, {
//     scale: 2,
//     useCORS: true,
//     backgroundColor: '#ffffff',
//   });

//   const pageWidth = pdf.internal.pageSize.getWidth();
//   const pageHeight = pdf.internal.pageSize.getHeight();

//   // Margins
//   const topMargin = 10;
//   const bottomMargin = 10;
//   const sideMargin = 10;

//   // Usable PDF area (inside margins)
//   const usableWidth = pageWidth - sideMargin * 2;
//   const usableHeight = pageHeight - topMargin - bottomMargin;

//   // Canvas size
//   const canvasWidth = fullCanvas.width;
//   const canvasHeight = fullCanvas.height;

//   // Ratio for mm ↔ px conversion
//   const ratio = canvasWidth / usableWidth;

//   // Height of one PDF page slice in px
//   const viewportHeightPx = usableHeight * ratio;

//   let currentY = 0;

//   while (currentY < canvasHeight) {

//     // Remaining px in source canvas
//     const remainingPx = canvasHeight - currentY;

//     // The slice’s height must NOT exceed the remaining px (fixes black area)
//     const sliceHeightPx = Math.min(viewportHeightPx, remainingPx);

//     // Prepare slice canvas
//     const sliceCanvas = document.createElement("canvas");
//     sliceCanvas.width = canvasWidth;
//     sliceCanvas.height = sliceHeightPx;

//     const sliceCtx = sliceCanvas.getContext("2d");

//     // Draw only the valid remaining part
//     sliceCtx.drawImage(
//       fullCanvas,
//       0,              // source x
//       currentY,       // source y
//       canvasWidth,    
//       sliceHeightPx,  // source height
//       0,              // destination x
//       0,              // destination y
//       canvasWidth,    
//       sliceHeightPx
//     );

//     const imgData = sliceCanvas.toDataURL("image/jpeg", 1);

//     // Convert slice height to mm
//     const sliceHeightMM = sliceHeightPx / ratio;

//     pdf.addImage(
//       imgData,
//       "JPEG",
//       sideMargin,      // Left margin
//       topMargin,       // Top margin
//       usableWidth,
//       sliceHeightMM
//     );

//     currentY += sliceHeightPx;

//     if (currentY < canvasHeight) pdf.addPage();
//   }

//   pdf.save("Final_Claim_Report.pdf");

//   element.hidden = true;
//   this.isLoaded= false;
// }




// async printReport1(divName: string) {
//   if (!this.REPORT_DATA || this.REPORT_DATA.length === 0) {
//     this.toastrService.error('No Records Found');
//     return;
//   }

//   const element = document.getElementById(divName);
//   if (!element) return;

//   element.hidden = false;
//   element.style.display = 'block';

//   const pdf = new jsPDF({
//     unit: 'mm',
//     format: 'a4',
//     orientation: 'landscape',
//   });

//   // Ensure DOM is updated before capturing
//   this.cdr.detectChanges();
//   await new Promise(res => setTimeout(res, 200));

//   const canvas = await html2canvas(element, {
//     scale: 2,
//     useCORS: true,
//     scrollX: 0,
//     scrollY: 0,
//     backgroundColor: '#ffffff'
//   });

//   const imgData = canvas.toDataURL('image/jpeg', 1);
//   const pdfWidth = pdf.internal.pageSize.getWidth();
//   const pdfHeight = pdf.internal.pageSize.getHeight();

//   const imgProps = pdf.getImageProperties(imgData);
//   const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

//   let heightLeft = imgHeight;
//   let position = 0;

//   // Add first page
//   pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
//   heightLeft -= pdfHeight;

//   // Add extra pages if needed
//   while (heightLeft > 0) {
//     pdf.addPage();
//     position -= pdfHeight;
//     pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
//     heightLeft -= pdfHeight;
//   }

//   pdf.save('report.pdf');

//   element.hidden = true;
// }


// async printReport1(divName: string) {
//   if (!this.REPORT_DATA || this.REPORT_DATA.length === 0) {
//     this.toastrService.error('No Records Found');
//     return;
//   }

//   const element = document.getElementById(divName);
//   if (!element) return;

//   element.hidden = false;
//   element.style.display = 'block';

//   const pdf = new jsPDF({
//     unit: 'mm',
//     format: 'a4',
//     orientation: 'landscape',
//   });

//   const rowsPerPage = 25;
//   const pages = this.splitIntoPages([...this.REPORT_DATA], rowsPerPage);

//   for (let p = 0; p < pages.length; p++) {

//     // Step 1: Hide table so Angular destroys it
//     this.showTable = false;
//     this.cdr.detectChanges();

//     // Step 2: Apply page data
//     this.REPORT_DATA = pages[p];

//     // Step 3: Show table again (fresh DOM)
//     this.showTable = true;
//     this.cdr.detectChanges();

//     await new Promise(res => setTimeout(res, 150));  // Wait for DOM paint

//     // Step 4: Capture
//     const canvas = await html2canvas(element, {
//       scale: 2,
//       useCORS: true,
//       scrollX: 0,
//       scrollY: 0,
//       backgroundColor: '#ffffff',
//       width: element.scrollWidth,
//       windowWidth: element.scrollWidth,
//     });

//     const imgData = canvas.toDataURL('image/jpeg', 1);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const imgProps = pdf.getImageProperties(imgData);
//     const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     if (p !== 0) pdf.addPage();
//     pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeight);
//   }

//   pdf.save('report.pdf');
//   element.hidden = true;
// }








// printReport1(divName: string) {
//   this.superStockistName = '';

//   if (this.REPORT_DATA.length === 0) {
//     this.toastrService.error('No Records Found');
//     return;
//   }

//   const element = document.getElementById(divName);
//   if (!element) return;

//   // Temporarily show the element
//   element.hidden = false;
//   element.style.display = 'block';
//   element.style.background = 'white';

//   setTimeout(() => {
//     const options = {
//       margin: 10,
//       filename: 'report.pdf',
//       image: { type: 'jpeg', quality: 1 },
//       html2canvas: { scale: 2, useCORS: true, logging: true },
// jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' }

//     };

//     (html2pdf as any)()
//       .set(options)
//       .from(element)
//       .save()
//       .finally(() => {
//         // Hide the element again
//         element.hidden = true;
//       });
//   }, 300); // Wait a moment for Angular to render
// }
// async printReport1(divName: string) {
//   if (!this.REPORT_DATA || this.REPORT_DATA.length === 0) {
//     this.toastrService.error('No Records Found');
//     return;
//   }

//   const element = document.getElementById(divName);
//   if (!element) return;

//   element.hidden = false;
//   element.style.display = 'block';

//   const pdf = new jsPDF({
//     unit: 'mm',
//     format: 'a4',
//     orientation: 'landscape',
//   });

//   // 🔥 Wait for DOM to fully render
//   this.cdr.detectChanges();
//   await new Promise(res => setTimeout(res, 150));

//   const canvas = await html2canvas(element, {
//     scale: 2,
//     useCORS: true,
//     scrollX: 0,
//     scrollY: 0,
//     backgroundColor: '#ffffff',
//     width: element.scrollWidth,
//     windowWidth: element.scrollWidth,
//   });

//   const imgData = canvas.toDataURL('image/jpeg', 1);
//   const pdfWidth = pdf.internal.pageSize.getWidth();
//   const imgProps = pdf.getImageProperties(imgData);
//   const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

//   // 📝 If image is taller than one page—automatically split
//   let y = 0;
//   let remainingHeight = imgHeight;

//   while (remainingHeight > 0) {
//     pdf.addImage(imgData, 'JPEG', 0, y, pdfWidth, imgHeight);

//     remainingHeight -= pdf.internal.pageSize.getHeight();
//     if (remainingHeight > 0) pdf.addPage();

//     y -= pdf.internal.pageSize.getHeight();
//   }

//   pdf.save('report.pdf');

//   element.hidden = true;
// }

}


