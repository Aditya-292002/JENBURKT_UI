import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { CommonService } from 'src/app/Service/common.service';
import { HttpService } from 'src/app/Service/http.Service';
import { URLService } from 'src/app/Service/url.service';

@Component({
  selector: 'app-print-cme',
  templateUrl: './print-cme.component.html',
  styleUrls: ['./print-cme.component.css']
})
export class PrintCmeComponent implements OnInit {
  // @ViewChild('PreviewPDF', { static: true }) PreviewPDF!: ElementRef;
  @ViewChild('PreviewPDF') PreviewPDF: ElementRef;
  CME_ID: any;
  userInfo: any = {};
  HQ_CODE_LIST: any = [];
  CME_TYPE_LIST: any = [];
  CAMP_TYPE_LIST: any = [];
  DOCUMENT_TYPE_LIST: any = [];
  ATTENDING_TEAM_LIST: any = [];
  BRAND_LIST: any = [];
  WHOM_TO_PAY_LIST: any = [];
  PROM_MAT_REQ_ITEM_LIST: any = [];
  SPEAKER_SPECIALIZATION_LIST: any = [];
  CME_DATE: any;
  CME_NO: any;
  HQ_CODE: any;
  CME_TYPE_ID: any;
  CAMP_TYPE_ID: any;
  InstName: boolean = false;
  INST_NAME: any;
  REQ_BY_USER_NAME: any;
  TOPIC: any;
  SPEAKER_NAME: any;
  SPEAKER_QUALIFICATION: any;
  SPEAKER_SPECIALIZATION_ID: any;
  VENUE: any;
  EXPECTED_DOCTORS: any;
  CME_DATE_FROM: any;
  CME_TO_DATE: any;
  CME_TIME_FROM: any;
  CME_TO_TIME: any;
  AMOUNT: any;
  GST: any;
  WHOM_TO_PAY_USER_ID: any;
  PAY_BY_DATE: any;
  isSlideDeckReqd: boolean = false;
  isArtWorkReqd: boolean = false;
  isAddvanceView: boolean = false;
  ADVANCE: any;
  AttendingDropdowns: any = [];
  BrandDropdowns: any = [];
  PromotionalMaterialReq: any = [];
  UPLOAD_DOCUMENT_LIST: any = [];
  HQ_DESC: any;
  CME_DESC: any;
  SPEAKER_SPECIALIZATION_NAME: any;
  WHOM_TO_PAY_USER_NAME: any;
  SLIDE_DEC_REQD_DESC: any;
  ART_WORK_REQD_DESC: any;
  ATTENDING_TEAM: any = [];
  BRANDS: any = [];
  PROM_MAT_REQ_ITEM: any = [];
  IS_ADVANCE_DESC: any;
  PROMOTION_MATERIAL_REQUEST: any = [{ ID: 1, REMARKS: '', QUANTITY: 0 }];
  ATTENDING_TEAM_DROPDOWN = [{ ID: 1, USER_ID: null }];
  BRANDS_DROPDOWN = [{ ID: 1, PRODUCT_CODE: null }];
  isLoaded: boolean = false;
  REQ_UPDATED_USER_DETAILS: any = [];
  base64PdfString: any = '';
  DIV_LIST:any = [];
  DIVISION_CODE:any;
  DIVISION_NAME:any;
  isWhomToPayView:any;

  constructor(private authService: AuthService, private url: URLService, private http: HttpService,
    private toastrService: ToastrService, private common: CommonService, public datePipe: DatePipe, private router: Router,public httpclient: HttpClient) {
  }

  ngOnInit(): void {
    this.userInfo = JSON.parse(this.authService.getUserDetail());
    this.CME_ID = localStorage.getItem("CME_ID");
    this.GETCMEMASTERLIST();
  }


  BackToForm() {
    this.router.navigate(['approvalcme']);
  }

  // DownloadPdf() {
  //   // var printContents = document.getElementById('PreviewPDF').innerHTML;
  //   // var originalContents = document.body.innerHTML;
  //   // document.body.innerHTML = printContents;
  //   // window.print();
  //   // window.location.reload();
  //   // document.body.innerHTML = originalContents;

  //   var data = document.getElementById('PreviewPDF');
  //   const contentToConvert = this.PreviewPDF.nativeElement;
  //   var html = contentToConvert.innerHTML;
  //   html = '<html>' + html + '</html>';
  //   let post_data = {
  //     data: html,
  //   };
  // //  console.log('pdf ->' ,JSON.stringify(post_data))
  //   // return;
  //   this.http.postnew(this.url.ConvertHtmlToBase64, post_data).then(
  //     (res: any) => {
  //       console.log('res ->' ,JSON.stringify(res))
  //       this.base64PdfString = res.Base64EncodedHtml;
  //       // console.log('base64PdfString ->' , this.base64PdfString)
  //       // return     
  //       const byteCharacters = atob(this.base64PdfString);
  //       const byteNumbers = new Array(byteCharacters.length);
  //       for (let i = 0; i < byteCharacters.length; i++) {
  //         byteNumbers[i] = byteCharacters.charCodeAt(i);
  //       }
  //       const byteArray = new Uint8Array(byteNumbers);

