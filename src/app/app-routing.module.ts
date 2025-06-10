import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordPageComponent } from './Common/change-password-page/change-password-page.component';
import { DashboardComponent } from './Common/dashboard/dashboard.component';
import { LayoutPageComponent } from './Common/layout-page/layout-page.component';
import { LoginComponent } from './Common/login/login.component';
import { AreaMasterComponent } from './Forms/area-master/area-master.component';
import { DownloadReportsComponent } from './Forms/download-reports/download-reports.component';
import { EditInvoiceComponent } from './Forms/edit-invoice/edit-invoice.component';
import { ExpeneseReportComponent } from './Forms/expenese-report/expenese-report.component';
import { GenerateInvoiceComponent } from './Forms/generate-invoice/generate-invoice.component';
import { HqMasterComponent } from './Forms/hq-master/hq-master.component';
import { IncentiveReportComponent } from './Forms/incentive-report/incentive-report.component';
import { InvoiceUpdateComponent } from './Forms/invoice-update/invoice-update.component';
import { ItdComponent } from './Forms/itd/itd.component';
import { PoolToPoolComponent } from './Forms/pool-to-pool/pool-to-pool.component';
import { PrintInvoiceComponent } from './Forms/print-invoice/print-invoice.component';
import { ProductDetailsComponent } from './Forms/product-details/product-details.component';
import { ProductComponent } from './Forms/product/product.component';
import { SalesReportComponent } from './Forms/sales-report/sales-report.component';
import { SampleAllocationApprovalComponent } from './Forms/sample-allocation-approval/sample-allocation-approval.component';
import { SampleProductComponent } from './Forms/sample-product/sample-product.component';
import { UploadDocumentComponent } from './Forms/upload-document/upload-document.component';
import { UploadSampleStockComponent } from './Forms/upload-sample-stock/upload-sample-stock.component';
import { UserMasterComponent } from './Forms/user-master/user-master.component';

