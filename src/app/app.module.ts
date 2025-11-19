import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LayoutPageComponent } from './Common/layout-page/layout-page.component';
import { LoginComponent } from './Common/login/login.component';
import {DialogModule} from 'primeng/dialog';
import { ChangePasswordPageComponent } from './Common/change-password-page/change-password-page.component';
import { InvoiceUpdateComponent } from './Forms/invoice-update/invoice-update.component';
import { ItdComponent } from './Forms/itd/itd.component';
import { PoolToPoolComponent } from './Forms/pool-to-pool/pool-to-pool.component';
import { DownloadReportsComponent } from './Forms/download-reports/download-reports.component';
import { SalesReportComponent } from './Forms/sales-report/sales-report.component';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import { DashboardComponent } from './Common/dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ToastrModule } from 'ngx-toastr';
import { HqMasterComponent } from './Forms/hq-master/hq-master.component';
import { UserMasterComponent } from './Forms/user-master/user-master.component';
import { ProductComponent } from './Forms/product/product.component';
import { SampleProductComponent } from './Forms/sample-product/sample-product.component';
import { AuthService } from './Service/auth.service';
import { AuthGuard } from './Service/auth.guard';
import { SharedService } from './Service/shared.service';
import { URLService } from './Service/url.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoaderComponent } from './Common/loader/loader.component';
import { CostFilterPipe } from './directive/filter.pipe';
import { IncentiveReportComponent } from './Forms/incentive-report/incentive-report.component';
import { UploadDocumentComponent } from './Forms/upload-document/upload-document.component';
import { ExpeneseReportComponent } from './Forms/expenese-report/expenese-report.component';
import { AreaMasterComponent } from './Forms/area-master/area-master.component';
import { ProductDetailsComponent } from './Forms/product-details/product-details.component';
import { UploadSampleStockComponent } from './Forms/upload-sample-stock/upload-sample-stock.component';
import { SampleAllocationApprovalComponent } from './Forms/sample-allocation-approval/sample-allocation-approval.component';
import { NumberDirective, TwoDigitDecimaNumberDirective } from './directive/focus.directive';
import { GenerateInvoiceComponent } from './Forms/generate-invoice/generate-invoice.component';
import { PrintInvoiceComponent } from './Forms/print-invoice/print-invoice.component';
import { EditInvoiceComponent } from './Forms/edit-invoice/edit-invoice.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
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
import { IndianCurrencyPipe } from './Pipe/filter-pipe.pipe';
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
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CheckboxModule } from 'primeng/checkbox';
import { RequestCmeListComponent } from './Forms/request-cme-list/request-cme-list.component';
import { PrintCmeComponent } from './Forms/print-cme/print-cme.component';
import { ApprovalCmeComponent } from './Forms/approval-cme/approval-cme.component';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { CancelDiscountRequestComponent } from './Forms/cancel-discount-request/cancel-discount-request.component';
import { DiscountDetailsListComponent } from './Forms/discount-details-list/discount-details-list.component';
import { DiscountDetailsComponent } from './Forms/discount-details/discount-details.component';
import {ProgressBarModule} from 'primeng/progressbar';
import {TooltipModule} from 'primeng/tooltip';
import { UploadMktReportComponent } from './Forms/upload-mkt-report/upload-mkt-report.component';
//import { UploadMktReportComponent } from './forms/upload-mkt-report/upload-mkt-report.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { PaginatorModule } from 'primeng/paginator';
import { MoetargetreportComponent } from './Forms/moetargetreport/moetargetreport.component';
import { DivisionWiseSalesReportComponent } from './Forms/division-wise-sales-report/division-wise-sales-report.component';
import { CmeReportComponent } from './Forms/cme-report/cme-report.component';
import { IncentivesComponent } from './Common/incentives/incentives.component';
//import { DivisionWiseSalesReportComponent } from './forms/division-wise-sales-report/division-wise-sales-report.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { SampleRequisitionComponent } from './Forms/sample-requisition/sample-requisition.component';
import { SampleRequisitionApprovalComponent } from './Forms/sample-requisition-approval/sample-requisition-approval.component';
import { PMTSampleRequisitionApprovalComponent } from './Forms/pmt-sample-requisition-approval/pmt-sample-requisition-approval.component';
import { SampleRequisitionListComponent } from './Forms/sample-requisition-list/sample-requisition-list.component';
import { CycleSampleRequisitionComponent } from './Forms/cycle-sample-requisition/cycle-sample-requisition.component';
import { PipeService } from './Service/pipe.service';
import { registerLocaleData } from '@angular/common';
import localeIn from '@angular/common/locales/en-IN';
import { PayementExcelUploadComponent } from './Forms/payement-excel-upload/payement-excel-upload.component';
import { ApprovedPayementListComponent } from './Forms/approved-payement-list/approved-payement-list.component';
import { SampleReceivedComponent } from './Forms/sample-received/sample-received.component';
import { AdobeRequisitionComponent } from './Forms/adobe-requisition/adobe-requisition.component';
import { AdhocApprovalListComponent } from './Forms/adhoc-approval-list/adhoc-approval-list.component';
import { PmtApprovalListComponent } from './Forms/pmt-approval-list/pmt-approval-list.component';
import { DocumentPmtApprovalComponent } from './Forms/document-pmt-approval/document-pmt-approval.component';
import { SampleDataUploadComponent } from './Forms/sample-data-upload/sample-data-upload.component';
import { MoeReportViewComponent } from './Forms/moe-report-view/moe-report-view.component';
import { GenerateOrderComponent } from './Forms/generate-order/generate-order.component';
import { SuperStockishMasterComponent } from './Forms/super-stockish-master/super-stockish-master.component';
import { CycleSuperstockistComponent } from './Forms/cycle-superstockist/cycle-superstockist.component';
import { TradeOfferDiffReportComponent } from './Forms/trade-offer-diff-report/trade-offer-diff-report.component';
import { CmePaymentReportComponent } from './Common/cme-payment-report/cme-payment-report.component';
import { SchemaUploadComponent } from './Forms/schema-upload/schema-upload.component';