  //       // Create a Blob from the byte array
  //       const blob = new Blob([byteArray], { type: 'application/pdf' });

  //       // Create a link element to download the Blob
  //       const link = document.createElement('a');
  //       const url = window.URL.createObjectURL(blob);
  //       link.href = url;
  //       link.download = this.CME_NO;

  //       // Append the link to the body, click it, and then remove it
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);

  //       //  
  //       window.URL.revokeObjectURL(url);
  //       this.toastrService.success(this.CME_NO + ' ' + 'Pdf Downloaded Successfully')
  //     },
  //     (error) => {
  //       console.log('Oops, Something went wrong.', error);
  //     }
  //   );
  // }

  DownloadPdf() {
    // Step 1: Get the HTML content to convert into PDF
    const contentToConvert = this.PreviewPDF.nativeElement;
    let html = contentToConvert.innerHTML;
    html = '<html>' + html + '</html>'; // Wrap the content in proper HTML tags
  
    // Step 2: Prepare data for the POST request
    let post_data = { data: html };
  
    // Step 3: Send the request to convert HTML to Base64 PDF (or directly as PDF binary)
    this.httpclient.post(this.url.ConvertHtmlToBase64, post_data, { 
      responseType: 'blob'  // Specify the response type here in the options
    }).subscribe(
      (res: Blob) => {
        // Step 4: Process the PDF Blob
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(res);  // Create object URL for the Blob
        link.href = url;
        link.download = `${this.CME_NO}.pdf`;  // Use a file name for the download
  
        // Append the link, click it to trigger the download, and clean up
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        // Clean up object URL
        window.URL.revokeObjectURL(url);
  
        // Notify the user that the download is successful
        this.toastrService.success(`${this.CME_NO} PDF Downloaded Successfully`);
      },
      (error) => {
        // Handle any error in the process
        console.log('Oops, something went wrong.', error);
        this.toastrService.error('An error occurred while downloading the PDF.');
      }
    );
  }
  

  GETCMEMASTERLIST() {
    let data = {
      "USER_ID": this.userInfo.USER_ID
    }
    this.isLoaded = true;
    
    this.http.postnew(this.url.GETCMEMASTERLIST, data).then(
      (res: any) => {
         console.log('res ->' , res)
        this.HQ_CODE_LIST = res.HQ_CODE_LIST;
        this.CME_TYPE_LIST = res.CME_TYPE_LIST;
        this.CAMP_TYPE_LIST = res.CAMP_TYPE_LIST;
        this.DOCUMENT_TYPE_LIST = res.DOCUMENT_TYPE_LIST;
        this.ATTENDING_TEAM_LIST = res.CME_ATTENDING_LIST;
        this.BRAND_LIST = res.CME_BRANDS_LIST;
        this.WHOM_TO_PAY_LIST = res.WHOM_TO_PAY_LIST;
        this.PROM_MAT_REQ_ITEM_LIST = res.ITEM_LIST;
        this.SPEAKER_SPECIALIZATION_LIST = res.DOCTOR_SPECIALIZATION_LIST;
        this.DIV_LIST = res.DIV_LIST;
        this.isLoaded = false;
        this.GETCMEREQUESTDATABYCMENO();
      },
      error => {
        console.log(error);
        this.toastrService.error("Oops, Something went wrong.");
      }
    );
  }

  GETCMEREQUESTDATABYCMENO() {
    let data = {
      "USER_ID": this.userInfo.USER_ID,
      "CME_ID": this.CME_ID,
    }

    // this.isLoaded = true;
    this.http.postnew(this.url.GETCMEREQUESTDATABYCMENO, data).then((res: any) => {
      // console.log('res ->' , res )
      this.CME_DATE = this.datePipe.transform(res.CME_REQ_DETAILS[0].CME_DATE, 'dd-MM-yyyy');
      this.CME_ID = res.CME_REQ_DETAILS[0].CME_ID;
      this.CME_NO = res.CME_REQ_DETAILS[0].CME_NO;
      this.HQ_CODE = res.CME_REQ_DETAILS[0].HQ_CODE;
      this.HQ_DESC = res.CME_REQ_DETAILS[0].HQ_DESC;
      this.DIVISION_CODE = res.CME_REQ_DETAILS[0].DIVISION_CODE;
      this.DIVISION_NAME = res.CME_REQ_DETAILS[0].DIVISION_NAME;
      this.CME_TYPE_ID = res.CME_REQ_DETAILS[0].CME_TYPE;
      this.CAMP_TYPE_ID = res.CME_REQ_DETAILS[0].CAMP_TYPE;
      this.InstName = res.CME_REQ_DETAILS[0].IS_INSITUTION_NAME;
      this.REQ_BY_USER_NAME = res.CME_REQ_DETAILS[0].REQ_BY_USER_NAME;
      this.INST_NAME = res.CME_REQ_DETAILS[0].INST_NAME;
      this.TOPIC = res.CME_REQ_DETAILS[0].TOPIC;
      this.SPEAKER_NAME = res.CME_REQ_DETAILS[0].SPK_NAME;
      this.SPEAKER_QUALIFICATION = res.CME_REQ_DETAILS[0].SPK_QUALIFICATION;
      this.SPEAKER_SPECIALIZATION_ID = res.CME_REQ_DETAILS[0].SPK_SPECIALIZATION;
      this.VENUE = res.CME_REQ_DETAILS[0].VENUE;
      this.EXPECTED_DOCTORS = res.CME_REQ_DETAILS[0].EXPECTED_DOCTORS;
      this.CME_DATE_FROM = this.datePipe.transform(res.CME_REQ_DETAILS[0].DATE_FROM, 'dd-MM-yyyy');
      this.CME_TO_DATE = this.datePipe.transform(res.CME_REQ_DETAILS[0].DATE_TO, 'dd-MM-yyyy');
      this.formatDateBasedOnCmeTimeFrom(res.CME_REQ_DETAILS[0].TIME_FROM);
      this.formatDateBasedOnCmeToTimeFrom(res.CME_REQ_DETAILS[0].TIME_TO);
      this.AMOUNT = res.CME_REQ_DETAILS[0].AMOUNT;
      this.GST = res.CME_REQ_DETAILS[0].GST;
      this.WHOM_TO_PAY_USER_ID = res.CME_REQ_DETAILS[0].WHOM_TO_PAY;
      this.isWhomToPayView = res.CME_REQ_DETAILS[0].IS_WHOM_TO_PAY; 
      this.PAY_BY_DATE = this.datePipe.transform(res.CME_REQ_DETAILS[0].PAY_BY_DATE, 'dd-MM-yyyy');
      this.isSlideDeckReqd = res.CME_REQ_DETAILS[0].SLIDE_DECK_REQD;
      this.isArtWorkReqd = res.CME_REQ_DETAILS[0].ART_WORK_REQD;
      this.isAddvanceView = res.CME_REQ_DETAILS[0].IS_ADVANCE;
      this.ADVANCE = res.CME_REQ_DETAILS[0].ADVANCE;
      this.AttendingDropdowns = res.CME_ATTENDING_DETAILS;
      this.BrandDropdowns = res.CME_BRANDS_DETAILS;
      this.PromotionalMaterialReq = res.CME_PROM_MATERIAL_REQ_DETAILS;
      this.UPLOAD_DOCUMENT_LIST = res.CME_DOCUMENT_DETAILS;
      let SAMPEL_CME_REQ_UPDATED_USER_DETAILS = res.CME_REQ_UPDATED_USER_DETAILS;
      this.REQ_UPDATED_USER_DETAILS = this.transformData(SAMPEL_CME_REQ_UPDATED_USER_DETAILS)
      this.CME_TYPE_LIST.forEach((element: any) => {
        if (this.CME_TYPE_ID == element.CME_TYPE_ID) {
          this.CME_DESC = element.CME_DESC;
        }
      })
      this.SPEAKER_SPECIALIZATION_LIST.forEach((element: any) => {
        if (this.SPEAKER_SPECIALIZATION_ID == element.SPL_ID) {
          this.SPEAKER_SPECIALIZATION_NAME = element.SPL_DESCRIPTION;
        }
      })
      if(this.isWhomToPayView == 'U' || this.isWhomToPayView == ''){
      this.WHOM_TO_PAY_LIST.forEach((element: any) => {
        if (this.WHOM_TO_PAY_USER_ID == element.USER_ID) {
          this.WHOM_TO_PAY_USER_NAME = element.USER_NAME
        }
      })
      }else if(this.isWhomToPayView == 'O'){
      this.WHOM_TO_PAY_USER_NAME = res.CME_REQ_DETAILS[0].WHOM_TO_PAY_USER_NAME; 
      }
      if (this.isAddvanceView == true) {
        this.IS_ADVANCE_DESC = 'Yes'
      } else if (this.isAddvanceView == false) {
        this.IS_ADVANCE_DESC = 'No'
      }
      if (this.isSlideDeckReqd == true) {
        this.SLIDE_DEC_REQD_DESC = 'Yes'
      } else if (this.isSlideDeckReqd == false) {
        this.SLIDE_DEC_REQD_DESC = 'No'
      }
      if (this.isArtWorkReqd == true) {
        this.ART_WORK_REQD_DESC = 'Yes'
      } else if (this.isArtWorkReqd == false) {
        this.ART_WORK_REQD_DESC = 'No'
      }
      this.AttendingDropdowns.forEach((element: any) => {
        this.ATTENDING_TEAM = [];
        this.ATTENDING_TEAM_LIST.forEach((user: any) => {
          if (element.USER_ID == user.USER_ID) {
            this.ATTENDING_TEAM.push(user);
          }
        })
      })
      this.BrandDropdowns.forEach((element: any) => {
        this.BRANDS = [];
        this.BRAND_LIST.forEach((product: any) => {
          if (element.PRODUCT_CODE == product.PRODUCT_CODE) {
            this.BRANDS.push(product);
          }
        })
      })
      this.PromotionalMaterialReq.forEach((element: any) => {
        this.PROM_MAT_REQ_ITEM = [];
        this.PROM_MAT_REQ_ITEM_LIST.forEach((item: any) => {
          if (element.ITEM_ID == item.ITEM_ID) {
            const mergedObject = Object.assign({}, item, element);
            this.PROM_MAT_REQ_ITEM.push(mergedObject,);
          }
        })
      })
    });
    this.HQ_CODE_LIST.forEach((element: any) => {
      if (this.HQ_CODE == element.HQ_CODE) {
        this.HQ_DESC = element.HQ_DESC;
      }
    });
    // this.isLoaded = false;
  }


  formatDateBasedOnCmeTimeFrom(time: any) {
    if (time.length <= 8) {
      this.CME_TIME_FROM = time;
    } else if (time.length > 8) {
      this.CME_TIME_FROM = this.datePipe.transform(time, 'hh:mm a');
    }
  }

  formatDateBasedOnCmeToTimeFrom(time: any) {
    if (time.length <= 8) {
      this.CME_TO_TIME = time;
    } else if (time.length > 8) {
      this.CME_TO_TIME = this.datePipe.transform(time, 'hh:mm a');
    }
  }

  DownloadAttachment() {
    // console.log('UPLOAD_DOCUMENT_LIST ->' , this.UPLOAD_DOCUMENT_LIST)
    this.UPLOAD_DOCUMENT_LIST.forEach((element: any) => {
      let base64 = this.cleanBase64(element.FILE_BASE64);
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      if (element.FILE_EXTENSION == '.png') {
        var fileBlob = new Blob([byteArray], { type: 'image/png' }); // Change type for different image formats
      } else if (element.FILE_EXTENSION == '.jpg') {
        var fileBlob = new Blob([byteArray], { type: 'image/jpg' }); // Change type for different image formats
      } else if (element.FILE_EXTENSION == '.jpeg') {
        var fileBlob = new Blob([byteArray], { type: 'image/jpeg' }); // Change type for different image formats
      } else if (element.FILE_EXTENSION == '.pdf') {
        var fileBlob = new Blob([byteArray], { type: 'application/pdf' }); // Change type for different image formats
      }

      const fileURL = URL.createObjectURL(fileBlob);

      const a = document.createElement('a');
      a.href = fileURL;
      a.download = element.FILE_NAME; // Change filename for different image formats
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });

  }


  cleanBase64(base64String: string): string {
    // Remove data URI scheme and other unnecessary parts (e.g., data:image/png;base64,)
    const parts = base64String.split(',');
    if (parts.length > 1) {
      base64String = parts[1];
    } else {
      base64String = parts[0];
    }

    // Remove whitespace characters
    base64String = base64String.trim().replace(/\s+/g, '');

    // Add padding if necessary
    const missingPadding = base64String.length % 4;
    if (missingPadding !== 0) {
      base64String += '='.repeat(4 - missingPadding);
    }

    return base64String;
  }


  transformData(data: any): any[] {
    return [
      {
        role: 'RSM',
        userName: data[0].RSM_USER_NAME,
        updatedBy: data[0].RSM_UPDATED_BY,
        updatedOn: data[0].RSM_UPDATED_ON
      },
      {
        role: 'SM',
        userName: data[0].SM_USER_NAME,
        updatedBy: data[0].SM_UPDATED_BY,
        updatedOn: data[0].SM_UPDATED_ON
      },
      {
        role: 'PMT',
        userName: data[0].PMT_USER_NAME,
        updatedBy: data[0].PMT_UPDATED_BY,
        updatedOn: data[0].PMT_UPDATED_ON
      },
      {
        role: 'VP',
        userName: data[0].VP_USER_NAME,
        updatedBy: data[0].VP_UPDATED_BY,
        updatedOn: data[0].VP_UPDATED_ON
      }
    ];
  }

  

}
