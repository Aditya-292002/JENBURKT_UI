import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { AuthService } from 'src/app/Service/auth.service';
declare var $: any;
@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {
  isShowUserDetais: Boolean = false;
  display: boolean = false;
  menuList: any = [];
  menuData: any = {};
  userData: any = {};
  userName: string = "";
  roleName: string = "";
  roleID: any;
  salesRoleId: any = 0;
  customMenuArea: boolean;
  customMenuHQ: boolean;
  customMenuUser: boolean;
  customMenuUser_Password: boolean;
  customMenuProduct: boolean;
  customMenuDoctor: boolean;
  customMenuChemist: boolean;
  customMenuInvoice: boolean;
  customMenuITD: boolean;
  customMenuPool_To_Pool: boolean;
  customMenuUpload_Document: boolean;
  customMenuSample_Product: boolean;
  customMenuSample_Allocation: boolean;
  customMenuUpload_Sample_Stock: boolean;
  customMenuSample_Allocation_Approval: boolean;
  customMenuPrint_Invoice: boolean;
  customMenuSample_Invoice: boolean;
  customMenuDiscount_Request: boolean;
  customMenuDiscount_Approval: boolean;
  customMenuClaim_Request: boolean;
  customMenuClaim_Approval: boolean;
  customMenuClaim_Settlement: boolean;
  customMenuDownload: boolean;
  customMenuSales: boolean;
  customDivisionWiseMenuSales: boolean = false
  customMenuIncentive: boolean;
  customMenuExpense: boolean;
  customMenuClaim: boolean;
  customMenuDispatchedInvoiceDetails: boolean;
  customMenuInvoiceUpdateExpiry: boolean;
  finalClaim: boolean;
  UpdateClaim: boolean;
  PostCme: boolean;
  Requestcme: boolean;
  Paymentcme: boolean;
  Recoverycme: boolean;
  Requestapprovalcme: boolean;
  Approvalcme: boolean;
  CancelDiscountRequest: boolean;
  @Input() Menu_List: any;
  Product_Group_update: boolean;
  disocunt_claim_update: boolean;
  IsMoeReport: boolean;
  Discount_Details: boolean;
  Upload_Mkt_Report: boolean;
  IsMoeTargetReport: boolean
  Iscmereport: boolean;
  customMenuSample_Requisition: boolean;
  customMenuSample_Requisition_Approval: boolean;
  customMenuPMT_Sample_Requisition_Approval: boolean;
  customCycle_Sample_Requisition: boolean;
  customMenuAdobe_Requisition: boolean;
  customMenuSample_Adhoc_Approval:boolean
  customMenuSample_Received:boolean
  customMenuSample_Paymnet_excel_upload:boolean;
  customMenuSample_Document_PMT_Approval:boolean;
  customMenuSample_adhoc_pmt_approval:boolean;
  HQ_CODE:any;
  IS_LIVE:any
  constructor(private router: Router, private SharedService: SharedService, private AuthService: AuthService) {
    this.SharedService.isMenu.subscribe(state => this.menuList = state);
  }

  ngOnInit(): void {
    // this.IS_LIVE=this.AuthService.SAMPLEREQUISITIONISLIVE();
    $("#menu-toggle").click(function (e: any) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    this.menuData = this.AuthService.getMenuList();
    this.menuList = JSON.parse(this.menuData);
    this.userData = this.AuthService.getUserDetail();
    this.userName = JSON.parse(this.userData).EMPLOYEE_NAME;
        this.HQ_CODE = JSON.parse(this.userData).USER_NAME;
    this.roleName = JSON.parse(this.userData).ROLE_NAME;
    this.roleID = JSON.parse(this.userData).ROLE_ID;
    this.salesRoleId = JSON.parse(this.userData).SALESROLE_ID;
   // localStorage.getItem("IS_LIVE")
    //console.log('this.IS_LIVE',this.IS_LIVE);
    
  }
  menu_list = [
    {
      "FUNCTION_CODE": "F001",
      "FUNCTION_DESC": "Transaction",
      "URL": "",
      "SEQ_NO": "1",
      "ICON": "fa fa-cogs",
      "IS_SELECTED": 0,
      "SUBMENU_LIST": [{
        "FUNCTION_CODE": "F001",
        "SUB_FUNCTION_DESC": "Invoice Update",
        "URL": "",
        "SELECTOR": "",
        "SUB_SEQ_NO": "1",
        "IS_SUBSELECTED": 0
      }, {
        "FUNCTION_CODE": "F001",
        "SUB_FUNCTION_DESC": "ITD",
        "URL": "",
        "SELECTOR": "",
        "SUB_SEQ_NO": "2",
        "IS_SUBSELECTED": 0
      }, {
        "FUNCTION_CODE": "F001",
        "SUB_FUNCTION_DESC": "Pool to Pool",
        "URL": "",
        "SELECTOR": "",
        "SUB_SEQ_NO": "3",
        "IS_SUBSELECTED": 0
      },
      {
        "FUNCTION_CODE": "F001",
        "SUB_FUNCTION_DESC": "Upload MKT Report",
        "URL": "",
        "SELECTOR": "",
        "SUB_SEQ_NO": "4",
        "IS_SUBSELECTED": 0
      }],
    }, {
      "FUNCTION_CODE": "F002",
      "FUNCTION_DESC": "Download",
      "URL": "",
      "SEQ_NO": "2",
      "ICON": "fa fa-cogs",
      "IS_SELECTED": 0,
      "SUBMENU_LIST": [{
        "FUNCTION_CODE": "F002",
        "SUB_FUNCTION_DESC": "Download Report",
        "URL": "",
        "SELECTOR": "",
        "SUB_SEQ_NO": "4",
        "IS_SUBSELECTED": 0
      }
      ]
    },
  ]


  highLightSubMenu(menuCode: any, idx: any, subMenuDesc: any, Selector: any, URL: any) {
    this.menu_list[idx].IS_SELECTED = 0;
    for (let i = 0; i < this.menu_list.length; i++) {
      this.menu_list[i].IS_SELECTED = 0
      if (this.menu_list[i].FUNCTION_CODE == menuCode) {
        this.menu_list[i].IS_SELECTED = 1
      }
      // for (let j = 0; j < this.menu_list[i].SUBMENU_LIST.length; j++) {
      //   this.menu_list[i].SUBMENU_LIST[j].IS_SUBSELECTED = 0
      //   if (this.menu_list[i].SUBMENU_LIST[j].SUB_SEQ_NO == subMenuCode) {
      //     this.menu_list[i].SUBMENU_LIST[j].IS_SUBSELECTED = 1;
      //     this.router.navigate([`${this.menu_list[i].SUBMENU_LIST[j].URL}`]);
      //   }
      // }
    }
  }

  selectedSurveyMenuItem(idx: number) { }
  showUserDetails() {
    this.isShowUserDetais = !this.isShowUserDetais;
  }
  changePassword() {
    this.router.navigate(["/changepassword"]);
  }
  Logout() {
    localStorage.clear()
    this.router.navigate(["/login"]);
  }

  isSelectedMenu(data: any) {
    this.customMenuArea = false;
    this.customMenuHQ = false;
    this.customMenuUser = false;
    this.customMenuUser_Password = false;
    this.customMenuProduct = false;
    this.customMenuDoctor = false;
    this.customMenuChemist = false;
    this.customMenuInvoice = false;
    this.customMenuITD = false;
    this.customMenuPool_To_Pool = false;
    this.customMenuUpload_Document = false;
    this.customMenuSample_Product = false;
    this.customMenuSample_Allocation = false;
    this.customMenuUpload_Sample_Stock = false;
    this.customCycle_Sample_Requisition = false;
    this.customMenuSample_Allocation_Approval = false;
    this.customMenuSample_Requisition_Approval = false;
    this.customMenuPMT_Sample_Requisition_Approval = false;
    this.customMenuSample_Requisition = false;
    this.customMenuAdobe_Requisition = false;
    this.customMenuPrint_Invoice = false;
    this.customMenuSample_Invoice = false;
    this.customMenuSample_Adhoc_Approval=false;
    this.customMenuDiscount_Request = false;
    this.customMenuDiscount_Approval = false;
    this.customMenuClaim_Request = false;
    this.customMenuClaim_Approval = false;
    this.customMenuClaim_Settlement = false;
    this.customMenuDownload = false;
    this.customMenuSales = false;
    this.customDivisionWiseMenuSales = false;
    this.customMenuIncentive = false;
    this.customMenuExpense = false;
    this.customMenuClaim = false;
    this.customMenuDispatchedInvoiceDetails = false;
    this.customMenuInvoiceUpdateExpiry = false;
    this.finalClaim = false;
    this.UpdateClaim = false;
    this.PostCme = false;
    this.Requestcme = false;
    this.Paymentcme = false;
    this.Recoverycme = false;
    this.Requestapprovalcme = false;
    this.Product_Group_update = false;
    this.disocunt_claim_update = false;
    this.IsMoeReport = false;
    this.CancelDiscountRequest = false;
    this.UpdateClaim = false;
    this.PostCme = false;
    this.Requestcme = false;
    this.Paymentcme = false;
    this.Recoverycme = false;
    this.Requestapprovalcme = false;
    this.Approvalcme = false;
    this.Discount_Details = false;
    this.Upload_Mkt_Report = false
    this.customMenuSample_Received=false
   this.customMenuSample_Paymnet_excel_upload=false
   this.customMenuSample_Document_PMT_Approval=false
   this.customMenuSample_adhoc_pmt_approval=false
    this.IsMoeTargetReport = false;
    this.Iscmereport = false;
    if (data == 'Area') {
      this.customMenuArea = true;
    } else if (data == 'HQ') {
      this.customMenuHQ = true;
    } else if (data == 'User') {
      this.customMenuUser = true
    }
    else if (data == 'User_Password') {
      this.customMenuUser_Password = true
    } else if (data == 'Product') {
      this.customMenuProduct = true;
    } else if (data == 'Doctor') {
      this.customMenuDoctor = true;
    } else if (data == 'Chemist') {
      this.customMenuChemist = true;
    }
    else if (data == 'Invoice') {
      this.customMenuInvoice = true;
    } else if (data == 'ITD') {
      this.customMenuITD = true;
    } else if (data == 'Pool_To_Pool') {
      this.customMenuPool_To_Pool = true;
    } else if (data == 'Upload_Document') {
      this.customMenuUpload_Document = true;
    } else if (data == 'Sample_Product') {
      this.customMenuSample_Product = true;
    } else if (data == 'Sample_Allocation') {
      this.customMenuSample_Allocation = true;
    } else if (data == 'Upload_Sample_Stock') {
      this.customMenuUpload_Sample_Stock = true;
    } else if (data == 'Cycle_Sample_Requisition') {
      this.customCycle_Sample_Requisition = true;
    }else if (data == 'Sample_Requisition') {
      this.customMenuSample_Requisition = true;
    }
    else if (data == 'Adobe_Requisition') {
      this.customMenuAdobe_Requisition = true;
    } else if (data == 'Sample_Allocation_Approval') {
      this.customMenuSample_Allocation_Approval = true;
    } else if (data == 'Sample_Requisition_Approval') {
      this.customMenuSample_Requisition_Approval = true;
    } else if (data == 'PMT_Sample_Allocation_Approval') {
      this.customMenuPMT_Sample_Requisition_Approval = true;
    } else if (data == 'Print_Invoice') {
      this.customMenuPrint_Invoice = true;
    } else if (data == 'Sample_Invoice') {
      this.customMenuSample_Invoice = true;
    }else if (data == 'Adhoc_Approval') {
      this.customMenuSample_Adhoc_Approval = true;
    }
    else if (data == 'Discount_Request') {
      this.customMenuDiscount_Request = true;
    } else if (data == 'Discount_Approval') {
      this.customMenuDiscount_Approval = true;
      $("#wrapper").toggleClass("toggled");

    } else if (data == 'Claim_Request') {
      this.customMenuClaim_Request = true;
    } else if (data == 'Claim_Approval') {
      this.customMenuClaim_Approval = true;
    } else if (data == 'Claim_Settlement') {
      this.customMenuClaim_Settlement = true;
    } else if (data == 'Download') {
      this.customMenuDownload = true;
    } else if (data == 'Sales') {
      this.customMenuSales = true;
    } else if (data == 'DivisionSales') {
      this.customDivisionWiseMenuSales = true;
    }
    else if (data == 'Incentive') {
      this.customMenuIncentive = true;
    } else if (data == 'Expense') {
      this.customMenuExpense = true;
    } else if (data == 'Claim') {
      this.customMenuClaim = true;
    } else if (data == 'Update_Invoice_Dispatched_Details') {
      this.customMenuDispatchedInvoiceDetails = true;
    } else if (data == 'Invoice_Update_Expiry') {
      this.customMenuInvoiceUpdateExpiry = true;
    } else if (data == 'FinalClaim') {
      this.finalClaim = true;
    } else if (data == 'Product_Group_update') {
      this.Product_Group_update = true;
    }
    else if (data == 'disocunt_claim_update') {
      this.disocunt_claim_update = true;
    }
    else if (data == 'Moetargetreport') {
      this.IsMoeTargetReport = true;
    }
    else if (data == 'cmereport') {
      this.Iscmereport = true;
    }
    else if (data == 'UpdateClaim') {
      $("#wrapper").toggleClass("toggled");
      this.UpdateClaim = true;
    }
    else if (data == 'postcme') {
      this.PostCme = true;
    }
    else if (data == 'requestcme') {
      this.Requestcme = true;
    }
    else if (data == 'paymentcme') {
      this.Paymentcme = true;
    }
    else if (data == 'recoverycme') {
      this.Recoverycme = true;
    }
    else if (data == 'requestapprovalcme') {
      this.Requestapprovalcme = true;
    }
    else if (data == 'approvalcme') {
      this.Approvalcme = true;
    }
    else if (data == 'Cancel_Discount_Request') {
      this.CancelDiscountRequest = true;
    }
    else if (data == 'Discount_Details') {
      this.Discount_Details = true;
    } else if (data == 'Upload_Mkt_Report') {
      this.Upload_Mkt_Report = true;
    }
    else if (data == 'Sample_Received') {
      this.customMenuSample_Received = true;
    }
    else if (data == 'Paymnet_excel_upload') {
      this.customMenuSample_Paymnet_excel_upload = true;
    }
    else if (data=='Document_PMT_Approval'){
     this.customMenuSample_Document_PMT_Approval=true
    }
    else if (data == 'adhoc_pmt_approval') {
      this.customMenuSample_adhoc_pmt_approval = true;
    }
    // else{Upload_Mkt_Report
    //   this.customMenuClaim=false;
    // }

  }
}