registerLocaleData(localeIn);

@NgModule({
  declarations: [
    AppComponent,
    LayoutPageComponent,
    LoginComponent,
    ChangePasswordPageComponent,
    InvoiceUpdateComponent,
    ItdComponent,
    PoolToPoolComponent,
    DownloadReportsComponent,
    SalesReportComponent,
    DashboardComponent,
    HqMasterComponent,
    UserMasterComponent,
    ProductComponent,
    SampleProductComponent,
    LoaderComponent,
    CostFilterPipe,
    IndianCurrencyPipe,
    IncentiveReportComponent,
    UploadDocumentComponent,
    ExpeneseReportComponent,
    AreaMasterComponent,
    ProductDetailsComponent,
    UploadSampleStockComponent,
    SampleAllocationApprovalComponent,
    NumberDirective,
    GenerateInvoiceComponent,
    PrintInvoiceComponent,
    EditInvoiceComponent,
    ClaimReportComponent,
    AddDiscountComponent,
    RequestDiscountListComponent,
    ApprovalDiscountComponent,
    ClaimSettlementComponent,
    ClaimRequestComponent,
    ClaimApproveComponent,
    ClaimDetailsComponent,
    DiscountApproveDetailsComponent,
    ClaimApproveDetailsComponent,
    MyClaimRequestComponent,
    MyClaimRequestDetailsComponent,
    DiscountRequestDetailsComponent,
    UpdateUserPasswordComponent,
    DoctorMasterComponent,
    ChemistMasterComponent,
    UpdateDispatchedDetailsComponent,
    SampleInvoiceComponent,
    InvoiceUpdateExpiryComponent,
    FinalClaimReportComponent,
    ProductGroupUpdateComponent,
    DiscoutnCliamUpdateComponent,
    TwoDigitDecimaNumberDirective,
    MoeReportComponent,
    UpdateClaimReportComponent,
    PostCmeComponent,
    RequestCmeComponent,
    PaymentCmeComponent,
    RecoveryCmeComponent,
    RequestApprovalCmeComponent,
    RequestCmeListComponent,
    PrintCmeComponent,
    ApprovalCmeComponent,
    CancelDiscountRequestComponent,
    DiscountDetailsListComponent,
    DiscountDetailsComponent,
    UploadMktReportComponent,
    MoetargetreportComponent,
    DivisionWiseSalesReportComponent,
    CmeReportComponent,
    IncentivesComponent,
    SampleRequisitionComponent,
    SampleRequisitionApprovalComponent,
    PMTSampleRequisitionApprovalComponent,
    SampleRequisitionListComponent,
    CycleSampleRequisitionComponent,
    SampleReceivedComponent,
    ApprovedPayementListComponent,
    PayementExcelUploadComponent,
    AdobeRequisitionComponent,
    AdhocApprovalListComponent,
    PmtApprovalListComponent,
    DocumentPmtApprovalComponent,
    SampleDataUploadComponent,
    MoeReportViewComponent,
    GenerateOrderComponent,
    SuperStockishMasterComponent,
    CycleSuperstockistComponent,
    TradeOfferDiffReportComponent,
    CmePaymentReportComponent,
    SchemaUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    HttpClientModule,
    NgApexchartsModule,
    AutoCompleteModule,
    OverlayPanelModule, 
    CheckboxModule,
    TooltipModule,
    ProgressBarModule,
    RadioButtonModule,
    PaginatorModule,
    MultiSelectModule,
    ToastrModule.forRoot({
      positionClass: 'toast-custom',
      // positionClass :'toast-bottom-full-width',
      closeButton: true,
      timeOut: 10000,
      preventDuplicates: true
    }),
     // ToastrModule added

  ],
  providers: [
     AuthService,
    AuthGuard,
    SharedService,
    URLService,
    Ng2ImgMaxService,
    PipeService,
    CostFilterPipe,
    CurrencyPipe,
   { provide: LOCALE_ID, useValue: 'en-IN' },
    DatePipe],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