import { AuthGuard } from './Service/auth.guard';
import { ClaimReportComponent } from './Forms/claim-report/claim-report.component';
import { AddDiscountComponent } from './Forms/add-discount/add-discount.component';
import { RequestDiscountListComponent } from './Forms/request-discount-list/request-discount-list.component';
import { ApprovalDiscountComponent } from './Forms/approval-discount/approval-discount.component';
import { ClaimSettlementComponent } from './Forms/claim-settlement/claim-settlement.component';
import { ClaimRequestComponent } from './Forms/claim-request/claim-request.component';
import { ClaimApproveComponent } from './Forms/claim-approve/claim-approve.component';
import { ClaimDetailsComponent } from './Forms/claim-details/claim-details.component';
import { DiscountApproveDetailsComponent } from './Forms/discount-approve-details/discount-approve-details.component';
import { ClaimApproveDetailsComponent } from './Forms/claim-approve-details/claim-approve-details.component';
import { MyClaimRequestComponent } from './Forms/my-claim-request/my-claim-request.component';
import { MyClaimRequestDetailsComponent } from './Forms/my-claim-request-details/my-claim-request-details.component';
import { DiscountRequestDetailsComponent } from './Forms/discount-request-details/discount-request-details.component';
import { UpdateUserPasswordComponent } from './Forms/update-user-password/update-user-password.component';
import { DoctorMasterComponent } from './Forms/doctor-master/doctor-master.component';
import { ChemistMasterComponent } from './Forms/chemist-master/chemist-master.component';
import { UpdateDispatchedDetailsComponent } from './Forms/update-dispatched-details/update-dispatched-details.component';
import { SampleInvoiceComponent } from './Forms/sample-invoice/sample-invoice.component';
import { InvoiceUpdateExpiryComponent } from './Forms/invoice-update-expiry/invoice-update-expiry.component';
import { FinalClaimReportComponent } from './Forms/final-claim-report/final-claim-report.component';
import { ProductGroupUpdateComponent } from './Forms/product-group-update/product-group-update.component';
import { DiscoutnCliamUpdateComponent } from './Forms/discoutn-cliam-update/discoutn-cliam-update.component';
import { MoeReportComponent } from './Forms/moe-report/moe-report.component';
import { UpdateClaimReportComponent } from './Forms/update-claim-report/update-claim-report.component';
import { PostCmeComponent } from './Forms/post-cme/post-cme.component';
import { RequestCmeComponent } from './Forms/request-cme/request-cme.component';
import { PaymentCmeComponent } from './Forms/payment-cme/payment-cme.component';
import { RecoveryCmeComponent } from './Forms/recovery-cme/recovery-cme.component';
import { RequestApprovalCmeComponent } from './Forms/request-approval-cme/request-approval-cme.component';
import { RequestCmeListComponent } from './Forms/request-cme-list/request-cme-list.component';
import { PrintCmeComponent } from './Forms/print-cme/print-cme.component';
import { ApprovalCmeComponent } from './Forms/approval-cme/approval-cme.component';
import { CancelDiscountRequestComponent } from './Forms/cancel-discount-request/cancel-discount-request.component';
import { DiscountDetailsListComponent } from './Forms/discount-details-list/discount-details-list.component';
import { DiscountDetailsComponent } from './Forms/discount-details/discount-details.component';
import { UploadMktReportComponent } from './Forms/upload-mkt-report/upload-mkt-report.component';
import { MoetargetreportComponent } from './Forms/moetargetreport/moetargetreport.component';
import { DivisionWiseSalesReportComponent } from './Forms/division-wise-sales-report/division-wise-sales-report.component';
import { CmeReportComponent } from './Forms/cme-report/cme-report.component';
import { IncentivesComponent } from './Common/incentives/incentives.component';
import { SampleRequisitionComponent } from './Forms/sample-requisition/sample-requisition.component';
import { SampleRequisitionApprovalComponent } from './Forms/sample-requisition-approval/sample-requisition-approval.component';
import { PMTSampleRequisitionApprovalComponent } from './Forms/pmt-sample-requisition-approval/pmt-sample-requisition-approval.component';
import { SampleRequisitionListComponent } from './Forms/sample-requisition-list/sample-requisition-list.component';
import { CycleSampleRequisitionComponent } from './Forms/cycle-sample-requisition/cycle-sample-requisition.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'changepassword', component: ChangePasswordPageComponent },
  {
    path: '',
    canActivate:[AuthGuard],
    component: LayoutPageComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'invoiceupdate', component: InvoiceUpdateComponent },
      { path: 'pooltopool', component: PoolToPoolComponent },
      { path: 'itd', component: ItdComponent },
      { path: 'downloadreport', component: DownloadReportsComponent },
      { path: 'salesreport', component: SalesReportComponent },
      { path: 'hqmaster', component: HqMasterComponent },
      { path: 'usermaster', component: UserMasterComponent  },
      { path: 'product', component: ProductComponent },
      { path: 'sampleproduct', component: SampleProductComponent },
      { path: 'incentivereport', component: IncentiveReportComponent },
      { path: 'uploaddocumnettype', component: UploadDocumentComponent },
      { path: 'expensereport', component: ExpeneseReportComponent },
      { path: 'areamaster', component: AreaMasterComponent },
      {path:'productdetails',component:ProductDetailsComponent},
      {path:"uploadsamplestock", component:UploadSampleStockComponent},
      {path:"sampleallocationapproval", component:SampleAllocationApprovalComponent},
      {path:"generateinvoice", component:GenerateInvoiceComponent},
      {path:"printinvoice", component:PrintInvoiceComponent},
      {path:"editInvoice", component:EditInvoiceComponent},
      {path:'claimreport',component:ClaimReportComponent},
      {path:'adddiscount',component:AddDiscountComponent},
      {path:'requestdiscountlist',component:RequestDiscountListComponent},
      {path:'discountrequestdetails',component:DiscountRequestDetailsComponent},
      {path:'approvaldiscount',component:ApprovalDiscountComponent},
      {path:'claimsettlement',component:ClaimSettlementComponent},
      {path:'claimrequest', component:ClaimRequestComponent},
      {path:'claimapprove', component:ClaimApproveComponent},
      {path:'claimdetails',component:ClaimDetailsComponent},
      {path:'discountapprovedetails',component:DiscountApproveDetailsComponent},
      {path:'claimapprovedetails',component:ClaimApproveDetailsComponent},
      {path:'myclaimrequest',component:MyClaimRequestComponent},
      {path:'myclaimrequestdetails',component:MyClaimRequestDetailsComponent},
      {path:'updateuserpassword',component:UpdateUserPasswordComponent},
      {path:'doctormaster',component:DoctorMasterComponent},
       {path:'chemistmaster',component:ChemistMasterComponent},
       {path:'updateDispatchedDetails',component:UpdateDispatchedDetailsComponent},
       {path:'sampleInvoice',component:SampleInvoiceComponent},
       {path:'invoiceupdatetoexpiry',component:InvoiceUpdateExpiryComponent},
       {path:'finalclaimreport',component:FinalClaimReportComponent},
       {path:'productgroupupdate',component:ProductGroupUpdateComponent},
       {path:'discountclaimupdate',component:DiscoutnCliamUpdateComponent},
       {path:'moereport',component:MoeReportComponent},
       {path:'updateclaimreport',component:UpdateClaimReportComponent},
       {path:'postcme',component:PostCmeComponent},
       {path:'requestcme',component:RequestCmeComponent},
       {path:'paymentcme',component:PaymentCmeComponent},
       {path:'recoverycme',component:RecoveryCmeComponent},
       {path:'requestapprovalcme',component:RequestApprovalCmeComponent},
       {path:'requestcmelist',component:RequestCmeListComponent},
       {path:'printcme',component:PrintCmeComponent},
       {path:'approvalcme',component:ApprovalCmeComponent},
       {path:'canceldiscountrequest',component:CancelDiscountRequestComponent},
       {path:'discountdetailslist',component:DiscountDetailsListComponent},
       {path:'discountdetails',component:DiscountDetailsComponent},
      {path:'uploadmktreport',component:UploadMktReportComponent},
      {path:'moetargetreport',component:MoetargetreportComponent},
      { path: 'DivisionWisesalesreport', component: DivisionWiseSalesReportComponent },
      { path: 'cmereport', component: CmeReportComponent },
      { path: 'incentives', component: IncentivesComponent },
      { path: 'samplerequisition', component: SampleRequisitionComponent },
      { path: 'samplerequisitionapproval', component: SampleRequisitionApprovalComponent },
      { path: 'PMTsamplerequisitionapproval', component: PMTSampleRequisitionApprovalComponent },
      { path: 'samplerequisitionlist', component: SampleRequisitionListComponent },
      { path: 'cyclesamplerequisition', component: CycleSampleRequisitionComponent },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
